import express from 'express' ;
import { getAllUser, getUserById, toggluserBlock } from '../../Controller/adminSide/adminuserListController/userListController.js';
import { checkAuth } from '../../middleware/auth.js';
import { addProduct, deleteProduct, hideProduct, updateProduct } from '../../Controller/adminSide/adminproductController/ademinproductController.js';
import { totalOrders, totalRevenue } from '../../Controller/adminSide/adminAnalytics/adminAnalytics.js';
const adminRouter=express.Router();




adminRouter.get("/userlist",checkAuth,getAllUser)
adminRouter.get("/userlist/:id",checkAuth,getUserById)
adminRouter.post("/userblock/:id",toggluserBlock)

adminRouter.post("/product" , checkAuth, addProduct);
adminRouter.patch("/product/:id",checkAuth,updateProduct)
adminRouter.patch("/producthide/:id",hideProduct)
adminRouter.delete("/product/:id",deleteProduct)

adminRouter.get("/analytics-orders",totalOrders)
adminRouter.get("/analytics-revenue",totalRevenue)

export default adminRouter