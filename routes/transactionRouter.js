const express = require('express');
const Router  = express.Router();
const TransactionController = require('../controllers/transactionController');

Router.post('/purchase', TransactionController.create);
Router.get('/get_info', TransactionController.readInfo);

module.exports = Router;
