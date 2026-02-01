const Level = require('../models/Level');
const debug = require('debug')('app:level');

const getAllLevels = async (req, res, next) => {
  try {
    const levels = await Level.find().populate('school', 'name').sort({ createdAt: -1 });
    res.json(levels);
  } catch (error) {
    debug('Get all levels error:', error);
    next(error);
  }
};

const getLevelById = async (req, res, next) => {
  try {
    const level = await Level.findById(req.params.id).populate('school', 'name');
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    debug('Get level by ID error:', error);
    next(error);
  }
};

const createLevel = async (req, res, next) => {
  try {
    const level = new Level(req.body);
    await level.save();
    await level.populate('school', 'name');
    res.status(201).json(level);
  } catch (error) {
    debug('Create level error:', error);
    next(error);
  }
};

const updateLevel = async (req, res, next) => {
  try {
    const level = await Level.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('school', 'name');
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json(level);
  } catch (error) {
    debug('Update level error:', error);
    next(error);
  }
};

const deleteLevel = async (req, res, next) => {
  try {
    const level = await Level.findByIdAndDelete(req.params.id);
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.json({ message: 'Level deleted successfully' });
  } catch (error) {
    debug('Delete level error:', error);
    next(error);
  }
};

module.exports = {
  getAllLevels,
  getLevelById,
  createLevel,
  updateLevel,
  deleteLevel
};

