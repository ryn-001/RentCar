const express = require("express");
const Router = express.Router();

const UserRouter = require("./users.routes");
const VehicleRouter = require("./vehicles.routes");

Router.use("/users",UserRouter);
Router.use("/vehicles",VehicleRouter);

module.exports = Router;