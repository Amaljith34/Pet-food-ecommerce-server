import express from 'express';
import { signup ,login, logout} from '../../Controller/userSide/userController/userController.js';
import { getproductById, getProducts,  } from '../../Controller/userSide/productController/productController.js';
import { addToCart, getCart } from '../../Controller/userSide/cartController/cartController.js';


const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.get("/products",getProducts)
userRouter.get("/products/:id",getproductById)
userRouter.post("/cart/:id",addToCart)
userRouter.get("/cart/:id",getCart)




export default userRouter;
