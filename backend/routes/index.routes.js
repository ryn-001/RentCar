const express = require("express");
const Router = express.Router();

const UserRouter = require("./users.routes");
const VehicleRouter = require("./vehicles.routes");
const BookingRouter = require("./bookings.routes");

Router.use("/users",UserRouter);
Router.use("/vehicles",VehicleRouter);
Router.use("/bookings",BookingRouter);

module.exports = Router;