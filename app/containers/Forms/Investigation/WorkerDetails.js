import React from 'react';
import {
  Button, Grid, Select, Container
} from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const WorkerDetails = () => {
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
  return (
    <Container>
      <Paper>
        <Grid container justify="flex-start">
          <Grid item lg={12} md={6} sm={6}>
            <h2> Details of person affected </h2>
            <hr />
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Potential severity level Scenario</p>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Healthy & Saftey - Actual consquence</p>
            <Select inputProps={{ 'aria-label': 'Select actual consequence' }}>
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Healthy & Saftey - Potential consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Environment - Actual consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Environment - Potential consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Regulatory - Actual consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Regulatory - Potential consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Reputation - Actual consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Reputation - Potential consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Financial - actual consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Financial - Potential consquence</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <p> Higest Potential Impactor Receptor</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> Classification</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> RCA recommended</p>
            <Select label="Select">
              select
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </Select>
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>others</p>
            <TextField id="filled-basic" />
          </Grid>
          <Button variant="contained" color="primary">
            Next
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default WorkerDetails;