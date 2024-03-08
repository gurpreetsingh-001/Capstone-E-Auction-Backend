const express =require('express');

const { AuctionDetails, AuctionProductDetails } = require('../controllers/auction.controller')

const jwtHandler = require('../utils/jwtHandler');
const auctionRoute =express.Router();

auctionRoute.post('/:prdtid',jwtHandler,AuctionDetails );
auctionRoute.get('/details/:id',jwtHandler, AuctionProductDetails);





module.exports =auctionRoute;
