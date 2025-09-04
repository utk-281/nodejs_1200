import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(4).max(10).required(),
  email: Joi.string().min(4).max(30).required().lowercase().email(),
  password: Joi.string().min(4).max(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(4).max(30).required().lowercase().email(),
  password: Joi.string().min(4).max(20).required(),
});

export const updateProfileSchema = Joi.object({
  updatedUsername: Joi.string().min(4).max(10).required().optional(),
  updatedEmail: Joi.string().min(4).max(30).required().lowercase().email().optional(),
  updatedPassword: Joi.string().min(4).max(20).required().optional(),
});
