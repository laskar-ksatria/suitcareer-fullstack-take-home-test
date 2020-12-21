const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: [true, "Price cannot be empty"]
    },
    quota: {
        type: Number,
        required: [true, "Quota cannot be empty"]
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    
})