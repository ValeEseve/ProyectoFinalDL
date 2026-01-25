import { Router } from 'express';
import { getPrints, createPrint } from '../controllers/prints.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getPrints);
router.post('/', verifyToken, createPrint);

export default router;
