import { EXTEND_URL } from 'constant';
import { callApi } from 'helper';

export type TLikeUserParams = {
  phoneNumber: string;
  githubUserId: string;
};

export const apiLikeUser = (params: TLikeUserParams) => {
  return callApi.post(`${EXTEND_URL.GIT_HUB}/likeUser`, params);
};
