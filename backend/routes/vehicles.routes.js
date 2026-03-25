const express = require('express');
const VehicleRouter = express.Router();
const {vehicleValidationSchema} = require('../validations/index.validations');
const {authorize} = require("../middlewares/authorize.middleware");
const {authenticate} = require("../middlewares/authenticate.middleware");
const validate = require("../middlewares/validate.middleware");
const {VehiclesControllers} = require("../controllers/index.controllers");

VehicleRouter.post("/",validate(vehicleValidationSchema),authenticate,authorize("admin"),VehiclesControllers.createVehicle);
VehicleRouter.get("/",VehiclesControllers.getVehicles);
VehicleRouter.put("/:id",validate(vehicleValidationSchema),authorize("admin"),VehiclesControllers.updateVehicle);
VehicleRouter.delete("/:id",validate(vehicleValidationSchema),authorize("admin"),VehiclesControllers.deleteVehicle);

module.exports = VehicleRouter;