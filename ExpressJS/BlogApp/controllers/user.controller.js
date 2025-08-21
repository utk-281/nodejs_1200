import expressAsyncHandler from 'express-async-handler';
import { userCollection } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  let newUser = await userCollection.create({ userName, email, password });
  // let newUser = new userCollection({ userName, email, password });
  // await newUser.save();

  new ApiResponse(200, true, 'User created successfully', newUser).send(res);
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {});

export const logoutUser = expressAsyncHandler(async (req, res, next) => {});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {});

export const deleteUser = expressAsyncHandler(async (req, res, next) => {});
