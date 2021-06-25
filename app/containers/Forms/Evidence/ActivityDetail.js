import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const ActivityDetails = () => {
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
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box>

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Activity Details
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
                <Grid item md={12}>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Did the job require work permit?
                    </FormLabel>
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>If yes ,was a permit complted prior of the job?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      If yes ,was a permit complted prior of the job?
                    </FormLabel>
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Was per-job safety discussed head?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was per-job safety discussed head?
                    </FormLabel>
                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Was JHA executed for the task?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was JHA executed for the task?
                    </FormLabel>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Was FLA executed for the task?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Was FLA executed for the task?
                    </FormLabel>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Did pre-planning identified the hazard?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      Did pre-planning identified the hazard?
                    </FormLabel>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  {/* <p>was per-jon planning enhanced the post-event?</p> */}

                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormLabel component="legend">
                      was per-jon planning enhanced the post-event?
                    </FormLabel>

                    {radioDecide.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/evidence/evidence/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="http://localhost:3000/app/incident-management/registration/evidence/personal-and-ppedetails/"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                deleteForm={[1,2,3]}
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Activity detail"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ActivityDetails;
