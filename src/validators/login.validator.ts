import { Joi } from "express-validation";

export const loginValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
