import { Request, Response, NextFunction } from "express";
import { getRandomCode, isValidPhoneNumber } from "../utils";
import { PhoneNumber } from "../config";
import { doc, setDoc } from "firebase/firestore";
export const CreateNewAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const phoneNumber = req.body.phoneNumber;
  if (!isValidPhoneNumber) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  const accessCode = getRandomCode();
  try {
    await setDoc(doc(PhoneNumber, phoneNumber), {
      phoneNumber: phoneNumber,
      accessCode: accessCode,
    });
    next(accessCode);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
