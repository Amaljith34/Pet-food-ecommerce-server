import Joi from "joi";

export const signUpValidation = Joi.object({
    UserName: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8) ,
 });

 
