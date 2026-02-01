const Joi = require('joi');

const createLevelSchema = Joi.object({
  name: Joi.string().valid('Senior 4', 'Senior 5', 'Senior 6').required(),
  description: Joi.string().trim().allow(''),
  school: Joi.string().required()
});

const updateLevelSchema = Joi.object({
  name: Joi.string().valid('Senior 4', 'Senior 5', 'Senior 6'),
  description: Joi.string().trim().allow(''),
  school: Joi.string()
});

module.exports = {
  createLevelSchema,
  updateLevelSchema
};

