import DateFnsUtils from "@date-io/date-fns";
import { Button, Grid } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
// Redux
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { tabViewMode } from "../../../redux/actions/initialDetails";
import Type from "../../../styles/components/Fonts.scss";
import api from "../../../utils/axios";
import { handelActionData, handelValueToLabel } from "../../../utils/CheckerValue";
import { RCAOPTION, ROOT_CAUSE_ANALYSIS_FORM, SUMMERY_FORM } from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import RootCauseValidation from "../../Validator/RCAValidation/RootCauseAnalysisValidation";
import ActionShow from "../ActionShow";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";
import CircularProgress from '@material-ui/core/CircularProgress';



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
  const dispatch = useDispatch()
  const [fkid, setFkid] = useState("")

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
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const checkPost = useRef();
  const pkValue = useRef("");
  const investigationData = useRef({});
  const classificationValues = useRef([]);
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [updatePage, setUpdatePage] = useState(false);
  const [actionData, setActionData] = useState([])

  const handelUpdateCheck = async () => {
    const page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    const incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");

    setFkid(incidentId)

    const previousData = await api.get(
      `/api/v1/incidents/${incidentId}/rootcauses/`
    );

    const allApiData = previousData.data.data.results[0];

    const investigationpreviousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    const investigationApiData = investigationpreviousData.data.data.results[0];
    if (investigationApiData != null) {
      if (investigationApiData.rcaRecommended != "") {
        setForm({
          ...form,
          rcaRecommended: investigationApiData.rcaRecommended,
        });
      }

      investigationData.current = {
        startData: investigationApiData.srartDate,
        endDate: investigationApiData.endDate,
        classification: investigationApiData.classification,
      };
    }

    if (allApiData !== undefined && !isNaN(allApiData.id)) {
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
    classificationValues.current = await PickListData(40);
    2;
  };

  const handelActionShow = (value) => (
    <Grid>
      <ActionShow
        action={{ id: value.id, number: value.actionNumber }}
        title={value.actionTitle}
        companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
        projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
        updatePage={updatePage}
      />
    </Grid>
  );

  const handelActionTracker = async () => {
    let incidentID = localStorage.getItem("fkincidentId")
    let allAction = await handelActionData(incidentID, [], "one")
    await setActionData(allAction);
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

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  const handelNext = async (e) => {
    const { error, isValid } = RootCauseValidation(form);
    setError(error);
    setButtonLoading(true)
    let nextPageLink = 0;
    if (incidents.incidentStage === "Root cause & analysis") {
      const temp = incidents
      temp.incidentStatus = "Done"
      try {
        const res = await api.put(
          `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
      } catch (error) {
        history.push("/app/pages/error")
      }
    }
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
        form.pk = pkValue.current;
        const res = await api.put(
          `/api/v1/incidents/${putId.current}/rootcauses/${pkValue.current}/`,
          form
        );
        if (res.status == 200 && Object.keys(error).length === 0) {
          nextPageLink = res.status;
        }
      }
      if (nextPageLink == 201 && Object.keys(error).length == 0) {
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false
        }
        dispatch(tabViewMode(viewMode))
        history.push(`${SUMMERY_FORM["Summary"]}${fkid}/`);
      } else if (nextPageLink == 200 && Object.keys(error).length == 0) {
        let viewMode = {
          initialNotification: false, investigation: false, evidence: false, rootcauseanalysis: true, lessionlearn: false

        }
        dispatch(tabViewMode(viewMode))
        history.push(`${SUMMERY_FORM["Summary"]}${fkid}/`);
      }
    }
    localStorage.setItem("RootCause", "Done");
    setButtonLoading(false)
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/details/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        "/app/incident-management/registration/root-cause-analysis/details/"
      );
    }
  };

  const handelCallBack = async () => {
    await setLoading(true)
    await handelUpdateCheck();
    await fetchIncidentData()
    await handelActionTracker()
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Cause Analysis" icon="ion-md-list-box">
      {loading == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>

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
                <Typography variant="h6" className={Type.labelName} gutterBottom>
                  Level of classification
                </Typography>
                <Typography className={Type.labelValue}>
                  {handelValueToLabel(investigationData.current["classification"])}
                </Typography>
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
                    Would corrective actions prevent simailar incidents in
                    future?*
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
                  disabled={buttonLoading}
                >
                  Submit{buttonLoading && <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem="Cause analysis"
              />
            </Col>
          )}
        </Row>
        :
        <Loader />
      }
    </PapperBlock>
  );
};
export default RootCauseAnalysis;
