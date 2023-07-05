//inside router.js file, import  express
 const express = require('express')

 //import product controller
 const productController= require('../controllers/productController')

 //import wishlist controller
 const wishlistController = require('../controllers/wishlistController')

 //import Cart controller
 const cartController = require('../controllers/cartController')

//usind express create an object for router class inorder to set a path 
 const router = new express.Router()

 //resolve client request in various server routes 
 //all api call will be resolved

 // get all products
 router.get('/products/all-products',productController.getAllProducts)

 //get particular products details
 router.get('/products/viewproducts/:id',productController.viewProduct)
//add to wishlist product details
router.post('/products/addtowishlist',wishlistController.addtowishlist)
//get wishlist product details
router.get('/product/getwishlist',wishlistController.getWishlist)
//remove 
router.delete('/product/deletewishlist/:id',wishlistController.deleteWishlist)
//add to cart
router.post('/products/addtocart',cartController.addToCart)
//get cart product details
router.get('/products/getcart',cartController.getCart)
//delete cart
router.delete('/products/deletecart/:id',cartController.deleteCart)
//cart. increment
router.get('/product/increment/:id',cartController.incrementCart)
//cart decrement
router.get('/product/decrement/:id',cartController.decrementCart)
//export router
module.exports= router 