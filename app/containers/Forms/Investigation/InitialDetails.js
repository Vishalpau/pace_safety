import React from 'react';
import { Button, Grid, Container, Input, Select } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

const InitialDetails = () => {
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
            <h2>Initial Details</h2>
            <hr />
            <p> incident number: nnnnnnn</p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <p>Unit Construction Manager Name</p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>Unit Construction Manager Contact </p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>Unit HSE Specialist Name </p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>Unit HSE Specialist Contact </p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>Actual Severity Level </p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>Potential Severity Level </p>
            <Input/>
          </Grid>
          <Grid lg={12}>
          <h3>Event</h3>
          </Grid>
          
          <Grid item lg={6}>
            <p>Activity</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={6}>
            <p>Job Task</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={12}>
            <p>Eqipment Invoked</p>
            <Input/>
          </Grid>
          <Grid item lg={6}>
            <p> Weather</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={6}>
            <p> Weather2</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={6}>
            <p> Temprature(c</p>
            <Input/>
          </Grid>
          <Grid item lg={6}>
            <p>Lighting</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={12}>
            <p> Wind Speed</p>
            <Input/>
          </Grid>
          <Grid>
            <h4>Spills</h4>
          </Grid>
          <Grid item lg={6}>
            <p>Fluid Amount</p>
            <Input/>
          </Grid>
          <Grid item lg={6}>
            <p>Fluid Type</p>
            <Select>
              <otion>1</otion>
              <otion>1</otion>
              <otion>1</otion>
            </Select>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>AEL </p>
            <Input/>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
          <p>PEL </p>
            <Input/>
          </Grid>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Paper>
    </Container>
  );
};

export default InitialDetails;