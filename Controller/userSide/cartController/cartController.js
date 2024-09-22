import { cartSchema } from "../../../Model/cartSchema/cartSchema";
import { productSchema } from "../../../Model/productSchema/productSchema";
import { User } from "../../../Model/userSchema/userSchema";
import mongoose from "mongoose";


//add to cart
const addToCart=async (req,res)=>{
     try {
        const userId=req.params.id
        const {productId,quantity}=req.body
     } catch (error) {
        res.status(500).json({success:false,message:`faild to add product :${error.message}`})
     }
}