const AuctionModel = require('../models/auctionSchema.model')

const AuctionSchemaDetails = async (req, res) => {
    const productid = req.params
    const {userid,bidAmount}=req.body
    console.log(productid,userid,bidAmount)

    
    
}
module.exports =AuctionSchemaDetails
