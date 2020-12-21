const mongoose = require('mongoose');

function dbConnect() {
    mongoose.connect('mongodb://localhost/suittest', {useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("We are connected to mongoose")
    });
};

module.exports = dbConnect;