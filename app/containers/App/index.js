import React, { useEffect, useState } from "react";
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
  LOCAL_SSO_CLIENT_ID,
  LOCAL_SSO_CLIENT_SECRET,
  
  access_token,
  SELF_API,
  LOCAL_LOGIN_URL,
} from "../../utils/constants";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  const [userData, setUserData] = useState([]);
  const [companyListData, setCompanyListData] = useState([])

  const getToken = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      let data = JSON.stringify({
        grant_type: "authorization_code",
        client_id:
         `${SSO_CLIENT_ID}`,
        // `${LOCAL_SSO_CLIENT_ID}`,

        client_secret:
        `${SSO_CLIENT_SECRET}`,
        // `${LOCAL_SSO_CLIENT_SECRET}`,
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
      await axios(config)
        .then(function(response) {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
            window.location.href = "/";
          }
        })
        .catch(function(error) {
        });
    }
    else{
      if(localStorage.getItem('access_token')=== null){
        window.location.href = `${LOGIN_URL}`
        // window.location.href = `${LOCAL_LOGIN_URL}`
      }
    }
  };

  useEffect(() => {
    getToken();
  },[]);
  return (
    <ThemeWrapper>
      {localStorage.getItem("access_token") !== null ? (
        <Switch>
          <Route path="/app" exact component={LandingCorporate} />
          <Route path="/landing-creative" exact component={LandingCreative} />
          <Route path="/" component={Application} />
          <Route path="/blog" component={ArticleNews} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
       ):null} 
    </ThemeWrapper>
  );
}

export default App;
