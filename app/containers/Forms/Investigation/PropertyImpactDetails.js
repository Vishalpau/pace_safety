import React from "react";
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

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const PropertyImpacetDetails = () => {
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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
              Details of Properties affected
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={12}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number: nnnnnnnnnn
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={6}>
                {/* <p>Unit Construction Manager Name</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit construction manager name"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                {/* <p>Unit Construction Manager Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit construction manager contact number"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                {/* <p>Unit HSE Specialist Name </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE specialist"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                {/* <p>Unit HSE Specialist Contact </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Unit HSE specialist contact number"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                {/* <p>Actual Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Actual severity level "
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item lg={6} md={12} sm={12}>
                {/* <p>Potential Severity Level </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Potential severity level"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={12}>
                {/* <h3>Event Details</h3> */}
                <Typography variant="h6">Event Details</Typography>
              </Grid>

              <Grid item lg={6}>
                {/* <p>*Activity</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Activity</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Activity"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6}>
                {/* <p>*Job Task</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">Job Task</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Job Task"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>Eqipment Invoked</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Eqipment Invoked"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={6}>
                {/* <p> Weather</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Weather</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Weather"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Weather2</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Weather2</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Weather2"
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
                />
              </Grid>
              <Grid item md={6}>
                {/* <p>Lighting</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Lighting</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Lighting"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p> Wind Speed</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Wind Speed"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={12}>
                <Typography variant="h6">Spills</Typography>
              </Grid>
              <Grid item md={6}>
                {/* <p>Fluid Amount</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Fluid Amount"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={6}>
                {/* <p>Fluid Type</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Fluid Type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Fluid Type"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                {/* <p>AEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="AEL"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={6}>
                {/* <p>PEL </p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="PEL"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  href="http://localhost:3000/app/incident-management/registration/investigation/worker-details/"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href="http://localhost:3000/app/incident-management/registration/investigation/equiptment-impact-details/"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
              deleteForm={[1,2,3]}
                listOfItems={INVESTIGATION_FORM}
                selectedItem={"Property impact details"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PropertyImpacetDetails;
