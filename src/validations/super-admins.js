import Joi from 'joi';
import mongoose from 'mongoose';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(8).max(10).required(),
    email: Joi.string().min(13).max(50).required(),
  });

  const validation = superAdminValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateId = (req, res, next) => {
  const validation = mongoose.isValidObjectId(req.params.id);
  if (!validation) {
    return res.status(400).json({
      msg: `The value ${req.param.id} is not a valid id.`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

const validateUpdate = (req, res, next) => {
  const projectValidation = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    lastName: Joi.string().min(1).max(50).required(),
    password: Joi.string().min(8).max(10).required(),
    email: Joi.string().min(13).max(50).required(),
  });

  const validation = projectValidation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: 'There was an error during the validation of the request',
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateId,
  validateUpdate,
};
