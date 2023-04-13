import { deletePictures, getPicturesById,postPictures, putPictures } from "@/controllers/picturesController";
import { authenticatedToken } from "@/middlewares/authMiddleware";
import { validateAllBody} from "@/middlewares/validationAuthMiddleware";
import pictureSchema from "@/schemas/pictureSchema";
import { Router } from "express"

const picturesRouter = Router();

picturesRouter
    .all("/*", authenticatedToken)
    .get("/:id", getPicturesById)
    // .get("/", getPicturesByScrapbookId)
    .post("/", validateAllBody(pictureSchema),postPictures)
    .delete("/:id",deletePictures)
    .put("/:id", putPictures)

export {picturesRouter}