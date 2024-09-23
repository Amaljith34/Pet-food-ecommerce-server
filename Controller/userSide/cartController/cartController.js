import mongoose from "mongoose";
import Products from '../../../Model/productSchema/productSchema.js'
import Cart from '../../../Model/cartSchema/cartSchema.js'
//add to cart
const addToCart=async (req,res)=>{
     try {
        const  userId=req.params.id
        const {productId,quantity}=req.body
     
     if(!mongoose.Types.ObjectId.isValid(userId)){
             return res.status(400).json({success:false,message:"User not  found"})
     }
     let user=await Cart.findById(userId);
     const product=await Products.findById(productId)

     if(!product){
      return res.status(400).json({success:false,message:"product not found"});

     }
     let cart=await Cart.findOne({userId});
     if(!cart){
      cart=-new Cart({
         userId,
         products:[{productId,quantity}]
      })
      user.cart=cart._id
     }
     else{
      const existingProduct=cart.products.find(
         (product)=>product.productId.toString()===productId
      );
        
      if(existingProduct){
         existingProduct.quantity+=quantity;
      }else{
         cart.products.push({productId,quantity})
     }
    
    } 
    await user.save();
    await cart.save()
    res.status(200).json({success:true,data:cart,message:`product addto cart successfuly`})

 }
   catch (error) {
        res.status(500).json({success:false,message:`faild to add product :${error.message}`})
     }
}

//display cart

export const getCart= async(req,res)=>{
   try {
      const userId=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(userId)){
         return res.status(400).json({success:false,message:`No user found`})

      }
      const cart=await Cart.findOne({userId}).populate("producs.productId")
      if(!cart){
         res.status(200).json({success:false,message:"Cart not found"})
      }
      res.status(200).json({success:true,data:cart,message:"cart fetched successfully"})
   
   } catch (error) {
      res.status(500).json({success:false,message:`cart fetching faild:${error.message}`})
   }
}

//remove from cart
