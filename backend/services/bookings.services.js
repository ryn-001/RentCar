const {BookinsgModel} = require('../models/index.models');
const {VehiclesModel} = require('../models/index.models');

const createBooking = async (userId, data) => {
    const { vehicleId, startDate, days } = data;

    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + Number(days));

    const existingBooking = await BookinsgModel.findOne({
        vehicle: vehicleId,
        $or: [
            {
                startDate: { $lte: end },
                endDate: { $gte: start }
            }
        ]
    });

    if (existingBooking) {
        throw new Error("Vehicle already booked for selected dates");
    }

    const vehicle = await VehiclesModel.findById(vehicleId);
    if (!vehicle) throw new Error("Vehicle not found");

    const totalPrice = vehicle.rent * days;

    const booking = new BookinsgModel({
        user: userId,
        vehicle: vehicleId,
        startDate: start,
        endDate: end,
        totalPrice
    });

    return await booking.save();
};

module.exports = { createBooking };