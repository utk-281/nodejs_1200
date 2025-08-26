import expressAsyncHandler from 'express-async-handler';
import { blogCollection } from '../models/blog.model.js';
import { userCollection } from '../models/user.model.js';
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

  const { title, description, category } = req.body;
  let userId = req.myUser._id;

  let newBlog = await blogCollection.create({
    title,
    description,
    category,
    createdBy: userId,
  });

  if (newBlog) await userCollection.findByIdAndUpdate(userId, { $inc: { totalBlogs: 1 } });

  new ApiResponse(201, true, 'Blog added successfully', newBlog).send(res);
});

export const getBlogs = expressAsyncHandler(async (req, res, next) => {
  //~ select() is  used to display/hide fields for hiding write "-fieldName"
  let blogs = await blogCollection.find().populate({
    path: 'createdBy',
    select: 'email -_id',
  });

  if (blogs.length === 0) return next(new CustomError('No Blogs Found', 404));
  new ApiResponse(200, true, 'Blogs fetched successfully', blogs).send(res);
});

export const getBlog = expressAsyncHandler(async (req, res, next) => {
  let blog = await blogCollection.findById(req.params.id).populate({
    path: 'createdBy',
    select: 'username totalBlogs email -_id',
  });
  if (!blog) return next(new CustomError('no blog found', 404));

  new ApiResponse(200, true, 'Blog fetched successfully', blog).send(res);
});

export const updateBlog = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let updatedBlog = await blogCollection.findOneAndUpdate(
    { _id: req.params.id, createdBy: userId },
    req.body,
    {
      new: true, // this will display updated data
      runValidators: true, // this will validate the updated data
    }
  );

  if (!updatedBlog) return next(new CustomError('No blog found', 404));
  new ApiResponse(200, true, 'Blog updated successfully', updatedBlog).send(res);
});

export const deleteBlog = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;

  let deletedBlog = await blogCollection.findOneAndDelete({
    _id: req.params.id, // matching _id with req.params.id
    createdBy: userId, // matching if same user created the blog who is trying to delete
  }); //! LOGICAL AND

  // let deletedBlog = await blogCollection.findOneAndDelete({
  //   $and: [{ _id: req.params.id }, { createdBy: userId }],
  // }); //! LOGICAL AND

  if (!deletedBlog) return next(new CustomError('No blog found', 404));

  await userCollection.findByIdAndUpdate(userId, { $inc: { totalBlogs: -1 } });

  new ApiResponse(200, true, 'Blog deleted successfully', deletedBlog).send(res);
});
