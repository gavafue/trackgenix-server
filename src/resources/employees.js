const fs = require('fs');
const employees = require('../data/employees.json');

const getAllEmployee = (req, res) => {
  res.status(200).json({
    data: employees,
  });
};

const getOnlyId = (req, res) => {
  const errors = employees.some((user) => user.id === parseInt(req.params.id, 10));
  if (errors) {
    res.json(employees.filter((user) => user.id === parseInt(req.params.id, 10)));
  } else {
    res.status(400).json({ msg: `Member with id:${req.params.id} not found` });
  }
};

const createMember = (req, res) => {
  const newMember = {
    id: req.body.id,
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
  };
  if (!req.body.id || !req.body.firstName || !req.body.lastName || !req.body.birthDate
        || !req.body.country || !req.body.city || !req.body.zip || !req.body.phone
        || !req.body.email || !req.body.password || !req.body.photo || !req.body.active) {
    return res.status(400).json({ msg: 'Please fill in the fields correctly', data: newMember });
  }
  employees.push(newMember);
  fs.writeFile('./src/data/employees.json', JSON.stringify(employees));
  return res.status(200).json({ msg: 'User created successfully', data: newMember });
};

const filterByCountry = (req, res) => {
  const errors2 = employees.some((user) => user.country === req.params.country);
  if (errors2) {
    res.json(employees.filter((user) => user.country === req.params.country));
  } else {
    res.status(400).json({ msg: `Member with nationality: ${req.params.country} not found` });
  }
};

// edit member
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
  const { lastName } = req.params;
  const employeesX = employees.filter((employee) => employee.lastName === lastName);
  if (employeesX.length > 0) {
    res.json({
      data: employeesX,
    });
  } else {
    res.json({ msg: `No employee with the last name ${req.params.lastName}` });
  }
};

export {
  getAllEmployee,
  getOnlyId,
  createMember,
  filterByCountry,
  editEmployeeById,
  deleteEmployeeById,
  filterByLastName,
};
