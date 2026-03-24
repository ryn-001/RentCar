const Joi = require('joi');

const registerValidation = Joi.object({
    username: Joi.string().required().trim(),
    fullname: Joi.string().required().trim(),
    role: Joi.string().valid('Admin', 'Customer').default('Customer'),
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().lowercase().required()
});

const loginValidation = Joi.object({
    email: Joi.string().email().required().lowercase(),
    password: Joi.string().lowercase().required() 
})

module.exports = {registerValidation,loginValidation};