import mongoose from "mongoose";
import OrderSchema from "../../../Model/orderSchema/orderSchema.js";

//display order
export const getOrders= async (req,res)=>{
     try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
         return   res.status(400).json({success:false,message:"Invalid user id"})
        }
        const orderList=await OrderSchema.find({userId}).populate("products.productId");
        if(!orderList || orderList.length === 0){
            return res.status(400).json({success:false,message:"Order not found"})
        }
        res.status(200).json({success:true,data:orderList,message:"Order list fetch successfully"})

     } catch (error) {
        res.status(500).json({success:false,message:`Faild to fetch order list : ${error.message}`})
     }
 }