import React, { useEffect, useState, useRef } from "react";
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
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import { useParams } from "react-router";
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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  fileIcon: {
    background: "#e2e2e2",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: 650,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
  },
}));

const InvestigationSummary = () => {
  const { id } = useParams();
  const [investigationOverview, setInvestigationOverview] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [overAllCost, setOverAllCost] = useState([]);
  const fetchInvestigationData = async () => {
    let res = await api.get(`/api/v1/incidents/${id}/investigations/`);
    let result = res.data.data.results;
    await setInvestigationOverview(result);
  };

  const putId = useRef("");
  const eventId = useRef("");
  const investigationId = useRef("");
  const fetchEventData = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];

    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      investigationId.current = allApiData.id;
      const event = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${
          investigationId.current
        }/events/`
      );
      const result = event.data.data.results;
      await setEventData(result);
      const eventData = event.data.data.results[0];
      if (typeof eventData !== "undefined") {
        eventId.current = eventData.id;
      }

      // Weather data
      const weather = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${
          investigationId.current
        }/events/${eventId.current}/weatherconditions/`
      );
      console.log(weather);
      const weatherData = weather.data.data.results;
      await setWeather(weatherData);

      // event data
      const cost = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${
          investigationId.current
        }/events/${eventId.current}/cost/`
      );
      const costData = cost.data.data.results;
      await setOverAllCost(costData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchInvestigationData();
      fetchEventData();
    }
  }, []);
  const classes = useStyles();

  return (
    <PapperBlock title=" Investigation" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Investigation Overview
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs={12} spacing={3}>
                {investigationOverview.map((value, index) => (
                  <>
                    <Grid item lg={12} md={12}>
                      <Typography className={classes.heading}>
                        Construction manager
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Name
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.constructionManagerName}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Contact no
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.constructionManagerContactNo}
                      </Typography>
                    </Grid>{" "}
                    <Grid item lg={12} md={12}>
                      <Typography className={classes.heading}>
                        Hse specialist
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Name
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.hseSpecialistName}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Contact no
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.hseSpecialistContactNo}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Actual serverity level
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.actualSeverityLevel}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Potential serverity level
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.potentialSeverityLevel}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Severity Consequences
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs={12} spacing={3}>
                {investigationOverview.map((value, index) => (
                  <>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Health & Safety actual
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.healthSafetyActual}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Health & Safety potential
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.healthSafetyPotential}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Environment-actual
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.environmentActual}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Environment-potential
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.environmentPotential}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Regulatory actual
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.regulatoryActual}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Regulatory potential
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.regulatoryPotential}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reputation actual
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.reputationActual}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Reputation potential
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.reputationPotential}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Financial actual
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.financialActual}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Financial potential
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.financialPotential}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Highest potential impact receptor
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.highestPotentialImpactReceptor}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Classification
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.classification}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Rca recommended
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.rcaRecommended}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Event Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs={12} spacing={3}>
                {eventData.map((value, index) => (
                  <>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Activity
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.activity}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Job task
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.jobTask}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Equipment involved
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.equipmentInvolved}
                      </Typography>
                    </Grid>

                    {weather.map((value, index) => (
                      <>
                        <Grid item lg={6} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Weather {index + 1}
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.weatherCondition}
                          </Typography>
                        </Grid>
                      </>
                    ))}

                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Temperature
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.temperature}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Lighting
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.lighting}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Speed
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.windSpeed}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Direction
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.windDirection}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Fluid type
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.spillsFluidType}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Fluid amount
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.spillsFluidAmount}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        AEL
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.acceptableExplosiveLimit}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        PEL
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.permissableExplosiveLimit}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Property impact information
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.propertyImpactInformation}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Property cost impact
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.propertyCostImpact}
                      </Typography>
                    </Grid>

                    {overAllCost.map((value, index) => (
                      <>
                        <Grid item lg={6} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Cost type
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.costType}
                          </Typography>
                        </Grid>
                      </>
                    ))}
                    {overAllCost.map((value, index) => (
                      <>
                        <Grid item lg={6} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Cost amount
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.costAmount}
                          </Typography>
                        </Grid>
                      </>
                    ))}
                    {overAllCost.map((value, index) => (
                      <>
                        <Grid item lg={6} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Casual factor
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.casualFactor}
                          </Typography>
                        </Grid>
                      </>
                    ))}
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Action taken</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container item xs={12} spacing={3}>
                {investigationOverview.map((value, index) => (
                  <>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Pre event mitigations
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.preEventMitigations}
                      </Typography>
                    </Grid>
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Correction action closedAt
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.correctionActionClosedAt}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </PapperBlock>
  );
};
export default InvestigationSummary;
