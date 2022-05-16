import express from 'express';
import projectsControllers from '../controllers/projects-controllers';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .post('/', projectsValidations.validateCreation, projectsControllers.createProject)
  .delete('/:id', projectsValidations.validateId, projectsControllers.deleteProject);

export default router;