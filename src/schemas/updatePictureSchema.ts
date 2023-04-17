import Joi from 'joi';
import { PictureParams } from '../protocols';
const updatePictureSchema = Joi.object<PictureParams>({
  url: Joi.string(),
  name: Joi.string(),
  comment: Joi.string(),
});

export default updatePictureSchema;
