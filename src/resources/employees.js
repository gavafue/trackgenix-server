// edit member
const fs = require('fs');
const employees = require('../data/employees.json');

const editEmployeeById = (req, res) => {
  const { id } = req.params;
  const employeeFind = employees.find((employee) => employee.id === parseInt(id, 10));
  if (employeeFind) {
    console.log(employeeFind);
    const editEmployee = req.body;
        employeeFind.firstName = editEmployee.firstName ? editEmployee.firstName : employeeFind.firstName;
        employeeFind.lastName = editEmployee.lastName ? editEmployee.lastName : employeeFind.lastName;
        employeeFind.birthDate = editEmployee.birthDate ? editEmployee.birthDate : employeeFind.birthDate;
        employeeFind.country = editEmployee.country ? editEmployee.country : employeeFind.country;
        employeeFind.city = editEmployee.city ? editEmployee.city : employeeFind.city;
        employeeFind.zip = editEmployee.zip ? editEmployee.zip : employeeFind.zip;
        employeeFind.phone = editEmployee.phone ? editEmployee.phone : employeeFind.phone;
        employeeFind.email = editEmployee.email ? editEmployee.email : employeeFind.email;
        employeeFind.password = editEmployee.password ? editEmployee.password : employeeFind.password;
        employeeFind.photo = editEmployee.photo ? editEmployee.photo : employeeFind.photo;
        employeeFind.active = editEmployee.active ? editEmployee.active : employeeFind.active;
        console.log(employeeFind);
        console.log(employeeFind.firstName);
        fs.writeFile('src/data/employees.json', JSON.stringify(employees), (error) => {
          if (error) {
            res.send(error);
          } else {
            res.json({ msg: `The employee with ID ${employeeFind.id} was edited` });
          }
        });
        console.log(employees);
  } else {
    res.json({ msg: `No employee with the id of ${req.params.id}` });
  }
};

const deleteEmployeeById = (req, res) => {
  const { id } = req.params;
  const employeesX = employees.filter(employee => employee.id !== parseInt(id, 10));
  if (employees.length === employeesX.length) {
    res.json({ msg: `No employee with the id of ${req.params.id}` });
  } else {
      console.log(employeesX);
      fs.writeFile('src/data/employees.json', JSON.stringify(employeesX), (error) => {
        if (error) {
          res.send(error);
        } else {
          res.json({ msg: `The employee with ID ${employeeFind.id} was deleted` });
        }
      });
  }
};

export {
  editEmployeeById,
  deleteEmployeeById
};
