import { Container, Grid, Button } from "@material-ui/core";
import React, { Fragment } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import {
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    padding: ".75rem 0",
  },
}));

const Details = () => {
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
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Root cause analysis"} />
          </Box>

          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              RCA details
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={12}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number: nnnnnnnnnn
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                {/* <h6> Incident Description </h6> */}
                <Typography variant="h6" gutterBottom>
                  Incident Description
                </Typography>
                <Typography variant="body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                  eos autem fugit maiores, doloremque quo in neque iure,
                  asperiores quasi, aut ipsa magni voluptates corrupti. Rerum
                  repellendus eum dolore autem.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography component="p">Investigation start date</Typography>
                <p>date formate</p>
              </Grid>
              <Grid item md={6}>
                <Typography component="p">Investigation end date</Typography>
                <p>date formate</p>
              </Grid>
              <Grid item md={6}>
                <Typography component="p">Level of Investigation</Typography>
                <p> Value selected to be displayed</p>
              </Grid>
              <Grid item md={6}>
                {/* <h6> RCA recommended</h6> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  {/* <Typography varint="p">Project Name</Typography> */}
                  <InputLabel id="project-name-label">
                    RCA recommended
                  </InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="RCA recommended"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={6}>
                <p>Equiptment type</p>

                <FormControl>
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                  {/* <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select> */}
                </FormControl>
                <p>if other describe</p>
                <TextField id="filled-basic" />
              </Grid>
              <Grid item md={6}>
                <p>Where there any release</p>

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
              <Grid item md={6}>
                <p>Where there any release</p>

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
              <Grid item md={6}>
                <p>Where there any release</p>

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
              <Grid>
                <p>
                  Then investigation team to develop credble assumption and/or
                  hypthesis, continue with RCA process. Ensure this fact is
                  captured in investigation report that investigation is based
                  on some assumption.
                </p>
              </Grid>
              <Grid item md={12}>
              
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-acts/"
                  >
                    Next
                  </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
              deleteForm={[1,2,3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Details"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Details;
