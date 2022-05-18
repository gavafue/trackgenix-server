import Models from '../models/Super-admins';

// const fs = require('fs');
// const superAdminData = require('../data/super-admins.json');

const getAllSa = async (req, res) => {
  try {
    const AllSa = await Models.find({});
    return res.status(200).json(
      {
        message: 'Project found',
        data: AllSa,
        error: false,
      },
    );
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details().message,
    });
  }
};
const getSaById = async (req, res) => {
  try {
    if (req.params.id) {
      const SabyID = await Models.findById(req.params.id);

      return res.status(200).json(SabyID);
    }
    return res.status(400).json({
      msg: 'missing id parameter',
    });
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details().message,
    });
  }
};
const createSa = async (req, res) => {
  try {
    const SuperCreate = new Models({
      firstName: req.body.name,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
    });
    const result = await SuperCreate.save();
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has occurred',
      error: error.details().message,
    });
  }
};

const updateSa = async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({
        msg: 'Missing id paraneter',
      });
    }

    const result = await Models.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!result) {
      return res.status(400).json({
        msg: 'The project has not been found',
      });
    }
    return res.status(201).json(result);
  } catch (error) {
    return res.json({
      msg: 'An error has ocurred',
      error: error.details().message,
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
  getAllSa,
  getSaById,
  createSa,
  deleteSa,
  updateSa,
};
