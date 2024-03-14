const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors')
const morgan = require('morgan')
const path = require('path'); 
require('dotenv').config();
const UserRoute =require('./routes/user.routes');
const DashboardRoute = require('./routes/dashboard');
const ProductRoute = require('./routes/product.routes');
const Logged = require('./routes/isLoggedIn.routes')
//const CategoryRoute = require('./routes/category.routes')
const errorHandler= require('./utils/errorHandler');
const auctionRoute = require('./routes/auction.routes');
const app = require('express')();

const socketIO = require('socket.io');
const paymentroute = require('./routes/payment.route');
const server = require('http').createServer(app);


const io = socketIO(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST']
    }
}); // Attach Socket.IO to the server


io.on("connection", (socket) => {
    console.log("Socket Connected")
    socket.on("BidAdded",()=>{
        console.log("Bid Added");
        io.emit("BidInserted","Bid Inserted to DB")
    })
  });

  app.use(cors(
    {
        origin:"http://localhost:3000",
        handlePrefilghtRequest:(req,res) =>{
        res.WriteHead(200,{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Method":"GET,POST",
            "Access-Control-Allow-Headers":"My Custom Header",
            "Access-Control-Allow-Credentials":true,
        })
        }
    }
))


//const app = express();
const Port = 5000;

app.use(express.json());

morgan.token("body", (req) => {
    return JSON.stringify(req.body);
  });
  
  app.use(morgan(":method :url :body"));
//app.use(cors())
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
app.use('/api',paymentroute)


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
server.listen(Port, () => {
    console.log(`server is working on Port ${Port}`)
})



