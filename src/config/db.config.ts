require("dotenv").config();
import mongoose from "mongoose";

export const ConnectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING!);
        console.log(`Successfully Connected to MongoDB!`);
    } catch (error: unknown) {
        console.error(`An error occurred ${error}`);
        process.exit(1);
    }
};
