import React, { useEffect, useState } from "react";
import { Button, Grid, Container, Input, Select } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import initialdetailvalidate from "../../Validator/InitialDetailsValidation";
import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ".5rem 0",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    padding: ".75rem 0",
  },
}));

const InvestigationOverview = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];
  const notificationSent = ["Manage", "SuperVisor"];

  const selectValues = [1, 2, 3, 4];
  const [error, setError] = useState({});
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  // const [form, setForm] = React.useState({
  //   unitconstructionmanagername: "",
  //   unitconstructionmanagercontact: "",
  //   unithsespecialistname: "",
  //   unithsespecialistcontactno: "",
  //   actualseveritylevel: "",
  //   potentialseveritylevel: "",
  //   activity: "",
  //   jobtask: "",
  //   equipmentinvoked: "",
  //   weather: "",
  //   weather2: "",
  //   temprature:"",
  //   lighting: "",
  //   windspeed: "",
  //   fluidamount: "",
  //   fluidtype: "",
  //   ael: "",
  //   pel:"",
  //   pel:"",
  //   pel:"",
  // });

  const [form, setForm] = useState({
    levelOfInvestigation: "",
    srartDate: "",
    endDate: "",
    constructionManagerName: "",
    constructionManagerContactNo: "",
    hseSpecialistName: "",
    hseSpecialistContactNo: "",
    actualSeverityLevel: "",
    potentialSeverityLevel: "",
    preEventMitigations: "string",
    correctionActionClosedAt: "2021-06-21T16:00:11.983Z",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: 92
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    console.log(form);
    // const { error, isValid } = initialdetailvalidate(form);
    // setError(error);
    // console.log(error, isValid);
    const res = api.post("api/v1/incidents/92/investigations/", form);
    // const nextPath =  JSON.parse(localStorage.getItem("nextPath"));
    // console.log(nextPath)
    if (res.status === 200) {
      console.log("request done")
    }

  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  
  

  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Investigation"} />
          </Box>
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Initial Details
            </Typography>
          </Box>
          <Box marginTop={3} marginBottom={4}>
            <Typography variant="subtitle1" gutterBottom borderBottom={1}>
              Incident number: nnnnnnn
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={6}>
                {/* <p>Unit Construction Manager Name</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit Construction Manager Name"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          constructionManagerName: e.target.value,
                        });
                      }}
                 />
                {error && error.constructionManagerName && <p>{error.constructionManagerName}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit Construction Manager Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit Construction Manager Contact"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          constructionManagerContactNo: e.target.value,
                        });
                      }}
                />{error && error.constructionManagerContactNo && <p>{error.constructionManagerContactNo}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit HSE Specialist Name </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE Specialist Name"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          hseSpecialistName: e.target.value,
                        });
                      }}
                />{error && error.hseSpecialistName && <p>{error.hseSpecialistName}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit HSE Specialist Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE Specialist Contact"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          hseSpecialistContactNo: e.target.value,
                        });
                      }}
                />{error && error.hseSpecialistContactNo && <p>{error.hseSpecialistContactNo}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Actual Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Actual Severity Level "
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          actualSeverityLevel: e.target.value,
                        });
                      }}
                />{error && error.actualSeverityLevel && <p>{error.actualSeverityLevel}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Potential Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Potential Severity Level"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          potentialSeverityLevel: e.target.value,
                        });
                      }}
                />{error && error.potentialSeverityLevel && <p>{error.potentialSeverityLevel}</p>}
              </Grid>
              <Grid item md={12}>
                {/* <h3>Event</h3> */}
                <Typography variant="h6" gutterBottom>
                  Event
                </Typography>
              </Grid>

              <Grid item md={6}>
                {/* <p>Activity</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Activity</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Activity"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          activity: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.activity && <p>{error.activity}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Project Name</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Project Name"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          projectname: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.projectname && <p>{error.projectname}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>Job Task</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Job Task</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Job Task"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          jobtask: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.jobtask && <p>{error.jobtask}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>Eqipment Invoked</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Eqipment Invoked"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          equipmentinvoked: e.target.value,
                        });
                      }}
                />{error && error.equipmentinvoked && <p>{error.equipmentinvoked}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p> Weather</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Weather</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Weather"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          weather: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.weather && <p>{error.weather}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Weather2</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Weather2</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Weather2"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          weather: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Temprature(c</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Temprature"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          temprature: e.target.value,
                        });
                      }}
                />{error && error.temprature && <p>{error.temprature}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Lighting</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Lighting</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Lighting"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          lighting: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.lighting && <p>{error.lighting}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Wind Speed</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Wind Speed"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          windspeed: e.target.value,
                        });
                      }}
                />{error && error.windspeed && <p>{error.windspeed}</p>}
              </Grid>
              <Grid item md={12}>
                {/* <h3>Event</h3> */}
                <Typography variant="h6" gutterBottom>
                  Event
                </Typography>
              </Grid>
              <Grid item md={6}>
                {/* <p>Fluid Amount</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Fluid Amount"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          fluidamount: e.target.value,
                        });
                      }}
                />{error && error.fluidamount && <p>{error.fluidamount}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>Fluid Type</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                >
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Fluid Type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Fluid Type"
                    onChange={(e) => {
                        setForm({
                          ...form,
                          fluidtype: e.target.value,
                        });
                      }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  {error && error.fluidtype && <p>{error.fluidtype}</p>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>AEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="AEL"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          ael: e.target.value,
                        });
                      }}
                />{error && error.ael && <p>{error.ael}</p>}
              </Grid>
              <Grid item md={6}>
                {/* <p>PEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="PEL"
                  className={classes.fullWidth}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          pel: e.target.value,
                        });
                      }}
                />{error && error.pel && <p>{error.pel}</p>}
              </Grid>
              <Box marginTop={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={()=>handleNext()}
                  // href="http://localhost:3000/app/incident-management/registration/investigation/investigation-overview/"
                >
                  Next
                </Button>
              </Box>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
              deleteForm={[1,2,3]}
                listOfItems={INVESTIGATION_FORM}
                selectedItem={"Initial details"}
              /> 
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default InvestigationOverview;
