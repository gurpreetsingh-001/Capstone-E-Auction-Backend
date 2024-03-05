const AuctionModel = require('../models/auctionSchema.model')

const AuctionDetails = async (req, res) => {

    try{
     const {prdtid} = req.params
     const {bidAmount}=req.body
     const userid=req.userId
    console.log(prdtid,userid,bidAmount)

    const isBid = await AuctionModel.findOne({ 'bids.userId': userid });

    if(isBid)
    {
        return res.status(200).json({
            message :"User can't bid again as the bid already exists"
        })
    }else
    {
        const auctionData = await AuctionModel.findOneAndUpdate(
            { productid: prdtid },
            { $push: { bids: { userId: userid, bidAmount: bidAmount } } },
            { new: true, upsert: true }
        );
    return res.status(201).json({
        message: "data inserted successfully",
        auctionData
    })
    }
}
catch (error) {
    console.log(error.message ,"error msg");
    res.status(404).json({
        message: error.message
    })
}
     
}
 
const AuctionProductDetails = async (req, res) => {
    try {
        const auctionId = req.params.id;

        const auctionDetails = await AuctionModel.findById(auctionId).populate({
            path: 'bids.userId', // Populate the userId field in the bids array
            model: 'eAuctionUsers'
        });

        if (!auctionDetails) {
            return res.status(404).json({
                message: 'Auction not found'
            });
        }

        const usersDetails = auctionDetails.bids.map(bid => ({
            userId: bid.userId._id,
            userName: bid.userId.username, // Adjust the field based on your user schema
            bidAmount: bid.bidAmount
        }));

        return res.status(200).json({
            message: 'Auction Users Details Found',
            usersDetails
        });
    } catch (error) {
        console.log(error.message, 'error msg');
        res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

module.exports = {AuctionDetails,
    AuctionProductDetails}
