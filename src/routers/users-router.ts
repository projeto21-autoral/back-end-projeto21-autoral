import { validateAllBody } from '../middlewares/validationAuthMiddleware';
import { signUpSchema } from '../schemas/signUpSchema';
import { Router } from 'express';
import { getAllUsers, getUserById, postUser } from '../controllers/usersController';
import { authenticatedToken } from '../middlewares/authMiddleware';

const usersRouter = Router();

usersRouter.get('/', authenticatedToken, getAllUsers);
usersRouter.get('/:id', authenticatedToken, getUserById);
usersRouter.post('/', validateAllBody(signUpSchema), postUser);

export { usersRouter };
