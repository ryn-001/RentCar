const {BookingServices} = require('../services/index.services');

const bookVehicle = async (req, res) => {
    try {
        const userId = req.user.id;

        const booking = await BookingServices.createBooking(userId, req.body);

        res.status(201).json(booking);
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ message: err.message });
    }
};

module.exports = { bookVehicle };