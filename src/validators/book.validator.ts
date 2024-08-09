import { Joi } from "express-validation";

export const addBookValidator = Joi.object({
    username: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    year: Joi.number().required(),
    issued: Joi.boolean().required(),
});

export const bookIsbnValidator = Joi.object({
    username: Joi.string().required(),
    isbn: Joi.string().required(),
});
