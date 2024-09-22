import mongoose from "mongoose";
import { productSchema } from "../../../Model/productSchema/productSchema";


//display all products
const getProducts=async (req,res)=>{
    try {
        const {category}=req.body;
        let getProducts;
        if(category){
            getProducts=await productSchema.find({category});
            if(getProducts.length===0){
                return res.status(400).json({success:false,message:"category not found"})
            }
        }
        else{
            getProducts=await productSchema.find();
        }
        res.status(200).json({success:true,message:"product fetched successfuly"})
    } catch (error) {
        res.status(500).json({success:false,message:`bad request ${error.message}`})
    }
}