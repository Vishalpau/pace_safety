import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";
import {
  // TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import moment from "moment";
import { PapperBlock } from "dan-components";
import { func } from "prop-types";
import { useHistory, useParams } from "react-router";
import FormSideBar from "../FormSideBar";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import validate from "../../Validator/validation";
import api from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));
const IncidentDetails = () => {
  // Props definations.
  const classes = useStyles();
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [error, setError] = useState({});
  const selectValues = [1, 2, 3, 4];
  const companyName = ["ABC Ltd", "XYZ steel", "ABA power", "XDA works"];
  const [incidentsListData, setIncidentsListdata] = useState({
    incidentOccuredOn: null,
  });
  const [incidentTypeValue, setIncidentTypeValue] = useState([]);
  const [contractorValue, setContractorValue] = useState([]);
  const [subContractorValue, setSubContractorValue] = useState([]);
  const [personAffectedValue, setPersonAffectedValue] = useState([]);
  const [propertiesAffectValue, setPropertiesAffectValue] = useState([]);
  const [eqiptmentAffectValue, setEquipmentAffectValue] = useState([]);
  const [environmentAffectValue, setEnvironmentAffectValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [hideAffect, setHideAffect] = useState([]);
  const [nextPath, setNextPath] = useState({
    personAffect: "",
    propertyAffect: "",
    equipmentAffect: "",
    environmentAffect: "",
  });

  const [clearedDate, setClearData] = useState(null);

  // Initial forms.
  const [form, setForm] = useState({
    projectname: "",
    unitname: "",
    incidenttype: "",
    incidentdate: null,
    incidenttime: null,
    title: "",
    description: "",
    immediateactiontaken: "",
    location: "",
    contractor: "",
    subcontractor: "",
    personaffected: "",
    propertyaffected: "",
    equiptmenteffected: "",
    environmentaffected: "",
  });

  // Function called on next button click.
  const handelNext = async (e) => {
    // Create case if id is not null and means it is an update case.
    if (id) {
      // Set next path.
      const tempNextPath = nextPath;
      tempNextPath.propertyAffect =
        nextPath.propertyAffect || incidentsListData.isPropertyDamaged;
      tempNextPath.personAffect =
        nextPath.personAffect || incidentsListData.isPersonAffected;
      tempNextPath.equipmentAffect =
        nextPath.equipmentAffect || incidentsListData.isEquipmentDamaged;
      tempNextPath.environmentAffect =
        nextPath.environmentAffect || incidentsListData.isEnviromentalImpacted;
      await setNextPath(tempNextPath);

      // Setup initial form.
      // We are taking either form's default values or values returned from the API.

      // TODO: Unable to find fkProjectID, fkUnitId, IncidentTypeValue.
      const tempForm = form;
      tempForm.projectname = form.projectname || incidentsListData.fkProjectId;
      tempForm.unitname = form.unitname || incidentsListData.fkUnitId;
      tempForm.incidenttype =
        form.incidenttype || incidentsListData.incidentTypeValue;
      tempForm.incidentdate =
        form.incidentdate || incidentsListData.incidentOccuredOn;
      tempForm.incidenttime =
        form.incidenttime || incidentsListData.incidentReportedOn;
      tempForm.title = form.title || incidentsListData.incidentTitle;
      tempForm.description =
        form.description || incidentsListData.incidentDetails;
      tempForm.immediateactiontaken =
        form.immediateactiontaken || incidentsListData.immediateActionsTaken;
      tempForm.location = form.location || incidentsListData.incidentLocation;
      tempForm.contractor = form.contractor || incidentsListData.contractor;
      tempForm.subcontractor =
        form.subcontractor || incidentsListData.subContractor;
      tempForm.personaffected =
        form.personaffected || incidentsListData.isPersonAffected;
      tempForm.propertyaffected =
        form.propertyaffected || incidentsListData.isPropertyDamaged;
      tempForm.equiptmenteffected =
        form.equiptmenteffected || incidentsListData.isEquipmentDamaged;
      tempForm.environmentaffected =
        form.environmentaffected || incidentsListData.isEnviromentalImpacted;

      await setForm(tempForm);

      // Validate the form for the validation errors before hitting it for the submit.
      // TODO: Validations are not working for update.
      // const { error, isValid } = validate(tempForm);
      // setError(error);

      // Stop the execution of the function as, now form is not valid.
      // if (!isValid) {
      //   return;
      // }

      const formData = {
        id: parseInt(id),
        fkCompanyId: 0,
        fkProjectId: 0,
        fkPhaseId: 0,
        fkUnitId: 0,
        incidentNumber: form.incidenttype,
        incidentTitle: form.title,
        incidentDetails: form.description,
        immediateActionsTaken: "jdf",
        incidentOccuredOn: null,
        isPersonAffected: form.personaffected,
        isPersonDetailsAvailable: incidentsListData.isPersonDetailsAvailable,
        personAffectedComments: incidentsListData.personAffectedComments,
        isPropertyDamaged: form.propertyaffected,
        isPropertyDamagedAvailable:
          incidentsListData.isPropertyDamagedAvailable,
        propertyDamagedComments: incidentsListData.propertyDamagedComments,
        isEquipmentDamaged: form.equiptmenteffected,
        isEquipmentDamagedAvailable:
          incidentsListData.isEquipmentDamagedAvailable,
        equipmentDamagedComments: incidentsListData.equipmentDamagedComments,
        isEnviromentalImpacted: form.environmentaffected,
        enviromentalImpactComments:
          incidentsListData.enviromentalImpactComments,
        supervisorByName: incidentsListData.supervisorByName,
        supervisorById: incidentsListData.supervisorById,
        incidentReportedOn: incidentsListData.incidentReportedOn,
        incidentReportedByName: incidentsListData.incidentReportedByName,
        incidentReportedById: incidentsListData.incidentReportedById,
        reasonLateReporting: incidentsListData.reasonLateReporting,
        notificationComments: incidentsListData.notificationComments,
        reviewedBy: incidentsListData.reviewedBy,
        reviewDate: incidentsListData.reviewDate,
        closedBy: incidentsListData.closedBy,
        closeDate: incidentsListData.closeDate,
        status: incidentsListData.status,
        incidentLocation: form.location,
        latitude: null,
        longitude: null,
        createdAt: moment(new Date()).toISOString(),
        updatedAt: moment(new Date()).toISOString(),
        assignTo: incidentsListData.assignTo,
        createdBy: incidentsListData.createdBy,
        updatedBy: "0",
        source: "Web",
        vendor: "string",
        vendorReferenceId: "string",
        contractor: form.contractor,
        subContractor: form.subcontractor,
      };

      // Hit put request to backend as it is the update case.
      const res = await api.put(`/api/v1/incidents/${id}/`, formData);
      console.log("===> Incident update response > ", res);

      // If we received the success from the API then.
      if (res.status === 200) {
        const fkincidentId = res.data.data.results.id;

        // Set the fkincidentId and it will be used for future reference forms.
        localStorage.setItem("fkincidentId", fkincidentId);
        localStorage.setItem("deleteForm", JSON.stringify(hideAffect));

        // Next path variable contains JSON as below. It helps us to decide on which path to move next.
        /*
          {"personAffect":"Yes","propertyAffect":"Yes","equipmentAffect":"Yes","environmentAffect":"Yes"}
        */
        localStorage.setItem("nextPath", JSON.stringify(nextPath));

        // Decide on which path to go next.
        if (nextPath.personAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/peoples-afftected/${id}`
          );
        } else if (nextPath.propertyAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/property-Affected/${id}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/eqiptment-Affected/${id}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/property-Affected/${id}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/eqiptment-Affected/${id}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-Affected/${id}`
          );
        } else {
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
          );
        }
      }
    } else {
      // Create case if id is not null and means it is an add new registration case.
      const { error, isValid } = validate(form);
      setError(error);

      if (isValid === true) {
        const formData = {
          fkCompanyId: 1,
          fkProjectId: 1,
          fkPhaseId: 1,
          fkUnitId: 1,
          incidentNumber: form.incidenttype,
          incidentTitle: form.title,
          incidentDetails: form.description,
          immediateActionsTaken: form.immediateactiontaken,
          incidentOccuredOn: null,
          isPersonAffected: form.personaffected,
          isPersonDetailsAvailable: "No",
          personAffectedComments: "string",
          isPropertyDamaged: form.propertyaffected,
          isPropertyDamagedAvailable: "No",
          propertyDamagedComments: "string",
          isEquipmentDamaged: form.equiptmenteffected,
          isEquipmentDamagedAvailable: "No",
          equipmentDamagedComments: "string",
          isEnviromentalImpacted: form.environmentaffected,
          enviromentalImpactComments: "string",
          supervisorByName: "string",
          supervisorById: 0,
          incidentReportedOn: moment(form.incidentdate).toISOString(),
          incidentReportedByName: "string",
          incidentReportedById: 0,
          reasonLateReporting: "string",
          notificationComments: "string",
          reviewedBy: 0,
          reviewDate: "2021-06-17T01:02:49.099Z",
          closedBy: 0,
          closeDate: "2021-06-17T01:02:49.099Z",
          status: "Active",
          incidentLocation: form.location,
          assignTo: 0,
          createdBy: 0,
          updatedBy: 0,
          source: "Web",
          vendor: "string",
          vendorReferenceId: "string",
          contractor: form.contractor,
          subContractor: form.subcontractor,
        };
        // sent post api
        const res = await api.post("/api/v1/incidents/", formData);
        console.log(res);
        if (res.status === 201) {
          const fkincidentId = res.data.data.results.id;
          localStorage.setItem("fkincidentId", fkincidentId);
          localStorage.setItem("deleteForm", JSON.stringify(hideAffect));
          localStorage.setItem("nextPath", JSON.stringify(nextPath));

          if (nextPath.personAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/peoples-afftected/"
            );
          } else if (nextPath.propertyAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/property-Affected/"
            );
          } else if (nextPath.equipmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/eqiptment-Affected/"
            );
          } else if (nextPath.environmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/environment-Affected/"
            );
          } else {
            history.push(
              "/app/incident-management/registration/initial-notification/reporting-and-notification/"
            );
          }
        }
      }
    }
  };

  const handelTimeChange = (date) => {
    console.log(date);
    const onlyTime = moment(date).format("HH:mm");
    setForm({
      ...form,
      incidenttime: onlyTime,
    });
    setSelectedTime(date);
  };
  const fetchIncidentTypeValue = async () => {
    const res = await api.get("api/v1/lists/1/value");
    const result = res.data.data.results;
    await setIncidentTypeValue(result);
  };
  const fetchContractorValue = async () => {
    const res = await api.get("api/v1/lists/2/value");
    const result = res.data.data.results;
    await setContractorValue(result);
  };
  const fetchSubContractorValue = async () => {
    const res = await api.get("api/v1/lists/3/value");
    const result = res.data.data.results;
    await setSubContractorValue(result);
  };
  const fetchPersonAffectValue = async () => {
    const res = await api.get("api/v1/lists/4/value");
    const result = res.data.data.results;
    await setPersonAffectedValue(result);
  };
  const fetchPropertiesValue = async () => {
    const res = await api.get("api/v1/lists/5/value");
    const result = res.data.data.results;
    await setPropertiesAffectValue(result);
  };

  const fetchEquipmentAffectValue = async () => {
    const res = await api.get("api/v1/lists/6/value");
    const result = res.data.data.results;
    await setEquipmentAffectValue(result);
  };
  const fetchEnviornmentAffectValue = async () => {
    const res = await api.get("api/v1/lists/7/value");
    const result = res.data.data.results;
    await setEnvironmentAffectValue(result);
  };
  const fetchListData = async () => {
    const res = await api.get("api/v1/lists/");

    const result = res.data.data.results;
    await setListData(result);
  };

  const fetchIncidentsData = async () => {
    if (id === undefined) {
      await setIsLoading(true);
    } else {
      const res = await api.get(`/api/v1/incidents/${id}/`);
      const result = res.data.data.results;
      await setIncidentsListdata(result);
      const resTime = new Date(result.incidentOccuredOn);
      await setForm({ ...form, incidentdate: resTime });
      await setIsLoading(true);
    }
  };

  const handleHideAffect = (e, name, key) => {
    console.log("set hide affecct", hideAffect);
    if (e !== "Yes") {
      setHideAffect([...hideAffect, name]);
    } else {
      const newHideAffect = hideAffect.filter((item) => item !== name);

      setHideAffect(newHideAffect);
    }
  };

  useEffect(() => {
    localStorage.removeItem("deleteForm");
    localStorage.removeItem("nextPath");
    console.log(nextPath);
    fetchListData();
    fetchContractorValue();
    fetchIncidentTypeValue();
    fetchSubContractorValue();
    fetchPersonAffectValue();
    fetchPropertiesValue();
    fetchEquipmentAffectValue();
    fetchEnviornmentAffectValue();
    fetchIncidentsData();
    // if(!id){
    //   setIsLoading(true)
    // }
    console.log(hideAffect);
  }, []);

  return (
    <PapperBlock icon="ion-md-list-box" title="Initial Notification">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item xs={12} md={9} spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl
                error={error.projectname}
                required
                variant="outlined"
                className={classes.formControl}
              >
                {/* <Typography varint="p">Project Name</Typography> */}
                <InputLabel id="project-name-label">Project Name</InputLabel>
                <Select
                  id="project-name"
                  labelId="project-name-label"
                  label="Project Name"
                  defaultValue={incidentsListData.fkProjectId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      projectname: e.target.value,
                    });
                  }}
                >
                  {companyName.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
                {error && error.projectname && (
                  <FormHelperText>{error.projectname}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="unit-name-label">Unit Name</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Unit Name"
                  defaultValue={incidentsListData.fkUnitId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      unitname: toString(e.target.value),
                    });
                  }}
                >
                  {selectValues.map((selectValues) => (
                    <MenuItem value={selectValues}>{selectValues}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                error={error.incidenttype}
                variant="outlined"
                required
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Incident Type
                </InputLabel>
                <Select
                  labelId="incident-type-label"
                  id="incident-type"
                  label="Incident Type"
                  defaultValue={incidentsListData.incidentNumber}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      incidenttype: toString(e.target.value),
                    });
                  }}
                >
                  {incidentTypeValue.length !== 0
                    ? incidentTypeValue.map((selectValues, index) => (
                        <MenuItem key={index} value={selectValues.inputValue}>
                          {selectValues.inputLabel}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {error && error.incidenttype && (
                  <FormHelperText>{error.incidenttype}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
                <KeyboardDatePicker
                  error={error.incidentdate}
                  required
                  className={classes.formControl}
                  label="Incident Date"
                  helperText={error.incidentdate ? error.incidentdate : null}
                  value={
                    form.incidentdate || incidentsListData.incidentOccuredOn
                  }
                  onChange={(e) => {
                    console.log(e);
                    setForm({
                      ...form,
                      incidentdate: moment(e).toDate(),
                    });
                  }}
                  format="yyyy/MM/dd"
                  inputVariant="outlined"
                />
              </MuiPickersUtilsProvider>
              {/* {error && error.incidentdate && <p>{error.incidentdate}</p>} */}
            </Grid>

            <Grid item xs={12} md={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardTimePicker
                  required
                  error={error.incidenttime}
                  inputVariant="outlined"
                  helperText={error.incidentdate ? error.incidenttime : null}
                  className={classes.formControl}
                  id="time-picker"
                  label="Incident Time"
                  value={
                    form.incidenttime === null
                      ? new Date(clearedDate)
                      : new Date(selectedTime)
                  }
                  onChange={(e) => {
                    console.log(e);
                    setForm({
                      ...form,
                      incidenttime: moment(e).format("HH:mm"),
                    });
                    setSelectedTime(e);
                  }}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                  format="HH:mm"
                />
              </MuiPickersUtilsProvider>
              {/* {error && error.incidentdate && <p>{error.incidentdate}</p>} */}
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                required
                id="title"
                error={error.title}
                variant="outlined"
                label="Title"
                className={classes.fullWidth}
                defaultValue={incidentsListData.incidentTitle}
                helperText={error.title ? error.title : ""}
                onChange={(e) => {
                  setForm({
                    ...form,
                    title: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                error={error.description}
                multiline
                required
                variant="outlined"
                rows="4"
                id="description"
                label="Description"
                defaultValue={incidentsListData.incidentDetails}
                className={classes.fullWidth}
                helperText={error.description && error.description}
                onChange={(e) => {
                  setForm({
                    ...form,
                    description: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                id="immediate-actions"
                multiline
                rows="4"
                label="Any Immediate Actions Taken"
                defaultValue={incidentsListData.incidentLocation}
                className={classes.fullWidth}
                onChange={(e) => {
                  setForm({
                    ...form,
                    immediateactiontaken: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="title"
                error={error.title}
                required
                variant="outlined"
                label="Location"
                helperText={error.location ? error.location : ""}
                className={classes.fullWidth}
                defaultValue={incidentsListData.incidentLocation}
                onChange={(e) => {
                  setForm({
                    ...form,
                    location: e.target.value,
                  });
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                error={error.contractor}
                required
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Contractor
                </InputLabel>
                <Select
                  labelId="contractor-type-label"
                  id="contractor"
                  label="Contractor"
                  defaultValue={incidentsListData.contractor}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      contractor: e.target.value,
                    });
                  }}
                >
                  {contractorValue.length !== 0
                    ? contractorValue.map((selectValues, index) => (
                        <MenuItem key={index} value={selectValues.inputValue}>
                          {selectValues.inputLabel}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {error && error.contractor && (
                  <FormHelperText>{error.contractor}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl
                variant="outlined"
                error={error.subcontractor}
                required
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Sub-Contractor
                </InputLabel>
                <Select
                  labelId="sub-contractor-type-label"
                  id="sub-contractor"
                  label="Sub-Contractor"
                  defaultValue={incidentsListData.subContractor}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      subcontractor: e.target.value,
                    });
                  }}
                >
                  {subContractorValue.length !== 0
                    ? subContractorValue.map((selectValues, index) => (
                        <MenuItem key={index} value={selectValues.inputValue}>
                          {selectValues.inputLabel}
                        </MenuItem>
                      ))
                    : null}
                </Select>
                {error && error.subcontractor && (
                  <FormHelperText>{error.subcontractor}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Were Any Person Affected During the Incident ?
                  </FormLabel>

                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="personaffected"
                    name="personaffected"
                    defaultValue={incidentsListData.isPersonAffected}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        personaffected: e.target.value,
                      });
                      handleHideAffect(
                        e.target.value,
                        "Peoples Affected",
                        "personAffect"
                      );
                      setNextPath({
                        ...nextPath,
                        personAffect: e.target.value,
                      });
                    }}
                  >
                    {personAffectedValue.length !== 0
                      ? personAffectedValue.map((value, index) => (
                          <FormControlLabel
                            key={index}
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  Was Any Property Damaged During the Incident ?
                </FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="propertyaffected"
                  name="propertyaffected"
                  defaultValue={incidentsListData.isPropertyDamaged}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      propertyaffected: e.target.value,
                    });
                    handleHideAffect(
                      e.target.value,
                      "Property Affected",
                      "propertyAffect"
                    );
                    setNextPath({
                      ...nextPath,
                      propertyAffect: e.target.value,
                    });
                  }}
                >
                  {propertiesAffectValue.length !== 0
                    ? propertiesAffectValue.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value.inputValue}
                          control={<Radio />}
                          label={value.inputLabel}
                        />
                      ))
                    : null}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Was There Any Equipment Damaged ?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="equiptmenteffected"
                    name="equiptmenteffected"
                    defaultValue={incidentsListData.isEquipmentDamaged}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        equiptmenteffected: e.target.value,
                      });
                      handleHideAffect(
                        e.target.value,
                        "Equipment Affected",
                        "equipmentAffect"
                      );
                      setNextPath({
                        ...nextPath,
                        equipmentAffect: e.target.value,
                      });
                    }}
                  >
                    {eqiptmentAffectValue.length !== 0
                      ? eqiptmentAffectValue.map((value, index) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                equiptmenteffected: e.target.value,
                              });
                            }}
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>
              </div>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">
                  Was There Any Environment Impact ?
                </FormLabel>
                <RadioGroup
                  aria-label="environmentaffected"
                  name="environmentaffected"
                  className={classes.inlineRadioGroup}
                  defaultValue={incidentsListData.isEnviromentalImpacted}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      environmentaffected: e.target.value,
                    });
                    handleHideAffect(
                      e.target.value,
                      "Environment Affected",
                      "environmentAffect"
                    );
                    setNextPath({
                      ...nextPath,
                      environmentAffect: e.target.value,
                    });
                  }}
                >
                  {environmentAffectValue.length !== 0
                    ? environmentAffectValue.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value.inputValue}
                          control={<Radio />}
                          label={value.inputLabel}
                          onChange={(e) => {
                            setForm({
                              ...form,
                              environmentaffected: e.target.value,
                            });
                          }}
                        />
                      ))
                    : null}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Box marginTop={4}>
                <Button
                  type="button"
                  size="medium"
                  variant="contained"
                  color="primary"
                  onClick={(e) => handelNext(e)}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormSideBar
              deleteForm={hideAffect}
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="Incident details"
            />
          </Grid>
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </PapperBlock>
  );
};
export default IncidentDetails;
