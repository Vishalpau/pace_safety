import React, { useState, useEffect, useRef } from "react";
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
  KeyboardTimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";
import { MaterialDropZone } from "dan-components";
import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneDialogBase } from "material-ui-dropzone";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";

import ReportingValidation from "../../Validator/ReportingValidation";
import InitialEvidenceValidate from "../../Validator/InitialEvidance";

import api from "../../../utils/axios";
import UploadInputAll from "../demos/UploadInputAll";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
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
  button: {
    margin: theme.spacing(1),
  },
}));

const UploadInputImg = () => {
  const [files] = useState([]);

  return (
    <Fragment>
      <div>
        <MaterialDropZone
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          files={files}
          showPreviews
          maxSize={5000000}
          filesLimit={5}
          text="Drag and drop image(s) here or click"
        />
      </div>
    </Fragment>
  );
};

const ReportingAndNotification = () => {
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(false);
  const [reportedTo, setReportableTo] = useState([]);
  const [reportOtherData, setReportOtherData] = useState("");
  let [reportedToObj, setReportedToObj] = useState([]);
  const [evidanceForm, setEvidanceForm] = useState([
    {
      evidenceCheck: "Yes",
      evidenceNumber: "string",
      evidenceCategory: "Initial Evidence",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: 1,
      updatedBy: 1,
      fkIncidentId: localStorage.getItem(""),
    },
  ]);

  const { id } = useParams();

  const [form, setForm] = useState({
    reportedto: [],
    isnotificationsent: "",
    fileupload: "",
    supervisorname: "",
    othername: "",
    reportingdate: null,
    reportingtime: null,
    reportedby: "",
    others: "",
    latereporting: "",
    additionaldetails: "",
  });

  const history = useHistory();

  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4, "Other"];
  const [selectedTime, setSelectedTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [otherdata, setOtherData] = useState("");
  const [fileNames, setFileNames] = useState("");
  const [reportData, setReportData] = useState([]);

  const handelTimeCompare = async (e) => {
    let rpTime = form.reportingtime;
    let rpDate = form.reportingdate;
    let startDate = `${rpDate} ${rpTime}`;
    // let startDate = form.reportingdate.concat(form.reportingtime)
    var start_date = moment(
      form.reportingdate || incidentsListData.incidentReportedOn,
      "YYYY-MM-DD HH:mm:ss"
    );
    var end_date = moment(new Date(), "YYYY-MM-DD HH:mm:ss");
    var duration = moment.duration(end_date.diff(start_date));
    var Hours = duration.asHours();
    if (Hours > 4) {
      await SetLateReport(true);
    } else {
      await SetLateReport(false);
    }
  };

  const handleDateChange = async (date) => {
    var time = date || incidentsListData.incidentReportedOn;
    var start_time = new Date(time);
    var end_time = new Date();
    var diff = end_time - start_time;
    var hours = Math.floor(diff / 1000 / 60 / 60);

    console.log(hours);
    if (hours > 4) {
      await SetLateReport(true);
    } else {
      await SetLateReport(false);
    }
    await setForm({
      ...form,
      reportingdate: date,
    });
  };

  const handleUpdateIncidentDetails = async () => {
    // const { error, isValid } = ReportingValidation(form);
    // setError(error);
    // getting fileds for update
    const fkid = localStorage.getItem("fkincidentId");
    const temp = incidentsListData;
    temp.supervisorByName =
      form.supervisorname || incidentsListData.supervisorByName;
    temp.supervisorById = 1;
    temp.incidentReportedOn =
      moment(form.reportingdate).toISOString() ||
      incidentsListData.incidentReportedOn;
    temp.incidentReportedByName =
      form.reportedby || incidentsListData.incidentReportedByName;
    temp.incidentReportedById = 1;
    temp.reasonLateReporting =
      form.latereporting || incidentsListData.reasonLateReporting;
    temp.notificationComments =
      form.additionaldetails || incidentsListData.notificationComments;
    temp.updatedAt = moment(new Date()).toISOString();
    temp.updatedBy = "0";

    // put call for update incident Details
    const res = await api.put(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
      temp
    );
  };

  const handleRemoveExitingReport = async () => {
    // Delete existing report to and create new ones.
    if (reportedToObj.length > 0) {
      for (let key in reportedToObj) {
        let reportId = reportedToObj[key].id;

        try {
          const res = await api.delete(
            `/api/v1/incidents/${id}/reports/${reportId}/`
          );
        } catch (err) {}
      }
    }
  };

  // handleInitailEvidance
  const handleInitialEvidance = async () => {
    // Create new Evidance

    const formData = new FormData();

    for (let i = 0; i < evidanceForm.length; i++) {
      if (
        evidanceForm[i].evidenceDocument !== "" &&
        evidanceForm[i].evidenceRemark !== ""
      ) {
        formData.append("evidenceDocument", evidanceForm[i].evidenceDocument);
        formData.append("evidenceDocument", evidanceForm[i].evidenceRemark);
        formData.append("evidenceCheck", "Yes");
        formData.append("evidenceCategory", "Initial Evidence ");
        formData.append("createdBy", "1");
        formData.append("fkIncidentId", localStorage.getItem("fkincidentId"));
        const evidanceResponse = await api.post(
          `api/v1/incidents/${localStorage.getItem("fkincidentId")}/evidences/`,
          formData
        );
      }
    }
  };

  // send request other data in report to
  const setOtherDataReportTo = async () => {
    if (reportOtherData !== "") {
      try {
        const res = await api.post(`/api/v1/incidents/${id}/reports/`, {
          reportTo: reportOtherData,
          createdBy: 1,
          fkIncidentId: localStorage.getItem("fkincidentId") || id,
        });
      } catch (err) {}
    } else {
      return;
    }
  };

  const handelNext = async (e) => {
    // set in reportTo otherData
    await setOtherDataReportTo();

    // update incident details
    await handleUpdateIncidentDetails();

    // handle Initail evidance
    await handleInitialEvidance();

    // handle remove existing report
    await handleRemoveExitingReport();

    let status = 0;
    // Create new entries.
    const { error, isValid } = ReportingValidation(form);
    setError(error);
    console.log(error);

    if (isValid === true) {
      for (let key in form.reportedto) {
        let name = form.reportedto[key];

        try {
          const res = await api.post(
            `/api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/reports/`,
            {
              reportTo: name,
              createdBy: 1,
              fkIncidentId: localStorage.getItem("fkincidentId") || id,
            }
          );
          status = res.status;
        } catch (err) {}
      }

      if (status === 201) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    }
  };

  const handelReportedTo = async (e, value, type) => {
    if ((type = "option")) {
      if (e.target.checked == false) {
        const newData = form.reportedto.filter((item) => item !== value);

        await setForm({
          ...form,
          reportedto: newData,
        });

        // let newReportedTo = [];
      } else {
        await setForm({
          ...form,
          reportedto: [...form.reportedto, value],
        });
      }
    }
  };

  // handle New Evidance

  const handleNewEvidance = () => {
    setEvidanceForm([
      ...evidanceForm,
      {
        evidenceCheck: "Yes",
        evidenceNumber: "string",
        evidenceCategory: "Initial Evidence",
        evidenceRemark: "",
        evidenceDocument: "",
        status: "Active",
        createdBy: 1,
        updatedBy: 1,
        fkIncidentId: localStorage.getItem(""),
      },
    ]);
  };

  // handle form
  const handleEvidanceForm = async (e, key, fieldname) => {
    const temp = [...evidanceForm];
    const { value } = e.target;
    if (fieldname === "evidenceDocument") {
      temp[key][fieldname] = e.target.files[0];
    } else {
      temp[key][fieldname] = value;
    }

    await setEvidanceForm(temp);
  };
  // handle remove evidance
  const handleRemoveEvidance = async (key) => {
    const temp = [...evidanceForm];
    const newData = temp.filter((item, index) => index !== key);
    await setEvidanceForm(newData);
  };
  //  Fetch checkbox value
  const fetchReportableTo = async () => {
    const res = await api.get("/api/v1/lists/20/value");
    const result = res.data.data.results;
    await setReportableTo(result);
  };

  // fetch reportList
  const fetchReportsDataList = async () => {
    await fetchReportableTo();
    const res = await api.get(`/api/v1/incidents/${id}/reports/`);
    const result = res.data.data.results;
    if (result.length > 0) {
      let reportToData = [];
      for (let key in result) {
        reportToData.push(result[key]["reportTo"]);
      }
      for (let i in reportToData) {
        if (
          reportToData[i] !== "Internal Leadership" ||
          reportToData[i] !== "OHS" ||
          reportToData[i] !== "Environment Officer" ||
          reportToData[i] !== "Police" ||
          reportToData[i] !== "Others"
        ) {
          await setReportOtherData(reportToData[i]);
        }
      }
      await setReportedToObj(result);
      await setForm({ ...form, reportedto: reportToData });
    }

    await setIsLoading(true);
  };

  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    const date = new Date(result.incidentReportedOn);
    await setForm({ ...form, reportingdate: date });
    await setIncidentsListdata(result);
    if (!id) {
      await setIsLoading(true);
    }
  };

  useEffect(() => {
    fetchIncidentsData();
    if (id) {
      fetchReportsDataList();
    } else {
      fetchReportableTo();
    }
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Reporting and Notification" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Reportable to</FormLabel>

                <FormGroup>
                  {reportedTo.map((value, key) => (
                    <FormControlLabel
                      id={key}
                      key={key}
                      value={value.inputValue}
                      control={<Checkbox />}
                      label={value.inputValue}
                      checked={
                        form.reportedto.includes(value.inputValue)
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        handelReportedTo(e, value.inputValue, "option");
                      }}
                    />
                  ))}
                  {form.reportedto.includes("Others") ? (
                    <TextField
                      id="Other"
                      variant="outlined"
                      label="Other"
                      defaultValue={reportOtherData}
                      className={classes.formControl}
                      onChange={(e) => {
                        setReportOtherData(e.target.value);
                      }}
                    />
                  ) : null}
                </FormGroup>
                {error && error.reportedto && <p>{error.reportedto}</p>}
              </FormControl>
            </Grid>

            <Grid item lg={12} md={6} sm={6}>
              {/* <p>Notification to be sent</p> */}
              <FormControl
                component="fieldset"
                required
                error={error && error.isnotificationsent}
              >
                <FormLabel component="legend">
                  Notification to be Sent ?
                </FormLabel>
                {notificationSent.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Checkbox />}
                    label={value}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isnotificationsent: e.target.value,
                      });
                    }}
                  />
                ))}
                {error && error.isnotificationsent && (
                  <FormHelperText>{error.isnotificationsent}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item lg={12} justify="flex-start">
              {/* <p>Initial Evidences</p> */}

              <Box marginTop={3} marginBottom={4}>
                <Typography variant="h6" gutterBottom>
                  Initial Evidences
                </Typography>
              </Box>
              {/* <UploadInputAll/> */}

              {evidanceForm.map((item, index) => (
                <Grid container item md={12} spacing={3} alignItems="center">
                  <Grid item md={5}>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleEvidanceForm(e, index, "evidenceDocument")
                      }
                      showPreviews
                    />
                  </Grid>
                  <Grid item md={5}>
                    <TextField
                      id="evidanceRemark"
                      variant="outlined"
                      label="evidanceRemark"
                      className={classes.formControl}
                      onChange={(e) =>
                        handleEvidanceForm(e, index, "evidenceRemark")
                      }
                    />
                  </Grid>
                  <Grid item md={2}>
                    <IconButton
                      color="primary"
                      onClick={() => handleRemoveEvidance(index)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item md={12}>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<AddCircleIcon />}
                  onClick={(e) => handleNewEvidance(e)}
                >
                  Add New
                </Button>
              </Grid>
              {error && error.fileupload ? <p>{error.fileupload}</p> : null}
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
                error={error && error.reportedby}
              >
                <InputLabel id="supervisorname-label">
                  Supervisor name
                </InputLabel>
                <Select
                  labelId="supervisorname-label"
                  id="supervisorname"
                  label="Supervisor name"
                  defaultValue={
                    incidentsListData.supervisorByName
                      ? incidentsListData.supervisorByName
                      : ""
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorname: e.target.value.toString(),
                    });
                  }}
                >
                  {selectValues.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {error && error.reportedby ? (
                  <FormHelperText>{error.reportedby}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              {form.supervisorname === "Other" ? (
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedby: e.target.value,
                    });
                  }}
                />
              ) : null}
              {error && error.othername ? <p>{error.othername}</p> : null}
            </Grid>

            <Grid item md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  id="date-picker-dialog"
                  error={error && error.reportingdate}
                  helperText={
                    error && error.reportingdate ? error.reportingdate : null
                  }
                  format="yyyy/MM/dd HH:mm"
                  required
                  inputVariant="outlined"
                  label="Reporting date"
                  value={
                    form.reportingdate || incidentsListData.incidentReportedOn
                  }
                  onChange={(date) => {
                    handleDateChange(date);
                    // handelTimeCompare();
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
                error={error && error.reportedby}
              >
                <InputLabel id="reportedBy-label">Reported by</InputLabel>
                <Select
                  labelId="reportedBy-label"
                  id="reportedBy"
                  label="Reported by"
                  defaultValue={
                    incidentsListData.incidentReportedByName
                      ? incidentsListData.incidentReportedByName
                      : null
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedby: e.target.value.toString(),
                    });
                  }}
                >
                  {selectValues.map((value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {error && error.reportedby ? (
                  <FormHelperText>{error.reportedby}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            {form.reportedby === "Other" ? (
              <Grid item md={6}>
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedby: e.target.value,
                    });
                  }}
                />
              </Grid>
            ) : null}

            {lateReport ? (
              <Grid item md={12}>
                <TextField
                  id="reason"
                  variant="outlined"
                  label="Resaon for reporting later than 4 hours"
                  multiline
                  error={error && error.latereporting}
                  required
                  helperText={
                    error && error.latereporting ? error.latereporting : null
                  }
                  rows="4"
                  defaultValue={incidentsListData.reasonLateReporting}
                  className={classes.fullWidth}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      latereporting: e.target.value.toString(),
                    });
                  }}
                />
              </Grid>
            ) : null}

            <Grid item md={12}>
              <TextField
                id="additionalDetails"
                variant="outlined"
                label="Additional details if any"
                multiline
                rows="4"
                defaultValue={incidentsListData.notificationComments}
                className={classes.fullWidth}
                onChange={(e) => {
                  setForm({
                    ...form,
                    additionaldetails: e.target.value.toString(),
                  });
                }}
              />
            </Grid>

            <Grid item md={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => history.goBack()}
              >
                Previous
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handelNext(e)}
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
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default ReportingAndNotification;
