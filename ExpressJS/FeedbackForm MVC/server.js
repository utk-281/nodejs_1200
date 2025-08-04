const express = require("express");
const fs = require("fs");
const mongodb = require("mongodb");

const myRoutes = require("./routes");

const connectDB = async () => {
  // step 5
  const client = await mongodb.MongoClient.connect("mongodb://localhost:27017");
  let database = client.db("feedback");
  let collection = database.collection("list");
  return collection;
};

const app = express();

app.use(express.urlencoded({ extended: true })); // lib = queryString (false), QS(true) --> it can parse nested structure
app.use(myRoutes);

//! 2) form page
app.get("/feedback-form", (req, res) => {
  let data = fs.createReadStream("./feedback.html");
  data.pipe(res);
  // res.send("hi");
});

app.post("/abc", async (req, res) => {
  //! form action that should be same as the current endpoint
  //! form method should set to post
  //! use name attribute ==> step 3
  console.log(req.body); // data will be always stored in body
  let { userName, userFeedback, userEmail } = req.body;

  let value = await connectDB(); // step 6
  value.insertOne({ userName, userFeedback, userEmail });

  res.send(`welcome, ${userName} your feedback has been registered with ${userEmail}.
    Feedback ==> ${userFeedback}`);
});

// http://localhost:9000/abc
// http://localhost:9000/all

app.get("/all", async (req, res) => {
  // step 7
  let value = await connectDB();
  let feedbacks = await value.find().toArray();
  res.json({
    success: true,
    message: "feedbacks fetched",
    data: feedbacks,
  });
});

app.get(/(.*)/, (req, res) => {
  res.send("page not found");
});

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log(`server running at http://localhost:9000`);
});

// nodemon filename

// insomnia ==> https://insomnia.rest/

//! for every routes file, import the routes file in main file
//! use it in a middleware
