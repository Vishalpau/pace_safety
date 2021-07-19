import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

// Styles
import api from "../../utils/axios";
import "../../styles/custom/summary.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

const RootCauseAnalysisSummary = () => {
  const [rootCause, setRootCause] = useState([]);
  const [fiveWhy, setFiveWhy] = useState([]);
  const [causeanalysis, setCauseAnalysis] = useState([]);
  const [pacecauses, setPaceCauses] = useState([]);

  const fkid = localStorage.getItem("fkincidentId");

  const subValues = ["Supervision", "Workpackage", "Equipment machinery", "Behaviour issue",
    "Safety issues", "Ergonimics", "Procedures", "Other acts", "Warning system", "Energy types",
    "Tools", "Safety items", "Others conditions", "personal", "wellnessFactors", "Others human factors",
    "Leadership", "processes", "Others job factors", "Management control", "Region support above"]

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
    let paceData = allPaceCauses.data.data.results
    if (typeof paceData[0] !== "undefined" && paceData[0].rcaSubType === "regionsupportabove") {
      await setPaceCauses(paceData.reverse())
    } else {
      await setPaceCauses(paceData)
    }
  };
  useEffect(() => {
    fetchRootCauseData();
    fetchFiveWhyData();
    fetchCauseAnalysiseData();
    fetchPaceCausesData();
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {/* {console.log(causeanalysis)} */}
      {causeanalysis.length !== 0 ?
        <Grid item md={12}>

          <Typography className={classes.heading}>Cause analysis</Typography>


          <Typography variant="h6" gutterBottom>
            Evidence collected supports the incident event took place?
          </Typography>
          <Typography variant="h8" gutterBottom>
            {causeanalysis.evidenceSupport}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Contradictions between evidence and the description of incident?
          </Typography>
          <Typography variant="h8" gutterBottom>
            {causeanalysis.evidenceContradiction}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Evidence does not supports the incident event as described?
          </Typography>
          <Typography variant="h8" gutterBottom>
            {causeanalysis.evidenceNotSupport}
          </Typography>



        </Grid>
        :
        <Grid item md={12}>
          <Typography className={classes.heading}>Root cause is pending</Typography>
        </Grid>
      }

      {/* root cause */}
      {rootCause.length !== 0 ?
        <Grid item md={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Root cause</Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: "details-wrapper" }}>
              {rootCause.map((root, key) => (
                <Grid item md={12}>

                  {/* cause of incident */}
                  <Typography variant="h6" gutterBottom>
                    Cause on incident
                  </Typography>
                  <Typography variant="h8" gutterBottom>
                    {root.causeOfIncident}
                  </Typography>

                  {/* corrective action */}
                  <Typography variant="h6" gutterBottom>
                    Corrective solution
                  </Typography>
                  <Typography variant="h8" gutterBottom>
                    {root.correctiveAction}
                  </Typography>

                  {/* recommended solution */}
                  {root.recommendSolution !== "" ? <>
                    <Typography variant="h6" gutterBottom>
                      Recommended solution
                    </Typography>
                    <Typography variant="h8" gutterBottom>
                      {root.recommendSolution}
                    </Typography>
                  </> : null
                  }
                </Grid>
              ))
              }
            </AccordionDetails>



          </Accordion>
        </Grid> :
        null}

      {/* five why analysis   */}
      {fiveWhy.length !== 0 ?
        <Grid item md={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Five why analysis</Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: "details-wrapper" }}>

              {fiveWhy.map((fw, key) => (
                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom>
                    Why {fw.whyCount + 1}
                  </Typography>
                  <Typography variant="h8" gutterBottom>
                    {fw.why}
                  </Typography>

                </Grid>
              ))}
            </AccordionDetails>
          </Accordion>
        </Grid>
        :
        null}

      {pacecauses.length !== 0 ?
        <Grid item md={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>PACE cause analysis</Typography>
            </AccordionSummary>
            <AccordionDetails classes={{ root: "details-wrapper" }}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: 900 }} size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 200 }}>RCA number</TableCell>
                      <TableCell style={{ width: 100 }}>RCA type</TableCell>
                      <TableCell style={{ width: 200 }}>RCA sub type</TableCell>
                      <TableCell style={{ width: 400 }}>RCA Remark</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      pacecauses.map((pc, key) => (
                        <TableRow key={key}>
                          <TableCell>{pc.rcaNumber}</TableCell>
                          <TableCell>{pc.rcaType}</TableCell>
                          <TableCell>{subValues[key]}</TableCell>
                          <TableCell>{pc.rcaRemark}</TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>
        :
        null
      }
    </Grid>
  );
};
export default RootCauseAnalysisSummary;
