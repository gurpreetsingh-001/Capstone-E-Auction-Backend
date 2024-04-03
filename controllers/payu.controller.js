const PayU = require("payu");


const payuClient = new PayU({
  key: process.env.YOUR_MERCHANT_KEY,
  salt: process.env.YOUR_MERCHANT_SALT,
},TEST); 

const customerdata=
{
    
    "txnid": "PQI6MqpYrjEefU",
    "amount": "10.00",
    "productinfo": "iPhone",
    "firstname": "PayU User",
    "email": "test@gmail.com",
    "phone": "9876543210",
    "surl": "http://localhost:3000/success",
    "furl": "http://locahost:3000/failure",
    "hash": "ccc029894dcc03a164f281b7a64596a19785e8a61ae81d008ef482e1534a99a67eee346d3cbf9ffcf1ce63b0e2faee26f2e4a20e6aef471c25b424c33971bb41"
  }

  payuClient.paymentInitiate(customerdata).then((res)=>{
    console.log(res)
}).catch((err)=>{
    console.log(err)
});

