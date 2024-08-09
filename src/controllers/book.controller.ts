import { Request, Response } from "express";
import { HTTP_STATUS, LogErrorMessage, message } from "./../utils";
import { IBook } from "./../interfaces";
import { findEntry, createEntry, findAndDelete, findAndUpdate } from "./../adapters";

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

export const removeBook = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.body as { isbn: string };
    const result = (await findEntry(isbn)) as IBook | null;

    if (result) {
      if (!result.issued) {
        const response = (await findAndDelete(isbn)) as IBook;
        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Removed_Successfully, response });
      } else {
        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Already_Issued });
      }
    } else {
      return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Not_Found });
    }
  } catch (error: unknown) {
    console.log(LogErrorMessage(error));
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.body as { isbn: string };
    const result = (await findEntry(isbn)) as IBook | null;

    if (result) {
      if (!result.issued) {
        const response = (await findAndUpdate(isbn, { issued: true })) as IBook;
        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Borrowed_Successfully, response });
      } else {
        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Already_Borrowed });
      }
    } else {
      return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Not_Found });
    }
  } catch (error: unknown) {
    console.log(LogErrorMessage(error));
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const { isbn } = req.body as { isbn: string };
    const result = (await findEntry(isbn)) as IBook | null;

    if (result) {
      if (result.issued) {
        const response = (await findAndUpdate(isbn, { issued: false })) as IBook;

        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Returned_Successfully, response });
      } else {
        return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Already_In_Library });
      }
    } else {
      return res.status(HTTP_STATUS.OK).send({ successful: true, message: message.Book_Not_Found });
    }
  } catch (error: unknown) {
    console.log(LogErrorMessage(error));
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({ successful: false, message: message.Something_went_wrong });
  }
};
