require("dotenv").config();
import express, { Express } from "express";
import { routes } from "./../routes/routes";
import { LogErrorMessage } from "./../utils";
import { ConnectToDatabase } from "./../config/db.config";

export const app: Express = express();
export const PORT = process.env.PORT! || 3000;

const listenPort = (PORT: number) => {
    app.listen(PORT, () =>
        console.log(`Server is up & running on http://localhost:${PORT}`)
    );
};

const userBodyParser = () => {
    app.use(express.json());
};

const createRoutes = async () => {
    routes(app);
};

const connectToDB = async () => {
    await ConnectToDatabase();
};

const start = async () => {
    try {
        await listenPort(Number(PORT));
        userBodyParser();
        await connectToDB();
        await createRoutes();
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

export default {
    start,
};
