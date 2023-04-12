import { AuthenticatedRequest } from '@/middlewares/authMiddleware';
import { Response } from 'express';
import httpStatus from 'http-status';
import scrapbookService from '@/services/scrapbooksService';

export async function postScrapbook(req: AuthenticatedRequest, res: Response) {
  const { name, numberPictures } = req.body;
  const { userId } = req;

  try {
    const newScrapbook = await scrapbookService.createScrapbook(name, userId, numberPictures);
    return res.status(httpStatus.CREATED).json({
      name: newScrapbook.name,
      userId: newScrapbook.userId,
      numberPictures: newScrapbook.numberPictures,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === 'UnauthorizedError') {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getScrapbooks(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const scrapbooks = await scrapbookService.findScrapbookByUserId(userId);
    return res.status(httpStatus.OK).send(scrapbooks);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
export async function getScrapbooksById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const scrapbookId = Number(id);
  const { userId } = req;
  try {
    const scrapbook = await scrapbookService.findScrapbookById(scrapbookId);
    return res.status(httpStatus.OK).send(scrapbook);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function deleteScrapbook(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { id } = req.params;
  const scrapbookId = Number(id);
  try {
    await scrapbookService.deleteScrapbook(scrapbookId);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
