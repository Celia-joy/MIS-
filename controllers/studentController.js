const Student = require('../models/Student');
const debug = require('debug')('app:student');

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find()
      .populate('class', 'name')
      .populate('level', 'name')
      .populate('school', 'name')
      .sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    debug('Get all students error:', error);
    next(error);
  }
};

const getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('class', 'name')
      .populate('level', 'name')
      .populate('school', 'name');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    debug('Get student by ID error:', error);
    next(error);
  }
};

const createStudent = async (req, res, next) => {
  try {
    const student = new Student(req.body);
    await student.save();
    await student.populate([
      { path: 'class', select: 'name' },
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' }
    ]);
    res.status(201).json(student);
  } catch (error) {
    debug('Create student error:', error);
    next(error);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'class', select: 'name' },
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' }
    ]);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    debug('Update student error:', error);
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    debug('Delete student error:', error);
    next(error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
};

