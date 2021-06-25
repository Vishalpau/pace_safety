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
  button: {
    margin: theme.spacing(1),
  },
}));
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const HazardiousActs = () => {
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

  // const radioDecide = ['Yes', 'No'];
  const classes = useStyles();
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Root cause analysis"} />
          </Box>
          <Typography variant="h6" gutterBottom>
            Immediate Causes - Hazardous acts
          </Typography>
          <Box marginBottom={4} borderBottom={1}>
            <Typography variant="body2" gutterBottom>
              Incident number: nnnnnnnnnn
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Supervision</FormLabel>
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

              <Grid item md={6}>
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
              <Grid item md={6}>
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
              <Grid item md={6}>
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
              <Grid item md={6}>
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
              <Grid item md={12}>
                {/* <p>others</p> */}
                <TextField
                  className={classes.formControl}
                  id="filled-basic"
                  label="Others"
                  variant="outlined"
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item md={12}>
                <Box marginTop={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
              deleteForm={[1,2,3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Hazardious acts"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default HazardiousActs;
