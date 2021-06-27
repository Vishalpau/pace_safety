import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
}));

const IncidentDetailsSummary = () => {
  const [incidents, setIncidents] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [enviornmentData, setEnviornmentData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);
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

  useEffect(() => {
    fetchIncidentData();
    fetchPeopleAffectData();
    fetchPropertyAffectData();
    fetchEquipmentAffectData();
    fetchEnviornmentAffectData();
    fetchReportsData();
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={3}>
     
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident Overview
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="h6">
          {/* {item[1]["incidentTitle"]} */}
          {incidents.incidentTitle}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident on
        </Typography>
        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {moment(incidents["incidentOccuredOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported on
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {moment(incidents["incidentReportedOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Reported by
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["incidentReportedByName"]}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident Type
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["incidentReportedByName"]}
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incidnet Description
        </Typography>

        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["incidentDetails"]}
        </Typography>
      </Grid>
      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Immediate Action Taken
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["immediateActionsTaken"]}
        </Typography>
      </Grid>

      <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Incident Location
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["incidentLocation"]}
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Contractor
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["contractor"]}
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
          Sub-contractor
        </Typography>

        <Typography
          variant="body"
          color="textSecondary"
          className={Fonts.labelValue}
        >
          {incidents["subContractor"]}
        </Typography>
      </Grid>

      {/* people block       */}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>People Affected</Typography>
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
                      {key + 1}: Details of People
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person Department
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.personDepartment}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person Name
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.personName}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person Type
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.personType}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person Identification Number
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.personIdentification}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Person Department
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.personDepartment}
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
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.locationAssessmentCenter}
                    </Typography>
                  </Grid>
                  <Grid item item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Worker offsite Assesments
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {peopledata.workerOffsiteAssessment}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            : null}
        </AccordionDetails>
      </Accordion>

      {/* {propertyData.length !== 0 ? (
        <Grid item md={12}>
          <Typography variant={12}>Property Affect</Typography>
        </Grid>
      ) : null} */}
      <Grid item lg={12}>

      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Property Affected </Typography>
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
                      Property Type
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
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
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {propertydata.propertyOtherType}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Damage Details
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {propertydata.damageDetails}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            : null}
        </AccordionDetails>
      </Accordion>

      </Grid>


      <Grid item lg={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Equipment Affected </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {equipmentData.length !== 0
            ? equipmentData.map((equipmentdata, key) => (
                <Grid container item xs={12} spacing={3} key={key}>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment Type
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {equipmentdata.equipmentType}
                    </Typography>
                  </Grid>
                  <Grid item md={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {key + 1}: Details of Equipment
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment Details
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {equipmentdata.equipmentDeatils}
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Equipment Other type
                    </Typography>
                    <Typography
                      variant="p"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {equipmentdata.equipmentOtherType}
                    </Typography>
                  </Grid>
                </Grid>
              ))
            : null}
        </AccordionDetails>
      </Accordion>
      </Grid>
      <Grid item lg={12}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}> Enviroment Affected </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {enviornmentData.length !== 0
            ? enviornmentData.map((envData) => (
                <>
                  <Grid item lg={12}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      {envData.envQuestion}
                    </Typography>
                  </Grid>
                  <Grid item lg={12}>
                    <Typography
                      variant="body"
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {envData.envQuestionOption}
                    </Typography>
                  </Grid>
                </>
              ))
            : null}
        </AccordionDetails>
      </Accordion>
      </Grid>


      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>
            Reports & Noticefication
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {reportsData.length !== 0
            ? reportsData.map((report) => (
                <>
                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Reported To
                    </Typography>

                    <Typography
                      variant="body"
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {report.reportTo}
                    </Typography>
                  </Grid>

                  <Grid item md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      className={Fonts.labelName}
                    >
                      Report Description
                    </Typography>

                    <Typography
                      variant="body"
                      color="textSecondary"
                      className={Fonts.labelValue}
                    >
                      {report.reportingNote}
                    </Typography>
                  </Grid>
                </>
              ))
            : null}
        </AccordionDetails>
      </Accordion>

     
      
    </Grid>
  );
};
export default IncidentDetailsSummary;
