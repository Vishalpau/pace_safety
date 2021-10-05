import axios from "axios";
import React, { useEffect, useState } from "react";
import { HEADER_AUTH } from "./constants";
import { apiUrl } from "./helper";


const api = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: HEADER_AUTH,
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
});

api.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("apiBaseUrl") !== null) {
      config.baseURL = localStorage.getItem("apiBaseUrl");
    }
    return config;
  }
)

export default api