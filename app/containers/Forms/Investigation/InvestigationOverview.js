import React, { useEffect, useRef, useState } from "react";
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

import InvestigationOverviewValidate from "../../Validator/InvestigationValidation/InvestigationOverviewValidate";
import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
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

  const severityValues = useRef([])

  const [form, setForm] = useState({
    srartDate: "2021-07-07T13:05:22.157Z",
    endDate: "2021-07-07T13:05:22.157Z",
    constructionManagerName: "",
    constructionManagerContactNo: "",
    hseSpecialistName: "",
    hseSpecialistContactNo: "",
    actualSeverityLevel: "",
    potentialSeverityLevel: "",
    createdBy: 0,
    fkIncidentId: localStorage.getItem("fkincidentId"),
  });

  const severity_level = ["High", "Low", "Medium"];

  const handleNext = () => {
    const { error, isValid } = InvestigationOverviewValidate(form);
    setError(error);

    const res = api.post(
      `api/v1/incidents/${localStorage.getItem(
        "fkincidentId"
      )}/investigations/`,
      form
    );
    if (res.status === 200) {
      console.log("request done");
    }
  };

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  useEffect(async () => {
    severityValues.current = await PickListData(41)
  }, []);

  return (
    <PapperBlock title="Investigation Overview" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={12}>
            <Typography variant="h6">Unit constructor manager</Typography>
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              required
              onChange={(e) => {
                setForm({
                  ...form,
                  constructionManagerName: e.target.value,
                });
              }}
              error={error && error.constructionManagerName}
              helperText={
                error && error.constructionManagerName
                  ? error.constructionManagerName
                  : null
              }
              className={classes.formControl}
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Contact"
              required
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
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6">Unit HSE specialist</Typography>
            </Box>
          </Grid>
          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Name"
              required
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
              required
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
                Actual severity & consequences
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label=" Actual severity & consequences"
                // defaultValue={incidentsListData.fkUnitId}
              >
                {severityValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => {
                      console.log("here");
                      setForm({
                        ...form,
                        actualSeverityLevel: selectValues,
                      });
                    }}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="unit-name-label">
                Potential severity & consequences
              </InputLabel>
              <Select
                labelId="unit-name-label"
                id="unit-name"
                label="Potential severity & consequences"
                // defaultValue={incidentsListData.fkUnitId}
              >
                {severityValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        potentialSeverityLevel: selectValues,
                      });
                    }}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
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
            selectedItem="Investigation overview"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default InvestigationOverview;
