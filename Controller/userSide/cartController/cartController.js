import mongoose from "mongoose";
import Productschema from "../../../Model/productSchema/productSchema.js";
import { User } from "../../../Model/userSchema/userSchema.js";
import Cart from "../../../Model/cartSchema/cartSchema.js";
import { handleError } from "../../../utils/handleError.js";

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const user = await User.findById(userId);
    const product = await Productschema.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
      user.cart = cart._id;
    } else {
      const existingProduct = cart.products.find(
        (product) => product.productId.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
        await cart.save();
        return res.status(200).json({ success: true, message: "Product already in cart, quantity updated" });
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await user.save();
    await cart.save();
    res.status(200).json({
      success: true,
      data: cart,
      message: `Product added to cart successfully`,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: `No user found` });
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({ success: true, data: cart, message: "Cart fetched successfully" });
  } catch (error) {
    handleError(res, error);  }
};

// Remove from cart
export const removeCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ success: false, message: "Product not found in cart" });
    }

    cart.products.splice(productIndex, 1);

    if (cart.products.length === 0) {
      await User.findByIdAndUpdate(userId, { $unset: { cart: "" } });
      await Cart.deleteOne({ _id: cart._id });
    } else {
      await cart.save();
    }

    res.status(200).json({ success: true, message: "Product removed from cart successfully" });
  } catch (error) {
    handleError(res, error);  }
};

// Increment product quantity
export const quantityIncrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.quantity += 1;
    await cart.save();

    res.json({ success: true, message: "Product quantity increased successfully", data: cart });
  } catch (error) {
    handleError(res, error);  }
};

// Decrement product quantity
export const quantityDecrement = async (req, res) => {
  try {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const product = cart.products.find(
      (product) => product.productId.toString() === productId
    );
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.quantity = Math.max(1, product.quantity - 1);
    await cart.save();

    res.status(200).json({ success: true, data: cart, message: "Product quantity decreased successfully" });
  } catch (error) {
    handleError(res, error);  }
};
