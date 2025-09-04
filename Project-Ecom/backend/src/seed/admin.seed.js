import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";

export const seedAdmin = expressAsyncHandler(async () => {
  let existingAdmin = await User.findOne({ role: "admin" });

  if (!existingAdmin) {
    User.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    });
    console.log("admin seeded");
  } else {
    console.log("admin already exists");
  }
});
