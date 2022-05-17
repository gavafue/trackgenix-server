import Joi from 'joi';

const validateAddTS = (req, res, next) => {
  const validateTS = Joi.object({
    project: Joi.string().min(3).required(),
    employeeName: Joi.string().min(3).required(),
    weekSprint: Joi.number().min(2).required(),
    date: Joi.date().required(),
    hoursWorked: Joi.number().required(),
    workDescription: Joi.string().min(20)
      .max(2000)
      .required(),
    hoursProject: Joi.number().required(),
  });
  const isValid = validateTS.validate(req.body);
  if (isValid.error) {
    return res.status(400).json({
      message: `Error: ${isValid.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const timesheetValidation = Joi.object({
    project: Joi.string().min(3),
    employeeName: Joi.string().min(3),
    weekSprint: Joi.number().min(2),
    date: Joi.date(),
    workDescription: Joi.string().min(20)
      .max(2000),
    hoursProject: Joi.number(),
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      message: `Error: ${validate.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export default {
  validateAddTS,
  validateUpdate,
};
