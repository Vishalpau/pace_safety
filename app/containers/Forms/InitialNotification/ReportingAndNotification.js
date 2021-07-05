import React, { useState, useEffect } from "react";
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
    margin: ".5rem 0",
  },
  spacer: {
    marginTop: "1rem",
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
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [reportsListData, setReportListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(true);
  const [clearedDate, handleClearedDateChange] = useState(null);
  const [reportedTo, setReportableTo] = useState([]);
  const [reportId, setReportId] = useState([]);
  const [evidanceForm, setEvidanceForm] = useState([{
    evidenceCheck: 'Yes',
    evidenceNumber: 'string',
    evidenceCategory: 'Initial Evidence',
    evidenceRemark: '',
    status: 'Active',
    createdBy: 0,
    updatedBy: 0,
    evidenceDocument:'',
    fkIncidentId: localStorage.getItem('fkincidentId')
  }])

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

  const handleDateChange = (date) => {
    setForm({
      ...form,
      reportingdate: date,
    });
  };

  const handelTimeChange = async (date) => {
    const onlyTime = moment(date).format("HH:mm:ss");
    await setForm({
      ...form,
      reportingtime: onlyTime,
    });
    setSelectedTime(date);
  };

  const handleDrop = (acceptedFiles) => {
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      setFiles(acceptedFiles[i]);
      formData.append("evidenceDocument", acceptedFiles[i]);
      formData.append("evidenceCategory", "Initial Evidence ");
      formData.append("createdBy", "1");
      formData.append("fkIncidentId", localStorage.getItem("fkincidentId"));
      const evidanceResponse = api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/evidences/`,
        formData
      );
    }

    setForm({
      ...form,
      fileupload: acceptedFiles,
    });
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  const handelNext = async (e) => {
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

    // Update case.
    if (reportData.length > 0) {
      // reported to api call
      const res = await api.put(
        `/api/v1/incidents/${id}/reports/${reportId}/`,
        {
          reportTo: form.reportedto.includes("Others")
            ? form.reportedto.concat([otherdata]).toString()
            : form.reportedto.toString(),
          reportingNote: otherdata,
          createdBy: 0,
          fkIncidentId: id,
        }
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    } else {
      // const { error, isValid } = ReportingValidation(form);
      // setError(error);

      // reported to api call
      const res = await api.post(`/api/v1/incidents/${fkid}/reports/`, {
        reportTo: form.reportedto.includes("Others")
          ? form.reportedto.concat([otherdata]).toString()
          : form.reportedto.toString(),
        reportingNote: otherdata,
        createdBy: 0,
        fkIncidentId: fkid,
      });
      if (res.status === 201) {
        // Hit another API call.

        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    }
  };

  // handle add newEvidance
  const handleAddNewEvidance = ()=>{
      setEvidanceForm([
        ...evidanceForm,
        {
          evidenceCheck: 'Yes',
          evidenceNumber: 'string',
          evidenceCategory: 'Initial Evidence',
          evidenceRemark: '',
          status: 'Active',
          createdBy: 0,
          updatedBy: 0,
          evidenceDocument:'',
          fkIncidentId: localStorage.getItem('fkincidentId')
        },
      ]);
  }

  // handle remove evidance
  const handleRemoveEvidance = async(key) => {
    const temp = [...evidanceForm];
    const newData = temp.filter((item, index) => index !== key);
    await setEvidanceForm(newData);
  }

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

  // fetch reportList
  const fetchReportsDataList = async () => {
    const res = await api.get(`/api/v1/incidents/${id}/reports/`);
    const result = res.data.data.results;
    if (result.length > 0) {
      const report = result[0].reportTo;
      // form.reportedto = report.split(",")
      await setForm({ ...form, reportedto: report.split(",") });
      await setReportId(result[0].id);
    }

    await setIsLoading(true);
  };

  //  Fetch checkbox value
  const fetchReportableTo = async () => {
    const res = await api.get("/api/v1/lists/20/value");
    const result = res.data.data.results;
    await setReportableTo(result);
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
    fetchReportableTo();
    fetchIncidentsData();
    if (id) {
      fetchReportsDataList();
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
                      onChange={(e) => setOtherData(e.target.value)}
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
                  Initial Evidences
                </Typography>
              </Box>

              {/* <UploadInputAll/> */}
              {evidanceForm.map((item,index)=><>
              <DropzoneArea initialFiles={['data:image/jpeg;base64,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']} onChange={(e) => handleDrop(e)} />
              {error && error.fileupload ? <p>{error.fileupload}</p> : null}
              <Grid item md={6}>
              <TextField
                id="evidance-remark"
                variant="outlined"
                label="Evidance Remark"
                defaultValue={incidentsListData.supervisorByName}
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supervisorname: e.target.value.toString(),
                  });
                }}
              />
            </Grid>
            <Grid item md={3}>
           {evidanceForm.length >1?
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handleRemoveEvidance(index)}
              >
                Remove
              </Button>:null}
            </Grid>
            </>)}
            <Grid item md={2}> <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={(e) => handleAddNewEvidance()}
              >
                Add
              </Button></Grid>
            </Grid>

            <Grid item md={6}>
              <TextField
                id="supervisor-name"
                variant="outlined"
                label="Supervisor Name"
                defaultValue={incidentsListData.supervisorByName}
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
                label="Others Name"
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
                  label="Reporting Date"
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
                <InputLabel id="reportedBy-label">Reported By</InputLabel>
                <Select
                  labelId="reportedBy-label"
                  id="reportedBy"
                  label="Reported By"
                  defaultValue={incidentsListData.incidentReportedByName}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedby: e.target.value.toString(),
                    });
                  }}
                >
                  {selectValues.map((selectValues, index) => (
                    <MenuItem key={index} value={selectValues}>
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
                {error && error.reportedby ? (
                  <FormHelperText>{error.reportedby}</FormHelperText>
                ) : null}
              </FormControl>
            </Grid>

            <Grid item md={6}>
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
                disabled={form.reportedby !== "Other"}
              />
            </Grid>
            {lateReport ? (
              <Grid item md={12}>
                <TextField
                  id="reason"
                  variant="outlined"
                  label="Resaon for Reporting Later than 4 Hours"
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
                label="Additional Details if Any"
                multiline
                rows="4"
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
