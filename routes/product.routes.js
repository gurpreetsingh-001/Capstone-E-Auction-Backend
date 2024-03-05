const express =require('express');
const multer=require('multer');
const {ProductAdd,ProductView,ProductViewAll,ProductViewById} = require('../controllers/product.controller')
const jwtHandler = require('../utils/jwtHandler');

// creating cusotm route;
const ProductRoute =express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/products/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
      req.body.prdimg= uniqueSuffix + file.originalname;
    }
  })
  
  const upload = multer({ storage: storage })

ProductRoute.post('/addproduct',upload.single("prdimg"),jwtHandler,ProductAdd);
ProductRoute.get('/viewproduct',jwtHandler,ProductView);  // this is used for logged in user who have added their own products
ProductRoute.get('/viewallproducts',ProductViewAll); // this is public & displaying to all users in home page
ProductRoute.get('/viewproductbyid/:id',jwtHandler,ProductViewById);





// {
//     "counter":3
// }
module.exports =ProductRoute;