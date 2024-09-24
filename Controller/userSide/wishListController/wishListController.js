import mongoose from "mongoose";
import Wishlistschema from "../../../Model/wishListSchema/wishListSchema";
import Productschema from "../../../Model/productSchema/productSchema";
import { User } from "../../../Model/userSchema/userSchema";


//add to 

const addToWishList= async(req,res)=>{
    try {
        const userId= req.params.id;
        const {productId}=req.body;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            return res.status(400).json({success:false,message:"invalid user id"})
        }
        const productExists=await Productschema.findById({userId});
        if(!productExists){
            return res.status(404).json({success:false,message:"Product not found"})
        }
        const user=await User.findById({userId});
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        let wishList=await Wishlistschema.findOne(userId);
        if(!wishList){
            wishList=new Wishlistschema({
                userId,
                products:[{productId}]
            })
            user.wishList=wishList._id
        }
        else 
    } catch (error) {
        
    }
} 