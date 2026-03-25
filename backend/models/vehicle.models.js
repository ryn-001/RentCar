const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    model:{
       type: String,
       required: true 
    },
    number: {
        type: String,
        required: true
    },
    seats:{
        type: Number,
        required: true
    },
    rent:{
        type: Number, 
        required: true
    },
    images: [{
        type: String,
        required: true
    }]
})

const VehiclesModel = new mongoose.model('vehicles', vehicleSchema);
module.exports = VehiclesModel;