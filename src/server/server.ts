require("dotenv").config();
import express, { Express } from "express";
import { routes } from "./../routes/routes";

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

const createRoutes = () => {
    routes(app);
};

const start = async () => {
    try {
        await listenPort(Number(PORT));
        userBodyParser();
        await createRoutes();
    } catch (error) {
        console.log(error);
    }
};

export default {
    start,
};
