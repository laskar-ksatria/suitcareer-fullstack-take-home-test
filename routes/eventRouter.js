const express = require('express');
const Router  = express.Router();
const EventController = require('../controllers/eventController');
const TicketController = require('../controllers/ticketController');

Router.post('/create', EventController.create);
Router.post('/ticket/create', TicketController.create);
Router.get('/get_info', TicketController.readInfo);

module.exports = Router;