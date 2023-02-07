import { Request, Response } from "express";
import twilio from "twilio";
const twilioSID = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

export const SendAccessCodeToSMS = (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber;
  const accessCode = req.body.accessCode;
  const twilioService = twilio(twilioSID, twilioAuthToken);
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


export const ValidateAccessCode = (req: Request, res: Response) => {
  return res.status(200).json("ValidateAccessCode");
};
