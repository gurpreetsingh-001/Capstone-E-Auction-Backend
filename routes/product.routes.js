const express =require('express');
const multer=require('multer');
const {ProductAdd,ProductView,ProductViewAll} = require('../controllers/product.controller')
const jwtHandler = require('../utils/jwtHandler');

// creating cusotm route;
const ProductRoute =express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './tmp/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
      req.body.prdimg= file.fieldname + '-' + uniqueSuffix + file.originalname;
    }
  })
  
  const upload = multer({ storage: storage })

ProductRoute.post('/addproduct',upload.single("prdimg"),jwtHandler,ProductAdd);
ProductRoute.get('/viewproduct',jwtHandler,ProductView);
ProductRoute.get('/viewallproducts',ProductViewAll);




// {
//     "counter":3
// }
module.exports =ProductRoute;