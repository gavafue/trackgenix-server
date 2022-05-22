import Joi from 'joi';
import mongoose from 'mongoose';

const validateCreation = (req, res, next) => {
  const membersJoiSch = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().required(),
  });

  const projectJoiSch = Joi.object({
    members: Joi.array().items(membersJoiSch).required(),
    name: Joi.string().min(3).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    description: Joi.string().min(6).required(),
    active: Joi.boolean().required(),
    client: Joi.string().min(3).required(),
  });

  const validation = projectJoiSch.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: `Error validating a field. Error: ${validation.error.details[0].message}`,
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

const validateEdit = (req, res, next) => {
  const membersJoiSch = Joi.object({
    name: Joi.string().min(3).max(30),
    role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL'),
    rate: Joi.number(),
  });

  const projectJoiSch = Joi.object({
    members: Joi.array().items(membersJoiSch),
    name: Joi.string().min(3),
    startDate: Joi.date(),
    endDate: Joi.date().greater(Joi.ref('startDate')),
    description: Joi.string().min(6),
    active: Joi.boolean(),
    client: Joi.string().min(3),
  });

  const validationId = mongoose.isValidObjectId(req.params.id);
  if (!validationId) {
    return res.status(400).json({
      msg: `The value ${req.param.id} is not a valid id.`,
      data: undefined,
      error: true,
    });
  }

  const validation = projectJoiSch.validate(req.body);

  if (validation.error) {
    return res.status(400).json({
      msg: `Error validating a field. Error: ${validation.error.details[0].message}`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateCreation,
  validateId,
  validateEdit,
};
