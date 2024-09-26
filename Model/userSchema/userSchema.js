import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required: true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role: {
            type: String,
            default: "user",
          },
          address: {
            type: String,
          },
          city: {
            type: String,
          },
          state: {
            type: String,
          },
          pincode: {
            type: Number,
          },
          contact: {
            type: Number,
          },
        cart: 
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart"
          } ,
       
        order: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Orders",
        }],
        wishlist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Wishlists",
          },

     }
)

export const User=mongoose.model("User",userSchema)


