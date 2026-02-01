const Class = require('../models/Class');
const debug = require('debug')('app:class');

const getAllClasses = async (req, res, next) => {
  try {
    const classes = await Class.find()
      .populate('level', 'name')
      .populate('school', 'name')
      .populate('classTeacher', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    debug('Get all classes error:', error);
    next(error);
  }
};

const getClassById = async (req, res, next) => {
  try {
    const classData = await Class.findById(req.params.id)
      .populate('level', 'name')
      .populate('school', 'name')
      .populate('classTeacher', 'firstName lastName employeeId');
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classData);
  } catch (error) {
    debug('Get class by ID error:', error);
    next(error);
  }
};

const createClass = async (req, res, next) => {
  try {
    const classData = new Class(req.body);
    await classData.save();
    await classData.populate([
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' },
      { path: 'classTeacher', select: 'firstName lastName' }
    ]);
    res.status(201).json(classData);
  } catch (error) {
    debug('Create class error:', error);
    next(error);
  }
};

const updateClass = async (req, res, next) => {
  try {
    const classData = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'level', select: 'name' },
      { path: 'school', select: 'name' },
      { path: 'classTeacher', select: 'firstName lastName' }
    ]);
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json(classData);
  } catch (error) {
    debug('Update class error:', error);
    next(error);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    const classData = await Class.findByIdAndDelete(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: 'Class not found' });
    }
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    debug('Delete class error:', error);
    next(error);
  }
};

module.exports = {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass
};

