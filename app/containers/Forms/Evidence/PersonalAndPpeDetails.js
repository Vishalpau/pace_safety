import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
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
}));

const PersonalAndPpeDetails = () => {
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
            <Box marginBottom={3}>
              <Typography variant="h6" gutterBottom>
                Personal and PPE
              </Typography>
            </Box>
            <Box marginBottom={4} borderBottom={1}>
              <Typography variant="body2" gutterBottom>
                Incident number: nnnnnnnnnn
              </Typography>
            </Box>
            <Grid container justify="flex-start">
              <Grid item md={6}>
                {/* <p>PPE worn properly</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">PPE worn properly?</FormLabel>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>PPE in good shape</p> */}

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">PPE in good shape?</FormLabel>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>PPE Proper fit</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">PPE Proper fit?</FormLabel>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>PPE appropriate for task</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    PPE appropriate for task?
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
            </Grid>

            <Box marginBottom={3} marginTop={4}>
              <Typography variant="h6">Supervision</Typography>
            </Box>
            <Grid container justify="flex-start">
              <Grid item md={6}>
                {/* <p>Employee self supervised</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Employee self supervised
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

              <Grid item md={6}>
                {/* <p>Supervisor present at site</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Supervisor present at site
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

              <Grid item md={6}>
                {/* <p>Supervisor provided clear detail of work</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Supervisor provided clear detail of work
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

              <Grid item md={6}>
                {/* <p>Supervisor provided detail work package</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Supervisor provided detail work package
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

              <Grid item md={6}>
                {/* <p>Did supervisor conducted I-care observation</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Did supervisor conducted I-care observation
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
            </Grid>

            <Box marginBottom={3} marginTop={4}>
              <Typography variant="h6">Flag Person</Typography>
            </Box>

            <Grid container justify="flex-start">
              <Grid item md={6}>
                {/* <p>Was flag person required for this job</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Was flag person required for this job
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

              <Grid item md={6}>
                {/* <p>Flag person trained/competent</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Flag person trained/competent
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

              <Grid item md={6}>
                {/* <p>Was flag person present</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Was flag person present
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
            </Grid>

            <Box marginBottom={3} marginTop={4}>
              <Typography variant="h6">Other</Typography>
            </Box>
            <Grid container justify="flex-start">
              <Grid item md={6}>
                {/* <p>Metal on Metal incident</p> */}
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Metal on Metal incident
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

              <Grid item md={6}>
                {/* <p>Was person in the line of fire</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Was person in the line of fire
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
            </Grid>
            <Box marginTop={4}>
              <Button
                variant="contained"
                color="primary"
                href="#contained-buttons"
              >
                Next
              </Button>
            </Box>
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={EVIDENCE_FORM}
              selectedItem={"Personal and Ppedetails"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default PersonalAndPpeDetails;
