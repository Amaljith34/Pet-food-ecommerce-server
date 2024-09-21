import { Joi } from "express-joi-validations";
const singUpvalidation=Joi.object({
    name:Joi.string().required().min(3).max(3),
    email:Joi.string().email().required(),
    password:Joi.string().required.apply().min(8).password()
})
export default singUpvalidation