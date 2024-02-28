const CategoryModel = require('../models/categorySchema.model');

const CategoryView = async (req, res) => {
    try {
        const CategoryDet  = await CategoryModel.find().select('categoryname');
       // console.log(ProdDet+ "prodetails")
        return res.status(200).json({
            message: "Product Found",
            CategoryDet
        })
    } catch (error) {
        console.log(error.message ,"error msg");
        res.status(404).json({
            message: error.message
        })
    }
}


module.exports = CategoryView