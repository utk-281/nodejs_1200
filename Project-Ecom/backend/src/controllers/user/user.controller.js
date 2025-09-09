import expressAsyncHandler from "express-async-handler";
import User from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";
import { generateJwtToken } from "../../utils/jwt.util.js";

export const register = expressAsyncHandler(async (req, res, next) => {
  let { username, email, password } = req.body;

  let newUser = await User.create({ username, email, password });
  // let newUser = new User({ username, email, password })
  // await newUser.save()

  new ApiResponse(201, "User registered successfully", true, newUser).send(res);
});

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new CustomError("Email does not exists", 404));

  let isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new CustomError("Password is not correct", 401));

  let token = await generateJwtToken(user._id, user.tokenVersion);

  res.cookie("token", token, {
    maxAge: process.env.TOKEN_EXPIRY * 60 * 60 * 1000,
  });

  new ApiResponse(200, "User logged in successfully", true, token).send(res);
});

export const logout = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  res.clearCookie("token");

  //! increase tokenVersion to invalidate existing tokens
  await User.findByIdAndUpdate(userId, { $inc: { tokenVersion: 1 } });

  new ApiResponse(200, "User logged out successfully", true).send(res);
});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {
  let user = req.myUser;
  let { updatedUsername, updatedEmail, updatedPassword } = req.body;

  user.username = updatedUsername || user.username;
  user.email = updatedEmail || user.email;
  user.password = updatedPassword || user.password;
  await user.save();

  new ApiResponse(200, "user profile updated", true).send(res);
});

export const deleteProfile = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser.id;
  await User.findByIdAndDelete(userId);

  res.clearCookie("token");

  new ApiResponse(200, "user profile deleted", true).send(res);
});

export const getCurrentUser = expressAsyncHandler(async (req, res, next) => {
  let user = req.myUser;
  new ApiResponse(200, "User is logged in", true, user).send(res);
});
