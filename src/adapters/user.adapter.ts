import { UserModel } from "@src/models";
import { IUser, Query } from "@src/interfaces";

export const createNewUser = async (newuserEntry: IUser): Promise<string> => {
    const { _id } = await UserModel.create(newuserEntry);
    return _id.toString();
};

export const findUser = async (query: Query): Promise<IUser | null> => {
    const result = (await UserModel.findOne(query)) as IUser | null;
    return result;
};
