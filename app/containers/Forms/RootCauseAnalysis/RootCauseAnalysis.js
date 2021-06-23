import React, { useEffect, useState } from "react";
import { Button, Grid, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";
import RootCauseValidation from "../../Validator/RCAValidation/RootCauseAnalysisValidation"


const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const RootCauseAnalysis = () => {

  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    causeOfIncident: "",
    correctiveAction: "",
    wouldItPreventIncident: "",
    recommendSolution: "",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId"))
  })

  const [error, setError] = useState({})

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    console.log(allIncidents)
    await setIncidents(allIncidents.data.data.results);
  };


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

  const handelNext = async (e) => {
    const { error, isValid } = RootCauseValidation(form);
    setError(error);
    if (Object.keys(error).length == 0) {
      const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/rootcauses/`, form);
      if (res.status == 201) {
        console.log("request done")
        console.log(res)
      }
    }

  }

  useEffect(() => {
    fetchIncidentData();
  }, []);

  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Root couse Analysis
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>

              <Grid item md={12}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number: {localStorage.getItem("fkincidentId")}
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                {/* <h6> Incident Description </h6> */}
                <Typography variant="h6" gutterBottom>
                  Incident Description:{incidents.incidentDetails}
                </Typography>
              </Grid>

              <Grid item lg={6} md={12} sm={12}>
                {/* <h6> Investigation start date</h6> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Investigation Start Date"
                    className={classes.formControl}
                    inputVariant="outlined"
                    id="date-picker-dialog"
                    format="dd/mm/yyyy"
                    value={selectedDate}
                    // onChange={handleDateChange}
                    disabled
                  />
                </MuiPickersUtilsProvider>

              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Investigation End Date"
                    className={classes.formControl}
                    inputVariant="outlined"
                    required
                    id="date-picker-dialog"
                    format="dd/mm/yyyy"
                    value={selectedDate}
                    // onChange={handleDateChange}
                    disabled
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                {/* <h6> RCA recommended</h6> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">
                    RCA recommended
                  </InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Project Name"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={12} sm={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">
                    Level Of Investigation
                  </InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Project Name"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item lg={6} md={12} sm={12}>
                {/* <h6> Incident Date and Time</h6> */}
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <DateTimePicker
                    autoOk
                    inputVariant="outlined"
                    className={classes.formControl}
                    ampm={false}
                    value={selectedDate}
                    onChange={handleDateChange}
                    // label="Incident Date and Time"
                    disabled
                  />
                </MuiPickersUtilsProvider>


              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    label="Analysis Conduted By"
                    className={classes.formControl}
                    inputVariant="outlined"
                    required
                    id="date-picker-dialog"
                    format="dd/mm/yyyy"
                    value={selectedDate}
                    // onChange={handleDateChange}
                    disabled
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6}>
                <p>What caused the incident? </p>
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  variant="outlined"
                  label="Details"
                  onChange={(e) => setForm({ ...form, causeOfIncident: e.target.value })}
                />
                {error && error.causeOfIncident && (
                  <p>{error.causeOfIncident}</p>
                )}
              </Grid>
              <Grid item lg={12} md={6} sm={6}>
                <p>Corrective actions</p>
                <TextField
                  id="filled-basic"
                  variant="outlined"
                  label="Details"
                  onChange={(e) => setForm({ ...form, correctiveAction: e.target.value })}
                />
                {error && error.correctiveAction && (
                  <p>{error.correctiveAction}</p>
                )}
              </Grid>
              <Grid item md={12}>
                <RadioGroup>
                  <p>Would Corrective actions prevent simailar incidents in future?</p>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                      onChange={(e) => setForm({ ...form, wouldItPreventIncident: e.target.value === "Yes" ? "Yes" : "No" })}
                    />
                  ))}
                </RadioGroup>
                {error && error.wouldItPreventIncident && (
                  <p>{error.wouldItPreventIncident}</p>
                )}
              </Grid>
              <Grid item md={12}>
                <p>if No, please recommended correct solution ?</p>
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  variant="outlined"
                  multiline
                  label="Details"
                  rows="3"
                  onChange={(e) => setForm({ ...form, recommendSolution: e.target.value })}
                />
                {error && error.recommendSolution && (
                  <p>{error.recommendSolution}</p>
                )}
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/management-control/"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  // href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/why-analysis/"
                  onClick={(e) => handelNext(e)}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item={3}>
              {/* <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Root cause analysis"}
              /> */}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
export default RootCauseAnalysis;
