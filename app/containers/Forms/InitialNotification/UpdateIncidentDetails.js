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
import IconButton from "@material-ui/core/IconButton";
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

import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import ReportingValidation from "../../Validator/ReportingValidation";
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

const ReportingAndNotification = () => {
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(true);
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

  const handleDateChange = (date) => {
    setForm({
      ...form,
      reportingdate: date,
    });
  };

  // handleInitailEvidance
  const handleInitialEvidance = async () => {
    // Create new Evidance
    const formData = new FormData();
    for (let i = 0; i < evidanceForm.length; i++) {
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
  };

  // Update initial details
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

    console.log(form);

    // put call for update incident Details
    const res = await api.put(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
      temp
    );
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

    // create New Initial Evidance
    await handleInitialEvidance();

    // getting fileds for update

    // put call for update incident Details
    handleUpdateIncidentDetails();

    const { error, isValid } = ReportingValidation(form);
    setError(error);

    if (isValid === true) {
      // Delete existing report to and create new ones.
      for (let key in reportedToObj) {
        let reportId = reportedToObj[key].id;
        try {
          const res = await api.delete(
            `/api/v1/incidents/${id}/reports/${reportId}/`
          );
        } catch (err) {}
      }

      // Create new entries.
      for (let key in form.reportedto) {
        let name = form.reportedto[key];

        try {
          const res = await api.post(`/api/v1/incidents/${id}/reports/`, {
            reportTo: name,
            createdBy: 1,
            fkIncidentId: localStorage.getItem("fkincidentId") || id,
          });
        } catch (err) {}
      }

      history.push(
        `/app/incident-management/registration/summary/summary/${localStorage.getItem(
          "fkincidentId"
        )}`
      );
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
      const report = result[0].reportTo;
      // form.reportedto = report.split(",")
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
      setReportedToObj(result);
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
      setIsLoading(true);
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
                      // defaultValue={"Orher name"}
                      className={classes.formControl}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          reportedto: [...form.reportedto, e.target.value],
                        })
                      }
                    />
                  ) : null}
                </FormGroup>
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
                  Notification to be sent
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
                  Initial evidences
                </Typography>
              </Box>
              {/* <UploadInputAll/> */}

              {evidanceForm.map((item, index) => (
                <>
                  <input
                    type="file"
                    onChange={(e) =>
                      handleEvidanceForm(e, index, "evidenceDocument")
                    }
                    showPreviews
                  />
                  <TextField
                    id="evidanceRemark"
                    variant="outlined"
                    label="evidanceRemark"
                    className={classes.formControl}
                    onChange={(e) =>
                      handleEvidanceForm(e, index, "evidenceRemark")
                    }
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleRemoveEvidance(index)}
                  >
                    Remove
                  </Button>
                </>
              ))}
              {error && error.fileupload ? <p>{error.fileupload}</p> : null}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handleNewEvidance(e)}
              >
                Add
              </Button>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="supervisor-name"
                variant="outlined"
                label="Supervisor name"
                defaultValue={incidentsListData.supervisorByName || ""}
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supervisorname: e.target.value.toString(),
                  });
                }}
              />
            </Grid>

            <Grid item md={6}>
              <TextField
                id="othersName"
                variant="outlined"
                label="Others name"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    othername: e.target.value.toString(),
                  });
                }}
              />
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
                    handelTimeCompare();
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
                      : ""
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

            <Grid item md={6}>
              {form.reportedby === "Other" ? (
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      others: e.target.value.toString(),
                    });
                  }}
                />
              ) : null}
            </Grid>
            {lateReport ? (
              <Grid item md={12}>
                <TextField
                  id="reason"
                  variant="outlined"
                  label="Reason for reporting later than 4 hours"
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
              selectedItem={"Reporting and Notification"}
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
