import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true /* toJSON:, toObject */ }
);

//! password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  let salt = await bcryptjs.genSalt(10);
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

//! password compare
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

let User = mongoose.model("User", userSchema);
// collection-name == users (lowercase+plural)

export default User;
