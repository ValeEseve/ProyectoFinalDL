import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getUsers } from '../controllers/users.controller.js';

const router = Router();

router.get('/', verifyToken, getUsers);

export default router;
