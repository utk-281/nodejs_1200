//! in every routes file, follow these three steps

//? 1) destructure Router from express.
//? 2) invoke the top level function
//? 3) export it

//! 1)
const { Router } = require("express");
const { displayFormPage } = require("./controller");

//! 2)
let router = Router();

//! 1)  home page
router.get("/", displayFormPage);

//! 3)
module.exports = router;
