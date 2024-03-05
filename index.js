const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors')
const path = require('path'); 
require('dotenv').config();
const UserRoute =require('./routes/user.routes');
const DashboardRoute = require('./routes/dashboard');
const ProductRoute = require('./routes/product.routes');
const Logged = require('./routes/isLoggedIn.routes')
//const CategoryRoute = require('./routes/category.routes')
const errorHandler= require('./utils/errorHandler');
const auctionRoute = require('./routes/auction.routes');


const app = express();
const Port = 5000;

app.use(express.json());
app.use(cors())
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.Mongo_Url)
        console.log("Connected to database");
    } catch (error) {
        console.log(error.message);
    }
}

connectDb();




// /user/register
app.use('/user',UserRoute);    
app.use('/dashboard',DashboardRoute)
app.use('/product',ProductRoute)
app.use('/isloggedin',Logged)


app.use(express.static('public'))
app.use('/auction',auctionRoute)


//app.use('/category',CategoryRoute)
app.use('*',(req,res,next)=>{
 const error =new Error('The route does not exists.')
 next(error);
})


app.use(errorHandler);

// API endpoint to update your comment using userID for the same product;***************
//updateOne();
app.listen(Port, () => {
    console.log(`server is working on Port ${Port}`)
})



