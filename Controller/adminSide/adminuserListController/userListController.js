import mongoose from "mongoose";
import { User } from "../../../Model/userSchema/userSchema.js";


//display all users

export const getAllUser=async(req,res)=>{
    try {
        const users= await User.find()
        res.status(200).json({success:false,message:"User fetch successfully ",data:users})
    } catch (error) {
        res.status(500).json({success:false,message:`Bad request ${error.message}`})

    }
}
//display user by id
export const getUserById=async(req,res)=>{
    try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            res.status(400).json({success:false,message:"No user found"})
        }
        const userById=await User.findById(userId)
        if (!userById) {
            return res.status(400).json({ success: false, message: "No user found" });
          }
          res.status(200).json({success:true,message:" User fetched successfully",data:userById})

    } catch (error) {
        res.status(500).json({success:false,message:`Bad request ${error.message}`})

    }
}


