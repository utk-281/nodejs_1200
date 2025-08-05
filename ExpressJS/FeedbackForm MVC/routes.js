//! in every routes file, follow these three steps

//? 1) destructure Router from express.
//? 2) invoke the top level function
//? 3) export it

//! 1)
const { Router } = require("express");
const {
  displayFormPage,
  displayHomePage,
  formSubmit,
  displayAllFeedbacks,
  pageNotFound,
} = require("./controller");

//! 2)
let router = Router();

//! a)  home page
router.get("/", displayHomePage);

//! b) form page
router.get("/feedback-form", displayFormPage);

router.post("/submit", formSubmit);

router.get("/all", displayAllFeedbacks);

router.get(/(.*)/, pageNotFound);

//! 3)
module.exports = router;
