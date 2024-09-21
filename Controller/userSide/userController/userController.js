import mongoose from 'mongoose';
import { User } from '../../../Model/userSchema/userSchema';
import singUpvalidation from '../../../middleware/joivalidation/signUpvalidation';

//registration

const singup=async (req,res)=>{
    try {
       const {name,email,password}=req.body;
       //check email alreddy exists
       const existingUser=await userSchema.findone({email});
       if(existingUser){
        return res
              .status(400)
              .json({success:false,message:"Email alredy exists...."});     
       }
       
       const validatedUser=await singUpvalidation.validateAsync({
        email,name,password
       })
       const hashedPass=await hash

       const newUser=new userSchema({
        email:
       })
       
       





    } catch (error) {
        if(error.isJoi===true){
            
        }
    }
}