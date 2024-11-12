import express from 'express';
import { userController } from '../controllers/user.controller';

const router = express.Router();
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);
router.post('/register/owner', userController.registerOwner);
router.get('/owner/requests', userController.getOwnerRequests);
router.post('/owner/verify', userController.verifyOwner);
router.get('/info/:id', userController.getUserEmailAndName);

export default router;
