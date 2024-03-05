const express =require('express');
const AuctionSchemaDetails = require('../controllers/auction.controller')
const jwtHandler = require('../utils/jwtHandler');
const auctionRoute =express.Router();

auctionRoute.post('/:prdtid',jwtHandler, AuctionSchemaDetails);
auctionRoute.get('/details/:prdtid',jwtHandler, AuctionProductDetails);





module.exports =auctionRoute;
