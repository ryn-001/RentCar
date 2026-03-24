const express = require("express");
const Router = express.Router();

const UserRouter = require("./users.routes");

Router.use("/users",UserRouter);

module.exports = Router;