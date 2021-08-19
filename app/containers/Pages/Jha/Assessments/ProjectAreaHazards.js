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
    marginTop: '12px',
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
}));

const ProjectAreaHazards = () => {

  const areaName = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'areaName',
      label: 'Area Name',
    },
    {
      value: 'areaName1',
      label: 'Area Name 1',
    },
    {
      value: 'areaName2',
      label: 'Area Name 2',
    },
    {
      value: 'areaName3',
      label: 'Area Name 3',
    },
    {
      value: 'areaName4',
      label: 'Area Name 4',
    },
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
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Physical Hazards</FormLabel>
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
              label="Option 5"
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
              label="Option 6"
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
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Chemical Hazards</FormLabel>
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
              label="Option 5"
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
              label="Option 6"
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
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Energy Hazard</FormLabel>
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
              label="Option 5"
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
              label="Option 6"
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
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Hazard Type</FormLabel>
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
              label="Option 5"
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
              label="Option 6"
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
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormLabel className={classes.labelName} component="legend">Hazard Type</FormLabel>
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
              label="Option 5"
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
              label="Option 6"
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
              label="Option 7"
            />
          </FormGroup>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.createHazardbox}
          style={{ marginTop: '12px' }}
        >
          <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
        </Grid>
        <Grid
          item
          md={6}
          xs={11}
          className={classes.createHazardbox}
        >
          <TextField
            label="Other Hazards"
            margin="dense"
            name="otherhazards"
            id="otherhazards"
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
          style={{ marginTop: '5px' }}
        >
          <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectAreaHazards;