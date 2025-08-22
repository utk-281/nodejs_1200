import expressAsyncHandler from 'express-async-handler';
import { userCollection } from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.util.js';
import CustomError from '../utils/CustomError.util.js';
import { generateJsonWebToken } from '../utils/jwt.util.js';

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;
  let newUser = await userCollection.create({ userName, email, password });
  new ApiResponse(200, true, 'User created successfully', newUser).send(res);
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {
  //? user will enter at the the time of login
  let { email, password } = req.body;
  console.log(req.body);

  let existingUser = await userCollection.findOne({ email }).select('+password');
  console.log(existingUser);
  if (!existingUser) return next(new CustomError("User doesn't exist", 404));

  // let isMatch = await bcrypt.compare(password, existingUser.password);
  // console.log(isMatch);

  let isMatch = await existingUser.comparePassword(password);
  if (!isMatch) return next(new CustomError('Invalid credentials', 401));

  let token = generateJsonWebToken(existingUser._id);

  res.cookie('token', token, {
    maxAge: 1 * 60 * 60 * 1000,
    httpOnly: true, // this will not allow js to access the cookie
  });
  new ApiResponse(200, true, 'User logged in successfully', token).send(res);
});

export const logoutUser = expressAsyncHandler(async (req, res, next) => {});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {});

export const deleteUser = expressAsyncHandler(async (req, res, next) => {});
