import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";
import { useEffect } from "react";
import { PersonalDashboard } from "../../containers/pageListAsync";

import axios from "axios";

import { SSO_URL, LOGIN_URL } from "../../utils/constants";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    var axios = require("axios");
    var data = JSON.stringify({
      grant_type: "authorization_code",
      client_id: "DEsDngx9KAeuoJzhmR3wMuhC78NK4YUcXMOzNKt3",
      client_secret:
        "LVVbYw5RmKOZCDTC1CV1tQKtN4DGso0FoClAz22GRhV81Bd7egLZ2qiNoXGmqjarCDUEoXiO7F8Q27On0aK5gGosIyCG0EhnRXz3mD88SkKrcf3F3BA5Ny84NkX9MehF",
      code: code,
    });

    var config = {
      method: "post",
      url: `${SSO_URL}/api/v1/user/auth/token/`,
      headers: {
        "Content-Type": "application/json",
        Cookie:
          "sessionid=g2zt7cjcpjkf2qabggfwe14yzliwjz2x; csrftoken=NcsO8L9eWK1dLfWRGQ10t2b86GzdD9vSwmzDwc77Cc4luBmQAZiYbvtfgp3X845H",
      },
      data: data,
    };

    axios(config)
      .then(function(response) {
        console.log(response.data.access_token);
        localStorage.setItem("access_token", response.data.access_token);
      })
      .catch(function(error) {
        // window.location.href = LOGIN_URL;
        console.log(error);
      });
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
