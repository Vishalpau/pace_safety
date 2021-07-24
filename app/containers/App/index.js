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
  HEADER_AUTH,
  access_token,
  SELF_API,
  LOCAL_LOGIN_URL,
} from "../../utils/constants";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


function App() {
  const [userData, setUserData] = useState([]);
  const [companyListData, setCompanyListData] = useState([])
  try {
    let config = {
      method: "get",
      url: `${SELF_API}`,
      headers: HEADER_AUTH,
    };
    axios(config)
      .then(function (response) {
        console.log('index', response.data.data)
        localStorage.setItem('userDetails', JSON.stringify(response.data.data.results.data))
        if (response.status !== 200) {
          window.location.href = `${LOCAL_LOGIN_URL}`;
          //  window.location.href = `${LOGIN_URL}`;
        }
      })
      .catch(function (error) {
        if (error) {
          // window.location.href = `${LOCAL_LOGIN_URL}`;
          //  window.location.href = `${LOGIN_URL}`;
        }

      });
  } catch (error) {
    // window.location.href = `https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=ZVbuUG5DsHzMgswa5Kb7zp2nHn0ZKiRSA8U2IGN1&client_secret=pu0AQUmSRQ6TJY1F5oCra8YyXZ9Unu9P4Mo85weLk0unRireA8W7jUHJ2GIaU0gNyDLxbq5t1Au7E2ybwmBLI8W9atizRqr9wjPh9rChN2GrXnPbDYVSUTINv0M0zaSW&response_type=code`

  }
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
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
            window.location.href = "/";
          }
        })
        .catch(function (error) {
        });
    }
    else {
      if (localStorage.getItem('access_token') === null) {
        window.location.href = `${LOGIN_URL}`
        // window.location.href = `${LOCAL_LOGIN_URL}`
      }
    }
  };

  useEffect(() => {
    getToken();
  }, []);
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
      ) : null}
    </ThemeWrapper>
  );
}

export default App;
