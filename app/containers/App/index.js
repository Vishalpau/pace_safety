import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";
import { Offline, Online } from "react-detect-offline";

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
  const [status, setStatus] = useState(0)
  const userLogin = () => {
    try {
      let config = {
        method: "get",
        url: `${SELF_API}`,
        headers: HEADER_AUTH,
      };
      axios(config)
        .then(function (response) {

          localStorage.setItem('userDetails', JSON.stringify(response.data.data.results.data))
          setStatus(response.status)
          if (response.status !== 200) {
            if (window.location.hostname === 'localhost') {
              window.location.href = `${LOCAL_LOGIN_URL}`;
            } else {
              window.location.href = `${LOGIN_URL}`
            }
          }
        })
        .catch(function (error) {
        });
    } catch (error) {
    }
  }
  useEffect(() => {
    userLogin();
  }, [status])
  const getToken = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    let data = {}
    if (code) {
      if (window.location.hostname === 'localhost') {
        data = JSON.stringify({
          grant_type: "authorization_code",
          client_id: `${LOCAL_SSO_CLIENT_ID}`,
          client_secret: `${LOCAL_SSO_CLIENT_SECRET}`,
          code: code,
        });

      } else {
        data = JSON.stringify({
          grant_type: "authorization_code",
          client_id:
            `${SSO_CLIENT_ID}`,
          client_secret:
            `${SSO_CLIENT_SECRET}`,
          code: code,
        });

      }

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
        if (window.location.hostname === 'localhost') {
          window.location.href = `${LOCAL_LOGIN_URL}`;
        } else {
          window.location.href = `${LOGIN_URL}`
        }
      }
    }
  };

  useEffect(() => {
    getToken();

  }, []);
  return (


    <ThemeWrapper>
      <Online>
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
      </Online>
      <Offline>Turn on internet</Offline>

    </ThemeWrapper>
  );
}

export default App;