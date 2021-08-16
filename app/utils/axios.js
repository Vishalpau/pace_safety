import axios from "axios";
import { HEADER_AUTH } from "./constants";

import { apiUrl } from "./helper";

const api = axios.create({
  baseURL: apiUrl,
  headers:HEADER_AUTH
});

export default api