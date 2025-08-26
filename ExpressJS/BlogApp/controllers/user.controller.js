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

  let existingUser = await userCollection.findOne({ email }).select('+password');
  if (!existingUser) return next(new CustomError("User doesn't exist", 404));

  // let isMatch = await bcrypt.compare(password, existingUser.password);
  // console.log(isMatch);

  let isMatch = await existingUser.comparePassword(password);
  if (!isMatch) return next(new CustomError('Invalid credentials', 401));

  let token = generateJsonWebToken(existingUser._id);

  res.cookie('token', token, {
    maxAge: 1 * 60 * 60 * 1000, // in ms
    httpOnly: true, // this will not allow js to access the cookie
  });

  new ApiResponse(200, true, 'User logged in successfully', token).send(res);
});

export const logoutUser = expressAsyncHandler(async (req, res, next) => {
  // res.clearCookie('token', '', { maxAge: Date.now() });
  res.clearCookie('token');
  new ApiResponse(200, true, 'User logged out successfully').send(res);
});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let { userName, email } = req.body;

  let updatedProfile = await userCollection.findByIdAndUpdate(
    userId,
    { userName, email },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedProfile) return next(new CustomError('No user found', 404));

  new ApiResponse(200, true, 'Profile updated successfully', updatedProfile).send(res);
});

export const updatePassword = expressAsyncHandler(async (req, res, next) => {});

export const deleteUser = expressAsyncHandler(async (req, res, next) => {});

export const currentProfile = expressAsyncHandler(async (req, res, next) => {});

//! for FE
export const currentLoggedIn = expressAsyncHandler(async (req, res, next) => {});
