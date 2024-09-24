import mongoose from "mongoose";
import Products from "../../../Model/productSchema/productSchema.js";
import { User } from "../../../Model/userSchema/userSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";



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
 
     let cart = await  Cart.findOne({ userId });
 
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
      const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price'); 
      if(!cart){
         res.status(200).json({success:false,message:"Cart not found"})
      }
      res.status(200).json({success:true,data:cart,message:"cart fetched successfully"})
   
   } catch (error) {
      res.status(500).json({success:false,message:`cart fetching faild:${error.message}`})
   }
}

//remove from cart
export const removeCart= async (req,res)=>{
   try {
      const userId=req.params.id;
      const {productId}=req.body;
      if(!mongoose.Types.ObjectId.isValid(userId)){
         return res.status(400).json({success:false,message:`user not found`})
      }
      const user=await User.findById(userId);
      const cart=await Cart.findOne({userId});
      if(!cart){
         res.status(400).json({success:false,message:`Cart not found`});

      }
      const productExists=cart.products.findIndex(
         (product)=>product.productId.toString()===productId
      );
      if(productExists === -1){
         res.status(400).json({success:false,message:`Product not found in a cart`})
      }
      cart.products.splice(productExists,1)
      if(cart.products.length===0){
        await User.findByIdAndUpdate(userId,{$unset:{cart:""}}),
        await Cart.deleteOne({_id:cart._id})
      }else{
        await cart.save()
      }
      await user.save()
      res.status(200).json({success:true,message:`Product removed from cart successfully`})
   } catch (error) {
      res.status(500).json({success:false,message:`Cart removing failed : ${error.message}`})
   }
}

///quantity increment

export const quantityIncrement= async (req,res)=>{
  try {
    const userId=req.params.id;
    const {productId,quantity}=req.body;
    if(!mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).json({success:false,message:"No user found"})
    }
    const cart = await Cart.findOne({userId});
    const productExists=cart.products.findIndex((product)=>product.productId.toString()=== productId)
    if(productExists===-1){
      return res.status(404).json({success:false,message:"Product not found"})
    }
    const product=await cart.products.findIndex((product)=>product.productId.toString()===productId)
    if(product>=0){
      cart.products[product].quantity += 1;
    }
    await cart.save();
    res.json({success:true,message:"Product quantity increased successfuly",data:cart});
    
  } catch (error) {
    res.status(200).json({success:false,message:`Bad message ${error.message}`})
  }
}

