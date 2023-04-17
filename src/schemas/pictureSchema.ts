import Joi from "joi";
import { PictureParams } from "../protocols";
const pictureSchema = Joi.object({
    pictures: Joi.array().items(
      Joi.object<PictureParams>({
        url: Joi.string().required(),
        name: Joi.string().required(),
        scrapBookId: Joi.number().required(),
        comment: Joi.string().required(),
      })
    ),
  });

export default pictureSchema