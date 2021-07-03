import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Container,
  Input,
  Select,
  FormHelperText,
} from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";

import initialdetailvalidate from "../../Validator/InitialDetailsValidation";
import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import api from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const InvestigationOverview = () => {
  const notificationSent = ["Manage", "SuperVisor"];
  const [error, setError] = useState({});

  const selectValues = [1, 2, 3, 4];

  const [form, setForm] = useState({});

  const severity_level = ["Level1", "Level2", "Level3", "Level4"];

  const handleNext = () => {
    console.log(form);
    const { error, isValid } = initialdetailvalidate(form);
    setError(error);
    // console.log(error, isValid);
    const res = api.post("api/v1/incidents/92/investigations/", form);
    if (res.status === 200) {
      console.log("request done");
    }
  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  return (
    <PapperBlock title="Investigation Overview" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6">Unit Constructor Manager</Typography>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
              onChange={(e) => {
                setForm({
                  ...form,
                  constructionManagerName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Contact"
              error={error && error.constructionManagerContactNo}
              helperText={
                error && error.constructionManagerContactNo
                  ? error.constructionManagerContactNo
                  : null
              }
              className={classes.formControl}
              onChange={(e) => {
                setForm({
                  ...form,
                  constructionManagerContactNo: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6">Unit HSE specialist</Typography>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              error={error && error.hseSpecialistName}
              helperText={
                error && error.hseSpecialistName
                  ? error.hseSpecialistName
                  : null
              }
              className={classes.formControl}
              onChange={(e) => {
                setForm({
                  ...form,
                  hseSpecialistName: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              error={error && error.hseSpecialistContactNo}
              helperText={
                error && error.hseSpecialistContactNo
                  ? error.hseSpecialistContactNo
                  : null
              }
              label="Contact"
              className={classes.formControl}
              onChange={(e) => {
                setForm({
                  ...form,
                  hseSpecialistContactNo: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label">
                Actual Severity & Consequences
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Actual Severity & Consequences"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.actualSeverityLevel && (
                <FormHelperText>{error.actualSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item md={6}>
            {/* <p>Potential Severity Level </p> */}
            <FormControl
              variant="outlined"
              required
              className={classes.formControl}
            >
              <InputLabel id="unit-name-label">
                Potential Severity & Consequences
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Potential Severity & Consequences"
                // defaultValue={incidentsListData.fkUnitId}
                // onChange={(e) => {
                //   setForm({
                //     ...form,
                //     unitname: toString(e.target.value),
                //   });
                // }}
              >
                {severity_level.map((selectValues) => (
                  <MenuItem value={selectValues}>{selectValues}</MenuItem>
                ))}
              </Select>
              {error && error.potentialSeverityLevel && (
                <FormHelperText>{error.potentialSeverityLevel}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item md={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleNext()}
              // href="/app/incident-management/registration/investigation/investigation-overview/"
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Investigation Overview"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default InvestigationOverview;
