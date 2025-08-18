import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      minlength: 10,
      maxLength: 1000,
    },
    // createdBy: {},
    //TODO:jwt
    category: {
      type: String,
    },
  },
  {
    timestamps: true, // created_at, updated_at
  }
);

export const blogCollection = mongoose.model('Blog', blogSchema);
// lowercase + plural --> blogs
