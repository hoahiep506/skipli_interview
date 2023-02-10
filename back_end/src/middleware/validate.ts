import { NextFunction, Request, Response } from 'express';
import { isValidPhoneNumber } from '../utils';

export const ValidateParameter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!!req.body.phoneNumber && !isValidPhoneNumber(req.body.phoneNumber)) {
    return res.status(400).json({ error: 'Invalid phone number' });
  }
  next();
};
