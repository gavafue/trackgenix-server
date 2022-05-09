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
  // eslint-disable-next-line radix
  const superadmin = superadminData.find((item) => item.id === parseInt(superadminId));
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

export {
  getAllSa,
  getSaById,
};
