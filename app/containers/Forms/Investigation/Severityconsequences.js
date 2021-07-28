import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Grid,
  Container,
  Input,
  Select,
  FormHelperText,
} from "@material-ui/core";


import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM, HIGHESTPOTENTIALIMPACTOR, RCAOPTION } from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import api from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const InvestigationOverview = () => {
  const notificationSent = ["Manage", "SuperVisor"];
  const [error, setError] = useState({});
  const putId = useRef("");
  const investigationId = useRef("")
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const selectValues = [1, 2, 3, 4];
  const healthAndSafetyValues = useRef([])
  const environmentValues = useRef([])
  const regulationValues = useRef([])
  const reputaionValues = useRef([])
  const financialValues = useRef([])
  const classificationValues = useRef([])


  const [form, setForm] = useState({});

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
    isWorkerClearedTest: "N/A",
    reasonForTestNotDone: "",
    status: "Active",
    createdBy: 0,
    fkInvestigationId: investigationId.current,
  })

  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(`api/v1/incidents/${incidentId}/investigations/`);
    let allApiData = previousData.data.data.results[0];
    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id
    }
    let workerApiDataFetch = await api.get(`api/v1/incidents/${incidentId}/investigations/${investigationId.current}/workers/`);
    if (workerApiDataFetch.data.data.results.length !== 0) {
      let worker_temp = []
      let workerApiData = workerApiDataFetch.data.data.results
      workerApiData.map((value) => {
        worker_temp.push(value)
      })
      localStorage.setItem("personEffected", JSON.stringify(worker_temp))
    } else {
      if (localStorage.getItem("WorkerDataFetched") !== "Yes") {
        let PeopleAffected = await api.get(`/api/v1/incidents/${incidentId}/people/`);
        let PeopleAffectedData = PeopleAffected.data.data.results
        let temp = []
        PeopleAffectedData.map((value, i) => {
          temp.push({
            ...workerForm.current, ...{
              "name": value.personName,
              "department": value.personDepartment,
              "workerType": value.personType
            }
          })
        })
        localStorage.setItem("personEffected", JSON.stringify(temp))
      }
    }
    // people affected data in local storage
  };

  const handleNext = async (e) => {
    const res = await api.put(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/`, form);
    if (putId.current) {
      if (JSON.parse(localStorage.getItem("personEffected")).length > 0) {
        history.push(`/app/incident-management/registration/investigation/worker-details/0/${putId.current}`)
      } else {

        localStorage.setItem("personEffected", JSON.stringify([workerForm.current]))
        history.push(`/app/incident-management/registration/investigation/worker-details/0/${localStorage.getItem("fkincidentId")}`)
      }
    }
    localStorage.setItem("WorkerDataFetched", "Yes")
    localStorage.removeItem("WorkerPost")
  };

  const handelDeaultValue = (value) => {
    return typeof value !== "undefined" ? value : ""
  }

  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const handelCall = async () => {
    await handelUpdateCheck();
    classificationValues.current = await PickListData(40)
    healthAndSafetyValues.current = await PickListData(42)
    environmentValues.current = await PickListData(43)
    regulationValues.current = await PickListData(44)
    reputaionValues.current = await PickListData(45)
    financialValues.current = await PickListData(46)
    await setIsLoading(true);
  }


  useEffect(() => {
    handelCall()
  }, []);

  return (
    <PapperBlock title="Severity Consequences" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6">
                Potential severity level scenario
              </Typography>
            </Grid>

            {/* health and safety  */}
            <Grid item md={6}>
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
                  {healthAndSafetyValues.current.map((selectValues) => (
                    <MenuItem
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          healthSafetyActual: selectValues,
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
                  Health & safety - potential consequences
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label=" Health & Safety - Potential Consequences"
                  value={handelDeaultValue(form.healthSafetyPotential)}
                >
                  {healthAndSafetyValues.current.map((selectValues) => (
                    <MenuItem
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          healthSafetyPotential: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Environment */}
            <Grid item md={6}>
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          environmentActual: selectValues,
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          environmentPotential: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Regulatory */}
            <Grid item md={6}>
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          regulatoryActual: selectValues,
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          regulatoryPotential: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* reuptation */}
            <Grid item md={6}>
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          reputationActual: selectValues,
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          reputationPotential: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* financial */}
            <Grid item md={6}>
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          financialActual: selectValues,
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          financialPotential: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* highest potentsial impact receptor */}
            <Grid item md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="unit-name-label">
                  Highest potential impact receptor
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Highest potential impact receptor"
                  value={handelDeaultValue(form.highestPotentialImpactReceptor)}
                >
                  {HIGHESTPOTENTIALIMPACTOR.map((selectValues) => (
                    <MenuItem
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          highestPotentialImpactReceptor: selectValues,
                        });
                      }}
                    >
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Classification */}
            <Grid item md={6}>
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
                      value={selectValues}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          classification: selectValues,
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
                <InputLabel id="unit-name-label">RCA recommended</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Rca recommended"
                  value={handelDeaultValue(form.rcaRecommended)}
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

            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleNext()}
              // href="http://localhost:3000/app/incident-management/registration/investigation/investigation-overview/"
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={INVESTIGATION_FORM}
              selectedItem="Severity consequences"
            />
          </Grid>
        </Grid>) : (<h1>Loading...</h1>)}
    </PapperBlock>
  );
};

export default InvestigationOverview;
