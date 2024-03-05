const mongoose = require('mongoose')
const { Schema } = mongoose;
const AuctionSchemaDetails = new Schema({
    productid:
     {
         type:mongoose.Schema.Types.ObjectId,
         ref:'eAuctionProducts',
         required:true
    },
    bids:{
        type:Array,
        required:true

    }
    
      

},{
    timestamps:true
})
const AuctionModel = mongoose.model('eAuctionBids', AuctionSchemaDetails);

module.exports=AuctionModel;