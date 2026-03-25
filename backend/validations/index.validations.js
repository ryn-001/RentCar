const {registerValidation} = require("./users.validations");
const {loginValidation} = require("./users.validations");
const vehicleValidationSchema = require("./vehicles.validations");

module.exports = {registerValidation,loginValidation,vehicleValidationSchema};