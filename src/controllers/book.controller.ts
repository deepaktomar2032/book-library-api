import { Request, Response } from "express";
import { HTTP_STATUS, LogErrorMessage, message } from "./../utils";
import { IBook } from "./../interfaces";
import { findEntry, createEntry } from "./../adapters";

export const addBook = async (req: Request, res: Response) => {
  try {
    const newBookEntry = req.body as IBook;
    const existanceCheckResult = (await findEntry(newBookEntry.isbn)) as IBook | null;

    if (existanceCheckResult) return res.status(HTTP_STATUS.OK).send({ successful: false, message: message.Book_Already_Exists, existanceCheckResult });

    const _id = (await createEntry(newBookEntry)) as string;
    return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Added_Successfully, _id });

  } catch (error: unknown) {
    console.log(LogErrorMessage(error));
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
  }
};
