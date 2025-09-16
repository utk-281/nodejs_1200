import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    addressInfo: {
      addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      address: {},
      city: {},
      pinCode: {},
      state: {},
      country: {},
      phone: {},
      notes: {},
    },
    totalAmount: {},
    status: {},
    paymentMethod: {},
    paymentStatus: {},
    paymentId: {},
    payerId: {},
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
