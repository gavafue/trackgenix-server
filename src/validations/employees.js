import mongoose from 'mongoose';

const Joi = require('joi');

const idValidation = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      msg: `${req.params.id} is not a valid id`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateCreateEmp = (req, res, next) => {
  const employeeCreateSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(40)
      .messages({
        'string.min': 'Invalid name, it must not contain less than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 40 letters',
      })
      .required(),

    lastName: Joi.string()
      .min(3)
      .max(40)
      .messages({
        'string.min': 'Invalid last name, it must not contain less than 3 letters',
        'string.max': 'Invalid last name, it must not contain more than 40 letters',
      })
      .required(),
    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date())
      .messages({
        'date.greater': 'You can not get than older',
        'date.less': 'Your birth date can not be tomorrow, you already born',
      })
      .required(),
    country: Joi.string()
      .min(3)
      .max(60)
      .messages({
        'string.min': 'Invalid country, it must not contain less than 3 letters',
        'string.max': 'Invalid country, it must not contain more than 60 letters',
      })
      .required(),
    city: Joi.string()
      .min(3)
      .max(60)
      .messages({
        'string.min': 'Invalid city, it must not contain less than 3 letters',
        'string.max': 'Invalid city, it must not contain more than 60 letters',
      })
      .required(),
    zip: Joi.number()
      .integer()
      .min(1000)
      .max(99999)
      .messages({
        'string.min': 'Invalid zip, it must not contain less than 4 numbers',
        'string.max': 'Invalid zip, it must not contain more than 5 numbers',
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .messages({
        'string.pattern': 'Phonenomber must contain 10 numbers, only integers',
      })
      .required(),
    email: Joi.string()
      .email()
      .lowercase()
      .messages({
        'string.email': 'Invalid email format. Try again.',
      })
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .messages({
        'string.pattern': 'Password must be more than 6 char, at least 1 letter and 1 number. Without any symbols.',
      })
      .required(),
    photo: Joi.string()
      .required(),
    active: Joi.boolean()
      .required(),
  });
  const check = employeeCreateSchema.validate(req.body);
  req.body = check.value;
  if (check.error) {
    return res.status(400).json({
      message: `An error has occurred: ${check.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdateEmp = (req, res, next) => {
  const employeeUpdateSchema = Joi.object({
    firstName: Joi.string()
      .min(3)
      .max(40)
      .messages({
        'string.min': 'Invalid name, it must not contain less than 3 letters',
        'string.max': 'Invalid name, it must not contain more than 40 letters',
      }),
    lastName: Joi.string()
      .min(3)
      .max(40)
      .messages({
        'string.min': 'Invalid last name, it must not contain less than 3 letters',
        'string.max': 'Invalid last name, it must not contain more than 40 letters',
      }),
    birthDate: Joi.date()
      .greater('1-1-1900')
      .less(new Date())
      .messages({
        'date.greater': 'You can not get than older',
        'date.less': 'Your birth date can not be tomorrow, you already born',
      }),
    country: Joi.string()
      .min(3)
      .max(60)
      .messages({
        'string.min': 'Invalid country, it must not contain less than 3 letters',
        'string.max': 'Invalid country, it must not contain more than 60 letters',
      }),
    city: Joi.string()
      .min(3)
      .max(60)
      .messages({
        'string.min': 'Invalid city, it must not contain less than 3 letters',
        'string.max': 'Invalid city, it must not contain more than 60 letters',
      }),
    zip: Joi.number()
      .integer()
      .min(1000)
      .max(99999)
      .messages({
        'string.min': 'Invalid zip, it must not contain less than 4 numbers',
        'string.max': 'Invalid zip, it must not contain more than 5 numbers',
      }),
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .messages({
        'string.pattern': 'Phonenomber must contain 10 numbers, only integers',
      }),
    email: Joi.string()
      .email()
      .lowercase()
      .messages({
        'string.email': 'Invalid email format. Try again.',
      }),
    password: Joi.string()
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
      .messages({
        'string.pattern': 'Password must be more than 6 char, at least 1 letter and 1 number. Without any symbols.',
      }),
    photo: Joi.string(),
    active: Joi.boolean(),
  });
  const check = employeeUpdateSchema.validate(req.body);
  req.body = check.value;
  if (check.error) {
    return res.status(400).json({
      message: `An error has occurred: ${check.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  idValidation,
  validateCreateEmp,
  validateUpdateEmp,
};
