import Joi from 'joi';

export const registerUserValidation = Joi.object({
  userName: Joi.string().required().trim(),
  email: Joi.string().required().trim().email(),
  password: Joi.string().required().trim().min(8),
});
