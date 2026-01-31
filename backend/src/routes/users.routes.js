import { Router } from 'express';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { getUsers, updateMe, updateProfileImage } from '../controllers/users.controller.js';

const router = Router();

router.get('/', verifyToken, getUsers);
router.post("/me", verifyToken, updateProfileImage)
router.put("/me", verifyToken, updateMe)

export default router;
