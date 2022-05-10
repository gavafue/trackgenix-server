// edit member
const employees = require('../data/employees.json');

const getEmployeeById = (req, res) => {
  const { id } = req.params;
  const employeeFind = employees.find((employee) => employee.id === parseInt(id));
  if (employeeFind) {
    res.send(employeeFind);
  } else {
    res.send('Employee not found');
  }
};

export {
  getEmployeeById,
};
