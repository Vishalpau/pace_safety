import axios from "axios";
import React, { useEffect, useState } from "react";
import { HEADER_AUTH } from "./constants";
import { apiUrl } from "./helper";


const apiAction = axios.create({
    baseURL: "",
    headers: HEADER_AUTH
});
apiAction.defaults.timeout = 10000;
apiAction.defaults.timeoutErrorMessage = "Timeout"

apiAction.interceptors.request.use(
    function (config) {
        if (JSON.parse(localStorage.getItem("BaseUrl"))["actions"] !== null) {
            config.baseURL = JSON.parse(localStorage.getItem("BaseUrl"))["actions"];
        }
        return config;
    }
)

export default apiAction