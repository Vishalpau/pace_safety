import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
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
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
}));

const PeoplesAffected = () => {
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
  const radioDecideNew = ["Yes", "No", "N/A"];
  const classes = useStyles();
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
                Details of Persons Affected
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item lg={12} md={6} sm={6}>
                <Typography variant="body2">
                  Do you have details of individual effected?
                </Typography>
                {/* <p>Do you have details of individual effected?</p>   */}
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </Grid>

              <Grid item md={12}>
                <Box marginTop={2} marginBottom={2}>
                  {/* <h4>Details of people affected</h4> */}
                  <Typography variant="h6">
                    Details of people affected
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={6}>
                {/* <p>person type</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="person-type-label">Person type</InputLabel>
                  <Select
                    labelId="person-type-label"
                    id="person-type"
                    label="Person type"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="dep-label">Department</InputLabel>
                  <Select labelId="dep-label" id="dep" label="Department">
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>Name of people affected</p> */}
                <TextField
                  id="name-affected"
                  variant="outlined"
                  label="Name of people affected"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={6}>
                {/* <p>Identification number of person</p> */}
                <TextField
                  id="id-num"
                  variant="outlined"
                  label="Identification number of person"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={12}>
                <div className={classes.spacer}>
                  {/* <p>Was that person taken to medical care?</p> */}
                  <Typography variant="body2">
                    Was that person taken to medical care?
                  </Typography>

                  {radioDecideNew.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </div>
              </Grid>

              <Grid item md={6}>
                {/* <p>Worker taken offisite for further assesment?</p> */}
                <TextField
                  id="worker-taken"
                  variant="outlined"
                  label="Worker taken offisite for further assesment?"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={6}>
                {/* <p>Location details of assesment center</p> */}
                <TextField
                  variant="outlined"
                  id="location-details"
                  label="Worker taken offisite for further assesment?"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={12}>
                <button className={classes.textButton}>
                  <PersonAddIcon /> Add details of another person affected
                </button>
              </Grid>

              <Grid item md={12}>
                {/* <p>Comments</p> */}
                <TextField
                  id="comments"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Describe any actions taken"
                  className={classes.fullWidth}
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
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem={"Peoples affected"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default PeoplesAffected;
