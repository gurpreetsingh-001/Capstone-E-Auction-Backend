const express =require('express');
const isLogged =require('../controllers/isLoggedIn.controller');
//const jwtHandler = require('../utils/jwtHandler');

// creating cusotm route;
const Logged =express.Router();

Logged.get('/',isLogged);




// {
//     "counter":3
// }
module.exports =Logged;