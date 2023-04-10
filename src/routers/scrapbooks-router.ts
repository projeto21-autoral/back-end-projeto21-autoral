import { Router } from "express";

const scrapbooksRouter = Router();

scrapbooksRouter.get("/")
scrapbooksRouter.get("/:id")
scrapbooksRouter.post("/")

export {scrapbooksRouter}