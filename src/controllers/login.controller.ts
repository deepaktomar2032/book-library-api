import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS, LogErrorMessage, message } from "@src/utils";

/**
 * Login Controller
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns The registered user.
 */
export const login = async (req: Request, res: Response) => {
    try {
        const { username, role } = req.body;

        const payload = { username, role };

        const accessToken = jwt.sign(payload, process.env.SECRET_KEY!, {
            expiresIn: process.env.EXPIRATION_TIME! || "25m",
        });

        return res.status(HTTP_STATUS.CREATED).send({ successful: true, message: message.User_Login_Successfully, accessToken });
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
    }
};
