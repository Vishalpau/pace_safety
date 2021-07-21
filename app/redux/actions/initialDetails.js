import * as actionsType from '../constants/initialDetails'
import axios from 'axios';
import { access_token, SELF_API } from '../../utils/constants';

export const userDetails = async() => {
    try{
        let config = {
          method: "get",
          url: `${SELF_API}`,
          headers: { 
            'Authorization': `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        };
        console.log('config',config);
        axios(config)
          .then(function(response) {
           console.log(response)
           dispatch(User(response.data.results.data));
           if(response.status !== 200){
             alert("hey ram")
            window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`
    
           }
          })
          .catch(function(error) {
            if(error.status === 401){
              alert("hey ram")
            }
            console.log(error);
            
          });
        }catch(error){
          window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`
    
        }

    return {
        
    }
}
export const User = data=>{
    console.log(data)
    return {
        type: actionsType.USER_DETAILS,
        payload: data
    }
}
export const projectName = data=>{
    console.log(data)
    return {
        type: actionsType.PROJECT_NAME,
        payload: data
    }
}