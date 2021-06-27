import axios from "axios";

import { SSO_URL } from "./constants";
import { apiUrl } from "./helper";

const apiUrl = SSO_URL;

const api = axios.create({
  baseURL: apiUrl,
});

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Do something with response error
  console.log(error.response.status);
  return Promise.reject(error);
});

export default api;
