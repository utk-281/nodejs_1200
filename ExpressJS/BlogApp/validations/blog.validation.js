import Joi from 'joi';

export const addBlogValidation = Joi.object({
  title: Joi.string().required().trim(),
  description: Joi.string().required().trim().min(10).max(1000),
  category: Joi.string().optional(),
});

export const updateBlogValidation = Joi.object({
  title: Joi.string().required().trim().optional(),
  description: Joi.string().required().trim().min(10).max(1000).optional(),
  category: Joi.string().optional(),
});
