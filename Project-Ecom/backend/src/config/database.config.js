import { log } from "console";
import mongoose from "mongoose";

export const connectDB = async () => {
  let client = await mongoose.connect(process.env.MONGODB_LOCAL_URL);
  log("Database connected successfully to: " + client.connection.host);
};
