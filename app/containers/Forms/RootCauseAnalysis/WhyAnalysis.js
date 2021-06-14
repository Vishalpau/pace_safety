import React from "react";
import { Button, Grid, Container } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import RemoveCircleOutlineSharpIcon from "@material-ui/icons/RemoveCircleOutlineSharp";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import Fab from "@material-ui/core/Fab";

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
}));

import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const WhyAnalysis = () => {
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
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              5 Why Analysis
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
                    Method: 5 Why Analysis
                  </Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h6" gutterBottom>
                  Incident Description
                </Typography>

                <Typography variant="body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam repellendus quaerat ullam nemo tempora voluptatem!
                  Dolorum cum ab error rerum reiciendis, dolores incidunt ex,
                  repellendus beatae ea qui, reprehenderit rem.
                </Typography>

                <Box marginTop={3}>
                  <Typography variant="h6" gutterBottom>
                    Level of Investigation
                  </Typography>
                  <Typography variant="body2">Level 5</Typography>
                </Box>
              </Grid>
              <Grid item md={12}>
                {/* <p>Evidence collection</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Evidence collection"
                  multiline
                  rows={3}
                  className={classes.formControl}
                />
              </Grid>
              <Grid item md={12}>
                {/* <p>why3</p> */}

                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <TextField
                      id="filled-basic"
                      label="Why 1"
                      variant="outlined"
                      className={classes.formControl}
                    />
                  </Grid>

                  <Grid item sm={1} justify="center">
                    <Fab size="small" color="secondary" aria-label="remove">
                      <RemoveCircleOutlineIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid container spacing={2}>
                  <Grid item sm={11}>
                    <TextField
                      id="filled-basic"
                      label="Why 1"
                      variant="outlined"
                      className={classes.formControl}
                    />
                  </Grid>

                  <Grid item sm={1}>
                    <Fab size="small" color="secondary" aria-label="remove">
                      <RemoveCircleOutlineIcon />
                    </Fab>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12}>
                {/* This button will add another entry of why input  */}
                <button className={classes.textButton}>
                  <AddIcon /> Add
                </button>
              </Grid>
              <Grid item md={12}>
              <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/root-cause-analysis/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/summary/summary/"
                  >
                    Submit
                  </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              Sidebar
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default WhyAnalysis;
