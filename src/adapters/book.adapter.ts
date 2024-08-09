import { BookModel } from "./../models";
import { IBook } from "./../interfaces";

export const findEntry = async (isbn: string): Promise<IBook | null> => {
    const existanceCheckResult = (await BookModel.findOne({
        isbn: isbn,
    })) as IBook | null;

    return existanceCheckResult;
};

export const createEntry = async (newBookEntry: IBook): Promise<string> => {
    const { _id } = await BookModel.create(newBookEntry);
    return _id.toString();
};

export const findAndDelete = async (isbn: string): Promise<IBook> => {
    const result = (await BookModel.findOneAndDelete({ isbn: isbn })) as IBook;
    return result;
};

export const findAndUpdate = async (
    isbn: string,
    newValue: Record<string, boolean>
): Promise<IBook> => {
    const key = Object.keys(newValue)[0];
    const value = newValue[key];

    const result = (await BookModel.findOneAndUpdate(
        { isbn: isbn },
        { $set: { [key]: value } }
    )) as IBook;

    return result;
};
