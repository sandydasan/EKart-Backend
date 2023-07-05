//import wishlist
const wishlists = require('../models/wishlistSchema')

//logic for  add to wishlist
 exports.addtowishlist= async(req,res)=>{
    //get product details from requset
    // req.body={
    //     id:'3',
    //     title:'hd',
    //     price:555
    // }
    //destructure req.body

  const {id,title,price,image} = req.body

  //logic
  try{
      const item= await wishlists.findOne({id})
      if(item){
        res.status(404).json("Product already exists")
      }
      else{
        //add item to wishlist collection
        const newItem = new wishlists({id,title,price,image})
        //to store in wishlist collection
        await newItem.save()
        res.status(200).json("Product added to the wishlist")
      }
  }
  catch(error){
    res.status(404).json(error)
  }
 }

 //logic to view wishlist product
 exports.getWishlist = async(req,res)=>{
  //logic for view wishlist product details
  try{
   const allWishlist = await wishlists.find()
   res.status(200).json(allWishlist)
  }
 catch{
  
 }
}

 //delete wishlist product
 exports.deleteWishlist=async(req,res)=>{
    //get id from the request
    const{id}= req.params
    //logic for delete wishlist product details
    try{
      const removewishlist = await wishlists.deleteOne({id})
      //get all wishlist product after removing particular product
      if(removewishlist){
        const allitems= await wishlists.find()
        res.status(200).json(allitems)
      }
     
    }
    catch(error){
       res.status(404).json(error)
    }
 }