import { authenticatedToken } from "@/middlewares/authMiddleware";
import { Router } from "express"

const picturesRouter = Router();

picturesRouter
    .all("/*", authenticatedToken)
    .get("/",)
    .post("/",)

export {picturesRouter}