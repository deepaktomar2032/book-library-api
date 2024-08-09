import { Request, Response } from "express";
import { registerValidator } from "./../validators";
import { HTTP_STATUS } from "./../utils";
import { SALT_VALUE } from "./../constants/constants";
import bcryptjs from "bcryptjs";

export const registerMiddleware = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const { error } = registerValidator.validate(req.body);
    if (error)
        return res
            .status(HTTP_STATUS.BAD_REQUEST)
            .send({ successful: false, error_message: error.message });

    req.body.password = await bcryptjs.hash(req.body.password, SALT_VALUE);
    next();
};
