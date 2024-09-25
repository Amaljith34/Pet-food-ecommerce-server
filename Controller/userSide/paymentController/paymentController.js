import mongoose from "mongoose";
import crypto from 'crypto';
import { User } from "../../../Model/userSchema/userSchema.js";
import Productschema from "../../../Model/productSchema/productSchema.js";
import OrderSchema from "../../../Model/orderSchema/orderSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";
import Paymentschema from "../../../Model/paymentSchema/paymentSchema.js";
import razorpay from "../../../config/razorpay.js";


//Make payment 

export const createPayment = async (req, res) => {
    try {
      const userId = req.params.id;
      const { currency } = req.body;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user id" });
      }
  
      const cart = await Cart.findOne({ userId }).populate("products.productId");
      if (!cart) {
        return res.status(404).json({ success: false, message: "Cart is empty" });
      }
  
      const amount = cart.products.map(item => item.productId.price * item.quantity).reduce((a, b) => a + b, 0);
      if (!currency) {
        return res.status(400).json({ success: false, message: "Please provide currency" });
      }
  
      const receipt = `receipt_${Date.now()}`;
      const options = {
        amount: amount * 100, // Convert to paise
        currency,
        receipt
      };
  
      try {
        const order = await razorpay.orders.create(options);
        if (!order) {
          console.log("Order creation error:", order);
          return res.status(500).json({ success: false, message: "Order creation failed" });
        }
  
        res.status(200).json({
          success: true,
          data: order,
          message: "Payment order successfully created",
        });
      } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({
          success: false,
          message: `Razorpay Order Creation Failed: ${error.response ? error.response : error.message}`,
        });
      }
    } catch (error) {
      console.error("Error in createPayment function:", error);
      res.status(500).json({
        success: false,
        message: `Failed to create payment order: ${error.message}`,
      });
    }
  };