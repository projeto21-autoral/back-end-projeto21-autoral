import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares/authMiddleware';
import httpStatus from 'http-status';
import picturesService from '@/services/picturesService';
import { ArrayPictureParams } from '@/protocols';

export async function postPictures(req: AuthenticatedRequest, res: Response) {
  const pictures = req.body.pictures as ArrayPictureParams;

  try {
    await picturesService.createMany(pictures);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if(error.name === 'ForbiddenError'){
      return res.status(httpStatus.FORBIDDEN).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
export async function getPicturesById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const pictureId = Number(id);
  try {
    const picture = await picturesService.findPictureById(pictureId);
    return res.status(httpStatus.OK).send(picture);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function deletePictures(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const pictureId = Number(id);
  try {
    const deletedPicture = await picturesService.deletePicture(pictureId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function putPictures(req: AuthenticatedRequest, res: Response) {
  const { url, name, comment } = req.body;
  const { id } = req.params;
  const pictureId = Number(id);
  try {
    const updatedPicture = await picturesService.updatePicture(pictureId, url, name, comment);
    return res.status(httpStatus.OK).send(updatedPicture);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
