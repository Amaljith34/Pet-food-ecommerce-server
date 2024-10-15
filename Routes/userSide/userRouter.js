import express from 'express';
import { allProducts, getproductById, getProductsBycategory  } from '../../Controller/userSide/productController/productController.js';
import {  getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';
import { addToWishList, deleteWishList, getWishList } from '../../Controller/userSide/wishListController/wishListController.js';
import { createPayment, paymentVerification } from '../../Controller/userSide/paymentController/paymentController.js';
import { getOrders } from '../../Controller/userSide/orderController/orderContoller.js';
import { checkAuth } from '../../middleware/auth.js';
import { Login, signup } from '../../Controller/authController/authController.js';
// import { createAddress, getAllAddresses } from '../../Controller/userSide/addressController/addressController.js';

const userRouter = express.Router();

userRouter.post("/register", signup);
userRouter.post("/login",Login)
// userRouter.post("/logout",)

userRouter.get("/products",allProducts)
userRouter.get("/product",getProductsBycategory)
userRouter.get("/products/:id",getproductById)

userRouter.post("/cart/:id",checkAuth,handleCart,cartContoller)
userRouter.get("/cart/:id",checkAuth,getCart)
userRouter.delete("/cart/:id",checkAuth,removeCart)

userRouter.post("/wishlist/:id",checkAuth,addToWishList)
userRouter.get("/wishlist/:id",checkAuth,getWishList)
userRouter.delete("/wishlist/:id",checkAuth,deleteWishList)

// userRouter.get("/address",getAllAddresses)
// userRouter.get("/address",createAddress)

userRouter.post("/payments/:id",createPayment)
userRouter.get("/orders/:id",checkAuth,getOrders)
userRouter.post("/paymentvaification/:id",paymentVerification)
export default userRouter;
