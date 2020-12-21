const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Event name cannot be empty"],
    },
    tickets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }],
    schedule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    },
    location: {
        type: String,
        required: [true, "Location cannot be empty"]
    }
})

const event = mongoose.model('Event', eventSchema);

module.exports = event;

