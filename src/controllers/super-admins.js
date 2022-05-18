import SuperAdminModels from '../models/Super-admins';

const getAllSAdmins = async (req, res) => {
  try {
    let getAll = 0;
    if (req.query) {
      getAll = await SuperAdminModels.find(req.query);
      if (getAll.length === 0) {
        return res.status(404).json({
          message: 'Super admin was not found',
          data: undefined,
          error: true,
        });
      }
    } else {
      getAll = await SuperAdminModels.find({});
    }
    return res.status(200).json({
      message: 'The Super admin was found',
      data: getAll,
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

const getSAdminsById = async (req, res) => {
  try {
    if (req.params.id) {
      const superfindAdmin = await SuperAdminModels.findById(req.params.id);
      if (!superfindAdmin) {
        return res.status(404).json({
          message: `The time sheet with id ${req.params.id} has not been found`,
          data: undefined,
          error: true,
        });
      }
      return res.status(200).json({
        message: 'The request was successful',
        data: superfindAdmin,
        error: false,
      });
    }
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: `There was an error: ${error}`,
      data: undefined,
      error: true,
    });
  }
};

const createSAdmin = async (req, res) => {
  try {
    const adminss = await SuperAdminModels.findOne({ project: req.body.project });
    if (adminss) {
      return res.status(200).json({
        message: 'Super admin with this name already exists',
        data: undefined,
        error: true,
      });
    }
    const superAdmin = new SuperAdminModels({
      firstName: req.body.name,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      role: req.body.role,
      active: req.body.active,
    });
    const result = await superAdmin.save();
    return res.status(201).json({
      message: 'Super admin created successfully',
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

const updateSa = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        message: `Id ${req.params.id} does not exist`,
        data: undefined,
        error: true,
      });
    }

    const result = await SuperAdminModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(400).json({
        message: 'There was an error',
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.status(200).json({
      message: 'The Super admin updated successfully',
      data: undefined,
      error: false,
    });
  }
};

const deleteSa = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: 'missing id paraneter',
        data: undefined,
        error: true,
      });
    }
    const result = await SuperAdminModels.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(400).json({
        message: 'The Super admin has not been found',
        data: undefined,
        error: true,
      });
    }
    return res.status(200).json({
      message: 'The Super admin has been susccessfully deleted',
      data: undefined,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: 'An error has occurred',
      data: error.details().message,
      error: true,
    });
  }
};

export default {
  getAllSAdmins,
  getSAdminsById,
  createSAdmin,
  deleteSa,
  updateSa,
};
