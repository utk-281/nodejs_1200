import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      // required:true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be positive number"],
    },
    salePrice: {
      type: Number,
      required: true,
      min: [0, "Price must be positive number"],
    },
    category: {
      type: String,
      required: true,
      //   enum: ["electronics", "fashion", "toys", "books", "others"], to give selected options
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Price must be positive number"],
    },
    totalStock: {
      type: Number,
      required: true,
      min: [1, "Price must be positive number"],
      default: 1,
    },
    averageReview: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
