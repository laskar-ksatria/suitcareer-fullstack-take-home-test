const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    start: {
        type: Date,
        required: [true, "Event start date cannot be empty"]
    },
    end: {
        type: Date,
        requried: [true, "Event end date cannot be empty"]
    }
})

const schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = schedule;