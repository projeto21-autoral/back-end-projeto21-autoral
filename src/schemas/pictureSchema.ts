import Joi from "joi";

const pictureSchema = Joi.object({
    urL: Joi.string().required(),
    name: Joi.string().required(),
    scrapbookId: Joi.number().required(),
    comment: Joi.string().required(),

})

export default pictureSchema