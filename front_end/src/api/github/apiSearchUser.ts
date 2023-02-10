import { EXTEND_URL } from 'constant';
import { callApi } from 'helper';

export type TSearchUserParams = {
  q: string;
  perPage?: number;
  page?: number;
};

export const apiSearchUser = (params: TSearchUserParams) => {
  return callApi.get(`${EXTEND_URL.GIT_HUB}/searchUser`, { params });
};
