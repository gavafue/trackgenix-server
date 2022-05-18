import express from 'express';
import employeeControllers from '../controllers/employees';
import employeeValidations from '../validations/employees';

const router = express.Router();

router
  .get('/', employeeControllers.getAllEmployee)
  .get('/:id', employeeValidations.idValidation, employeeControllers.getEmployeeById)
  .delete('/:id', employeeValidations.idValidation, employeeControllers.deleteEmployee)
  .post('/', employeeValidations.validateCreateEmp, employeeControllers.createEmployee)
  .put('/:id', employeeValidations.validateUpdateEmp, employeeControllers.updateEmployee);

export default router;
