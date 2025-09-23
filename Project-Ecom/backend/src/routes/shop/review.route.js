import { Router } from 'express';
import { addReview } from '../../controllers/shop/review.controller.js';

const router = Router();

router.post('/add', addReview);

export default router;
