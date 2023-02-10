import { EXTEND_URL } from 'constant';
import { callApi } from 'helper';

export type TCreateAccessCodeParams = {
  phoneNumber: string;
};

export const apiCreateAccessCode = (params: TCreateAccessCodeParams) => {
  return callApi.post(`${EXTEND_URL.ACCESS_CODE}/createNew`, params);
};
