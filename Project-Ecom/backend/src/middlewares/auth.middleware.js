import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import CustomError from "../utils/CustomError.util.js";

export const authenticate = async (req, res, next) => {
  let token = req?.cookies?.token;
  console.log("token: ", token);
  if (!token) return next(new CustomError("Please login to access this resource", 401));

  let decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //   console.log("decodedToken: ", decodedToken);

  let user = await User.findById(decodedToken.id);

  if (!user || user.tokenVersion !== decodedToken.tokenVersion)
    return next(new CustomError("Invalid Session", 404));

  req.myUser = user;
  next();
};

export const authorize = (req, res, next) => {
  if (req.myUser.role === "admin") {
    console.log("checking role...");
    next();
  } else {
    return next(new CustomError("Only admin can access this resource", 403));
  }
};
