import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";

import FormSideBar from "../FormSideBar";
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
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
  },
}));

const EnvironmentAffected = () => {
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

  const radioDecide = ["Yes", "No", "N/A"];

  const classes = useStyles();

  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box>
            <Typography variant="h4" gutterBottom>
              Environment Affected
            </Typography>
            <Grid container>
              <Grid item md={6}>
                <div>
                  <p>Where there any spills</p>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </div>
              </Grid>

              <Grid item md={12}>
                {/* <p>Details of spills</p> */}
                <div>
                  <TextField
                    id="spills-details"
                    variant="outlined"
                    label="Details of spills"
                    multiline
                    rows="3"
                    className={classes.fullWidth}
                  />
                </div>
              </Grid>

              <Grid item md={6}>
                <div className={classes.spacer}>
                  <p className={classes.customLabel}>Where there any release</p>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </div>
              </Grid>

              <Grid item md={12}>
                <div>
                  {/* <p>Details of release</p> */}
                  <TextField
                    id="release-details"
                    multiline
                    variant="outlined"
                    rows="3"
                    label="Details of release"
                    className={classes.fullWidth}
                  />
                </div>
              </Grid>

              <Grid itemmd={6}>
                <div className={classes.spacer}>
                  <p className={classes.customLabel}>
                    Where there any impact on wildlife
                  </p>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </div>
              </Grid>

              <Grid item md={12}>
                <div>
                  {/* <p>Details of spills</p> */}
                  <TextField
                    id="wildlife-details"
                    multiline
                    rows="3"
                    variant="outlined"
                    label="Details of spills"
                    className={classes.fullWidth}
                  />
                </div>
              </Grid>

              <Grid item md={6}>
                <div className={classes.spacer}>
                  <p className={classes.customLabel}>
                    Where there any waterbody affected
                  </p>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </div>
              </Grid>

              <Grid item md={12}>
                <div>
                  {/* <p>Details of spills</p> */}
                  <TextField
                    id="waterbody-details"
                    multiline
                    rows="3"
                    variant="outlined"
                    label="Details of spills"
                    className={classes.fullWidth}
                  />
                </div>
              </Grid>

              <Grid item md={12}>
                <div>
                  {/* <p>Comment if any</p> */}
                  <TextField
                    id="comments"
                    multiline
                    variant="outlined"
                    rows="3"
                    label="Comment if any"
                    className={classes.fullWidth}
                  />
                </div>
              </Grid>

              <Box marginTop={4}>
                <Button size="medium" variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </Grid>
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem={"Environment affected"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default EnvironmentAffected;
