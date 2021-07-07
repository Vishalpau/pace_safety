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
    await setCauseAnalysis(allCauseAnalysis.data.data.results);
  };

  const fetchPaceCausesData = async () => {
    const allPaceCauses = await api.get(
      `/api/v1/incidents/${fkid}/pacecauses/`
    );
    await setPaceCauses(allPaceCauses.data.data.results);
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
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Root Cause</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: "details-wrapper" }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Cause of Incident</TableCell>
                    <TableCell>Recommended Solution</TableCell>
                    <TableCell>Corrective Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rootCause.length !== 0 ? (
                    rootCause.map((root, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {root.id}
                        </TableCell>
                        <TableCell>{root.causeOfIncident}</TableCell>
                        <TableCell>{root.recommendSolution}</TableCell>
                        <TableCell>{root.correctiveAction}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Five Why</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: "details-wrapper" }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Why</TableCell>
                    <TableCell>Why Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fiveWhy.length !== 0 ? (
                    fiveWhy.map((fw, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {fw.id}
                        </TableCell>
                        <TableCell>{fw.why}</TableCell>
                        <TableCell>{fw.whyCount}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Casue analysis</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: "details-wrapper" }}>
            <TableContainer component={Paper}>
              <Table className={classes.table} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Evidence support</TableCell>
                    <TableCell>Evidence contradiction</TableCell>
                    <TableCell>RCA recommended</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {causeanalysis.length !== 0 ? (
                    causeanalysis.map((cause, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {cause.id}
                        </TableCell>
                        <TableCell>{cause.evidenceSupport}</TableCell>
                        <TableCell>{cause.evidenceContradiction}</TableCell>
                        <TableCell>{cause.rcaRecommended}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Pace cause</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: "details-wrapper" }}>
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>RCA Number</TableCell>
                    <TableCell>RCA Type</TableCell>
                    <TableCell>RCA Sub Type</TableCell>
                    <TableCell>RCA Remark</TableCell>
                    <TableCell>RCA Remark Type</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pacecauses.length !== 0 ? (
                    pacecauses.map((pc, key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {pc.id}
                        </TableCell>
                        <TableCell>{pc.rcaNumber}</TableCell>
                        <TableCell>{pc.rcatype}</TableCell>
                        <TableCell>{pc.rcaSubType}</TableCell>
                        <TableCell>{pc.rcaRemark}</TableCell>
                        <TableCell>{pc.rcaRemarkType}</TableCell>
                        <TableCell>{pc.status}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <h1>No Data Found</h1>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            />
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default RootCauseAnalysisSummary;
