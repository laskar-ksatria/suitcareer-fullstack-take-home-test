const express = require('express');
const Router  = express.Router();
//import subRouter
const locationRouter = require('./locationRouter');
const eventRouter = require('./eventRouter');
const trasactionRouter = require('./transactionRouter');

Router.get('/', (req,res,next) => {
    res.send("Oke")
    
})

Router.use('/event', eventRouter);
Router.use('/location', locationRouter);
Router.use('/transaction', trasactionRouter);

module.exports = Router;