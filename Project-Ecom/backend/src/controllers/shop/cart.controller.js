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

export const getCart = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;

  let cart = await Cart.findOne({ userId }).populate({
    path: "products.productId", // path of the field which we want to populate(add)
    select: "title desc price salePrice image -_id", // fields which we want to select
  });
  if (!cart) return next(new CustomError("Cart not found", 404));

  new ApiResponse(200, "Cart fetched", true, cart).send(res);
});

export const removeFromCart = expressAsyncHandler(async (req, res) => {});

export const clearCart = expressAsyncHandler(async (req, res) => {});

let oldArr = [
  {
    productId: {
      image: "https://example.com/product1.jpg",
      title: "Mi 11X Pro",
      price: 39999,
      salePrice: 37999,
    },
    quantity: 1,
    _id: "68c7c46de08ad6bfa4c866bc",
  },
  {
    productId: {
      image: "https://example.com/product2.jpg",
      title: "Samsung Galaxy M32",
      price: 15999,
      salePrice: 14999,
    },
    quantity: 3,
  },
];

let newArr = [
  {
    image: "https://example.com/product1.jpg",
    title: "Mi 11X Pro",
    price: 39999,
    salePrice: 37999,
    quantity: 1,
  },
  {
    image: "https://example.com/product2.jpg",
    title: "Samsung Galaxy M32",
    price: 15999,
    salePrice: 14999,
    quantity: 3,
  },
];
