const userCollection = require("../models/user.models");
const mongoose = require("mongoose");

// const { ObjectId } = mongoose.Types;

const addUser = async (req, res) => {
  console.log(req.body);
  //~ destructured all the data
  let { name, email, password, phoneNo } = req.body;

  //~ add this to database
  userCollection.insertOne({ name, email, password, phoneNo });

  //~ send a response
  res.send("added to db");
};

const fetchAllUsers = async (req, res) => {
  let users = await userCollection.find();
  res.json({ success: true, message: "users fetched", data: users });
};

const fetchOneUser = async (req, res) => {
  console.log(req.params); // { id: '6894515e8ee21bc745018343' }
  let userId = req.params.id;
  // let { id } = req.params;
  console.log(userId); // 6894515e8ee21bc745018343
  let user = await userCollection.findOne({ _id: userId });
  res.json({
    success: true,
    message: "user fetched",
    data: user,
  });
};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

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
