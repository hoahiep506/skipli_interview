import { NextFunction, Request, Response } from 'express';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { User } from '../config';
import { formatPhoneNumber, getRandomCode } from '../utils';

export const CreateNewAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const accessCode = getRandomCode();
    const userData = await getDoc(doc(User, formatPhoneNumber(phoneNumber)));
    if (!userData.exists()) {
      await setDoc(doc(User, formatPhoneNumber(phoneNumber)), {
        phoneNumber: phoneNumber,
        accessCode: accessCode,
        favoriteGithubUsers: [],
      });
    } else {
      await updateDoc(doc(User, formatPhoneNumber(phoneNumber)), {
        accessCode: accessCode,
      });
    }
    req.body.accessCode = accessCode;
    next();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
