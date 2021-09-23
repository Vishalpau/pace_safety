import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { useHistory, useParams } from "react-router";
import Link from '@material-ui/core/Link';
import axios from "axios";

// Styles
import api from "../../utils/axios";
import apiAction from "../../utils/axiosActionTracker";
import "../../styles/custom/summary.css";
import Fonts from "dan-styles/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  table: {
    minWidth: 650,
  },
  tabelBorder: {
    width: 110,
    border: '1px solid black'
  }
}));

const RootCauseAnalysisSummary = () => {
  const [rootCause, setRootCause] = useState([]);
  const [fiveWhy, setFiveWhy] = useState([]);
  const [causeanalysis, setCauseAnalysis] = useState([]);
  const [pacecauses, setPaceCauses] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [additionalDetails, setAdditonalDetails] = useState([]);
  const [additionalRcaSubType, setAdditionalRcaSubType] = useState([
    "managementControl",
    "reasonsSupportAbove",
  ]);
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
  })

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fkid = localStorage.getItem("fkincidentId");

  const setRemark = (value) => {
    let remark = value.includes(",") ? value.split(",") : [value];
    if (remark.includes("No option selected") && remark.length > 0) {
      let removeItemIndex = remark.indexOf("No option selected");
      remark.splice(removeItemIndex, 1);
    }
    return remark;
  };
  const fetchRootCauseData = async () => {
    const allRootCause = await api.get(`/api/v1/incidents/${fkid}/rootcauses/`);
    await setRootCause(allRootCause.data.data.results);
  };

  const fetchFiveWhyData = async () => {
    const allFiveWhy = await api.get(`/api/v1/incidents/${fkid}/fivewhy/`);
    await setFiveWhy(allFiveWhy.data.data.results);
  };

  const fetchCauseAnalysiseData = async () => {
    const allCauseAnalysis = await api.get(
      `/api/v1/incidents/${fkid}/causeanalysis/`
    );
    await setCauseAnalysis(allCauseAnalysis.data.data.results[0]);
  };

  const fetchPaceCausesData = async () => {
    const allPaceCauses = await api.get(
      `/api/v1/incidents/${fkid}/pacecauses/`
    );
    let paceData = allPaceCauses.data.data.results;
    let temp = [];
    paceData.map((value) => {
      if (additionalRcaSubType.includes(value.rcaSubType)) {
        temp.push(value);
      }
    });
    setAdditonalDetails(temp);
    handelActionTracker(paceData)
  };

  const handelActionTracker = async (apiData) => {

    let incidentID = localStorage.getItem("fkincidentId")
    for (let key in apiData) {
      const allActionTrackerData = await apiAction.get(
        `api/v1/actions/?enitityReferenceId=${incidentID}%3A${apiData[key]["id"]
        }`
      );
      if (allActionTrackerData.data.data.results.results.length > 0) {
        let actionTracker = allActionTrackerData.data.data.results.results;
        const temp = [];
        actionTracker.map((value) => {
          const tempAction = {}
          let actionTrackerId = value.id;
          let actionTrackerNumber = value.actionNumber
          tempAction["number"] = actionTrackerNumber
          tempAction["id"] = actionTrackerId
          temp.push(tempAction);
        });
        apiData[key]["action"] = temp;
      } else {
        apiData[key]["action"] = [];
      }
    }
    await setPaceCauses(apiData);
  };

  const handelActionLink = () => {
    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;

    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    setProjectData({ projectId: projectId, companyId: fkCompanyId })
  }

  const handelConvert = (value) => {
    let wordArray = value.split(/(?=[A-Z])/);
    let wordArrayCombined = wordArray.join(" ");
    var newString = wordArrayCombined
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
        return c.toUpperCase();
      });
    return newString;
  };

  const handelStringToArray = (value) => {
    let valueArray = value.replace(",", ",  ");
    return valueArray;
  };
  const history = useHistory();

  const handelRootCauseAnalysis = (e, value) => {
    if (value == "modify") {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/details/${id}`
      );
    } else if ((value = "add")) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/details/`
      );
    }
  };

  useEffect(() => {
    fetchRootCauseData();
    fetchFiveWhyData();
    fetchCauseAnalysiseData();
    fetchPaceCausesData();
    handelActionLink()
  }, []);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <Grid container spacing={3}>
      {!isDesktop && (
        <Grid item xs={12}>
          {fiveWhy.length > 0 ||
            rootCause.length > 0 ||
            pacecauses.length > 0 ? (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={(e) => handelRootCauseAnalysis(e, "modify")}
            >
              Modify RCA
            </Button>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={(e) => handelRootCauseAnalysis(e, "add")}
            >
              Add RCA
            </Button>
          )}
        </Grid>
      )}
      {typeof causeanalysis !== "undefined" && causeanalysis.length !== 0 ? (
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" className={Fonts.labelName} gutterBottom>
                RCA recommended
              </Typography>
              <Typography className={Fonts.labelValue} gutterBottom>
                {causeanalysis.rcaRecommended}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Fonts.labelName} gutterBottom>
                Evidence collected supports the incident event took place?
              </Typography>
              <Typography className={Fonts.labelValue} gutterBottom>
                {causeanalysis.evidenceSupport}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Fonts.labelName} gutterBottom>
                Contradictions between evidence and the description of incident?
              </Typography>
              <Typography className={Fonts.labelValue} gutterBottom>
                {causeanalysis.evidenceContradiction}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Fonts.labelName} gutterBottom>
                Evidence does not supports the incident event as described?
              </Typography>
              <Typography className={Fonts.labelValue} gutterBottom>
                {causeanalysis.evidenceNotSupport}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography className={classes.heading}>
            Root cause is pending
          </Typography>
        </Grid>
      )}

      {rootCause.length !== 0 ? (
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleExpand("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Cause analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: "details-wrapper" }}>
              <Grid container spacing={5}>
                {rootCause.map((root, key) => (
                  <>
                    <Grid item md={12}>
                      {/* cause of incident */}
                      <Typography
                        variant="h6"
                        className={Fonts.labelName}
                        gutterBottom
                      >
                        Cause on incident
                      </Typography>
                      <Typography className={Fonts.labelValue}>
                        {root.causeOfIncident}
                      </Typography>
                    </Grid>

                    <Grid item md={12}>
                      {/* corrective action */}
                      <Typography
                        variant="h6"
                        className={Fonts.labelName}
                        gutterBottom
                      >
                        Corrective solution
                      </Typography>
                      <Typography className={Fonts.labelValue}>
                        {root.correctiveAction}
                      </Typography>
                    </Grid>

                    <Grid item md={12}>
                      {/* recommended solution */}
                      {root.recommendSolution !== "" ? (
                        <>
                          <Typography
                            variant="h6"
                            className={Fonts.labelName}
                            gutterBottom
                          >
                            Recommended solution
                          </Typography>
                          <Typography className={Fonts.labelValue}>
                            {root.recommendSolution}
                          </Typography>
                        </>
                      ) : null}
                    </Grid>
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}

      {/* five why analysis   */}
      {fiveWhy.length !== 0 ? (
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleExpand("panel2")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Five why analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: "details-wrapper" }}>
              <Grid container spacing={3}>
                {fiveWhy.map((fw, key) => (
                  <Grid item md={12}>
                    <Typography
                      variant="h6"
                      className={Fonts.labelName}
                      gutterBottom
                    >
                      Why {fw.whyCount + 1}
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {fw.why}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}

      {pacecauses.length !== 0 ? (
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleExpand("panel4")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                PACE cause analysis
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>

                <Table className={classes.table} style={{ border: '1px solid black' }} size="small">
                  <TableHead>
                    <TableRow >
                      <TableCell className={classes.tabelBorder}>Type</TableCell>
                      <TableCell className={classes.tabelBorder}>Category</TableCell>
                      <TableCell className={classes.tabelBorder}>Cause</TableCell>
                      <TableCell className={classes.tabelBorder}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pacecauses.map((pc, key) =>
                      pc.rcaRemark !== "No option selected" &&
                        !additionalRcaSubType.includes(pc.rcaSubType) ? (
                        <TableRow key={key}>
                          <TableCell className={classes.tabelBorder}>{pc.rcaType}</TableCell>
                          <TableCell className={classes.tabelBorder}>{handelConvert(pc.rcaSubType)}</TableCell>
                          <TableCell className={classes.tabelBorder}>
                            {handelStringToArray(pc.rcaRemark)}
                          </TableCell>
                          <TableCell className={classes.tabelBorder}>
                            {pc.action != undefined && pc.action.map((actionId) => (
                              <Link display="block"
                                href={`${JSON.parse(localStorage.getItem("BaseUrl"))["actions"]}/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${projectData.companyId}&projectId=${projectData.projectId}&targetPage=/app/pages/Action-Summary/&targetId=${actionId.id}`}
                              >
                                {actionId.number}
                              </Link>
                            ))}
                          </TableCell>
                        </TableRow>
                      ) : null
                    )}
                  </TableBody>
                </Table>

              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}

      {additionalDetails.length !== 0 ? (
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === "panel5"}
            onChange={handleExpand("panel5")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Additional details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item xs={12}>
                {additionalDetails.map((value) => (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography className={Fonts.labelName}>
                        {handelConvert(value.rcaSubType)}
                      </Typography>
                      {setRemark(value.rcaRemark).map((rcaValue) => (
                        <Typography className={Fonts.labelValue}>
                          {rcaValue}
                        </Typography>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}
    </Grid>
  );
};
export default RootCauseAnalysisSummary;
