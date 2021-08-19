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

import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams , useHistory } from 'react-router';

import { AHA } from "../../../../utils/constants";




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
  // customCheckBoxList: {
  //   display: 'block',
  //   '& .MuiFormControlLabel-root': {
  //     width: '30%',
  //     [theme.breakpoints.down("xs")]: {
  //       width: '48%',
  //     },
  //   },
  // },
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
  const history = useHistory();


  const columns = [
    {
      name: 'Identify Hazard',
      options: {
        filter: true
      }
    },
    {
      name: 'Identify Risk',
      options: {
        filter: true,
      }
    },
    {
      name: 'Severity',
      options: {
        filter: false,
      }
    },
    {
      name: 'Probability',
      options: {
        filter: false,
      }
    },
    {
      name: 'Evaluate Risk Rating',
      options: {
        filter: false,
      }
    },
    {
      name: 'Identify Controls',
      options: {
        filter: false,
      }
    },
    {
      name: 'Evaluate Residual Risk',
      options: {
        filter: false,
      }
    },
    {
      name: 'Approve to Implement',
      options: {
        filter: false,
      }
    },
    {
      name: 'Monitor',
      options: {
        filter: false,
      }
    },
    {
      name: 'Action Item',
      options: {
        filter: false,
      }
    },

  ];

  const data = [
    ['Hazard Option Selected from previous page', 'Business Analyst', 30, 'active', 100000, 30, 'active', 100000 , 'Business Analyst', 100000],
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
    rowsPerPage: 10,
    page: 0,
  };

  // const [state, setState] = React.useState({
  //   checkedA: true,
  //   checkedB: true,
  //   checkedF: true,
  //   checkedG: true,
  // });
  const handleSubmit = async (e) => {
    history.push("/app/pages/aha/assessments/DocumentsNotifications")
  }

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const classes = useStyles();
  return (
    <>
    <Grid container spacing={3} className={classes.observationNewSection}>
    <Grid container spacing={3} item xs={12} md={9}>

      <Grid
        item
        md={12}
        xs={12}
        //className={classes.formBox}
        >

          {/* <Typography variant="h6" gutterBottom className={classes.labelName}>Detailed Project Area Hazard Assessment</Typography> */}
          <MUIDataTable
            title="Detailed Project Area Hazard Assessment"
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
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
        onClick={() =>handleSubmit()}>Next</Button>
        </Grid>
        
        </Grid>
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Assessment"
              />
</Grid>
    </Grid>
    </>
  );
};

export default Assessment;