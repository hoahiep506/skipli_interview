import { Request, Response } from "express";

export const searchGithubUsers = (req : Request, res: Response) => {
  return res.status(200).json("searchGithubUsers")
} 

export const findGithubUserProfile = (req : Request, res: Response) => {
  return res.status(200).json("findGithubUserProfile")
} 

export const likeGithubUser = (req : Request, res: Response) => {
  return res.status(200).json("likeGithubUser")
} 

export const getUserProfile = (req : Request, res: Response) => {
  return res.status(200).json("getUserProfile")
} 
