import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";

import { PersonalDashboard } from "../../containers/pageListAsync";

import axios from "axios";
// import Authentication from "./Authentication";

import {
  SSO_URL,
  LOGIN_URL,
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
  access_token,
} from "../../utils/constants";
import api from "../../utils/axios";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
// client_id:  client_secret:
function App() {
  const getToken = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      let data = JSON.stringify({
        grant_type: "authorization_code",
        client_id: "yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo",
        //  "ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1",
       
        client_secret:"pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz",
        // "pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW",
          
        code: code,
      });

      let config = {
        method: "post",
        url: `${SSO_URL}/api/v1/user/auth/token/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log(config);
      await axios(config)
        .then(function(response) {
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem("access_token", response.data.access_token);
            window.location.href = "/";
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
    // else{
    //   console.log(localStorage.getItem('access_token')!== null)
    //   if(localStorage.getItem('access_token')=== null){
    //     window.location.href = `${LOGIN_URL}`
    //     // window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`
    //   }
    // }
    // if (code) {
    //   const response = await api.post(`${SSO_URL}/api/v1/user/auth/token/`, {
    //     grant_type: 'authorization_code',
    //     client_id:
    //       { SSO_CLIENT_ID } || 'yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo',
    //     client_secret:
    //       { SSO_CLIENT_SECRET }
    //       || "pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz",
    //     code,
    //   });
    //   const result = response.data.access_token;
    //   localStorage.setItem('access_token', result);
    // }
  };

  useEffect(() => {
    getToken();
  });
  return (
    <ThemeWrapper>
      {/* {localStorage.getItem("access_token") !== null ? ( */}
        <Switch>
          <Route path="/app" exact component={LandingCorporate} />
          <Route path="/landing-creative" exact component={LandingCreative} />
          <Route path="/" component={Application} />
          <Route path="/blog" component={ArticleNews} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
      {/* ):null} */}
        {/* ) : (
         <Switch>
           <Route component={Authentication} />
         </Switch>
      )}  */}
    </ThemeWrapper>
  );
}

export default App;
