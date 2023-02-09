import { Router } from 'express';
import { CreateNewAccessCode } from '../middleware/access_code';
import { ValidateParameter } from '../middleware/validate';
import {
  SendAccessCodeToSMS,
  ValidateAccessCode,
} from '../controller/access_code';

const accessCodeRouter = Router();

accessCodeRouter.post(
  '/createNew',
  ValidateParameter,
  CreateNewAccessCode,
  SendAccessCodeToSMS
);
accessCodeRouter.post('/validate', ValidateParameter, ValidateAccessCode);

export default accessCodeRouter;
