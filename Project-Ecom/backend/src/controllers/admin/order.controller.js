import expressAsyncHandler from 'express-async-handler';
import Order from '../../models/order.model.js';
import CustomError from '../../utils/CustomError.util.js';
import ApiResponse from '../../utils/ApiResponse.util.js';

export const getOrders = expressAsyncHandler(async (req, res, next) => {
  let orders = await Order.find();
  if (orders.length === 0) return next(new CustomError('No orders found', 404));
  new ApiResponse(200, 'Orders fetched successfully', orders).send(res);
});

export const getOrder = expressAsyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let order = await Order.findById(id);
  if (!order) return next(new CustomError('No order found', 404));
  new ApiResponse(200, 'Order fetched successfully', order).send(res);
});

export const updateOrderStatus = expressAsyncHandler(async (req, res, next) => {
  let id = req.params.id;
  let { orderStatus } = req.body;
  let order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });
  if (!order) return next(new CustomError('No order found', 404));
  new ApiResponse(200, 'Order status updated successfully', order).send(res);
});
