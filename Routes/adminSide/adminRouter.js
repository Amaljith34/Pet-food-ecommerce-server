import express from 'express' ;
import { adminLogin } from '../../Controller/adminSide/adminContoller/adminContoller.js';
import { getAllUser, getUserById } from '../../Controller/adminSide/userListController/userListController.js';
const adminRouter=express.Router();



adminRouter.post("/login",adminLogin)

adminRouter.get("/userlist",getAllUser)
adminRouter.get("/userlist/:id",getUserById)

export default adminRouter