import { Joi } from "express-validation";
import { Role } from "./../utils";

export const registerValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.alternatives()
        .try(Joi.string().valid(Role.LIBRARIAN), Joi.string().valid(Role.CUSTOMER))
        .required(),
});
