const express =require('express');
const {RegisterUser,LoginUser,UpdateProfile,UpdateProfilePic} =require('../controllers/user.controllers');
const jwtHandler = require('../utils/jwtHandler');
const multer = require('multer');

// creating cusotm route;
const UserRoute =express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/profile/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
      req.body.profilepic= uniqueSuffix + file.originalname;
      console.log(req.body.profilepic);
    }
  })
  
  const upload = multer({ storage: storage })

UserRoute.post('/register',RegisterUser);
UserRoute.post('/login',LoginUser);
UserRoute.post('/update',jwtHandler,UpdateProfile);
UserRoute.post('/updateprofilepic',upload.single("profilepic"),jwtHandler,UpdateProfilePic);



// {
//     "counter":3
// }
module.exports =UserRoute;