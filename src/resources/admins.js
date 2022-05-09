const fs = require('fs');
const admins = require('../data/admins.json');

const getAllAdmins = (req, res) => {
  res.status(200).json({
    data: admins,
  });
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

const getAdminByGender = (req, res) => {
  const { gender } = req.query;
  const adminGender = gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();
  const filteredAdmins = admins.filter((item) => item.gender === adminGender);
  if (filteredAdmins.length > 0) {
    res.send(filteredAdmins);
  } else {
    res.send(`There are no admins with gender: ${adminGender}`);
  }
};

const getAdminByName = (req, res) => {
  const { name } = req.query;
  const adminName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
  const filteredAdmins = admins.filter((item) => item.name === adminName);
  if (filteredAdmins.length > 0) {
    res.send(filteredAdmins);
  } else {
    res.send(`There are no admins with the name: ${adminName}`);
  }
};

export {
  getAllAdmins,
  addAdmin,
  getAdminById,
  deleteAdminById,
  getAdminByGender,
  getAdminByName,
};
