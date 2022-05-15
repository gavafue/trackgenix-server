import Joi from 'joi';

const validateCreation = (req, res, next) => {
    const membersJoiSch = Joi.object({
        id: Joi.string().alphanum().min(3).required(),
        name: Joi.string().min(3).required(),
        role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
        rate: Joi.number().required(),
    });

    const projectJoiSch = Joi.object({
        members: Joi.array().items(membersJoiSch).required(),
        startDate: Joi.date().required(),
        finishDate: Joi.date().greater(Joi.ref('startDate')).required(),
        description: Joi.string().required(),
        status: Joi.boolean().required(),
        client: Joi.string().required(),
    });

    const validation = projectJoiSch.validate(req.body);

    if (validation.error) {
        return res.status(400).json({
            msg: 'Error validating a field in the request',
            error: validation.error.datails[0].message,
        });
    }

    return next();
};

const validateId = (req, res, next) => {
    const validation = req.param.id.isValid();
    if (!validation) {
        return res.status(400).json({
            msg: `The value ${req.param.id} is not a valid id.`,
        });
    }

    return next();
};

export default {
    validateCreation,
    validateId,
};