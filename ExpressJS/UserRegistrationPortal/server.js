const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const userRoutes = require("./routes/user.routes");
const { connectDB } = require("./config/database.config");
const { error } = require("./middlewares/error.middlewares");

connectDB();
// console.log(process.env);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", userRoutes);

app.use(error); //! error middleware --> use it at last

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server running:", process.env.PORT);
});

// create workspace --> blank workspace --> give name --> create
// create collection --> blanks collection --> give name --> add requests
