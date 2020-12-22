const express = require('express');
const Router  = express.Router();
//import subRouter
const locationRouter = require('./locationRouter');
const eventRouter = require('./eventRouter');
const transactionRouter = require('./transactionRouter');

Router.use('/event', eventRouter);
Router.use('/location', locationRouter);
Router.use('/transaction', transactionRouter);



const Location = require('../models/location');
const Schedule = require('../models/schedule');
const Event = require('../models/event');
const Transaction = require('../models/transaction');

Router.get('/all', (req,res,next) => {
    Transaction.find({})
        .then(user => res.status(200).json(user))
})

Router.get('/eventss', (req,res,next) => {
    Event.find({}).then(value => res.status(200).json(value))
})

Router.get('/getAll', (req,res,next) => {
    Location.find({}).populate({
        path: "events",
        populate: {
            path: "tickets",
            mododel: "Ticket"
        }
    })
    .then(data => res.status(200).json(data))
    .catch(next)
})

Router.get("/delete-location", async (req, res, next) => {
    await Location.deleteMany({})
    await Schedule.deleteMany({})
    await Event.deleteMany({})
    res.send("Oke")
})

module.exports = Router;