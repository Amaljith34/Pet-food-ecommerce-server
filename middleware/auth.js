import jwt  from "jsonwebtoken";

export const checkAuth= async (req,res,next)=>{
    try {
        const token=req.headers.authorization;
        if(!token){
            return res.status(400).json({success:false,message:"Access denied"})
        }
        const tokenValidate=jwt.verify(token,process.env.TOKEN_SECRET);
        if(!tokenValidate){
            return res.status(400).json({success:false,message:"Token not valid"})
        }
        next()

    } catch (error) {
        res
      .status(500)
      .json({ success: false, message:`Bad request ${error.message}`});
    }
}

export const adminAuth =async(req,res,next)=>{
    try {
        if(req.user.role || !req.user !== "admin"){
            res.status(403).json({success:false,message:"Access denied. Admins only."})
        }
        next()
    } catch (error) {
        res.status(500).json({ success: false, message:`Bad request ${error.message}`});
    }
}