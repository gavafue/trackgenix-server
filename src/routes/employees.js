import express from 'express';
import * as employeeControllers from '../controllers/employees';
import * as employeeValidations from '../validations/employees';

const router = express.Router();

router
  .post('/', employeeValidations.validateCreateEmp, employeeControllers.createEmployee)
  .put('/:id', employeeValidations.validateUpdateEmp, employeeControllers.updateEmployee);

export default router;
