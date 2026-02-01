const Joi = require('joi');

const createCourseSchema = Joi.object({
  name: Joi.string().required().trim(),
  code: Joi.string().required().trim().uppercase(),
  description: Joi.string().trim().allow(''),
  level: Joi.string().required(),
  school: Joi.string().required(),
  teacher: Joi.string().allow(''),
  credits: Joi.number().integer().min(1).max(10)
});

const updateCourseSchema = Joi.object({
  name: Joi.string().trim(),
  code: Joi.string().trim().uppercase(),
  description: Joi.string().trim().allow(''),
  level: Joi.string(),
  school: Joi.string(),
  teacher: Joi.string().allow(''),
  credits: Joi.number().integer().min(1).max(10)
});

module.exports = {
  createCourseSchema,
  updateCourseSchema
};

