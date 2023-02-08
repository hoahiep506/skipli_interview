import axios from "axios";
import { Request, Response, NextFunction } from "express";

export const FindGithubUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await axios.get(
      `https://api.github.com/user/${req.body.githubUserId}`
    );
    if (!response.data?.id) {
      return res.status(404).json({ error: "Github user not found" });
    }

    req.body.githubUserProfile = response.data;
    next();
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};