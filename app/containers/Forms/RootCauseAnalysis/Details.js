import React, { useEffect, useState, useRef } from "react";
import { Container, Grid, Button, FormHelperText } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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

  const handelNext = async (e) => {
    console.log(form);
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
    if (nextPageLink == 201 && Object.keys(error).length === 0) {
      history.push(
        "/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
      );
    } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/hazardious-acts/${
          putId.current
        }`
      );
    }
    e.preventDefault();
  };

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
  }, []);

  return (
    <PapperBlock title="RCA Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Number
            </Typography>
            <Typography className={Type.labelValue} gutterBottom>
              {localStorage.getItem("fkincidentId")}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Description
            </Typography>

            <Typography className={Type.labelValue} gutterBottom>
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
                label="Incident Start Date"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item md={6}>
            {/* <h6> RCA recommended</h6> */}
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
                defaultValue={form.rcaRecommended}
              >
                {RCAOPTION.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) =>
                      setForm({ ...form, rcaRecommended: selectValues })
                    }
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

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Level of Investigation
            </Typography>

            <Typography className={Type.labelValue} gutterBottom>
              Level 5 [Static]
            </Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              error={error && error.rcaRecommended}
              className={classes.formControl}
            >
              <InputLabel id="project-name-label">RCA Recommended</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="RCA Recommended"
              >
                {RCAOPTION.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) =>
                      setForm({ ...form, rcaRecommended: selectValues })
                    }
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
              required
              error={error.evidenceSupport}
            >
              <FormLabel component="legend">
                Evidence Collected Supports the Incident Event Took Place
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
              {error && error.evidenceSupport && (
                <FormHelperText>{error.evidenceSupport}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
              required
              error={error.evidenceContradiction}
            >
              <FormLabel component="legend">
                Contradictions Between Evidence and the Description of Incident
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
              {error && error.evidenceContradiction && (
                <FormHelperText>{error.evidenceContradiction}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={12}>
            <FormControl
              component="fieldset"
              required
              error={error.evidenceContradiction}
            >
              <FormLabel component="legend">
                Evidence Does not Supports the Incident Event As Described
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
                      setForm({
                        ...form,
                        evidenceNotSupport: e.target.value,
                      })
                    }
                  />
                ))}
              </RadioGroup>
              {error && error.evidenceNotSupport && (
                <FormHelperText>{error.evidenceNotSupport}</FormHelperText>
              )}
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
            deleteForm={[1, 2, 3]}
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Details"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default Details;
