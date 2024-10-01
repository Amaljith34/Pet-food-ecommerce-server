import mongoose from "mongoose";
import Cart from "../../../Model/cartSchema/cartSchema";

export const getallCart=async(req,res)=>{
    try {
        const allCarts=await Cart.find()
        if(!allCarts){
            return res.status(400).json({success:false,message:"Cart is empty"})
        }
        res.status(200).json({success:true,message:"cart fetching success",data:allCarts})
    } catch (error) {
        
    }
}