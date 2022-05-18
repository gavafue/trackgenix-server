import express from 'express';
import timeSheetRoutes from './time-sheets';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/timeSheets', timeSheetRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
