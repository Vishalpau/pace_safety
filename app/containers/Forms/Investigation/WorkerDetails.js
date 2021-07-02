import React, { useEffect, useState, useRef } from "react";
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
  const [testTaken, seTesttaken] = useState(false)
  const [error, setError] = useState({});
  const severity_level = ["Level1", "Level2", "Level3", "Level4"]
  const [files, setFile] = React.useState([]);
  const history = useHistory();


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No", "N/A"];
  const radioYesNo = ["Yes", "No"];

  const handelTestTaken = (e) => {
    if (e.target.value == "Yes") {
      console.log(e.target.value)
      seTesttaken(true)
    } else if (e.target.value == "No") {
      console.log(e.target.value)
      seTesttaken(false)
    }
  }


  const classes = useStyles();
  return (
    <PapperBlock title="Details of person Affected" icon="ion-md-list-box">
      <Grid container spacing={3}>
        {console.log(testTaken)}
        <Grid container item md={9} spacing={3}>
          {/* worker details */}
          <Grid item md={12}><h1>Worker Detais</h1></Grid>

          {/* name */}
          <Grid item md={6}>
            <p>Name</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* type    */}
          <Grid item md={6}>
            <p>Type</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* department */}
          <Grid item md={6}>
            <p>Department</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* number of hours */}
          <Grid item md={6}>
            <p>Number of scheduled work hours</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* start of shift */}
          <Grid item md={6}>
            <p>Start of shift time</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* type of shift */}
          <Grid item md={6}>
            <p>Type of shift</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* Occupation */}
          <Grid item md={6}>
            <p>Occupation</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* Shift cycle */}
          <Grid item md={6}>
            <p>Shift Cycle</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* number of days */}
          <Grid item md={6}>
            <p>Number of days into shify</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* time in comapany */}
          <Grid item md={6}>
            <p>Number of days into shify</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* time in industry */}
          <Grid item md={6}>
            <p>Number of days into shify</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* injury     */}
          <Grid item md={12}><h1>Injury deails</h1></Grid>

          {/* injury event */}
          <Grid item md={6}>
            <p>Event leading to injury</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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


          {/* injury object */}
          <Grid item md={6}>
            <p>Injury object</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* primary body part included */}
          <Grid item md={6}>
            <p>Primary Body part side included</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* secondary body part included */}
          <Grid item md={6}>
            <p>Secondary body part side included</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* injury illness  */}
          <Grid item md={6}>
            <p>Type of injury illness</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* day away/restriction */}
          <Grid item md={6}>
            <p>Number of day away/ on restriction</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* medical response */}
          <Grid item md={6}>
            <p>Medical response taken</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* treatment date  */}
          <Grid item md={6}>
            <p>Treatment date</p>
            <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={error.incidentdate}
                required
                className={classes.formControl}
                label="Incident Date"
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
            {/* {error && error.incidentdate && <p>{error.incidentdate}</p>} */}
          </Grid>

          {/* highest medical responder */}
          <Grid item md={6}>
            <p>Highest medical responder</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* status update    */}
          <Grid item md={6}>
            <p>Status update</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          {/* first aid  */}
          <Grid item md={6}>
            <p>First aid treatment</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* injury mechanism  */}
          <Grid item md={6}>
            <p>Mechanism of injury</p>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label"></InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Unit Name"
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
            </FormControl>
            {error && error.actualSeverityLevel && (
              <p>{error.actualSeverityLevel}</p>
            )}
          </Grid>

          {/* worker Care */}
          <Grid item md={12}><h1>Worker care</h1></Grid>

          {/* medical issued */}
          <Grid item md={6}>
            <p>Medical issued ?</p>
            <FormControl>
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
              >
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

          {/* precription issued */}
          <Grid item md={6}>
            <p>Prescription issued?</p>
            <FormControl>
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
              >
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

          {/* non prescription */}
          <Grid item md={6}>
            <p>Non-precription?</p>
            <FormControl>
              <FormLabel component="legend"></FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
              >
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

          {/* any limitaion */}
          <Grid item md={6}>
            <p>Any limitaion?</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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

          <Grid item md={12}><h1>Alcohal and drug test</h1></Grid>

          {/* test taken */}
          <Grid item md={12}>
            <p>Was the test taken ?</p>
            <FormControl>
              <FormLabel component="legend"></FormLabel>
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
          {testTaken ?
            <Grid>
              {/* date of test */}
              <Grid item md={6}>
                <p>Date of test</p>
                <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    error={error.incidentdate}
                    required
                    className={classes.formControl}
                    label="Incident Date"
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
                {/* {error && error.incidentdate && <p>{error.incidentdate}</p>} */}
              </Grid>

              {/* cleared test */}
              <Grid item md={6}>
                <p>Was worker cleared to work following A&D testing?</p>
                <FormControl>
                  <FormLabel component="legend"></FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
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
            </Grid>
            :
            <Grid>
              {/* test not conducted */}
              <Grid item md={6}>
                <p>Why was the test no conducted?</p>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Name"
                  className={classes.fullWidth}
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
            </Grid>
          }

          <Grid item md={12}><h1>Supervisor details for worker</h1></Grid>

          <Grid item md={6}>
            <p>Supervisor name</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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
            <p>Supervisor time in industry</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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
            <p>Supervisor time in company</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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
            <p>Supervisor time on project</p>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              className={classes.fullWidth}
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


          <Grid item md={12}><h1>Attachment</h1></Grid>

          <Grid item lg={12} justify="flex-start">

            <MaterialDropZone
              files={files}
              showPreviews
              maxSize={5000000}
              filesLimit={5}
              text="Drag and Drop File(s) Here or Click the Button Below"
              showButton
            // onDrop={handleDrop}
            />
            {error && error.fileupload ? <p>{error.fileupload}</p> : null}
          </Grid>

          <Grid item md={12}>
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => history.push("/app/incident-management/registration/investigation/worker-details/")}
              >
                Add new worker
              </Button>

            </Box>
          </Grid>

          <Grid item md={12}>
            <Box marginTop={4}>
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
            </Box>
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
    </PapperBlock >
  );
};

export default WorkerDetails;
