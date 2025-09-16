import expressAsyncHandler from "express-async-handler";
import Cart from "../../models/cart.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const addToCart = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;
  let { productId } = req.body; // "123"
  let quantity = 1;

  let cart = await Cart.findOne({ userId });
  if (!cart) await Cart.create({ userId, products: [] });
  console.log(cart);

  let index = cart.products.findIndex((item) => {
    return item.productId.toString() === productId; // "123" === "123"
  });

  if (index === -1) {
    cart.products.push({ productId, quantity });
  } else {
    cart.products[index].quantity += 1;
  }

  await cart.save();
  new ApiResponse(201, "Product added to cart", true).send(res);
});

export const getCart = expressAsyncHandler(async (req, res, next) => {
  let totalAmount = 0;
  let userId = req.myUser._id;

  let cart = await Cart.findOne({ userId }).populate({
    path: "products.productId", // path of the field which we want to populate(add)
    select: "title desc price salePrice image _id", // fields which we want to select
  });
  if (!cart) return next(new CustomError("Cart not found", 404));

  // let modifiedProducts = cart.products.map((item) => ({
  //   image: item.productId.image,
  //   title: item.productId.title,
  //   price: item.productId.price,
  //   salePrice: item.productId.salePrice,
  //   quantity: item.quantity,
  //   id: item._id,
  // }));
  let modifiedProducts = cart.products.map((item) => {
    console.log(item);
    totalAmount += item.productId.price * item.quantity;
    return {
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      id: item.productId._id,
    };
  });

  if (modifiedProducts.length === 0) return next(new CustomError("Cart is empty", 404));

  new ApiResponse(200, "Cart fetched", true, modifiedProducts, totalAmount).send(res);
});

export const removeFromCart = expressAsyncHandler(async (req, res, next) => {
  let totalAmount = 0;
  let userId = req.myUser._id;
  let { productId } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) return next(new CustomError("Cart not found", 404));

  let index = cart.products.findIndex((item) => {
    return item.productId.toString() === productId;
  });
  if (index === -1) return next(new CustomError("Product not found in cart", 404));

  if (cart.products[index].quantity === 1) {
    cart.products.splice(index, 1);
  } else {
    cart.products[index].quantity -= 1;
  }
  await cart.save();

  let populatedCart = await Cart.findOne({ userId }).populate({
    path: "products.productId", // path of the field which we want to populate(add)
    select: "title desc price salePrice image _id", // fields which we want to select
  });

  let modifiedProducts = populatedCart.products.map((item) => {
    totalAmount += item.productId.price * item.quantity;
    console.log(item);
    return {
      image: item.productId.image,
      title: item.productId.title,
      price: item.productId.price,
      salePrice: item.productId.salePrice,
      quantity: item.quantity,
      id: item.productId._id,
    };
  });

  if (modifiedProducts.length === 0) return next(new CustomError("Cart is empty", 404));

  new ApiResponse(200, "Product removed from cart", true, modifiedProducts, totalAmount).send(res);
});

export const clearCart = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;

  let cart = await Cart.findOne({ userId });
  if (!cart) return next(new CustomError("Cart not found", 404));

  cart.products = [];
  await cart.save();

  new ApiResponse(200, "Cart cleared", true).send(res);
});
