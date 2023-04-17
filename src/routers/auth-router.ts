import { validateAllBody } from "../middlewares/validationAuthMiddleware";
import { signInSchema } from "../schemas/signInSchema";
import { Router } from "express";
import { signInController } from "../controllers/authController";
const authRouter = Router();

authRouter.post("/", validateAllBody(signInSchema),signInController);

export  {authRouter}
