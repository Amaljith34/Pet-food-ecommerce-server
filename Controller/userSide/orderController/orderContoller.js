import mongoose from "mongoose";
import OrderSchema from "../../../Model/orderSchema/orderSchema.js";
import Productschema from "../../../Model/productSchema/productSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";
import { User } from "../../../Model/userSchema/userSchema.js";
import { handleError } from "../../../utils/handleError.js";

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
      handleError(res, error);     }
 }