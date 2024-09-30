import mongoose from "mongoose";
import Productschema from "../../../Model/productSchema/productSchema.js";
import { addProductValidation } from "../../../middleware/joivalidation/productValidation.js";


//addproeduct
export const addProduct = async (req, res) => {
  try {
    
    const { product_name } = req.body;
  
    const validatedProduct = await addProductValidation.validateAsync(req.body);
        const existingProduct = await Productschema.findOne({ product_name });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: "Product already exists...." });
    }


    const newProduct = new Productschema(validatedProduct);
    await newProduct.save();
    
    res.status(200).json({success: true,message: "Product added successfully",data: newProduct,});
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({success: false, message: `Validation error: ${error.message}`,});
    } else {
      res.status(500).json({ success: false, message: `Bad request: ${error.message}` });
    }
  }
};

//updateproduct 

export const updateProduct=async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}
