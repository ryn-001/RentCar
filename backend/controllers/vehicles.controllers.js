const {VehicleServices} = require('../services/index.services');
const cloudinary = require('../config/cloudinary');

const getVehicles = async (req, res) => {
    try {
        const vehicles = await VehicleServices.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: err.message });
    }
};

const getVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleServices.getVehicleById(req.params.id);
        res.status(200).json(vehicle);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const createVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleServices.createVehicle({
            ...req.body,
            images: []
        });

        const files = req.files;
        let imageUrls = [];

        if (files && files.length > 0) {
            const uploads = files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: `vehicles/${vehicle._id}`
                })
            );

            const results = await Promise.all(uploads);
            imageUrls = results.map(result => result.secure_url);
        }

        const updatedVehicle = await VehicleServices.updateVehicle(vehicle._id, {
            images: imageUrls
        });

        res.status(201).json(updatedVehicle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateVehicle = async (req, res) => {
    try {
        const files = req.files;
        let imageUrls = [];

        if (files && files.length > 0) {
            const uploads = files.map(file =>
                cloudinary.uploader.upload(file.path, {
                    folder: `vehicles/${req.params.id}`
                })
            );

            const results = await Promise.all(uploads);
            imageUrls = results.map(result => result.secure_url);
        }

        const updateData = {
            ...req.body
        };

        if (imageUrls.length > 0) {
            updateData.$push = { images: { $each: imageUrls } };
        }

        const vehicle = await VehicleServices.updateVehicle(req.params.id, updateData);
        res.status(200).json(vehicle);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await VehicleServices.getVehicleById(req.params.id);

        if (vehicle && vehicle.images.length > 0) {
            const publicIds = vehicle.images.map(url => {
                const parts = url.split('/');
                const fileName = parts[parts.length - 1];
                return `vehicles/${req.params.id}/${fileName.split('.')[0]}`;
            });

            await Promise.all(
                publicIds.map(id => cloudinary.uploader.destroy(id))
            );
        }

        const result = await VehicleServices.deleteVehicle(req.params.id);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

module.exports = {
    getVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
};