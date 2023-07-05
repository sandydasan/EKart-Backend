//import product collection
const products = require('../models/productSchema')

//define logic to resolve client request

//get all products

exports.getAllProducts = async (req,res)=>{
    try{
        //get all products from product collection in mongodb
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    }
    catch(error){
       res.status(401).json(error)
    }
}

//get particular product id 
exports.viewProduct =async (req,res)=>{
    //get product id from request
    const id=req.params.id
    //logic
    try{
        //check id is present in momgodb
        const product=await products.findOne({id})
        if(product){
            res.status(200).json(product)
        }
        else{
            res.status(404).json("Product Not Found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}