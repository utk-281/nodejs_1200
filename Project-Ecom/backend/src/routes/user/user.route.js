import { Router } from "express";

import {
  deleteProfile,
  getCurrentUser,
  login,
  logout,
  register,
  updateProfile,
} from "../../controllers/user/user.controller.js";

import { validate } from "../../middlewares/validate.middleware.js";

import { authenticate } from "../../middlewares/auth.middleware.js";

import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from "../../validations/user.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

router.post("/logout", authenticate, logout);

router.patch("/profile", authenticate, validate(updateProfileSchema), updateProfile);
router.delete("/profile", deleteProfile);

router.get("/getCurrentUser", authenticate, getCurrentUser);

export default router;
