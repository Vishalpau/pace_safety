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


import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Modal from "@material-ui/core/Modal";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import VisibilityIcon from "@material-ui/icons/Visibility";

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

function getModalStyle() {
  return {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const IncidentDetailsSummary = () => {
  const [incidents, setIncidents] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [enviornmentData, setEnviornmentData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
  const [evidence,setEvidence] = useState([]);

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
  // const [fkid, setFkid] = useState(3);

  // useEffect(() => {
  //     setFkid(localStorage.getItem("fkincidentId"))
  //   });

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
    if(allEvidence.status === 200){
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

  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Incident overview
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">{incidents.incidentTitle}</Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident on
        </Typography>
        <Typography className={Fonts.labelValue}>
          {moment(incidents["incidentOccuredOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported on
        </Typography>

        <Typography variant="body" className={Fonts.labelValue}>
          {moment(incidents["incidentReportedOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported by
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentReportedByName"]}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident type
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentType"]}
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident description
        </Typography>

        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Typography className={Fonts.labelValue}>
          {incidents["incidentDetails"]}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Immediate action taken
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["immediateActionsTaken"]}
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident location
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["incidentLocation"]}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Contractor
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["contractor"]}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Sub-contractor
        </Typography>

        <Typography className={Fonts.labelValue}>
          {incidents["subContractor"]}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>People affected</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {peopleData.length !== 0
              ? peopleData.map((peopledata, key) => (
                  <Grid container item xs={12} spacing={3} key={key}>
                    <Grid item md={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        {key + 1}: Details of people
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
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
                    <Grid item md={6}>
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
                    <Grid item md={6}>
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
                    <Grid item md={6}>
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
                   <Grid item md={6}>
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
                    <Grid item item md={6}>
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
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Property affected
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {propertyData.length !== 0
              ? propertyData.map((propertydata, key) => (
                  <Grid container item xs={12} spacing={3} key={key}>
                    <Grid item md={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        {key + 1}: Details of property
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
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
                    <Grid item md={6}>
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
                    <Grid item md={12}>
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
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>
      {/* Equipment Affected */}
      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Equipment affected
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {equipmentData.length !== 0
              ? equipmentData.map((equipmentdata, key) => (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={3}
                    key={key}
                    className="repeatedGrid"
                  >
                    <Grid item md={12}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        className={Fonts.labelName}
                      >
                        {key + 1}: Details of equipment
                      </Typography>
                    </Grid>
                    <Grid item md={6}>
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

                    <Grid item md={12}>
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
                    <Grid item md={6}>
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
              : null}
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid item xs={12}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Environment affected
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {enviornmentData.length !== 0
              ? enviornmentData.map((envData, key) => (
                  <Grid container item xs={12} spacing={3} key={key}>
                    <Grid item md={6}>
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
                    <Grid item md={12}>
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
      {/* Reports & Noticefication */}
      <Grid item xs={12}>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              Reporting & notification
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container item xs={12} spacing={3}>
              <Grid item md={6}>
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

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Report description
                </Typography>
                {reportsData.length !== 0
                  ? reportsData.map((report, key) => (
                      <Typography className={Fonts.labelValue}>
                        {report.reportingNote}
                      </Typography>
                    ))
                  : null}
              </Grid>
              
              <Grid item md={12}>
              {evidence.length !== 0
                  ? evidence.filter(item=> item.evidenceCategory === "Initial Evidence").map((value, index) => (
                      <Grid
                        key={index}
                        className="repeatedGrid"
                        container
                        item
                        md={12}
                        spacing={3}
                      >
                        <Grid container item xs={12} spacing={3}>
                          <Grid item lg={6} md={6}>
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
                          <Grid item lg={6} md={6}>
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
                          <Grid item lg={6} md={6}>
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
                          <Grid item lg={6} md={6}>
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
                            <Grid item lg={6} md={6}>
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
                                <Tooltip title="File Name">
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
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
       {/* Modal */}
        <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className={classes.paper}>
          <Typography variant="h6" gutterBottom>
            View Attachment
          </Typography>
          <Typography>Please choose what do you want to?</Typography>
          <Box marginTop={4}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  // startIcon={<VisibilityIcon />}
                  style={{ width: "100%" }}
                  variant="contained"
                  disableElevation
                  href={`${documentUrl}`}
                  target="_blank"
                >
                  View Attachment
                </Button>
              </Grid>
              <Grid item xs={6}>
                {/* <a href={`${documentUrl}`} download /> */}
              </Grid>
            </Grid>
          </Box>
        </div>
      </Modal>
   
      </Grid>
      
    </Grid>
  );
};
export default IncidentDetailsSummary;
