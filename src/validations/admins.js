import Joi from 'joi';
import mongoose from 'mongoose';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    gender: Joi.string().lowercase().required().valid('female', 'male', 'other'),
    phone: Joi.number().integer()
      .min(1000000000)
      .message('Invalid phone number, it must contain 10 numbers')
      .max(9999999999)
      .message('Invalid phone number, it must contain 10 numbers')
      .required(),
    dateBirth: Joi.date().less('now').required(),
    city: Joi.string().min(3).required(),
    zip: Joi.number().integer()
      .min(1000)
      .message('Invalid zip number, it must not contain less than 4 numbers')
      .max(99999)
      .message('Invalid zip number, it must not contain more than 5 numbers')
      .required(),
    active: Joi.boolean().required(),
  });
  const validation = adminValidation.validate(req.body);
  req.body = validation.value;
  if (validation.error) {
    return res.status(400).json({
      msg: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50),
    lastName: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    password: Joi.string().min(8),
    gender: Joi.string().lowercase({ convert: true }).valid('female', 'male', 'other'),
    phone: Joi.number().integer()
      .min(1000000000)
      .message('Invalid phone number, it must contain 10 numbers')
      .max(9999999999)
      .message('Invalid phone number, it must contain 10 numbers'),
    dateBirth: Joi.date().less('now'),
    city: Joi.string().min(3),
    zip: Joi.number().integer()
      .min(1000)
      .message('Invalid zip number, it must not contain less than 4 numbers')
      .max(99999)
      .message('Invalid zip number, it must not contain more than 5 numbers'),
    active: Joi.boolean(),
  });
  const validation = adminValidation.validate(req.body);
  req.body = validation.value;
  if (validation.error) {
    return res.status(400).json({
      msg: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateID = (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).json({
      message: 'Missing id parameter',
      data: undefined,
      error: true,
    });
  }
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      message: `The id: ${req.params.id} is not valid`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
  validateID,
  validateUpdate,
};
