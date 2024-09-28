// import { User } from "../../../Model/userSchema/userSchema.js";
// import { generateToken } from "../../../utils/jwt.js";
// import { comparePassword } from "../../../utils/bcrypt.js";

// //Admin login
// export const adminLogin=async(req,res)=>{
//     try {
//         const {email,password}=req.body;
//         const admin=await User.findOne({email})
//         if(!admin){
//             res.status(400).json({success:false,message:"Invalid user.Create an acount"})
//         }
//         const validUser=comparePassword(password,admin.password)
//         if(!validUser){
//             return res.status(400).json({success:false,message:"Incorrect password/username"})
//         }
//         if(admin.role==="admin"){
//             const token=generateToken(admin.id)
//             return res.status(200).json({success:true,message:"Admin logged in successfully",username:admin.UserName,password:admin.password,token})
//         }
//         else{
//             res.status(400).json({success:false,message:"You are not an admin"})
//         }
//     } catch (error) {
//         res.status(500).json({success:false,message:`Bad request ${error.message}`})
//     }
// }

// export const adminLoggout=async(req,res)=>{
//     try {
//         res.cookie("token",null,{
//             expires:new Date(Date.now()),
//             httpOnly:true
//         })
//         res.status(200).json({success:true,message:" Admin Logout"})
//     } catch (error) {
//         res.status(500).json({success:false,message:`Bad request ${error.message}`})
//     }
// }