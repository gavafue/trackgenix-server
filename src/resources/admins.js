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

// const createAdmin = (req, res) => {
//   info = req.body;
// };

export {
  getAllAdmins,
  getAdminById,
  //   createAdmin,
  //     //nombre que quiero darle: nombre funcion 1
  //     //nombre que quiero darle: nombre funcion 2
  //     //nombre que quiero darle: nombre funcion 3
};
