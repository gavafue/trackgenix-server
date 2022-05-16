import EmployeeModel from '../models/Employees';
import { employeeCreateSchema, employeeUpdateSchema } from '../validations/employees';

const createEmployee = async (req, res) => {
  try {
    const authEmp = await employeeCreateSchema.validateAsync(req.body);
    const itExist = await EmployeeModel.findOne({ email: authEmp.email });
    if (itExist) {
      return res.status(200).json({
        message: 'Employee account with this email already exists',
        data: undefined,
        error: true,
      });
    }
    const employee = new EmployeeModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
      country: req.body.country,
      city: req.body.city,
      zip: req.body.zip,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
      active: req.body.active,
    });
    const succes = await employee.save();
    return res.status(201).json({
      message: 'Employee created succesfully',
      data: succes,
      error: false,
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        message: `An error has ocurred: ${error}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(400).json({
      message: `An error has occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const authEmp = await employeeUpdateSchema.validateAsync(req.body);
    const employeeId = req.params.id;
    const focusEmployee = await EmployeeModel.findOne(employeeId);
    if (focusEmployee && authEmp) {
      const updEmployee = req.body;
      Object.keys(focusEmployee).forEach((item) => {
        focusEmployee[item] = updEmployee[item] ? updEmployee[item] : focusEmployee[item];
      });
      const succes = await focusEmployee.save();
      return res.status(200).json({
        message: 'Employee updated succesfully',
        data: succes,
        error: false,
      });
    }
    return res.status(200).json({
      message: `Employee with ID ${employeeId} not found`,
      data: undefined,
      error: true,
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        message: `An error has ocurred: ${error}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(400).json({
      message: `An error has occurred: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export {
  createEmployee,
  updateEmployee,
};
