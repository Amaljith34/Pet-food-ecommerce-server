import express from 'express';
import { signup ,login} from '../../Controller/userSide/userController/userController.js';


const userRouter = express.Router();




userRouter.post("/register", signup);
userRouter.post("/login",login)




export default userRouter;
