import expressAsyncHandler from "express-async-handler";
import Product from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import { uploadToCloudinary } from "../../utils/cloudinary.util.js";

export const uploadImage = expressAsyncHandler(async (req, res, next) => {
  const localFilePath = req.file.path;
  //! while creating form to upload image use attribute "enctype=multipart/form-data"

  const uploadedResponse = await uploadToCloudinary(localFilePath);

  // console.log(uploadedResponse);
  new ApiResponse(200, "Image uploaded successfully", true, uploadedResponse.secure_url).send(res);
});

export const deleteImage = expressAsyncHandler(async (req, res, next) => {});

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
