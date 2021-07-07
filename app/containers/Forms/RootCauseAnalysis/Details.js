import React, { useEffect, useState, useRef } from "react";
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
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";
import DetailValidation from "../../Validator/RCAValidation/DetailsValidation";
import { RCAOPTION } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import { FormHelperText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const Details = () => {
  const [incidents, setIncidents] = useState([]);

  const [form, setForm] = useState({
    evidenceSupport: "N/A",
    evidenceContradiction: "N/A",
    evidenceNotSupport: "N/A",
    rcaRecommended: "",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId: parseInt(localStorage.getItem("fkincidentId")),
  });

  const [error, setError] = useState({});

  const [nextPageUrl, setNextPageUrl] = useState("");
  const putId = useRef("");
  const pkValue = useRef("");
  const history = useHistory();
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
  let [hideArray, setHideArray] = useState([]);

  // get data for put
  const handelUpdateCheck = async () => {
    let tempApiData = {};
    let tempApiDataId = [];
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    if (!isNaN(lastItem)) {
      let previousData = await api.get(
        `/api/v1/incidents/${lastItem}/causeanalysis/`
      );
      let allApiData = previousData.data.data.results[0];
      pkValue.current = allApiData.id;
      setForm({
        ...form,
        evidenceSupport: allApiData.evidenceSupport,
        evidenceContradiction: allApiData.evidenceContradiction,
        evidenceNotSupport: allApiData.evidenceNotSupport,
        rcaRecommended: allApiData.rcaRecommended,
      });
      putId.current = lastItem;
    }
  };

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    await setIncidents(allIncidents.data.data.results);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  const handelRcaRecommended = (e, value) => {
    if (value == "Five why analysis") {
      setHideArray([
        "Hazardious acts",
        "Hazardious conditions",
        "Cause and action",
        "Basic cause",
        "Basic cause and action",
        "Corrective actions",
        "Root cause analysis",
      ]);
    } else if (value == "Pace cause analysis") {
      setHideArray(["Root cause analysis", "Why analysis"]);
    } else if (value == "Root cause analysis") {
      setHideArray([
        "Hazardious acts",
        "Hazardious conditions",
        "Cause and action",
        "Basic cause",
        "Basic cause and action",
        "Corrective actions",
        "Why analysis",
      ]);
    }
    setForm({ ...form, rcaRecommended: value });
  };

  const handelNext = async (e) => {
    // console.log(form);
    const { error, isValid } = DetailValidation(form);
    let nextPageLink = 0;
    setError(error);
    if (Object.keys(error).length == 0) {
      console.log(form);
      if (putId.current == "") {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/causeanalysis/`,
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
          )}/causeanalysis/${pkValue.current}/`,
          form
        );
        if (res.status == 200) {
          console.log("request done");
          nextPageLink = res.status;
        }
      }
    }
    // routing as per fields
    if (nextPageLink == 201 && Object.keys(error).length === 0) {
      if (form.rcaRecommended == "Five why analysis") {
        history.push(
          "/app/incident-management/registration/root-cause-analysis/why-analysis/"
        );
      } else if (form.rcaRecommended == "Pace cause analysis") {
        history.push(
          "/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
        );
      } else if (form.rcaRecommended == "Root cause analysis") {
        console.log("here");
        history.push(
          "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
        );
      }
    } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
      if (form.rcaRecommended == "Five why analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/why-analysis/${putId.current
          }`
        );
      } else if (form.rcaRecommended == "Pace cause analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/hazardious-acts/${putId.current
          }`
        );
      } else if (form.rcaRecommended == "Root cause analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/root-cause-analysis/${putId.current
          }`
        );
      }
    }

    // e.preventDefault();
    localStorage.setItem("deleteForm", hideArray);
    localStorage.setItem("rcaMethod", form.rcaRecommended);

  };

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
    setHideArray(localStorage.getItem("deleteForm"));
  }, []);

  return (
    <PapperBlock title="RCA Details" icon="ion-md-list-box">
      {/* {console.log(hideArray)} */}
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

          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                inputVariant="outlined"
                className={classes.formControl}
                ampm={false}
                value={selectedDate}
                onChange={handleDateChange}
                label="Investigation start date"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                inputVariant="outlined"
                className={classes.formControl}
                ampm={false}
                value={selectedDate}
                onChange={handleDateChange}
                label="Incident end date"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Level of investigation
            </Typography>
            <Typography className={Type.labelValue}>
              Level to be displayed here.
            </Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              className={classes.formControl}
              error={error && error.rcaRecommended}
            >
              <InputLabel id="project-name-label">RCA recommended</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="RCA recommended"
                value={form.rcaRecommended}
              >
                {RCAOPTION.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => handelRcaRecommended(e, selectValues)}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
              {error && error.rcaRecommended && (
                <FormHelperText>{error.rcaRecommended}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
            // required
            // error={error.evidenceSupport}
            >
              <FormLabel component="legend">
                Evidence collected supports the incident event took place?
              </FormLabel>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                    checked={form.evidenceSupport == value}
                    onChange={(e) =>
                      setForm({ ...form, evidenceSupport: e.target.value })
                    }
                  />
                ))}
              </RadioGroup>
              {/* {error && error.evidenceSupport && (
                <FormHelperText>{error.evidenceSupport}</FormHelperText>
              )} */}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
            // required
            // error={error.evidenceContradiction}
            >
              <FormLabel component="legend">
                Contradictions between evidence and the description of incident?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                aria-label="gender"
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                    checked={form.evidenceContradiction == value}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        evidenceContradiction: e.target.value,
                      })
                    }
                  />
                ))}
              </RadioGroup>
              {/* {error && error.evidenceContradiction && (
                <FormHelperText>{error.evidenceContradiction}</FormHelperText>
              )} */}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
            // required
            // error={error.evidenceContradiction}
            >
              <FormLabel component="legend">
                Evidence does not supports the incident event as described?
              </FormLabel>
              <RadioGroup
                className={classes.inlineRadioGroup}
                aria-label="gender"
              >
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                    checked={form.evidenceNotSupport == value}
                    onChange={(e) =>
                      setForm({ ...form, evidenceNotSupport: e.target.value })
                    }
                  />
                ))}
              </RadioGroup>
              {/* {error && error.evidenceNotSupport && (
                <FormHelperText>{error.evidenceNotSupport}</FormHelperText>
              )} */}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={hideArray}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Details"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default Details;
