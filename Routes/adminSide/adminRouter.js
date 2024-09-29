import express from 'express' ;
import { getAllUser, getUserById } from '../../Controller/adminSide/userListController/userListController.js';
import { checkAuth } from '../../middleware/auth.js';
import { addProduct } from '../../Controller/adminSide/productController/productController.js';
const adminRouter=express.Router();




adminRouter.get("/userlist",checkAuth,getAllUser)
adminRouter.get("/userlist/:id",checkAuth,getUserById)

adminRouter.post("/product" , checkAuth, addProduct);


export default adminRouter