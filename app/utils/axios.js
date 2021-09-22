import axios from "axios";
import { HEADER_AUTH } from "./constants";
import { apiUrl } from "./helper";
const api = axios.create({
  baseURL: apiUrl,
  headers: HEADER_AUTH
});
api.defaults.timeout = 10000;
api.defaults.timeoutErrorMessage="Timeout"
export default api