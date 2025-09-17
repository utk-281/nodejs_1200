import expressAsyncHandler from "express-async-handler";
import paypal from "../../config/paypal.config.js";
import Address from "../../models/address.model.js";
import Cart from "../../models/cart.model.js";
import Product from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let { paymentMethod, cartId, addressId } = req.body;

  let cart = await Cart.findOne({ _id: cartId, userId });
  if (!cart) return next(new CustomError("Cart not found", 404));

  let address = await Address.findOne({ _id: addressId, userId });
  if (!address) return next(new CustomError("Address not found", 404));

  let addressObject = {
    addressId: address._id,
    address: address.address,
    city: address.city,
    pinCode: address.pinCode,
    phone: address.phone,
    notes: address.notes,
  };

  let totalAmount = 0;
  let cartItems = [];

  for (let item of cart.products) {
    let product = await Product.findById(item.productId);
    if (!product) return next(new CustomError("Product not found", 404));

    totalAmount += product.price * item.quantity;

    cartItems.push({
      image: product.image,
      title: product.title,
      price: product.price,
      salePrice: product.salePrice,
      quantity: item.quantity,
      id: product._id,
    });
  }

  new ApiResponse(201, "Order created successfully", true, totalAmount, cartItems).send(res);
});

export const captureOrder = expressAsyncHandler(async (req, res) => {});

export const getOrders = expressAsyncHandler(async (req, res) => {});

export const getOrder = expressAsyncHandler(async (req, res) => {});
