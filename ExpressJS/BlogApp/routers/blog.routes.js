import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from '../controllers/blog.controller.js';
import validateRequest from '../middlewares/blogValidation.middleware.js';

import { authenticate } from '../middlewares/auth.middleware.js';
import { addBlogValidation, updateBlogValidation } from '../validations/blog.validation.js';

const router = Router();

router.post('/add', authenticate, validateRequest(addBlogValidation), createBlog);
// injecting middleware
router.get('/all', getBlogs);
router.get('/:id', getBlog);
router.patch('/:id', authenticate, validateRequest(updateBlogValidation), updateBlog);
router.delete('/:id', authenticate, deleteBlog);

export default router;
