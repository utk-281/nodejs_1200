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
//
// https://www.amazon.in/s?k=headphones&rh=n%3A976419031%2Cp_123%3A237204&dc&ds=v1%3AOYVWND8fQXpDWb4aqfWu%2BvzGfUc%2FvX%2BhilZNVHfCdyk&crid=313FL6SAMWTEQ&qid=1757575813&rnid=91049095031&sprefix=headphones+%2Caps%2C266&ref=sr_nr_p_123_4
