const fs = require("fs");

let displayFormPage = (req, res) => {
  let data = fs.createReadStream("./index.html", "utf-8");
  data.pipe(res);
  // res.send("hi");
};

module.exports = {
  displayFormPage,
};
