import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Close from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import EditIcon from "@material-ui/icons/Edit";

import api from "../../utils/axios";
import { Link } from "react-router-dom";

// Styles
import Fonts from "dan-styles/Fonts.scss";
import "../../styles/custom.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
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
  incidentTitle: {
    fontSize: "1.35rem !important",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  modalButton: {
    width: "100%",
  },
}));

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IncidentDetailsSummary = () => {
  const [incidents, setIncidents] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [enviornmentData, setEnviornmentData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  const [evidence, setEvidence] = useState([]);

  const [documentUrl, setDocumentUrl] = useState("");

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

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
  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  const fkid = localStorage.getItem("fkincidentId");

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${fkid}/`);
    await setIncidents(allIncidents.data.data.results);
  };

  const fetchPeopleAffectData = async () => {
    const response = await api.get(`api/v1/incidents/${fkid}/people/`);
    await setPeopleData(response.data.data.results);
  };

  const fetchPropertyAffectData = async () => {
    const response = await api.get(`api/v1/incidents/${fkid}/properties/`);
    await setPropertyData(response.data.data.results);
  };

  const fetchEquipmentAffectData = async () => {
    const response = await api.get(`api/v1/incidents/${fkid}/equipments/`);
    await setEquipmentData(response.data.data.results);
  };

  const fetchEnviornmentAffectData = async () => {
    const response = await api.get(`api/v1/incidents/${fkid}/environment/`);
    await setEnviornmentData(response.data.data.results);
  };

  const fetchReportsData = async () => {
    const response = await api.get(`api/v1/incidents/${fkid}/reports/`);
    await setReportsData(response.data.data.results);
  };

  const fetchEvidanceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${fkid}/evidences/`);
    if (allEvidence.status === 200) {
      await setEvidence(allEvidence.data.data.results);
    }

    // await setIsLoding(true);
  };
  useEffect(() => {
    fetchIncidentData();
    fetchPeopleAffectData();
    fetchPropertyAffectData();
    fetchEquipmentAffectData();
    fetchEnviornmentAffectData();
    fetchReportsData();
    fetchEvidanceData();
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <Grid container spacing={3}>
      {!isDesktop && (
        <Grid item xs={12}>
          <Button variant="outlined" startIcon={<EditIcon />}>
            Modify Initial Notification
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident overview
        </Typography>
        <Typography
          className={classNames(classes.incidentTitle, Fonts.labelValue)}
        >
          {incidents.incidentTitle}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident on
        </Typography>
        <Typography className={Fonts.labelValue}>
          {moment(incidents["incidentOccuredOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item mxs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported on
        </Typography>

        <Typography variant="body" className={Fonts.labelValue}>
          {moment(incidents["incidentReportedOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported by
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentReportedByName"]}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident type
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentType"]}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident description
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentDetails"]}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Immediate action taken
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["immediateActionsTaken"]}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident location
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentLocation"] ? incidents["incidentLocation"] : "-"}
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Contractor
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["contractor"]}
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Sub-contractor
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["subContractor"]}
        </Typography>
      </Grid>
      {/* People Affected */}

      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleExpand("panel1")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>People affected</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {peopleData.length !== 0 ? (
              peopleData.map((peopledata, key) => (
                <Grid container item xs={12} spacing={3} key={key}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {key + 1}: Details of people
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person department
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.personDepartment}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person name
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.personName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person type
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.personType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person identification number
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.personIdentification}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Location
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.locationAssessmentCenter}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Worker offsite assessments
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {peopledata.workerOffsiteAssessment}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Do you have details of individual affected?
                </Typography>
                <Typography className={Fonts.labelValue}>
                  {incidents.isPersonDetailsAvailable}
                </Typography>
                <Typography className={Fonts.labelValue}>
                  Details of people affected:-
                  {incidents.personAffectedComments}
                </Typography>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Property affect */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleExpand("panel2")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Property affected
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {propertyData.length !== 0 ? (
              propertyData.map((propertydata, key) => (
                <Grid container item xs={12} spacing={3} key={key}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {key + 1}: Details of property
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Property type
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {propertydata.propertyType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Property other type
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {propertydata.propertyOtherType}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Damage details
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {propertydata.damageDetails}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Do you have details to share about the properties affected?
                </Typography>
                <Typography className={Fonts.labelValue}>
                  {incidents.isPropertyDamagedAvailable}
                </Typography>
                <Typography className={Fonts.labelValue}>
                  Details of property affected:-{" "}
                  {incidents.propertyDamagedComments}
                </Typography>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Equipment Affected */}

      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleExpand("panel3")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Equipment affected
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {equipmentData.length !== 0 ? (
              equipmentData.map((equipmentdata, key) => (
                <Grid
                  container
                  item
                  xs={12}
                  spacing={3}
                  key={key}
                  className="repeatedGrid"
                >
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {key + 1}: Details of equipment
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment type
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {equipmentdata.equipmentType}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment details
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {equipmentdata.equipmentDeatils}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment other type
                    </Typography>
                    <Typography className={Fonts.labelValue}>
                      {equipmentdata.equipmentOtherType}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Do you have details to share about the equipment affected?
                </Typography>
                <Typography className={Fonts.labelValue}>
                  {incidents.isEquipmentDamagedAvailable}
                </Typography>
                <Typography className={Fonts.labelValue}>
                  Details of equipment affected:-{" "}
                  {incidents.equipmentDamagedComments}
                </Typography>
              </Grid>
            )}
          </AccordionDetails>
        </Accordion>
      </Grid>

      {/* Environment Affected */}
      {enviornmentData.length ? (
        <Grid item xs={12}>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleExpand("panel4")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                Environment affected
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {enviornmentData.length !== 0
                ? enviornmentData.map((envData, key) => (
                    <Grid container item xs={12} spacing={3} key={key}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {key + 1}: {envData.envQuestion}
                        </Typography>

                        <Typography className={Fonts.labelValue}>
                          {envData.envQuestionOption}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography className={Fonts.labelValue}>
                          {"Answer Details:"} {envData.envAnswerDetails}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
            </AccordionDetails>
          </Accordion>
        </Grid>
      ) : null}
      {/* Reports & Noticefication */}
      <Grid item xs={12}>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleExpand("panel5")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Reporting & notification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported to
                </Typography>
                {reportsData.length !== 0
                  ? reportsData.map((report, key) => (
                      <Typography className={Fonts.labelValue}>
                        {report.reportTo}
                      </Typography>
                    ))
                  : null}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Additional Details
                </Typography>

                <Typography className={Fonts.labelValue}>
                  {incidents.notificationComments}
                </Typography>
              </Grid>
            </Grid>

            <>
              {evidence.length !== 0
                ? evidence
                    .filter(
                      (item) => item.evidenceCategory === "Initial Evidence"
                    )
                    .map((value, index) => (
                      <Grid
                        container
                        className="repeatedGrid"
                        item
                        xs={12}
                        spacing={3}
                      >
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Evidence No
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.evidenceNumber}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Evidence Check
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.evidenceCheck}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Evidence Category
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.evidenceCategory}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={Fonts.labelName}
                          >
                            Evidence Remark
                          </Typography>
                          <Typography
                            variant="body"
                            className={Fonts.labelValue}
                          >
                            {value.evidenceRemark}
                          </Typography>
                        </Grid>
                        {value.evidenceDocument ? (
                          <Grid item xs={12} md={6}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              className={Fonts.labelName}
                            >
                              Evidence Document
                            </Typography>
                            <Typography
                              variant="body"
                              className={Fonts.labelValue}
                            >
                              <Tooltip
                                title={handelFileName(value.evidenceDocument)}
                              >
                                <IconButton
                                  onClick={() =>
                                    handleOpen(value.evidenceDocument)
                                  }
                                  className={classes.fileIcon}
                                >
                                  <PhotoSizeSelectActualIcon />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          </Grid>
                        ) : null}
                      </Grid>
                    ))
                : null}
            </>
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
                    color="primary"
                    className={classes.modalButton}
                    href={`${documentUrl}`}
                    disableElevation
                    target="_blank"
                  >
                    View Attachment
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    startIcon={<GetAppIcon />}
                    variant="contained"
                    color="primary"
                    className={classes.modalButton}
                    disableElevation
                    onClick={() => download(documentUrl)}
                  >
                    Download
                  </Button>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
};
export default IncidentDetailsSummary;
