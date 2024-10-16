import mongoose from "mongoose";
import Productschema from "../../../Model/productSchema/productSchema.js";
import { addProductValidation, updateproductValidation } from "../../../middleware/joivalidation/productValidation.js";
import { handleError } from "../../../utils/handleError.js";


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
handleError(res, error);    }
  }
};

//updateproduct 

export const updateProduct=async(req,res)=>{
  try {
    const productId=req.params.id;
    const productUpdate=req.body;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({success:false,message:"Invalid product id"})
    }
   const validatedProduct= await updateproductValidation.validateAsync(productUpdate)
    const updateDProduct=await Productschema.findByIdAndUpdate(productId,validatedProduct,{new:true})
    if(!updateDProduct){
      return res.status(404).json({success:false,message:"product not update"})
    }
    res.status(200).json({success:true,message:"Product updated successfully",updateDProduct})
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({success: false, message: `Validation error: ${error.message}`,});
    } else {
handleError(res, error);    }
  }
}

//hide product

export const hideProduct=async(req,res)=>{
  try {
    const productId=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(productId)){
      return res.status(400).json({success:false,message:"Invalid product id"})
    }
    const product = await Productschema.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    const togleshow=!product.isShow;
    const hidedProduct=await Productschema.findByIdAndUpdate(productId,{ isShow: togleshow },{ new: true })
   if(!hidedProduct){
    return res.status(404).json({success:false,message:"Product not found"})
   }
   res.status(200).json({success:true,message:"Product hide successfully",data:hideProduct})
  } catch (error) {
    res.status(500).json({ success: false, message: `Bad request: ${error.message}` });
  }
}


//delete product
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ success: false, message: "Invalid product id" });
      }

    const deleteProduct = await Productschema.findByIdAndDelete(productId);

    if (!deleteProduct) {
      return res.status(400).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({success: true,message: "Product deleted successfully",data: deleteProduct,});
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: `Bad request:${error.message}` });
  }
};


