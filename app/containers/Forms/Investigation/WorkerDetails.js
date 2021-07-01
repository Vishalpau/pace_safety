import React from "react";
import { Button, Grid, Select, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const WorkerDetails = () => {
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
    <PapperBlock title="Details of person Affected" icon="ion-md-list-box">
      {/*
          <Box marginTop={3} marginBottom={4}>
            <Typography variant="subtitle1" gutterBottom>
              Potential Severity Level Scenerio
            </Typography>
          </Box> */}
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Healthy and Saftey - Actual Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Healthy and Saftey - Actual Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Healthy and Saftey - Potential Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Healthy and Saftey - Potential Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Environment - Actual Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Environment - Actual Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Environment - Potential Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Environment - Potential Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Regulatory - Actual Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label=" Regulatory - Actual Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Regulatory - Potential Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Regulatory - Potential Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Reputation - Actual Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Reputation - Actual Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Reputation - Potential Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Reputation - Potential Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Financial - Actual Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label=" Financial - Actual Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Financial - Potential Consquence
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Financial - Potential Consquence"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">
                Higest Potential Impactor Receptor
              </InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Higest Potential Impactor Receptor"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">Classification</InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Classification"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">RCA Recommended</InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="RCA Recommended"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <TextField
              className={classes.formControl}
              id="filled-basic"
              multiline
              variant="outlined"
              label="Others"
              rows="3"
            />
          </Grid>
          <Box marginTop={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/investigation-overview/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/property-impact-details/"
            >
              Next
            </Button>
          </Box>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Worker details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default WorkerDetails;
