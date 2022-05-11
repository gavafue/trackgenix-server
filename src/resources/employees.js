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

export {
  getAllEmployee,
  getOnlyId,
  createMember,
  filterByCountry,
};
