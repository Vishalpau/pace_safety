import React,{ useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";

import { PersonalDashboard } from '../../containers/pageListAsync';

import axios from 'axios';

import {
  SSO_URL,
  LOGIN_URL,
  SSO_CLIENT_ID,
  SSO_CLIENT_SECRET,
} from '../../utils/constants';
import api from '../../utils/axios';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  const getToken = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = 'VwWDGmthURHnOcaStEURr3Jmea3BsQ'||searchParams.get('code');
    if (code) {
      let data = JSON.stringify({
        grant_type: "authorization_code",
        client_id: "yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo",
        client_secret:
          "pLYnuvaKXGkdZLaHf6HtlM9QxS3QLVs2gnrOr6hxZJJgS5PWuPsnGKPTwQcahaJ6gjyNDJ2mpktlePjQkEScFd9V3CTzI0Zdo2Yr38LVwSDXHfH7YOi4oacYregPF5Wz",
        code: code,
      });

      let config = {
        method: "post",
        url: `${SSO_URL}/api/v1/user/auth/token/`,
        headers: {
          "Content-Type": "application/json",
          Cookie:
            "sessionid=g2zt7cjcpjkf2qabggfwe14yzliwjz2x; csrftoken=NcsO8L9eWK1dLfWRGQ10t2b86GzdD9vSwmzDwc77Cc4luBmQAZiYbvtfgp3X845H",
        },
        data: data,
      };
      console.log(config)
     await axios(config)
        .then(function(response) {
          console.log(response)
          localStorage.setItem("access_token", response.data.access_token);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
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
      <Switch>
        <Route path="/app" exact component={LandingCorporate} />
        <Route path="/landing-creative" exact component={LandingCreative} />
        <Route path="/" component={Application} />
        <Route path="/blog" component={ArticleNews} />
        <Route component={Auth} />
        <Route component={NotFound} />
      </Switch>
    </ThemeWrapper>
  );
}

export default App;
