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
  else if (sortBy === "titleAtoZ") sortObject.title = 1;
  else if (sortBy === "titleZtoA") sortObject.title = -1;
  else if (sortBy === "ato_z") sortObject.title = 1;
  else sortObject.createdAt = -1;

  let products = await Product.find(filterObject).sort(sortObject);
  if (products.length === 0) return next(new CustomError("No products found", 404));

  new ApiResponse(200, "products fetched successfully", true, products).send(res);
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) return next(new CustomError("No product found", 404));
  new ApiResponse(200, "product fetched successfully", true, product).send(res);
});

export const searchProductByKeyword = expressAsyncHandler(async (req, res, next) => {
  console.log("req.query:", req.query);
  let keyword = req.query.keyword;
  if (!keyword) return next(new CustomError("Keyword is required", 400));
  let pattern = new RegExp(keyword, "i"); // i for case insensitive
  console.log(pattern);

  let products = await Product.find({
    $or: [
      { title: { $regex: pattern } },
      { category: { $regex: pattern } },
      { description: { $regex: pattern } },
      { brand: { $regex: pattern } },
    ],
  });

  if (products.length === 0) return next(new CustomError("No products found", 404));

  new ApiResponse(200, "products fetched successfully", true, products).send(res);
});
