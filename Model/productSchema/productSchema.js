import { required } from "joi";
import mongoose from "mongoose";
export const productSchema=new mongoose.Schema(
    {
        title:{
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
        color:{
            type:String
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