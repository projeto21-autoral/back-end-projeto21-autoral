import Joi from "joi"
import { UserParams } from "protocols"

export const signUpSchema = Joi.object<UserParams>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})