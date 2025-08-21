import { Router } from 'express';

import validateRequest from '../middlewares/blogValidation.middleware.js';
import { registerUserValidation } from '../validations/user.validation.js';

import {
  deleteUser,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from '../controllers/user.controller.js';

const router = Router();

router.post('/register', validateRequest(registerUserValidation), registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.patch('/edit-profile', updateProfile);
router.patch('/edit-password', updatePassword);

router.delete('/delete', deleteUser);

export default router;
