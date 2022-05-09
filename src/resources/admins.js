const fs = require('fs');
const admins = require('../data/admins.json');

const getAllAdmins = (req, res) => {
  res.status(200).json({
    data: admins,
  });
};

const getAdminById = (req, res) => {
  const adminId = req.params.id;
  const admin = admins.find((item) => item.id === parseInt(adminId, 10));
  if (!admin) {
    res.json({
      msg: `The admin with ID ${adminId} does not exist`,
    });
  } else {
    res.json({
      data: admin,
    });
  }
};

const addAdmin = (req, res) => {
  const adminData = req.body;
  if (adminData.id && adminData.name && adminData.lastName && adminData.email && adminData.password
          && adminData.gender && adminData.phone && adminData.dateBirth && adminData.city
          && adminData.zip && adminData.active) {
    admins.push(adminData);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send(`Admin with ID ${adminData.id} was created`);
      }
    });
  } else {
    res.send(`Admin with ID ${adminData.id} was not created. Please complete all fields`);
  }
};

const deleteAdminById = (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((item) => item.id !== parseInt(adminId, 10));
  if (admins.length === filteredAdmins.length) {
    res.send(`Could not delete admin with ID ${adminId} because it was not found`);
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.send(`Admin with ID ${adminId} was deleted`);
      }
    });
  }
};

export {
  getAllAdmins,
  getAdminById,
  addAdmin,
  deleteAdminById,
  //     //nombre que quiero darle: nombre funcion 1
  //     //nombre que quiero darle: nombre funcion 2
  //     //nombre que quiero darle: nombre funcion 3
};
