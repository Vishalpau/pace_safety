import {
  Button,
  Grid, Select
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-grid-system";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import api from "../../../utils/axios";
import {
  INVESTIGATION_FORM, RCAOPTION
} from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import allPickListDataValue from "../../../utils/Picklist/allPickList";

import FormSideBar from "../FormSideBar";
import Loader from "../Loader";
import CircularProgress from '@material-ui/core/CircularProgress';

import { OtherNA } from "../../../utils/CheckerValue"

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const InvestigationOverview = (props) => {
  const putId = useRef("");
  const investigationId = useRef("");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const healthAndSafetyValues = useRef([]);
  const environmentValues = useRef([]);
  const regulationValues = useRef([]);
  const reputaionValues = useRef([]);
  const financialValues = useRef([]);
  const classificationValues = useRef([]);
  const highestImpactReceptor = useRef([])
  const [buttonLoading, setButtonLoading] = useState(false)

  const [form, setForm] = useState({});
  let allPickListData = props.initialValues.allPickListData
  let pickListValues = JSON.parse(localStorage.getItem("pickList"))


  const workerForm = useRef({
    name: "",
    workerType: "",
    department: "",
    workHours: "",
    shiftTimeStart: null,
    shiftType: "",
    occupation: "",
    shiftCycle: "",
    noOfDaysIntoShift: "",
    timeInCompany: "",
    timeOnProject: "",
    timeInIndustry: "",
    attachments: null,
    eventLeadingToInjury: "",
    injuryObject: "",
    primaryBodyPartWithSide: "",
    secondaryBodyPartWithSide: "",
    typeOfInjury: "",
    NoOfDaysAway: "",
    medicalResponseTaken: "",
    treatmentDate: null,
    higherMedicalResponder: "",
    injuryStatus: "",
    firstAidTreatment: "",
    mechanismOfInjury: "",
    isMedicationIssued: "No",
    isPrescriptionIssued: "No",
    isNonPrescription: "No",
    isAnyLimitation: "No",
    supervisorName: "",
    supervisorTimeInIndustry: "",
    supervisorTimeInCompany: "",
    supervisorTimeOnProject: "",
    isAlcoholDrugTestTaken: "No",
    dateOfAlcoholDrugTest: null,
    isWorkerClearedTest: "Yes",
    reasonForTestNotDone: "",
    status: "Active",
    createdBy: 0,
    fkInvestigationId: investigationId.current,
  });

  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];
    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id;
    }
    let workerApiDataFetch = await api.get(
      `api/v1/incidents/${incidentId}/investigations/${investigationId.current
      }/workers/`
    );
    if (workerApiDataFetch.data.data.results.length !== 0) {
      let worker_temp = [];
      let workerApiData = workerApiDataFetch.data.data.results;
      workerApiData.map((value) => {
        worker_temp.push(value);
      });
      localStorage.setItem("personEffected", JSON.stringify(worker_temp));
    } else {
      if (localStorage.getItem("WorkerDataFetched") !== "Yes") {
        let PeopleAffected = await api.get(
          `/api/v1/incidents/${incidentId}/people/`
        );
        let PeopleAffectedData = PeopleAffected.data.data.results;
        let temp = [];
        PeopleAffectedData.map((value, i) => {
          temp.push({
            ...workerForm.current,
            ...{
              name: value.personName,
              department: value.personDepartment,
              workerType: value.personType,
            },
          });
        });
        localStorage.setItem("personEffected", JSON.stringify(temp));
      }
    }
    // people affected data in local storage
  };

  const handleNext = async (e) => {
    setButtonLoading(true)
    const res = await api.put(
      `api/v1/incidents/${putId.current}/investigations/${investigationId.current
      }/`,
      form
    );
    if (putId.current) {
      if (JSON.parse(localStorage.getItem("personEffected")).length > 0) {
        history.push(
          `/app/incident-management/registration/investigation/worker-details/0/${putId.current}`
        );
      } else {
        localStorage.setItem(
          "personEffected",
          JSON.stringify([workerForm.current])
        );
        history.push(
          `/app/incident-management/registration/investigation/worker-details/0/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
      setButtonLoading(false)
    }
    localStorage.setItem("WorkerDataFetched", "Yes");
    localStorage.removeItem("WorkerPost");
    let rcaDecide = localStorage.getItem("rcaRecommended")
    let incidentId = localStorage.getItem("fkincidentId")
    if (rcaDecide == null || rcaDecide !== `Yes${incidentId}`) {
      localStorage.setItem("rcaRecommended", `No${incidentId}`)
    }
  };

  const handelDeaultValue = (value) => {
    let newValue = value !== undefined ? value : "";
    return newValue
  };


  let ONA = OtherNA("on")
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const handelCall = async () => {
    await handelUpdateCheck();
    classificationValues.current = pickListValues["40"];
    healthAndSafetyValues.current = [...pickListValues["42"], ONA[0], ONA[1]];
    environmentValues.current = [...pickListValues["43"], ONA[0], ONA[1]];
    regulationValues.current = [...pickListValues["44"], ONA[0], ONA[1]];
    reputaionValues.current = [...pickListValues["45"], ONA[0], ONA[1]];
    financialValues.current = [...pickListValues["46"], ONA[0], ONA[1]];
    highestImpactReceptor.current = pickListValues["72"];
    await setIsLoading(true);
  };


  const handelClassification = async (value) => {
    console.log(value)
    let paceCauseClassification = [
      "Fatality",
      "Lost time incident",
      "Property damage more than Rs 5,00,00,000",
      "Property damage more than Rs 1,00,00,000"
    ]
    let causeClassification = [
      "Medical incident",
      "Property damage more than Rs 25,00,000"
    ]
    let whyAnalysisClassification = [
      "Property damage less than Rs 25,00,000",
      "First aid"
    ]

    if (paceCauseClassification.includes(value)) {
      await setForm({
        ...form,
        classification: value,
        rcaRecommended: "PACE cause analysis",
      });
    } else if (causeClassification.includes(value)) {
      await setForm({
        ...form,
        classification: value,
        rcaRecommended: "Cause analysis",
      });
    } else if (whyAnalysisClassification.includes(value)) {
      await setForm({
        ...form,
        classification: value,
        rcaRecommended: "Five why analysis",
      });
    }
  }


  useEffect(() => {
    handelCall();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Severity Consequences" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  Potential severity level scenario
                </Typography>
              </Grid>

              {/* health and safety  */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Health & safety - actual consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Health & safety - actual consequences"
                    value={handelDeaultValue(form.healthSafetyActual)}
                  >
                    {healthAndSafetyValues.current !== undefined && healthAndSafetyValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            healthSafetyActual: selectValues.value,
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
                    Health & safety - potential consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label=" Health & Safety - Potential Consequences"
                    value={handelDeaultValue(form.healthSafetyPotential)}
                  >
                    {healthAndSafetyValues.current !== undefined && healthAndSafetyValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            healthSafetyPotential: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Environment */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Environment - actual consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label=" Environment - actual consequences"
                    value={handelDeaultValue(form.environmentActual)}
                  >
                    {environmentValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            environmentActual: selectValues.value,
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
                    Environment - potential consequences
                  </InputLabel>
                  <Select
                    labelId=""
                    id="unit-name"
                    label="Environment - potential consequences"
                    value={handelDeaultValue(form.environmentPotential)}
                  >
                    {environmentValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            environmentPotential: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Regulatory */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Regulatory - actual consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Regulatory - actual consequences"
                    value={handelDeaultValue(form.regulatoryActual)}
                  >
                    {regulationValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            regulatoryActual: selectValues.value,
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
                    Regulatory - potential consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Regulatory - potential consequences"
                    value={handelDeaultValue(form.regulatoryPotential)}
                  >
                    {regulationValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            regulatoryPotential: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* reuptation */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Reputation - actual consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Reputation -  Actual Consequences"
                    value={handelDeaultValue(form.reputationActual)}
                  >
                    {reputaionValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            reputationActual: selectValues.value,
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
                    Reputation - potential consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Reputation - potential consequences"
                    value={handelDeaultValue(form.reputationPotential)}
                  >
                    {reputaionValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            reputationPotential: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* financial */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Financial - actual consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Financial - actual consequences"
                    value={handelDeaultValue(form.financialActual)}
                  >
                    {financialValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            financialActual: selectValues.value,
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
                    Financial potential consequences
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Financial potential consequences"
                    value={handelDeaultValue(form.financialPotential)}
                  >
                    {financialValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            financialPotential: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* highest potentsial impact receptor */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Highest potential impact receptor
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Highest potential impact receptor"
                    value={handelDeaultValue(
                      form.highestPotentialImpactReceptor
                    )}
                  >
                    {highestImpactReceptor.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            highestPotentialImpactReceptor: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Classification */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">Classification</InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Classification"
                    value={handelDeaultValue(form.classification)}
                  >
                    {classificationValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => handelClassification(selectValues.value)}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                  >
                    RCA recommended
                  </InputLabel>
                  <Select
                    label="RCA recommended"
                    value={form.rcaRecommended || ""}
                  >
                    {RCAOPTION.map((selectValues) => (
                      <MenuItem
                        value={selectValues}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            rcaRecommended: selectValues,
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
                  className={classes.button}
                  onClick={() => history.push(INVESTIGATION_FORM["Investigation overview"])}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
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
                selectedItem="Severity consequences"
              />
            </Col>
          )}
        </Row>
      ) : (
        <Loader />
      )
      }
    </PapperBlock >
  );
};



InvestigationOverview.propTypes = {
  classes: PropTypes.object.isRequired,
};
const investigationOverviewInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(InvestigationOverview);

// export default InvestigationOverview;
export default investigationOverviewInit;