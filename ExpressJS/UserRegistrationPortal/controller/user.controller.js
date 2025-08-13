const userCollection = require("../models/user.models");
const expressAsyncHandler = require("express-async-handler");
const CustomError = require("../utils/CustomError.util");

const addUser = expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  //~ destructured all the data
  let { name, email, password, phoneNo } = req.body;

  // let salt = await bcryptjs.genSalt(10);
  // let hashedPassword = await bcryptjs.hash(password, salt);

  //~ add this to database
  let newUser = await userCollection.create({
    name,
    email,
    password /* : hashedPassword */,
    phoneNo,
  });

  //~ send a response
  res.status(201).json({
    success: true,
    message: "user added",
    data: newUser,
  });
});

const fetchAllUsers = expressAsyncHandler(async (req, res) => {
  let users = await userCollection.find();

  // if (users.length === 0) return res.status(404).json({ message: "no users found" });
  // if (users.length === 0) throw new Error("no users found", 404);
  if (users.length === 0) throw new CustomError("no users found", 404);

  res.json({ success: true, message: "users fetched", count: users.length, data: users });
});

const fetchOneUser = expressAsyncHandler(async (req, res) => {
  console.log(req.params); // { id: '6894515e8ee21bc745018343' }
  let userId = req.params.id;
  // let { id } = req.params;
  console.log(userId); // 6894515e8ee21bc745018343
  let user = await userCollection.findById(userId);

  if (user === null) throw new CustomError("no user found", 404);
  // if(!user)

  res.json({
    success: true,
    message: "user fetched",
    data: user,
  });
});

const updateUser = expressAsyncHandler(async (req, res) => {
  let { name, email, password, phoneNo } = req.body;
  let userId = req.params.id;
  let updatedUSer = await userCollection.findByIdAndUpdate(userId, req.body, { new: true }); // new:true --> return the updated data
  res.json({
    success: true,
    message: "user updated",
    updatedUSer,
  });
});

const deleteUser = expressAsyncHandler(async (req, res) => {
  let userID = req.params.id;

  await userCollection.findByIdAndDelete(userID);

  res.status(200).json({
    success: true,
    message: "user deleted",
  });
});

module.exports = {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
};
