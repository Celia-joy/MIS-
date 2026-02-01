const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const debug = require('debug')('app:auth');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ 
      $or: [{ username }, { email: username }],
      isActive: true 
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const jwtSecret = process.env.JWT_SECRET || (config.has('jwt.secret') ? config.get('jwt.secret') : 'your-super-secret-jwt-key-change-in-production');
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || (config.has('jwt.expiresIn') ? config.get('jwt.expiresIn') : '24h');

    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username, 
        email: user.email, 
        role: user.role 
      },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    debug('Login error:', error);
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    debug('Logout error:', error);
    next(error);
  }
};

module.exports = {
  login,
  logout
};

