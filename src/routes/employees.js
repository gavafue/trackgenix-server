import express from 'express';
import * as Employees from '../controllers/employees';

const router = express.Router();

router
  .post('/', Employees.createEmployee)
  .put('/:id', Employees.updateEmployee);

export default router;
