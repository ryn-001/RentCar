const {VehiclesModel} = require('../models/index.models');

const getAllVehicles = async () => {
    return await VehiclesModel.find();
};

const getVehicleById = async (id) => {
    const vehicle = await VehiclesModel.findById(id);
    if (!vehicle) throw new Error("Vehicle not found");
    return vehicle;
};

const createVehicle = async (data) => {
    const vehicle = new VehiclesModel(data);
    return await vehicle.save();
};

const updateVehicle = async (id, data) => {
    const vehicle = await VehiclesModel.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
    if (!vehicle) throw new Error("Vehicle not found");
    return vehicle;
};

const deleteVehicle = async (id) => {
    const vehicle = await VehiclesModel.findByIdAndDelete(id);
    if (!vehicle) throw new Error("Vehicle not found");
    return { message: "Vehicle deleted successfully" };
};

module.exports = {
    getAllVehicles,
    getVehicleById,
    createVehicle,
    updateVehicle,
    deleteVehicle
};