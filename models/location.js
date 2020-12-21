const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Location name cannot be empty"],
        validate: {
            validator: function (value) {
                return this.model('Location').findOne({name: value})
                    .then(location => {
                        if (location) {
                            return false;
                        }else {
                            return true;
                        }
                    })
            },
            message: props => `${props.value} already added`
        }
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
    }],
    schedules: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schedule'
    }]
})

const location = mongoose.model('Location', locationSchema);

module.exports = location;