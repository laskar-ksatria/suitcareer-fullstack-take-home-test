const express = require('express');
const Router  = express.Router();
const LocationControoler = require('../controllers/locationController');

Router.get('/', LocationControoler.readAll);
Router.post('/create', LocationControoler.create);

module.exports = Router;
