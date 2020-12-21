const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
})

const schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = schedule;