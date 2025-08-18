import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from '../controllers/blog.controller.js';

const router = Router();

router.post('/add', createBlog);
router.get('/all', getBlogs);
router.get('/:id', getBlog);
router.patch('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
