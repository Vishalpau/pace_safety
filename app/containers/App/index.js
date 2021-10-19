import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "containers/Pages/Standalone/NotFoundDedicated";
import Auth from "./Auth";
import Application from "./Application";
import LandingCorporate from "./Landing";
import LandingCreative from "./LandingCreative";
import ArticleNews from "./ArticleNews";
import ThemeWrapper from "./ThemeWrapper";
import { Offline, Online } from "react-detect-offline";

// import { PersonalDashboard } from "../../containers/pageListAsync";

// redux
import { useDispatch } from "react-redux";
import { projectName, company } from "../../redux/actions/initialDetails";

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
  getSSOUrl
} from "../../utils/constants";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


function App() {
  const [status, setStatus] = useState(0);
  const dispatch = useDispatch();

  const userDetails = async (proId, compId, access_token) => {
    // window.location.href = `/${tagetPage}`
    try {
      if (compId) {
        let config = {
          method: "get",
          url: `${SELF_API}`,
          headers: { Authorization: `Bearer ${access_token}` },
        };
        await axios(config)
          .then(function (response) {
            if (response.status === 200) {

              localStorage.setItem('userDetails', JSON.stringify(response.data.data.results.data))
              setStatus(response.status)
              if (compId) {
                let companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);

                let companeyData = { fkCompanyId: companies[0].companyId, fkCompanyName: companies[0].companyName }
                localStorage.setItem('company', JSON.stringify(companeyData))

                dispatch(company(companeyData))
              }
              if (proId) {
                let companies = response.data.data.results.data.companies.filter(item => item.companyId == compId);
                let project = companies[0].projects.filter(item => item.projectId == proId)

                localStorage.setItem("projectName", JSON.stringify(project[0]))
                dispatch(projectName(project[0]))
              }


            }
          })
          .catch(function (error) {
          });
      }
    } catch (error) {
    }
  }
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
    console.log(url)

    let comId = 0
    let proId = 0
    let redback = ''
    let tarPage = ''
    let tarId = 0
    let jsonCode = ""
    if (window.location.search !== "") {
      // let state = localStorage.getItem('direct_landing')
      var search = location.search.substring(1);
      let json = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      console.log({ jsonData: json })
      let state = json.state
      jsonCode = json.code
      if (state != null) {
        let internal = state.split("{'")[1].split("'}")[0].split("', '")
        let newArr = {}
        internal.map(i => {
          newArr[i.split("':")[0]] = i.split(": '")[1]
        })
        state = newArr
        console.log({ array: state })
        comId = state.companyId
        proId = state.projectId
        redback = state.redirect_back
        tarPage = state.targetPage
        tarId = state.targetId
      }
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code") || jsonCode;
    const tagetPage = searchParams.get("targetPage") || tarPage;
    // const targetId = searchParams.get("targetId");
    const companyId = searchParams.get("companyId") || comId;
    const projectId = searchParams.get('projectId') || proId

    //  if(companyId !==0 && projectId !== 0 && tagetPage!== undefined){
    //   localStorage.setItem('loading',JSON.stringify({tagetPage:tagetPage,companyId:companyId,projectId:projectId}))
    //   let targetPage = tagetPage.trim()
    //   window.location.href = targetPage
    //   userDetails(companyId,projectId,tagetPage)

    //  }
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
            userDetails(companyId, projectId, response.data.access_token)
            localStorage.setItem("access_token", response.data.access_token);
            if (!tagetPage) {
              window.location.href = '/'
            } else {
              window.location.href = `/${tagetPage}`
            }
          }
        })
        .catch(function (error) {
          console.log(error)
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
            <Route path="/:?code" component={Application} />
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