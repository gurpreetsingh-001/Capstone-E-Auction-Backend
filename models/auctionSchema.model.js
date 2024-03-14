const mongoose = require('mongoose')
const { Schema } = mongoose;
const AuctionSchemaDetails = new Schema({
  productid:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'eAuctionProducts',
    required: true
  },
  bids: [
    {
      userId:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'eAuctionUsers',
        required: true
      },
      bidAmount: {
        type: Number,
        required: true
      },
      bidDateTime:{
        type:Date,
        default:Date.now
        
      }
    }
  ],
  auctionOwner:{
    type: mongoose.Schema.Types.ObjectId,
       
  },
  payment:
  {
    type:Boolean,
    default:false
  }
  




}, {
  timestamps: true
})
const AuctionModel = mongoose.model('eAuctionBids', AuctionSchemaDetails);

module.exports = AuctionModel;