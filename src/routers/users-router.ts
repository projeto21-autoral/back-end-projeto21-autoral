import { validateAllBody } from "@/middlewares/validationAuthMiddleware";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Router } from "express"
import { postUser } from "@/controllers/usersController";

const usersRouter = Router();

usersRouter.get("/");
usersRouter.get("/:id");
usersRouter.post("/", validateAllBody(signUpSchema), postUser);

export {usersRouter}