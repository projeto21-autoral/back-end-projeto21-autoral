import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthParams } from 'protocols';
import authService from 'services/authService';

export async function signInController(req: Request, res: Response) {
  const { email, password } = req.body as AuthParams;
  
  try {
    const access = await authService.signIn({ email, password });
    return res.status(httpStatus.OK).send(access);
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).send('Acesso negado');
  }
}
