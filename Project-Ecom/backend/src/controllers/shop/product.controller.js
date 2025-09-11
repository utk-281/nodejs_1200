import expressAsyncHandler from "express-async-handler";
import Product from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  const { category = [], brand = [], title = [], sortBy = "createdAt" } = req.query;
  let filterObject = {};
  if (category.length) filterObject.category = { $in: category.split(",") };
  if (brand.length) filterObject.brand = { $in: brand.split(",") };
  if (title.length) filterObject.title = { $in: title.split(",") };

  let sortObject = {};
  if (sortBy === "priceHighToLow") sortObject.price = -1;
  else if (sortBy === "priceLowToHigh") sortObject.price = 1;

  let products = await Product.find(filterObject).sort(sortObject);
  if (products.length === 0) return next(new CustomError("No products found", 404));

  new ApiResponse(200, "products fetched successfully", true, products).send(res);
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {});

export const searchProductByKeyword = expressAsyncHandler(async (req, res, next) => {});

// db.emp.find().sort({ name: 1 }); // 1 for ascending order
