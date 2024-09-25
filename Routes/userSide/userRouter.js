import express from 'express';
import { signup ,login, logout} from '../../Controller/userSide/userController/userController.js';
import { getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';
import { addToWishList, deleteWishList, getWishList } from '../../Controller/userSide/wishListController/wishListController.js';
import { createPayment } from '../../Controller/userSide/paymentController/paymentController.js';
import { getOrders } from '../../Controller/userSide/orderController/orderContoller.js';
// import { checkAuth } from '../../middleware/auth.js';


const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)
userRouter.post("/:id/logout",logout)

userRouter.get("/products",getProducts)
userRouter.get("/products/:id",getproductById)

userRouter.post("/:id/cart",handleCart,cartContoller)
userRouter.get("/:id/cart",getCart)
userRouter.delete("/:id/cart",removeCart)

userRouter.post("/:id/wishlist",addToWishList)
userRouter.get("/:id/wishlist",getWishList)
userRouter.delete("/:id/wishlist",deleteWishList)

userRouter.post("/:id/payment",createPayment)
userRouter.get("/:id/order",getOrders)
export default userRouter;
