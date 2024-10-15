import express from 'express' ;
import { getAllUser, getUserById, toggluserBlock } from '../../Controller/adminSide/adminuserListController/userListController.js';
import {  checkAuth } from '../../middleware/auth.js';
import { addProduct, deleteProduct, hideProduct, updateProduct } from '../../Controller/adminSide/adminproductController/ademinproductController.js';
import { totalOrders, totalRevenue } from '../../Controller/adminSide/adminAnalytics/adminAnalytics.js';
import { getAllOrder } from '../../Controller/adminSide/adminorderController/adminordercontroller.js';
import { getallCart } from '../../Controller/adminSide/admincartController/admincartController.js';


const adminRouter=express.Router(); 

adminRouter.get("/userlist",checkAuth,getAllUser)
adminRouter.get("/userlist/:id",checkAuth,getUserById)
adminRouter.post("/userblock/:id",checkAuth,toggluserBlock)

adminRouter.post("/product" , checkAuth, addProduct);
adminRouter.put("/product/:id",checkAuth,updateProduct)
adminRouter.patch("/product/:id",checkAuth,hideProduct)
adminRouter.delete("/product/:id",checkAuth,deleteProduct)    
adminRouter.get("/cart",checkAuth,getallCart)
adminRouter.get("/orders",checkAuth,getAllOrder)

adminRouter.get("/analytics-orders",checkAuth,totalOrders)
adminRouter.get("/analytics-revenue",checkAuth,totalRevenue)

export default adminRouter