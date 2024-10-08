
import mongoose from "mongoose";

const  wishListSchema=  new mongoose.Schema({
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
            }
        }
    ]
})
const Wishlistschema=mongoose.model("Wishlist",wishListSchema)
export default Wishlistschema