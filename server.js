require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const debug = require('debug')('app:server');
const config = require('config');
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const connectDB = require('./config/database');
const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const User = require('./models/User');

const app = express();

// Connect to MongoDB first
connectDB();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(
  session({
    secret: 'your-secret-key-change-this-to-something-very-long-and-random-2026',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // change to true in production with HTTPS
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,  
  credentials: true,  
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Dev logging
const env = process.env.NODE_ENV || (config.has('server.env') ? config.get('server.env') : 'development');
if (env === 'development') {
  app.use(morgan('dev'));
  debug('Morgan enabled in development');
}

// Swagger
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
  })
);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ─── Login endpoint ────────────────────────────────────────────────────────────
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  console.log(`[LOGIN] Login attempt for username: ${username}`);

  if (!username || !password) {
    console.log('[LOGIN] Missing username or password');
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  try {
    const user = await User.findOne({ username });
    console.log(`[LOGIN] User found: ${!!user}`);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    if (!user.isActive) {
      console.log('[LOGIN] Account inactive');
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Contact support.',
      });
    }

    const isMatch = await user.comparePassword(password);
    console.log(`[LOGIN] Password correct: ${isMatch}`);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }

    // Success
    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
      loggedIn: true,
    };

    console.log(`[LOGIN] Success - user ${username} logged in`);

    return res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[LOGIN] Server error:', error.message);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
});

// ─── Protect dashboard ─────────────────────────────────────────────────────────
app.get('/dashboard.html', (req, res, next) => {
  if (req.session.user && req.session.user.loggedIn) {
    console.log(`[ACCESS] Dashboard accessed by ${req.session.user.username}`);
    return next();
  }
  console.log('[ACCESS] Unauthorized attempt to dashboard → redirecting to login');
  res.redirect('/');
});

// ─── Static files & root route ─────────────────────────────────────────────────
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// ─── API routes ────────────────────────────────────────────────────────────────
app.use('/api/v1', routes);

// ─── Error handling ────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use(errorHandler);

// ─── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || (config.has('server.port') ? config.get('server.port') : 3000);

// Temporary — run once then delete or comment this route
app.get('/fix-password', async (req, res) => {
  try {
    const user = await User.findOne({ username: 'admin' });
    if (!user) {
      return res.send('No admin user found');
    }

    user.password = '123456';  // set plain text
    await user.save();         // this triggers pre('save') hook → hashes it

    res.send('Password fixed & hashed! Now login with admin / 123456');
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
});
const server = app.listen(PORT, () => {
  console.log(`[SERVER] Running on port ${PORT}`);
  debug(`Server running on port ${PORT}`);
  debug(`Environment: ${env}`);
  debug(`Swagger docs: http://localhost:${PORT}/api-docs`);
});

module.exports = server;