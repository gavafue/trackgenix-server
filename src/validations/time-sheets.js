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
      message: `${isValid.error.details[0].message}The data obtained is not valid to create a project`,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateUpdate = (req, res, next) => {
  const timesheetValidation = Joi.object({
    project: Joi.string().min(3).required(),
    employeeName: Joi.string().min(3).required(),
    weekSprint: Joi.number().min(2).required(),
    date: Joi.date().required(),
    workDescription: Joi.string().min(20)
      .max(2000)
      .required(),
    hoursProject: Joi.number().required(),
  });

  const validate = timesheetValidation.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      msg: `${validate.error.details[0].message}There was an error`,
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
