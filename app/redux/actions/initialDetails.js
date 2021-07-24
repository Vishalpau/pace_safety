import * as actionsType from '../constants/initialDetails'
import axios from 'axios';
import { access_token, HEADER_AUTH, SELF_API,SSO_URL } from '../../utils/constants';

import { useDispatch } from 'react-redux';
import Axios from 'axios';



export const userDetails = async() => {
  const dispatch = useDispatch();
    try{
        let config = {
          method: "get",
          url: `${SELF_API}`,
          headers: HEADER_AUTH,
        };
        axios(config)
          .then(function(response) {
           dispatch(User(response.data.data.results.data));
           if(response.status !== 200){
            window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`    
           }
          })
          .catch(function(error) {
            if(error){
              // window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`
            }
            
            
          });
        }catch(error){
          // window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`
    
        }

    return {
        
    }
}
export const User = data=>{
    return {
        type: actionsType.USER_DETAILS,
        payload: data
    }
}
export const projectName = data=>{
    
    return {
        type: actionsType.PROJECT_NAME,
        payload: data
    }
}

export const handleBreakdownDetails = async(data) =>{
  
  let dispatch = useDispatch()
  let breakdownList = []
 
      var config = {
        method: "get",
        url: `${SSO_URL}/${
          data.breakdown[0].structure[0].url
        }`,
        headers: HEADER_AUTH,
      };
   
      await Axios(config)
        .then(async(response)=> {
          if(response.status ===200){

          return await dispatch(breakDownDetails([...breakdownList,
              {breakdownLabel:
                      data.breakdown[0].structure[0]
                        .name,
                    breakdownValue: response.data.data.results,
                    selectValue:""}]
              ))
          }
        })
        .catch(function(error) {
         
        });
}

export const breakDownDetails = (data,name)=>{

  let List=[];
  let temp = [...List,{
    breakdownLabel:
      name,
    breakdownValue: data,
    selectValue:""
  }]
  List = temp
  return {
      type: actionsType.BREAKDOWN_DETAILS,
      payload: List
  }
}
export const addbreakDownDetails = data=>{
  
  return {
      type: actionsType.ADD_BREAKDOWN_DETAILS,
      payload: data
  }
}