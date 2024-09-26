import { Request, Response } from "express";
import { findUser } from "@src/adapters";
import { registerValidator } from "@src/validators";
import { HTTP_STATUS, LogErrorMessage, message } from "@src/utils";

export const registerMiddleware = async (req: Request, res: Response, next: Function) => {
    const { error } = registerValidator.validate(req.body);
    if (error) return res.status(HTTP_STATUS.BAD_REQUEST).send({ successful: false, error_message: error.message });

    try {
        const { username } = req.body;

        const result = await findUser({ username });
        if (result) {
            return res.status(HTTP_STATUS.OK).send({ successful: false, message: message.Username_Already_Exists });
        }
        next();
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
    }
};
