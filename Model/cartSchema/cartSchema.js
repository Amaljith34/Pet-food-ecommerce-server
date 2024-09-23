import mongoose from "mongoose";

export const cartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    products:[
        {
          productId:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"products",
              required:true
          },
          quantity:{
              type:Number,
              required:true,
              default:1
          }
       }
    ]
})
const Cart=mongoose.model("Cart",cartSchema)
export default Cart