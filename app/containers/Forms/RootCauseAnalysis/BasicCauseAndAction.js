import React from 'react';
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper"
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'





const BasicCauseAndAction = () => {
  const reportedTo = [
    'Internal Leadership',
    'Police',
    'Environment Officer',
    'OHS',
    'Mital Aid',
    'Other',
  ];
  const notificationSent = ['Manage', 'SuperVisor'];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ['Yes', 'No'];

  let form_link = window.location.href
  return (
   <Container>
      <Paper>
      <FormHeader selectedHeader = {"Root cause analysis"}/>
        <Grid container justify="flex-start">
          <Grid item lg={12} md={6} sm={6}>
            <h2> Actions against Basic Causes </h2>
            <hr />
            <h6> Incident Description </h6>
          </Grid>
          <Grid item lg={3} md={6} sm={6}>
            <p> incident number: nnnnnnn</p>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> RCA Method: Pace Cause Analysis </p>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <h6> Actions </h6>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Option selected from Hazardous Acts and conditions </p>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <div>
              {/* <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
              {' '}
              <a href="/"> Add a new action</a>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Option selected from Hazardous Acts and conditions </p>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <div>
              {/* <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
              {' '}
              <a href="/"> Add a new action</a>
            </div>
  
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Option selected from Hazardous Acts and conditions </p>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <div>
              {/* <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
              {' '}
              <a href="/"> Add a new action</a>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Option selected from Hazardous Acts and conditions </p>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="/">Al-nnnnn</a>
            </Grid>
            <div>
              {/* <Icon style={{ fontSize: 30 }}>add_circle</Icon> */}
              {' '}
              <a href="/"> Add a new action</a>
            </div>
  
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Why did the above immediate cause exist? </p>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="#">Al-nnnnn</a>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <span> Action title </span>
            </Grid>
            <Grid item lg={4} md={4} sm={4}>
              <a href="#">Al-nnnnn</a>
            </Grid>
            <div>
              {/*                           e={{ fontSize: 30 }}>add_circle</Icon> */}
              {' '}
              <a href="#"> Add a new action</a>
            </div>
  
          </Grid>
  
  
          <Button variant="contained" color="primary">
                Next
          </Button>
          
        </Grid>
        <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Basic cause and action"} /></Grid>
      </Paper>
    </Container>
  );
};

export default BasicCauseAndAction;