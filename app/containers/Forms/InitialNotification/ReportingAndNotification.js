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
import {MaterialDropZone} from 'dan-components';
import { DropzoneArea } from "material-ui-dropzone";
import { DropzoneDialogBase } from "material-ui-dropzone";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import CloseIcon from "@material-ui/icons/Close";
import moment from "moment";
import { useHistory, useParams } from "react-router";

import { DateTimePicker, KeyboardDateTimePicker, } from '@material-ui/pickers';

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

const UploadInputImg=()=> {
  const [files] = useState([]);

  return (
    <Fragment>
      <div>
        <MaterialDropZone
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          files={files}
          showPreviews
          maxSize={5000000}
          filesLimit={5}
          text="Drag and drop image(s) here or click"
        />
      </div>
    </Fragment>
  );
}

const ReportingAndNotification = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [reportsListData, setReportListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(true);
  const [clearedDate, handleClearedDateChange] = useState(null);
  const [reportedTo, setReportableTo] = useState([]);
  const [reportId, setReportId] = useState([])

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
    var start_date = moment(form.reportingdate || incidentsListData.incidentReportedOn, "YYYY-MM-DD HH:mm:ss");
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
      setFiles(acceptedFiles[i])
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
    temp.incidentReportedOn = moment(form.reportingdate).toISOString() || incidentsListData.incidentReportedOn;
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
    if (reportData.length>0) {

      // reported to api call
      const res = await api.put(`/api/v1/incidents/${id}/reports/${reportId}/`, {
        reportTo: form.reportedto.includes("Others")
          ? form.reportedto.concat([otherdata]).toString()
          : form.reportedto.toString(),
        reportingNote: otherdata,
        createdBy: 0,
        fkIncidentId: id,
      });
      if(res.status === 200){
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
    if(result.length>0){
      const report = result[0].reportTo;
      // form.reportedto = report.split(",")
      await setForm({ ...form, reportedto: report.split(",") });
      await setReportId(result[0].id)
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
    const date = new Date(result.incidentReportedOn)
    await setForm({...form,reportingdate:date})
    await setIncidentsListdata(result);
    if(!id){
      setIsLoading(true)
    }
   
  };

  useEffect(() => {
    fetchReportableTo();
    fetchIncidentsData();
    if(id){
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
                  {reportedTo.map((value,key) => (
                    <FormControlLabel
                    id={key}
                    key={key}
                      value={value.inputValue}
                      control={<Checkbox />}
                      label={value.inputValue}
                      checked={
                        form.reportedto.includes(value.inputValue) ? true : false
                      }
                      onChange={(e) =>
                        {
                          handelReportedTo(e, value.inputValue, "option");
                        }

                      }
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
              <DropzoneArea
        onChange={(e)=>handleDrop(e)}
        showPreviews
       
        />
              {error && error.fileupload ? <p>{error.fileupload}</p> : null}
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
                  value={form.reportingdate || incidentsListData.incidentReportedOn}
                  onChange={(date) => {handleDateChange(date);handelTimeCompare()}}
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
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedby: e.target.value.toString(),
                    });
                  }}
                >
                  {selectValues.map((selectValues,index) => (
                    <MenuItem key={index} value={selectValues}>{selectValues}</MenuItem>
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
