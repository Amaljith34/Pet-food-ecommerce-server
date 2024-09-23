import mongoose from "mongoose";
import Products from '../../../Model/productSchema/productSchema.js'

import { User } from "../../../Model/userSchema/userSchema.js";
import cartSchema from "../../../Model/cartSchema/cartSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";
//add to cart
// export const addtoCart=async(req,res)=>{
//    try{
//     const userId=req.params.id;
//     const {productId}=req.body;
//     const user=await User.findById(userId);
//     if(!mongoose.Types.ObjectId.isValid(userId)){
//       return res.status(400).json({success:false,message:"User not  found"})
// }
//     const product=await Products.findById(productId)
//     if(!product) return res.status(404).json({success:false,message:'product does not exist'})
//     user.cart.push({productId,quantity:1})
//     await user.save();
//    return res.status(200).json({success:true,message:'item added to cart'})
//    } 
// catch(error){
//     return res.status(500).json({success:false,message:`failed to add product to cart ${error}`})
// }

// }


export const addToCart = async (req, res) => {
   try {
     const userId = req.params.id;
     const { productId, quantity } = req.body;
 
     if (!mongoose.Types.ObjectId.isValid(userId)) {
       return res
         .status(400)
         .json({ success: false, message: "User not found" });
     }
 
     const user = await User.findById(userId);
     const product = await Products.findById(productId);
     if (!product) {
       return res
         .status(404)
         .json({ success: false, message: "Product not found" });
     }
 
     let cart = await   Cart.findOne({ userId });
 
     if (!cart) {
       cart = new Cart({
         userId,
         products: [{ productId, quantity }],
       });
       
     } else {
       const existingProduct = cart.products.find(
         (product) => product.productId.toString() === productId
       );
 
       if (existingProduct) {
         existingProduct.quantity += quantity;
        return res.status(200).json({success:true,dtat:cart,message:"alredy added"})
       } else {
         cart.products.push({ productId, quantity });
       }
     }
     // user.cart.push(cart._id);
     await user.save();
     await cart.save();
     res.status(200).json({
       success: true,
       data: cart,
       message: `product added to cart successfully `,
     });
   } catch (error) {
     res.status(500).json({
       success: false,
       message: `Failed to add product : ${error.message}`,
     });
   }
 };

//display cart

export const getCart= async(req,res)=>{
   try {
      const userId=req.params.id;
      if(!mongoose.Types.ObjectId.isValid(userId)){
         return res.status(400).json({success:false,message:`No user found`})

      }
      const cart=await Cart.findOne({userId}).populate("products.productId")
      if(!cart){
         res.status(200).json({success:false,message:"Cart not found"})
      }
      res.status(200).json({success:true,data:cart,message:"cart fetched successfully"})
   
   } catch (error) {
      res.status(500).json({success:false,message:`cart fetching faild:${error.message}`})
   }
}

//remove from cart
// export const removeCart= async (req,res)=>{
//    try {
//       const userId=req.params.id;
//       const {productId,quantity}=req.body;
//       if(!mongoose.Types.ObjectId.isValid(userId)){
//          return res.status(400).json({success:false,message:`user not found`})
//       }
//       const user=await User.findById(userId);
//       const cart=await Cart.findOne({userId});
//       if(!cart){
//          res.status(400).json({success:false,message:`Cart not found`});

//       }
//       const productExists=cart.products.findIndex(
//          (product)=>product.productId.toString()===productId
//       );
//       if(productExists === -1){
//          res.status(400).json({success:false,message:`product not found in a cart`})
//       }
//       cart.products.splice(productExists,1)
//       if(cart.products.lemg)
//    } catch (error) {
      
//    }
// }
