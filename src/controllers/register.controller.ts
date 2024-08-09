import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { createNewUser, findUser } from "./../adapters";
import { IUser } from "./../interfaces";
import { HTTP_STATUS, LogErrorMessage, message } from "./../utils";

/**
 * Register a new user (Librarian/User)
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns The registered user.
 */
export const register = async (req: Request, res: Response) => {
    try {
        const username = req.body.username;
        const result = await findUser({ username: username });
        if (result) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send({
                successful: false,
                message: message.Username_Already_Exists,
            });
        }

        const newUserEntry = req.body as IUser;
        const payload = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        };

        const accessToken = jwt.sign(payload, process.env.SECRET_KEY!, {
            expiresIn: process.env.EXPIRATION_TIME! || "5m",
        });

        const _id = (await createNewUser(newUserEntry)) as string;
        return res.status(HTTP_STATUS.CREATED).send({
            successful: true,
            message: message.User_Register_Successfully,
            _id,
            accessToken,
        });
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .send({ successful: false, message: message.Something_went_wrong });
    }
};
