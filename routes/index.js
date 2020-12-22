const express = require('express');
const Router  = express.Router();
//import subRouter
const locationRouter = require('./locationRouter');
const eventRouter = require('./eventRouter');
const transactionRouter = require('./transactionRouter');

Router.use('/event', eventRouter);
Router.use('/location', locationRouter);
Router.use('/transaction', transactionRouter);

const Location = require('../models/location')

Router.get('/dele', (req, res, next) => {
    Location.deleteMany({})
        .then(() => res.send("Oke"))
})

module.exports = Router;