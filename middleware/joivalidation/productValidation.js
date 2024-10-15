import Joi from "joi";
export const addProductValidation = Joi.object({
    product_name: Joi.string().required().trim(),
    
    price: Joi.number().required(),
    category: Joi.string().required().trim(),
    discription: Joi.string().required().trim(),
    quantity: Joi.number().min(0),
    isDeleted: Joi.boolean(),
    imageSrc: Joi.string().uri(),
    imageAlt: Joi.string(),
    isShow:Joi.boolean().required()
  });
  export const updateproductValidation=Joi.object({
    product_name: Joi.string().required().trim(),
    discription: Joi.string().required().trim(),
    price: Joi.number().required(),
    category: Joi.string().required().trim(),
    quantity: Joi.number().min(0),
    isDeleted: Joi.boolean(),
    imageSrc: Joi.string().uri(),
    imageAlt: Joi.string(),
    isShow:Joi.boolean().required()
  })