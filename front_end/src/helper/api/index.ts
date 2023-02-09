import axios from 'axios';
import { BASE_URL } from 'constant/api';
import { swalAlert } from 'helper/alert';

const callApi = axios.create({
  baseURL: BASE_URL,
});

callApi.defaults.timeout = 10000;
callApi.defaults.headers.post['Content-Type'] = 'application/json';
callApi.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      if (response.data?.message) {
        swalAlert(response.data?.message);
      }
      return response;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { callApi };
