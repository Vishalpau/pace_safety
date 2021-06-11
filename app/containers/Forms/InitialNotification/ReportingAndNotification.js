import React from "react";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ".5rem 0",
    minWidth: 300,
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

  const radioDecide = ["Yes", "No", "N/A"];
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={4} borderBottom={1}>
              <Typography variant="h5" gutterBottom>
                Reporting and Notification
              </Typography>
            </Box>
            <Grid container justify="flex-start">
              <Grid item lg={12} md={6} sm={6}>
                <p>Reportable to</p>

                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender">
                    {reportedTo.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
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
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item lg={12} justify="flex-start">
                {/* <p>Initial Evidences</p> */}
                <Box marginTop={3} marginBottom={4}>
                  <Typography variant="h6" gutterBottom>
                    Initial Evidences
                  </Typography>
                </Box>

                <FormControl>
                  <Grid item lg={6}>
                    <Input type="file" variant="outlined" />
                  </Grid>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>Supervisor name</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="supervisorName-label">
                    Supervisor name
                  </InputLabel>
                  <Select
                    labelId="supervisorName-label"
                    id="supervisorName"
                    label="Supervisor name"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>Others Name</p> */}
                <TextField
                  id="othersName"
                  label="Others Name"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.formControl}
                    id="date-picker-dialog"
                    format="MM/dd/yyyy"
                    required
                    label="Reporting Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    label="Reporting Time"
                    className={classes.formControl}
                    mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
                    placeholder="08:00 AM"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Icon>access_time</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
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
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>Others Name</p> */}
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  className={classes.formControl}
                />
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
                />
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
                />
              </Grid>

              <Box marginTop={4}>
                <Button variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ReportingAndNotification;
