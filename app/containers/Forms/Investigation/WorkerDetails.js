import React from "react";
import { Button, Grid, Select, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const WorkerDetails = () => {
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
            <FormHeader selectedHeader={"Investigation"} />
          </Box>
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Details of person affected
            </Typography>
          </Box>
          <Box marginTop={3} marginBottom={4}>
            <Typography variant="subtitle1" gutterBottom>
              Potential Severity Level Scenerio
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item md={6}>
              {/* <p>Healthy and Saftey - Actual consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Healthy and Saftey - Actual consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Healthy and Saftey - Actual consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Healthy & Saftey - Potential consquence</p> */}

              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Healthy & Saftey - Potential consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label=" Healthy & Saftey - Potential consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Environment - Actual consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Environment - Actual consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Environment - Actual consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Environment - Potential consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Environment - Potential consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Environment - Potential consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Regulatory - Actual consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Regulatory - Actual consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Regulatory - Actual consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Regulatory - Potential consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Regulatory - Potential consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label=" Regulatory - Potential consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Reputation - Actual consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Reputation - Actual consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Reputation - Actual consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Reputation - Potential consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Reputation - Potential consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Reputation - Potential consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Financial - actual consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Financial - actual consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Financial - actual consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Financial - Potential consquence</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Financial - Potential consquence
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label=" Financial - Potential consquence"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Higest Potential Impactor Receptor</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">
                  Higest Potential Impactor Receptor
                </InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Higest Potential Impactor Receptor"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6}>
              {/* <p> Classification</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">Classification</InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="Classification"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={6}>
              {/* <p> RCA recommended</p> */}
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="eq-type-label">RCA recommended</InputLabel>
                <Select
                  labelId="eq-type-label"
                  id="eq-type"
                  label="RCA recommended"
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12} md={6} sm={6}>
              <TextField
                className={classes.formControl}
                id="filled-basic"
                multiline
                variant="outlined"
                label="Others"
                rows="3"
              />
            </Grid>
            <Box marginTop={4}>
              <Button variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Grid>
        </Box>
        <Grid>
          <FormSideBar
            listOfItems={INVESTIGATION_FORM}
            selectedItem={"Worker details"}
          />
        </Grid>
      </Paper>
    </Container>
  );
};

export default WorkerDetails;
