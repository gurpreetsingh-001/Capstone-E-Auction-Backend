const mongoose =require('mongoose')
const { Schema } = mongoose;
const CategorydetailSchema = new Schema({
    categoryname: {
        type: String,
        required: true,
    }
},{
    timestamps:true
})

const CategoryModel = mongoose.model('eAuctionCategory', CategorydetailSchema);

module.exports=CategoryModel;