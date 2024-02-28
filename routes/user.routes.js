const express =require('express');
const {RegisterUser,LoginUser,UpdateProfile} =require('../controllers/user.controllers');
const jwtHandler = require('../utils/jwtHandler');

// creating cusotm route;
const UserRoute =express.Router();

UserRoute.post('/register',RegisterUser);
UserRoute.post('/login',LoginUser);
UserRoute.post('/update',jwtHandler,UpdateProfile);



// {
//     "counter":3
// }
module.exports =UserRoute;