import expressAsyncHandler from 'express-async-handler';
import { blogCollection } from '../models/blog.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import CustomError from '../utils/CustomError.util.js';

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

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  //~ select() is  used to display/hide fields for hiding write "-fieldName"
  let blogs = await blogCollection.find().select('-__v -createdAt -updatedAt');
  if (blogs.length === 0) return next(new CustomError('No Blogs Found', 404));

  new ApiResponse(200, true, 'Blogs fetched successfully', blogs).send(res);
});

export const getBlog = expressAsyncHandler(async (req, res, next) => {
  let blog = await blogCollection.findById(req.params.id);
  if (!blog) return next(new CustomError('no blog found', 404));

  new ApiResponse(200, true, 'Blog fetched successfully', blog).send(res);
});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  let updatedBlog = await blogCollection.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // this will display updated data
    runValidators: true, // this will validate updated data
  });

  if (!updatedBlog) return next(new CustomError('No blog found', 404));
  new ApiResponse(200, true, 'Blog updated successfully', updatedBlog).send(res);
});

export const updateBlogPut = expressAsyncHandler(async (req, res, next) => {
  let updatedBlog = await blogCollection.replaceOne({ _id: req.params.id }, req.body);
  if (!updatedBlog) return next(new CustomError('No blog found', 404));
  new ApiResponse(200, true, 'Blog updated successfully', updatedBlog).send(res);
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {});
