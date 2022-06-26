import Joi from 'joi';
import mongoose from 'mongoose';

const validateCreation = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firebaseUid: Joi.string().required(),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required().regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .message('Invalid password, it must contain letters and numbers'),
    role: Joi.string().uppercase().valid('SA').required(),
    active: Joi.boolean().required(),
  });
  const validation = superAdminValidation.validate(req.body);
  req.body = validation.value;
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const superAdminValidation = Joi.object({
    firebaseUid: Joi.string(),
    firstName: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(8).regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .message('Invalid password, it must contain letters and numbers'),
    role: Joi.string().uppercase().valid('SA'),
    active: Joi.boolean(),
  });
  const validation = superAdminValidation.validate(req.body);
  req.body = validation.value;
  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.details[0].message}`,
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
      message: `The value ${req.params.id} is not a valid id.`,
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
