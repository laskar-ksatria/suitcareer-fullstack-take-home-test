const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    location: {
        type: String,
        required: [true, "Location name cannot be empty"],
        validate: {
            validator: function (value) {
                return this.model('Location').findOne({location: value})
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
})

const location = mongoose.model('Location', locationSchema);

module.exports = location;