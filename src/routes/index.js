import express from 'express';
import employeesRoutes from './employees';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/employees', employeesRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
