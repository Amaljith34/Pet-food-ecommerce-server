import mongoose from "mongoose";
 const productSchema= new mongoose.Schema(
    {
        product_name:{
            type:String,
            required:true
        },
        imageSrc:{
            type:String
        },
        imageAlt:{
            type:String
        },
        description:{
            type:String
        },
        price:{
            type:Number,
            required:true
        },
        
        category:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        isDeleted:{
            type:Boolean,
            default:false
        }
    },
    {
        timestamps:true
    }
)
 const Products=mongoose.model("Products",productSchema)
export default Products