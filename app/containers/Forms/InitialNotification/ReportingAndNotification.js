import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";

// import { DropzoneArea, DropzoneDialogBase } from 'material-ui-dropzone';

import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import moment from "moment";
import { useHistory, useParams } from "react-router";

import axios from "axios";
import FormSideBar from "../FormSideBar";
import {
  access_token,
  ACCOUNT_API_URL,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
} from "../../../utils/constants";
// import FormHeader from '../FormHeader';

import ReportingValidation from "../../Validator/ReportingValidation";
// import InitialEvidenceValidate from '../../Validator/InitialEvidance';

import api from "../../../utils/axios";

// import UploadInputAll from '../demos/UploadInputAll';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ReportingAndNotification = () => {
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(false);
  const [reportedTo, setReportableTo] = useState([]);
  const [reportOtherData, setReportOtherData] = useState("");
  const [reportedToObj, setReportedToObj] = useState([]);
  const [superVisorName, setSuperVisorName] = useState([]);
  const [reportedByName, setReportedByName] = useState([]);
  const [evidence, setEvidence] = useState([])
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const userId = JSON.parse(localStorage.getItem('userDetails')).id;

  const [evidanceForm, setEvidanceForm] = useState([
    {
      evidenceCheck: "Yes",
      evidenceNumber: "string",
      evidenceCategory: "Initial Evidence",
      evidenceRemark: "",
      evidenceDocument: "",
      status: "Active",
      createdBy: parseInt(userId),
      updatedBy: parseInt(userId),
      fkIncidentId: localStorage.getItem(""),
    },
  ]);

  const { id } = useParams();
  const history = useHistory();
  let reportedToFilterData = [];
  let filterSuperVisorName = [];
  let filterReportedByName = [];

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
    supervisorOtherName: "",
    reportedByOtherName: "",
  });

  const notificationSent = ["Manager", "Supervisor"];
  let evidanceCkecked = true;

  const handleDateChange = async (date) => {
    // compare time

    await setForm({
      ...form,
      reportingdate: date,
    });
  };

  // handle update incident
  const handleUpdateIncidentDetails = async () => {
    const fkid = localStorage.getItem("fkincidentId");
    const temp = incidentsListData;
    if (form.supervisorname === "other") {
      temp.supervisorByName =
        form.supervisorOtherName || incidentsListData.supervisorByName;
    } else {
      temp.supervisorByName =
        form.supervisorname || incidentsListData.supervisorByName;
    }

    temp.supervisorById = 1;
    temp.incidentReportedOn =
      moment(form.reportingdate).toISOString() ||
      incidentsListData.incidentReportedOn;
    if (form.reportedby === "other") {
      temp.incidentReportedByName =
        form.reportedByOtherName || incidentsListData.incidentReportedByName;
    } else {
      temp.incidentReportedByName =
        form.reportedby || incidentsListData.incidentReportedByName;
    }

    temp.incidentReportedById = 1;
    temp.reasonLateReporting =
      form.latereporting || incidentsListData.reasonLateReporting;
    temp.notificationComments =
      form.additionaldetails || incidentsListData.notificationComments;
    temp.updatedAt = moment(new Date()).toISOString();
    temp.updatedBy = parseInt(userId);

    // put call for update incident Details
    const res = await api.put(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
      temp
    );
  };

  const handleRemoveExitingReport = async () => {
    // Delete existing report to and create new ones.
    if (reportedToObj.length > 0) {
      for (const key in reportedToObj) {
        const reportId = reportedToObj[key].id;

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
    let status = 0;
    // check condition initial evidance is or not
    if (
      evidanceForm[0].evidenceDocument === "" &&
      evidanceForm[0].evidenceRemark === ""
    ) {
      evidanceCkecked = true;
    } else {
      for (let i = 0; i < evidanceForm.length; i++) {
        // check condition both filled is required
        const formData = new FormData();
        if (
          evidanceForm[i].evidenceDocument !== "" &&
          evidanceForm[i].evidenceRemark !== ""
        ) {
          formData.append("evidenceDocument", evidanceForm[i].evidenceDocument);
          formData.append("evidenceRemark", evidanceForm[i].evidenceRemark);
          formData.append("evidenceCheck", "Yes");
          formData.append("evidenceCategory", "Initial Evidence ");
          formData.append("createdBy", parseInt(userId));
          formData.append("fkIncidentId", localStorage.getItem("fkincidentId"));
          const evidanceResponse = await api.post(
            `api/v1/incidents/${localStorage.getItem(
              "fkincidentId"
            )}/evidences/`,
            formData
          );

          status = evidanceResponse.status;
        }
      }
      if (status === 201) {
        evidanceCkecked = true;
      } else {
        evidanceCkecked = false;
        await setMessage("File uploading failed! invalid document/remark");
        await setMessageType("error");
        await setOpen(true);
      }
    }
  };

  // send request other data in report to
  const setOtherDataReportTo = async () => {
    if (reportOtherData !== "") {
      if (form.reportedto.includes("Others")) {
        try {
          const res = await api.post(`/api/v1/incidents/${id}/reports/`, {
            reportTo: reportOtherData,
            createdBy: parseInt(userId),
            fkIncidentId: localStorage.getItem("fkincidentId") || id,
          });
        } catch (err) {}
      }
    }
  };

  // handleSubmit incident details
  const handelNext = async (e) => {
    // handle remove existing report
    await handleRemoveExitingReport();

    // update incident details
    await handleUpdateIncidentDetails();

    // handle Initail evidance
    await handleInitialEvidance();

    // check initial evidance
    if (evidanceCkecked === true) {
      let status = 0;

      // Create new entries.
      const { error, isValid } = ReportingValidation(form, reportOtherData);
      setError(error);

      if (isValid === true) {
        var newData = [];
        reportedToFilterData = [];
        for (var key in reportedTo) {
          reportedToFilterData.push(reportedTo[key].inputValue);
        }
        for (var i = 0; i < 8; i++) {
          if (reportedToFilterData.includes(form.reportedto[i])) {
            if (form.reportedto[i] !== undefined) {
              newData.push(form.reportedto[i]);
            }
          }
        }
        let unique = [...new Set(newData)];
        for (const key in unique) {
          const name = unique[key];

          try {
            const res = await api.post(
              `/api/v1/incidents/${localStorage.getItem(
                "fkincidentId"
              )}/reports/`,
              {
                reportTo: name,
                createdBy: parseInt(userId),
                fkIncidentId: localStorage.getItem("fkincidentId") || id,
              }
            );
            status = res.status;
          } catch (err) {}
        }

        // set in reportTo otherData
        await setOtherDataReportTo();

        if (status === 201) {
          history.push(
            `/app/incident-management/registration/summary/summary/${localStorage.getItem(
              "fkincidentId"
            )}`
          );
        }
      }
    }
  };
  // handle checkbox reported to
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
        createdBy: parseInt(userId),
        updatedBy: parseInt(userId),
        fkIncidentId: localStorage.getItem(""),
      },
    ]);
  };

  // handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // handle form initial evidance
  const handleEvidanceForm = async (e, key, fieldname) => {
    const temp = [...evidanceForm];
    const { value } = e.target;
    if (fieldname === "evidenceDocument") {
      if (e.target.files[0].size <= 1024 * 1024 * 25) {
        temp[key][fieldname] = e.target.files[0];
        await setMessage("File uploaded successfully!");
        await setMessageType("success");
        await setOpen(true);
      } else {
        await setMessage("File uploading failed! Select file less than 25MB!");
        await setMessageType("error");
        await setOpen(true);
      }
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

  // handle remove initial evidance from databse

  const removeInitialEvidance = async (evidenceId)=>{
    const res = await api.delete(`api/v1/incidents/${id}/evidences/${evidenceId}/`)
    if(res.status === 200){
      await fetchEvidanceData();
    }

  }
  //  Fetch checkbox value
  const fetchReportableTo = async () => {
    const res = await api.get("/api/v1/lists/20/value");
    const result = res.data.data.results;
    for (var key in result) {
      reportedToFilterData.push(result[key].inputValue);
    }
    await setReportableTo(result);
  };

  // fetch reportList
  const fetchReportsDataList = async () => {
    await fetchReportableTo();
    const res = await api.get(`/api/v1/incidents/${id}/reports/`);
    const result = res.data.data.results;
    if (result.length > 0) {
      const reportToData = [];
      for (const key in result) {
        reportToData.push(result[key].reportTo);
      }
      for (var i = 0; i < 8; i++) {
        if (!reportedToFilterData.includes(reportToData[i])) {
          if (reportToData[i] !== undefined) {
            setReportOtherData(reportToData[i]);
          }
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

    if (res.status === 200) {
      const result = res.data.data.results;
      const incidentOccuredOn = result.incidentOccuredOn;
      const start_time = new Date(incidentOccuredOn);
      const incidentReportedOn = result.incidentReportedOn
      const end_time = new Date(incidentReportedOn);
      const diff = end_time - start_time;
      const hours = Math.floor(diff / 1000 / 60 / 60);

      if (hours >= 4) {
        await SetLateReport(true);
      } else {
        await SetLateReport(false);
      }
      await setIncidentsListdata(result);
      if(filterSuperVisorName.filter(
        (item) =>
          item.name === result.supervisorByName
      ).length > 0){
        alert(superVisorName.filter(
          (item) =>
            item.name === result.supervisorByName
        ).length > 0)
        await setForm({...form,supervisorname:"other"})
      }
      if (!id) {
        await setIsLoading(true);
      }
    }
  };

  // fetch supervisor name

  const fetchSuperVisorName = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/roles/4/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].roles[0].users;
          filterSuperVisorName = result;
          setSuperVisorName([...result, { name: "other" }]);
        }
      })
      .catch((error) => {});
  };

  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].users;
          let user = [];
          user = result;
          for (var i in result) {
            filterReportedByName.push(result[i].name);
          }
          setReportedByName([...result, { name: "other" }]);
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };

  // Fetch Evidance data
  const fetchEvidanceData = async () => {  
    const allEvidence = await api.get(`/api/v1/incidents/${id}/evidences/`);
    if(allEvidence.status === 200){
      await setEvidence(allEvidence.data.data.results);
    }
  };

  // handle go back
  const handleGoBack = () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));
    if (nextPath.environmentAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/environment-affected/${id}`
      );
    } else if (nextPath.equipmentAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/equipment-affected/${id}`
      );
    } else if (nextPath.propertyAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/property-affected/${id}`
      );
    } else if (nextPath.personAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/peoples-afftected/${id}`
      );
    } else {
      history.push(
        `/app/incident-management/registration/initial-notification/incident-details/${id}`
      );
    }
  };

  useEffect(() => {
    fetchSuperVisorName();
    fetchReportedBy();
    fetchIncidentsData();
    if (id) {
      fetchReportsDataList();
      fetchEvidanceData();
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
              <FormControl
                component="fieldset"
                required
                error={error && error.reportedto}
                className={classes.formControl}
              >
                <FormLabel component="legend">Reportable to</FormLabel>
                <FormGroup>
                  {reportedTo.map((value, key) => (
                    <FormControlLabel
                      id={key}
                      key={key}
                      value={value.inputValue}
                      control={<Checkbox />}
                      label={value.inputValue}
                      checked={!!form.reportedto.includes(value.inputValue)}
                      onChange={(e) => {
                        handelReportedTo(e, value.inputValue, "option");
                      }}
                    />
                  ))}
                </FormGroup>
                {error && error.reportedto && (
                  <FormHelperText>{error.reportedto}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {form.reportedto.includes("Others") ? (
              <Grid item md={12}>
                <TextField
                  id="Other"
                  variant="outlined"
                  label="Other"
                  error={error && error[`otherData`]}
                  helperText={
                    error && error[`otherData`] ? error[`otherData`] : null
                  }
                  defaultValue={reportOtherData}
                  className={classes.formControl}
                  onChange={(e) => {
                    setReportOtherData(e.target.value);
                  }}
                />
              </Grid>
            ) : null}

            <Grid item lg={12} md={6} sm={6}>
              <FormControl
                component="fieldset"
                // required
                // error={error && error.isnotificationsent}
              >
                <FormLabel component="legend">
                  Notification to be sent?
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
              </FormControl>
            </Grid>

            <Grid item lg={12} justify="flex-start">
              <Box marginTop={3} marginBottom={4}>
                <Typography variant="h6" gutterBottom>
                  Initial evidences
                </Typography>
              </Box>
           
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
                  <Grid item md={6}>
                    <TextField
                      id="evidanceRemark"
                      size="small"
                      variant="outlined"
                      label="Evidences remark"
                      className={classes.formControl}
                      onChange={(e) =>
                        handleEvidanceForm(e, index, "evidenceRemark")
                      }
                    />
                  </Grid>
                  <Grid item md={1}>
                    <IconButton
                      variant="contained"
                      color="primary"
                      onClick={() => handleRemoveEvidance(index)}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              {error && error.fileupload ? <p>{error.fileupload}</p> : null}
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  className={classes.button}
                  onClick={(e) => handleNewEvidance(e)}
                >
                  Add
                </Button>
              </Grid>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={messageType}>
                  {message}
                </Alert>
              </Snackbar>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                // required
                className={classes.formControl}
                // error={error && error.reportedby}
              >
                <InputLabel id="supervisorname-label">
                  Supervisor name
                </InputLabel>
                <Select
                  labelId="supervisorname-label"
                  id="supervisorname"
                  label="Supervisor name"
                  // defaultValue={incidentsListData.supervisorByName? incidentsListData.supervisorByName: ""}
                  defaultValue={
                    incidentsListData.supervisorByName === ""
                      ? ""
                      : superVisorName.filter(
                          (item) =>
                            item.name === incidentsListData.supervisorByName
                        ).length > 0
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
                  {superVisorName.map((value, index) => (
                    <MenuItem key={index} value={value.name}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* {error && error.reportedby ? (
                  <FormHelperText>{error.reportedby}</FormHelperText>
                ) : null} */}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="others"
                variant="outlined"
                label="Others"
                defaultValue={
                  superVisorName.filter(
                    (item) => item.name === incidentsListData.supervisorByName
                  ).length > 0
                    ? ""
                    : incidentsListData.supervisorByName
                }
                disabled={
                  form.supervisorname !== "other"
                }
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supervisorOtherName: e.target.value.toString(),
                  });
                }}
              />

              {error && error.othername ? <p>{error.othername}</p> : null}
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                // required
                className={classes.formControl}
                // error={error && error.reportedby}
              >
                <InputLabel id="reportedBy-label">Reported by</InputLabel>
                <Select
                  labelId="reportedBy-label"
                  id="reportedBy"
                  label="Reported by"
                  defaultValue={
                    incidentsListData.incidentReportedByName === ""
                      ? ""
                      : reportedByName.filter(
                          (item) =>
                            item.name ===
                            incidentsListData.incidentReportedByName
                        ).length > 0
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
                  {reportedByName.map((value, index) => (
                    <MenuItem key={index} value={value.name}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* {error && error.reportedby ? (
                  <FormHelperText>{error.reportedby}</FormHelperText>
                ) : null} */}
              </FormControl>
            </Grid>
            <Grid item md={6}>
              <TextField
                id="others"
                variant="outlined"
                label="Others"
                defaultValue={
                  incidentsListData.incidentReportedByName === ""
                    ? ""
                    : reportedByName.filter(
                        (item) =>
                          item.name === incidentsListData.incidentReportedByName
                      ).length > 0
                    ? ""
                    : incidentsListData.incidentReportedByName
                }
                className={classes.formControl}
                disabled={
                  form.reportedby !== "other" 
                }
                onChange={(e) => {
                  setForm({
                    ...form,
                    reportedByOtherName: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item md={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  id="date-picker-dialog"
                  // error={error && error.reportingdate}
                  // helperText={
                  //   error && error.reportingdate ? error.reportingdate : null
                  // }
                  format="yyyy/MM/dd HH:mm"
                  // required
                  inputVariant="outlined"
                  label="Reporting date"
                  value={incidentsListData.incidentReportedOn}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  disableFuture
                  disabled
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item md={12}>
              <TextField
                id="reason"
                variant="outlined"
                label="Reason for reporting later than 4 hours"
                multiline
                error={error && error.latereporting}
                disabled={!lateReport}
                // required
                // helperText={
                //   error && error.latereporting ? error.latereporting : null
                // }
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
                onClick={(e) => handleGoBack(e)}
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
              deleteForm={localStorage.getItem("deleteForm")}
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="Reporting and notification"
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
