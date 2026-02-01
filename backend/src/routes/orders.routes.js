import { Router } from 'express';
import { 
  getUserOrders, 
  getOrderById, 
  createOrder, 
  updateOrderStatus 
} from '../controllers/orders.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getUserOrders);
router.get('/:id', verifyToken, getOrderById);
router.post('/', verifyToken, createOrder);
router.patch('/:id/status', verifyToken, updateOrderStatus);

export default router;