const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./config/database.config");

const userRoutes = require("./routes/user.routes");

dotenv.config();

connectDB();

// console.log(process.env);

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/api", userRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server running:", process.env.PORT);
});

// create workspace --> blank workspace --> give name --> create
// create collection --> blanks collection --> give name --> add requests
