import express from 'express';
import { allProducts, getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';
import { addToWishList, deleteWishList, getWishList } from '../../Controller/userSide/wishListController/wishListController.js';
import { createPayment, paymentVerification } from '../../Controller/userSide/paymentController/paymentController.js';
import { getOrders, orderItem } from '../../Controller/userSide/orderController/orderContoller.js';
import { checkAuth } from '../../middleware/auth.js';
import { Login, signup } from '../../Controller/authController/authController.js';

const userRouter = express.Router();

userRouter.post("/register", signup);
userRouter.post("/login",Login)
// userRouter.post("/logout",logout)

userRouter.get("/products",getProducts)
userRouter.get("/products/:id",getproductById)
userRouter.get("/allproducts",allProducts)

userRouter.post("/cart/:id",checkAuth,handleCart,cartContoller)
userRouter.get("/cart/:id",checkAuth,getCart)
userRouter.delete("/cart/:id",checkAuth,removeCart)

userRouter.post("/wishlist/:id",checkAuth,addToWishList)
userRouter.get("/wishlist/:id",checkAuth,getWishList)
userRouter.delete("/wishlist/:id",checkAuth,deleteWishList)

userRouter.post("/payments/:id",createPayment)
userRouter.get("/orders/:id",checkAuth,getOrders)
userRouter.post("/orders/:id",checkAuth,orderItem)
userRouter.post("/paymentvaification/:id",paymentVerification)
export default userRouter;
