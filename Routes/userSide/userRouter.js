

import express from 'express';
import { signup } from '../../Controller/userSide/userController/userController.js';

const userRouter = express.Router();

userRouter.post("/register", signup);

export default userRouter;
