const express = require("express");
const myRoutes = require("./routes");

const app = express();

app.use(express.urlencoded({ extended: true })); // lib = queryString (false), QS(true) --> it can parse nested structure
app.use("/abc", myRoutes);

// "/abc" --> static path/ api version

// http://localhost:9000/abc
// http://localhost:9000/all

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log(`server running at http://localhost:9000`);
});

// nodemon filename

// insomnia ==> https://insomnia.rest/

//! for every routes file, import the routes file in main file
//! use it in a middleware
