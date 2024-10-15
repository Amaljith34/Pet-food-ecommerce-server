import OrderSchema from "../../../Model/orderSchema/orderSchema.js";
import { handleError } from "../../../utils/handleError.js";

export const totalOrders=async(req,res)=>{
    try {
        const orders=await OrderSchema.find().populate("products.productId")
        if(!orders){
            return res.status(400).json({success:false,message:"No orders"})
        }
        const totalOrders=orders.map((order)=>order.products.map((product)=>product.quantity)).flat(Infinity).reduce((a,b)=>a+b,0)
        res.status(200).json({success:true,message:`total orders is ${totalOrders}`})
    } catch (error) {
      
      handleError(res, error);
    }
}                          
export const totalRevenue = async (req, res) => {
    try {
      const orders = await OrderSchema.find().populate("products.productId");
      if (!orders) {
        return res.status(400).json({ success: false, message: "No Sales yet!" });
      }
      const totalRevenue = orders.map((order) => order.Total_Amount).flat(Infinity).reduce((a, b) => a + b, 0);
       res.status(200).json({success: true, message: `Total revenue is ${totalRevenue}`,});
    } catch (error) {
      handleError(res, error);
    }
  };
  