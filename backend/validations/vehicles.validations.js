const Joi = require('joi');

const vehicleValidationSchema = Joi.object({
    model: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    number: Joi.string()
        .trim()
        .min(5)
        .max(20)
        .required(),

    seats: Joi.number()
        .integer()
        .min(1)
        .max(100)
        .required(),

    rent: Joi.number()
        .min(0)
        .required(),

    images: Joi.array()
        .items(Joi.string().uri())
        .min(1)
        .required()
});

module.exports = vehicleValidationSchema;