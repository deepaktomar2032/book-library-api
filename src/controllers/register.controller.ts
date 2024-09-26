import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { createNewUser } from "@src/adapters";
import { IUser } from "@src/interfaces";
import { SALT_VALUE } from "@src/constants/constants";
import { HTTP_STATUS, LogErrorMessage, message } from "@src/utils";

/**
 * Register a new user (Librarian/User)
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @returns The registered user.
 */
export const register = async (req: Request, res: Response) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword: string = await bcrypt.hash(password, SALT_VALUE);
        const newUserEntry = { username, password: hashedPassword, role } as IUser;

        const _id = (await createNewUser(newUserEntry)) as string;

        return res.status(HTTP_STATUS.CREATED).send({ successful: true, message: message.User_Register_Successfully, _id });
    } catch (error: unknown) {
        console.log(LogErrorMessage(error));
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
    }
};
