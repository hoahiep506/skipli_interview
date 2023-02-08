import { Router } from "express";
import { ValidateParameter } from "../middleware/validate";
import {
  SearchGithubUsers,
  LikeGithubUser,
  GetUserProfile,
} from "../controller/github";
import { FindGithubUserProfile } from "../middleware/github";

const githubRouter = Router();

githubRouter.get("/searchUser", SearchGithubUsers);
githubRouter.get("/getUser", ValidateParameter, GetUserProfile);
githubRouter.post(
  "/likeUser",
  ValidateParameter,
  FindGithubUserProfile,
  LikeGithubUser
);

export default githubRouter;
