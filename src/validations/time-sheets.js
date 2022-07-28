import Joi from 'joi';
import mongoose from 'mongoose';

const validateAddTS = (req, res, next) => {
  const validateTS = Joi.object({
    project: Joi.string().required(),
    employee: Joi.string().required(),
    weekSprint: Joi.number().min(2),
    date: Joi.date().required(),
    hoursWorked: Joi.number().required(),
    hoursProject: Joi.number(),
    workDescription: Joi.string().min(5).max(2000).required(),
  });
  const isValid = validateTS.validate(req.body);
  if (isValid.error) {
    return res.status(400).json({
      message: `Error: ${isValid.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const timesheetValidation = Joi.object({
    project: Joi.string(),
    employee: Joi.string(),
    weekSprint: Joi.number().min(2),
    date: Joi.date(),
    hoursWorked: Joi.number(),
    hoursProject: Joi.number(),
    workDescription: Joi.string().min(5).max(2000),
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: `Error: ${validate.error.message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};
const idValidation = (req, res, next) => {
  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValid) {
    return res.status(400).json({
      message: `${req.params.id} is not a valid id`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateAddTS,
  validateUpdate,
  idValidation,
};
