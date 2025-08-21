import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    totalBlogs: {
      type: Number,
      required: true,
      default: 0,
    },
    // blogs: [],//TODO:
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  //! if the password field is not modified, return.
  if (!this.isModified('password')) return next();
  //! otherwise, hash the password
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const userCollection = mongoose.model('User', userSchema);
