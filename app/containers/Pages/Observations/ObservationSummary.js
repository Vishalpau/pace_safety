import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTime from "@material-ui/icons/AccessTime";
import Add from "@material-ui/icons/Add";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Edit from "@material-ui/icons/Edit";
import { PapperBlock } from "dan-components";
import React, { useEffect, useState,useReducer } from "react";
// Router
import { useHistory, useParams } from "react-router";
import AhaSummary from "../../../containers/Activity/Activity";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import { Comments } from "../../pageListAsync";
import ObservationCorrectiveAction from "./ObservationCorrectiveAction";
import ObservationCorrectiveActionView from "./ObservationCorrectiveActionView";
import ObservationInitialNotificationUpdate from "./ObservationInitialNotificationUpdate";
import ObservationInitialNotificationView from "./ObservationInitialNotificationView";

import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import { NavLink, useLocation } from "react-router-dom";


import obsIcon from "dan-images/obsIcon.png";
// import Paper from '@material-ui/core/Paper';

import Print from "@material-ui/icons/Print";
import History from "@material-ui/icons/History";
import Comment from "@material-ui/icons/Comment";
import Link from "@material-ui/core/Link";
import Acl from "../../../components/Error/acl";
import { checkACL } from "../../../utils/helper";
import { connect, useDispatch } from "react-redux";
import {
  APPCODE,
  SELF_API,
  SSO_URL,
  HEADER_AUTH,
  ACCOUNT_API_URL 
} from "../../../utils/constants";

import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
// import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  spacer: {
    padding: ".75rem 0",
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 14,
    width: "100%",
    textTransform: "none",
    fontFamily: "Montserrat-SemiBold !important",
    lineHeight: "18px",
    border: "1px solid #06425c",
  },
  observationSummaryBox: {
    display: "flex",
    gap: "1.5rem",
  },
  statusLabel: {
    fontSize: "14px",
    fontFamily: "Montserrat-Regular",
    "& svg": {
      color: "#06425C",
      //verticalAlign: 'sub',
    },
  },
}));

// Sidebar Links Helper Function

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

const ObservationSummary = () => {
   const dispatch = useDispatch();
  const [
    observationInitialNotification,
    setObservationInitialNotification,
  ] = useState(true);
  const [
    observationCorrectiveAction,
    setObservationCorrectiveAction,
  ] = useState(false);
  const [
    observationCorrectiveActionView,
    setObservationCorrectiveActionView,
  ] = useState(false);
  const [comment, setComment] = useState(false);
  const [activity, setActivity] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const [commentPayload, setCommentPayload] = useState({})
  // let commentPayload;
  // const [observationCloseOut, setObservationCloseOut] = useState(false);
  // const [observationReview, setObservationReview] = useState(false);

  const [rerender, setRerender] = useState(false);




  const [
    observationInitialNotificationUpdate,
    setObservationInitialNotificationUpdate,
  ] = useState(true);

  const handelObservationInitialNotificationUpdate = (e) => {
    setObservationInitialNotification(true);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveAction(false);
    setComment(false);
    setActivity(false);
    history.push(`/app/icare/details/${id}#modify`);
  };

  const handleActionUpdate = (e) => {
    setObservationCorrectiveAction(true);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveActionView(false);
    setObservationInitialNotification(false);
    setComment(false);
    setActivity(false);
    history.push(`/app/icare/details/${id}#action-taking`);
  };

  // const handleComments = (e) => {
  //   setObservationInitialNotification(false);
  //   setObservationInitialNotificationUpdate(false);
  //   setObservationCorrectiveAction(false);
  //   setComment(true);
  //   setActivity(false);
  //   // history.push(`/app/icare/comments/${id}`)
  // };

  // const handleActivity = (e) => {
  //   setObservationInitialNotification(false);
  //   setObservationInitialNotificationUpdate(false);
  //   setObservationCorrectiveAction(false);
  //   setComment(false);
  //   setActivity(true);
  //   history.push(`/app/icare/details/${id}#activity`);
  // };

  const [initialData, setInitialData] = useState({});
  if (id) {
    localStorage.setItem("fkobservationId", id);
  }

  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18T21:11:54")
  // );

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const handleActionButtonClick = (action) => {
    setObservationInitialNotification(false);
    setObservationCorrectiveAction(true);
    setComment(false);
    setActivity(false);
    setObservationInitialNotificationUpdate(true);
    if (localStorage.getItem("action") === "Done") {
      setObservationCorrectiveActionView(true);
      history.push(`/app/icare/details/${id}`);
    } else {
      setObservationCorrectiveActionView(false);
      history.push(`/app/icare/details/${id}#action-taking`);
    }
  };

  const fillPayload = (payload) => {
    setCommentPayload({
      fkCompanyId: payload.fkCompanyId,
      fkProjectId: payload.fkProjectId,
      commentContext: "observations",
      contextReferenceIds: payload.id,
      commentTags: "",
      comment: "",
      parent: 0,
      thanksFlag: 0,
      status: "Active",
      createdBy: payload.createdBy,
    })
  }

  // const handlePrintPush = async () => {
  //   //console.log("Ashutosh")
  //   history.push(`/app/pages/general-icare-prints/${id}`);
  // };

  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    if (res.data.status_code == 400) {

    } else {
      const result = res.data.data.results;
      console.log(result)
      await setInitialData(result);
    }
  };
  if (localStorage.getItem("update") === "Pending") {
    setObservationInitialNotification(true);
    setObservationInitialNotificationUpdate(true);
    setObservationCorrectiveAction(false);
    localStorage.removeItem("update");
  }

  if (localStorage.getItem("update") === "Done") {
    setObservationInitialNotification(true);
    setObservationInitialNotificationUpdate(true);
    setObservationCorrectiveAction(false);
    localStorage.removeItem("update");
  }

  if (
    localStorage.getItem("updateAction") === "Done" ||
    localStorage.getItem("ActionUpdate") === "Pending"
  ) {
    setObservationCorrectiveActionView(true);
    localStorage.removeItem("updateAction");
    localStorage.removeItem("ActionUpdate");
  }

  // const selectValues = [1, 2, 3, 4];
  // const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const [isFlaggedUpdate,setIsFlaggedUpdate] = useState(false)
  const updateFlag = () =>{
    setIsFlaggedUpdate(!isFlaggedUpdate)
  }

 const fetchPhaseData = async (projects) => {
  
    const data = [];
    for (let i = 0; i < projects.length; i++) {
      if (
        projects[i].breakdown &&
        projects[i].breakdown.length > 0 &&
        projects[i].breakdown[0].structure &&
        projects[i].breakdown[0].structure[0].url
      ) {
        
        const config = {
          method: "get",
          url: `${SSO_URL}/${projects[i].breakdown[0].structure[0].url}`,
          headers: HEADER_AUTH,
        };
        const res = await axios(config);
        if (res && res.status && res.status === 200) {
          projects[i].firstBreakdown = res.data.data.results;
          data.push(projects[i]);
        } else {
          projects[i].firstBreakdown = [];
          data.push(projects[i]);
        }
      } else {
        projects[i].firstBreakdown = [];
        data.push(projects[i]);
      }
    }
    return data;
  };
 
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search])

  let paramCompanyId = query.get("company")
  let paramProjectId = query.get("project")

  const getSubscriptions = async (paramCompanyId) => {
    const companyId = paramCompanyId 
    if (companyId) {
      try {
        const data = await api
          .get(`${SELF_API}${companyId}/`)
          .then((res) => {
            const rolesApi = res.data.data.results.data.companies[0].subscriptions.filter(
              (sub) => sub.appCode.toLowerCase() == APPCODE
            )[0].roles[0].aclUrl;
            api.get(`${ACCOUNT_API_URL.slice(0, -1)}${rolesApi}`).then((d) => {
              localStorage.setItem(
                "app_acl",
                JSON.stringify(d.data.data.results.permissions[0])
              );
            });
            return res.data.data.results.data.companies[0].subscriptions;
          })

          .catch((error) => {
            console.log(error);
          });
        // redirectionAccount()

        const modules = data.map((subscription) => subscription.modules);
        let modulesState = [];
        let temp = [];
        modules.map((module) => {
          modulesState = [...modulesState];
          temp = [...temp];
          if (module.length > 0) {
            module.map((mod) => {
              modulesState.push(mod);
              // this.setState({modules: module})
              if (mod.subscriptionStatus == "active") {
                temp.push(mod.moduleCode);
                // this.setState({ codes: temp })
                return temp;
              }
            });
            // this.setState({ codes: codes })
          }
        });
        dispatch(appAcl(d.data.data.results.permissions[0]));
        // let mod = ['incidents', 'knowledge', 'observations', 'actions', 'controltower', 'HSE', 'compliances', 'ProjectInfo', 'assessments', 'permits']
        //setCode(temp);
       // await getModules(apps);
      } catch (error) {}
    }
    // getAllPickList()
  };

  const handleCompanyName = async (company, companyId, name) => {
    const hosting = company.subscriptions.filter(
        (subscription) => subscription.appCode.toLowerCase() == APPCODE
      )[0].hostings[0].apiDomain;
    const config = {
      method: "get",
      url: `${hosting}/api/v1/core/companies/select/${companyId}/`,
      headers: HEADER_AUTH,
    };
    axios(config);
    const companeyDetails = {};
    companeyDetails.fkCompanyId = companyId;
    await getSubscriptions(companyId);
    companeyDetails.fkCompanyName = name;
    dispatch(company(companeyDetails));
    //setCompanyId(companyId);
    localStorage.setItem("company", JSON.stringify(companeyDetails));
    
  }; 

  const handleNotificationClick = async (paramCompanyId,paramProjectId) => {
    //select company
    const companies = JSON.parse(localStorage.getItem('userDetails')).companies
    const selectedCompany = companies.filter(company => company.companyId == paramCompanyId )[0]
    const companeyData = {
        fkCompanyId: selectedCompany.companyId,
        fkCompanyName: selectedCompany.companyName,
      };
      localStorage.setItem("company", JSON.stringify(companeyData)); 
      handleCompanyName(selectedCompany,paramCompanyId,selectedCompany.companyName)

      //select project
    let projects = await fetchPhaseData(selectedCompany.projects)
    const selectedProject = projects.filter(project => project.projectId == paramProjectId )[0]
    localStorage.setItem("projectName",JSON.stringify({projectName:selectedProject}));
      
  
      //fetch observations
      const res = await api.get(`/api/v1/observations/${id}/`);
      if(res.status === 200){
        fetchInitialiObservation();
      }
      if (res.data.status_code == 400) {

      } else {
        const result = res.data.data.results;
        await setInitialData(result);
      }
      
      dispatch(company(companeyData));
      dispatch(projectName(selectedProject));
  } 

const [reloadSummary,setReloadSummary] = useState(false)

const shouldReloadSummary = () => {
  setReloadSummary(!reloadSummary)
}
  useEffect(() => {
    if (id && !paramCompanyId && !paramProjectId) {
      fetchInitialiObservation();
    }
    if(id && paramCompanyId && paramProjectId ){
      handleNotificationClick(paramCompanyId,paramProjectId)
    }
    let fetch = () => {
      if (id && paramCompanyId && paramProjectId ) {
      fetchInitialiObservation();
    }}
    window.addEventListener('load',fetch)
    return () => document.removeEventListener('load', fetch);

  }, [reloadSummary]);
  useEffect(() => {
    console.log(initialData.flag,initialData.flagReason,"initial")
  }, [initialData]);
  return (
    <Acl
      module="safety"
      action="view_observations"
      html={
        <>
          {/* {isLoading ? ( */}
          <CustomPapperBlock
            title={`iCare Number: ${initialData.observationNumber ? initialData.observationNumber : ""
              }`}
            // icon="ion-md-list-box"
            variant="h5"
            icon="customDropdownPageIcon iCarePageIcon"
            whiteBg
          >
            <Grid container spacing={3}>
              <Grid item md={9} xs={12}>
                <Grid container spacing={3}>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30.6"
                        height="30.168"
                        viewBox="0 0 39.6 30.168"
                      >
                        <path
                          id="workflow"
                          d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z"
                          transform="translate(0.026)"
                          fill="#06425c"
                        />
                      </svg>{" "}
                      Status & stage
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        {/* <div className={classes.observationSummaryBox}>
                      <div className={classes.item}> */}
                        <Grid
                          item
                          md={12}
                          sm={12}
                          xs={12}
                          className={classes.item}
                        >
                          <ul className="SummaryTabList">
                            <li>
                              <Button
                                color={
                                  observationInitialNotification === true
                                    ? "secondary"
                                    : "primary"
                                }
                                variant="contained"
                                size="small"
                                // endIcon={<CheckCircle />}
                                className={classes.statusButton}
                                onClick={(e) => {
                                  setObservationInitialNotification(true);
                                  setObservationCorrectiveAction(false);
                                  setObservationInitialNotificationUpdate(true);
                                  setComment(false);
                                  setActivity(false);
                                  history.push(`/app/icare/details/${id}`);
                                  // setObservationReview(false);
                                  // setObservationCloseOut(false);
                                }}
                              >
                                iCare
                              </Button>
                              <Typography
                                className={classes.statusLabel}
                                variant="caption"
                                display="block"
                                align="center"
                              >
                                Done <CheckCircle />
                              </Typography>
                              {/* </div> */}
                            </li>
                            <li>
                              {/* <div className={classes.item}> */}
                              <Button
                                color={
                                  observationCorrectiveAction === true
                                    ? "secondary"
                                    : "primary"
                                }
                                variant={
                                  localStorage.getItem("action") === "Done"
                                    ? "contained"
                                    : "outlined"
                                }
                                size="small"
                                className={classes.statusButton}
                                onClick={(e) => {
                                  handleActionButtonClick(e);
                                }}
                              >
                                Action Tracking
                              </Button>
                              <Typography
                                className={classes.statusLabel}
                                variant="caption"
                                display="block"
                                align="center"
                              >
                                {localStorage.getItem("action") === "Done"
                                  ? "Done"
                                  : ""}{" "}
                                {localStorage.getItem("action") === "Done" ? (
                                  <CheckCircle />
                                ) : (
                                  <AccessTime />
                                )}
                              </Typography>
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  {/* <Box marginTop={4}> */}
                  <Grid item xs={12} md={12}>
                    {/* summary and part */}
                    <>
                      {(() => {
                        if (comment === true) {
                          return (
                            <Comments
                              commentContext="iCare"
                              id={localStorage.getItem("fkobservationId")}
                            />
                          );
                        } else if (activity === true) {
                          return <AhaSummary />;
                        } else if (
                          observationInitialNotification === true &&
                          observationCorrectiveAction === false
                        ) {
                          return observationInitialNotificationUpdate ===
                            true ? (
                              <>
                            {initialData.observationNumber && <ObservationInitialNotificationView fillPayload = {(commentPayload) => fillPayload(commentPayload)} />}
                            </>
                          ) : (
                            <ObservationInitialNotificationUpdate reloadSummary={shouldReloadSummary} />
                          );
                        } else if (
                          observationCorrectiveAction === true ||
                          observationInitialNotification === false
                        ) {
                          return observationCorrectiveActionView === true ? (
                            <ObservationCorrectiveActionView />
                          ) : (
                            <ObservationCorrectiveAction />
                          );
                        }

                        // if (observationReview == true) {
                        //   return <ObservationReview />;
                        // }
                        // if (observationCloseOut == true) {
                        //   return <ObservationCloseOut />;
                        // }
                      })()}
                    </>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={3}>
                {/* <Paper> */}
                <div className="quickActionSection">
                  <Typography variant="h5" className="rightSectiondetail">
                    Quick Actions
                  </Typography>
                  <List component="nav" aria-label="main mailbox folders">
                    {!checkACL("safety-observations", "change_observations") ? (
                      <ListItem button>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <Link
                          variant="subtitle"
                          onClick={(e) =>
                            handelObservationInitialNotificationUpdate(e)
                          }
                          style={{
                            color: "#c0c0c0",
                            cursor: "not-allowed",
                          }}
                        >
                          <ListItemText primary="Update iCare" />
                        </Link>
                      </ListItem>
                    ) : (
                      <ListItem button>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <Link
                          variant="subtitle"
                          onClick={(e) =>
                            handelObservationInitialNotificationUpdate(e)
                          }
                        >
                          <ListItemText primary="Update iCare" />
                        </Link>
                      </ListItem>
                    )}
                    {/* <ListItemLink
                    // href={`/app/pages/observation-initial-notification`}
                    //onClick={() => handlePushUpdateInitialNotification()}
                    onClick={(e) => handelObservationInitialNotificationUpdate(e)}
                  >
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Update Observation" />
                  </ListItemLink> */}

                    {localStorage.getItem("action") === "Done" ? (
                      <ListItem button>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <Link
                          variant="subtitle"
                          onClick={(e) => handleActionUpdate(e)}
                        >
                          <ListItemText primary="Update Actions" />
                        </Link>
                      </ListItem>
                    ) : (
                      <ListItem button>
                        <ListItemIcon>
                          <Add />
                        </ListItemIcon>
                        <Link
                          variant="subtitle"
                          onClick={(e) => handleActionUpdate(e)}
                        >
                          <ListItemText primary="Add Actions" />
                        </Link>
                      </ListItem>
                    )}

                    {/* <ListItem button>
                  <ListItemIcon>
                  <Comment />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    onClick={(e) => handleComments(e)}
                  >
                    <ListItemText primary="Comments" />
                  </Link>
                </ListItem> */}

                    <ListItem>
                      <ListItemIcon>
                        <Comment />
                      </ListItemIcon>
                      <NavLink
                        className="quickActionSectionLink"
                        variant="subtitle"
                        name="Comments"
                        // disabled="true"
                        to={{
                          pathname: `/app/comments/observations/${id}`,
                          // pathname: history.location.pathname,
                          state: commentPayload
                        }}
                      >
                        Comments
                      </NavLink>
                    </ListItem>

                    {initialData.flag > 0 ? <Tooltip title={initialData.flagReason}>
                      <ListItem>
                        <ListItemIcon>
                          <EmojiFlagsIcon />
                        </ListItemIcon>
                          <Typography  className="quickActionSectionLink" style={{fontSize:"14px"}}>
                            Flag
                          </Typography>
                      </ListItem>
                    </Tooltip> : ""}

                    {/* <ListItem button>
                  <ListItemIcon>
                  <History />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    onClick={(e) => handleActivity(e)}
                  >
                    <ListItemText primary="Activity History" />
                  </Link>
                </ListItem> */}

                    {/* <Divider /> */}

                    {/* <ListItem button>
                  <ListItemIcon>
                  <Print />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    onClick={(e) => handlePrintPush(e)}
                  >
                    <ListItemText primary="Print" />
                  </Link>
                </ListItem> */}
                  </List>
                </div>
              </Grid>
            </Grid>
          </CustomPapperBlock>
        </>
      }
    />
  );
};

export default ObservationSummary;
