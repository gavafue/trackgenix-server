import express from 'express';
import controller from '../controllers/auth';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
const { employeeSignUp } = controller;

router.post('/register', authMiddleware, employeeSignUp);

export default router;
