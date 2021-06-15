import React, { useState, useEffect } from "react";
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

import api from "../../../utils/axios";

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

  const [environmentAffectedValue, setEnvironmentAffectedValue] = useState([]);
  const [anyReleaseValue, setAnyReleaseValue] = useState([]);
  const [impactOnWildLife, setImpactOnWildLife] = useState([]);
  const [waterbodyAffectedValue, setWaterbodyAffectedValue] = useState([]);

  const fetchWaterBodyAffectedValue = async () => {
    const res = await api.get("api/v1/lists/19/value");
    const result = res.data.data.results;
    setWaterbodyAffectedValue(result);
  }

  const fetchImpactOnWildLifeValue = async () => {
    const res = await api.get("api/v1/lists/18/value");
    const result = res.data.data.results;
    setImpactOnWildLife(result);
  }

  const fetchAnyReleaseValue = async () => {
    const res = await api.get("api/v1/lists/17/value");
    const result = res.data.data.results;
    setAnyReleaseValue(result);
  };

  const fetchEquipmentAffectedValue = async () => {
    const res = await api.get("api/v1/lists/16/value");
    const result = res.data.data.results;
    setEnvironmentAffectedValue(result);
  };
  useEffect(()=>{
    fetchEquipmentAffectedValue();
    fetchAnyReleaseValue();
    fetchImpactOnWildLifeValue();
    fetchWaterBodyAffectedValue();
  },[])
  

  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box>
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Environment Affected
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={6}>
                  <p>Where there any spills</p>
                  {environmentAffectedValue.length!==0?environmentAffectedValue.map((value,index) => (
                    <FormControlLabel
                      value={value.inputValue}
                      control={<Radio />}
                      label={value.inputLabel}
                    />
                  )):null}
                </Grid>

                <Grid item md={12}>
                  <TextField
                    id="spills-details"
                    variant="outlined"
                    label="Details of spills"
                    multiline
                    rows="3"
                    className={classes.fullWidth}
                  />
                </Grid>

                <Grid item md={6}>
                  <div className={classes.spacer}>
                    <p className={classes.customLabel}>
                      Where there any release
                    </p>

                    {anyReleaseValue.length!==0?anyReleaseValue.map((value) => (
                      <FormControlLabel
                        value={value}
                        control={<Radio />}
                        label={value}
                      />
                    )):null}
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

                    {impactOnWildLife.length!==0?impactOnWildLife.map((value,index) => (
                      <FormControlLabel
                      key={index}
                        value={value.inputValue}
                        control={<Radio />}
                        label={value.inputLabel}
                      />
                    )):null}
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

                    {waterbodyAffectedValue!== 0 ? waterbodyAffectedValue.map((value) => (
                      <FormControlLabel
                        value={value.inputValue}
                        control={<Radio />}
                        label={value.inputLabel}
                      />
                    )):null}
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
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/eqiptment-affected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/reporting-and-notification/"
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Environment affected"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default EnvironmentAffected;
