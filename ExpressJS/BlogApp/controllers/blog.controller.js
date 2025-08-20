import expressAsyncHandler from 'express-async-handler';
import { blogCollection } from '../models/blog.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';

export const createBlog = expressAsyncHandler(async (req, res, next) => {
  // const { error, value } = addBlogValidation.validate(req.body);
  // console.log(value);
  // if (error) {
  //   console.log(error);
  //   let message = error.details[0].message;
  //   return next(new CustomError(message, 400));
  // }

  // req.body = value;

  const { title, description, category, email } = req.body;

  let newBlog = await blogCollection.create({ title, description, category, email });

  new ApiResponse(201, true, 'Blog added successfully', newBlog).send(res);
});

export const getBlogs = expressAsyncHandler(async (req, res, next) => {});

export const getBlog = expressAsyncHandler(async (req, res, next) => {});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {});
