import express from 'express';
import tasksControllers from '../controllers/tasks';
import tasksValidations from '../validations/tasks';

const router = express.Router();

router
  .post('/', tasksValidations.validateCreate, tasksControllers.createTask)
  .put('/:id', tasksValidations.validateId, tasksValidations.validateEdit, tasksControllers.editTask)
  .get('/:id', tasksValidations.validateId, tasksControllers.getTaskById)
  .delete('/:id', tasksValidations.validateId, tasksControllers.deleteTask)
  .get('/', tasksControllers.getAllTask);

export default router;
