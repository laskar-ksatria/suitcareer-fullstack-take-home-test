const express = require('express');
const Router  = express.Router();
//import subRouter
const locationRouter = require('./locationRouter');
const eventRouter = require('./eventRouter');

Router.use('/event', eventRouter);
Router.use('/location', locationRouter);

module.exports = Router;