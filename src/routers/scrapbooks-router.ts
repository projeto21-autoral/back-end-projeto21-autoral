import { Router } from 'express';
import { authenticatedToken } from '../middlewares/authMiddleware';
import { getScrapbooks, getScrapbooksById, postScrapbook, deleteScrapbook } from '../controllers/scrapbooksController';
import { validateAllBody } from '../middlewares/validationAuthMiddleware';
import { scrapbookSchema } from '../schemas/scrapbookSchema';
const scrapbooksRouter = Router();

scrapbooksRouter
  .all('/*', authenticatedToken)
  .get('/', getScrapbooks)
  .get('/:id', getScrapbooksById)
  .post('/', validateAllBody(scrapbookSchema), postScrapbook)
  .delete('/:id', deleteScrapbook);

export { scrapbooksRouter };
