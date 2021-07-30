import axios from "axios";

import { apiUrl } from "./helper";

const api = axios.create({
  baseURL: apiUrl,
});

export default api