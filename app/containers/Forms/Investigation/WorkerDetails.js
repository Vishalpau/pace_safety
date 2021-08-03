import React, { useEffect, useState, useRef } from "react";
import { Button, Grid, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";
import {
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
import ImageIcon from "@material-ui/icons/Image";
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { spacing } from "@material-ui/system";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import api from "../../../utils/axios";
import WorkerDetailValidator from "../../Validator/InvestigationValidation/WorkerDetailsValidation";
import { object } from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Attachment from "../../../containers/Attachment/Attachment"


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
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  }
}));

const WorkerDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [testTaken, setTesttaken] = useState(false);
  const [error, setError] = useState({});
  const workerType = useRef([]);
  const [departmentName, setDepartmentName] = useState([]);
  const [workHours, setworkHours] = useState([]);
  /////////
  const [shiftType, setShiftType] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [shiftCycle, setShiftCycle] = useState([]);
  const [noOfDaysIntoShift, setNoOfDaysIntoShift] = useState([]);
  const [timeInCompany, setTimeInCompany] = useState([]);
  const [timeOnProject, setTimeOnProject] = useState([]);
  const [timeInIndustry, setTimeInIndustry] = useState([]);
  const [primaryBodyPartWithSide, setPrimaryBodyPartWithSide] = useState([]);
  const [secondaryBodyPartWithSide, setSecondaryBodyPartWithSide] = useState(
    []
  );
  const [typeOfInjury, setTypeOfInjury] = useState([]);
  const [higherMedicalResponder, setHigherMedicalResponder] = useState([]);
  const [treatmentType, setTreatmentType] = useState([]);
  const [mechanismOfInjury, setMechanismOfInjury] = useState([]);
  const [supervisorTimeInIndustry, setSupervisorTimeInIndustry] = useState([]);
  const [supervisorTimeInCompany, setSupervisorTimeInCompany] = useState([]);
  const [supervisorTimeOnProject, setSupervisorTimeOnProject] = useState([]);

  const putId = useRef("");
  const investigationId = useRef("");
  const [form, setForm] = useState([]);
  const [workerNumber, setWorkerNumber] = useState("");
  const history = useHistory();
  const [workerid, setWorkerId] = useState();
  let [localWorkerData, setLocalWorkerData] = useState([]);
  const [files] = useState([]);
  const radioDecide = ["Yes", "No", "N/A"];
  const radioYesNo = ["Yes", "No"];
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const fileRef = useRef("")

  let [workerData, setworkerData] = useState({
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
    setError({});

    // getting person affected data
    const url = window.location.pathname.split("/");
    const workerNum = url[url.length - 2];
    setWorkerNumber(workerNum);
    let allEffectedPersonData = localStorage.getItem("personEffected");
    let particularEffected = JSON.parse(allEffectedPersonData)[workerNum];
    if (typeof particularEffected !== "undefined") {
      setForm(particularEffected);
    }
    if (
      typeof particularEffected.id !== "undefined" ||
      particularEffected.id != ""
    ) {
      setWorkerId(particularEffected.id);
    }
    // getting person affected data end
    setLocalWorkerData(JSON.parse(localStorage.getItem("personEffected")));
    let investigationData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = investigationData.data.data.results[0];
    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      investigationId.current = allApiData.id;
    }
    await setIsLoading(true);
  };

  const handelTestTaken = async (e) => {
    if (e.target.value == "Yes") {
      setForm({ ...form, isAlcoholDrugTestTaken: e.target.value });
      seTesttaken(true);
    } else if (e.target.value == "No") {
      setForm({
        ...form,
        isAlcoholDrugTestTaken: e.target.value,
      });
      seTesttaken(false);
    }
  };

  const handleFile = async (e) => {
    let acceptFileTypes = ["pdf", "png", "jpeg", "jpg", "xls", "xlsx", "doc", "word", "ppt"]
    let file = e.target.files[0].name.split(".");
    if (acceptFileTypes.includes(file[1]) && e.target.files[0].size < 25670647) {
      const temp = { ...form };
      temp.attachments = e.target.files[0];
      await setForm(temp);
    } else {
      ref.current.value = "";
      await setMessage("Only pdf, png, jpeg, jpg, xls, xlsx, doc, word, ppt File is allowed!");
      await setMessageType("error");
      await setOpen(true);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpenError(false)
      return;
    }
    setOpen(false);
  };

  const handleNext = async () => {
    const { error, isValid } = WorkerDetailValidator(form);
    await setError(error);
    if (Object.keys(error).length === 0) {
      let data = new FormData();
      data.append("name", form.name);
      data.append("workerType", form.workerType);
      data.append("department", form.department);
      data.append("workHours", form.workHours);
      if (form.shiftTimeStart != null) {
        data.append("shiftTimeStart", form.shiftTimeStart);
      } else if (form.shiftTimeStart == null) {
        delete form["shiftTimeStart"];
      }
      data.append("shiftType", form.shiftType);
      data.append("occupation", form.occupation);
      data.append("shiftCycle", form.shiftCycle);
      data.append("noOfDaysIntoShift", form.noOfDaysIntoShift);
      data.append("timeInCompany", form.timeInCompany);
      data.append("timeOnProject", form.timeOnProject);
      data.append("timeInIndustry", form.timeInIndustry);
      if (
        form.attachments !== null &&
        typeof form.attachments !== "undefined"
      ) {
        if (typeof form.attachments !== "string") {
          data.append("attachments", form.attachments);
        }
      } else if (form.attachments == null) {
        delete form["attachments"];
      }
      data.append("eventLeadingToInjury", form.eventLeadingToInjury);
      data.append("injuryObject", form.injuryObject);
      data.append("primaryBodyPartWithSide", form.primaryBodyPartWithSide);
      data.append("secondaryBodyPartWithSide", form.secondaryBodyPartWithSide);
      data.append("typeOfInjury", form.typeOfInjury);
      data.append("NoOfDaysAway", form.NoOfDaysAway);
      data.append("medicalResponseTaken", form.medicalResponseTaken);

      if (form.treatmentDate != null) {
        data.append("treatmentDate", form.treatmentDate);
      } else if (form.shiftTimeStart == null) {
        delete form["treatmentDate"];
      }
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
      if (form.dateOfAlcoholDrugTest != null) {
        data.append("dateOfAlcoholDrugTest", form.dateOfAlcoholDrugTest);
      } else if (form.shiftTimeStart == null) {
        delete form["treatmentDate"];
      }
      data.append("isWorkerClearedTest", form.isWorkerClearedTest);
      data.append("reasonForTestNotDone", form.reasonForTestNotDone);
      data.append("status", form.status);
      data.append("createdBy", form.createdBy);
      data.append("fkInvestigationId", investigationId.current);

      let res = [];
      if (!isNaN(form.id)) {
        form["fkInvestigationId"] = investigationId.current;
        const ress = await api.put(
          `/api/v1/incidents/${putId.current}/investigations/${investigationId.current
          }/workers/${workerid}/`,
          data
        );
        res.push(ress);
      } else {
        form["fkInvestigationId"] = investigationId.current;
        const ress = await api.post(
          `/api/v1/incidents/${putId.current}/investigations/${investigationId.current
          }/workers/`,
          data
        );
        res.push(ress);
      }

      if (res[0].status == 201 || res[0].status == 200) {
        let worker = JSON.parse(localStorage.getItem("personEffected"));
        form["id"] = res[0].data.data.results.id;
        if (
          res[0].data.data.results.attachments !== null &&
          res[0].data.data.results.attachments !== {}
        ) {
          form["attachments"] = res[0].data.data.results.attachments;
        }

        worker[workerNumber] = form;
        await localStorage.setItem("personEffected", JSON.stringify(worker));

        if (typeof worker[parseInt(workerNumber) + 1] !== "undefined") {
          await history.push(
            `/app/incident-management/registration/investigation/worker-details/${parseInt(
              workerNumber
            ) + 1}/${localStorage.getItem("fkincidentId")}`
          );
        } else {
          await history.push(
            `/app/incident-management/registration/investigation/event-details/`
          );
        }
      }

      await handelUpdateCheck();
    }
  };

  const handelAddNew = async () => {
    const { error, isValid } = WorkerDetailValidator(form);
    await setError(error);
    if (form.name !== "" && form.workerType !== "" && form.department !== "") {
      let worker = JSON.parse(localStorage.getItem("personEffected"));
      await worker.splice(parseInt(workerNumber) + 1, 0, workerData);
      await localStorage.setItem("personEffected", JSON.stringify(worker));
      await handleNext();
    }
    fileRef.current.value !== undefined ? fileRef.current.value = "" : null
  };

  const handelPrevious = async () => {
    let worker = JSON.parse(localStorage.getItem("personEffected"));
    if (typeof worker[parseInt(workerNumber) - 1] !== "undefined") {
      await history.push(
        `/app/incident-management/registration/investigation/worker-details/${parseInt(
          workerNumber
        ) - 1}/${localStorage.getItem("fkincidentId")}`
      );
    } else {
      await history.push(
        `/app/incident-management/registration/investigation/severity-consequences/`
      );
    }
    await handelUpdateCheck();
  };

  const handelRemove = async () => {
    let worker_removed = JSON.parse(localStorage.getItem("personEffected"));
    if (!isNaN(worker_removed[workerNumber].id)) {
      let deleteWorkerNumber = worker_removed[workerNumber];
      const deleteWorker = await api.delete(
        `api/v1/incidents/859/investigations/${deleteWorkerNumber.fkInvestigationId
        }/workers/${deleteWorkerNumber.id}/`
      );
    }
    await worker_removed.splice(workerNumber, 1);
    await localStorage.setItem(
      "personEffected",
      JSON.stringify(worker_removed)
    );
    if (typeof worker_removed[parseInt(workerNumber - 1)] !== "undefined") {
      await history.push(
        `/app/incident-management/registration/investigation/worker-details/${parseInt(
          workerNumber - 1
        )}/${localStorage.getItem("fkincidentId")}`
      );
    } else if (
      typeof worker_removed[parseInt(workerNumber + 1)] !== "undefined"
    ) {
      await history.push(
        `/app/incident-management/registration/investigation/worker-details/${parseInt(
          workerNumber + 1
        )}/${localStorage.getItem("fkincidentId")}`
      );
    } else if (typeof worker_removed[parseInt(0)] !== "undefined") {
      await history.push(
        `/app/incident-management/registration/investigation/worker-details/${parseInt(
          0
        )}/${localStorage.getItem("fkincidentId")}`
      );
    } else {
      await history.push(
        `/app/incident-management/registration/investigation/event-details/`
      );
    }
    await handelUpdateCheck();
  };

  const handelWorkerNavigate = async (e, index) => {
    await history.push(
      `/app/incident-management/registration/investigation/worker-details/${parseInt(
        index
      )}/${localStorage.getItem("fkincidentId")}`
    );
    await handelUpdateCheck();
  };

  const handelFileName = () => {
    setTimeout(function () {
      document.getElementById("selectFile").defaultValue
      // document.getElementById("selectFile").style.color = "transparent"
      // fileRef.current.value !== undefined ? fileRef.current.value = "" : null
    }, 1000)
  }

  const PickList = async () => {
    await handelUpdateCheck();
    workerType.current = await PickListData(71);
    setDepartmentName(await PickListData(10));
    setworkHours(await PickListData(70));
    setShiftType(await PickListData(47));
    setOccupation(await PickListData(48));
    setShiftCycle(await PickListData(49));
    setNoOfDaysIntoShift(await PickListData(50));
    setTimeInCompany(await PickListData(51));
    setTimeOnProject(await PickListData(52));
    setTimeInIndustry(await PickListData(53));
    setPrimaryBodyPartWithSide(await PickListData(57));
    setSecondaryBodyPartWithSide(await PickListData(58));
    setTypeOfInjury(await PickListData(59));
    setHigherMedicalResponder(await PickListData(60));
    setTreatmentType(await PickListData(61));
    setMechanismOfInjury(await PickListData(62));
    setSupervisorTimeInIndustry(await PickListData(54));
    setSupervisorTimeOnProject(await PickListData(55));
    setSupervisorTimeInCompany(await PickListData(56));
    await setIsLoading(true);
    await handelFileName()
  };

  const imageNameFromUrl = (url) => {
    let imageArray = url.split("/");
    let image_name = imageArray[imageArray.length - 1];
    return image_name;
  };

  useEffect(() => {
    PickList();
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Worker details" icon="ion-md-list-box">
      {isLoading ? (
        <form>
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
              {/* worker type */}
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
                    {departmentName.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                  {error && error.department && (
                    <FormHelperText>{error.department}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* scheduled workign hours */}
              <Grid item md={6}>
                <FormControl
                  variant="outlined"
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
                    {workHours.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* start of shift */}
              <Grid item md={6}>
                <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    className={classes.formControl}
                    helperText={""}
                    value={form.shiftTimeStart}
                    label="Start of shift time"
                    value={form.shiftTimeStart}
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
                    {shiftType.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Occupation */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {occupation.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Shift cycle */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {shiftCycle.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* number of days */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {noOfDaysIntoShift.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* time in comapany */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {timeInCompany.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* time on project */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {timeOnProject.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* time in industry */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {timeInIndustry.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* injury     */}
              <Grid item md={12}>
                <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                  <Typography variant="h6">Injury details</Typography>
                </Box>
              </Grid>

              {/* event leading to injury */}
              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Event leading to injury"
                  className={classes.formControl}
                  value={form.eventLeadingToInjury}
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
                  error={error && error.injuryObject}
                  helperText={error && error.injuryObject}
                  className={classes.formControl}
                  value={form.injuryObject}
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
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {primaryBodyPartWithSide.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* secondary body part */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {secondaryBodyPartWithSide.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* type of injury */}
              <Grid item md={6}>
                <FormControl
                  variant="outlined"
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
                    {typeOfInjury.map((value) => (
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
                  label="Number of days away/on restriction"
                  value={form.NoOfDaysAway}
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
                  label="Medical response taken"
                  value={form.medicalResponseTaken}
                  error={error && error.medicalResponseTaken}
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
                    value={!form.treatmentDate ? null : form.treatmentDate}
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
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {higherMedicalResponder.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* status update    */}
              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Status update"
                  value={form.injuryStatus}
                  error={error && error.injuryStatus}
                  helperText={error && error.injuryStatus}
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      injuryStatus: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* first aid */}
              <Grid item md={6}>
                <FormControl
                  variant="outlined"
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
                    {treatmentType.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* mechanish of injury */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {mechanismOfInjury.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                  <Typography variant="h6">Worker care</Typography>
                </Box>
              </Grid>

              {/* medical issues */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" required>Medical issued?</FormLabel>
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

              {/* prescription issue */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" required>Prescription issues ?</FormLabel>
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

              {/* non prescription */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" required>Non-prescription ?</FormLabel>
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

              {/* any limitation */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend" required>Any limitation ?</FormLabel>
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
                  <Typography variant="h6">Alcohol and drug test</Typography>
                </Box>
              </Grid>

              {/* test taken */}
              <Grid item md={12}>
                <FormControl component="fieldset" required>
                  <FormLabel component="legend" >Was the test taken?</FormLabel>
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
              {form.isAlcoholDrugTestTaken == "Yes" ? (
                <>
                  <Grid item md={6}>
                    <MuiPickersUtilsProvider
                      variant="outlined"
                      utils={DateFnsUtils}
                    >
                      <KeyboardDatePicker
                        className={classes.formControl}
                        value={form.dateOfAlcoholDrugTest != null ? form.dateOfAlcoholDrugTest : null}
                        label="Date of Test"
                        onChange={(e) => {
                          setForm({
                            ...form,
                            dateOfAlcoholDrugTest: moment(e).toISOString(),
                          });
                        }}
                        format="yyyy/MM/dd"
                        inputVariant="outlined"
                        disableFuture="true"
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>

                  <Grid item md={6}>
                    {/* <p>Was worker cleared to work following A&D testing?</p> */}
                    <FormControl component="fieldset">
                      <FormLabel component="legend" required>
                        Was worker cleared to work following a&d testing?
                      </FormLabel>
                      <RadioGroup
                        className={classes.inlineRadioGroup}
                        value={form.isWorkerClearedTest}
                        required
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
                    error={error && error.reasonForTestNotDone}
                    helperText={error && error.reasonForTestNotDone}
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

              {/* supervisor name */}
              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Supervisor name"
                  error={error && error.supervisorName}
                  helperText={error && error.supervisorName}
                  value={form.supervisorName}
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorName: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* supervisor time */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    Supervisor time in Industry
                  </InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Supervisor time in industry"
                    value={form.supervisorTimeInIndustry}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        supervisorTimeInIndustry: e.target.value,
                      });
                    }}
                  >
                    {supervisorTimeInIndustry.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* supervisor time */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {supervisorTimeInCompany.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* supervisor time in industry */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
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
                    {supervisorTimeOnProject.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                  <Typography variant="h6">Attachment</Typography>
                </Box>
              </Grid>


              <Grid item md={4}>
                <small>Allowed file types pdf, png, jpeg, jpg, xls, xlsx, doc, word, ppt</small>
                <br></br>
                <small>Files less than 25 Mb file only allowed</small>
                <input
                  id="selectFile"
                  type="file"
                  className={classes.fullWidth}
                  name="file"
                  // ref={fileRef}
                  loaded={(e) => handelFileName(e)}
                  accept=".pdf, .png, .jpeg, .jpg,.xls,.xlsx, .doc, .word, .ppt"
                  style={{ color: typeof (form.attachments) === "string" && "transparent" }}
                  onChange={(e) => {
                    handleFile(e);
                  }}
                />

              </Grid>

              <Grid item md={6}>
                {form.attachments != "" && typeof form.attachments == "string" ? (
                  <Attachment value={form.attachments} />
                ) : (
                  <p />
                )}
              </Grid>

              {localWorkerData.length > 1 ? (
                <Grid item md={12}>
                  <Button onClick={(e) => handelRemove()}>
                    Delete <DeleteForeverIcon />
                  </Button>
                </Grid>
              ) : null}

              <Grid item md={12}>
                <Button onClick={(e) => handelAddNew()}>
                  Add new worker <AddIcon />
                </Button>
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
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <Grid item md={12}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={INVESTIGATION_FORM}
                  selectedItem="Worker details"
                />
              </Grid>
              <Grid item md={12}>
                <Box mt={4}>
                  <Paper elevation={1}>
                    <List dense>
                      {localWorkerData.map((value, index) => (
                        <ListItem
                          className={
                            workerNumber == index
                              ? classes.activeList
                              : classes.notActiveList
                          }
                        >
                          <ListItemIcon className={classes.icon}>
                            {workerNumber == index ? (
                              <DoubleArrowIcon fontSize="small" />
                            ) : (
                              <RemoveCircleOutlineIcon />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <a onClick={(e) => handelWorkerNavigate(e, index)}>
                                {`Worker ${index + 1}`}
                              </a>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Box>
              </Grid>
            </Grid>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert onClose={handleClose} severity={messageType}>
                {message}
              </Alert>
            </Snackbar>
          </Grid>
        </form>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default WorkerDetails;
