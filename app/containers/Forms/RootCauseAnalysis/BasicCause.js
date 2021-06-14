import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const BasicCause = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Root cause analysis"} />
            </Box>

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Basic Cause
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number: nnnnnnnnnn
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      RCA Method: PACE Cause Analysis
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Human Factors
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={6}>
                  <Typography variant="subtitle1">Personal</Typography>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </Grid>

                <Grid item md={6}>
                  <Typography variant="subtitle1">Welness Factor</Typography>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    rows={4}
                    label="Other Human Factors"
                    className={classes.formControl}
                  />
                </Grid>

                <Grid item md={12}>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      Job Factors
                    </Typography>
                  </Box>
                </Grid>

                <Grid item md={6}>
                  <Typography variant="subtitle1">Leadership</Typography>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </Grid>

                <Grid item md={6}>
                  <Typography variant="subtitle1">Process</Typography>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    rows={3}
                    label="Other job factors"
                    className={classes.formControl}
                  />
                </Grid>

                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                  selectedItem={"Basic cause"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default BasicCause;
