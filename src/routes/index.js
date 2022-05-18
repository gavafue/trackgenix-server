import express from 'express';
import superAdminsRoutes from './super-admins';
import employeesRoutes from './employees';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/super-admin', superAdminsRoutes)
  .use('/employees', employeesRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
