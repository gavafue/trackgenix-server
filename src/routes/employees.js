import express from 'express';
import employeesControllers from '../controllers/employees';

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployee)
  .get('/:id', employeesControllers.getEmployeeById)
  .delete('/:id', employeesControllers.deleteEmployee);
export default router;
