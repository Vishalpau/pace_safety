import { API_URL,HEADER_AUTH, SSO_URL, } from './constants';
import api from './axios'

export const setToken = (token) => localStorage.setItem('token', token);

export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

// export const apiUrl = "http://cors.digiqt.com/feature1-hseapi.paceos.io/";
export const apiUrl = API_URL;
export const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatPlanNames = (name, delimiter, join) => {
  const splitName = name.split(delimiter);
  const formattedName = [];
  splitName.forEach((word) => {
    formattedName.push(capitalize(word));
  });
  return formattedName.join(join);
};


export const getPicklistvalues = (id, cb) => api.get(`api/v1/lists/${id}/value`)
  .then(response => response.data.data.results)
  .then(response => cb(response))

export const currancyFormatter = (number) => parseFloat(number)
  .toFixed(1)
  .replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,')
  .replace(/\.0+$/, '');

export const maxLengthCheck = (e) => {
  if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength);
  }
};
export const handelNotifyToValues = async () => {
  const { fkCompanyId } = JSON.parse(localStorage.getItem('company'));
  const fkProjectId = JSON.parse(localStorage.getItem('projectName'))
    .projectName.projectId;
  let allRoles = {}
  const config = {
    method: 'get',
    url: `${SSO_URL}/api/v1/companies/${fkCompanyId}/projects/${fkProjectId}/notificationroles/flha/?subentity=flha&roleType=custom`,
    headers: HEADER_AUTH,
  };
  const notify = await api(config);
  if (notify.status === 200) {
    const result = notify.data.data.results;
    result.map((value) => {
      allRoles[value["id"]] = value["roleName"]
    })
    return allRoles
  }
}
export const formatNames = (names) => {
  const f = names.split(' ');
  for (let i = 0; i < f.length; i += 1) {
    f[i] = f[i].charAt(0).toUpperCase() + f[i].slice(1);
  }

  return f.join(' ');
};
