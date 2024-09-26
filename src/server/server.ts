require("dotenv").config();
import express, { Express } from "express";
import { routes } from "@src/routes/routes";
import { LogErrorMessage } from "@src/utils";
import { ConnectToDatabase } from "@src/config/db.config";
import { SwaggerDocs } from "@docs/swagger/swagger";

export const app: Express = express();
export const PORT = Number(process.env.PORT!) || 4000;

const listenPort = (PORT: number) => {
    app.listen(PORT, () => console.log(`Server is up & running on http://localhost:${PORT}`));
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

const createSwaggerDocs = () => {
    SwaggerDocs(app, PORT);
};

const start = async () => {
    try {
        await listenPort(PORT);
        userBodyParser();
        createSwaggerDocs();
        await connectToDB();
        await createRoutes();
    } catch (error) {
        console.log(LogErrorMessage(error));
    }
};

export default {
    start,
};
