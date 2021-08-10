import React, { useEffect, useState, useRef } from "react";
import { Grid, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory, useParams } from "react-router";
import { PapperBlock } from "dan-components";
import moment from "moment";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";
import DetailValidation from "../../Validator/RCAValidation/DetailsValidation";
import { RCAOPTION } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import { FormHelperText } from "@material-ui/core";
import { PassThrough } from "stream";
import { checkValue } from "../../../utils/CheckerValue"

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
  const putId = useRef("");
  const [form, setForm] = useState({
    evidenceSupport: "Yes",
    evidenceContradiction: "Yes",
    evidenceNotSupport: "Yes",
    rcaRecommended: "",
    status: "Active",
    createdBy: 0,
    updatedBy: 0,
    fkIncidentId:
      putId.current || parseInt(localStorage.getItem("fkincidentId")),
  });

  const [error, setError] = useState({});
  const pkValue = useRef("");
  const history = useHistory();
  const checkPost = useRef();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  let [hideArray, setHideArray] = useState([]);
  let [investigationData, setInvestigationData] = useState({});
  let [rcaDisable, setRcaDisable] = useState("")

  // get data for put
  const handelUpdateCheck = async () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    // getting incidident id form url
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId
    let previousData = await api.get(
      `/api/v1/incidents/${incidentId}/causeanalysis/`
    );
    let allApiData = previousData.data.data.results[0];

    // fetching data from 


    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      pkValue.current = allApiData.id;
      setForm({
        ...form,
        evidenceSupport: allApiData.evidenceSupport,
        evidenceContradiction: allApiData.evidenceContradiction,
        evidenceNotSupport: allApiData.evidenceNotSupport,
        rcaRecommended: allApiData.rcaRecommended,
      });
      setRcaDisable(allApiData.rcaRecommended)
      await handelRcaRecommended("a", allApiData.rcaRecommended);
      putId.current = incidentId;
      checkPost.current = false;
    }
  };

  const handelInvestigationData = async () => {
    let investigationpreviousData = await api.get(
      `api/v1/incidents/${putId.current}/investigations/`
    );
    let investigationApiData = investigationpreviousData.data.data.results[0];
    if (investigationApiData != null) {
      if (investigationApiData.rcaRecommended != "") {
        setForm({ ...form, rcaRecommended: investigationApiData.rcaRecommended });
        await handelRcaRecommended("a", investigationApiData.rcaRecommended);
      }
      setInvestigationData({
        startData: investigationApiData.srartDate,
        endDate: investigationApiData.endDate,
        classification: investigationApiData.classification
      })
    }
  }

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
        "Hazardous acts",
        "Hazardous conditions",
        "Corrective actions",
        "Basic cause",
        "PACE Management control",
        "Preventive actions",
        "Additional information",
        "Cause analysis",
      ]);
    } else if (value == "PACE cause analysis") {
      setHideArray(["Cause analysis", "Five Why analysis"]);
    } else if (value == "Cause analysis") {
      setHideArray([
        "Hazardous acts",
        "Hazardous conditions",
        "Corrective actions",
        "Basic cause",
        "PACE Management control",
        "Preventive Actions",
        "Additional information",
        "Five Why analysis",
      ]);
    }
    setForm({ ...form, rcaRecommended: value });
  };

  const handelNext = async (e) => {
    const { error, isValid } = DetailValidation(form);
    let nextPageLink = 0;
    setError(error);
    if (Object.keys(error).length == 0) {
      if (checkPost.current !== false) {
        const res = await api.post(
          `/api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/causeanalysis/`,
          form
        );
        if (res.status == 201) {
          nextPageLink = res.status;
        }
      } else {
        form["pk"] = pkValue.current;
        const res = await api.put(
          `/api/v1/incidents/${putId.current}/causeanalysis/${pkValue.current
          }/`,
          form
        );
        if (res.status == 200) {
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
      } else if (form.rcaRecommended == "PACE cause analysis") {
        history.push(
          "/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
        );
      } else if (form.rcaRecommended == "Cause analysis") {
        console.log("here");
        history.push(
          "/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
        );
      }
    } else if (nextPageLink == 200 && Object.keys(error).length === 0) {
      if (form.rcaRecommended == "Five why analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/why-analysis/`
        );
      } else if (form.rcaRecommended == "PACE cause analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/hazardious-acts/${putId.current
          }`
        );
      } else if (form.rcaRecommended == "Cause analysis") {
        history.push(
          `/app/incident-management/registration/root-cause-analysis/root-cause-analysis/${putId.current
          }`
        );
      }
    }

    // e.preventDefault();
    localStorage.setItem("deleteForm", hideArray);
  };

  useEffect(() => {
    handelUpdateCheck();
    fetchIncidentData();
    setHideArray(localStorage.getItem("deleteForm"));
    handelInvestigationData();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="RCA Details" icon="ion-md-list-box">
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
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                inputVariant="outlined"
                className={classes.formControl}
                ampm={false}
                value={moment(
                  investigationData["startData"]
                ).toISOString()}
                onChange={handleDateChange}
                label="Investigation start date"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DateTimePicker
                autoOk
                inputVariant="outlined"
                className={classes.formControl}
                ampm={false}
                value={moment(
                  investigationData["endData"]
                ).toISOString()}
                onChange={handleDateChange}
                label="Investigation end date"
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Level of classification
            </Typography>
            <Typography className={Type.labelValue}>
              {checkValue(investigationData["classification"])}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
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
                disabled={rcaDisable != "" ? true : false}
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

          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              required
              error={error.evidenceSupport}
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
              {error && error.evidenceSupport && (
                <FormHelperText>{error.evidenceSupport}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              required
              error={error.evidenceContradiction}
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
              {error && error.evidenceContradiction && (
                <FormHelperText>{error.evidenceContradiction}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              component="fieldset"
              required
              error={error.evidenceContradiction}
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
              {error && error.evidenceNotSupport && (
                <FormHelperText>{error.evidenceNotSupport}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        {isDesktop && (
          <Grid item md={3}>
            <FormSideBar
              deleteForm={hideArray}
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem={"RCA Details"}
            />
          </Grid>
        )}
      </Grid>
    </PapperBlock>
  );
};

export default Details;
