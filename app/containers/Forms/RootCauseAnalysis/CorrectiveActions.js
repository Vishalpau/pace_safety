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
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
// import Typography from "../../UiElements/Typography";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const CorrectiveAction = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const checkBox = [
    "Inadequate System",
    "Inadequate standards",
    "Inadequate compilance and standards",
  ];

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
                Corrective Actions
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

                <Grid item md={8}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      RCA Method: PACE Cause Analysis
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="h6">Management Control</Typography>
                </Grid>
                <Grid item md={12}>
                  <FormControl component="fieldset">
                    {checkBox.map((value) => (
                      <FormControlLabel
                        control={<Checkbox name={value} />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="filled-basic"
                    variant="outlined"
                    multiline
                    rows={3}
                    label="Details the region to support above"
                    className={classes.formControl}
                  />
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/basic-cause-and-action/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>

              <Grid item md={3}>
                <FormSideBar
                deleteForm={[1,2,3]}
                  listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                  selectedItem={"Corrective action"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default CorrectiveAction;
