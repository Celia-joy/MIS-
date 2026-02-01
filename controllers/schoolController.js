const School = require('../models/School');
const debug = require('debug')('app:school');

const getAllSchools = async (req, res, next) => {
  try {
    const schools = await School.find().sort({ createdAt: -1 });
    res.json(schools);
  } catch (error) {
    debug('Get all schools error:', error);
    next(error);
  }
};

const getSchoolById = async (req, res, next) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    debug('Get school by ID error:', error);
    next(error);
  }
};

const createSchool = async (req, res, next) => {
  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (error) {
    debug('Create school error:', error);
    next(error);
  }
};

const updateSchool = async (req, res, next) => {
  try {
    const school = await School.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.json(school);
  } catch (error) {
    debug('Update school error:', error);
    next(error);
  }
};

const deleteSchool = async (req, res, next) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }
    res.json({ message: 'School deleted successfully' });
  } catch (error) {
    debug('Delete school error:', error);
    next(error);
  }
};

module.exports = {
  getAllSchools,
  getSchoolById,
  createSchool,
  updateSchool,
  deleteSchool
};

