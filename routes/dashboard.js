const express =require('express');

const DashboardRoute =express.Router();
const DashboardDetails = require('../controllers/dashboard.controller');
const jwtHandler = require('../utils/jwtHandler');


DashboardRoute.get('/',jwtHandler,DashboardDetails);




// {
//     "counter":3
// }
module.exports =DashboardRoute;