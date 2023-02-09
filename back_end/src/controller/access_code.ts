import { Request, Response } from 'express';
import env from 'dotenv';
import { formatPhoneNumber, isValidPhoneNumber } from '../utils';
import { User } from '../config';
import { doc, getDoc } from 'firebase/firestore';

const { Vonage } = require('@vonage/server-sdk');
env.config();
const vonage = new Vonage({
  apiKey: process.env.VONAGE_KEY,
  apiSecret: process.env.VONAGE_SECRET,
});

export const SendAccessCodeToSMS = (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = req.body.accessCode;
  vonage.sms
    .send({
      to: phoneNumber,
      from: 'Skipli Interview',
      text: `Your access code is: ${accessCode}`,
    })
    .then(() => {
      return res.status(200).json({ message: 'Access code has been sent' });
    })
    .catch((err: any) => {
      return res.status(500).json({ error: err.message });
    });
};

export const ValidateAccessCode = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const accessCodeRequest = req.body.accessCode?.toUpperCase();
    const userData = await getDoc(doc(User, formatPhoneNumber(phoneNumber)));
    const phoneNumberAccessCode = userData.data()?.accessCode;
    if (!userData.exists()) {
      return res.status(404).json({ error: 'Phone number not found' });
    }
    if (accessCodeRequest === phoneNumberAccessCode) {
      return res
        .status(200)
        .json({ message: 'Verify Success', phoneNumber: phoneNumber });
    }
    if (accessCodeRequest !== phoneNumberAccessCode) {
      return res.status(400).json({ error: 'Access code is invalid' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
