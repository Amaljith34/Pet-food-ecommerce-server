import mongoose from "mongoose";
import { User } from "../../Model/userSchema/userSchema.js";
import { comparePassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";



export const Login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        const validUser= comparePassword(password,user.password);

        if(!validUser){
            return res.status(400).json({success:false,message:"Incorrect password/username"})
        }
        if(!user){
            return res.status(400).json({success:false,message:"Invalid user"})
        }
        if(user.isBlockd){
            return res.status(400).json({success:false,message:"Sorry ,Your blocked"})
        }
        const token=generateToken(user.id)
        if(user.role=== "admin"){
            res.status(200).json({success:true,message:"Admin login successfully",token,username:user.UserName,userid:user.id})
        }
        else{
            res.status(200).json({success:true,message:"user login successfully",token,Username:user.UserName,UserId:user.id})
        }
    } catch (error) {
        res.status(500).json({success:false,message:`Bad requset: ${error.message}`})
    }
}