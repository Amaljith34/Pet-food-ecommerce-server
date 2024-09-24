import express from 'express';
import { signup ,login, logout} from '../../Controller/userSide/userController/userController.js';
import { getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';
import { addToWishList, deleteWishList, getWishList } from '../../Controller/userSide/wishListController/wishListController.js';
import { checkAuth } from '../../middleware/auth.js';


const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)
userRouter.post("/:id/logout",logout)

userRouter.get("/products",getProducts)
userRouter.get("/products/:id",getproductById)

userRouter.post("/:id/cart",checkAuth,handleCart,cartContoller)
userRouter.get("/:id/cart",checkAuth,getCart)
userRouter.delete("/:id/cart",checkAuth,removeCart)

userRouter.post("/:id/wishlist",addToWishList)
userRouter.get("/:id/wishlist",checkAuth,getWishList)
userRouter.delete("/:id/wishlist",deleteWishList)
export default userRouter;
