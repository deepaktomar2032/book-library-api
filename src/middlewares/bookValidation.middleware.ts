import { Request, Response } from "express";
import { addBookValidator, bookIsbnValidator } from "@src/validators";
import { HTTP_STATUS } from "@src/utils";

export const addBookValidatorMiddleware = (req: Request, res: Response, next: Function) => {
    const { error } = addBookValidator.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).send({ successful: false, error_message: error.message });

    next();
};

export const bookIsbnValidatorMiddleware = (req: Request, res: Response, next: Function) => {
    const { error } = bookIsbnValidator.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).send({ successful: false, error_message: error.message });

    next();
};
