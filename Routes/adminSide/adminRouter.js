import express from 'express' ;
import { getAllUser, getUserById } from '../../Controller/adminSide/userListController/userListController.js';
const adminRouter=express.Router();




adminRouter.get("/userlist",getAllUser)
adminRouter.get("/userlist/:id",getUserById)

export default adminRouter