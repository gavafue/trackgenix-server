import mongoose from 'mongoose';

const validateId = (req, res, next) => {
  const validation = mongoose.isValidObjectId(req.params.id);
  if (!validation) {
    return res.status(400).json({
      msg: `The value ${req.params.id} is not a valid`,
      data: undefined,
      error: true,
    });
  }

  return next();
};

export default {
  validateId,
};
