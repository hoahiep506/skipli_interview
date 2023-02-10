import { Router } from 'express';
import {
  SendAccessCodeToSMS,
  ValidateAccessCode,
} from '../controller/access_code';
import { CreateNewAccessCode } from '../middleware/access_code';
import { ValidateParameter } from '../middleware/validate';

const accessCodeRouter = Router();

accessCodeRouter.post(
  '/createNew',
  ValidateParameter,
  CreateNewAccessCode,
  SendAccessCodeToSMS
);
accessCodeRouter.post('/validate', ValidateParameter, ValidateAccessCode);

export default accessCodeRouter;
