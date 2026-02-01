require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const debug = require('debug')('app:seed');
const config = require('config');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    const dbURI = process.env.MONGODB_URI || (config.has('mongodb.uri') ? config.get('mongodb.uri') : 'mongodb://localhost:27017/school-mis');
    const options = config.has('mongodb.options') ? config.get('mongodb.options') : {
      useNewUrlParser: true,
      useUnifiedTopology: true
    };

    await mongoose.connect(dbURI, options);
    debug('Connected to MongoDB');

    // Check if admin user exists
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      debug('Admin user already exists');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: 'admin',
      email: 'admin@school.com',
      password: 'admin123',
      role: 'admin',
      isActive: true
    });

    await admin.save();
    debug('Admin user created successfully!');
    debug('Username: admin');
    debug('Password: admin123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    debug('Error seeding admin user:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedAdmin();

