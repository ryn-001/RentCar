const express = require('express');
const BookingRouter = express.Router();
const { BookingControllers } = require('../controllers/index.controllers');
const {authenticate} = require('../middlewares/authenticate.middleware');
const {bookingValidationSchema} = require('../validations/bookings.validations');
const validate = require('../middlewares/validate.middleware');

BookingRouter.post('/', validate(bookingValidationSchema), authenticate, BookingControllers.bookVehicle);

module.exports = BookingRouter;