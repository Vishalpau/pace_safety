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
import { Col, Row } from "react-grid-system";

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

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import api from "../../../utils/axios";

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
  LessionLearnedStatus,
} from "../../../utils/FormStatus";

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
    fontSize: 12,
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Summary = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [initialNoticeficationStatus, setInitialNotificationStatus] = useState(
    false
  );
  const rootCauseStatus = useRef(false);
  const rcaRecommendedValue = useRef("");

  const [formStatus, setFormStatus] = useState({
    initialNotificationCheck: "",
    investigationCheck: "",
    evidenceCheck: "",
    rootCauseCheck: "",
    lessionLearntCheck: "",
  });

  const { id } = useParams();
  const history = useHistory();
  if (id) {
    localStorage.setItem("fkincidentId", id);
  }

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${id}/`);
    await setIncidents(allIncidents.data.data.results);
    await setIsLoading(true);
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
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    let previousData = await api.get(
      `/api/v1/incidents/${incidentId}/causeanalysis/`
    );
    let rcaRecommended = previousData.data.data.results[0].rcaRecommended;
    rcaRecommendedValue.current = rcaRecommended;
  };

  const rootCauseAnalysisCheck = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");

    let paceCause = await api.get(
      `/api/v1/incidents/${incidentId}/pacecauses/`
    );
    let paceCauseData = paceCause.data.data.results[0];
    await setPaceCauseData(paceCauseData);

    let rootCause = await api.get(
      `/api/v1/incidents/${incidentId}/rootcauses/`
    );
    let rootCauseData = rootCause.data.data.results[0];
    await setRootCausesData(rootCauseData);

    let whyAnalysis = await api.get(`/api/v1/incidents/${incidentId}/fivewhy/`);
    let whyAnalysisData = whyAnalysis.data.data.results[0];
    await setWhyData(whyAnalysisData);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  const CheckFormStatus = async () => {
    setFormStatus({
      initialNotificationCheck: await InititlaNotificationStatus(),
      investigationCheck: await InvestigationStatus(),
      evidenceCheck: await EvidenceStatus(),
      rootCauseCheck: await RootCauseAnalysisStatus(),
      lessionLearntCheck: await LessionLearnedStatus(),
    });
  };

  const handelNaviagte = (value) => {
    history.push(value);
  };

  const handelInvestigationView = () => {
    if (investigationOverview == undefined) {
      handelNaviagte(
        `/app/incident-management/registration/investigation/investigation-overview/`
      );
    } else {
      setInitialNotification(false);
      setInvestigation(true);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
    }
  };

  const handelEvidenceView = (e) => {
    if (evidencesData == undefined) {
      handelNaviagte(
        `/app/incident-management/registration/evidence/evidence/${id}`
      );
    } else {
      setInitialNotification(false);
      setInvestigation(false);
      setEvidence(true);
      setRootCauseAnalysis(false);
      setLessionlearn(false);
    }
  };

  const handelRootCauseAnalysisView = () => {
    console.log(rcaRecommendedValue.current);
    if (rcaRecommendedValue.current == "PACE cause analysis") {
      if (paceCauseData == undefined) {
        handelNaviagte(
          "/app/incident-management/registration/root-cause-analysis/details/"
        );
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
      }
    } else if (rcaRecommendedValue.current == "Cause analysis") {
      if (rootCausesData == undefined) {
        handelNaviagte(
          "/app/incident-management/registration/root-cause-analysis/details/"
        );
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
      }
    } else if (rcaRecommendedValue.current == "Five why analysis") {
      if (whyData == undefined) {
        handelNaviagte(
          "/app/incident-management/registration/root-cause-analysis/details/"
        );
      } else {
        setInitialNotification(false);
        setInvestigation(false);
        setEvidence(false);
        setRootCauseAnalysis(true);
        setLessionlearn(false);
      }
    } else {
      handelNaviagte(
        "/app/incident-management/registration/root-cause-analysis/details/"
      );
    }
  };

  const handelLessionLearnedView = () => {
    if (lessionlearnData == undefined) {
      handelNaviagte(
        `/app/incident-management/registration/lession-learned/lession-learned/${id}`
      );
    } else {
      setInitialNotification(false);
      setInvestigation(false);
      setEvidence(false);
      setRootCauseAnalysis(false);
      setLessionlearn(true);
    }
  };

  useEffect(() => {
    fetchIncidentData();
    fetchInvestigationData();
    fetchEvidenceData();
    fetchLessonLerned();
    rootCauseAnalysisCheck();
    fetchReportData();
    CheckFormStatus();
    handelRcaValue();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <>
      {isLoading ? (
        <PapperBlock
          title={`Incident Number: ${incidents.incidentNumber}`}
          icon="ion-md-list-box"
        >
          <Box paddingBottom={1}>
            <div className={Styles.incidents}>
              {/* initital notificatin */}
              <div className={Styles.item}>
                <Button
                  color={
                    initialNotification == true ||
                    (investigation === false &&
                      evidence === false &&
                      rootcauseanalysis === false &&
                      lessionlearn === false)
                      ? "secondary"
                      : "primary"
                  }
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
                  onClick={(e) => {
                    setInitialNotification(true);
                    setInvestigation(false);
                    setEvidence(false);
                    setRootCauseAnalysis(false);
                    setLessionlearn(false);
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
                  color={investigation == true ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={investigationOverview ? "contained" : "outlined"}
                  endIcon={
                    investigationOverview ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
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
                  color={evidence == true ? "secondary" : "primary"}
                  variant={evidencesData ? "contained" : "outlined"}
                  size="large"
                  className={classes.statusButton}
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
                  color={rootcauseanalysis == true ? "secondary" : "primary"}
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
                  color={lessionlearn == true ? "secondary" : "primary"}
                  variant={lessionlearnData ? "contained" : "outlined"}
                  size="large"
                  className={classes.statusButton}
                  endIcon={lessionlearnData ? <CheckCircle /> : <AccessTime />}
                  onClick={(e) => handelLessionLearnedView()}
                >
                  Lessons Learnt
                </Button>
                <Typography className={Fonts.labelValue} display="block">
                  {lessionlearnData ? "Done" : "Pending"}
                </Typography>
              </div>
            </div>
          </Box>
          <Divider />

          <Box marginTop={4}>
            <Row>
              <Col md={9}>
                <Grid item xs={12}>
                  {/* summary and part */}
                  <>
                    {(() => {
                      if (
                        initialNotification == true ||
                        (investigation === false &&
                          evidence === false &&
                          rootcauseanalysis === false &&
                          lessionlearn === false)
                      ) {
                        return <IncidentDetailsSummary />;
                      }
                      if (investigation == true) {
                        return <InvestigationSummary />;
                      }
                      if (evidence == true) {
                        return <EvidenceSummary />;
                      }
                      if (rootcauseanalysis == true) {
                        return <RootCauseAnalysisSummary />;
                      }
                      if (lessionlearn == true) {
                        return <LessionLearnSummary />;
                      }
                    })()}
                  </>
                </Grid>
              </Col>

              {/* side bar    */}
              {isDesktop && (
                <Col md={3}>
                  <Paper>
                    <List
                      dense
                      subheader={
                        <ListSubheader component="div">Actions</ListSubheader>
                      }
                    >
                      <ListItemLink>
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/initial-notification/incident-details/${id}`
                            )
                          }
                          primary="Modify Notification"
                        />
                      </ListItemLink>

                      {investigationOverview ? (
                        <ListItemLink
                          // onClick = {(e)=>handelNaviagte()}
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/investigation/investigation-overview/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText primary="Modify Investigation" />
                        </ListItemLink>
                      ) : (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              "/app/incident-management/registration/investigation/investigation-overview/"
                            )
                          }
                        >
                          <ListItemIcon>
                            <Add />
                          </ListItemIcon>

                          <ListItemText primary="Add Investigation" />
                        </ListItemLink>
                      )}

                      {evidencesData ? (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/evidence/evidence/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText primary="Modify Evidence" />
                        </ListItemLink>
                      ) : (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              "/app/incident-management/registration/evidence/evidence/"
                            )
                          }
                        >
                          <ListItemIcon>
                            <Add />
                          </ListItemIcon>

                          <ListItemText primary="Add Evidence" />
                        </ListItemLink>
                      )}
                      {paceCauseData || rootCausesData || whyData ? (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/root-cause-analysis/details/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText primary="Modify RCA" />
                        </ListItemLink>
                      ) : (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/root-cause-analysis/details/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Add />
                          </ListItemIcon>
                          <ListItemText primary="Perform RCA" />
                        </ListItemLink>
                      )}
                      {lessionlearnData ? (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/lession-learned/lession-learned/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Edit />
                          </ListItemIcon>
                          <ListItemText primary="Modify Lessons Learnt" />
                        </ListItemLink>
                      ) : (
                        <ListItemLink
                          onClick={(e) =>
                            handelNaviagte(
                              `/app/incident-management/registration/lession-learned/lession-learned/${id}`
                            )
                          }
                        >
                          <ListItemIcon>
                            <Add />
                          </ListItemIcon>
                          <ListItemText primary="Add Lessons Learnt" />
                        </ListItemLink>
                      )}

                      <ListItem button divider>
                        <ListItemIcon>
                          <Close />
                        </ListItemIcon>
                        <ListItemText primary="Close Out" />
                      </ListItem>

                      <ListItem button>
                        <ListItemIcon>
                          <Comment />
                        </ListItemIcon>
                        <ListItemText primary="Comments" />
                      </ListItem>

                      <ListItem button>
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
                      <ListItem button>
                        <ListItemIcon>
                          <Share />
                        </ListItemIcon>
                        <ListItemText primary="Share" />
                      </ListItem>
                    </List>
                  </Paper>
                </Col>
              )}
            </Row>
          </Box>
        </PapperBlock>
      ) : (
        <h1> Loading...</h1>
      )}
    </>
  );
};

export default Summary;
