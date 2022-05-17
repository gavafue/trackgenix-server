import express from 'express';
import projectControllers from '../controllers/projects';
import projectValidation from '../validations/projects';

const router = express.Router();

router
  .get('/', projectControllers.getAllProjects, projectValidation.validateId)
  .get('/:id', projectControllers.getProjectById);

export default router;
