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
    blogs: [
      {
        blogId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Blog',
        },
        _id: false,
      },
    ],
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

// schemaName.methods.methodName = function () {};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const userCollection = mongoose.model('User', userSchema);

let user = {
  userName: 'John Doe',
  email: 'YKt7V@example.com',
  password: '123456',
  totalBlogs: 2,
  blogs: [{ blogId: '34567' }, { blogId: 546789 }],
};
