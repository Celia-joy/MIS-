const Joi = require('joi');

const createClassSchema = Joi.object({
  name: Joi.string().required().trim(),
  level: Joi.string().required(),
  school: Joi.string().required(),
  classTeacher: Joi.string().allow(''),
  capacity: Joi.number().integer().min(1).max(200)
});

const updateClassSchema = Joi.object({
  name: Joi.string().trim(),
  level: Joi.string(),
  school: Joi.string(),
  classTeacher: Joi.string().allow(''),
  capacity: Joi.number().integer().min(1).max(200)
});

module.exports = {
  createClassSchema,
  updateClassSchema
};

