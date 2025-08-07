//! 1) import mongoose.
//! 2) define a schema/structure.
//! 3) create a collection for that schema.
//! 4) export it.

//~ 1)
const mongoose = require("mongoose");

//~ 2) creating an object of Schema class
let userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      //   unique: true, --> it will not allow us to store duplicate values
      //   required: true, --> this input is must
      //   lowercase: true, --> lowercase
      //   minlength: 4, --> min length of 4 chars.
    },
    password: {
      type: String,
    },
    phoneNo: {
      type: Number,
    },
  },
  {
    timestamps: true, //TODO:
  }
);

//~ 3) creating a collection using model("collectionName", Schema)
let userCollection = mongoose.model("User", userSchema); // users (plural+lowercase --> us ers)

//~ 4) export
module.exports = userCollection;
