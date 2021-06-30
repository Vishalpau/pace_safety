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
import { PapperBlock } from "dan-components";

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
  button: {
    margin: theme.spacing(1),
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
    <PapperBlock title="Details of Equipments Affected" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                Do You Have Details to Share About the Equipment Affected ?
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
            {/* <p>Equipment Type</p> */}
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="eq-type-label">Equipment Type</InputLabel>
              <Select
                labelId="eq-type-label"
                id="eq-type"
                label="Equipment Type"
              >
                {selectValues.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={6}>
            {/* <p>if other Describe</p> */}
            <TextField
              variant="outlined"
              id="filled-basic"
              label="If others, Describe"
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={12}>
            {/* <p>Describe the damage</p> */}
            <TextField
              id="Describe-damage"
              multiline
              variant="outlined"
              rows="3"
              label="Describe the damage"
              className={classes.fullWidth}
            />
          </Grid>

          <Grid item lg={12} md={6} sm={6}>
            <button className={classes.textButton}>
              Add details of additional Equipment Affected?
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
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/property-impact-details/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              href="http://localhost:3000/app/incident-management/registration/investigation/event-details/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Equipment impact details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EquiptmentImpactDetails;
