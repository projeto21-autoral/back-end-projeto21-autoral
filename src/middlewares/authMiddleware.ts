import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { prisma } from '../config';
import { unauthorizedError } from '../errors/unauthorizedError';

export async function authenticatedToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const header = req.header('Authorization');
  if (!header) {
    return generateUnauthorizedResponse(res);
  }
  const token = header.split(' ')[1];
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    const session = await prisma.session.findFirst({
      where: {
        token,
      },
    });
    if (!session) {
      return generateUnauthorizedResponse(res);
    }
    req.userId = userId;

    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: number;
};
