import AdminModel from '../models/Admins';

const addAdmin = async (req, res) => {
  try {
    const existAdmin = await AdminModel.findOne({ email: req.body.email });
    if (existAdmin) {
      return res.status(200).json({
        message: 'An admin with this email already exists',
        data: undefined,
        error: true,
      });
    }
    const admin = new AdminModel({
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      gender: req.body.gender.toLowerCase(),
      phone: req.body.phone,
      dateBirth: req.body.dateBirth,
      city: req.body.city,
      zip: req.body.zip,
      active: req.body.active,
    });
    const result = await admin.save();
    return res.status(201).json({
      message: 'Admin created successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

export default {
  addAdmin,
};
