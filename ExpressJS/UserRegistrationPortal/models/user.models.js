//! 1) import mongoose.
//! 2) define a schema/structure.
//! 3) create a collection for that schema.
//! 4) export it.

//~ 1)
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

//~ 2) creating an object of Schema class
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, //--> it will not allow us to store duplicate values
      required: true, //--> this input is must
      lowercase: true, //--> lowercase
      minlength: 4, //--> min length of 4 chars.
      trim: true, //--> remove spaces from start and end
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    phoneNo: {
      type: Number,
      minlength: 10,
    },
  },
  {
    timestamps: true, //TODO:
  }
);

//& pre-hook --> this will work before any new resource is saved in db
userSchema.pre("save", async function () {
  console.log("hi");
  // "save" --> before creating a new resource
  let salt = await bcryptjs.genSalt(10);
  // we are generating a salt/random string of 1024 iterations
  let hashedPassword = await bcryptjs.hash(this.password, salt);
  // pass the salt and user password in hash method
  this.password = hashedPassword;
  // save the hashedPassword in database.
});

//~ 3) creating a collection using model("collectionName", Schema)
let userCollection = mongoose.model("User", userSchema); // users (plural+lowercase --> users)

//~ 4) export
module.exports = userCollection;
