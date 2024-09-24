import express from 'express';
import { signup ,login, logout} from '../../Controller/userSide/userController/userController.js';
import { getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart, removeCart } from '../../Controller/userSide/cartController/cartController.js';
import { cartContoller, handleCart } from '../../middleware/handleCart.js';


const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)
userRouter.post("/:id/logout",logout)

userRouter.get("/products",getProducts)
userRouter.get("/products/:id",getproductById)

userRouter.post("/:id/cart",handleCart,cartContoller)
userRouter.get("/:id/cart",getCart)
userRouter.delete("/:id/cart",removeCart)




export default userRouter;
