import express from 'express';
import controller from '../controllers/auth';
import validations from '../validations/auth';
import authMiddleware from ('../middlewared/authMiddleware');

const router = express.Router();

const {
  register,
  login,
  logout
} = controller;

router.post('/register', validations.required, register);
router.post('/login', validations.required, login);
router.post('/logout', authMiddleware, logout);

export default router;
