import express from 'express';
import tasksRoutes from './tasks';
import employeesRoutes from './employees';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/tasks', tasksRoutes)
  .use('/employees', employeesRoutes)
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
