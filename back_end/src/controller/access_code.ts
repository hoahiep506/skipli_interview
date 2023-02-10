import env from 'dotenv';
import { Request, Response } from 'express';
import { doc, getDoc } from 'firebase/firestore';
import { User } from '../config';
import { formatPhoneNumber } from '../utils';

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

env.config();

export const SendAccessCodeToSMS = (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = req.body.accessCode;
  client.messages
    .create({
      to: '+' + formatPhoneNumber(phoneNumber),
      from: twilioPhone,
      body: `Your access code is: ${accessCode}`,
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
