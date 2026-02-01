const mongoose = require('mongoose');
const debug = require('debug')('app:database');

const connectDB = async () => {
  try {
    // Prefer .env variable first → then config → then hardcoded fallback
    const dbURI =
      process.env.MONGODB_URI ||
      (process.env.MONGODB_URL) ||
      (config.has('mongodb.uri') ? config.get('mongodb.uri') : 'mongodb://127.0.0.1:27017/school-mis');

    console.log(`[DB] Attempting to connect to: ${dbURI}`);

    // Modern connection — no deprecated options needed anymore
    await mongoose.connect(dbURI, {
      // These are safe defaults in recent Mongoose versions
      serverSelectionTimeoutMS: 5000, // timeout after 5s instead of hanging forever
      socketTimeoutMS: 45000,
    });

    console.log('[DB] MongoDB connected successfully!');
    debug('MongoDB connected');

    // Optional: log when disconnected or error occurs
    mongoose.connection.on('disconnected', () => {
      console.log('[DB] MongoDB disconnected');
      debug('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('[DB] MongoDB error:', err.message);
      debug('MongoDB error:', err);
    });
  } catch (error) {
    console.error('[DB] MongoDB connection FAILED:', error.message);
    console.error(error);
    debug('MongoDB connection error:', error);
    process.exit(1); // Crash on failure so you see it immediately
  }
};

module.exports = connectDB;