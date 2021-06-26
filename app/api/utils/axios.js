import axios from "axios";

import { SSO_URL } from "./constants";
import { apiUrl } from "./helper";

const apiUrl = SSO_URL;

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
