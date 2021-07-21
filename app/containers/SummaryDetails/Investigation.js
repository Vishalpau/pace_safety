import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { useParams } from "react-router";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImageIcon from '@material-ui/icons/Image';
import Paper from "@material-ui/core/Paper";
import Divider from '@material-ui/core/Divider';


import api from "../../utils/axios";

// Styles
import Fonts from "dan-styles/Fonts.scss";

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
  workerPaper: {
    backgroundColor: "#808080",
  }
}));

const InvestigationSummary = () => {
  const { id } = useParams();
  const [investigationOverview, setInvestigationOverview] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [overAllCost, setOverAllCost] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [workerData, setWorkerData] = useState([])
  const putId = useRef("");
  const eventId = useRef("");
  const investigationId = useRef("");

  const fetchInvestigationData = async () => {
    let res = await api.get(`/api/v1/incidents/${id}/investigations/`);
    let result = res.data.data.results;
    console.log(result)
    await setInvestigationOverview(result);
  };

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
        `api/v1/incidents/${putId.current}/investigations/${investigationId.current
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
        `api/v1/incidents/${putId.current}/investigations/${investigationId.current
        }/events/${eventId.current}/weatherconditions/`
      );
      console.log(weather);
      const weatherData = weather.data.data.results;
      await setWeather(weatherData);

      // event data
      const cost = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${investigationId.current
        }/events/${eventId.current}/cost/`
      );
      const costData = cost.data.data.results;
      await setOverAllCost(costData);
    }
  };

  const fecthWorkerData = async () => {
    console.log("here")
    let res = await api.get(`api/v1/incidents/${id}/investigations/${investigationId.current}/workers/`);
    let result = res.data.data.results;
    await setWorkerData(result);
    console.log(result)
  };

  const handelCallBack = async () => {
    await fetchInvestigationData();
    await fetchEventData();
    await fecthWorkerData();

  }

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (id) {
      handelCallBack()
    }
  }, []);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>

      {/* investigation overview */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleExpand("panel1")}
        >
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
      </Grid>

      {/* severity consequences */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleExpand("panel2")}
        >
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
      </Grid>

      {/* worker details */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleExpand("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Worker details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <paper>
              <Grid container item xs={12} spacing={3}>
                {workerData.map((value, index) => (
                  <>
                    {/* worker number */}
                    <Grid item lg={12}>
                      <Typography variant="h7">
                        {`Worker ${index + 1}`}
                      </Typography>
                    </Grid>

                    {/* worker details */}

                    {/* name */}
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Name
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.name}
                      </Typography>
                    </Grid>

                    {/* worker type */}
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Worker type
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.workerType}
                      </Typography>
                    </Grid>

                    {/* department */}
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Department
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.department}
                      </Typography>
                    </Grid>

                    {/* injurty details */}
                    {/* event injury */}

                    {value.eventLeadingToInjury.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Event leading to injurty.
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.eventLeadingToInjury}
                        </Typography>
                      </Grid>
                      : null}

                    {/* injury object */}
                    {value.injuryObject.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Injury object
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.injuryObject}
                        </Typography>
                      </Grid>
                      : null}

                    {/* Worker care */}

                    {/* medical issue */}
                    {value.isMedicationIssued.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Medical issue ?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isMedicationIssued}
                        </Typography>
                      </Grid>
                      : null}

                    {/* prescription issues */}
                    {value.isPrescriptionIssued.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Prescription issued ?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isPrescriptionIssued}
                        </Typography>
                      </Grid>
                      : null}

                    {/* non-prescription */}
                    {value.isNonPrescription.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Non-prescription ?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isNonPrescription}
                        </Typography>
                      </Grid>
                      : null}

                    {/* any limitation */}
                    {value.isAnyLimitation.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Any limitation
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isAnyLimitation}
                        </Typography>
                      </Grid>
                      : null}

                    {/* alcohal and drug test */}

                    {/* test taken */}
                    {value.isAlcoholDrugTestTaken.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Was the test taken?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isAlcoholDrugTestTaken}
                        </Typography>
                      </Grid>
                      : null}

                    {value.isAlcoholDrugTestTaken == "Yes" && value.isWorkerClearedTest.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Was worker cleared to work following a&d testing ?
                        </Typography>

                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.isWorkerClearedTest}
                        </Typography>
                      </Grid>
                      : null}

                    {/* supervisor details */}

                    {/* supervisor name */}
                    {value.supervisorName.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Supervisor name
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.supervisorName}
                        </Typography>
                      </Grid>
                      : null}

                    {/* supervisor time industry */}
                    {value.supervisorTimeInIndustry.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Supervisor time in industry?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.supervisorTimeInIndustry}
                        </Typography>
                      </Grid>
                      : null}

                    {/* supervisor time company */}
                    {value.supervisorTimeInCompany.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Supervisor time in company?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.supervisorTimeInCompany}
                        </Typography>
                      </Grid>
                      : null}

                    {/* supervisor time project */}
                    {value.supervisorTimeOnProject.length > 0 ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Supervisor time on project?
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.supervisorTimeOnProject}
                        </Typography>
                      </Grid>
                      : null}

                    {/* attachmentr */}
                    {value.attachments != "" && typeof value.attachments == "string" ?
                      <Grid item lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Attachment
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.attachments != "" && typeof value.attachments == "string" ? <a target="_blank" href={value.attachments}>Image<ImageIcon /></a> : <p></p>}
                        </Typography>
                      </Grid>
                      : null}

                    <Grid item lg={12} md={12}>
                      <Divider />
                    </Grid>
                  </>
                ))}
              </Grid>
            </paper>
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* event details */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleExpand("panel4")}
        >
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
                        <Typography variant="body" className={Fonts.labelValue}>
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
                        <Typography variant="body" className={Fonts.labelValue}>
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
                        <Typography variant="body" className={Fonts.labelValue}>
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
                        <Typography variant="body" className={Fonts.labelValue}>
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
      </Grid>

      {/* Action taken */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleExpand("panel5")}
        >
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
  );
};
export default InvestigationSummary;
