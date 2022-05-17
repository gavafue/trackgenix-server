const Joi = require('joi');

const employeeCreateSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(40)
    .message({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters',
    })
    .required(),

  lastName: Joi.string()
    .min(3)
    .max(40)
    .message({
      'string.min': 'Invalid last name, it must not contain less than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 40 letters',
    })
    .required(),

  birthDate: Joi.date()
    .greater('1-1-1900')
    .less(new Date())
    .message({
      'date.greater': 'You can not get than older',
      'date.less': 'Your birth date can not be tomorrow, you already born',
    })
    .required(),

  country: Joi.string()
    .min(3)
    .max(60)
    .message({
      'string.min': 'Invalid country, it must not contain less than 3 letters',
      'string.max': 'Invalid country, it must not contain more than 60 letters',
    })
    .required(),

  city: Joi.string()
    .min(3)
    .max(60)
    .message({
      'string.min': 'Invalid city, it must not contain less than 3 letters',
      'string.max': 'Invalid city, it must not contain more than 60 letters',
    })
    .required(),

  zip: Joi.number().integer()
    .min(1000)
    .max(99999)
    .message({
      'string.min': 'Invalid phone, it must not contain less than 4 numbers',
      'string.max': 'Invalid phone, it must not contain more than 5 numbers',
    })
    .required(),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message({
      'string.pattern': 'Phonenomber must contain 10 numbers, only integers',
    })
    .required(),

  email: Joi.string()
    .email()
    .lowercase()
    .message({
      'string.email': 'Invalid email format. Try again.',
    })
    .required(),

  password: Joi.string()
    .pattern(/^(?=.[a-zA-Z])(?=.[0-9])$/)
    .message({
      'string.pattern': 'Password must contain more than 8 char, at least 1 letter and 1 number. Without any symbols.',
    })
    .required(),

  photo: Joi.string()
    .required(),

  active: Joi.boolean()
    .required(),
});

const employeeUpdateSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(40)
    .message({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters',
    }),

  lastName: Joi.string()
    .min(3)
    .max(40)
    .message({
      'string.min': 'Invalid last name, it must not contain less than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 40 letters',
    }),

  birthDate: Joi.date()
    .greater('1-1-1900')
    .less(new Date())
    .message({
      'date.greater': 'You can not get than older',
      'date.less': 'Your birth date can not be tomorrow, you already born',
    }),

  country: Joi.string()
    .min(3)
    .max(60)
    .message({
      'string.min': 'Invalid country, it must not contain less than 3 letters',
      'string.max': 'Invalid country, it must not contain more than 60 letters',
    }),

  city: Joi.string()
    .min(3)
    .max(60)
    .message({
      'string.min': 'Invalid city, it must not contain less than 3 letters',
      'string.max': 'Invalid city, it must not contain more than 60 letters',
    }),

  zip: Joi.number().integer()
    .min(1000)
    .max(99999)
    .message({
      'string.min': 'Invalid phone, it must not contain less than 4 numbers',
      'string.max': 'Invalid phone, it must not contain more than 5 numbers',
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .message({
      'string.pattern': 'Phonenomber must contain 10 numbers, only integers',
    })
    .required(),

  email: Joi.string()
    .email()
    .lowercase()
    .message({
      'string.email': 'Invalid email format. Try again.',
    }),

  password: Joi.string()
    .pattern(/^(?=.[a-zA-Z])(?=.[0-9])$/)
    .message({
      'string.pattern': 'Password must contain more than 8 char, at least 1 letter and 1 number. Without any symbols.',
    })
    .required(),

  photo: Joi.string(),

  active: Joi.boolean(),
});

export {
  employeeCreateSchema,
  employeeUpdateSchema,
};
