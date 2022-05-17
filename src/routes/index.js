import express from 'express';
import employeesRoutes from './employees';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/employees', employeesRoutes)
  .use('/projects', projectsRoutes);

export default router;
