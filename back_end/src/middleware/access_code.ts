import { Request, Response, NextFunction } from 'express';
import { formatPhoneNumber, getRandomCode } from '../utils';
import { User } from '../config';
import { doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';

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
