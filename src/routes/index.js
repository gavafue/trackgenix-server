import express from 'express';
import superAdminsRoutes from './super-admins';
import tasksRoutes from './tasks';
import timeSheetRoutes from './time-sheets';
import employeesRoutes from './employees';
import adminRoutes from './admins';
import projectsRoutes from './projects';
import authRoutes from './auth';

const router = express.Router();

router
  .use('/employees', employeesRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes)
  .use('/super-admin', superAdminsRoutes)
  .use('/tasks', tasksRoutes)
  .use('/timeSheets', timeSheetRoutes)
  .use('/register', authRoutes)
  .use('/', (req, res) => res.send('Welcome to Samuel Trackgenix API'));

export default router;
