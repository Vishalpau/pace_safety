import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import MomentUtils from '@date-io/moment';
import {
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { MaterialDropZone, PapperBlock } from 'dan-components';
import { DropzoneDialogBase } from 'material-ui-dropzone';

import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import { useHistory, useParams } from 'react-router';

import FormSideBar from '../FormSideBar';
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from '../../../utils/constants';
import FormHeader from '../FormHeader';
import ReportingValidation from '../../Validator/ReportingValidation';
import api from '../../../utils/axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
  },
  spacer: {
    marginTop: '1rem',
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: '#3498db',
    padding: 0,
    textDecoration: 'underline',
    display: 'inlineBlock',
    marginBlock: '1.5rem',
    backgroundColor: 'transparent',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ReportingAndNotification = () => {
  const [files, setFile] = React.useState([]);
  const [error, setError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [reportsListData, setReportListData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(true);
  const [clearedDate, handleClearedDateChange] = useState(null);


  const { id } = useParams();

  const [form, setForm] = useState({
    reportedto: [],
    isnotificationsent: '',
    fileupload: '',
    supervisorname: '',
    othername: '',
    reportingdate: null,
    reportingtime: null,
    reportedby: '',
    others: '',
    latereporting: '',
    additionaldetails: '',
  });

  const history = useHistory();

  const reportedTo = [
    'Internal Leadership',
    'Police',
    'Environment Officer',
    'OHS',
    'Mital Aid',
    'Other',
  ];
  const notificationSent = ['Manage', 'SuperVisor'];
  const selectValues = [1, 2, 3, 4, "Other"];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const [selectedTime, setSelectedTime] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const [otherdata, setOtherData] = useState('');
  const [fileNames, setFileNames] = useState('');



  const handelTimeCompare = async (e) => {
    let rpTime = form.reportingtime
    let rpDate = form.reportingdate
    let startDate = `${rpDate} ${rpTime}`
    // let startDate = form.reportingdate.concat(form.reportingtime)
    console.log(startDate)
    var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
    var end_date = moment(new Date(), 'YYYY-MM-DD HH:mm:ss');
    var duration = moment.duration(end_date.diff(start_date));
    var Hours = duration.asHours();
    console.log(Hours)
    if (Hours > 4) {
      await SetLateReport(false)
      console.log("here")
    } else {
      await SetLateReport(true)
    }
  }

  const handleDateChange = (date) => {
    const onlyDate = moment(date).format('YYYY/MM/DD');
    setForm({
      ...form,
      reportingdate: onlyDate,
    });
  };

  const handelTimeChange = async (date) => {
    const onlyTime = moment(date).format('HH:mm:ss');
    await setForm({
      ...form,
      reportingtime: onlyTime,
    });
    setSelectedTime(date)
  };


  const handleDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
    const formData = new FormData();
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append('evidenceDocument', acceptedFiles[i]);
      formData.append('evidenceCategory', 'Initial Evidence ');
      formData.append('createdBy', '1');
      formData.append('fkIncidentId', localStorage.getItem('fkincidentId'));
      const evidanceResponse = api.post(`api/v1/incidents/${localStorage.getItem('fkincidentId')}/evidences/`, formData);
      console.log(evidanceResponse);
    }

    setForm({
      ...form,
      fileupload: acceptedFiles,
    });
    setFileNames(acceptedFiles.map((file) => file.name));
  };

  const handleUpdateEnvironement = async (e, key, fieldname, reportId) => {
    const temp = reportsListData;
    console.log(temp);
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    temp[key].updatedAt = moment(new Date()).toISOString();
    console.log(temp[key]);

    const res = await api.put(
      `api/v1/incidents/${id}/reports/${reportId}/`,
      temp[key]
    );
    console.log(res);
  };

  const handelNext = async (e) => {
    const { error, isValid } = ReportingValidation(form);
    setError(error);
    // getting fileds for update
    const fkid = localStorage.getItem('fkincidentId');
    const temp = incidentsListData;
    console.log('1', temp);
    temp.supervisorByName = form.supervisorname || incidentsListData.supervisorByName;
    temp.supervisorById = 1;
    temp.incidentReportedOn = moment(form.reportingdate).toISOString();
    temp.incidentReportedByName = form.reportedby || incidentsListData.incidentReportedByName;
    temp.incidentReportedById = 1;
    temp.reasonLateReporting = form.latereporting || incidentsListData.reasonLateReporting;
    temp.notificationComments = form.additionaldetails || incidentsListData.notificationComments;
    temp.updatedAt = moment(new Date()).toISOString();
    temp.updatedBy = '0';
    console.log(temp);

    // put call for update
    const res = await api.put(
      `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`,
      temp
    );

    if (id !== undefined) {
      history.push(
        `/app/incident-management/registration/summary/summary/${localStorage.getItem(
          'fkincidentId'
        )}`
      );
    } else {
      // reported to api call
      const res = await api.post(`/api/v1/incidents/${fkid}/reports/`, {
        reportTo: form.reportedto.includes('Other')
          ? form.reportedto.concat([otherdata]).toString()
          : form.reportedto.toString(),
        reportingNote: form.latereporting,
        createdBy: 0,
        fkIncidentId: fkid,
      });
      if (res.status === 201) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            'fkincidentId'
          )}`
        );
      }
    }
  };

  const handelReportedTo = async (e, value, type) => {
    if ((type = 'option')) {
      if (e.target.checked == false) {
        const newData = form.reportedto.filter((item) => item !== value);
        await setForm({
          ...form,
          reportedto: newData,
        });
      } else {
        await setForm({
          ...form,
          reportedto: [...form.reportedto, value],
        });
      }
    }
  };

  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem('fkincidentId')}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    await setIsLoading(true);
  };

  const fetchReportsDataList = async () => {
    const res = await api.get(`/api/v1/incidents/${id}/reports/`);

    const result = res.data.data.results;
    await setReportListData(result);
    await setIsLoading(true);
  };

  useEffect(() => {
    fetchIncidentsData();
    fetchReportsDataList();
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Reporting and Notification" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend"> Reportable to </FormLabel>
              <FormGroup>
                {reportsListData.length > 0
                  ? reportsListData.map((report, key) => (
                    <FormControlLabel
                      key={key}
                      control={(
                        <Checkbox
                          // checked={gilad}
                          // onChange={(e) => handelReportedTo}

                          name="gilad"
                        />
                      )}
                      label="Gilad Gray"
                    />
                  ))
                  : reportedTo.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Checkbox />}
                      label={value}
                      onChange={(e) => handelReportedTo(e, value, 'option')}
                    />
                  ))}
                {form.reportedto.includes('Other') ? (
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
            <p>Notification to be sent</p>

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
              <p>{error.isnotificationsent}</p>
            )}
          </Grid>

          <Grid item lg={12} justify="flex-start">
            {/* <p>Initial Evidences</p> */}

            <Box marginTop={3} marginBottom={4}>
              <Typography variant="h6" gutterBottom>
                Initial Evidences
              </Typography>
            </Box>

            <MaterialDropZone
              files={files}
              showPreviews
              maxSize={5000000}
              filesLimit={5}
              text="Drag and drop file(s) here or click button bellow"
              showButton
              onDrop={handleDrop}
            />
            {error && error.fileupload && <p>{error.fileupload}</p>}
          </Grid>

          <Grid item md={6}>
            <TextField
              id="supervisor-name"
              variant="outlined"
              label="Supervisor name"
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
            {/* {error && error.othername && <p>{error.othername}</p>} */}
          </Grid>

          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.formControl}
                id="date-picker-dialog"
                format="yyyy/MM/dd"
                required
                inputVariant="outlined"
                label="Reporting Date"
                value={
                  form.reportingdate
                }
                onChange={(date) => handleDateChange(date)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            {error && error.reportingdate && <p>{error.reportingdate}</p>}
          </Grid>

          <Grid item md={6}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <KeyboardTimePicker
                className={classes.formControl}
                id="time-picker"
                inputVariant="outlined"
                label="Time picker"
                value={
                  form.reportingtime === null ? clearedDate : selectedTime
                }
                onChange={async (date) => { await handelTimeChange(date); await handelTimeCompare() }}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
                format="HH:mm"
              />
            </MuiPickersUtilsProvider>
            {error && error.reportingtime && <p>{error.reportingtime}</p>}
          </Grid>

          <Grid item md={6}>
            <FormControl
              variant="outlined"
              required
              className={classes.formControl}
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
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && error.reportedby && <p>{error.reportedby}</p>}
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
            {/* {error && error.others && <p>{error.others}</p>} */}
          </Grid>
          {lateReport ?
            <Grid item md={12}>
              <TextField
                id="reason"
                variant="outlined"
                label="Resaon for reporting later than 4 hours"
                multiline
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
              {error && error.latereporting && <p>{error.latereporting}</p>}
            </Grid>
            : null}

          <Grid item md={12}>
            <TextField
              id="additionalDetails"
              variant="outlined"
              label="Additional details if any"
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
            {/* {error && error.additionaldetails && (
                    <p>{error.additionaldetails}</p>
                  )} */}
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
            selectedItem={"Reporting and notification"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default ReportingAndNotification;
