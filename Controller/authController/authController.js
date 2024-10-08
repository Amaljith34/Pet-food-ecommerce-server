import mongoose from "mongoose";
import { User } from "../../Model/userSchema/userSchema.js";
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";
import signUpValidation from "../../middleware/joivalidation/signUpValidation.js";


//registretion
export const signup=async(req,res)=>{
    try {
        const {UserName,email,password,contact}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"Email already exists..."})
        }
        const validatedUser=await signUpValidation.validateAsync({UserName,email,password,contact})
        const hashPassword=await hashedPassword(password)

        const newUser=new User({
            email:validatedUser.email,
            UserName:validatedUser.UserName,
            password:hashPassword,
            contact:validatedUser.contact
        })
        await newUser.save()
        res.status(200).json({success:true,message: "User registered successfully!",data: newUser})
    } catch (error) {
        if (error.isJoi) {return res.status(400).json({success: false,message: `Validation error: ${error.message}`});
        }
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}



//login


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
           return res.status(200).json({success:true,message:"Admin login successfully",token,username:user.UserName,userid:user.id})
        }
        
            res.status(200).json({success:true,message:"user login successfully",token,Username:user.UserName,UserId:user.id})
        
    } catch (error) {
        res.status(500).json({success:false,message:`Bad requset: ${error.message}`})
    }
}
