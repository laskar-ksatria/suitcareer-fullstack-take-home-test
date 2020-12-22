const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    username: {
        type: String,
        requried: [true, "Name cannot be empty"]
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity ticket cannot be empty']
    },
    total: {
        type: Number,
        required: [true, "Total cannot be empty"]
    },
})

const transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction;