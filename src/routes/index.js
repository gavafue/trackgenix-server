import express from 'express';
import adminRoutes from './admins';
import projectsRoutes from './projects';

const router = express.Router();

router
  .use('/admins', adminRoutes)
  .use('/projects', projectsRoutes);

export default router;
