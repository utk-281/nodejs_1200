import Joi from "joi";

export const addProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().min(0).required(),
  salePrice: Joi.number().min(0).required(),
  category: Joi.string().min(3).max(50).required(),
  brand: Joi.string().min(2).max(50).required(),
  quantity: Joi.number().min(0).required(),
  totalStock: Joi.number().min(0).required(),
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).max(1000).optional(),
  price: Joi.number().min(0).optional(),
  salePrice: Joi.number().min(0).optional(),
  category: Joi.string().min(3).max(50).optional(),
  brand: Joi.string().min(2).max(50).optional(),
  quantity: Joi.number().min(0).optional(),
  totalStock: Joi.number().min(0).optional(),
});

export const deleteImageSchema = Joi.object({
  url: Joi.string().uri().required().allow(null),
  productId: Joi.string().hex().length(24).required(),
});

export const updateImageSchema = Joi.object({
  url: Joi.string().uri().required().allow(null),
  productId: Joi.string().hex().length(24).required(),
});
