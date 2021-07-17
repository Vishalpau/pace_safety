import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";

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
import moment from "moment";
import api from "../../../utils/axios";

// Router
import { useHistory, useParams } from "react-router";

import IncidentDetails from "../InitialNotification/IncidentDetails";
import IncidentDetailsSummary from "../../SummaryDetails/InitialNotification";
import InvestigationSummary from "../../SummaryDetails/Investigation";
import EvidenceSummary from "../../SummaryDetails/Evidence";
import RootCauseAnalysisSummary from "../../SummaryDetails/RootCauseAndAnalysis";
import LessionLearnSummary from "../../SummaryDetails/LessionLearn";

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
  const [investigation, setInvestigation] = useState(false);
  const [evidence, setEvidence] = useState(false);
  const [rootcauseanalysis, setRootCauseAnalysis] = useState(false);
  const [lessionlearn, setLessionlearn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialNoticeficationStatus, setInitialNotificationStatus] = useState(false);
  const [lessionLearntStatus, setLessionLearntStatus] = useState(false)
  const rootCauseStatus = useRef(false)

  const { id } = useParams();
  const history = useHistory();
  if (id) {
    localStorage.setItem('fkincidentId', id);
  }

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${id}/`);
    if(allIncidents.status === 200){
      await setIncidents(allIncidents.data.data.results);
      await setIsLoading(true);
      if(result.length > 0 ){
        localStorage.setItem("LessionLearnt", "Done")
      }
      else{
        localStorage.setItem("LessionLearnt", "Pending")
      }
    }    
  };

  const fetchReortedByDataList = async()=>{
    
    const res = await api.get(`/api/v1/incidents/${id}/reports/`);
    if(res.status===200){
      const result = res.data.data.results;
      if(result.length > 0){
        setInitialNotificationStatus(true)
      }
    }

  }
  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    if(res.status===200){
      const result = res.data.data.results;
      if(result.length > 0){
        setLessionLearntStatus(true)
      }
    } 
  };

  const rootCauseAnalysisCheck = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");

    let paceCause = await api.get(`/api/v1/incidents/${incidentId}/pacecauses/`);
    let paceCauseData = paceCause.data.data.results;

    let rootCause = await api.get(`/api/v1/incidents/${incidentId}/rootcauses/`);
    let rootCauseData = rootCause.data.data.results[0];

    let whyAnalysis = await api.get(`/api/v1/incidents/${incidentId}/fivewhy/`);
    let whyAnalysisData = whyAnalysis.data.data.results;

    if (paceCauseData.length > 0 && typeof paceCauseData !== "undefined" ||
      rootCauseData.length > 0 && typeof rootCauseData !== "undefined" ||
      whyAnalysisData.length > 0 && typeof whyAnalysisData !== "undefined"
    ) {
      rootCauseStatus.current = true
    }
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  useEffect(() => {
    fetchIncidentData();
    fetchLessonLerned();
    rootCauseAnalysisCheck();
    fetchReortedByDataList();
  }, []);

  return (
    <>
      {isLoading ? (
        <PapperBlock
          title={`Incident Number: ${incidents.incidentNumber}`}
          icon="ion-md-list-box"
        >
          <Box paddingBottom={1}>
            <div className={Styles.incidents}>
              <div className={Styles.item}>
                <Button
                  color="primary"
                  variant={
                    initialNoticeficationStatus
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  className={classes.statusButton}
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
                <Typography variant="caption" display="block">
                  {initialNoticeficationStatus? "Done": "Pending"}
                </Typography>
              </div>

              <div className={Styles.item}>
                <Button
                  color="primary"
                  variant="outlined"
                  size="small"
                  endIcon={<AccessTime />}
                  className={classes.statusButton}
                  onClick={(e) => {
                    setInitialNotification(false);
                    setInvestigation(true);
                    setEvidence(false);
                    setRootCauseAnalysis(false);
                    setLessionlearn(false);
                  }}
                >
                  Investigation
                </Button>
                <Typography variant="caption" display="block">
                  Pending
                </Typography>
              </div>

              <div className={Styles.item}>
                <Button
                  color="primary"
                  variant={
                    localStorage.getItem("Evidence") == "Done"
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  className={classes.statusButton}
                  endIcon={
                    localStorage.getItem("Evidence") == "Done" ? (
                      <CheckCircle />
                    ) : (
                      <AccessTime />
                    )
                  }
                  onClick={(e) => {
                    setInitialNotification(false);
                    setInvestigation(false);
                    setEvidence(true);
                    setRootCauseAnalysis(false);
                    setLessionlearn(false);
                  }}
                >
                  Evidence
                </Button>
                <Typography variant="caption" display="block">
                  {localStorage.getItem("Evidence") == "Done"
                    ? "Done"
                    : "Pending"}
                </Typography>
              </div>
              <div className={Styles.item}>
                <Button
                  color="primary"
                  variant={
                    localStorage.getItem("RootCause") == "Done"
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  className={classes.statusButton}
                  endIcon={
                    localStorage.getItem("RootCause") == "Done" ? (
                      <CheckCircle />
                    ) : (
                      <AccessTime />
                    )
                  }
                  onClick={(e) => {
                    setInitialNotification(false);
                    setInvestigation(false);
                    setEvidence(false);
                    setRootCauseAnalysis(true);
                    setLessionlearn(false);
                  }}
                >
                  Root Cause & Analysis
                </Button>
                <Typography variant="caption" display="block">
                  {localStorage.getItem("RootCause") == "Done"
                    ? "Done"
                    : "Pending"}
                </Typography>
              </div>
              <div className={Styles.item}>
                <Button
                  color="primary"
                  variant={
                    lessionLearntStatus
                      ? "contained"
                      : "outlined"
                  }
                  size="small"
                  className={classes.statusButton}
                  endIcon={
                    lessionLearntStatus ? (
                      <CheckCircle />
                    ) : (
                      <AccessTime />
                    )
                  }
                  onClick={(e) => {
                    setInitialNotification(false);
                    setInvestigation(false);
                    setEvidence(false);
                    setRootCauseAnalysis(false);
                    setLessionlearn(true);
                  }}
                >
                  Lessons Learnt
                </Button>
                <Typography variant="caption" display="block">
                  {lessionLearntStatus
                    ? "Done"
                    : "Pending"}
                </Typography>
              </div>
            </div>
          </Box>
          <Divider />

          <Box marginTop={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={9}>
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
              <Grid item xs={12} md={3}>
                <Paper>
                  <List
                    dense
                    subheader={
                      <ListSubheader component="div">Actions</ListSubheader>
                    }
                  >
                    <ListItemLink
                      href={`/app/incident-management/registration/initial-notification/incident-details/${id}`}
                    >
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary="Modify Notification" />
                    </ListItemLink>

                    <ListItemLink href={`/app/incident-management/registration/investigation/investigation-overview/${id}`}>
                      <ListItemIcon>
                        <Edit />
                      </ListItemIcon>
                      <ListItemText primary="Modify Investigation" />
                    </ListItemLink>

                    {localStorage.getItem("Evidence") == "Done" ? (
                      <ListItemLink
                        href={`/app/incident-management/registration/evidence/evidence/${id}`}
                      >
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText primary="Modify Evidence" />
                      </ListItemLink>
                    ) : (
                      <ListItemLink href="/app/incident-management/registration/evidence/evidence/">
                        <ListItemIcon>
                          <Add />
                        </ListItemIcon>

                        <ListItemText primary="Add Evidence" />
                      </ListItemLink>
                    )}
                    {localStorage.getItem("RootCause") == "Done" ? (
                      <ListItemLink
                        href={`/app/incident-management/registration/root-cause-analysis/details/${id}`}
                      >
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText primary="Modify RCA" />
                      </ListItemLink>) : (
                      <ListItemLink href={`/app/incident-management/registration/root-cause-analysis/details/${id}`}>
                        <ListItemIcon>
                          <Add />
                        </ListItemIcon>
                        <ListItemText primary="Perform RCA" />
                      </ListItemLink>
                    )}
                    {lessionLearntStatus ? (
                      <ListItemLink
                        href={`/app/incident-management/registration/lession-learned/lession-learned/${id}`}
                      >
                        <ListItemIcon>
                          <Edit />
                        </ListItemIcon>
                        <ListItemText primary="Lessons Learned" />
                      </ListItemLink>
                    ) : (
                      <ListItemLink
                        onClick={() =>
                          history.push(
                            `/app/incident-management/registration/lession-learned/lession-learned/${id}`
                          )
                        }
                      >
                        <ListItemIcon>
                          <Add />
                        </ListItemIcon>
                        <ListItemText primary="Lessons Learned" />
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
              </Grid>
            </Grid>
          </Box>
        </PapperBlock>
      ) : (
        <h1> Loading...</h1>
      )}
    </>
  );
};

export default Summary;
