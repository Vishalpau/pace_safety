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
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { FormHelperText, FormLabel } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";

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
  
  const [form, setForm] = useState(
    // {
    //   name : "",
    //   workerType: "",
    //   department: "string",
    //   "workHours": "string",
    //   "shiftTimeStart": "2021-07-08T07:08:29.088000Z",
    //   "shiftType": "string",
    //   "occupation": "string",
    //   "shiftCycle": "string",
    //   "noOfDaysIntoShift": "string",
    //   "timeInCompany": "2021-07-08T07:08:29.088000Z",
    //   "timeOnProject": "2021-07-08T07:08:29.088000Z",
    //   "timeInIndustry": "2021-07-08T07:08:29.088000Z",
    //   "eventLeadingToInjury": "string",
    //   "injuryObject": "string",
    //   "primaryBodyPartWithSide": "string",
    //   "secondaryBodyPartWithSide": "string",
    //   "timeOfInjury": "2021-07-08T07:08:29.088000Z",
    //   "NoOfDaysAway": "string",
    //   "medicalResponseTaken": "string",
    //   "treatmentDate": "2021-07-08T07:08:29.088000Z",
    //   "higherMedicalResponder": "string",
    //   "injuryStatus": "string",
    //   "firstAidTreatment": "string",
    //   "mechanismOfInjury": "string",
    //   "isMedicationIssued": "Yes",
    //   "isPrescriptionIssued": "Yes",
    //   "isNonPrescription": "Yes",
    //   "isAnyLimitation": "Yes",
    //   "supervisorName": "string",
    //   "supervisorTimeInIndustry": "2021-07-08T07:08:29.088000Z",
    //   "supervisorTimeInCompany": "2021-07-08T07:08:29.088000Z",
    //   "supervisorTimeOnProject": "2021-07-08T07:08:29.088000Z",
    //   "attachments": null,
    //   "isAlcoholDrugTestTaken": "Yes",
    //   "dateOfAlcoholDrugTest": "2021-07-08T07:08:29.088000Z",
    //   "isWorkerClearedTest": "Yes",
    //   "reasonForTestNotDone": "string",
    //   "status": "Active",
    //   "createdAt": "2021-07-08T07:09:44.044588Z",
    //   "updatedAt": "2021-07-08T07:09:44.044600Z",
    //   "createdBy": 0,
    //   "updatedBy": null,
    //   "fkInvestigationId": 11
    // }
    {
      name: "",
      workerType: "",
      department: "",
      workHours: "",
      shiftTimeStart : "",
      shiftType: "",
      occupation: "",
      shiftCycle: "",
      noOfDaysIntoShift: "",
      timeInCompany: "",
      timeOnProject: "",
      timeInIndustry: "",

      eventLeadingToInjury: "",
      injuryObject: "",
      primaryBodyPartWithSide: "",
      secondaryBodyPartWithSide: "",
      timeOfInjury: "",
      NoOfDaysAway: "",
      medicalResponseTaken: "",
      treatmentDate: "",
      higherMedicalResponder: "",
      injuryStatus: "",
      firstAidTreatment: "",
      mechanismOfInjury: "",
      isMedicationIssued: "",
      isPrescriptionIssued: "",
      isNonPrescription: "",
      isAnyLimitation: "",
      supervisorName: "",
      supervisorTimeInIndustry: "",
      supervisorTimeInCompany: "",
      supervisorTimeOnProject: "",
      isAlcoholDrugTestTaken: "",
      dateOfAlcoholDrugTest: "",
      isWorkerClearedTest: "",
      reasonForTestNotDone: "",
      status: "",
      createdBy: 0,
      fkInvestigationId: 11
    }
  );

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
  const handleNext = async () => {
    console.log(form)
    const res = await api.post('/api/v1/incidents/400/investigations/11/workers/',form)
  }

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
              required
              error={error && error.name}
              helperText={
                error && error.name
                  ? error.name
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                name: e.target.value,
              });
            }}
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
                onChange={(e) => {
                  setForm({
                    ...form,
                    workerType: e.target.value
                  });
                }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.workerType && (
                <FormHelperText>{error.workerType}</FormHelperText>
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
              onChange={(e) => {
                setForm({
                  ...form,
                  department: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.department && (
                <FormHelperText>{error.department}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              error={error && error.workHours}
              helperText={error.workHours}
              label="Number of Scheduled Work Hours"
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                workHours: e.target.value,
              });
            }}
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
                label="Start of Shift Time"
              // defaultValue={incidentsListData.fkUnitId}
              // onChange={(e) => {
              //   setForm({
              //     ...form,
              //     shiftTimeStart: toString(e.target.value),
              //   });
              // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.shiftTimeStart && (
                <FormHelperText>{error.shiftTimeStart}</FormHelperText>
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
                label="Type of Shift"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  shiftType: e.target.value
                })
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.shiftType && (
                <FormHelperText>{error.shiftType}</FormHelperText>
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
              onChange={(e) => {
                setForm({
                  ...form,
                  occupation: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.occupation && (
                <FormHelperText>{error.occupation}</FormHelperText>
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
                label="Shift Cycle"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  shiftCycle: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.shiftCycle && (
                <FormHelperText>{error.shiftCycle}</FormHelperText>
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
                label="Number of Days into Shift"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  noOfDaysIntoShift: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.noOfDaysIntoShift && (
                <FormHelperText>{error.noOfDaysIntoShift}</FormHelperText>
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
                label="Number of Days into Shift"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  timeInCompany: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.timeInCompany && (
                <FormHelperText>{error.timeInCompany}</FormHelperText>
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
                label="Number of Days into Shift"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  timeOnProject: toString(e.target.value),
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.timeOnProject && (
                <FormHelperText>{error.timeOnProject}</FormHelperText>
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
                label="Time in Industry"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  timeInIndustry: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.timeInIndustry && (
                <FormHelperText>{error.timeInIndustry}</FormHelperText>
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
              error={error && error.eventLeadingToInjury}
              helperText={
                error && error.eventLeadingToInjury
                  ? error.eventLeadingToInjury
                  : null
              }
            onChange={(e) => {
              setForm({
                ...form,
                eventLeadingToInjury: e.target.value,
              });
            }}
            />
          </Grid>

          {/* injury object */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Injury object"
              className={classes.formControl}
              error={error && error.injuryObject}
              helperText={
                error && error.injuryObject
                  ? error.injuryObject
                  : null
              }
            onChange={(e) => {
              setForm({
                ...form,
                injuryObject: e.target.value,
              });
            }}
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
                label="Primary Body Part Side Included"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  primaryBodyPartWithSide: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.primaryBodyPartWithSide && (
                <FormHelperText>{error.primaryBodyPartWithSide}</FormHelperText>
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
                label="Secondary Body Part Included"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  secondaryBodyPartWithSide: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.secondaryBodyPartWithSide && (
                <FormHelperText>{error.secondaryBodyPartWithSide}</FormHelperText>
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
                label="Injury Illness"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  timeOfInjury: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.timeOfInjury && (
                <FormHelperText>{error.timeOfInjury}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* day away/restriction */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Number of Days Away/On Restriction"
              error={error && error.NoOfDaysAway}
              helperText={
                error && error.NoOfDaysAway
                  ? error.NoOfDaysAway
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                NoOfDaysAway: e.target.value,
              });
            }}
            />
          </Grid>

          {/* medical response */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Medical Response Taken"
              error={error && error.medicalResponseTaken}
              helperText={
                error && error.medicalResponseTaken
                  ? error.medicalResponseTaken
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                medicalResponseTaken: e.target.value,
              });
            }}
            />
          </Grid>

          {/* treatment date  */}
          <Grid item md={6}>
            {/* <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
              <KeyboardDatePicker
                error={error.treatmentDate}
                required
                className={classes.treatmentDate}
                label="Treatment Date"
                helperText={error.treatmentDate ? error.treatmentDate : null}
                onChange={(e) => {
                  console.log(e);
                  setForm({
                    ...form,
                    treatmentDate: moment(e).toDate(),
                  });
                }}
                format="yyyy/MM/dd"
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider> */}
            <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                <KeyboardDatePicker
                  
                  className={classes.formControl}
                  label="Treatment Date"
                  // helperText={error.incidentdate ? error.incidentdate : null}
                  // value={
                  //   form.incidentdate || incidentsListData.incidentOccuredOn
                  // }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      treatmentDate: moment(e).toISOString(),
                    });
                    console.log(moment(e).toISOString())
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  disableFuture='true'
                
                />
              </MuiPickersUtilsProvider>
            
          </Grid>

          {/* highest medical responder */}
          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.higherMedicalResponder}
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Highest medical responder
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Highest Medical Responder"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  higherMedicalResponder: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.higherMedicalResponder && (
                <FormHelperText>{error.higherMedicalResponder}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          {/* status update    */}
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Status Update"
              error={error && error.injuryStatus}
              helperText={
                error && error.injuryStatus
                  ? error.injuryStatus
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                injuryStatus: e.target.value,
              });
            }}
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
                label="First Aid Treatment"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  firstAidTreatment: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.firstAidTreatment && (
                <FormHelperText>{error.firstAidTreatment}</FormHelperText>
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
                label="Mechanism of Injury"
              // defaultValue={incidentsListData.fkUnitId}
              onChange={(e) => {
                setForm({
                  ...form,
                  mechanismOfInjury: e.target.value
                });
              }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.mechanismOfInjury && (
                <FormHelperText>{error.mechanismOfInjury}</FormHelperText>
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
              <FormLabel component="legend">Medical Issued ?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}
              onChange={(e) => {
                setForm({
                  ...form,
                  isMedicationIssued: e.target.value
                });
              }}
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

          <Grid item md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Prescription Issues ?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}
              onChange={(e) => {
                setForm({
                  ...form,
                  isPrescriptionIssued: e.target.value
                });
              }}
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

          <Grid item md={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Non-Prescription ?</FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}
               onChange={(e) => {
                setForm({
                  ...form,
                  isNonPrescription: e.target.value
                });
              }}
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
          {/* <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Any Limitation ?"
              error={error && error.isAnyLimitation}
              helperText={
                error && error && error.isAnyLimitation
                  ? error && error.isAnyLimitation
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                isAnyLimitation: e.target.value,
              });
            }}
            />
          </Grid> */}
          <Grid item md={6}>
            
            <FormControl component="fieldset">
              <FormLabel component="legend">Any Limitation ?</FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                
                onChange={(e) => {
              setForm({
                ...form,
                isAnyLimitation: e.target.value,
              });
            }}
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
                    onChange={(e) => {
                      console.log(e);
                      setForm({
                        ...form,
                        incidentdate: moment(e).toDate(),
                      });
                    }}
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
              label="Supervisor Name"
              error={error && error.supervisorName}
              helperText={
                error && error.supervisorName
                  ? error.supervisorName
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                supervisorName: e.target.value,
              });
            }}
            />
            {error && error.supervisorName && (
              <p>{error.supervisorName}</p>
            )}
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor time in industry</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor Time in Industry"
              error={error && error.supervisorTimeInIndustry}
              helperText={
                error && error.supervisorTimeInIndustry
                  ? error.supervisorTimeInIndustry
                  : null
              }
              className={classes.formControl}
            onChange={(e) => {
              setForm({
                ...form,
                supervisorTimeInIndustry: e.target.value,
              });
            }}
            />
          </Grid>

          <Grid item md={6}>
            {/* <p>Supervisor time in company</p> */}
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor time in company"
              className={classes.formControl}
              error={error && error.supervisorTimeInCompany}
              helperText={
                error && error.supervisorTimeInCompany
                  ? error.supervisorTimeInCompany
                  : null
              }
            onChange={(e) => {
              setForm({
                ...form,
                supervisorTimeInCompany: e.target.value,
              });
            }}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Supervisor time on project"
              className={classes.formControl}
              error={error && error.supervisorTimeOnProject}
              helperText={
                error && error.supervisorTimeOnProject
                  ? error.supervisorTimeOnProject
                  : null
              }
            // onChange={(e) => {
            //   setForm({
            //     ...form,
            //     supervisorTimeOnProject: e.target.value,
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
              onClick={() => handleNext()}
              // href="/app/incident-management/registration/investigation/property-impact-details/"
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
