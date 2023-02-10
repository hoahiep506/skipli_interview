import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { User } from '../config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { formatPhoneNumber } from '../utils';

export const SearchGithubUsers = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`https://api.github.com/search/users`, {
      params: {
        q: req.query?.q,
        per_page: req.query?.perPage || 10,
        page: req.query?.page || 1,
      },
    });
    return res.status(200).json(response.data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const LikeGithubUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const githubUserId = req.body.githubUserId;

    const userData = await getDoc(doc(User, formatPhoneNumber(phoneNumber)));
    if (!userData.exists()) {
      return res.status(404).json({ error: 'Phone number not found' });
    }

    const githubUserProfile = req.body.githubUserProfile;
    const favoriteGithubUsers = userData.data()?.favoriteGithubUsers;

    if (favoriteGithubUsers.some((user: any) => user.id == githubUserId)) {
      await updateDoc(doc(User, formatPhoneNumber(phoneNumber)), {
        favoriteGithubUsers: favoriteGithubUsers.filter(
          (user: any) => user.id != githubUserId
        ),
      });
      return res.status(200).json({ message: 'Unlike Success' });
    }

    await updateDoc(doc(User, formatPhoneNumber(phoneNumber)), {
      favoriteGithubUsers: [...favoriteGithubUsers, githubUserProfile],
    });
    return res.status(200).json({ message: 'Like Success' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const GetUserProfile = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.query.phoneNumber as string;
    const userData = await getDoc(doc(User, formatPhoneNumber(phoneNumber)));
    if (!userData.exists()) {
      return res.status(404).json({ error: 'Phone number not found' });
    }
    return res
      .status(200)
      .json({ favoriteGithubUser: userData.data()?.favoriteGithubUsers });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
