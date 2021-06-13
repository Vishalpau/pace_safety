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

const EquiptmentImpactDetails = () => {
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

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Details of Equiptments Affected
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item md={12}>
                <p>
                  Do you have details to share about the equipment affected?
                </p>
                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </Grid>

              <Grid item md={6}>
                {/* <p>Equiptment type</p> */}
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="eq-type-label">Equiptment type</InputLabel>
                  <Select
                    labelId="eq-type-label"
                    id="eq-type"
                    label="Equiptment type"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                {/* <p>if other describe</p> */}
                <TextField
                  variant="outlined"
                  id="filled-basic"
                  label="If others, describe"
                  className={classes.formControl}
                />
              </Grid>

              <Grid item md={12}>
                {/* <p>Describe the damage</p> */}
                <TextField
                  id="describe-damage"
                  multiline
                  variant="outlined"
                  rows="3"
                  label="Describe the damage"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item lg={12} md={6} sm={6}>
                <button className={classes.textButton}>
                  Add details of additional equiptment affected?
                </button>
              </Grid>

              <Grid item lg={12} md={6} sm={6}>
                {/* <p>Comment </p> */}
                <TextField
                  id="comments"
                  multiline
                  variant="outlined"
                  rows="4"
                  label="Editional details"
                  className={classes.fullWidth}
                />
              </Grid>
              <Grid item md={6}>
                <Button variant="contained" color="primary">
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Grid>
            <FormSideBar
              listOfItems={INVESTIGATION_FORM}
              selectedItem={"Equipment impact details"}
            />
          </Grid>
        </Paper>
      </Container>
    </div>
  );
};

export default EquiptmentImpactDetails;
