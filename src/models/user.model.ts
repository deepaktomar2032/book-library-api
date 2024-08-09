import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
    },
    { collection: "user", versionKey: false }
);

export const UserModel = mongoose.model("user", UserSchema);
