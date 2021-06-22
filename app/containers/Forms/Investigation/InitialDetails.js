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
import FormHelperText from "@material-ui/core/FormHelperText";


import initialdetailvalidate from "../../Validator/InitialDetailsValidation";
import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

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

const InitialDetails = () => {
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

  const [form, setForm] = useState({
    unitconstructionmanagername: "",
    unitconstructionmanagercontact: "",
    unithsespecialistname: "",
    unithsespecialistcontactno: "",
    actualseveritylevel: "",
    potentialseveritylevel: "",
    activity: "",
    projectname: "",
    jobtask: "",
    equipmentinvoked: "",
    weather: "",
    weather2: "",
    temprature:"",
    lighting: "",
    windspeed: "",
    fluidamount: "",
    fluidtype: "",
    ael: "",
    pel:"",
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleNext = () => {
    console.log('sagar',form);
    const { error, isValid } = initialdetailvalidate(form);
    setError(error);
    console.log(error, isValid);
    // const nextPath =  JSON.parse(localStorage.getItem("nextPath"));
    // console.log(nextPath)

    
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
                  error = {error.unitconstructionmanagername}
                  helperText = {error.unitconstructionmanagername ? error.unitconstructionmanagername : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          unitconstructionmanagername: e.target.value,
                        });
                      }}
                 />
                {/* {error && error.unitconstructionmanagername && <FormHelperText>{error.unitconstructionmanagername}</FormHelperText>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit Construction Manager Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit Construction Manager Contact"
                  className={classes.fullWidth}
                  error = {error.unitconstructionmanagercontact}
                  helperText = {error.unitconstructionmanagercontact ? error.unitconstructionmanagercontact : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          unitconstructionmanagercontact: e.target.value,
                        });
                      }}
                />
                {/* {error && error.unitconstructionmanagercontact && <p>{error.unitconstructionmanagercontact}</p>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit HSE Specialist Name </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE Specialist Name"
                  className={classes.fullWidth}
                  error = {error.unithsespecialistname}
                  helperText = {error.unithsespecialistname ? error.unithsespecialistname : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          unithsespecialistname: e.target.value,
                        });
                      }}
                />
                {/* {error && error.unithsespecialistname && <p>{error.unithsespecialistname}</p>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit HSE Specialist Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE Specialist Contact"
                  className={classes.fullWidth}
                  error={error.unithsespecialistcontactno}
                  helperText = {error.unithsespecialistcontactno ? error.unithsespecialistcontactno : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          unithsespecialistcontactno: e.target.value,
                        });
                      }}
                />
                {/* {error && error.unithsespecialistcontactno && <p>{error.unithsespecialistcontactno}</p>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Actual Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Actual Severity Level "
                  className={classes.fullWidth}
                  error = {error.actualseveritylevel}
                  helperText = {error.actualseveritylevel ? error.actualseveritylevel : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          actualseveritylevel: e.target.value,
                        });
                      }}
                />
                {/* {error && error.actualseveritylevel && <p>{error.actualseveritylevel}</p>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Potential Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Potential Severity Level"
                  className={classes.fullWidth}
                  error = {error.potentialseveritylevel}
                  helperText = {error.potentialseveritylevel ? error.potentialseveritylevel : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          potentialseveritylevel: e.target.value,
                        });
                      }}
                />
                {/* {error && error.potentialseveritylevel && <p>{error.potentialseveritylevel}</p>} */}
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
                  error = {error.activity}
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
                  {error && error.activity && <FormHelperText>{error.activity}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                  error = {error.projectname}
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
                  {error && error.projectname && <FormHelperText>{error.projectname}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>Job Task</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                  error = {error.jobtask}
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
                  {error && error.jobtask && <FormHelperText>{error.jobtask}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>Eqipment Invoked</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Eqipment Invoked"
                  className={classes.fullWidth}
                  error = {error.equipmentinvoked}
                  helperText = {error.equipmentinvoked ? error.equipmentinvoked : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          equipmentinvoked: e.target.value,
                        });
                      }}
                />
                {/* {error && error.equipmentinvoked && <FormHelperText>{error.equipmentinvoked}</FormHelperText>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p> Weather</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                  error = {error.weather}
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
                  {error && error.weather && <FormHelperText>{error.weather}</FormHelperText>}
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
                  error = {error.temprature}
                  helperText = {error.temprature ? error.temprature : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          temprature: e.target.value,
                        });
                      }}
                />
                {/* {error && error.temprature && <FormHelperText>{error.temprature}</FormHelperText>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Lighting</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                  error={error.lighting}
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
                  {error && error.lighting && <FormHelperText>{error.lighting}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Wind Speed</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Wind Speed"
                  className={classes.fullWidth}
                  error={error.windspeed}
                  helperText = {error.windspeed ? error.windspeed : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          windspeed: e.target.value,
                        });
                      }}
                />
                {/* {error && error.windspeed && <FormHelperText>{error.windspeed}</FormHelperText>} */}
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
                  error={error.fluidamount}
                  helperText = {error.fluidamount ? error.fluidamount : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          fluidamount: e.target.value,
                        });
                      }}
                />
                {/* {error && error.fluidamount && <FormHelperText>{error.fluidamount}</FormHelperText>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>Fluid Type</p> */}
                <FormControl
                  required
                  variant="outlined"
                  className={classes.formControl}
                  error = {error.fluidtype}
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
                  {error && error.fluidtype && <FormHelperText>{error.fluidtype}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>AEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="AEL"
                  className={classes.fullWidth}
                  error = {error.ael}
                  helperText = {error.ael ? error.ael : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          ael: e.target.value,
                        });
                      }}
                />
                {/* {error && error.ael && <FormHelperText>{error.ael}</FormHelperText>} */}
              </Grid>
              <Grid item md={6}>
                {/* <p>PEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="PEL"
                  className={classes.fullWidth}
                  error = {error.pel}
                  helperText = {error.pel ? error.pel : ""}
                  onChange={(e) => {
                        setForm({
                          ...form,
                          pel: e.target.value,
                        });
                      }}
                />
                {/* {error && error.pel && <FormHelperText>{error.pel}</FormHelperText>} */}
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
              {/* <FormSideBar
                listOfItems={INVESTIGATION_FORM}
                selectedItem={"Initial details"}
              /> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default InitialDetails;
