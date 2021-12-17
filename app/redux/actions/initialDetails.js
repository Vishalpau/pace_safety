import * as actionsType from '../constants/initialDetails'
import axios from 'axios';
import { access_token, HEADER_AUTH, LOGIN_URL, SELF_API, SSO_URL } from '../../utils/constants';

import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { DataUsageOutlined } from '@material-ui/icons';



export const userDetails = async () => {
  const dispatch = useDispatch();
  try {
    let config = {
      method: "get",
      url: `${SELF_API}`,
      headers: HEADER_AUTH,
    };
    axios(config)
      .then(function (response) {
        dispatch(User(response.data.data.results.data));
        if (response.status !== 200) {
          win
        }
      })
      .catch(function (error) {
        if (error) {
          window.location.href = `${LOGIN_URL}`
        }


      });
  } catch (error) {
    window.location.href = `${LOGIN_URL}`

  }

  return {

  }
}
export const User = data => {
  return {
    type: actionsType.USER_DETAILS,
    payload: data
  }
}
export const projectName = data => {

  return {
    type: actionsType.PROJECT_NAME,
    payload: data
  }
}

export const handleBreakdownDetails = async (data) => {

  let dispatch = useDispatch()
  let breakdownList = []

  var config = {
    method: "get",
    url: `${SSO_URL}/${data.breakdown[0].structure[0].url
      }`,
    headers: HEADER_AUTH,
  };

  await Axios(config)
    .then(async (response) => {
      if (response.status === 200) {

        return await dispatch(breakDownDetails([...breakdownList,
        {
          breakdownLabel:
            data.breakdown[0].structure[0]
              .name,
          breakdownValue: response.data.data.results,
          selectValue: ""
        }]
        ))
      }
    })
    .catch(function (error) {

    });
}

export const breakDownDetails = (data) => {
  return {
    type: actionsType.BREAKDOWN_DETAILS,
    payload: data
  }
}
export const levelBDownDetails = data => {

  return {
    type: actionsType.LEVEL_BREAKDOWN_DETAILS,
    payload: data
  }
}

export const tabViewMode = data => {

  return {
    type: actionsType.VIEW_MODE,
    payload: data
  }
}
export const company = data => {
  return {
    type: actionsType.COMPANY_DATA,
    payload: data
  }
}

export const getApiDomain = data => {
  return {
    type: actionsType.API_DOMAIN,
    payload: data
  }
}

export const allPickListData = data => {

  return {
    type: actionsType.ALLPICKLISTDATA,
    payload: data
  }
}

export const baseUrl = data => {

  return {
    type: actionsType.BASEURL,
    payload: data
  }
}