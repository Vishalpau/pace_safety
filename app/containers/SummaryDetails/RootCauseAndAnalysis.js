import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Fonts from "dan-styles/Fonts.scss";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "../../styles/custom/summary.css";
// Styles
import api from "../../utils/axios";
import { handelActionData } from "../../utils/CheckerValue";
import ActionTracker from "../Forms/ActionTracker";
import ActionShow from "../Forms/ActionShow";
import Loader from "../Forms/Loader";


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
  const [whyAction, setWhyAction] = useState([])
  const [updatePage, setUpdatePage] = useState(false)
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [isLoading, setIsLoading] = useState(false)

  const fkid = localStorage.getItem("fkincidentId");

  const setRemark = (value) => {
    let remark = value.includes(",") ? value.split(",") : [value];
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
    let additonalDetails = { "Management control": [], "Reasons to support above": [] }
    temp.map((value) => {
      if (value["rcaSubType"] === "managementControl") {
        additonalDetails["Management control"].push(value["rcaRemark"])
      } else {
        additonalDetails["Reasons to support above"].push(value["rcaRemark"])
      }
    })
    console.log(additonalDetails)

    setAdditonalDetails(additonalDetails);
    handelActionTracker(paceData)
  };

  const handelActionTracker = async (apiData) => {

    let incidentID = localStorage.getItem("fkincidentId")
    let allAction = await handelActionData(incidentID, apiData)
    await setPaceCauses(allAction);
  };

  const handelShowData = () => {

  }
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
  const handelWhyAnalysisAction = async () => {
    let allAction = await handelActionData(fkid, [], "one")
    await setWhyAction(allAction);
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

  const handelCallBack = async () => {
    await setIsLoading(true)
    await fetchRootCauseData();
    await fetchFiveWhyData();
    await fetchCauseAnalysiseData();
    await fetchPaceCausesData();
    await handelActionLink()
    await handelWhyAnalysisAction()
    await setIsLoading(false)
  }

  useEffect(() => {
    handelCallBack()
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
      {isLoading == false ?
        <>
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
                  <Grid>
                    <ActionTracker
                      actionContext="incidents:causeAnalysis"
                      enitityReferenceId={`${fkid}:${whyAction.length + 1}`}
                      setUpdatePage={setUpdatePage}
                      updatePage={updatePage}
                      fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                      fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                      fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["incident"]["projectStruct"]}
                      createdBy={JSON.parse(localStorage.getItem('userDetails')).id}
                      handelShowData={handelWhyAnalysisAction}
                    />
                  </Grid>
                  <Grid>
                    {whyAction.map((actionValue) => (
                      <>
                        <ActionShow
                          action={{ id: actionValue.id, number: actionValue.actionNumber }}
                          title={actionValue.actionTitle}
                          companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                          projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                          projectStructure={localStorage.getItem("selectBreakDown")}
                        />
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
                  <Grid item xs={12} >
                    <ActionTracker
                      actionContext="incidents:whyAnalysis"
                      enitityReferenceId={`${fkid}:${whyAction.length + 1}`}
                      setUpdatePage={setUpdatePage}
                      updatePage={updatePage}
                      fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                      fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                      fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["incident"]["projectStruct"]}
                      createdBy={JSON.parse(localStorage.getItem('userDetails')).id}
                      handelShowData={handelWhyAnalysisAction}
                    />
                  </Grid>
                  <Grid>
                    {whyAction.length > 0 && whyAction.map((actionValue) => (
                      <>
                        <ActionShow
                          action={{ id: actionValue.id, number: actionValue.actionNumber }}
                          title={actionValue.actionTitle}
                          companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                          projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                          projectStructure={localStorage.getItem("selectBreakDown")}
                        />
                      </>
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
                                  <ActionShow
                                    action={actionId}
                                    companyId={projectData.companyId}
                                    projectId={projectData.projectId}
                                    handelShowData={handelShowData}
                                    index={key}
                                  />
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

          {Object.entries(additionalDetails).map(([key, value]) => {
            value.length > 0 ? (
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
                    {Object.entries(additionalDetails).map(([key, value]) => (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <Typography className={Fonts.labelName}>
                            {key}
                          </Typography>
                          {value.map((valueRcaRemark) => (
                            <p>
                              {valueRcaRemark}
                            </p>
                          ))}
                        </Grid>
                      </Grid>
                    ))}

                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>): null
          })} 
        </>
        :
        <Loader />
      }
    </Grid>
  );
};
export default RootCauseAnalysisSummary;
