import express from 'express';
import employeesControllers from '../controllers/employees';
import employeeValidation from '../validations/employees'

const router = express.Router();

router
  .get('/', employeesControllers.getAllEmployee)
  .get('/:id', employeeValidation.idValidation, employeesControllers.getEmployeeById)
  .delete('/:id', employeeValidation.idValidation, employeesControllers.deleteEmployee);
export default router;
