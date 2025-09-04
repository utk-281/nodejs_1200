// npm i express mongoose dotenv express-async-handler bcryptjs cookie-parser jsonwebtoken joi cloudinary multer

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

import error from "./src/middlewares/error.middleware.js";

import userRoutes from "./src/routes/user/user.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// html data -> qs, query-string (by default it is set to false)

app.use("/api/users", userRoutes);

app.use(error);

export default app;
