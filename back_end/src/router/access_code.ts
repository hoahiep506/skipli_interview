import { Router } from "express";
import {
  CreateNewAccessCode,
} from "../middleware/access_code";
import {
  SendAccessCodeToSMS,
  ValidateAccessCode,
} from "../controller/access_code";

const accessCodeRouter = Router();

accessCodeRouter.post("/createNew", CreateNewAccessCode, SendAccessCodeToSMS);
accessCodeRouter.post(
  "/validate",
  ValidateAccessCode
);

export default accessCodeRouter;

