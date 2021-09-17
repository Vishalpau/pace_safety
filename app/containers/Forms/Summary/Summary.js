import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import { Col, Row } from "react-grid-system";
// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import api from "../../../utils/axios";


import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import IncidentDetails from "../InitialNotification/IncidentDetails";
import IncidentDetailsSummary from "../../SummaryDetails/InitialNotification";
import InvestigationSummary from "../../SummaryDetails/Investigation";
import EvidenceSummary from "../../SummaryDetails/Evidence";
import RootCauseAnalysisSummary from "../../SummaryDetails/RootCauseAndAnalysis";
import LessionLearnSummary from "../../SummaryDetails/LessionLearn";
import {
  InititlaNotificationStatus,
  InvestigationStatus,
  EvidenceStatus,
  RootCauseAnalysisStatus,
  LessionLearnedStatus
} from "../../../utils/FormStatus";

// redux connect
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { tabViewMode } from "../../../redux/actions/initialDetails";
import CloseOut from "../../SummaryDetails/CloseOut";
import { Comments } from "../../pageListAsync";
import ActivityHistory from "../../../containers/Activity/Activity";
import { ACCOUNT_API_URL,SELF_API } from "../../../utils/constants";

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
    whiteSpace: "nowrap",
    borderRadius: 4,
    fontSize: 12,
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Summary = (props) => {
  const [incidents, setIncidents] = useState([]);
  const [initialNotification, setInitialNotification] = useState(false);
  const [investigationOverview, setInvestigationOverview] = useState({});
  const [investigation, setInvestigation] = useState(false);
  const [evidencesData, setEvidencesData] = useState({});
  const [evidence, setEvidence] = useState(false);
  const [paceCauseData, setPaceCauseData] = useState({});
  const [rootCausesData, setRootCausesData] = useState({});
  const [whyData, setWhyData] = useState({});
  const [rootcauseanalysis, setRootCauseAnalysis] = useState(false);
  const [lessionlearnData, setLessionLearnData] = useState({});
  const [lessionlearn, setLessionlearn] = useState(false);
  const [closeout, setCloseout] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [initialNoticeficationStatus, setInitialNotificationStatus] = useState(
    false
  );
  const rootCauseStatus = useRef(false);
  const rcaRecommendedValue = useRef("");

  const CLOSE_OUT_MESSAGE = "Incident is closed out. can't be modified! "

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [isComments, setIsComments] = useState(false);
  const [isActivityHistory, setActivityHistory] = useState(false)
  const [permissionListData, setPermissionListData] = useState([])

  const [formStatus, setFormStatus] = useState({
    initialNotificationCheck: "",
    investigationCheck: "",
    evidenceCheck: "",
    rootCauseCheck: "",
    lessionLearntCheck: ""
  })

  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  if (id) {
    localStorage.setItem("fkincidentId", id);
  }

  const fetchPermission = async()=>{
    const url = JSON.parse(localStorage.getItem('userDetails')).companies
    // const res = await api.get(`${ACCOUNT_API_URL}`)
  }

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${id}/`);
    await setIncidents(allIncidents.data.data.results);
    if (allIncidents.data.data.results.closeDate) {
      setCloseout(true)
    }

  };
  const fetchReportData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${id}/reports/`);
    if (allIncidents.data.data.results.length > 0) {
      await setInitialNotificationStatus(true);
    }
  };

  const fetchInvestigationData = async () => {
    let res = await api.get(`/api/v1/incidents/${id}/investigations/`);
    let result = res.data.data.results[0];
    await setInvestigationOverview(result);
  };

  const fetchEvidenceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/activities/`);
    const result = allEvidence.data.data.results[24];
    await setEvidencesData(result);
  };

  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    const result = res.data.data.results[0];
    await setLessionLearnData(result);
  };

  const handelRcaValue = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    let previousData = await api.get(`/api/v1/incidents/${incidentId}/causeanalysis/`);


    let rcaRecommended = previousData.data.data.results[0].rcaRecommended
    rcaRecommendedValue.current = rcaRecommended


  }

  const rootCauseAnalysisCheck = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");

    let paceCause = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
    let paceCauseData = paceCause.data.data.results[0];
    await setPaceCauseData(paceCauseData);

    let rootCause = await api.get(`/api/v1/incidents/${incidentId}/rootcauses/`);
    let rootCauseData = rootCause.data.data.results[0];
    await setRootCausesData(rootCauseData);

    let whyAnalysis = await api.get(`/api/v1/incidents/${incidentId}/fivewhy/`);
    if (whyAnalysis.status === 200) {
      await setIsLoading(true)
    }
    let whyAnalysisData = whyAnalysis.data.data.results[0];
    await setWhyData(whyAnalysisData);

  };



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const classes = useStyles();

  const CheckFormStatus = async () => {
    setFormStatus({
      initialNotificationCheck: await InititlaNotificationStatus(),
      investigationCheck: await InvestigationStatus(),
      evidenceCheck: await EvidenceStatus(),
      rootCauseCheck: await RootCauseAnalysisStatus(),
      lessionLearntCheck: await LessionLearnedStatus()
    })
  }

  const handelNaviagte = (value) => {
    history.push(value)
  }
  const handleInitialNotificationView = () => {
    if (initialNoticeficationStatus === false) {
      handelNaviagte(`/incident/${id}/modify/`)
    } else {
      setInitialNotification(true);
      setInvestigation(false);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
      let viewMode = {
        initialNotification: true, investigation: false, evidence: false, rootcauseanalysis: false, lessionlearn: false
      }
      dispatch(tabViewMode(viewMode))
    }
  }

  const handelInvestigationView = () => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stage Initial Notification")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      handelNaviagte(`/app/incident-management/registration/investigation/investigation-overview/`)
    } else {
      setInitialNotification(false);
      setInvestigation(true);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
      let viewMode = {
        initialNotification: false, investigation: true, evidence: false, rootcauseanalysis: false, lessionlearn: false
      }
      dispatch(tabViewMode(viewMode))
    }
  }

  const handelEvidenceView = (e) => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification & Investigation")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stage Investigation")
      setMessageType("warning")
    } else if (evidencesData == undefined) {
      handelNaviagte(`/app/incident-management/registration/evidence/evidence/${id}`)
    } else {
      setInitialNotification(false);
      setInvestigation(false);
      setEvidence(true);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
      let viewMode = {
        initialNotification: false, investigation: false, evidence: true, rootcauseanalysis: false, lessionlearn: false

      }
      dispatch(tabViewMode(viewMode))
    }
  }

  const handelRootCauseAnalysisView = () => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation & Evidence")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation & Evidence")
      setMessageType("warning")
    } else if (evidencesData == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stage Evidence")
      setMessageType("warning")
    } else if (rcaRecommendedValue.current == "PACE cause analysis") {
      if (paceCauseData == undefined) {
        handelNaviagte("/app/incident-management/registration/root-cause-analysis/details/")
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        dispatch(tabViewMode(viewMode))
      }
    } else if (rcaRecommendedValue.current == "Cause analysis") {
      if (rootCausesData == undefined) {
        handelNaviagte("/app/incident-management/registration/root-cause-analysis/details/")
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        dispatch(tabViewMode(viewMode))
      }
    } else if (rcaRecommendedValue.current == "Five why analysis") {
      if (whyData == undefined) {
        handelNaviagte("/app/incident-management/registration/root-cause-analysis/details/")
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        dispatch(tabViewMode(viewMode))
      }
    } else {
      handelNaviagte("/app/incident-management/registration/root-cause-analysis/details/")
    }
  }
  const handleCloseOutOverView = async => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation, Evidence & Root and Cause Analysis")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation, Evidence & Root and Cause Analysis")
      setMessageType("warning")
    } else if (evidencesData == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Evidence & Root and Cause Analysis")
      setMessageType("warning")

    } else if (!paceCauseData && !rootCausesData && !whyData) {

      setOpen(true);
      setMessage("Please complete the previous pending stage Root and Cause Analysis")
      setMessageType("warning")
    } else if (!closeout) {
      handelNaviagte(`/incident/${id}/close-out/new/`)
    }
    else {
      let viewMode = {
        initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: false, lessionlearn: false,
        closeout: true

      }
      dispatch(tabViewMode(viewMode))
      setInitialNotification(false);
      setInvestigation(false);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
      setCloseout(true)
    }
  }

  const handelLessionLearnedView = () => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation, Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation, Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    } else if (evidencesData == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    } else if (!paceCauseData && !rootCausesData && !whyData) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Root Cause Analysis & Close Out")
      setMessageType("warning")
    }
    else if (!closeout) {
      setOpen(true);
      setMessage("Please complete the previous pending stage(s) close out")
      setMessageType("warning")
    } else if (!lessionlearnData) {
      handelNaviagte(`/incident/${id}/lesson-learnt/new/`)
    }
    else {
      setInitialNotification(false);
      setInvestigation(false);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(true);
      let viewMode = {
        initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: false, lessionlearn: true

      }
      dispatch(tabViewMode(viewMode))
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpenwarning(false)
      return;
    }
    setOpen(false);
  };

  const modifyInitialDetails = () => {
    if (closeout) {
      setOpen(true);
      setMessage(CLOSE_OUT_MESSAGE)
      setMessageType("warning")
    } else {
      handelNaviagte(`/incident/${id}/modify/`)
    }
  }

  const modifyInvestigation = (fkid) => {
    if (closeout) {

      setOpen(true);
      setMessage(CLOSE_OUT_MESSAGE)
      setMessageType("warning")
    }

    else if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stage Initial Notification")
      setMessageType("warning")
    }
    else {

      if (fkid) {
        handelNaviagte(`/app/incident-management/registration/investigation/investigation-overview/${fkid}`)
      } else {
        handelNaviagte(`/app/incident-management/registration/investigation/investigation-overview/`)
      }

    }
  }
  const modifyEvidence = (fkid) => {
    if (closeout) {

      setOpen(true);
      setMessage(CLOSE_OUT_MESSAGE)
      setMessageType("warning")
    }

    else if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification & Investigation")
      setMessageType("warning")
    }
    else if (investigationOverview == undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation")
      setMessageType("warning")
    }
    else {
      handelNaviagte(`/app/incident-management/registration/evidence/evidence/${id}`)
    }
  }
  const modifyRootCauseAnalysis = () => {
    if (closeout) {

      setOpen(true);
      setMessage(CLOSE_OUT_MESSAGE)
      setMessageType("warning")
    }
    else if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation & Evidence")
      setMessageType("warning")
    }
    else if (investigationOverview === undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation and Evidence")
      setMessageType("warning")
    } else if (evidencesData === undefined) {

      setOpen(true);
      setMessage("Please complete the previous pending stage Evidence")
      setMessageType("warning")
    }
    else {
      handelNaviagte(`/app/incident-management/registration/root-cause-analysis/details/${id}`)
    }
  }
  const modifyLessonLearn = () => {
    if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation, Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    }
    else if (investigationOverview === undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation, Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    } else if (evidencesData === undefined) {

      setOpen(true);
      setMessage("Please complete the previous pending stages Evidence, Root Cause Analysis & Close Out")
      setMessageType("warning")
    } else if (!paceCauseData && !rootCausesData && !whyData) {

      setOpen(true);
      setMessage("Please complete the previous pending stages  Root Cause Analysis & Close Out")
      setMessageType("warning")
    }
    else if (!closeout) {

      setOpen(true);
      setMessage("Please complete the previous pending stage Close Out")
      setMessageType("warning")
    }
    else {
      handelNaviagte(`/incident/${id}/lesson-learnt/new/`)
    }
  }
  const modifyCloseout = () => {
    if (closeout) {

      setOpen(true);
      setMessage(CLOSE_OUT_MESSAGE)
      setMessageType("warning")
    }
    else if (initialNoticeficationStatus === false) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Initial Notification, Investigation, Evidence and Root Cause & Analysis")
      setMessageType("warning")
    }
    else if (investigationOverview === undefined) {
      setOpen(true);
      setMessage("Please complete the previous pending stages Investigation, Evidence and Root Cause & Analysis")
      setMessageType("warning")
    } else if (evidencesData === undefined) {

      setOpen(true);
      setMessage("Please complete the previous pending stages Evidence and Root Cause & Analysis")
      setMessageType("warning")
    } else if (!paceCauseData && !rootCausesData && !whyData) {

      setOpen(true);
      setMessage("Please complete the previous pending stage  Root Cause & Analysis")
      setMessageType("warning")
    }
    else {
      handelNaviagte(`/incident/${id}/close-out/new/`)
    }
  }
  const handleActivityHistory = () => {
    setActivityHistory(true);
    setIsComments(false);
    setInitialNotification(false);
    setInvestigation(false);
    setEvidence(false);
    setRootCauseAnalysis(false);
    setLessionlearn(false);
  }
  const handleComments = () => {
    setActivityHistory(false);
    setIsComments(true);
    setInitialNotification(false);
    setInvestigation(false);
    setEvidence(false);
    setRootCauseAnalysis(false);
    setLessionlearn(false);

  }
  const fetchPermissionData = async()=>{
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const res = await api.get(`${SELF_API}${fkCompanyId}/`)
     
    let roles = res.data.data.results.data.companies[0].subscriptions.filter(item=>item.appId ===1)

    const fetchPermissiondata = await api.get(`${ACCOUNT_API_URL}${roles[0].roles[0].aclUrl.substring(1)}`)
    console.log({permission:fetchPermissiondata.data.data.results.permissions[0].incident})
    setPermissionListData(fetchPermissiondata.data.data.results.permissions[0].incident)

  }
  useEffect(() => {
    fetchIncidentData();
    fetchInvestigationData();
    fetchEvidenceData();
    fetchLessonLerned();
    rootCauseAnalysisCheck();
    fetchReportData();
    CheckFormStatus();
    handelRcaValue();
    fetchPermissionData();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <>
      {isLoading ? (
        <PapperBlock
          title={`Incident Number: ${incidents.incidentNumber}`}
          icon="ion-md-list-box"
        >
          {isComments || isActivityHistory?null:<>
          <Box paddingBottom={1}>
            <div className={Styles.incidents}>
              {/* initital notificatin */}
              <div className={Styles.item}>
                <Button
                href="#"
                  color={props.viewMode.viewMode.initialNotification ? "secondary" : "primary"}
                  variant="contained"
                  size="large"
                  variant={
                    initialNoticeficationStatus ? "contained" : "outlined"
                  }
                  endIcon={
                    initialNoticeficationStatus ? (
                      <CheckCircle />
                    ) : (
                      <AccessTime />
                    )
                  }
                  className={classes.statusButton}
                  disabled={!permissionListData.view_incidents}
                  onClick={(e) => {
                    handleInitialNotificationView()
                  }}
                >
                  Initial Notification
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {initialNoticeficationStatus ? "Done" : "Pending"}
                </Typography>
              </div>

              {/* investigation */}
              <div className={Styles.item}>
                <Button
                href="#investigation"
                  color={props.viewMode.viewMode.investigation == true ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={investigationOverview ? "contained" : "outlined"}
                  endIcon={
                    investigationOverview ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  disabled={!permissionListData.view_investigation}
                  onClick={(e) => handelInvestigationView()}
                >
                  Investigation
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {investigationOverview ? "Done" : "Pending"}
                </Typography>
              </div>
            

              <div className={Styles.item}>
                <Button
                href="#evidence"
                  color={props.viewMode.viewMode.evidence == true ? "secondary" : "primary"}
                  variant={evidencesData ? "contained" : "outlined"}
                  size="large"
                  className={classes.statusButton}
                  // disabled={!permissionListData.view_incidents}
                  endIcon={evidencesData ? <CheckCircle /> : <AccessTime />}
                  onClick={(e) => handelEvidenceView(e)}
                >
                  Evidence
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {evidencesData ? "Done" : "Pending"}
                </Typography>
              </div>
              <div className={Styles.item}>
                <Button
                href="#root-cause-analysis"
                  color={props.viewMode.viewMode.rootcauseanalysis == true ? "secondary" : "primary"}
                  variant={
                    paceCauseData || rootCausesData || whyData
                      ? "contained"
                      : "outlined"
                  }
                  size="large"
                  className={classes.statusButton}
                  endIcon={
                    paceCauseData || rootCausesData || whyData ? (
                      <CheckCircle />
                    ) : (
                      <AccessTime />
                    )
                  }
                  onClick={(e) => handelRootCauseAnalysisView()}
                  // disabled={!permissionListData.view_incidents}
                >
                  Root Cause & Analysis
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {paceCauseData || rootCausesData || whyData
                    ? "Done"
                    : "Pending"}
                </Typography>
              </div>
              <div className={Styles.item}>
                <Button
                href='#close-out'
                  color={props.viewMode.viewMode.closeout == true ? "secondary" : "primary"}
                  variant={closeout ? "contained" : "outlined"}
                  size="large"
                  className={classes.statusButton}
                  // disabled={!permissionListData.view_incidents}
                  endIcon={closeout ? <CheckCircle /> : <AccessTime />}
                  onClick={(e) => handleCloseOutOverView()
                  }
                >
                  Close out
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {closeout ? "Done" : "Pending"}
                </Typography>
              </div>
              <div className={Styles.item}>
                <Button
                href='#lessons-learnt'
                  color={props.viewMode.viewMode.lessionlearn == true ? "secondary" : "primary"}
                  variant={lessionlearnData ? "contained" : "outlined"}
                  size="large"
                  className={classes.statusButton}
                  endIcon={lessionlearnData ? <CheckCircle /> : <AccessTime />}
                  onClick={(e) => handelLessionLearnedView()}
                  // disabled={!permissionListData.view_incidents}
                >
                  Lessons Learnt
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {lessionlearnData ? "Done" : "Pending"}
                </Typography>
              </div>
            </div>
          </Box>
         
          <Divider /></>}

<Box marginTop={4}>
  <Grid container spacing={3}>
    <Grid item xs={12} md={9}>
      {/* summary and part */}
      {
        isActivityHistory ? <ActivityHistory module="incidents"/> :
          isComments ? <Comments commentContext="incident" id={id} /> :
            <>
              {(() => {
                if (
                  props.viewMode.viewMode.initialNotification == true
                ) {
                  return <IncidentDetailsSummary />;
                }
                if (props.viewMode.viewMode.investigation == true) {
                  return <InvestigationSummary />;
                }
                if (props.viewMode.viewMode.evidence == true) {
                  return <EvidenceSummary />;
                }
                if (props.viewMode.viewMode.rootcauseanalysis == true) {
                  return <RootCauseAnalysisSummary />;
                }
                if (props.viewMode.viewMode.closeout == true) {
                  return <CloseOut />;
                }
                if (props.viewMode.viewMode.lessionlearn == true) {
                  return <LessionLearnSummary />;
                }
              })()}
            </>
      }
    </Grid>


    {/* side bar    */}
    {isDesktop && (
      <Grid item xs={12} md={3}>
        <Paper>
          <List
            dense
            subheader={
              <ListSubheader component="div">Actions</ListSubheader>
            }
          >
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={messageType}>
                {message}
              </Alert>
            </Snackbar>
            <ListItemLink button
            disabled={!permissionListData.add_incidents}
            >
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText

                onClick={(e) => modifyInitialDetails()}
                primary="Modify Notification" />
            </ListItemLink>

            {investigationOverview ? (
              <ListItemLink
                // onClick = {(e)=>handelNaviagte()}
                onClick={(e) => modifyInvestigation(id)}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Modify Investigation" />
              </ListItemLink>
            ) : (
              <ListItemLink
              button
              disabled={!permissionListData.add_investigation}
                onClick={(e) => handelInvestigationView()}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>

                <ListItemText primary="Add Investigation" />
              </ListItemLink>
            )}

            {evidencesData ? (
              <ListItemLink
                onClick={(e) => modifyEvidence(id)}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Modify Evidence" />
              </ListItemLink>
            ) : (
              <ListItemLink
                onClick={(e) => modifyEvidence(id)}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>

                <ListItemText primary="Add Evidence" />
              </ListItemLink>
            )}
            {paceCauseData || rootCausesData || whyData ? (
              <ListItemLink
                onClick={(e) => modifyRootCauseAnalysis()}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Modify RCA" />
              </ListItemLink>
            ) : (
              <ListItemLink
                onClick={(e) => modifyRootCauseAnalysis()}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Perform RCA" />
              </ListItemLink>
            )}
            {lessionlearnData ? (
              <ListItemLink
                onClick={(e) => handelNaviagte(`/incident/${id}/lesson-learnt/modify/`)}
              >
                <ListItemIcon>
                  <Edit />
                </ListItemIcon>
                <ListItemText primary="Modify Lessons Learnt" />
              </ListItemLink>
            ) : (
              <ListItemLink button
                onClick={(e) => modifyLessonLearn()}
              >
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add Lessons Learnt" />
              </ListItemLink>
            )}

            <ListItem
              onClick={(e) => modifyCloseout()}
              button divider>
              <ListItemIcon>
                <Close />
              </ListItemIcon>
              <ListItemText primary="Close Out" />
            </ListItem>

            <ListItem
              href='/#comment'
              onClick={(e) => handleComments()}
              button>
              <ListItemIcon>
                <Comment />
              </ListItemIcon>
              <ListItemText primary="Comments" />
            </ListItem>

            <ListItem href='/#activity' button onClick={() => handleActivityHistory()}>
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText primary="Activity History" />
            </ListItem>
          </List>
          <Divider />
          <List dense>
            <ListItem button>
              <ListItemIcon>
                <Print />
              </ListItemIcon>
              <ListItemText primary="Print" />
            </ListItem>

          </List>
        </Paper>
      </Grid>
    )}

  </Grid>

</Box>
        </PapperBlock >
      ) : (
  <h1> Loading...</h1>
)}
    </>
  );
};
const mapStateToProps = state => {
  return {
    viewMode: state.getIn(["InitialDetailsReducer"]),

  }
}

export default connect(mapStateToProps, null)(Summary);
// export default Summary;
