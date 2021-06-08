import axios from "axios";

import { apiUrl } from "./helper";

const apiUrl = "http://35.154.225.124:31575/"

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
