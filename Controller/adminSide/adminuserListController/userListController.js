import mongoose from "mongoose";
import { User } from "../../../Model/userSchema/userSchema.js";
import { handleError } from "../../../utils/handleError.js";


//display all users

export const getAllUser=async(req,res)=>{
    try {
        const users= await User.find()
        if(!users){
            return res.status(400).json({success:false,message:"User not found"})
        }
        res.status(200).json({success:false,message:"User fetch successfully ",data:users})
    } catch (error) {
handleError(res, error);
    }
}
//display user by id
export const getUserById=async(req,res)=>{
    try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
            res.status(400).json({success:false,message:"Invalid user id"})
        }
        const userById=await User.findById(userId)
        if (!userById) {
            return res.status(400).json({ success: false, message: "No user found" });
          }
          res.status(200).json({success:true,message:" User fetched successfully",data:userById})

    } catch (error) {
handleError(res, error);
    }
}
///block and unblock
export const toggluserBlock=async(req,res)=>{
    try {
        const userId=req.params.id;
        const user=await User.findById(userId );
            if(!user){
                res.status(400).json({success:false,message:"User not found"})
            }
            const newState=!user.isBlockd;

            await User.findByIdAndUpdate(userId,{isBlockd:newState})
            const message=newState ? "User block successfully":"User unblock successfully"
            return res.status(200).json({success:true,message,useremail:user.email})
    } catch (error) {
        res.status(500).send({ success: false, message: `Internal Server Error: ${error.message}` });
    }
}
