const fs = require("fs");
const { connectDB } = require("./database");

let displayHomePage = (req, res) => {
  let data = fs.createReadStream("./index.html", "utf-8");
  data.pipe(res);
  // res.send("hi");
};

let displayFormPage = (req, res) => {
  let data = fs.createReadStream("./feedback.html");
  data.pipe(res);
  // res.send("hi");
};

let formSubmit = async (req, res) => {
  //! form action that should be same as the current endpoint
  //! form method should set to post
  //! use name attribute ==> step 3
  console.log(req.body); // data will be always stored in body
  let { userName, userFeedback, userEmail } = req.body;

  let value = await connectDB(); // step 6
  value.insertOne({ userName, userFeedback, userEmail });

  res.send(`welcome, ${userName} your feedback has been registered with ${userEmail}.
    Feedback ==> ${userFeedback}`);
};

let displayAllFeedbacks = async (req, res) => {
  // step 7
  let value = await connectDB();
  let feedbacks = await value.find().toArray();
  res.json({
    success: true,
    message: "feedbacks fetched",
    data: feedbacks,
  });
};

let pageNotFound = (req, res) => {
  res.send("page not found");
};

module.exports = {
  displayHomePage,
  displayFormPage,
  formSubmit,
  displayAllFeedbacks,
  pageNotFound,
};
