import React from 'react';
import { Button, Grid, Container } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'

const RootCauseAnalysis = () => {
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
            <h2> Root couse Analysis</h2>
            <hr />
            <p> incident number: nnnnnnn</p>

            <h6> Incident Description </h6>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <h6> Investigation start date</h6>
            <p>date formate</p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <h6> Investigation end date</h6>
            <p>date formate</p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <h6> RCA recommended</h6>
            <p> to be clearified what is this</p>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <h6> Incident Date and Time</h6>
            <span> date formate</span>
          </Grid>
          <Grid item lg={6} md={12} sm={12}>
            <h6> Analysis conducted by</h6>
            <span> date formate</span>
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>What caused the incident </p>
            <TextField id="filled-basic" />
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>Corrective actions</p>
            <TextField id="filled-basic" />
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>Where there any spills</p>

            <FormControl component="fieldset">
              <RadioGroup aria-label="gender">
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item lg={12} md={6} sm={6}>
            <p>if No, please recommended correct solution ?</p>
            <TextField id="filled-basic" />
          </Grid>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
        <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Root cause analysis"} /></Grid>
      </Paper>
    </Container>
  );
};

export default RootCauseAnalysis;