


import { User } from '../../../Model/userSchema/userSchema.js';
import signUpValidation from '../../../middleware/joivalidation/signUpValidation.js';
import { comparePassword, hashedPassword } from '../../../utils/bcrypt.js';
import { generateToken } from '../../../utils/jwt.js';

// registration
export const signup = async (req, res) => {
    try {
        const { UserName, email, password,contact } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already exists..." });
        }

        const validatedUser = await signUpValidation.validateAsync({ email, UserName, password ,contact});
        const hashedPass = await hashedPassword(password);

        const newUser = new User({
            email: validatedUser.email,
            UserName: validatedUser.UserName,
            password: hashedPass,
            contact:validatedUser.contact
            
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: newUser
        });
    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                success: false,
                message: `Validation error: ${error.message}`
            });
        }
        res.status(500).json({ message: `Server error: ${error.message}` });
    }
}

// login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found. Please create an account."
            });
        }
        const validUser = await comparePassword(password, user.password);

        if (!validUser) {
            return res.status(401).json({ success: false, message: "Incorrect password/username." });
        }
        
        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            data: user,
            token
        });
    } catch (error) {
        res.status(500).json({ success: false, message: `Bad request: ${error.message}` });
    }
}

//// logout

export const logout= async(req,res)=>{
    try {
        res.cookie("token",null,{
            expires:new Date(Date.now()),
            httpOnly:true
        })
        res.status(200).json({success:true,message:"Logout"})
    } catch (error) {
        res.status(500).json({success:false,message:`Bad request ${error.message} `})
    }
}


