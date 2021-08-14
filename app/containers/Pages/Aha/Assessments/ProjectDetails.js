import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
} from '@material-ui/pickers';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


const useStyles = makeStyles((theme) => ({
// const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  observationNewSection: {

  },
  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
    },
  },
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: '4px',
    },
  },
  labelName: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    color: '#737373',
  },
  labelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },
  customCheckBoxList: {
    display: 'block',
    '& .MuiFormControlLabel-root': {
      width: '30%',
      [theme.breakpoints.down("xs")]: {
        width: '48%',
      },
    },
  },
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
        marginTop: '8px',
    },
  },
// });
}));

const ProjectDetails = () => {
// class ObservationInitialNotification extends Component {

  const fkCompanyId =
  JSON.parse(localStorage.getItem("company")) !== null
    ? JSON.parse(localStorage.getItem("company")).fkCompanyId
    : null;
const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;
const project =
JSON.parse(localStorage.getItem("projectName")) !== null
  ? JSON.parse(localStorage.getItem("projectName")).projectName
  : null;
const selectBreakdown =
JSON.parse(localStorage.getItem("selectBreakDown")) !== null
  ? JSON.parse(localStorage.getItem("selectBreakDown"))
  : null;
  var struct = "";
for (var i in selectBreakdown) {
  struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
}
const fkProjectStructureIds = struct.slice(0, -1);

const [form, setForm] = useState({
    "fkCompanyId": 0,
    "fkProjectId": 0,
    "fkProjectStructureIds": "string",
    "workArea": "string",
    "location": "string",
    "assessmentDate": null,
    "permitToPerform": "Yes",
    "permitNumber": "string",
    "ahaNumber": "string",
    "description": "string",
    "workStopCondition": "string",
    "department": "string",
    "additionalRemarks": "string",
    "classification": "string",
    "wrpApprovalUser": "string",
    "wrpApprovalDateTime": "2021-08-13T06:18:41.043Z",
    "picApprovalUser": "string",
    "picApprovalDateTime": "2021-08-13T06:18:41.043Z",
    "signedUser": "string",
    "signedDateTime": "2021-08-13T06:18:41.043Z",
    "anyLessonsLearnt": "Yes",
    "lessonLearntDetails": "string",
    "lessonLearntUserName": "string",
    "ahaStatus": "string",
    "ahaStage": "string",
    "badgeNumber": "string",
    "status": "Active",
    "createdBy": 0,
    "source": "Web",
    "vendor": "string",
    "vendorReferenceId": "string" 
})

  const areaName = [
   
      'P1-WA1',
     'P1-WA2',
    
    
  ];

  const reportedBy = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'reportedBy',
      label: 'Reported By',
    },
    {
      value: 'reportedBy1',
      label: 'Reported By 1',
    },
    {
      value: 'reportedBy2',
      label: 'Reported By 2',
    },
    {
      value: 'reportedBy3',
      label: 'Reported By 3',
    },
    {
      value: 'reportedBy4',
      label: 'Reported By 4',
    },
  ];

  const supervisorName = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'supervisorName',
      label: 'Supervisor Name',
    },
    {
      value: 'supervisorName1',
      label: 'Supervisor Name 1',
    },
    {
      value: 'supervisorName2',
      label: 'Supervisor Name 2',
    },
    {
      value: 'supervisorName3',
      label: 'Supervisor Name 3',
    },
    {
      value: 'supervisorName4',
      label: 'Supervisor Name 4',
    },
  ];

  const assignee = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'assignee',
      label: 'Assignee',
    },
    {
      value: 'assignee1',
      label: 'Assignee 1',
    },
    {
      value: 'assignee2',
      label: 'Assignee 2',
    },
    {
      value: 'assignee3',
      label: 'Assignee 3',
    },
    {
      value: 'assignee4',
      label: 'Assignee 4',
    },
  ];

  const assigneeDepartment = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'assigneeDepartment',
      label: 'Assignee Department',
    },
    {
      value: 'assigneeDepartment1',
      label: 'Assignee Department 1',
    },
    {
      value: 'assigneeDepartment2',
      label: 'Assignee Department 2',
    },
    {
      value: 'assigneeDepartment3',
      label: 'Assignee Department 3',
    },
    {
      value: 'assigneeDepartment4',
      label: 'Assignee Department 4',
    },
  ];

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // render() {
  // const {classes } = this.props;
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
      {' '}
-
      {file.size}
      {' '}
bytes
    </li>
  ));


  const [positiveObservation, setPositiveObservation] = useState(true);
  const [riskObservation, setRiskObservation] = useState(true);
  const [addressSituation, setAddressSituation] = useState(true);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
    setRiskObservation(true);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
    setRiskObservation(false);
  };

  const handelAddressSituationYes = (e) => {
    setAddressSituation(false);
  };

  const handelAddressSituationNo = (e) => {
    setAddressSituation(true);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  return (
    <>
    <Grid container spacing={3} className={classes.observationNewSection}>
        {/* <Grid item xs={12} className={classes.coponentTitleBox}>
            <Typography variant="h5">Initial Notification</Typography>
        </Grid> */}

        <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={classes.labelName}>
                Project
        </Typography>
        <Typography className={classes.labelValue}>
              {project.projectName}
        </Typography>
        </Grid>
        <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={classes.labelName}>
                Unit
        </Typography>
        <Typography className={classes.labelValue}>
         {selectBreakdown[1].name}
        </Typography>
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Work Area"
            margin="dense"
            name="workarea"
            id="workarea"
            value={selectBreakdown[2].name}
            select
            fullWidth
            variant="outlined"
        >
            {areaName.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Work Location"
            margin="dense"
            name="worklocation"
            id="worklocation"
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                className={classes.formControl}
                margin="dense"
                fullWidth
                label="Date & Time*"
                value={form.assessmentDate || null}
                onChange={handleDateChange}
                inputVariant="outlined"
                disableFuture="true"
                onChange={(e) => {
                    setForm({
                      ...form,
                      assessmentDate: moment(e).toISOString(),
                    });
                  }}
              />
            </MuiPickersUtilsProvider>
        </Grid>
        {/* <Grid item md={6} xs={12} className={classes.formBox}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  value={selectedDate}
                  label="Date & Time*"
                  defaultValue={form.assessmentDate}
                  // disabled={form.id ? true : false}
                  // error={error.assessmentDate}
                  // helperText={error.assessmentDate ? error.assessmentDate : null}
                  onChange={handleDateChange}
                  format="YYYY/MM/DD hh:mm A"
                  className={classes.formControl}
                  value={form.assessmentDate || null}
                  fullWidth
                  disableFuture={true}
                  inputVariant="outlined"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      assessmentDate: moment(e).toISOString(),
                    });
                  }}
                  mask={[
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    "/",
                    /\d/,
                    /\d/,
                    " ",
                    /\d/,
                    /\d/,
                    ":",
                    /\d/,
                    /\d/,
                    " ",
                    /a|p/i,
                    "M",
                  ]}
                />
              </MuiPickersUtilsProvider>
            </Grid> */}
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <FormControl component="fieldset">
            <FormLabel component="legend" className={classes.labelName}>Do you have a permit to perform the AHA?</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1">
            <FormControlLabel value="yes" className={classes.labelValue} control={<Radio />} label="Yes" />
            <FormControlLabel value="no" className={classes.labelValue} control={<Radio />} label="No" />
            </RadioGroup>
        </FormControl>
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Permit to Work"
            margin="dense"
            name="arename"
            id="arename"
            multiline
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Description"
            margin="dense"
            name="description"
            id="description"
            multiline
            rows={4}
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.createHazardbox}
        >
        <Typography variant="h6" gutterBottom className={classes.labelName}>Risk Assessment Team</Typography>
        </Grid>
        <Grid
        item
        md={6}
        xs={11}
        className={classes.createHazardbox}
        >
        <TextField
            label="Team Name"
            margin="dense"
            name="arename"
            id="arename"
            multiline
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid item md={1} className={classes.createHazardbox}>
            <IconButton
                variant="contained"
                color="primary"
            >
                <DeleteForeverIcon />
            </IconButton>
        </Grid>
        
        <Grid item md={12} className={classes.createHazardbox}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                className={classes.button}
            >
                Add
            </Button>
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <FormLabel className={classes.labelName} component="legend">Discuss and document conditions when the work must be Stopped</FormLabel>
        <FormGroup className={classes.customCheckBoxList}>
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 1"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 2"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 3"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 4"
            />
        </FormGroup>
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        >
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
        </Grid>
    </Grid>
    </>
  );
};

export default ProjectDetails;