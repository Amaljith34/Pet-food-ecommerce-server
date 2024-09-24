import { addToCart, quantityDecrement, quantityIncrement } from "../Controller/userSide/cartController/cartController.js";

export const  handleCart=(req,res,next)=>{
    try {
        const {action}=req.body;
        if(action === "increment"){
            req.controller=quantityIncrement;
        }
        else if(action === "decrement"){
            req.controller=quantityDecrement
        }
        else{
            req.controller=addToCart
        }
        next()
    } catch (error) {
        res
      .status(500)
      .json({ success: false, message: `Bad request ${error.message}` });
    }
}
export const cartContoller= async(req,res,next)=>{
    try {
        req.controller(req,res,next)
    } catch (error) {
        res.status(500).json({success:false,message:`bad request ${error.message}`})
    }
}
