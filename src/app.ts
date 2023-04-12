import express, {Express, json, Response, Request} from "express"
import cors from "cors";
import { authRouter, usersRouter, scrapbooksRouter, picturesRouter } from "routers";
import { loadEnv, connectDb, disconnectDB } from "./config";

loadEnv();

import { handleApplicationErrors } from "./middlewares/handlingErrorMiddleware";


const app = express();
app
    .use(json())
    .use(cors())
    .get("/health", (req:Request, res:Response)=>res.send("Hello"))
    .use("/sign-in" , authRouter)
    .use("/users", usersRouter)
    .use("/scrapbooks", scrapbooksRouter)
    .use("/pictures", picturesRouter)
    .use(handleApplicationErrors)


export function init():Promise<Express>{
    connectDb();
    return Promise.resolve(app)
};

export async function close(): Promise<void>{
    await disconnectDB()
}

export default app;