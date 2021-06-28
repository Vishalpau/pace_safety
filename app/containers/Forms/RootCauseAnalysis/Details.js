import React, { useEffect, useState } from "react";
import { Container, Grid, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";
import DetailValidation from "../../Validator/RCAValidation/DetailsValidation"


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
  spacer: {
    padding: ".75rem 0",
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const Details = () => {

  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    evidenceSupport: "",
    evidenceContradiction: "",
    evidenceNotSupport: "",
    rcaRecommended: "string",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId"))
  })

  const [error, setError] = useState({})

  const [nextPageUrl, setNextPageUrl] = useState("")

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

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    console.log(allIncidents)
    await setIncidents(allIncidents.data.data.results);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  const handelNext = async (e) => {
    console.log(form)
    const { error, isValid } = DetailValidation(form);

    setError(error);
    if (Object.keys(error).length == 0) {
      const res = await api.post(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/causeanalysis/`, form);
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
              RCA details
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

              <Grid item md={6}>
                <Typography component="p">Investigation start date</Typography>
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
                <Typography component="p">Investigation end date</Typography>
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
                <Typography component="p">Level of Investigation</Typography>
                <p> Value selected to be displayed</p>
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
                    label="RCA recommended"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>



              <Grid item md={6}>
                <FormLabel component="legend" error={error.evidenceSupport}>
                  <p>Evidence collected supports the incident event took place</p>
                </FormLabel>


                <FormControl component="fieldset">
                  <RadioGroup className={classes.inlineRadioGroup}>
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => setForm({ ...form, evidenceSupport: e.target.value })}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {error && error.evidenceSupport && (
                  <p><small style={{ color: "red" }}>{error.evidenceSupport}</small></p>
                )}
                <p><small>If no further investigation required i.e Part analysis,oil samples,data recordings from equipment computers etc.</small></p>
              </Grid>

              <Grid item md={6}>
                <FormLabel component="legend" error={error.evidenceContradiction}>
                  <p>Contradictions between evidence and the description of incident</p>
                </FormLabel>

                <FormControl component="fieldset">
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="gender"
                  >
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => setForm({ ...form, evidenceContradiction: e.target.value })}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {error && error.evidenceContradiction && (
                  <p><small style={{ color: "red" }}>{error.evidenceContradiction}</small></p>
                )}
              </Grid>

              <Grid item md={6}>
                <FormLabel component="legend" error={error.evidenceContradiction}>
                  <p>Evidence does not supports the incident event as described</p>
                </FormLabel>

                <FormControl component="fieldset">
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="gender"
                  >
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                        onChange={(e) => setForm({ ...form, evidenceNotSupport: e.target.value })}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                {error && error.evidenceNotSupport && (
                  <p><small style={{ color: "red" }}>{error.evidenceNotSupport}</small></p>
                )}
              </Grid>

              <Grid>
                <p>
                  Then investigation team to develop credble assumption and/or
                  hypthesis, continue with RCA process. Ensure this fact is
                  captured in investigation report that investigation is based
                  on some assumption.
                </p>
              </Grid>

              <Grid item md={12}>

                <Button
                  variant="contained"
                  color="primary"
                  href={Object.keys(error).length > 0 ? '#' : "/app/incident-management/registration/root-cause-analysis/hazardious-acts/"}
                  onClick={(e) => handelNext(e)}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Details"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Details;
