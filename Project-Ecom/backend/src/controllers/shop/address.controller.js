import expressAsyncHandler from "express-async-handler";
import Address from "../../models/address.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const addAddress = expressAsyncHandler(async (req, res) => {
  let userId = req.myUser._id;
  let { address, city, state, pinCode, phone, notes } = req.body;

  let newAddress = await Address.create({ address, city, state, pinCode, phone, notes, userId });

  new ApiResponse(201, "Address added successfully", newAddress).send(res);
});

export const getAddresses = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let addresses = await Address.find({ userId });

  if (addresses.length === 0) return next(new CustomError("No addresses found", 404));

  new ApiResponse(200, "Addresses fetched successfully", addresses).send(res);
});

export const getAddress = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let id = req.params.id;
  let address = await Address.findOne({ userId, _id: id });

  if (!address) return next(new CustomError("No address found", 404));

  new ApiResponse(200, "Address fetched successfully", address).send(res);
});

export const updateAddress = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let id = req.params.id;
  let address = await Address.findOneAndUpdate({ userId, _id: id }, req.body, {
    new: true, // this returns the updated document
    runValidators: true, // this runs check the schema
  });

  if (!address) return next(new CustomError("No address found", 404));

  new ApiResponse(200, "Address updated successfully", address).send(res);
});

export const deleteAddress = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  let id = req.params.id;
  let address = await Address.findOneAndDelete({ userId, _id: id });

  if (!address) return next(new CustomError("No address found", 404));

  new ApiResponse(200, "Address deleted successfully", address).send(res);
});
