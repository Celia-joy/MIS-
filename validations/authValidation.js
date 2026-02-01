const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required().trim(),
  password: Joi.string().required().min(6)
});

const registerSchema = Joi.object({
  username: Joi.string().required().trim(),
  email: Joi.string().email().required().trim(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('admin', 'teacher', 'student').default('admin')
});

module.exports = {
  loginSchema,
  registerSchema
};

