import React, { useEffect, useState, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";
import RootCauseValidation from "../../Validator/RCAValidation/RootCauseAnalysisValidation";
import { RCAOPTION } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";

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
  const putId = useRef("");

  const [form, setForm] = useState({
    causeOfIncident: "",
    correctiveAction: "",
    wouldItPreventIncident: "Yes",
    recommendSolution: "",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId:
      putId.current || parseInt(localStorage.getItem("fkincidentId")),
  });

  const [error, setError] = useState({});
  const history = useHistory();
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const checkPost = useRef();
  const pkValue = useRef("");
  let investigationData = useRef({});
  const classificationValues = useRef([]);

  const handelUpdateCheck = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    let previousData = await api.get(
      `/api/v1/incidents/${incidentId}/rootcauses/`
    );
    let allApiData = previousData.data.data.results[0];

    let investigationpreviousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let investigationApiData = investigationpreviousData.data.data.results[0];
    if (investigationApiData != null) {
      if (investigationApiData.rcaRecommended != "") {
        setForm({ ...form, rcaRecommended: investigationApiData.rcaRecommended });
      }
      console.log(investigationData.classification)

      investigationData.current = {
        startData: investigationApiData.srartDate,
        endDate: investigationApiData.endDate,
        classification: investigationApiData.classification
      }
    }

    if (!isNaN(allApiData.id)) {
      pkValue.current = allApiData.id;
      setForm({
        ...form,
        causeOfIncident: allApiData.causeOfIncident,
        correctiveAction: allApiData.correctiveAction,
        wouldItPreventIncident: allApiData.wouldItPreventIncident,
        recommendSolution: allApiData.recommendSolution,
      });
      putId.current = incidentId;
      checkPost.current = false;
    }
    classificationValues.current = await PickListData(40); 2
  };

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${putId.current !== ""
        ? putId.current
        : localStorage.getItem("fkincidentId")
      }/`
    );
    await setIncidents(allIncidents.data.data.results);
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
      if (checkPost.current !== false) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/rootcauses/`,
          form
        );
        if (res.status == 201) {
          nextPageLink = res.status;
        }
      } else {
        form["pk"] = pkValue.current;
        const res = await api.put(
          `/api/v1/incidents/${putId.current}/rootcauses/${pkValue.current}/`,
          form
        );
        if (res.status == 200 && Object.keys(error).length === 0) {
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
          `/app/incident-management/registration/summary/summary/${putId.current
          }`
        );
      }
    }
    localStorage.setItem("RootCause", "Done");
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/details/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/details/`
      );
    }
  };

  useEffect(() => {
    handelUpdateCheck();
    setTimeout(fetchIncidentData(), 1000);
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Cause Analysis" icon="ion-md-list-box">
      {console.log(incidents.incidentOccuredOn)}
      <Grid container spacing={3}>
        <Grid container item xs={12} md={9} spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>
            <Typography className={Type.labelValue}>
              {incidents.incidentNumber}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident description
            </Typography>
            <Typography className={Type.labelValue}>
              {incidents.incidentDetails}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
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

          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">RCA recommended</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="RCA recommended"
                disabled
                value="Cause analysis"
              >
                {RCAOPTION.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">
                Level of classification
              </InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Level of investigation"
                disabled
                value={typeof investigationData.current["classification"] !== "undefined" ? investigationData.current["classification"] : null}
              >
                {classificationValues.current.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              label="Incident date and time"
              className={classes.formControl}
              id="filled-basic"
              value={moment(incidents.incidentOccuredOn).format(
                "MM/DD/YYYY , h:mm:ss a"
              )}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
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
          <Grid item xs={12}>
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

          <Grid item xs={12}>
            <TextField
              id="filled-basic"
              className={classes.formControl}
              multiline
              rows="3"
              variant="outlined"
              label="Corrective actions"
              required
              error={error.correctiveAction}
              value={form.correctiveAction}
              helperText={error ? error.correctiveAction : ""}
              onChange={(e) =>
                setForm({ ...form, correctiveAction: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Would corrective actions prevent simailar incidents in future?*
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

          {form.wouldItPreventIncident === "No" ? (
            <Grid item xs={12}>
              <TextField
                className={classes.formControl}
                id="filled-basic"
                variant="outlined"
                multiline
                error={error.recommendSolution}
                helperText={error ? error.recommendSolution : ""}
                label="If no, please recommended correct solution?"
                rows="3"
                value={form.recommendSolution}
                onChange={(e) =>
                  setForm({ ...form, recommendSolution: e.target.value })
                }
              />
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelPrevious(e)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNext(e)}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        {isDesktop && (
          <Grid item={3}>
            <FormSideBar
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem="Root cause analysis"
            />
          </Grid>
        )}
      </Grid>
    </PapperBlock>
  );
};
export default RootCauseAnalysis;
