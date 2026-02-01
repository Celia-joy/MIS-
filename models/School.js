const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  principalName: {
    type: String,
    trim: true
  },
  establishedYear: {
    type: Number
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('School', schoolSchema);

