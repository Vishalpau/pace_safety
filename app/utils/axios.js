import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HEADER_AUTH } from './constants';
import { apiUrl } from './helper';


export const setApiUrl = () => {
  if (localStorage.getItem('userDetails') != null && localStorage.getItem('projectName') != null) {
    const user = JSON.parse(localStorage.getItem('userDetails'));
    const comp = JSON.parse(localStorage.getItem('company')).fkCompanyId;
    return (user
      .companies
      .filter(company => company.companyId == comp)[0]
      .subscriptions
      .filter(subscription => subscription.appCode == 'actions')[0]
      .hostings[0].apiDomain) + '/';
  }

  return '';
};


const api = axios.create({
  baseURL: '',
  headers: HEADER_AUTH,
});

export const appapi = axios.create({
  baseURL: apiUrl,
  headers: HEADER_AUTH
});

api.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('apiBaseUrl') !== null) {
      config.baseURL = localStorage.getItem('apiBaseUrl');
    }
    return config;
  }
);

export default api;
