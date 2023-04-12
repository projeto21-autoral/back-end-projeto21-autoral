import httpStatus from 'http-status';
import { Request, Response } from 'express';
import userService from 'services/userService';
import { AuthenticatedRequest } from '@/middlewares/authMiddleware';

export async function postUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    const user = await userService.createUser({ name, email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === 'DuplicatedEmailError') {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getUserById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const user = await userService.findUserById(userId);
    return res.status(httpStatus.OK).send({
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function getAllUsers(req: AuthenticatedRequest, res: Response) {
  try {
    const users = await userService.findAllUsers();
    return res.status(httpStatus.OK).send(users);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
