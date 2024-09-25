
import mongoose from "mongoose";
const orderSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    Total_Amount:{
        type:Number
    },
    Payment_id:{
        type:String
    },
    Total_items:{
        type:Number
    },
    Customer_Name:{
        type:String
    },
    address:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode: {
        type: Number,
    },
    contact: {
        type: Number,
    },

},
{
    timestamps:true
});

const OrderSchema=mongoose.model("Order",orderSchema)
export default OrderSchema