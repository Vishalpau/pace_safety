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

const HazardiousActs = () => {
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
            <h2> Immediate Causes : Hazardous acts </h2>
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
            <h6> Hazardous Acts</h6>
          </Grid>
          <Grid item lg={6} md={6} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend"> Supervision</FormLabel>
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
              <FormLabel component="legend"> Work package </FormLabel>
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
              <FormLabel component="legend"> Equiptment & Machinery</FormLabel>
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
              <FormLabel component="legend"> Behaviour Issue</FormLabel>
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
          <Grid item lg={6} md={6} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Ergohomics</FormLabel>
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
              <FormLabel component="legend">Procedure</FormLabel>
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
    </Container>
  );
};

export default HazardiousActs;