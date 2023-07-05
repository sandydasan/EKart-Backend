//import cart collection
const carts= require('../models/cartSchema')

//add to cart
exports.addToCart = async(req,res)=>{
    //get product details from the request
    const {id,title,price,image,quantity}= req.body
    //logic

    try{
      //check if the product already in the cart collection
      const product = await carts.findOne({id})
      if(product){
        //product is in the cart collection , so increment product quantity
        product.quantity += 1
        //update the product grand total
        product.grandTotal += product.price * product.quantity
        //to update product grand total in mongodb
        product.save()
        //to send response back to client
        res.status(200).json("Product Added Successfully")
      }
      else{
        const newProduct = new carts({id,title,price,image,quantity,grandTotal:price})
        //save new product in cart
        await newProduct.save()
        //to send response back to client
        res.status(200).json("Product Added Successfully")
      }
    }
    catch(error){
        res.status(401).json(error)
    }
}
//get cart
exports.getCart= async(req,res)=>{
  //get all product from the cart
  try{
     const allCart = await carts.find()
     res.status(200).json(allCart)
  }
  catch(error){
  res.status(404).json(error)
  }
}

//delete cart
exports.deleteCart=async(req,res)=>{
  //get id from the request
  const{id}=req.params
  //logic for delete tha cart 
  try{
     const removecart = await carts.deleteOne({id})
     if(removecart.deleteCount!=0){
      const allitems= await carts.find()
      res.status(200).json(allitems)
     }else{
      res.status(404).json("item not found")
     }
  }
  catch(error){
        res.status(404).json(error)
  }
}

//cart increment
exports.incrementCart=async(req,res)=>{
  const{id}=req.params
  try{
     //logic
     //check the product in the cart collection. if it 
     const product = await carts.findOne({id})
     if(product){
      //update product quantity
      product.quantity+=1
      product.grandTotal=product.price*product.quantity
      //save changes in mongodb
      await product.save()
      //increment the quantity ,get all cart collection item and updating in particular item count
      const allitems= await carts.find()
      res.status(200).json(allitems)
     }else{
      res.status(404).json("item not found")
     }

  }
  catch(error){
    res.status(404).json(error)
  }
}

//cart decrement
exports.decrementCart= async(req,res)=>{
  const{id}=req.params
  try{
     const product = await carts.findOne({id})
     if(product.quantity==0){
      const removecart =await carts.findOne({id})
      const allCart = await carts.find()
      res.status(200).json(allCart)
     }else{
     if(product){

      product.quantity-=1
      product.grandTotal=product.price*product.quantity
      await product.save()
      //increment the quantity ,get all cart collection item and updating in particular item count
      const allitems= await carts.find()
      res.status(200).json(allitems)
     }else{
      res.status(404).json("item not found")
     
     }
    }
  }catch(error){
    res.status(404).json(error)
  }

}