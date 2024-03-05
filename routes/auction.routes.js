const express =require('express');
const AuctionSchemaDetails = require('../controllers/auction.controller')
const jwtHandler = require('../utils/jwtHandler');
const auctionRoute =express.Router();

auctionRoute.post('/:prdtid',jwtHandler, AuctionSchemaDetails);





module.exports =auctionRoute;
