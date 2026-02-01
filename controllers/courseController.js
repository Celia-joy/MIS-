const Course = require('../models/Course');
const debug = require('debug')('app:course');

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find()
      .populate('level', 'name')
      .populate('school', 'name')
      .populate('teacher', 'firstName lastName employeeId')
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    debug('Get all courses error:', error);
    next(error);
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('level', 'name')
      .populate('school', 'name')
      .populate('teacher', 'firstName lastName employeeId email');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    debug('Get course by ID error:', error);
    next(error);
  }
};

const createCourse = async (req, res, next) => {
  try {
    const course = new Course(req.body);
    await course.save();
    await course.populate([
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' },
      { path: 'teacher', select: 'firstName lastName employeeId' }
    ]);
    res.status(201).json(course);
  } catch (error) {
    debug('Create course error:', error);
    next(error);
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' },
      { path: 'teacher', select: 'firstName lastName employeeId' }
    ]);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    debug('Update course error:', error);
    next(error);
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    debug('Delete course error:', error);
    next(error);
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};

