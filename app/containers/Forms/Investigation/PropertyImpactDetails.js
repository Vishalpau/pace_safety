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
import { PapperBlock } from "dan-components";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import Type from '../../../styles/components/Fonts.scss';

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
    <PapperBlock title="Details of Properties Affected" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>
              <Typography className={Type.labelValue} >
                487657646
              </Typography>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Unit Construction Manager Name"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <TextField
              id="title"
              variant="outlined"
              label="Unit Construction Manager Contact Number"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <TextField
              id="title"
              variant="outlined"
              label="Unit HSE Specialist"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <TextField
              id="title"
              variant="outlined"
              label="Unit HSE Specialist Contact Number"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <TextField
              id="title"
              variant="outlined"
              label="Actual Severity Level"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <TextField
              id="title"
              variant="outlined"
              label="Potential Severity Level"
              className={classes.fullWidth}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6">Event Details</Typography>
          </Grid>

          <Grid item lg={6}>
            <FormControl variant="outlined" className={classes.formControl}>
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
            <FormControl variant="outlined" className={classes.formControl}>
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
            <TextField
              id="title"
              variant="outlined"
              label="Equipment Invoked"
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
              href="http://localhost:3000/app/incident-management/registration/investigation/Equipment-impact-details/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Property Impact Details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default PropertyImpacetDetails;
