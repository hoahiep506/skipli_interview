import { Router } from 'express';
import {
  GetUserProfile,
  LikeGithubUser,
  SearchGithubUsers,
} from '../controller/github';
import { FindGithubUserProfile } from '../middleware/github';
import { ValidateParameter } from '../middleware/validate';

const githubRouter = Router();

githubRouter.get('/searchUser', SearchGithubUsers);
githubRouter.get('/getUser', ValidateParameter, GetUserProfile);
githubRouter.post(
  '/likeUser',
  ValidateParameter,
  FindGithubUserProfile,
  LikeGithubUser
);

export default githubRouter;
