const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Location name cannot be empty"]
    },
    event: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    schedules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }]
})

const location = mongoose.model('Location', locationSchema);

module.exports = location;