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

export {
  getAllSa,
  getSaById,
  putNewSa,
};
