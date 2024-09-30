import express from 'express' ;
import { getAllUser, getUserById } from '../../Controller/adminSide/adminuserListController/userListController.js';
import { checkAuth } from '../../middleware/auth.js';
import { addProduct, updateProduct } from '../../Controller/adminSide/adminproductController/ademinproductController.js';
const adminRouter=express.Router();




adminRouter.get("/userlist",checkAuth,getAllUser)
adminRouter.get("/userlist/:id",checkAuth,getUserById)

adminRouter.post("/product" , checkAuth, addProduct);
adminRouter.patch("/product/:id",checkAuth,updateProduct)

export default adminRouter