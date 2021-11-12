import axios from "axios";
import React, { useEffect, useState } from "react";
import { HEADER_AUTH } from "./constants";
import { apiUrl } from "./helper";


const api = axios.create({
  baseURL: "",
  headers: HEADER_AUTH,
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