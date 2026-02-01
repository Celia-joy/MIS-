const Joi = require('joi');

const createSchoolSchema = Joi.object({
  name: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
  phone: Joi.string().trim().allow(''),
  email: Joi.string().email().trim().allow(''),
  principalName: Joi.string().trim().allow(''),
  establishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear())
});

const updateSchoolSchema = Joi.object({
  name: Joi.string().trim(),
  address: Joi.string().trim(),
  phone: Joi.string().trim().allow(''),
  email: Joi.string().email().trim().allow(''),
  principalName: Joi.string().trim().allow(''),
  establishedYear: Joi.number().integer().min(1900).max(new Date().getFullYear())
});

module.exports = {
  createSchoolSchema,
  updateSchoolSchema
};

