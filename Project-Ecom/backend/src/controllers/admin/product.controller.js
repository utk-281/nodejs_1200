import expressAsyncHandler from 'express-async-handler';
import Product from '../../models/product.model.js';
import Review from '../../models/review.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';
import {
  deleteFromCloudinary,
  getPublicId,
  uploadToCloudinary,
} from '../../utils/cloudinary.util.js';
import CustomError from '../../utils/CustomError.util.js';

// export const uploadImage = expressAsyncHandler(async (req, res, next) => {
//
//   new ApiResponse(200, "Image uploaded successfully", true, uploadedResponse.secure_url).send(res);
// });

export const deleteImage = expressAsyncHandler(async (req, res, next) => {
  let { url, productId } = req.body;
  let publicId = getPublicId(url);
  let deletedResponse = await deleteFromCloudinary(publicId);
  //
  if (deletedResponse.result === 'ok') {
    await Product.findByIdAndUpdate(productId, { image: null });
    new ApiResponse(200, 'Image deleted successfully').send(res);
  } else {
    return next(new CustomError('Image not found', 404));
  }
});

export const updateImage = expressAsyncHandler(async (req, res, next) => {
  //! get the old image url and productId from req.body
  //! delete the old image from cloudinary
  //! upload the new image to cloudinary
  //! update the product collection with new image url
  //! send response to client
  const { url, productId } = req.body;

  if (url !== null) {
    let publicId = getPublicId(url);
    await deleteFromCloudinary(publicId);
  }
  // const buffer = req.file.buffer;
  // const fileType = req.file.mimetype;
  // const b64 = buffer.toString("base64");

  const dataUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
  const uploadedResponse = await uploadToCloudinary(dataUrl);

  await Product.findByIdAndUpdate(productId, { image: uploadedResponse.secure_url });
  new ApiResponse(200, 'Image updated successfully', true, uploadedResponse.secure_url).send(res);
});

export const addProduct = expressAsyncHandler(async (req, res, next) => {
  let { title, description, price, salePrice, category, brand, quantity, totalStock } = req.body;

  //! while creating form to upload image use attribute "enctype=multipart/form-data"
  //! get the fileType
  let fileType = req?.file?.mimetype;
  //! get the buffer value
  let buffer = req?.file?.buffer;
  //? convert the buffer to base64 string
  let b64 = buffer.toString('base64');
  //? create the data url
  let url = `data:${fileType};base64,${b64}`;

  /*
  
  ! this is for hard disk storage // const localFilePath = req.file.path;
  // const uploadedResponse = await uploadToCloudinary(localFilePath);
  // 
  // new ApiResponse(200, "Image uploaded successfully", true, uploadedResponse.secure_url).send(res); */

  let uploadedResponse = await uploadToCloudinary(url);

  let newProduct = await Product.create({
    image: uploadedResponse.secure_url,
    title,
    description,
    price,
    salePrice,
    category,
    brand,
    quantity,
    totalStock,
  });

  new ApiResponse(201, 'Product added successfully', newProduct).send(res);
});

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  let products = await Product.find();
  if (products.length === 0) return next(new CustomError('No products found', 404));
  new ApiResponse(200, 'Products fetched successfully', true, products).send(res);
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new CustomError('Product not found', 404));

  let reviews = await Review.find({ productId: req.params.id });

  new ApiResponse(200, 'Product fetched successfully', true, product, reviews).send(res);
});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  // let { title, description, price, salePrice, category, brand, totalStock } = req.body;
  let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // to return the updated document
    runValidators: true, // to verify against the schema
  });
  if (!product) return next(new CustomError('Product not found', 404));
  new ApiResponse(200, 'Product updated successfully', true, product).send(res);
});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new CustomError('Product not found', 404));
  let url = product.image;
  if (url.includes('res.cloudinary.com')) {
    let publicId = getPublicId(url);
    await deleteFromCloudinary(publicId);
  }

  await Product.findByIdAndDelete(req.params.id);
  new ApiResponse(200, 'Product deleted successfully', true).send(res);
});
