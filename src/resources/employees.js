// edit member
const fs = require('fs');
const employees = require('../data/employees.json');

const editEmployeeById = (req, res) => {
  const { id } = req.params;
  const empFind = employees.find((employee) => employee.id === parseInt(id, 10));
  if (empFind) {
    const editEmployee = req.body;
    empFind.firstName = editEmployee.firstName ? editEmployee.firstName : empFind.firstName;
    empFind.lastName = editEmployee.lastName ? editEmployee.lastName : empFind.lastName;
    empFind.birthDate = editEmployee.birthDate ? editEmployee.birthDate : empFind.birthDate;
    empFind.country = editEmployee.country ? editEmployee.country : empFind.country;
    empFind.city = editEmployee.city ? editEmployee.city : empFind.city;
    empFind.zip = editEmployee.zip ? editEmployee.zip : empFind.zip;
    empFind.phone = editEmployee.phone ? editEmployee.phone : empFind.phone;
    empFind.email = editEmployee.email ? editEmployee.email : empFind.email;
    empFind.password = editEmployee.password ? editEmployee.password : empFind.password;
    empFind.photo = editEmployee.photo ? editEmployee.photo : empFind.photo;
    empFind.active = editEmployee.active ? editEmployee.active : empFind.active;
    fs.writeFile('src/data/employees.json', JSON.stringify(employees), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `The employee with ID ${empFind.id} was edited` });
      }
    });
  } else {
    res.json({ msg: `No employee with the id of ${req.params.id}` });
  }
};

const deleteEmployeeById = (req, res) => {
  const { id } = req.params;
  const employeesX = employees.filter((employee) => employee.id !== parseInt(id, 10));
  if (employees.length === employeesX.length) {
    res.json({ msg: `No employee with the id of ${req.params.id}` });
  } else {
    fs.writeFile('src/data/employees.json', JSON.stringify(employeesX), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `The employee with ID ${req.params.id} was deleted` });
      }
    });
  }
};

const filterByLastName = (req, res) => {
  const lastName = req.params.lastName;
  const employeesX = employees.filter((employee) => employee.lastName === lastName);
  if (employeesX.length > 0) {
    res.json({
      data: employeesX
    })
  } else {
      res.json({ msg: `No employee with the last name ${req.params.lastName}` });
  }
};

export {
  editEmployeeById,
  deleteEmployeeById,
  filterByLastName
};
