import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();
router.post('/getUser', userController.getUser);
router.post('/login', userController.loginUser);
router.post('/login/admin', userController.loginAdmin);
router.post('/register', userController.registerUser);
router.post('/register/owner', userController.registerOwner);

export default router;
