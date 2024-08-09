import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        isbn: { type: String, required: true },
        year: { type: Number, required: true },
        issued: { type: Boolean, required: true },
    },
    { collection: "book", versionKey: false }
);

export const BookModel = mongoose.model("book", BookSchema);
