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
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Col, Row } from "react-grid-system";

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants"


const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
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

const JobDetails = () => {
  // class ObservationInitialNotification extends Component {

  const department = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'department',
      label: 'Department Name',
    },
    {
      value: 'department1',
      label: 'Department 1',
    },
    {
      value: 'department2',
      label: 'Department 2',
    },
    {
      value: 'department3',
      label: 'Department 3',
    },
    {
      value: 'department4',
      label: 'Department 4',
    },
  ];

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  return (
    <PapperBlock title="Job Details" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Project
              </Typography>
              <Typography className={classes.labelValue}>
                A23-ERT1236 - NTPC
              </Typography>
            </Grid>
            <Grid item md={12}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Unit
              </Typography>
              <Typography className={classes.labelValue}>
                A23-ERT1236 - NTPC
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              className={classes.formBox}
            >
              <TextField
                label="Job Title"
                name="jobtitle"
                id="jobtitle"
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
                label="Location"
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
                  fullWidth
                  label="Date & Time*"
                  value={selectedDate}
                  onChange={handleDateChange}
                  inputVariant="outlined"
                  disableFuture="true"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              className={classes.formBox}
            >
              <TextField
                label="Permit to Work#"
                name="permitwork"
                id="permitwork"
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
                label="Scope of work (Describe all tasks)"
                name="scopeofwork"
                id="scopeofwork"
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
              style={{ marginTop: '12px', marginBottom: '10px' }}
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
              className={classes.createHazardbox}
              style={{ marginTop: '30px' }}
            >
              <Typography variant="h6" gutterBottom className={classes.labelName}>Emergency Contact Details</Typography>
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Supervisor"
                name="supervisor"
                id="supervisor"
                multiline
                defaultValue=""
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Department"
                name="department"
                id="department"
                select
                fullWidth
                variant="outlined"
              >
                {department.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Emergency Phone Number"
                name="emergencyphonenumber"
                id="emergencyphonenumber"
                multiline
                defaultValue=""
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Evacuation assembly point"
                name="evacuationassemblypoint"
                id="evacuationassemblypoint"
                multiline
                defaultValue=""
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Permit number"
                name="permitnumber"
                id="permitnumber"
                multiline
                defaultValue=""
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={11}
            //className={classes.createHazardbox}
            >
              <TextField
                label="Order number"
                name="ordernumber"
                id="ordernumber"
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
              style={{ marginTop: '15px' }}
            >
              <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
            </Grid>
          </Grid>
        </Col>
        <Col md={3}>
          <FormSideBar
            deleteForm={"hideArray"}
            listOfItems={JHA_FORM}
            selectedItem={"Project Details"}
          />
        </Col>
      </Row>
    </PapperBlock>
  );
};

export default JobDetails;