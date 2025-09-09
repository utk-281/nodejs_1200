import expressAsyncHandler from "express-async-handler";
import Product from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import {
  deleteFromCloudinary,
  getPublicId,
  uploadToCloudinary,
} from "../../utils/cloudinary.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const uploadImage = expressAsyncHandler(async (req, res, next) => {
  //! while creating form to upload image use attribute "enctype=multipart/form-data"
  //! get the fileType
  let fileType = req.file.mimetype;
  //! get the buffer value
  let buffer = req.file.buffer;
  //? convert the buffer to base64 string
  let b64 = buffer.toString("base64");
  //? create the data url
  let url = `data:${fileType};base64,${b64}`;

  /*
  
  ! this is for hard disk storage // const localFilePath = req.file.path;
  // const uploadedResponse = await uploadToCloudinary(localFilePath);
  // 
  // new ApiResponse(200, "Image uploaded successfully", true, uploadedResponse.secure_url).send(res); */

  let uploadedResponse = await uploadToCloudinary(url);
  console.log(uploadedResponse);
  new ApiResponse(200, "Image uploaded successfully", true, uploadedResponse.secure_url).send(res);
});

export const deleteImage = expressAsyncHandler(async (req, res, next) => {
  let { url, productId } = req.body;
  let publicId = getPublicId(url);
  let deletedResponse = await deleteFromCloudinary(publicId);
  // console.log(deletedResponse);
  if (deletedResponse.result === "ok") {
    await Product.findByIdAndUpdate(productId, { image: null });
    new ApiResponse(200, "Image deleted successfully").send(res);
  } else {
    return next(new CustomError("Image not found", 404));
  }
});

export const updateImage = expressAsyncHandler(async (req, res, next) => {});

export const addProduct = expressAsyncHandler(async (req, res, next) => {
  let { title, description, price, salePrice, category, brand, quantity, totalStock } = req.body;

  let newProduct = await Product.create({
    title,
    description,
    price,
    salePrice,
    category,
    brand,
    quantity,
    totalStock,
  });

  new ApiResponse(201, "Product added successfully", newProduct).send(res);
});

export const getProducts = expressAsyncHandler(async (req, res, next) => {});

export const getProduct = expressAsyncHandler(async (req, res, next) => {});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {});
