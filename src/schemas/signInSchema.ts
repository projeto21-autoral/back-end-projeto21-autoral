import Joi from "joi"
import { UserParams } from "protocols"

export const signInSchema = Joi.object<UserParams>({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})