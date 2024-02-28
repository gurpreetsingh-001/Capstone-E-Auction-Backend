const mongoose =require('mongoose')
const { Schema } = mongoose;
const ProductdetailSchema = new Schema({
   
    // categoryid:
    // {
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'eAuctionCategory',
    //     required:true
    // },
    category:
    {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
        // pattern :including @ : regular expression; .com
    },
    minbid:{
        type:String,
        required:true
        
    },
    startdate:{
        type: Date,
        required: true
    },
    enddate:{
        type: Date,
        required: true
    },
    prdimg:{
        type: String,
        required: false
    },
    userid:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'eAuctionUsers',
        required:true
    }

    

},{
    timestamps:true
})

const ProductModel = mongoose.model('eAuctionProducts', ProductdetailSchema);

module.exports=ProductModel;