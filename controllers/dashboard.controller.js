const UserModel = require("../models/userSchema.model");
const AuctionModel = require("../models/auctionSchema.model");
const ProductModel = require("../models/productSchema.model");

const DashboardDetails = async (req, res) => {
  try {
    const user = await UserModel.findOne(
      { _id: req.userId },
      "username email mobile profilepic _id"
    );

    const UserAuctionDetails = await AuctionModel.find({
      "bids.userId": req.userId,
    }).populate('productid')

    let CompletedAuction = [];
console.log(UserAuctionDetails);
    // Use Promise.all to await all promises in the map function
    await Promise.all(
      UserAuctionDetails.map(async (auction) => {
        let ProductDetail = await ProductModel.findById(auction.productid);
        const currentDate = new Date();
        if (ProductDetail.enddate <= currentDate) {
          CompletedAuction.push(auction);
        }
      })
    );

    
    let WonAuctions = [];
    
    CompletedAuction.map((auction) => {
      let highestbid = auction.bids[0];
      
      auction.bids.forEach((bid) => {
        if (bid.amount > highestbid.amount) {
          highestbid = bid;
          
        }
      });
     console.log(highestbid.userId,req.userId);
      if (highestbid.userId == req.userId) {
        WonAuctions.push(auction);
      }
    });

    UserAuctionDetails.forEach((userauction)=>{



      const status = WonAuctions.some((wonAuction) => wonAuction._id.equals(userauction._id));
      userauction.status = status;
    })
    

    let ActiveBids = UserAuctionDetails.length;
    let Wonbids = WonAuctions.length;

    //Error Handling: user found or not found
    return res.status(200).json({ user, ActiveBids,Wonbids,  UserAuctionDetails: UserAuctionDetails.map(auction => ({ ...auction.toObject(), status: auction.status })),
    WonAuctions});
  } catch (error) {
    // Handle errors appropriately, e.g., log the error or send an error response
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = DashboardDetails;
