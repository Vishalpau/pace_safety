import { Button, Grid, Select } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import api from "../../../utils/axios";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import InvestigationOverviewValidate from "../../Validator/InvestigationValidation/InvestigationOverviewValidate";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";
import CircularProgress from '@material-ui/core/CircularProgress';

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
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false)

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

    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id;
      putId.current = incidentId;
    }
  };

  const [form, setForm] = useState({
    srartDate: new Date(),
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
    const { error, isValid } = InvestigationOverviewValidate(form);
    setError(error);
    setButtonLoading(true)
    if (Object.keys(error).length == 0) {
      if (putId.current == "") {
        const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/investigations/`, form);

        try {
          const temp = incidentsListData
          temp.updatedAt = new Date().toISOString();

          temp.incidentStage = "Investigation"
          temp.incidentStatus = "pending"
          const res = await api.put(
            `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
            temp
          );
        } catch (error) {
          history.push("/app/pages/error")
        }
        await history.push(`${INVESTIGATION_FORM["Severity consequences"]}${localStorage.getItem("fkincidentId")}`);

      } else if (putId.current !== "") {

        form["updatedBy"] = "0";
        const res = await api.put(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/`, form);
        await history.push(`${INVESTIGATION_FORM["Severity consequences"]}${putId.current}`
        );
      }
      localStorage.setItem("WorkerDataFetched", "");
    }
    setButtonLoading(false)
  };

  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    ).then((res) => {
      const result = res.data.data.results;
      setIncidentsListdata(result);
    })
      .catch((err) => history.push("/app/pages/error"))

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
    fetchIncidentsData()
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Investigation Overview" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">Unit manager</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="ucm-name"
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
                  id="ucm-contact"
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
                  id="uhs-name"
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
                  id="uhs-contact"
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
                    value={form.actualSeverityLevel || ""}
                  >
                    {severityValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            actualSeverityLevel: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
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
                    value={form.potentialSeverityLevel || ""}
                  >
                    {severityValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            potentialSeverityLevel: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
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
                  disabled={buttonLoading}
                >
                  Next{buttonLoading && <CircularProgress size={20} />}
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
        <Loader />
      )}
    </PapperBlock>
  );
};

export default InvestigationOverview;
