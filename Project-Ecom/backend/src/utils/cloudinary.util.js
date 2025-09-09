import expressAsyncHandler from "express-async-handler";
import v2 from "../config/cloudinary.config.js";

export const getPublicId = (url) => {
  // let arr = url.split("/");
  // let lastElement = arr[arr.length - 1];
  // let arr2 = lastElement.split(".");
  // let id = arr2[0];
  // let publicId = `eKart/${id}`;
  // return publicId;

  let id = url.split("/").pop().split(".")[0];
  let publicId = `eKart/${id}`;
  return publicId;
};

export const uploadToCloudinary = expressAsyncHandler(async (url) => {
  let result = await v2.uploader.upload(url, { folder: "eKart" });
  // if (result) {
  //   fs.unlinkSync(path);
  // }
  return result;
});

export const deleteFromCloudinary = expressAsyncHandler(async (publicId) => {
  let result = await v2.uploader.destroy(publicId);
  return result;
});
