import { Router } from 'express';

import validateRequest from '../middlewares/blogValidation.middleware.js';
import { registerUserValidation } from '../validations/user.validation.js';

import {
  currentLoggedIn,
  deleteUser,
  getProfile,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', validateRequest(registerUserValidation), registerUser);
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);

router.patch('/edit-profile', updateProfile);
router.patch('/edit-password', authenticate, updatePassword);

router.delete('/delete', authenticate, deleteUser);

router.get('/isLoggedIn', authenticate, currentLoggedIn);
router.get('/current-profile/:id', authenticate, getProfile);

export default router;
