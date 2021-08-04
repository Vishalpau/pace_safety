import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import { saveAs } from "file-saver";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import { useHistory, useParams } from "react-router";

import api from "../../utils/axios";
import checkValue from "../../utils/CheckerValue";
import Attachment from "../Attachment/Attachment";

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
    padding: theme.spacing(4),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InvestigationSummary = () => {
  const { id } = useParams();
  const [investigationOverview, setInvestigationOverview] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [weather, setWeather] = useState([]);
  const [overAllCost, setOverAllCost] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [workerData, setWorkerData] = useState([]);
  const putId = useRef("");
  const eventId = useRef("");
  const investigationId = useRef("");

  const fetchInvestigationData = async () => {
    let res = await api.get(`/api/v1/incidents/${id}/investigations/`);
    let result = res.data.data.results;
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
    let res = await api.get(
      `api/v1/incidents/${id}/investigations/${investigationId.current
      }/workers/`
    );
    let result = res.data.data.results;
    await setWorkerData(result);
  };

  const handelCallBack = async () => {
    await fetchInvestigationData();
    await fetchEventData();
    await fecthWorkerData();
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [documentUrl, setDocumentUrl] = useState("");
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  if (id) {
    localStorage.setItem("fkincidentId", id);
  }
  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const download = (image_link) => {
    let onlyImage_url = image_link.replace("https://", "");
    let image_url = "http://cors.digiqt.com/" + onlyImage_url;
    let imageArray = image_url.split("/");
    let image_name = imageArray[imageArray.length - 1];
    saveAs(image_url, image_name);
    handleClose();
  };

  const handelInvestigation = (e, value) => {
    if (value = "modify") {
      history.push(`/app/incident-management/registration/investigation/investigation-overview/${id}`)
    }
    else if (value = "add") {
      history.push(`/app/incident-management/registration/investigation/investigation-overview/`)
    }

  }

  useEffect(() => {
    if (id) {
      handelCallBack();
    }
  }, []);
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <Grid container spacing={3}>
      {console.log(investigationOverview)}
      {/* investigation overview */}
      {!isDesktop && (

        <Grid item xs={12}>
          {investigationOverview.length > 0 ?
            <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelInvestigation(e, "modify")}>
              Modify Investigation
            </Button>
            :
            <Button variant="outlined" startIcon={<EditIcon />} onClick={(e) => handelInvestigation(e, "add")}>
              Add Investigation
            </Button>
          }
        </Grid>
      )}
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
                  <Grid item xs={12}>
                    <Typography className={classes.heading}>
                      Construction manager
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography className={classes.heading}>
                      Hse specialist
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Contact no
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.hseSpecialistContactNo != ""
                        ? value.hseSpecialistContactNo
                        : "--"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Actual serverity level
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.actualSeverityLevel)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Potential serverity level
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.potentialSeverityLevel)}
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Health & Safety potential
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.healthSafetyPotential != null
                        ? value.healthSafetyPotential
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Environment-actual
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.environmentActual != null
                        ? value.environmentActual
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Environment-potential
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.environmentPotential != null
                        ? value.environmentPotential
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Regulatory actual
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.regulatoryActual != null
                        ? value.regulatoryActual
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Regulatory potential
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.regulatoryPotential != null
                        ? value.regulatoryPotential
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Reputation actual
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.reputationActual != null
                        ? value.reputationActual
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Reputation potential
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.reputationPotential != null
                        ? value.reputationPotential
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Financial actual
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.financialActual != null
                        ? value.financialActual
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Financial potential
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.financialPotential != null
                        ? value.financialPotential
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Highest potential impact receptor
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.highestPotentialImpactReceptor != null
                        ? value.highestPotentialImpactReceptor
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Classification
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.classification != null
                        ? value.classification
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Rca recommended
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.rcaRecommended != null
                        ? value.rcaRecommended
                        : "-"}
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
            <Typography className={classes.heading}>Worker details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <paper>
              <Grid container item xs={12} spacing={3}>
                {workerData.map((value, index) => (
                  <>
                    {/* worker number */}
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        {`Worker ${index + 1}`}
                      </Typography>
                    </Grid>

                    {/* worker details */}
                    <Grid item xs={12}>
                      <Typography>Worker details</Typography>
                    </Grid>

                    {/* name */}
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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
                    <Grid item xs={12} md={6}>
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

                    {/* working hours */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Working hours.
                      </Typography>
                      {value.workHours !== null ? (
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.workHours}
                        </Typography>
                      ) : (
                        "-"
                      )}
                    </Grid>

                    {/* shift time start */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        shift time start
                      </Typography>
                      {value.shiftTimeStart !== null ? (
                        <Typography variant="body" className={Fonts.labelValue}>
                          {moment(value.shiftTimeStart).format("h:mm:ss a")}
                        </Typography>
                      ) : (
                        "-"
                      )}
                    </Grid>

                    {/* shift type */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        shift type
                      </Typography>
                      {checkValue(value.shiftType)}
                    </Grid>

                    {/* occupatione */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Occupation
                      </Typography>

                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.occupation)}
                      </Typography>
                    </Grid>

                    {/* shift cycle */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Shift cycle
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.shiftCycle)}
                      </Typography>
                    </Grid>

                    {/* No of days into shift */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        No of days into shift
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.noOfDaysIntoShift)}
                      </Typography>
                    </Grid>

                    {/* time in company */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Time in company
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.timeInCompany)}
                      </Typography>
                    </Grid>

                    {/* time on project */}
                    {value.timeOnProject !== null ? (
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Time on project
                        </Typography>
                        <Typography variant="body" className={Fonts.labelValue}>
                          {value.timeOnProject}
                        </Typography>
                      </Grid>
                    ) : (
                      "-"
                    )}

                    {/* time in industry*/}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Time in industry
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.timeInIndustry)}
                      </Typography>
                    </Grid>

                    {/* injurty details */}
                    <Grid item xs={12}>
                      <Typography variant="h6">Injurty details</Typography>
                    </Grid>

                    {/* event injury */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Event leading to injurty.
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.eventLeadingToInjury)}
                      </Typography>
                    </Grid>

                    {/* injury object */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Injury object
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.injuryObject)}
                      </Typography>
                    </Grid>

                    {/* Primary body part with side */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Primary body part with side
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.primaryBodyPartWithSide)}
                      </Typography>
                    </Grid>

                    {/* Secondary body part with side */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Secondary body part with side
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.secondaryBodyPartWithSide)}
                      </Typography>
                    </Grid>

                    {/* type of injury */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Type of injury
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.typeOfInjury)}
                      </Typography>
                    </Grid>

                    {/* Number of days away */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Number of days away
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.NoOfDaysAway)}
                      </Typography>
                    </Grid>

                    {/* Medical response taken */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Medical response taken
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.medicalResponseTaken)}
                      </Typography>
                    </Grid>

                    {/* treatment date */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Treatment date
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {value.treatmentDate !== null &&
                          value.treatmentDate !== undefined ? (
                          value.treatmentDate.substring(0, 10)
                        ) : (
                          <p>-</p>
                        )}
                      </Typography>
                    </Grid>

                    {/* injury status */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Injury status
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.injuryStatus)}
                      </Typography>
                    </Grid>

                    {/* first aid treatment */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        First aid treatment
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.firstAidTreatment)}
                      </Typography>
                    </Grid>

                    {/* mechanismOfInjury */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Mechanism of injury
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.mechanismOfInjury)}
                      </Typography>
                    </Grid>

                    {/* Worker care */}
                    <Grid item xs={12}>
                      <Typography variant="h6">Worker care</Typography>
                    </Grid>

                    {/* medical issue */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Medical issue ?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.isMedicationIssued)}
                      </Typography>
                    </Grid>

                    {/* prescription issues */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Prescription issued ?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.isPrescriptionIssued)}
                      </Typography>
                    </Grid>

                    {/* non-prescription */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Non-prescription ?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.isNonPrescription)}
                      </Typography>
                    </Grid>

                    {/* any limitation */}

                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Any limitation
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.isAnyLimitation)}
                      </Typography>
                    </Grid>

                    {/* alcohal and drug test */}
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        Alcohal and drug test
                      </Typography>
                    </Grid>

                    {/* test taken */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Was the test taken?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.isAlcoholDrugTestTaken)}
                      </Typography>
                    </Grid>

                    {value.isAlcoholDrugTestTaken == "Yes" &&
                      value.isWorkerClearedTest !== null ? (
                      <>
                        {value.dateOfAlcoholDrugTest !== null ? (
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Date of the test
                            </Typography>

                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              {value.dateOfAlcoholDrugTest.substring(0, 10)}
                            </Typography>
                          </Grid>
                        ) : null}
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Was worker cleared to work following a&d testing ?
                          </Typography>

                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.isWorkerClearedTest}
                          </Typography>
                        </Grid>
                      </>
                    ) : null}

                    {/* supervisor details */}
                    <Grid item xs={12}>
                      <Typography variant="h6">Supervisor details</Typography>
                    </Grid>

                    {/* supervisor name */}
                    <Grid item lg={6} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Supervisor name
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.supervisorName)}
                      </Typography>
                    </Grid>

                    {/* supervisor time industry */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Supervisor time in industry?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.supervisorTimeInIndustry)}
                      </Typography>
                    </Grid>

                    {/* supervisor time company */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Supervisor time in company?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.supervisorTimeInCompany)}
                      </Typography>
                    </Grid>

                    {/* supervisor time project */}
                    <Grid item xs={12} md={6}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        Supervisor time on project?
                      </Typography>
                      <Typography variant="body" className={Fonts.labelValue}>
                        {checkValue(value.supervisorTimeOnProject)}
                      </Typography>
                    </Grid>

                    {/* attachment */}
                    <Grid item xs={12}>
                      <Typography variant="h6">Attachment</Typography>
                    </Grid>
                    {value.attachments != "" &&
                      typeof value.attachments == "string" ? (
                      <Grid item xs={12} md={6}>
                        <Tooltip title="File Name">
                          <IconButton
                            onClick={() => handleOpen(value.attachments)}
                            className={classes.fileIcon}
                          >
                            <Attachment value={value.attachments} />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    ) : null}
                  </>
                ))}
              </Grid>
            </paper>
          </AccordionDetails>
        </Accordion>
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          keepMounted
          PaperProps={{
            style: {
              width: 700,
            },
          }}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {" Please choose what do you want to?"}
          </DialogTitle>
          <IconButton onClick={handleClose} className={classes.closeButton}>
            <Close />
          </IconButton>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="contained"
                    disableElevation
                    className={classes.modalButton}
                    href={`${documentUrl}`}
                    target="_blank"
                  >
                    View Attachment
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    startIcon={<VisibilityIcon />}
                    variant="contained"
                    disableElevation
                    className={classes.modalButton}
                    onClick={(e) => download(documentUrl)}
                  >
                    Download Attachment
                  </Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment involved
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.equipmentInvolved)}
                    </Typography>
                  </Grid>
                  {weather.map((value, index) => (
                    <>
                      <Grid item xs={12} md={6}>
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

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Temperature
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.temperature)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Lighting
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.lighting)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Speed
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.windSpeed)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Direction
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.windDirection)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Fluid type
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.spillsFluidType)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Fluid amount
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.spillsFluidAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      AEL
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.acceptableExplosiveLimit)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      PEL
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.permissableExplosiveLimit)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Property impact information
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.propertyImpactInformation)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Property cost impact
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {checkValue(value.propertyCostImpact)}
                    </Typography>
                  </Grid>

                  {overAllCost.map((value, index) => (
                    <>
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={6}>
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
                      <Grid item xs={12} md={6}>
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
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Pre-event mitigations
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.preEventMitigations != null
                        ? value.preEventMitigations
                        : "-"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Correction action date completed
                    </Typography>
                    <Typography variant="body" className={Fonts.labelValue}>
                      {value.correctionActionClosedAt != null
                        ? value.correctionActionClosedAt.substring(0, 10)
                        : "-"}
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
