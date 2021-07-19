import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Select, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";
import {
  // TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { FormHelperText, FormLabel } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import api from "../../../utils/axios";
import WorkerDetailValidator from "../../Validator/InvestigationValidation/WorkerDetailsValidation";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
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

const WorkerDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testTaken, seTesttaken] = useState(false);
  const [error, setError] = useState({});
  const workerType = useRef([]);
  const departmentName = useRef([]);
  const workHours = useRef([]);
  const shiftType = useRef([]);
  const occupation = useRef([]);
  const shiftCycle = useRef([]);
  const noOfDaysIntoShift = useRef([]);
  const timeInCompany = useRef([]);
  const timeOnProject = useRef([]);
  const timeInIndustry = useRef([]);
  const primaryBodyPartWithSide = useRef([]);
  const secondaryBodyPartWithSide = useRef([]);
  const typeOfInjury = useRef([]);
  const higherMedicalResponder = useRef([]);
  const treatmentType = useRef([]);
  const mechanismOfInjury = useRef([]);
  const supervisorTimeInIndustry = useRef([]);
  const supervisorTimeInCompany = useRef([]);
  const supervisorTimeOnProject = useRef([]);


  const putId = useRef("");
  const investigationId = useRef("");
  const [form, setForm] = useState([])
  const [workerNumber, setWorkerNumber] = useState("")
  const history = useHistory();

  let [workerData, setworkerData] = useState({
    name: "",
    workerType: "",
    department: "",
    workHours: "",
    shiftTimeStart: "2000-07-15T10:11:11.382000Z",
    shiftType: "2000-07-15T10:11:11.382000Z",
    occupation: "",
    shiftCycle: "",
    noOfDaysIntoShift: "",
    timeInCompany: "",
    timeOnProject: "",
    timeInIndustry: "",
    attachments: "",
    eventLeadingToInjury: "",
    injuryObject: "",
    primaryBodyPartWithSide: "",
    secondaryBodyPartWithSide: "",
    typeOfInjury: "",
    NoOfDaysAway: "",
    medicalResponseTaken: "",
    treatmentDate: "2000-07-15T10:11:11.382000Z",
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
    dateOfAlcoholDrugTest: "2000-07-15T10:11:11.382000Z",
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

    // getting person affected data 
    const url = window.location.pathname.split('/')
    const workerNum = url[url.length - 2]
    setWorkerNumber(workerNum)
    let allEffectedPersonData = localStorage.getItem("personEffected")
    let particularEffected = JSON.parse(allEffectedPersonData)[workerNum]
    console.log(workerNum)
    if (typeof particularEffected !== "undefined") {

      setForm(particularEffected)
    }
    // getting person affected data end

    let investigationData = await api.get(`api/v1/incidents/${incidentId}/investigations/`);
    let allApiData = investigationData.data.data.results[0];
    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      investigationId.current = allApiData.id;
    }
    await setIsLoading(true);

    // JSON.parse(allEffectedPersonData).map((value, i) => {
    //   INVESTIGATION_FORM[`Worker${i}`] = `/app/incident-management/registration/investigation/worker-details/${i}/${incidentId}`
    // })
    console.log(workerNumber)
  };

  const handelAddNew = async () => {
    let worker = JSON.parse(localStorage.getItem("personEffected"))

    await worker.splice(parseInt(workerNumber) + 1, 0, workerData)
    await localStorage.setItem("personEffected", JSON.stringify(worker))
    // await history.push(`/app/incident-management/registration/investigation/worker-details/${parseInt(workerNumber) + 1}/${localStorage.getItem("fkincidentId")}`)
    await handleNext()
  }

  const radioDecide = ["Yes", "No", "N/A"];
  const radioYesNo = ["Yes", "No"];

  const handelTestTaken = async (e) => {
    if (e.target.value == "Yes") {
      setForm({ ...form, isAlcoholDrugTestTaken: e.target.value });
      seTesttaken(true);
    } else if (e.target.value == "No") {
      setForm({ ...form, isAlcoholDrugTestTaken: e.target.value, dateOfAlcoholDrugTest: "2000-07-15T10:48:00.000Z" });
      seTesttaken(false);
    }
  };

  const handleFile = async (e) => {
    const temp = { ...form };
    temp.attachments = e.target.files[0];
    await setForm(temp);
  };
  const handleNext = async () => {
    const { error, isValid } = WorkerDetailValidator(form);
    await setError(error);
    let data = new FormData();
    data.append("name", form.name);
    data.append("workerType", form.workerType);
    data.append("department", form.department);
    data.append("workHours", form.workHours);
    data.append("shiftTimeStart", form.shiftTimeStart);
    data.append("shiftType", form.shiftType);
    data.append("occupation", form.occupation);
    data.append("shiftCycle", form.shiftCycle);
    data.append("noOfDaysIntoShift", form.noOfDaysIntoShift);
    data.append("timeInCompany", form.timeInCompany);
    data.append("timeOnProject", form.timeOnProject);
    data.append("timeInIndustry", form.timeInIndustry);
    data.append("attachments", form.attachments);
    data.append("eventLeadingToInjury", form.eventLeadingToInjury);
    data.append("injuryObject", form.injuryObject);
    data.append("primaryBodyPartWithSide", form.primaryBodyPartWithSide);
    data.append("secondaryBodyPartWithSide", form.secondaryBodyPartWithSide);
    data.append("typeOfInjury", form.typeOfInjury);
    data.append("NoOfDaysAway", form.NoOfDaysAway);
    data.append("medicalResponseTaken", form.medicalResponseTaken);
    data.append("treatmentDate", form.treatmentDate);
    data.append("higherMedicalResponder", form.higherMedicalResponder);
    data.append("injuryStatus", form.injuryStatus);
    data.append("firstAidTreatment", form.firstAidTreatment);
    data.append("mechanismOfInjury", form.mechanismOfInjury);
    data.append("isMedicationIssued", form.isMedicationIssued);
    data.append("isPrescriptionIssued", form.isPrescriptionIssued);
    data.append("isNonPrescription", form.isNonPrescription);
    data.append("isAnyLimitation", form.isAnyLimitation);
    data.append("supervisorName", form.supervisorName);
    data.append("supervisorTimeInIndustry", form.supervisorTimeInIndustry);
    data.append("supervisorTimeInCompany", form.supervisorTimeInCompany);
    data.append("supervisorTimeOnProject", form.supervisorTimeOnProject);
    data.append("isAlcoholDrugTestTaken", form.isAlcoholDrugTestTaken);
    data.append("dateOfAlcoholDrugTest", form.dateOfAlcoholDrugTest);
    data.append("isWorkerClearedTest", form.isWorkerClearedTest);
    data.append("reasonForTestNotDone", form.reasonForTestNotDone);
    data.append("status", form.status);
    data.append("createdBy", form.createdBy);
    data.append("fkInvestigationId", investigationId.current);

    const res = await api.post(`/api/v1/incidents/${putId.current}/investigations/${investigationId.current}/workers/`, data);
    if (res.status == 201) {
      let worker = JSON.parse(localStorage.getItem("personEffected"))
      form["id"] = res.data.data.results.id

      worker[workerNumber] = form
      await localStorage.setItem("personEffected", JSON.stringify(worker))

      if (typeof worker[parseInt(workerNumber) + 1] !== "undefined") {
        await history.push(`/app/incident-management/registration/investigation/worker-details/${parseInt(workerNumber) + 1}/${localStorage.getItem("fkincidentId")}`)
      } else {
        await history.push(`/app/incident-management/registration/investigation/event-details/`)
      }
    }
    await handelUpdateCheck()
  };

  const PickList = async () => {
    await handelUpdateCheck()
    workerType.current = await PickListData(71);
    departmentName.current = await PickListData(10);
    workHours.current = await PickListData(70);
    shiftType.current = await PickListData(47);
    occupation.current = await PickListData(48);
    shiftCycle.current = await PickListData(49);
    noOfDaysIntoShift.current = await PickListData(50);
    timeInCompany.current = await PickListData(51);
    timeOnProject.current = await PickListData(52);
    timeInIndustry.current = await PickListData(53);
    primaryBodyPartWithSide.current = await PickListData(57);
    secondaryBodyPartWithSide.current = await PickListData(58);
    typeOfInjury.current = await PickListData(59);
    higherMedicalResponder.current = await PickListData(60);
    treatmentType.current = await PickListData(61);
    mechanismOfInjury.current = await PickListData(62);
    supervisorTimeInIndustry.current = await PickListData(54);
    supervisorTimeOnProject.current = await PickListData(55);
    supervisorTimeInCompany.current = await PickListData(56);
    await setIsLoading(true);
  };

  const handelPrevious = async () => {

    let worker = JSON.parse(localStorage.getItem("personEffected"))
    if (typeof worker[parseInt(workerNumber) - 1] !== "undefined") {
      await history.push(`/app/incident-management/registration/investigation/worker-details/${parseInt(workerNumber) - 1}/${localStorage.getItem("fkincidentId")}`)
    } else {
      await history.push(`/app/incident-management/registration/investigation/severity-consequences/`)
    }
    await handelUpdateCheck()
  }

  useEffect(() => {
    PickList();
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Worker details" icon="ion-md-list-box">
      {/* {console.log(form)} */}
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6">Worker details</Typography>
            </Grid>

            {/* {workerData.map((value, index)=>(<> */}
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Name"
                required
                value={form.name}
                error={error && error.name}
                helperText={error && error.name ? error.name : null}
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    name: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.workerType}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Type</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Type"
                  // value={incidentsListData.fkUnitId}
                  value={form.workerType}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      workerType: e.target.value,
                    });
                  }}
                >
                  {workerType.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.workerType && (
                  <FormHelperText>{error.workerType}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* department */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.department}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Department</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Department"
                  value={form.department}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      department: e.target.value,
                    });
                  }}
                >
                  {departmentName.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.department && (
                  <FormHelperText>{error.department}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Number of Scheduled Work Hours
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Number of Scheduled Work Hours"
                  value={form.workHours}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      workHours: e.target.value,
                    });
                  }}
                >
                  {workHours.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* start of shift */}
            <Grid item md={6}>
              <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                <KeyboardTimePicker
                  disableFuture
                  className={classes.formControl}
                  value={form.shiftTimeStart}
                  label="Start of shift time"
                  value={form.shiftTimeStart}
                  // value={
                  //   form.incidentdate || incidentsListData.incidentOccuredOn
                  // }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      shiftTimeStart: moment(e).toISOString(),
                    });
                  }}
                  format="HH:mm"
                  inputVariant="outlined"
                  disableFuture="true"
                />
              </MuiPickersUtilsProvider>
            </Grid>

            {/* type of shift */}
            <Grid item md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="unit-name-label">Type of shift</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Type of Shift"
                  value={form.shiftType}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      shiftType: e.target.value,
                    });
                  }}
                >
                  {shiftType.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Occupation */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Occupation</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Occupation"
                  value={form.occupation}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      occupation: e.target.value,
                    });
                  }}
                >
                  {occupation.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.occupation && (
                  <FormHelperText>{error.occupation}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Shift cycle */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Shift cycle</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Shift Cycle"
                  value={form.shiftCycle}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      shiftCycle: e.target.value,
                    });
                  }}
                >
                  {shiftCycle.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.shiftCycle && (
                  <FormHelperText>{error.shiftCycle}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* number of days */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Number of days into shift
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Number of Days into Shift"
                  value={form.noOfDaysIntoShift}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      noOfDaysIntoShift: e.target.value,
                    });
                  }}
                >
                  {noOfDaysIntoShift.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.noOfDaysIntoShift && (
                  <FormHelperText>{error.noOfDaysIntoShift}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* time in comapany */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Time in company</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Time in company"
                  value={form.timeInCompany}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      timeInCompany: e.target.value,
                    });
                  }}
                >
                  {timeInCompany.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.timeInCompany && (
                  <FormHelperText>{error.timeInCompany}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Time on project</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Time on project"
                  value={form.timeOnProject}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      timeOnProject: e.target.value,
                    });
                  }}
                >
                  {timeOnProject.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.timeOnProject && (
                  <FormHelperText>{error.timeOnProject}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* time in industry */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">Time in industry</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Time in Industry"
                  value={form.timeInIndustry}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      timeInIndustry: e.target.value,
                    });
                  }}
                >
                  {timeInIndustry.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.timeInIndustry && (
                  <FormHelperText>{error.timeInIndustry}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* injury     */}
            <Grid item md={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6">Injury details</Typography>
              </Box>
            </Grid>

            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Event leading to injury"
                className={classes.formControl}
                value={form.eventLeadingToInjury}
                error={error && error.eventLeadingToInjury}
                helperText={
                  error && error.eventLeadingToInjury
                    ? error.eventLeadingToInjury
                    : null
                }
                onChange={(e) => {
                  setForm({
                    ...form,
                    eventLeadingToInjury: e.target.value,
                  });
                }}
              />
            </Grid>

            {/* injury object */}
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Injury object"
                className={classes.formControl}
                error={error && error.injuryObject}
                value={form.injuryObject}
                helperText={
                  error && error.injuryObject ? error.injuryObject : null
                }
                onChange={(e) => {
                  setForm({
                    ...form,
                    injuryObject: e.target.value,
                  });
                }}
              />
            </Grid>

            {/* primary body part included */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Primary body part side included
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Primary Body Part Side Included"
                  value={form.primaryBodyPartWithSide}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      primaryBodyPartWithSide: e.target.value,
                    });
                  }}
                >
                  {primaryBodyPartWithSide.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.primaryBodyPartWithSide && (
                  <FormHelperText>
                    {error.primaryBodyPartWithSide}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Secondary body part included
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Secondary Body Part Included"
                  value={form.secondaryBodyPartWithSide}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      secondaryBodyPartWithSide: e.target.value,
                    });
                  }}
                >
                  {secondaryBodyPartWithSide.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.secondaryBodyPartWithSide && (
                  <FormHelperText>
                    {error.secondaryBodyPartWithSide}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Type of injury illness
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Type of injury illness"
                  value={form.typeOfInjury}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      typeOfInjury: e.target.value,
                    });
                  }}
                >
                  {typeOfInjury.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.typeOfInjury && (
                  <FormHelperText>{error.typeOfInjury}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* day away/restriction */}
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Number of Days Away/On Restriction"
                error={error && error.NoOfDaysAway}
                value={form.NoOfDaysAway}
                helperText={
                  error && error.NoOfDaysAway ? error.NoOfDaysAway : null
                }
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    NoOfDaysAway: e.target.value,
                  });
                }}
              />
            </Grid>

            {/* medical response */}
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Medical Response Taken"
                value={form.medicalResponseTaken}
                error={error && error.medicalResponseTaken}
                helperText={
                  error && error.medicalResponseTaken
                    ? error.medicalResponseTaken
                    : null
                }
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    medicalResponseTaken: e.target.value,
                  });
                }}
              />
            </Grid>

            {/* treatment date  */}
            <Grid item md={6}>
              <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  label="Treatment Date"
                  value={form.treatmentDate}
                  value={form.treatmentDate}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      treatmentDate: moment(e).toISOString(),
                    });
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                  disableFuture="true"
                />
              </MuiPickersUtilsProvider>
            </Grid>

            {/* highest medical responder */}
            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.higherMedicalResponder}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Highest medical responder
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Highest Medical Responder"
                  value={form.higherMedicalResponder}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      higherMedicalResponder: e.target.value,
                    });
                  }}
                >
                  {higherMedicalResponder.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.higherMedicalResponder && (
                  <FormHelperText>
                    {error.higherMedicalResponder}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* status update    */}
            <Grid item md={6}>
              <TextField
                id="title"
                variant="outlined"
                label="Status Update"
                error={error && error.injuryStatus}
                value={form.injuryStatus}
                helperText={
                  error && error.injuryStatus ? error.injuryStatus : null
                }
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    injuryStatus: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                required
                error={error && error.actualSeverityLevel}
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  First aid treatment
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="First Aid Treatment"
                  value={form.firstAidTreatment}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      firstAidTreatment: e.target.value,
                    });
                  }}
                >
                  {treatmentType.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.firstAidTreatment && (
                  <FormHelperText>{error.firstAidTreatment}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Mechanism of injury
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Mechanism of Injury"
                  value={form.mechanismOfInjury}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      mechanismOfInjury: e.target.value,
                    });
                  }}
                >
                  {mechanismOfInjury.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.mechanismOfInjury && (
                  <FormHelperText>{error.mechanismOfInjury}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6">Worker care</Typography>
              </Box>
            </Grid>

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Medical Issued ?</FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  value={form.isMedicationIssued}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      isMedicationIssued: e.target.value,
                    });
                  }}
                >
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Prescription Issues ?</FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  value={form.isPrescriptionIssued}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      isPrescriptionIssued: e.target.value,
                    });
                  }}
                >
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Non-Prescription ?</FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  value={form.isNonPrescription}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      isNonPrescription: e.target.value,
                    });
                  }}
                >
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Any Limitation ?</FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  value={form.isAnyLimitation}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      isAnyLimitation: e.target.value,
                    });
                  }}
                >
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6">Alcohal and drug test</Typography>
              </Box>
            </Grid>

            <Grid item md={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Was the test taken?</FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  value={
                    form.isAlcoholDrugTestTaken
                      ? form.isAlcoholDrugTestTaken
                      : "No"
                  }
                  onChange={(e) => handelTestTaken(e)}
                >
                  {radioYesNo.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {testTaken ? (
              <>
                <Grid item md={6}>
                  <MuiPickersUtilsProvider
                    variant="outlined"
                    utils={DateFnsUtils}
                  >
                    <KeyboardDatePicker
                      error={error.incidentdate}
                      required
                      className={classes.formControl}
                      value={form.dateOfAlcoholDrugTest}
                      value={form.dateOfAlcoholDrugTest}
                      label="Date of Test"
                      helperText={
                        error.incidentdate ? error.incidentdate : null
                      }
                      onChange={(e) => {
                        setForm({
                          ...form,
                          dateOfAlcoholDrugTest: moment(e).toISOString(),
                        });
                      }}
                      format="yyyy/MM/dd"
                      inputVariant="outlined"
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item md={6}>
                  {/* <p>Was worker cleared to work following A&D testing?</p> */}
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Was worker cleared to work following a&d testing?
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      value={form.isWorkerClearedTest}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          isWorkerClearedTest: e.target.value,
                        });
                      }}
                    >
                      {radioYesNo.map((value) => (
                        <FormControlLabel
                          value={value}
                          control={<Radio />}
                          label={value}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </>
            ) : (
              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Why was the test not conducted?"
                  className={classes.formControl}
                  value={form.reasonForTestNotDone}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reasonForTestNotDone: e.target.value,
                    });
                  }}
                />
              </Grid>
            )}

            <Grid item md={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6">
                  Supervisor details for worker
                </Typography>
              </Box>
            </Grid>

            <Grid item md={6}>
              {/* <p>Supervisor name</p> */}
              <TextField
                id="title"
                variant="outlined"
                label="Supervisor Name"
                error={error && error.supervisorName}
                value={form.supervisorName}
                helperText={
                  error && error.supervisorName ? error.supervisorName : null
                }
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supervisorName: e.target.value,
                  });
                }}
              />
              {error && error.supervisorName && <p>{error.supervisorName}</p>}
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Supervisor Time in Industry
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Supervisor Time in Industry"
                  value={form.supervisorTimeInIndustry}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorTimeInIndustry: e.target.value,
                    });
                  }}
                >
                  {supervisorTimeInIndustry.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.supervisorTimeInIndustry && (
                  <FormHelperText>
                    {error.supervisorTimeInIndustry}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Supervisor time in company
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Supervisor time in company"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorTimeInCompany: e.target.value,
                    });
                  }}
                  value={form.supervisorTimeInCompany}
                >
                  {supervisorTimeInCompany.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.supervisorTimeInCompany && (
                  <FormHelperText>
                    {error.supervisorTimeInCompany}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={6}>
              <FormControl
                variant="outlined"
                error={error && error.actualSeverityLevel}
                required
                className={classes.formControl}
              >
                <InputLabel id="unit-name-label">
                  Supervisor time on project
                </InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Supervisor time on project"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorTimeOnProject: e.target.value,
                    });
                  }}
                  value={form.supervisorTimeOnProject}
                >
                  {supervisorTimeOnProject.current.map((value) => (
                    <MenuItem value={value}>{value}</MenuItem>
                  ))}
                </Select>
                {error && error.supervisorTimeOnProject && (
                  <FormHelperText>
                    {error.supervisorTimeOnProject}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item md={12}>
              <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                <Typography variant="h6">Attachment</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} justify="flex-start">
              <input
                type="file"
                className={classes.fullWidth}
                name="file"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
            </Grid>
            {/* </>))} */}

            <Grid item md={12}>
              <button
                className={classes.textButton}
                onClick={(e) => handelAddNew()}
              >
                Add new worker
              </button>
            </Grid>

            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handelPrevious()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleNext()}
              // href="/app/incident-management/registration/investigation/property-impact-details/"
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={INVESTIGATION_FORM}
              selectedItem="Worker details"
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default WorkerDetails;
