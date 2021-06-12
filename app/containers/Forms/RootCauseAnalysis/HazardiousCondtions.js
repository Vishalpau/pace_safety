import React from 'react';

import { Button, Grid, Container } from '@material-ui/core';

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

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'

const HazardiousCondition = () => {
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
      <FormHeader selectedHeader = {"Root cause analysis"}/>
        <Grid container justify="flex-start">
          <Grid item lg={12} md={6} sm={6}>
            <h2> Immediate Causes : Hazardous conditions </h2>
            <hr />
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> incident number: nnnnnnn</p>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <p> RCA Method: Pace Cause Analysis </p>
          </Grid>
          <Grid>
            <h6>Immediate Cause</h6>
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <h6> Hazardous conditions</h6>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Warning System</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="option1" />}
                  label="option1"
                />
                <FormControlLabel
                  control={<Checkbox name="option2" />}
                  label="option2"
                />
                <FormControlLabel
                  control={<Checkbox name="antoine" />}
                  label="..."
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Energy Types </FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="option1" />}
                  label="option1"
                />
                <FormControlLabel
                  control={<Checkbox name="option2" />}
                  label="option2"
                />
                <FormControlLabel
                  control={<Checkbox name="antoine" />}
                  label="..."
                />
              </FormGroup>
            </FormControl>
          </Grid>

          <Grid item lg={12} md={12} sm={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Tools</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="option1" />}
                  label="option1"
                />
                <FormControlLabel
                  control={<Checkbox name="option2" />}
                  label="option2"
                />
                <FormControlLabel
                  control={<Checkbox name="antoine" />}
                  label="..."
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} sm={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Saftey Items</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="option1" />}
                  label="option1"
                />
                <FormControlLabel
                  control={<Checkbox name="option2" />}
                  label="option2"
                />
                <FormControlLabel
                  control={<Checkbox name="antoine" />}
                  label="..."
                />
              </FormGroup>
            </FormControl>
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
      <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Hazardious conditions"} /></Grid>
    </Container>
  );
};

export default HazardiousCondition;
