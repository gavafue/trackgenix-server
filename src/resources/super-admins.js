const fs = require('fs');
const superAdminData = require('../data/super-admins.json');

// Getting all Superadmin
const getAllSa = (req, res) => {
  res.status(200).json({
    data: superAdminData,
  });
};

// Getting a Superadmin with an ID
const getSaById = (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const superAdmin = superAdminData.find((item) => item.id === superAdminId);
  if (!superAdmin) {
    res.json({
      msg: `Super Admin ID: ${superAdminId} not found`,
    });
  } else {
    res.json({
      data: superAdmin,
    });
  }
};

// Add a new Superadmin
const createSa = (req, res) => {
  const newSaData = req.body;
  superAdminData.push(newSaData);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdminData), (err) => {
    if (err) {
      res.json({ msg: err });
    } else {
      res.json({ msg: 'Super Admin was created' });
    }
  });
  res.json({
    msg: 'Super Admin account created',
  });
};

// Delete a Superadmin
const deleteSa = (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const filteredSuperAdmin = superAdminData.filter((item) => item.id !== superAdminId);
  if (superAdminData.length === filteredSuperAdmin.length) {
    res.json({
      msg: `Could not delete Super Admin of ID: ${superAdminId} because it was not found`,
    });
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredSuperAdmin), (err) => {
      if (err) {
        res.json({
          msg: err,
        });
      } else {
        res.json({
          msg: `Super Admin of ID: ${superAdminId}, deleted`,
        });
      }
    });
  }
};

// Getting all Superadmin active
const getActiveSa = (req, res) => {
  const superAdminActive = req.query.active;
  let isTrue;
  if (superAdminActive === 'true') {
    isTrue = true;
  } else if (superAdminActive === 'false') {
    isTrue = false;
  } else {
    isTrue = null;
  }
  const filteredSuperAdmin = superAdminData.filter((item) => item.active === isTrue);
  if (isTrue === null) {
    res.json({
      msg: "Super Admin not found. Try with 'true' or 'false'.",
    });
  } else {
    res.json({
      data: filteredSuperAdmin,
    });
  }
};

// Edit a Superadmin
const editSa = (req, res) => {
  const superAdminId = parseInt(req.params.id, 10);
  const focusSa = superAdminData.find((item) => item.id === superAdminId);
  if (focusSa) {
    const updSuperAdmin = req.body;
    superAdminData.forEach((item) => {
      if (item.id === superAdminId) {
        const newSa = item;
        newSa.firstName = updSuperAdmin.firstName ? updSuperAdmin.firstName : item.firstName;
        newSa.email = updSuperAdmin.email ? updSuperAdmin.email : item.email;
        newSa.role = updSuperAdmin.role ? updSuperAdmin.role : item.role;
        newSa.password = updSuperAdmin.password ? updSuperAdmin.password : item.password;
        newSa.active = updSuperAdmin.active ? updSuperAdmin.active : item.active;
        fs.writeFile('src/data/super-admins.json', JSON.stringify(superAdminData), (err) => {
          if (err) {
            res.json({
              msg: err,
            });
          } else {
            res.json({
              msg: 'Super Admin updated sucesfully',
            });
          }
        });
      }
    });
  } else {
    res.json({
      msg: `Super Admin ID: ${superAdminId}  not found.`,
    });
  }
};

export {
  getAllSa,
  getSaById,
  createSa,
  deleteSa,
  getActiveSa,
  editSa,
};
