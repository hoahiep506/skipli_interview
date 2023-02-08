import { Request, Response } from "express";
import env from "dotenv";
import twilio from "twilio";
import { isValidPhoneNumber } from "../utils";
import { PhoneNumber } from "../config";
import { doc, getDoc } from "firebase/firestore";
env.config();

const twilioSID = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const twilioService = twilio(twilioSID, twilioAuthToken);

export const SendAccessCodeToSMS = (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = req.body.accessCode;
  twilioService.messages
    .create({
      body: `Your access code is: ${accessCode}`,
      to: phoneNumber,
      from: twilioPhone,
    })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Access code sent to phone number successfully." });
    })
    .catch((err: any) => {
      return res.status(500).json({ error: err.message });
    });
};

export const ValidateAccessCode = async (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCodeRequest = req.body.accessCode?.toUpperCase();
  if (!isValidPhoneNumber(phoneNumber)) {
    return res.status(400).json({ error: "Invalid phone number" });
  }
  try {
    const phoneNumberData = await getDoc(doc(PhoneNumber, phoneNumber));
    const phoneNumberAccessCode = phoneNumberData.data()?.accessCode;
    if (!phoneNumberData.exists()) {
      return res.status(404).json({ error: "Phone number not found" });
    }
    if (accessCodeRequest === phoneNumberAccessCode) {
      return res
        .status(200)
        .json({ message: "Access code is valid", phoneNumber: phoneNumber });
    }
    if (accessCodeRequest !== phoneNumberAccessCode) {
      return res.status(400).json({ error: "Access code is invalid" });
    } 
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
