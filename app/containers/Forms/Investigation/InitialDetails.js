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

import FormSideBar from '../FormSideBar'
import { INVESTIGATION_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'

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
      <FormHeader selectedHeader = {"Investigation"}/>
        <Box padding={3} bgcolor="background.paper">
          <Typography variant="h5" gutterBottom>
            Initial Details
          </Typography>
          <Box marginTop={3} marginBottom={4}>
            <Typography variant="subtitle1" gutterBottom borderBottom={1}>
              Incident number: nnnnnnn
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item md={6}>
              {/* <p>Unit Construction Manager Name</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Unit Construction Manager Name"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>Unit Construction Manager Contact </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Unit Construction Manager Contact"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>Unit HSE Specialist Name </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Unit HSE Specialist Name"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>Unit HSE Specialist Contact </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Unit HSE Specialist Contact"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>Actual Severity Level </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Actual Severity Level "
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>Potential Severity Level </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Potential Severity Level"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid lg={12}>
              <h3>Event</h3>
            </Grid>

            <Grid item lg={6}>
              <p>Activity</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={6}>
              <p>Job Task</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={12}>
              {/* <p>Eqipment Invoked</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Eqipment Invoked"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6}>
              <p> Weather</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={6}>
              <p> Weather2</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={6}>
              {/* <p> Temprature(c</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Temprature"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6}>
              <p>Lighting</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={12}>
              {/* <p> Wind Speed</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Wind Speed"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid>
              <h4>Spills</h4>
            </Grid>
            <Grid item lg={6}>
              {/* <p>Fluid Amount</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Fluid Amount"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6}>
              <p>Fluid Type</p>
              <Select>
                <otion>1</otion>
                <otion>1</otion>
                <otion>1</otion>
              </Select>
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>AEL </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="AEL"
                className={classes.fullWidth}
              />
            </Grid>
            <Grid item lg={6} md={12} sm={12}>
              {/* <p>PEL </p> */}
              <TextField
                id="title"
                variant="outlined"
                label="PEL"
                className={classes.fullWidth}
              />
            </Grid>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Box>
        <Grid><FormSideBar listOfItems={INVESTIGATION_FORM} selectedItem={"Initial details"} /></Grid>
      </Paper>
    </Container>
  );
};

export default InitialDetails;
