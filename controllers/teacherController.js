const Teacher = require('../models/Teacher');
const debug = require('debug')('app:teacher');

const getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find()
      .populate('school', 'name')
      .populate('courses', 'name code')
      .sort({ createdAt: -1 });
    res.json(teachers);
  } catch (error) {
    debug('Get all teachers error:', error);
    next(error);
  }
};

const getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.params.id)
      .populate('school', 'name')
      .populate('courses', 'name code description');
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    debug('Get teacher by ID error:', error);
    next(error);
  }
};

const createTeacher = async (req, res, next) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    await teacher.populate([
      { path: 'school', select: 'name' },
      { path: 'courses', select: 'name code' }
    ]);
    res.status(201).json(teacher);
  } catch (error) {
    debug('Create teacher error:', error);
    next(error);
  }
};

const updateTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'school', select: 'name' },
      { path: 'courses', select: 'name code' }
    ]);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json(teacher);
  } catch (error) {
    debug('Update teacher error:', error);
    next(error);
  }
};

const deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    debug('Delete teacher error:', error);
    next(error);
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};

