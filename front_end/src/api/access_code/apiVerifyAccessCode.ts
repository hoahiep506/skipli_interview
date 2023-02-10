import { EXTEND_URL } from 'constant';
import { callApi } from 'helper';

export type TVerifyAccessCodeParams = {
  phoneNumber: string;
  accessCode: string;
};

export const apiVerifyAccessCode = (params: TVerifyAccessCodeParams) => {
  return callApi.post(`${EXTEND_URL.ACCESS_CODE}/validate`, params);
};
