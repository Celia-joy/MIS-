const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    enum: ['Senior 4', 'Senior 5', 'Senior 6']
  },
  description: {
    type: String,
    trim: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  }
}, {
  timestamps: true
});

levelSchema.index({ name: 1, school: 1 }, { unique: true });

module.exports = mongoose.model('Level', levelSchema);

