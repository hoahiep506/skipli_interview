import { EXTEND_URL } from 'constant';
import { callApi } from 'helper';

export type TGetUserParams = {
  phoneNumber: string;
};

export const apiGetUser = (params: TGetUserParams) => {
  return callApi.get(`${EXTEND_URL.GIT_HUB}/getUser`, { params });
};
