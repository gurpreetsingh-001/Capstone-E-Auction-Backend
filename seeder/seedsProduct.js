const ProductModel = require('../models/productSchema.model');

async function addproducts() {
    let products = [];
    for (let i = 0; i <= 20; i++) {

        let product = {
            category: `Furniture`,
            productname: `Sofa  ${i}`,
            minbid: "5000",
            startdate: "2024-02-29T00:00:00.000Z"
            ,
            enddate:
                "2025-06-15T00:00:00.000Z"
            ,
            prdimg: "1709214704837-787419879WhatsApp Image 2024-01-22 at 10.40.07.jpeg",
            userid:  "65cb691ed2ae75425bd1a75a"
            
        }
        products.push(product);
    }

    await ProductModel.insertMany(products)
}

module.exports = addproducts;