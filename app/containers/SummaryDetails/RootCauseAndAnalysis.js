import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
import api from "../../utils/axios";

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
    <Grid container spacing={1}>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Root Cause</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {rootCause.length !== 0
              ? rootCause.map((root, key) => (
                  <Grid container item md={9} spacing={3} key={key}>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Id : {root.id}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Cause Of Incident
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {root.causeOfIncident}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Recomment Solution
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {root.recommendSolution}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Corrective Action
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {root.correctiveAction}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Five Why</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {fiveWhy.length !== 0
              ? fiveWhy.map((fw, key) => (
                  <Grid container item md={9} spacing={3} key={key}>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Id : {fw.id}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Why
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {fw.why}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Why Count
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {fw.whyCount}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Casue Analysis</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {causeanalysis.length !== 0
              ? causeanalysis.map((cause, key) => (
                  <Grid container item md={9} spacing={3} key={key}>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Id : {cause.id}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Evidence Support
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {cause.evidenceSupport}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Evidence Contradiction
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {cause.evidenceContradiction}
                      </Typography>
                    </Grid>

                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Evidence NotSupport
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {cause.evidenceNotSupport}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA Recommended
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {cause.rcaRecommended}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item md={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Pace Cause</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pacecauses.length !== 0
              ? pacecauses.map((pc, key) => (
                  <Grid container item md={9} spacing={3} key={key}>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA number
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.rcaNumber}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA type
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.rcatype}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA SubType
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.rcaSubType}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA Remark
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.rcaRemark}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        RCA RemarkType
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.remarkType}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Status
                      </Typography>
                      <Typography
                        variant="body"
                        color="textSecondary"
                        className={Fonts.labelValue}
                      >
                        {pc.status}
                      </Typography>
                    </Grid>
                  </Grid>
                ))
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
export default RootCauseAnalysisSummary;
