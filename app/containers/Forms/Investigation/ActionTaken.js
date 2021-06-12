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

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
}));

const ActionTaken = () => {
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

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Investigation"} />
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h5" gutterBottom>
                Action Taken
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item md={6}>
                {/* <p>if other describe</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="Pre event mitigation"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={6}>
                {/* <p>Describe the damage</p> */}
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.formControl}
                />
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
            </Grid>
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={INVESTIGATION_FORM}
              selectedItem={"Action taken"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default ActionTaken;
