import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from '../controllers/blog.controller.js';
import validateRequest from '../middlewares/blogValidation.middleware.js';
import { addBlogValidation } from '../validations/blog.validation.js';

const router = Router();

router.post('/add', validateRequest(addBlogValidation), createBlog);
router.get('/all', getBlogs);
router.get('/:id', getBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
