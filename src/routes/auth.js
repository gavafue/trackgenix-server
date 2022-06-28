import express from 'express';
import controller from '../controllers/auth';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
const { employeeSignUp, adminSignUp, superadminSignUp } = controller;

router.post('/register-employee', authMiddleware, employeeSignUp);
router.post('/register-admin', authMiddleware, adminSignUp);
router.post('/register-superadmin', authMiddleware, superadminSignUp);

export default router;
