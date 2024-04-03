const express = require('express');
const PayU = require("payu-websdk");
const paymentfunction = require('../controllers/payment.controller');
const jwtHandler = require('../utils/jwtHandler');

const paymentroute = express.Router();

paymentroute.post('/place-order-session', jwtHandler, async (req, res) => {

    try {
    const payuClient = new PayU({
        key: process.env.YOUR_MERCHANT_KEY,
        salt: process.env.YOUR_MERCHANT_SALT,
    }, "TEST");


        payuClient.paymentInitiate({
            txnid: "hjfbbr343r",
            amount: "10.00",
            firstname: "kshitij",
            productinfo: "payu",
            email: "kshitij.tomar@payu.in",
            phone: "7452892102",
            surl: "http://localhost:3000/success",
            furl: "http://localhost:3000/failure",
            // txn_s2s_flow: 2,
           // pg: "BNPL",
            //bankcode: "LAZYPAY",
            hash: "kSlOBlZsc0RdO95eb3VQNXQalfdbl0yCZvd23Nt4gRdBuUoFxwbvOWJD8duSbtfwBNFIkCR5aUsRgAoo7IT3FR6Y2NpG_mOX_gOmYm_m7hJzKuY4zU90SGc-GYkbBKfRPK3GthTr0LNXVsknydirpsZDI1hlBjrCxNz689-ogul8cZhXqNy3pdpJgDo4-logX54SXTW_2qwWmWynxWk32ipAQRdT-31ZHklagrXn"
        })

        payuClient.verifyPayment("hjfbbr343r").then((response) => {
            console.log(response)

        }).catch((err) => {
            console.log(err)
            //return  res.send(err)
        });


        payuClient.getTransactionDetails("2022-09-01", "2022-09-02").then((response) => {
            console.log(response)
        //return    res.send(response)
        }).catch((err) => {
            console.log(err)
          //  return   res.send(err)
        });
    } catch (error) {
        console.log(error)
        //return   res.send(error)
    }





});

module.exports = paymentroute