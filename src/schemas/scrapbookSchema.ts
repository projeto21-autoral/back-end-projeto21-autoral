import Joi from "joi";
import { ScrapbookParams } from "@/protocols";

export const scrapbookSchema = Joi.object<ScrapbookParams>({
    name: Joi.string().required(),
    userId: Joi.number().required(),
    numberPictures: Joi.number().required().min(1).max(5)
})