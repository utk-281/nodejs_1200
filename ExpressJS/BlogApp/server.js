// npm i express mongoose dotenv bcryptjs jsonwebtoken cookie-parser express-async-handler joi

import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import { connectDB } from './config/database.js';

import blogRoutes from './routers/blog.routes.js'; // import blogRoutes

connectDB();

const app = express();

app.use(express.json());

app.use('/api/v1/blogs', blogRoutes);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    console.log(`Error while connecting to port ${process.env.PORT}`);
    return;
  }
  console.log(`Server is running on port ${process.env.PORT}`);
});
