import express from 'express';
import controller from '../controllers/auth';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();
const { employeeSignUp, adminSignUp, superadminSignUp } = controller;

router.post('/employee', employeeSignUp);
router.post('/admin', authMiddleware, adminSignUp);
router.post('/superadmin', authMiddleware, superadminSignUp);

export default router;
