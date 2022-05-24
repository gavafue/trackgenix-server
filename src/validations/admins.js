import Joi from 'joi';
import mongoose from 'mongoose';

const validateCreation = (req, res, next) => {
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50)
      .messages({
        'string.min': 'Invalid name, it must not contain less than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
      })
      .required(),
    lastName: Joi.string().min(3).max(50)
      .messages({
        'string.min': 'Invalid last name, it must not contain less than 3 letters',
        'string.max': 'Invalid last name, it must not contain more than 50 letters',
      })
      .required(),
    email: Joi.string()
      .email()
      .message('Invalid email format')
      .required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base': 'Invalid password, it must contain both letters and numbers',
      })
      .required(),
    gender: Joi.string().lowercase().valid('female', 'male', 'other')
      .messages({ 'any.only': 'Invalid gender, it must be one of "Female", "Male" or "Other"' })
      .required(),
    phone: Joi.string().length(10)
      .messages({
        'string.length': 'Invalid phone number, it must contain 10 digits',
        'string.base': 'Invalid phone number, it must be a string',
      })
      .required(),
    dateBirth: Joi.date().less('now')
      .message('Invalid date, it must be before the current date')
      .required(),
    city: Joi.string().min(3)
      .message('Invalid city name, it must contain at least 3 letters')
      .required(),
    zip: Joi.string().min(4).max(5)
      .messages({
        'string.min': 'Invalid zip number, it must not contain less than 4 digits',
        'string.max': 'Invalid zip number, it must not contain more than 5 digits',
        'string.base': 'Invalid zip number, it must be a string',
      })
      .required(),
    active: Joi.boolean()
      .messages({ 'boolean.base': 'Invalid active value, it must be a boolean' })
      .required(),
  });
  const validation = adminValidation.validate(req.body);
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
  const adminValidation = Joi.object({
    name: Joi.string().min(3).max(50)
      .messages({
        'string.min': 'Invalid name, it must not contain less than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 50 letters',
      }),
    lastName: Joi.string().min(3).max(50)
      .messages({
        'string.min': 'Invalid last name, it must not contain less than 3 letters',
        'string.max': 'Invalid last name, it must not contain more than 50 letters',
      }),
    email: Joi.string()
      .email()
      .message('Invalid email format'),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
      .messages({
        'string.min': 'Invalid password, it must contain at least 8 characters',
        'string.pattern.base': 'Invalid password, it must contain both letters and numbers',
      }),
    gender: Joi.string().lowercase().valid('female', 'male', 'other')
      .messages({ 'any.only': 'Invalid gender, it must be one of "Female", "Male" or "Other"' }),
    phone: Joi.string().length(10)
      .messages({
        'string.length': 'Invalid phone number, it must contain 10 digits',
        'string.base': 'Invalid phone number, it must be a string',
      }),
    dateBirth: Joi.date().less('now')
      .message('Invalid date, it must be before the current date'),
    city: Joi.string().min(3)
      .message('Invalid city name, it must contain at least 3 letters'),
    zip: Joi.string().min(4).max(5)
      .messages({
        'string.min': 'Invalid zip number, it must not contain less than 4 digits',
        'string.max': 'Invalid zip number, it must not contain more than 5 digits',
        'string.base': 'Invalid zip number, it must be a string',
      }),
    active: Joi.boolean()
      .messages({ 'boolean.base': 'Invalid active value, it must be a boolean' }),
  });
  const validation = adminValidation.validate(req.body);
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
