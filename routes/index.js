const express = require('express');
const Router  = express.Router();
//import subRouter
const locationRouter = require('./locationRouter');
const eventRouter = require('./eventRouter');
const transactionRouter = require('./transactionRouter');

Router.use('/event', eventRouter);
Router.use('/location', locationRouter);
Router.use('/transaction', transactionRouter);

module.exports = Router;