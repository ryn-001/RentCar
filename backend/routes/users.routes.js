const express = require('express');
const UserRouter = express.Router();
const {registerValidation} = require("../validations/index.validations");
const {loginValidation} = require("../validations/index.validations");
const validate = require("../middlewares/validate.middleware");
const {UserControllers} = require("../controllers/index.controllers");
const {authenticate} = require("../middlewares/authenticate.middleware")

UserRouter.post("/register",validate(registerValidation),UserControllers.register);
UserRouter.post("/login",validate(loginValidation),UserControllers.login);
UserRouter.get("/me",validate(loginValidation),authenticate,UserControllers.getProfile);

module.exports = UserRouter;
