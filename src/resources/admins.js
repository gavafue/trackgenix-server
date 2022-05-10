const fs = require('fs');
const admins = require('../data/admins.json');

const getAllAdmins = (req, res) => {
  res.status(200).json({ data: admins });
};

const addAdmin = (req, res) => {
  const adminData = req.body;
  const admin = admins.find((item) => item.id === parseInt(adminData.id, 10));
  if (admin) {
    res.json({ msg: `The admin with ID ${adminData.id} already exists. Please use a new ID` });
  } else if (adminData.id && adminData.name && adminData.lastName && adminData.email
            && adminData.password && adminData.gender && adminData.phone && adminData.dateBirth
            && adminData.city && adminData.zip && adminData.active) {
    admins.push(adminData);
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `Admin with ID ${adminData.id} was created` });
      }
    });
  } else {
    res.json({ msg: `Admin with ID ${adminData.id} was not created. Please complete all fields` });
  }
};

const updateAdmin = (req, res) => {
  const adminId = req.params.id;
  const admin = admins.find((item) => item.id === parseInt(adminId, 10));
  if (!admin) {
    res.json({ msg: `The admin with ID ${adminId} does not exist` });
  } else {
    const adminInfo = req.body;
    Object.keys(admin).forEach((item) => {
      admin[item] = adminInfo[item] ? adminInfo[item] : admin[item];
    });
    fs.writeFile('src/data/admins.json', JSON.stringify(admins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `The admin with ID ${adminId} was updated` });
      }
    });
  }
};

const getAdminById = (req, res) => {
  const adminId = req.params.id;
  const admin = admins.find((item) => item.id === parseInt(adminId, 10));
  if (!admin) {
    res.json({ msg: `The admin with ID ${adminId} does not exist` });
  } else {
    res.json({ data: admin });
  }
};

const deleteAdminById = (req, res) => {
  const adminId = req.params.id;
  const filteredAdmins = admins.filter((item) => item.id !== parseInt(adminId, 10));
  if (admins.length === filteredAdmins.length) {
    res.json({ msg: `Could not delete admin with ID ${adminId} because it was not found` });
  } else {
    fs.writeFile('src/data/admins.json', JSON.stringify(filteredAdmins), (error) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ msg: `Admin with ID ${adminId} was deleted` });
      }
    });
  }
};

const getAdminByGender = (req, res) => {
  const { gender } = req.query;
  const adminGender = gender.substring(0, 1).toUpperCase() + gender.substring(1).toLowerCase();
  const filteredAdmins = admins.filter((item) => item.gender === adminGender);
  if (filteredAdmins.length > 0) {
    res.json({ data: filteredAdmins });
  } else {
    res.json({ msg: `There are no admins with gender: ${adminGender}` });
  }
};

const getAdminByName = (req, res) => {
  const { name } = req.query;
  const adminName = name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase();
  const filteredAdmins = admins.filter((item) => item.name === adminName);
  if (filteredAdmins.length > 0) {
    res.json({ data: filteredAdmins });
  } else {
    res.json({ msg: `There are no admins with the name: ${adminName}` });
  }
};

export {
  getAllAdmins,
  addAdmin,
  updateAdmin,
  getAdminById,
  deleteAdminById,
  getAdminByGender,
  getAdminByName,
};
