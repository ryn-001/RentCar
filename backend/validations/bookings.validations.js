const Joi = require('joi');

const bookingValidationSchema = Joi.object({
    vehicleId: Joi.string()
        .length(24)
        .hex()
        .required(),

    startDate: Joi.date()
        .greater('now')
        .required(),

    days: Joi.number()
        .integer()
        .min(1)
        .max(30)
        .required()
});

module.exports = {bookingValidationSchema};