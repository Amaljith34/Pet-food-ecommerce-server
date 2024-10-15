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
        },
        isShow:{
            type:Boolean,
            default:false
        },
        discription:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
)

const Productschema = mongoose.model('Products', productSchema); // Ensure 'Products' matches the model name
export default Productschema;