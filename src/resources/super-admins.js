const fs = require('fs');
const superadminData = require('../data/super-admins.json');

// Getting all Superadmin
const getAllSa = (req, res) => {
  res.status(200).json({
    data: superadminData,
  });
};

// Getting a Superadmin with an ID
const getSaById = (req, res) => {
  const superadminId = req.params.id;
  const superadmin = superadminData.find((item) => item.id === parseInt(superadminId, 10));
  if (!superadmin) {
    res.json({
      msg: 'Superadmin not found',
    });
  } else {
    res.json({
      data: superadmin,
    });
  }
};

// Add a new Superadmin
const putNewSa = (req, res) => {
  const newSaData = req.body;
  superadminData.push(newSaData);
  fs.writeFile('src/data/super-admins.json', JSON.stringify(superadminData), (err) => {
    if (err) {
      res.json({ msg: err });
    } else {
      res.json({ msg: 'Superadmin was created' });
    }
  });
  // eslint-disable-next-line
  res.json({
    msg: 'Superadmin account created',
  });
};

// Delete a Superadmin
const delSa = (req, res) => {
  const delSaId = req.params.id;
  const filteredSuperadmin = superadminData.filter((item) => item.id !== parseInt(delSaId, 10));
  if (superadminData.length === filteredSuperadmin.length) {
    res.json({
      msg: 'Could not delete superadmin because it was not found',
    });
  } else {
    fs.writeFile('src/data/super-admins.json', JSON.stringify(filteredSuperadmin), (err) => {
      if (err) {
        res.json({
          msg: err,
        });
      } else {
        res.json({
          msg: 'Superadmin deleted',
        });
      }
    });
  }
};

// Getting all Superadmin active - still not working
const getActiveSa = (req, res) => {
  const superadminActive = req.query.active;
  let isTrue;
  if (superadminActive === 'true') {
    isTrue = true;
  } else if (superadminActive === 'false') {
    isTrue = false;
  } else {
    isTrue = null;
  }
  const filteredSuperadmin = superadminData.filter((item) => item.active === isTrue);
  if (isTrue === null) {
    res.json({
      msg: "Superadmin not found. Try with 'true' or 'false'.",
    });
  } else {
    res.json({
      data: filteredSuperadmin,
    });
  }
};

export {
  getAllSa,
  getSaById,
  putNewSa,
  delSa,
  getActiveSa,
};
