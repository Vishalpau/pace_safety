import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';




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
  tableSection: {
    '& .MuiToolbar-root': {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    '& .MuiToolbar-root.MuiToolbar-regular': {
      minHeight: '40px',
      paddingTop: '20px',
    },
    '& h6': {
      fontSize: '18px',
      fontWeight: '400',
      color: '#06425c',
    },
    '& div table': {
      marginTop: '10px',
    },
    '& table thead th': {
      padding: '5px 16px',
    },

  },
}));

const Assessment = () => {

  const columns = [
    {
      name: 'Job Steps',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <>
            <TextField
              label="Job Steps"
              margin="dense"
              name="jobsteps"
              id="jobsteps"
              defaultValue=""
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
          </>
        )
      }
    },
    {
      name: 'Potential Hazards',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <>
            <TextField
              label="Potential Hazards"
              margin="dense"
              name="potentialhazards"
              id="potentialhazards"
              defaultValue=""
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
          </>
        )
      }
    },
    {
      name: 'Risk',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <>
            <TextField
              label="Risk"
              margin="dense"
              name="risk"
              id="risk"
              defaultValue=""
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
          </>
        )
      }
    },
    {
      name: 'Controls',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <>
            <TextField
              label="Controls"
              margin="dense"
              name="controls"
              id="controls"
              defaultValue=""
              fullWidth
              variant="outlined"
              className={classes.formControl}
            />
          </>
        )
      }
    },
  ];

  const data = [
    ['Job step', 'Potential Hazards', 'Risk', 'Controls'],
  ];

  const options = {
    filterType: 'dropdown',
    responsive: 'vertical',
    print: false,
    search: false,
    filter: false,
    download: false,
    viewColumns: false,
    selectableRowsHideCheckboxes: false,
    selectableRowsHeader: false,
    selectableRowsOnClick: false,
    viewColumns: false,
    selectableRows: false,
    pagination: false,
    rowsPerPage: 10,
    page: 0,
  };

  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  //   checkedF: true,
  //   checkedG: true,
  // });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  return (
    <>
    <Grid container spacing={3} className={classes.observationNewSection}>
      <Grid
        item
        md={12}
        xs={12}
        //className={classes.formBox}
        >

          {/* <Typography variant="h6" gutterBottom className={classes.labelName}>Detailed Project Area Hazard Assessment</Typography> */}
          <MUIDataTable
            title="Detailed Project Job Hazard Assessment"
            data={data}
            columns={columns}
            options={options}
            className={classes.tableSection}
          />

        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.createHazardbox}
        style={{marginTop: '35px', marginBottom: '10px'}}
        >
        <Typography variant="h6" gutterBottom className={classes.labelName}>Specific human performance aspects that have been discussed  before commencing the work</Typography>
        </Grid>
        <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">Category#1</FormLabel>
            <FormGroup row className={classes.customCheckBoxList}>
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
            <FormLabel className={classes.labelName} component="legend">Category#2</FormLabel>
            <FormGroup row className={classes.customCheckBoxList}>
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
          style={{marginTop: '35px'}}
          >
          <Typography variant="h6" gutterBottom className={classes.labelName}>Discuss and document conditions when the work must be stopped</Typography>
          </Grid>
          <Grid
              item
              md={12}
              xs={12}
              className={classes.formBox}
              >
              <FormGroup> 
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
                  label="Safety concern is raised by crew member(s)"
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
                  label="Unauthorized entry into a barricaded area"
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
                  label="Gas testing results exceeds the acceptable limit"
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
                    label="...."
                  />
            </FormGroup>
          </Grid>
          <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
          >
          <TextField
            label="Additional Remarks"
            margin="dense"
            name="additionalremarks"
            id="additionalremarks"
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
        >
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
        </Grid>
    </Grid>
    </>
  );
};

export default Assessment;