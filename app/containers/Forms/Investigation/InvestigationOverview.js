import React, { useEffect, useRef, useState } from "react";
import { Button, Grid, Select } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Col, Row } from "react-grid-system";

import InvestigationOverviewValidate from "../../Validator/InvestigationValidation/InvestigationOverviewValidate";
import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
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
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const putId = useRef("");
  const history = useHistory();
  const investigationId = useRef("");
  const severityValues = useRef([]);

  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];
    console.log(incidentId);
    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id;
      putId.current = incidentId;
    }
  };

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
    fkIncidentId: putId.current || localStorage.getItem("fkincidentId"),
  });

  const handleNext = async () => {
    console.log(putId.current);
    const { error, isValid } = InvestigationOverviewValidate(form);
    setError(error);

    if (Object.keys(error).length == 0) {
      if (putId.current == "") {
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/investigations/`,
          form
        );
        await history.push(
          `/app/incident-management/registration/investigation/severity-consequences/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      } else if (putId.current !== "") {
        console.log(putId.current);
        form["updatedBy"] = "0";
        const res = await api.put(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/`,
          form
        );
        await history.push(
          `/app/incident-management/registration/investigation/severity-consequences/${
            putId.current
          }`
        );
      }

      localStorage.setItem("WorkerDataFetched", "");
    }
  };

  const classes = useStyles();
  const callback = async () => {
    await handelUpdateCheck();
    severityValues.current = await PickListData(41);
    setIsLoading(true);
    localStorage.removeItem("WorkerDataFetched");
  };

  useEffect(() => {
    handelUpdateCheck();
    callback();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Investigation Overview" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Unit constructor manager</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Name"
                  required
                  value={form.constructionManagerName}
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

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Contact"
                  required
                  value={form.constructionManagerContactNo}
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
              <Grid item xs={12} md={12}>
                <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                  <Typography variant="h6">Unit HSE specialist</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Name"
                  required
                  value={form.hseSpecialistName}
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
              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  value={form.hseSpecialistContactNo}
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
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Actual severity & consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label=" Actual severity & consequences"
                    value={form.actualSeverityLevel || false}
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
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Potential severity & consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Potential severity & consequences"
                    value={form.potentialSeverityLevel || false}
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

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={INVESTIGATION_FORM}
                selectedItem="Investigation overview"
              />
            </Col>
          )}
        </Row>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default InvestigationOverview;
