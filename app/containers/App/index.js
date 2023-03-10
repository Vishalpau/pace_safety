import React, { lazy, Suspense, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
// import Application from "";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";
import { Offline, Online } from "react-detect-offline";
import Loading from 'dan-components/Loading';

// redux
import { useDispatch } from "react-redux";
import { projectName, company } from "../../redux/actions/initialDetails";

import axios from "axios";

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
  getSSOUrl
} from "../../utils/constants";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const Application = lazy(() => import(`./Application`))
function App() {
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();
  const userLogin = () => {
    try {
      if (access_token) {
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
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    userLogin();
  }, [status])

  const getToken = async () => {
    const url = window.location
    let comId = 0
    let proId = 0
    let redback = ''
    let tarPage = ''
    let tarId = 0
    let jsonCode = ""
    let tarProjectStruct;

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || jsonCode;

    // const tagetPage = searchParams.get("targetPage") || tarPage;
    // // const targetId = searchParams.get("targetId");
    // const companyId = searchParams.get("companyId") || comId;
    // const projectId = searchParams.get('projectId') || proId
    let data = {}
    if (code) {
      localStorage.clear()
      if (window.location.search !== "") {
        // let state = localStorage.getItem('direct_landing')
        var search = location.search.substring(1);
        let json = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        let state = json.state
        if (state) {
          console.log(state, 'stateeeeeeeeeee');
          jsonCode = decodeURIComponent(state.replace(/\+/g, '%20'));
          let newArr = (0, eval)('(' + jsonCode + ')')
          state = newArr;
          comId = state.companyId;
          proId = state.projectId;
          redback = state.redirect_back;
          tarPage = state.targetPage.trim();
          tarId = state.targetId;
          tarProjectStruct = state.projectStructure
          console.log(tarProjectStruct, 'tarProjectStruct');
          if (comId !== "") {
            localStorage.setItem("direct_loading", JSON.stringify({ comId: comId, proId: proId, tarId: tarId, tarPage: tarPage, tarProjectStruct: tarProjectStruct }))
          }
        }
      }
      if (window.location.hostname === 'localhost') {
        data = JSON.stringify({
          grant_type: "authorization_code",
          client_id: `${LOCAL_SSO_CLIENT_ID}`,
          client_secret: `${LOCAL_SSO_CLIENT_SECRET}`,
          code: code,
        });
      }
      else {
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

      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            localStorage.setItem("access_token", response.data.access_token);
            window.location.href = "/"
          }
        })
        .catch(function (error) {
          console.log(error)
        });
    }

    else {
      if (localStorage.getItem('access_token') === null) {
        let laststate = window.location.href.replace(window.location.protocol + '//' + window.location.host, '')
        if (laststate != '')
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

  return (<Suspense fallback={<Loading />}>
    <ThemeWrapper>
      {/* <Online> */}
      {localStorage.getItem("access_token") !== null ? (
        <Switch>
          <Route path="/app" exact component={LandingCorporate} />
          <Route path="/landing-creative" exact component={LandingCreative} />
          <Route path="/" component={Application} />
          <Route path="/blog" component={ArticleNews} />
          <Route component={Auth} />
          <Route component={NotFound} />
        </Switch>
      ) : <Loading />}
      {/* </Online>
        <Offline>Turn on internet</Offline>  */}
    </ThemeWrapper>
  </Suspense>
  );


}

export default App;