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
        const currentDate = new Date();
const yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);
        const ProdDet  = (await ProductModel.find({enddate:{$gte:yesterdayDate}}).select('category productname minbid startdate enddate prdimg')).reverse();
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


const ProductViewById = async (req, res) => {
    try {
        const productId = req.params.id;
        
        const ResProductviewbyID  = (await ProductModel.find({_id:productId}).select('category productname minbid startdate enddate prdimg')).reverse();
        //console.log(ResProductviewbyID+ "prodetails")
        return res.status(200).json({
            message: "Product Found",
            ResProductviewbyID
        })
    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}



module.exports = {ProductAdd,ProductView,ProductViewAll,ProductViewById}