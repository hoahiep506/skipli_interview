import { apiGetUser } from 'api';
import { isString } from 'formik';
import { TGithubUser } from 'page/main/helper';
import { useEffect, useState } from 'react';

export const useApiGetUser = () => {
  const [data, setData] = useState([] as TGithubUser[]);
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    if (isString(phoneNumber)) {
      apiGetUser({ phoneNumber }).then((res) => {
        if (res.status === 200) {
          localStorage.setItem(
            'favoriteGithubUser',
            JSON.stringify(res.data?.favoriteGithubUser)
          );
          setData(res.data?.favoriteGithubUser);
        }
      });
    }
  }, []);

  return { data, phoneNumber };
};
