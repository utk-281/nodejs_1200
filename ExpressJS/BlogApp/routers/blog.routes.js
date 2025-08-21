import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
  updateBlogPut,
} from '../controllers/blog.controller.js';
import validateRequest from '../middlewares/blogValidation.middleware.js';

import { addBlogValidation, updateBlogValidation } from '../validations/blog.validation.js';

const router = Router();

router.post('/add', validateRequest(addBlogValidation), createBlog);
router.get('/all', getBlogs);
router.get('/:id', getBlog);
router.patch('/:id', validateRequest(updateBlogValidation), updateBlog);
router.delete('/:id', deleteBlog);

router.put('/:id', updateBlogPut);

export default router;
