import React, { useEffect, useState, useRef } from "react";
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
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import FormHelperText from "@material-ui/core/FormHelperText";

import FormHeader from "../FormHeader";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";
import RootCauseValidation from "../../Validator/RCAValidation/RootCauseAnalysisValidation";
import { RCAOPTION } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";

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
}));

const RootCauseAnalysis = () => {
  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    causeOfIncident: "",
    correctiveAction: "",
    wouldItPreventIncident: "N/A",
    recommendSolution: "",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId")),
  });

  const [error, setError] = useState({});
  const history = useHistory();
  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
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
  const putId = useRef("");
  const pkValue = useRef("");

  const handelUpdateCheck = async () => {
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    if (!isNaN(lastItem)) {
      let previousData = await api.get(
        `/api/v1/incidents/${lastItem}/rootcauses/`
      );
      let allApiData = previousData.data.data.results[0];
      pkValue.current = allApiData.id;
      setForm({
        ...form,
        causeOfIncident: allApiData.causeOfIncident,
        correctiveAction: allApiData.correctiveAction,
        wouldItPreventIncident: allApiData.wouldItPreventIncident,
        recommendSolution: allApiData.recommendSolution,
      });
      putId.current = lastItem;
    }
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  const handelNext = async (e) => {
    const { error, isValid } = RootCauseValidation(form);
    setError(error);
    let nextPageLink = 0;
    if (Object.keys(error).length == 0) {
      if (putId.current == "") {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/rootcauses/`,
          form
        );
        if (res.status == 201) {
          console.log("request done");
          nextPageLink = res.status;
        }
      } else {
        form["pk"] = pkValue.current;
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/rootcauses/${pkValue.current}/`,
          form
        );
        if (res.status == 200 && Object.keys(error).length === 0) {
          console.log("request done");
          nextPageLink = res.status;
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length == 0) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      } else if (nextPageLink == 200 && Object.keys(error).length == 0) {
        history.push(
          `/app/incident-management/registration/summary/summary/${
            putId.current
          }`
        );
      }
    }
    localStorage.setItem("RootCause", "Done");
  };

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
  }, []);

  return (
    <PapperBlock title="Root Cause Analysis" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>
            <Typography className={Type.labelValue}>
              {incidents.incidentNumber}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident description
            </Typography>
            <Typography className={Type.labelValue}>
              {incidents.incidentDetails}
            </Typography>
          </Grid>

          <Grid item lg={6} md={12} sm={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Investigation start date"
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
                label="Investigation end date"
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
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">RCA recommended</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="RCA recommended"
              >
                {RCAOPTION.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">
                Level of investigation
              </InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Level of investigation"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item lg={6} md={12} sm={12}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                inputVariant="outlined"
                className={classes.formControl}
                ampm={false}
                value={selectedDate}
                onChange={handleDateChange}
                label="Incident date and time"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                label="Analysis conduted by"
                className={classes.formControl}
                inputVariant="outlined"
                required
                id="date-picker-dialog"
                format="dd/mm/yyyy"
                value={selectedDate}
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={12}>
            <TextField
              className={classes.formControl}
              id="filled-basic"
              multiline
              rows="3"
              variant="outlined"
              required
              label="What caused the incident?"
              error={error.causeOfIncident}
              value={form.causeOfIncident}
              helperText={error ? error.causeOfIncident : ""}
              onChange={(e) =>
                setForm({ ...form, causeOfIncident: e.target.value })
              }
            />
          </Grid>

          <Grid item md={12}>
            <TextField
              id="filled-basic"
              className={classes.formControl}
              multiline
              rows="3"
              variant="outlined"
              label="Corrective actions"
              required
              error={error.correctiveAction}
              defaultValue={form.correctiveAction}
              helperText={error ? error.correctiveAction : ""}
              onChange={(e) =>
                setForm({ ...form, correctiveAction: e.target.value })
              }
            />
          </Grid>

          <Grid item md={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Would corrective actions prevent simailar incidents in future?
              </FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                    checked={form.wouldItPreventIncident == value}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        wouldItPreventIncident:
                          e.target.value === "Yes" ? "Yes" : "No",
                      })
                    }
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <TextField
              className={classes.formControl}
              id="filled-basic"
              variant="outlined"
              multiline
              error={error && error.recommendSolution}
              helperText={null}
              label="If no please recommended correct solution?"
              rows="3"
              defaultValue={form.recommendSolution}
              onChange={(e) =>
                setForm({ ...form, recommendSolution: e.target.value })
              }
            />
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => history.goBack()}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item={3}>
          <FormSideBar
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem="Root cause analysis"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};
export default RootCauseAnalysis;
