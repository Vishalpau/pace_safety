import React from "react";
import { Button, Grid, Container } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";

import FormSideBar from '../FormSideBar'
import { ROOT_CAUSE_ANALYSIS_FORM } from '../../../utils/constants'
import FormHeader from '../FormHeader'


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
      <FormHeader selectedHeader = {"Root cause analysis"}/>
        <Box padding={3} bgcolor="background.paper">
          <Typography variant="h6" gutterBottom>
            Immediate Causes - Hazardous acts
          </Typography>
          <Box marginBottom={4} borderBottom={1}>
            <Typography variant="body2" gutterBottom>
              Incident number: nnnnnnnnnn
            </Typography>
          </Box>
          <Grid container>
            <Grid item lg={12} md={6} sm={6} />
            <Grid item lg={6} md={6} sm={6} />
            <Grid item lg={6} md={6} sm={6} />
            <Grid />
            <Grid item lg={12} md={6} sm={6} />
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
                <FormLabel component="legend">
                  {" "}
                  Equiptment & Machinery
                </FormLabel>
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
        </Box>
        <Grid><FormSideBar listOfItems={ROOT_CAUSE_ANALYSIS_FORM} selectedItem={"Hazardious acts"} /></Grid>
      </Paper>
    </Container>
  );
};

export default HazardiousActs;
