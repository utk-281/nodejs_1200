import expressAsyncHandler from "express-async-handler";
import v2 from "../config/cloudinary.config.js";

export const uploadToCloudinary = expressAsyncHandler(async (path) => {
  let result = await v2.uploader.upload(path, { folder: "eKart" });
  return result;
});

export const deleteFromCloudinary = expressAsyncHandler(async (path) => {});
