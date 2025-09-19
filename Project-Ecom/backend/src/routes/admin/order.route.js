import { Router } from 'express';

import {
  getOrder,
  getOrders,
  updateOrderStatus,
} from '../../controllers/admin/order.controller.js';

const router = Router();

router.get('/all', getOrders);
router.get('/:id', getOrder);
router.patch('/:id', updateOrderStatus);

export default router;
