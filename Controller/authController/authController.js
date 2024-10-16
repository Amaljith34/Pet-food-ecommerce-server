import mongoose from "mongoose";
import { User } from "../../Model/userSchema/userSchema.js";
import { comparePassword, hashedPassword } from "../../utils/bcrypt.js";
import { generateToken } from "../../utils/jwt.js";
import signUpValidation from "../../middleware/joivalidation/signUpValidation.js";
import { handleError } from "../../utils/handleError.js";


//registretion
export const signup=async(req,res)=>{
    try {
        const {UserName,email,password}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"Email already exists..."})
        }
        const validatedUser=await signUpValidation.validateAsync({UserName,email,password})
        const hashPassword=await hashedPassword(password)

        const newUser=new User({
            email:validatedUser.email,
            UserName:validatedUser.UserName,
            password:hashPassword
            
        })
        await newUser.save()
        res.status(200).json({success:true,message: "User registered successfully!",data: newUser})
    } catch (error) {
        if (error.isJoi) {return res.status(401).json({success: false,message: `Validation error: ${error.message}`});
        }
        handleError(res, error);    }
}


///login

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

       
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid user" });
        }

      
        const validUser = await comparePassword(password, user.password); // Ensure this function returns a promise

        if (!validUser) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

    
        if (user.isBlockd) { 
            return res.status(403).json({ success: false, message: "Sorry, you are blocked" });
        }

        const token = generateToken(user.id);

        if (user.role === "admin") {
            return res.status(200).json({ success: true, message: "Admin login successfully", token, username: user.UserName, userId: user.id });
        }

        res.status(200).json({ success: true, message: "User login successfully", token, username: user.UserName, userId: user.id });

    } catch (error) {

        handleError(res, error);   
     }

    }

