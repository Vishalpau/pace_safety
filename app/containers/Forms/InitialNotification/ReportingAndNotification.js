import React, { useState,useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { MaterialDropZone } from "dan-components";
import { DropzoneDialogBase } from 'material-ui-dropzone';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment'

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import ReportingValidation from "../../Validator/ReportingValidation"



const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
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

const ReportingAndNotification = () => {

  const [files, setFile] = React.useState([]);
  const [error,setError] = useState({})

  const [form, setForm] = useState({
    reportedto:"",
    isnotificationsent:"",
    fileupload:"",
    supervisorname:"",
    othername:"",
    reportingdate:"2021/09/06",
    reportingtime:"",
    reportedby:"",
    others:"",
    latereporting:"",
    additionaldetails:""
  })


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
    let onlyDate = moment(date).format('YYYY/MM/DD')
    setForm({
      ...form,
      reportingdate: onlyDate,
    });
  };

  const handelTimeChange = (date) => {
    let onlyTime = moment(date).format('HH:mm')
    
    setForm({
      ...form,
      reportingtime: onlyTime,
    });
  }

   const [selectedTime, setSelectedTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDrop = (acceptedFiles) =>{
    setForm({
      ...form,
      fileupload: acceptedFiles,
    })
    setFileNames(acceptedFiles.map(file => file.name));
  }

  const handelNext = (e) =>{
    console.log(form)
    const { error, isValid } = ReportingValidation(form)
    setError(error)
    console.log(error,isValid)
  }

  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box>

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Reporting and Notification
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item lg={12} md={6} sm={6}>
                  <p>Reportable to</p>

                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender">
                      {reportedTo.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              reportedto: e.target.value,
                            });
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {error && error.reportedto && <p>{error.reportedto}</p> }
                </Grid>

                <Grid item lg={12} md={6} sm={6}>
                  <p>Notification to be sent</p>

                  <FormControl component="fieldset">
                    <RadioGroup aria-label="gender">
                      {notificationSent.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              isnotificationsent: e.target.value,
                            });
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  {error && error.isnotificationsent && <p>{error.isnotificationsent}</p> }
                </Grid>
                <Grid item lg={12} justify="flex-start">

                  {/* <p>Initial Evidences</p> */}

                  <Box marginTop={3} marginBottom={4}>
                    <Typography variant="h6" gutterBottom>
                      Initial Evidences
                    </Typography>
                  </Box>
                  
                  <MaterialDropZone
                    files={files}
                    showPreviews
                    maxSize={5000000}
                    filesLimit={5}
                    text="Drag and drop file(s) here or click button bellow"
                    showButton
                    onDrop={handleDrop}
                    onClick={(e)=>console.log('clicked')}
                   
                  />
                  {error && error.fileupload && <p>{error.fileupload}</p> }
                </Grid>

                <Grid item md={6}>
                  {/* <p>Supervisor name</p> */}
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="supervisorName-label">
                      Supervisor name
                    </InputLabel>
                    <Select
                      labelId="supervisorName-label"
                      id="supervisorName"
                      label="Supervisor name"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          supervisorname: e.target.value.toString(),
                        });
                      }}
                    >
                      {selectValues.map((selectValues) => (
                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {error && error.supervisorname && <p>{error.supervisorname}</p> }
                </Grid>

                <Grid item md={6}>
                  {/* <p>Others Name</p> */}
                  <TextField
                    id="othersName"
                    variant="outlined"
                    label="Others Name"
                    className={classes.formControl}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        othername: e.target.value.toString(),
                      });
                    }}
                  />
                  {error && error.othername && <p>{error.othername}</p> }
                </Grid>

                <Grid item md={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      className={classes.formControl}
                      id="date-picker-dialog"
                      format="yyyy/MM/dd"
                      required
                      inputVariant="outlined"
                      label="Reporting Date"
                      value={new Date(form.reportingdate)}
                      onChange={date => handleDateChange(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                  {error && error.reportingdate && <p>{error.reportingdate}</p> }
                </Grid>

                <Grid item md={6}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  // defaultValue="05:30 AM"
                  value = {selectedTime}
                  onChange={date => handelTimeChange(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  format="HH:mm"
                />
                  </MuiPickersUtilsProvider>
                  {error && error.reportingtime && <p>{error.reportingtime}</p> }
                </Grid>

                <Grid item md={6}>
                  {/* <p>Reported by</p> */}
                  <FormControl
                    variant="outlined"
                    required
                    className={classes.formControl}
                  >
                    <InputLabel id="reportedBy-label">Reported By</InputLabel>
                    <Select
                      labelId="reportedBy-label"
                      id="reportedBy"
                      label="Reported By"
                      onChange={(e) => {
                        setForm({
                          ...form,
                          reportedby: e.target.value.toString(),
                        });
                      }}
                    >
                      {selectValues.map((selectValues) => (
                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {error && error.reportedby && <p>{error.reportedby}</p> }
                </Grid>

                <Grid item md={6}>
                  {/* <p>Others Name</p> */}
                  <TextField
                    id="others"
                    variant="outlined"
                    label="Others"
                    className={classes.formControl}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        others: e.target.value.toString(),
                      });
                    }}
                  />
                  {error && error.others && <p>{error.others}</p> }
                </Grid>

                <Grid item md={12}>
                  {/* <p>Resaon for reporting later than 4 hours</p> */}
                  <TextField
                    id="reason"
                    variant="outlined"
                    label="Resaon for reporting later than 4 hours"
                    multiline
                    rows="4"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        latereporting: e.target.value.toString(),
                      });
                    }}
                  />
                  {error && error.latereporting && <p>{error.latereporting}</p> }
                </Grid>

                <Grid item md={12}>
                  {/* <p>Additional details if any</p> */}
                  <TextField
                    id="additionalDetails"
                    variant="outlined"
                    label="Additional details if any"
                    multiline
                    rows="4"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        additionaldetails: e.target.value.toString(),
                      });
                    }}
                  />
                  {error && error.additionaldetails && <p>{error.additionaldetails}</p> }
                </Grid>

                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/environment-affected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    // href="http://localhost:3000/app/incident-management/registration/investigation/initial-details/"
                    href={Object.keys(error).length === 0? 
                      "http://localhost:3000/app/incident-management/registration/investigation/initial-details/" 
                      : "#"}
                    onClick={(e)=>handelNext(e)}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Reporting and notification"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ReportingAndNotification;
