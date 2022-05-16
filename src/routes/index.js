import express from 'express';
import employeesRoutes from './employees';

const router = express.Router();

router
  .use('/', employeesRoutes);

export default router;
