import mongoose from 'mongoose';
import Productschema from '../../../Model/productSchema/productSchema.js';
//display all products by category
export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ success: false, message: "Category not defined" });
        }
        const products = await Productschema.find({ category, isShow: false } );
        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products available for the given category" });
        }
        return res.status(200).json({ success: true, data: products, message: "Products fetched successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
};


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


//display all product

export const allProducts=async(req,res)=>{
    try {
        let getProducts
        getProducts=await Productschema.find({isShow:false});
        res.status(200).json({success:true,data:getProducts,message:"feth all products"})
    } catch (error) {
        
    }
}
