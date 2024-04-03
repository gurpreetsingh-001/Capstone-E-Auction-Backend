const ProductModel = require('../models/productSchema.model');

const ProductAdd = async (req, res) => {
    // registration logic 
    //console.log(req.body + "REQUEST BODY");
    console.log(req.file);
    const userid = req.userId;
    const prdimg= req.file.path;
    console.log(prdimg + "asdasd")
   // console.log(userid +"aksdjaksdhkas")
    try {
        
        // const { category,productname, minbid,startdate,enddate,prdimg} = req.body;
        const { category,productname, minbid,startdate,enddate} = req.body;
        const insertedData = await ProductModel.create({
            category,productname, minbid,startdate,enddate,prdimg,userid
        })
       console.log(insertedData);
      return res.status(200).json({
            message: "data inserted successfully",
            insertedData
        })


    } catch (error) {
        console.log(error ,"error msg");
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
        const page= parseInt(req.query.page || 1)
        const limit = parseInt(req.query.limit || 10)
        const sort=parseInt(req.query.sort || 1) 
      
        const currentDate = new Date();
const yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);
        const ProdDet  = await ProductModel.find({enddate:{$gte:yesterdayDate}}).sort({createdAt:sort}).skip((page-1)*limit).limit(limit).select('category productname minbid startdate enddate prdimg');
        //console.log(ProdDet+ "prodetails")
        const totalProducts= await ProductModel.countDocuments({enddate:{$gte:yesterdayDate}});
        const totalPages= Math.ceil(totalProducts / limit)
        return res.status(200).json({
            message: "Product Found",
            ProdDet,
            currentPage:page,
            totalPages
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