const Joi = require('joi');

const createTeacherSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().trim().allow(''),
  employeeId: Joi.string().required().trim(),
  department: Joi.string().trim().allow(''),
  qualification: Joi.string().trim().allow(''),
  school: Joi.string().required(),
  courses: Joi.array().items(Joi.string()).default([])
});

const updateTeacherSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().email().trim(),
  phone: Joi.string().trim().allow(''),
  employeeId: Joi.string().trim(),
  department: Joi.string().trim().allow(''),
  qualification: Joi.string().trim().allow(''),
  school: Joi.string(),
  courses: Joi.array().items(Joi.string())
});

module.exports = {
  createTeacherSchema,
  updateTeacherSchema
};

