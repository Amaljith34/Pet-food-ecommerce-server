import Joi from "joi";

const signUpValidation = Joi.object({
    name: Joi.string().required().min(3).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8) 
});

export default signUpValidation;
