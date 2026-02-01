const Joi = require('joi');

const createStudentSchema = Joi.object({
  firstName: Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  studentId: Joi.string().required().trim(),
  email: Joi.string().email().trim().allow(''),
  phone: Joi.string().trim().allow(''),
  dateOfBirth: Joi.date().max('now'),
  gender: Joi.string().valid('Male', 'Female', 'Other').allow(''),
  address: Joi.string().trim().allow(''),
  class: Joi.string().required(),
  level: Joi.string().required(),
  school: Joi.string().required(),
  enrollmentDate: Joi.date()
});

const updateStudentSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  studentId: Joi.string().trim(),
  email: Joi.string().email().trim().allow(''),
  phone: Joi.string().trim().allow(''),
  dateOfBirth: Joi.date().max('now'),
  gender: Joi.string().valid('Male', 'Female', 'Other').allow(''),
  address: Joi.string().trim().allow(''),
  class: Joi.string(),
  level: Joi.string(),
  school: Joi.string(),
  enrollmentDate: Joi.date()
});

module.exports = {
  createStudentSchema,
  updateStudentSchema
};

