import express from 'express';
import { signup ,login, logout} from '../../Controller/userSide/userController/userController.js';
import { allProducts, getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';
import { addToWishList, deleteWishList, getWishList } from '../../Controller/userSide/wishListController/wishListController.js';
import { createPayment } from '../../Controller/userSide/paymentController/paymentController.js';
import { getOrders, orderItem } from '../../Controller/userSide/orderController/orderContoller.js';
import { checkAuth } from '../../middleware/auth.js';



const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)
userRouter.post("/logout",logout)

userRouter.get("/products",getProducts)
userRouter.get("/:id/products",getproductById)
userRouter.get("/allproducts",allProducts)

userRouter.post("/:id/cart",checkAuth,handleCart,cartContoller)
userRouter.get("/:id/cart",checkAuth,getCart)
userRouter.delete("/:id/cart",checkAuth,removeCart)

userRouter.post("/:id/wishlist",checkAuth,addToWishList)
userRouter.get("/:id/wishlist",checkAuth,getWishList)
userRouter.delete("/:id/wishlist",checkAuth,deleteWishList)

userRouter.post("/:id/payments",createPayment)
userRouter.get("/:id/orders",checkAuth,getOrders)
userRouter.post("/:id/orders",checkAuth,orderItem)
// userRouter.post("/:id/paymentvaification",checkAuth,paymentVerification)
export default userRouter;
