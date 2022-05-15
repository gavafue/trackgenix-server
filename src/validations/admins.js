import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const adminValdation = Joi.object({
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
  const validation = adminValdation.validate(req.body);
  if (validation.error) {
    return res.status(400).json({
      msg: `There was an error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateCreation,
};
