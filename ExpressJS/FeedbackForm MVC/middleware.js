const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.body);
  req.body.isLogged = false;
  next();
});

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/download", (req, res) => {
  res.send("download page");
});

app.post("/xyz", (req, res) => {
  res.json(req.body);
});

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running........");
});

//! middlewares => they are functions, which comes in between req and response and have access to req and res object and also next() which calls the next middleware present, if no middlewares present then req will go the controller (cb function). we define middleware with use().

//? different types of middlewares ==>
// application level middlewares
// built-in middlewares
// user-defined middlewares
// router level middlewares
// error level middlewares

// req --> cb function (controller)
// req --> middleware1 (next) --> middleware2 (next) --> cb function
