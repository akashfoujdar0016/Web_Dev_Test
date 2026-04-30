const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    trainName: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: String,
        required: true
    },
    seatsLeft: {
        type: Number
    }
}, {timestamps: true});

module.exports = mongoose.model('Train', trainSchema);