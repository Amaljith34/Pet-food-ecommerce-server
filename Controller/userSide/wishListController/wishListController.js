import mongoose from "mongoose";
import Wishlistschema from "../../../Model/wishListSchema/wishListSchema.js";
import Productschema from "../../../Model/productSchema/productSchema.js";
import { User } from "../../../Model/userSchema/userSchema.js";


//add to wishlist

export const addToWishList= async(req,res)=>{
    try {
        const userId= req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"invalid user id"})
        }
        const productExists=await Productschema.findById(productId);
        if(!productExists){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        let wishList=await Wishlistschema.findOne({userId});
        if(!wishList){
            wishList=new Wishlistschema({
                userId,
                products:[{productId}]
            })
            user.wishList=wishList._id
        }
        else {
            const existingProduct=wishList.products.some(product=>product.productId.toString() === productId);
            if(existingProduct){
                return res.status(400).json({success:false,message:"product alredy in wishlist"})
            }
            wishList.products.push({productId})
        }
        await wishList.save();
        await user.save();

        res.status(200).json({success:true,data:wishList.products,message:"Product add to wishlist successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:`Fail to added to wishlish `})
    }
} 

///view wishlist

export const getWishList= async(req,res)=>{
    try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"User not found"})
        }
        const wishList=await Wishlistschema.findOne({userId}).populate("products.productId")
        if(!wishList){
            return res.status(404).json({success:false,message:"wishlist not found"})
        }
        res.status(200).json({success:true,data:wishList.products,message:"wishlist featch successfully"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to fetch wishlist: ${error.message}`,
        });
    }
}

//remove wishlist

export const  deleteWishList=async (req,res)=>{
    try{
    const userId=req.params.id;
    const{productId}=req.body;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        res.status(400).json({success:false,message:"Invalid user id"})
    }
    const productExists=await Productschema.findById(productId)
    if(!productExists){
        return res.status(404).json({success:false,message:"Product not found"})
    }
    const user=await User.findById(userId);
    if(!user){
        return res.status(404).json({success:false,message:"User not found"})
    }
    const wishlist=await Wishlistschema.findOne({userId});
    if(!wishlist){
        return res.status(404).json({success:false,message:"wishlist not found"})
    }
    const productIndex=wishlist.products.findIndex(product=>product.productId.toString()===productId)

    if(productIndex=== -1){
        return res.status(404).json({success:false,message:"product not found in wishlist"})
    }
    wishlist.products.splice(productIndex,1);
    if(wishlist.products.length>=0){
        await wishlist.save()
    }
    else{
        await Wishlistschema.deleteOne({_id:wishlist._id})
        user.wishlist=undefined
    }
    await user.save();
    res.status(200).json({success:true,data:wishlist.products,message:"product removed from wishlist successfully"})
}
catch(error){
    res.status(500).json({success:false,message:` Faild to remove product :${error.message}`})
}
}
