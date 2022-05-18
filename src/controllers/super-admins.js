import models from '../models/Super-admins';

const getAllSAdmins = async (req, res) => {
    try {
      let getAll = 0;
      if (req.query) {
        getAll = await models.find(req.query);
        if (getAll.length === 0) {
            return res.status(404).json({
                message: 'Super admin was not found',
                data: undefined,
                error: true,
              });
        }
      } else {
        getAll = await models.find({});
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
  };
}

const getSAdminsById = async (req, res) => {
    try {
      if (req.params.id) {
        const project = await models.findById(req.params.id);
        if (!project) {
          return res.status(404).json({
            msg: `The time sheet with id ${req.params.id} has not been found`,
          data: undefined,
          error: true,
          });
        }
        return res.status(200).json({
            msg: 'The request was successful',
            data: timeSheet,
            error: false,
        });
      }
      return res.status(400).json({
        msg: 'Missing id parameter',
        data: undefined,
        error: true,
      });
    } catch (error) {
      return res.json({
        msg: `There was an error: ${error}`,
        data: undefined,
        error: true,
      });
    }
  };


  const createSAdmin = async (req, res) => {
    try {
      const adminss = await models.findOne({ project: req.body.project });
      if (adminss) {
        return res.status(200).json({
          message: 'Super admin with this name already exists',
          data: undefined,
          error: true,
        });
      }
      const timeSheet = new models({
        firstName: req.body.name,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
        active: req.body.active,
      });
      const result = await timeSheet.save();
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

    const result = await models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(400).json({
        message: `There was an error: ${error}`,
        data: undefined,
        error: true,
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
        message: 'The Super admin updated successfully',
        data: result,
        error: false,
    });
  }
};

const deleteSa = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        msg: 'missing id paraneter',
      });
    }
    const result = await Models.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(400).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(200).json({
      msg: 'The project has been susccessfully deleted',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details().message,
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
