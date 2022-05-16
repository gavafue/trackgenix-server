import express from 'express';
import * as Employees from '../controllers/employees';

const router = express.Router();

router
  .post('/employees/', Employees.createEmployee)
  .put('/employees/', Employees.updateEmployee);

export default router;
