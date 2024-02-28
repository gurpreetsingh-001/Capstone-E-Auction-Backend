const ProductModel = require('../models/productSchema.model');

const ProductAdd = async (req, res) => {
    // registration logic 
    const userid = req.userId;
    console.log(userid +"aksdjaksdhkas")
    try {
        
        const { category,productname, minbid,startdate,enddate,prdimg} = req.body;
        
        const insertedData = await ProductModel.create({
            category,productname, minbid,startdate,enddate,prdimg,userid
        })
       console.log(insertedData);
      return res.status(200).json({
            message: "data inserted successfully",
            insertedData
        })


    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }

}
const ProductView = async (req, res) => {
    try {
        const ProdDet  = await ProductModel.find({userid: req.userId}).select('category productname minbid startdate enddate prdimg');
        console.log(ProdDet+ "prodetails")
        return res.status(200).json({
            message: "Product Found",
            ProdDet
        })
    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}
const ProductViewAll = async (req, res) => {
    try {
        const ProdDet  = (await ProductModel.find().select('category productname minbid startdate enddate prdimg')).reverse();
        console.log(ProdDet+ "prodetails")
        return res.status(200).json({
            message: "Product Found",
            ProdDet
        })
    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = {ProductAdd,ProductView,ProductViewAll}