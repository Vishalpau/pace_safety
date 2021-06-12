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

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

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
  return (
    <Container>
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Root cause analysis"} />
          </Box>
          <Typography variant="h5" gutterBottom>
            RCA details
          </Typography>
          <Box marginTop={3} marginBottom={4}>
            <Typography variant="subtitle1" gutterBottom borderBottom={1}>
              Incident number: nnnnnnn
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item md={12}>
              {/* <h6> Incident Description </h6> */}
              <Typography variant="h6" gutterBottom>
                Incident Description{" "}
              </Typography>
              <Typography variant="body">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                eos autem fugit maiores, doloremque quo in neque iure,
                asperiores quasi, aut ipsa magni voluptates corrupti. Rerum
                repellendus eum dolore autem.
              </Typography>
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
            <Grid item lg={12} md={6} sm={6}>
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
            <Grid item lg={12} md={6} sm={6}>
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
            <Grid item lg={12} md={6} sm={6}>
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
            <Grid item lg={12} md={6} sm={6}>
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
                {" "}
                Then investigation team to develop credble assumption and/or
                hypthesis, continue with RCA process. Ensure this fact is
                captured in investigation report that investigation is based on
                some assumption.{" "}
              </p>
            </Grid>
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
          <Grid>
            <FormSideBar
              listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
              selectedItem={"Details"}
            />
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Details;
