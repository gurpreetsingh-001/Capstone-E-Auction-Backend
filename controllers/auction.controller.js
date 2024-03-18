const AuctionModel = require('../models/auctionSchema.model')
const ProductModel = require('../models/productSchema.model')

const AuctionDetails = async (req, res) => {

    try{
     const {prdtid} = req.params
     const {bidAmount}=req.body
     const userid=req.userId
    console.log(prdtid,userid,bidAmount)
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 1);

    const Product = await ProductModel.findOne({_id:prdtid,enddate:{$gte:yesterdayDate}})
    if(!Product)
    {
        return res.json({
            message: "Auction Does not Exist",
            success:false
        })
    }
    if(Product.userid.toString()==userid)
    {
        return res.json({
            message:"You are the owner and cannot bid"
        })
    }
    const isBid = await AuctionModel.findOne({ 'bids.userId': userid, productid:prdtid});

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
        message: "Bid Inserted Successfully",
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

      //  console.log("ABCD");
        const prdtid = req.params.id;
        // console.log(prdtid);
        let auctionDetails=[]
            auctionDetails = await AuctionModel.find({ productid: prdtid }).populate({
            path: 'bids.userId', // Populate the userId field in the bids array
            model: 'eAuctionUsers'
        });
       
        let count=0;
        let highest = 0;
        if (auctionDetails && auctionDetails.length >0 )
        {
             count= auctionDetails[0].bids.length
             highest = auctionDetails[0].bids[0].bidAmount;
        auctionDetails[0].bids.map((bid)=>
        {
            if(highest<bid.bidAmount)
            {
                highest=bid.bidAmount;
            }

        })
    }
       // console.log(highest);
        if (!auctionDetails || auctionDetails.length ==0 ) {
            return res.status(200).json({
                message: 'No Bids Found',
                usersDetails: [],
                displaydata: {count:0,highest:0}
                
            });
        }

        const usersDetails = auctionDetails[0].bids.map(bid => ({
            userId: bid.userId._id,
            userName: bid.userId.username, // Adjust the field based on your user schema
            bidAmount: bid.bidAmount,
            bidDateTime: bid.bidDateTime
            
        }));
        

        return res.status(200).json({
            message: 'Auction Users Details Found',
            usersDetails,
            displaydata: {count,highest}
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
