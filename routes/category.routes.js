const express =require('express');
const {CategoryView} = require('../controllers/category.controller')
//const jwtHandler = require('../utils/jwtHandler');

// creating cusotm route;
const CategoryRoute =express.Router();


CategoryRoute.get('/',CategoryView);




// {
//     "counter":3
// }
module.exports =CategoryRoute;