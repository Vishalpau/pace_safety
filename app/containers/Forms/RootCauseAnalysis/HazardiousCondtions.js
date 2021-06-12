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
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const HazardiousCondition = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Immediate Causes - Hazardous conditions
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Incident number: nnnnnnnnnn
                </Typography>
              </Box>
            </Grid>
            <Grid item md={8}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  RCA Method: PACE Cuase Analysis
                </Typography>
              </Box>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" gutterBottom>
                Immediate Causes
              </Typography>

              <Typography variant="body" gutterBottom>
                Hazardous conditions
              </Typography>
            </Grid>

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Warning System</FormLabel>
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

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend"> Energy Types</FormLabel>
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

            <Grid item md={6}>
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
            <Grid item md={6}>
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
            <Grid item md={12}>
              {/* <p>others</p> */}
              <TextField
                variant="outlined"
                id="filled-basic"
                label="Others"
                multiline
                rows={3}
                className={classes.formControl}
              />
            </Grid>
            <Grid item md={12}>
              <Box marginTop={3}>
                <Button variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousCondition;
