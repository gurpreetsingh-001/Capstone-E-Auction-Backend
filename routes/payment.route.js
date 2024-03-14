const express =require('express');

const paymentfunction = require('../controllers/payment.controller');
const jwtHandler = require('../utils/jwtHandler');

const paymentroute =express.Router();

paymentroute.post('/place-order-session',jwtHandler ,paymentfunction);

module.exports = paymentroute