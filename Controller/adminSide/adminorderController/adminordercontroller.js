import OrderSchema from "../../../Model/orderSchema/orderSchema.js";
import { handleError } from "../../../utils/handleError.js";
export const getAllOrder=async(req,res)=>{
    try {
        const allOrders=await OrderSchema.find()
        if(!allOrders){
            return res.status(400).json({success:false,message:"not order found"})
        }
        if(allOrders.length==0){
            return res.status(200).json({success:false,message:"order is empty"})
        }
        res.status(200).json({success:true,message:"order featch successfully",data:allOrders})

    } catch (error) {
        handleError(res, error);    }
}