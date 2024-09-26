import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { loginValidator } from "@src/validators";
import { findUser } from "@src/adapters";
import { IUser } from "@src/interfaces";
import { HTTP_STATUS, message, LogErrorMessage } from "@src/utils";

/**
 * Login Middleware
 * @param req
 * @param res
 * @param next
 */
export const loginMiddleware = async (req: Request, res: Response, next: Function) => {
    try {
        const { error } = loginValidator.validate(req.body);
        if (error) return res.status(HTTP_STATUS.BAD_REQUEST).send({ successful: false, error_message: error.message });

        const { username, password } = req.body;
        const result = (await findUser({ username })) as IUser;

        if (!result) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send({ successful: false, message: message.User_Unauthorized });
        }

        const isPasswordMatch = await bcrypt.compare(password, result.password);

        if (!isPasswordMatch) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).send({ successful: false, message: message.User_Unauthorized });
        }

        next();
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
    }
};
