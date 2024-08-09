import { ObjectId } from "mongoose";
import { Role } from "./../utils";

export interface IUser {
    _id?: ObjectId;
    username: string;
    password: string;
    role: Role;
}

export type Query = { [key: string]: unknown };
