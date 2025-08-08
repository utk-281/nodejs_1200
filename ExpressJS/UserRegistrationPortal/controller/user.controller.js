const userCollection = require("../models/user.models");
const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Types;

const addUser = async (req, res) => {
  try {
    console.log(req.body);
    //~ destructured all the data
    let { name, email, password, phoneNo } = req.body;

    //~ add this to database
    let newUser = await userCollection.insertOne({ name, email, password, phoneNo });

    //~ send a response
    res.status(201).json({
      success: true,
      message: "user added",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while adding user",
      obj: error,
    });
  }
};

const fetchAllUsers = async (req, res) => {
  try {
    let users = await userCollection.find();

    if (users.length === 0) return res.status(404).json({ message: "no users found" });

    res.json({ success: true, message: "users fetched", count: users.length, data: users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching users",
      obj: error,
    });
  }
};

const fetchOneUser = async (req, res) => {
  try {
    console.log(req.params); // { id: '6894515e8ee21bc745018343' }
    let userId = req.params.id;
    // let { id } = req.params;
    console.log(userId); // 6894515e8ee21bc745018343
    let user = await userCollection.findOne({ _id: userId });

    if (user === null) return res.status(404).json({ message: "no user found" });
    // if(!user)

    res.json({
      success: true,
      message: "user fetched",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while fetching one user",
      obj: error,
    });
  }
};

const updateUser = async (req, res) => {
  let { name, email, password, phoneNo } = req.body;
  let userId = req.params.id;
  await userCollection.updateOne(
    { _id: userId },
    {
      $set: req.body,
    }
  );
  res.json({
    success: true,
    message: "user updated",
  });
};

const deleteUser = async (req, res) => {
  let userID = req.params.id;

  await userCollection.deleteOne({ _id: userID });

  res.status(200).json({
    success: true,
    message: "user deleted",
  });
};

module.exports = {
  addUser,
  fetchAllUsers,
  fetchOneUser,
  updateUser,
  deleteUser,
};

// insomnia.rest
// https://www.amazon.in/soundcore-Bluetooth-Headphones-Cancelling-Personalization/dp/B0C3HCD34R/ref=sr_1_1_sspa?crid=2934C75DYQODT&dib=eyJ2IjoiMSJ9.ORNhejIUJOR46HObtrq3WeoT-vJ2-uyUEyLYijY2h5JkJ1xotbLons3hQNhD7l4FKw_FiC6r7e9vnJXT8bXQzzmz7oTMScnJHHNx50_Lv7INR5Pdmk1sEXPTCIwCKj_Q1FaaGykNCbms9QZKjxQGEYuYknxprKhLNKE-4YRdC8WtEmBPYm_osoUsPrWWWo5Q6dIrYVZmc5Abdejz9hdWBfPwBriqtBPj0mptAj8RTzU.VwqZ32NoMl_KNSCLkCHCSwOT0MU2O8r2O3cjRGaQbC0&dib_tag=se&keywords=headphones&qid=1754552229&sprefix=headphones%2Caps%2C215&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1

// https://www.amazon.in/Launched-Noise-Headphones-Playtime-Latency/dp/B0B1PXM75C/ref=sr_1_2_sspa?crid=2934C75DYQODT&dib=eyJ2IjoiMSJ9.ORNhejIUJOR46HObtrq3WeoT-vJ2-uyUEyLYijY2h5JkJ1xotbLons3hQNhD7l4FKw_FiC6r7e9vnJXT8bXQzzmz7oTMScnJHHNx50_Lv7INR5Pdmk1sEXPTCIwCKj_Q1FaaGykNCbms9QZKjxQGEYuYknxprKhLNKE-4YRdC8WtEmBPYm_osoUsPrWWWo5Q6dIrYVZmc5Abdejz9hdWBfPwBriqtBPj0mptAj8RTzU.VwqZ32NoMl_KNSCLkCHCSwOT0MU2O8r2O3cjRGaQbC0&dib_tag=se&keywords=headphones&qid=1754552229&sprefix=headphones%2Caps%2C215&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1

// http://localhost:9000/api/one/673198eyhuhsdaowdj

/*
{
        name: "new name",
        email: email,
        password: password,
        phoneNo: phoneNo,
      },
*/

function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

asyncHandler(async (req, res) => {});
