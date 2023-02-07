import { Router } from "express";
import {
  searchGithubUsers,
  findGithubUserProfile,
  likeGithubUser,
  getUserProfile,
} from "../controller/github";

const githubRouter = Router();

githubRouter.get("/searchUser", searchGithubUsers);
githubRouter.get("/findUser", findGithubUserProfile);
githubRouter.get("/getUser", getUserProfile);
githubRouter.post("/likeUser", likeGithubUser);


export default githubRouter;