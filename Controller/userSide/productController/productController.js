import mongoose from 'mongoose';
import Productschema from '../../../Model/productSchema/productSchema.js';
//display all products
export const getProducts=async (req,res)=>{
    try {
        const {category}=req.body;
        let getProducts;
        if(category){
            getProducts=await Productschema.find({category});
            if(getProducts.length===0){
                return res.status(400).json({success:false,message:"Category not Found"})
            }
        }
        else{
            getProducts=await Productschema.find();
        }
        res.status(200).json({success:true,data:getProducts,message:"Product fetched successfuly"})
    } catch (error) {
        res.status(500).json({success:false,message:`bad request ${error.message}`})
    }
}

//display product by id

export const getproductById= async(req,res)=>{
    try {
        const productId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)){
            res.status(400).json({success:false,message:`No product found`})
        }
        const getproductId=await Productschema.findById(productId)
        if(!getproductId){
            return res.status(400).json({success:false,message:`product not available ${productId}`})
        }
        res.status(200).json({success:true,data:getproductId,message:`product fetched by id successfully`})
    } catch (error) {
        res.status(400).json({success:false,message:`bad request ${error.message}`})
    }
}

