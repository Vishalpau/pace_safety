import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Select, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MaterialDropZone, PapperBlock } from "dan-components";
import {
  // TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { FormHelperText, FormLabel } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useHistory, useParams } from "react-router";

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
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
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
  const [testTaken, seTesttaken] = useState(false);
  const [error, setError] = useState({});
  const severity_level = ["Level1", "Level2", "Level3", "Level4"];
  const [files, setFile] = React.useState([]);
  const history = useHistory();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No", "N/A"];
  const radioYesNo = ["Yes", "No"];

  const handelTestTaken = (e) => {
    if (e.target.value == "Yes") {
      console.log(e.target.value);
      seTesttaken(true);
    } else if (e.target.value == "No") {
      console.log(e.target.value);
      seTesttaken(false);
    }
  };

  const classes = useStyles();
  return (
    <PapperBlock title="Details of Person Affected" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6">Worker details</Typography>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Type</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Type"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* department */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Department</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Department"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              error={error && error.constructionManagerName}
              helperText={error.constructionManagerName}
              label="Number of scheduled work hours"
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          {/* start of shift */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Start of shift time</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Start of shift time"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* type of shift */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Type of shift</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Type of shift"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Occupation */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Occupation</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Occupation"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* Shift cycle */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Shift cycle</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Shift cycle"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* number of days */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Number of days into shift
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Number of days into shift"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* time in comapany */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              required
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Time in company</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Time in company"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              required
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Time on project</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Time on project"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* time in industry */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              required
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Time in industry</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Time in industry"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* injury     */}
          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">Injury details</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Event leading to injury"
              className={classes.formControl}
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          {/* injury object */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Injury object"
              className={classes.formControl}
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          {/* primary body part included */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Primary body part side included
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Primary body part side included"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Secondary body part included
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Secondary body part included"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Type of injury illness
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Type of injury illness"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* day away/restriction */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Number of days away/on restriction"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          {/* medical response */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Medical response taken"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          {/* treatment date  */}
          <Grid item md={6}>
            <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={error.incidentdate}
                required
                className={classes.formControl}
                label="Treatment date"
                helperText={error.incidentdate ? error.incidentdate : null}
                // onChange={(e) => {
                //   console.log(e);
                //   setForm({
                //     ...form,
                //     incidentdate: moment(e).toDate(),
                //   });
                // }}
                format="yyyy/MM/dd"
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </Grid>

          {/* highest medical responder */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Highest medical responder
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Highest medical responder"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* status update    */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Status update"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.actualSeverityLevel}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">First aid treatment</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="First aid treatment"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              error={error && error.actualSeverityLevel}
              required
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">Mechanism of injury</InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Mechanism of injury"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">Worker care</Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Medical issued?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Prescription issues?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Non-prescription?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Any limitation?"
              error={error && error.constructionManagerName}
              helperText={
                error && error && error.constructionManagerName
                  ? error && error.constructionManagerName
                  : null
              }
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">Alcohal and drug test</Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Was the test taken?</FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                defaultValue="No"
                onChange={(e) => handelTestTaken(e)}
              >
                {radioYesNo.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          {testTaken ? (
            <>
              <Grid item md={6}>
                <MuiPickersUtilsProvider
                  variant="outlined"
                  utils={DateFnsUtils}
                >
                  <KeyboardDatePicker
                    error={error.incidentdate}
                    required
                    className={classes.formControl}
                    label="Date of Test"
                    helperText={error.incidentdate ? error.incidentdate : null}
                    // onChange={(e) => {
                    //   console.log(e);
                    //   setForm({
                    //     ...form,
                    //     incidentdate: moment(e).toDate(),
                    //   });
                    // }}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={6}>
                {/* <p>Was worker cleared to work following A&D testing?</p> */}
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Was worker cleared to work following a&d testing?
                  </FormLabel>
                  <RadioGroup className={classes.inlineRadioGroup}>
                    {radioYesNo.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          ) : (
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Why was the test not conducted?"
                className={classes.formControl}
                error={error && error.constructionManagerName}
                helperText={
                  error && error.constructionManagerName
                    ? error.constructionManagerName
                    : null
                }
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     constructionManagerName: e.target.value,
                //   });
                // }}
              />
            </Grid>
          )}

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">
                Supervisor details for worker
              </Typography>
            </Box>
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor name</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor name"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
            {error && error.constructionManagerName && (
              <p>{error.constructionManagerName}</p>
            )}
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor time in industry</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor time in industry"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor time in company</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor time in company"
              className={classes.formControl}
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor time on project"
              className={classes.formControl}
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     constructionManagerName: e.target.value,
              //   });
              // }}
            />
          </Grid>

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">Attachment</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} justify="flex-start">
            <MaterialDropZone
              files={files}
              showPreviews
              maxSize={5000000}
              filesLimit={5}
              text="Drag and drop file(s) here or click the button below"
              showButton
              // onDrop={handleDrop}
            />
            {error && error.fileupload ? <p>{error.fileupload}</p> : null}
          </Grid>

          <Grid item md={12}>
            <button
              className={classes.textButton}
              onClick={(e) =>
                history.push(
                  "/app/incident-management/registration/investigation/worker-details/"
                )
              }
            >
              Add new worker
            </button>
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/investigation/investigation-overview/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="/app/incident-management/registration/investigation/property-impact-details/"
            >
              Next
            </Button>
          </Grid>
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
