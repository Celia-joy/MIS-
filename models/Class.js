const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level',
    required: true
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true
  },
  classTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher'
  },
  capacity: {
    type: Number,
    default: 50
  }
}, {
  timestamps: true
});

classSchema.index({ name: 1, level: 1, school: 1 }, { unique: true });

module.exports = mongoose.model('Class', classSchema);

