import { Role } from "@src/utils";

export interface IUser {
    username: string;
    password: string;
    role: Role;
}

export type Query = { [key: string]: unknown };
