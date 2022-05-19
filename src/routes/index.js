import express from 'express';
import superAdminsRoutes from './super-admins';
import timeSheetRoutes from './time-sheets';
import employeesRoutes from './employees';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/super-admin', superAdminsRoutes)
  .use('/timeSheets', timeSheetRoutes)
  .use('/employees', employeesRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
