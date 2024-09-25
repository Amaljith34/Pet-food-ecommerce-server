import mongoose from "mongoose";
import OrderSchema from "../../../Model/orderSchema/orderSchema.js";
import Productschema from "../../../Model/productSchema/productSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";
import { User } from "../../../Model/userSchema/userSchema.js";

// Order products
export const orderItem = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "No user found" });
    }

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const user = await User.findById(userId);
    const productExists = await Productschema.findById(productId);
    if (!productExists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const productInCart = cart.products.find(
      (prodct) => prodct.productId.toString() === productId
    );

    if (!productInCart) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });
    }

    let order = await OrderSchema.findOne({ userId });

    if (!order) {
      order = new OrderSchema({
        userId,
        products: [{ productId, quantity: productInCart.quantity }],
      });
    } else {
      const productIndex = order.products.findIndex(
        (product) => product.productId.toString() === productId
      );

      if (productIndex !== -1) {
        order.products[productIndex].quantity += productInCart.quantity;
      } else {
        order.products.push({ productId, quantity: productInCart.quantity });
      }
    }
    user.order.push(order._id)
    await user.save();
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order successfully completed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to order product: ${error.message}`,
    });
  }
};


//display order
export const getOrders= async (req,res)=>{
     try {
        const userId=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(userId)){
         return   res.status(400).json({success:false,message:"Invalid user id"})
        }
        const orderList=await OrderSchema.find({userId}).populate("products.productId");
        if(!orderList || orderList.length === 0){
            return res.status(400).json({success:false,message:"Order not found"})
        }
        res.status(200).json({success:true,data:orderList,message:"Order list fetch successfully"})

     } catch (error) {
        res.status(500).json({success:false,message:`Faild to fetch order list : ${error.message}`})
     }
 }