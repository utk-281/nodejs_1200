import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/order.model.js';
import Product from '../../models/product.model.js';
import Review from '../../models/review.model.js';
import ApiResponse from '../../utils/ApiResponse.util.js';
import CustomError from '../../utils/CustomError.util.js';

export const addReview = expressAsyncHandler(async (req, res, next) => {
  console.log(req.myUser._id);
  let userId = req.myUser._id;
  let { rating, comments, userName, productId } = req.body;

  let order = await Order.findOne({ userId: userId });
  if (!order) return next(new CustomError('Order not found', 404));

  let idx = order.cartItems.find((prod) => {
    return prod.productId.toString() === productId;
  });

  if (idx === -1) return next(new CustomError('Please buy this product first', 400));

  let product = await Product.findById(productId);

  let review = await Review.create({
    userId,
    productId,
    rating,
    comments,
    userName,
  });

  //! get all reviews for a particular prod
  let reviews = await Review.find({ productId });
  let averageReviews = 0;
  let noOfReviews = reviews.length;

  let sumOfReviews = reviews.reduce((acc, curr) => {
    return acc + curr.rating;
  }, 0);

  averageReviews = sumOfReviews / noOfReviews;

  product.averageReview = averageReviews;
  await product.save();

  new ApiResponse(201, 'Review added Successfully', true, review).send(res);
});

export const getReviews = expressAsyncHandler(async (req, res, next) => {});

export const getReview = expressAsyncHandler(async (req, res, next) => {});

export const updateReview = expressAsyncHandler(async (req, res, next) => {});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {});
