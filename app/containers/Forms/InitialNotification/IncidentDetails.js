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
  KeyboardDateTimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import IconButton from "@material-ui/core/IconButton";
// import Icon from "@material-ui/core/Icon";
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
    projectname: 0,
    unitname: 0,
    incidenttype: "",
    incidentdate: null,
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

  // handle date
  const handledate = async (e) => {
    await setForm({ ...form, incidentdate: moment(e).toISOString() });
  };
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
        fkCompanyId: incidentsListData.fkCompanyId || 1,
        fkProjectId: incidentsListData.fkProjectId || 1,
        fkPhaseId: incidentsListData.fkPhaseId || 1,
        fkUnitId: incidentsListData.fkUnitId || 1,
        incidentNumber: incidentsListData.incidentNumber,
        incidentType: form.incidenttype,
        incidentTitle: form.title,
        incidentDetails: form.description,
        immediateActionsTaken:
          form.immediateactiontaken || incidentsListData.immediateActionsTaken,
        incidentOccuredOn: form.incidentdate,
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
            `/app/incident-management/registration/initial-notification/property-affected/${id}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/equipment-affected/${id}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/property-affected/${id}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/equipment-affected/${id}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-affected/${id}`
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
      await setError(error);
      console.log(error, isValid);

      if (isValid === true) {
        const formData = {
          fkCompanyId: 1,
          fkProjectId: parseInt(form.projectname),
          fkPhaseId: 1,
          fkUnitId: parseInt(form.unitname),
          incidentNumber: "",
          incidentType: form.incidenttype,
          incidentTitle: form.title,
          incidentDetails: form.description,
          immediateActionsTaken: form.immediateactiontaken,
          incidentOccuredOn: form.incidentdate,
          isPersonAffected: form.personaffected,
          isPersonDetailsAvailable: "No",
          personAffectedComments: "",
          isPropertyDamaged: form.propertyaffected,
          isPropertyDamagedAvailable: "No",
          propertyDamagedComments: "",
          isEquipmentDamaged: form.equiptmenteffected,
          isEquipmentDamagedAvailable: "No",
          equipmentDamagedComments: "",
          isEnviromentalImpacted: form.environmentaffected,
          enviromentalImpactComments: "",
          supervisorByName: "",
          supervisorById: 0,
          incidentReportedOn: new Date().toISOString(),
          incidentReportedByName: "Vani",
          incidentReportedById: 0,
          reasonLateReporting: "",
          notificationComments: "",
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
        if (res.status === 201) {
          const fkincidentId = res.data.data.results.id;
          localStorage.setItem("fkincidentId", fkincidentId);
          localStorage.setItem("deleteForm", JSON.stringify(hideAffect));
          localStorage.setItem("nextPath", JSON.stringify(nextPath));

                  // Decide on which path to go next.
        if (nextPath.personAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/peoples-afftected/${fkincidentId}`
          );
        } else if (nextPath.propertyAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/property-affected/${fkincidentId}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/equipment-affected/${fkincidentId}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/property-affected/${fkincidentId}`
          );
        } else if (nextPath.equipmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/equipment-affected/${fkincidentId}`
          );
        } else if (nextPath.environmentAffect === "Yes") {
          history.push(
            `/app/incident-management/registration/initial-notification/environment-affected/${fkincidentId}`
          );
        } else {
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${fkincidentId}`
          );
        }
        }
      }
    }
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
  // const fetchListData = async () => {
  //   const res = await api.get("api/v1/lists/");

  //   const result = res.data.data.results;
  //   await setListData(result);
  // };

  const fetchIncidentsData = async () => {
    if (id === undefined) {
      await setIsLoading(true);
    } else {
      const res = await api.get(`/api/v1/incidents/${id}/`);
      const result = res.data.data.results;
      await setIncidentsListdata(result);
      const resTime = new Date(result.incidentOccuredOn);
      form.incidentDate = result.incidentOccuredOn;
      form.incidenttype = result.incidentType;
      if(result.isEnviromentalImpacted !=="Yes"){
        hideAffect.push("Environment affected");
      }
      if(result.isEquipmentDamaged !=="Yes"){
        hideAffect.push("Equipment affected");
      }
      if(result.isPropertyDamaged !=="Yes"){
        hideAffect.push("Property affected");
      }
      if(result.isPersonAffected !=="Yes"){
        hideAffect.push("People affected");
      }
      await setIsLoading(true);
    }
  };

  const handleHideAffect = (e, name, key) => {
    if (e !== "Yes") {
      setHideAffect([...hideAffect, name]);
    } else {
      const newHideAffect = hideAffect.filter((item) => item !== name);

      setHideAffect(newHideAffect);
    }
  };

  useEffect(() => {
    // fetchListData();
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
                <InputLabel id="project-name-label">Project name</InputLabel>
                <Select
                  id="project-name"
                  labelId="project-name-label"
                  label="Project name"
                  defaultValue={incidentsListData.fkProjectId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      projectname: e.target.value,
                    });
                  }}
                >
                  {companyName.map((selectValues, key) => (
                    <MenuItem key={key} value={key + 1}>
                      {selectValues}
                    </MenuItem>
                  ))}
                </Select>
                {console.log(error)}
                {error && error.projectname && (
                  <FormHelperText>{error.projectname}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="unit-name-label">Unit name</InputLabel>
                <Select
                  labelId="unit-name-label"
                  id="unit-name"
                  label="Unit name"
                  defaultValue={incidentsListData.fkUnitId}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      unitname: e.target.value.toString(),
                    });
                  }}
                >
                  {selectValues.map((selectValues, key) => (
                    <MenuItem key={key} value={selectValues}>
                      {selectValues}
                    </MenuItem>
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
                  Incident type
                </InputLabel>
                <Select
                  labelId="incident-type-label"
                  id="incident-type"
                  label="Incident type"
                  defaultValue={incidentsListData.incidentType}
                  onChange={(e) => {
                    setForm({ ...form, incidenttype: e.target.value });
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
                <KeyboardDateTimePicker
                  error={error.incidentdate}
                  disableFuture
                  className={classes.formControl}
                  label="Incident date & time"
                  helperText={error.incidentdate ? error.incidentdate : null}
                  value={
                    form.incidentdate || incidentsListData.incidentOccuredOn
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      incidentdate: moment(e).toISOString(),
                    });
                  }}
                  format="yyyy/MM/dd HH:mm"
                  inputVariant="outlined"
                  disableFuture='true'
                
                />
              </MuiPickersUtilsProvider>
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
              {/* {error && error.title && <FormHelperText>{error.title}</FormHelperText>} */}
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                error={error.description}
                multiline
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
              {/* {error && error.description && <p>{error.description}</p>} */}
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                variant="outlined"
                id="immediate-actions"
                multiline
                rows="4"
                label="Any immediate actions taken"
                defaultValue={incidentsListData.immediateActionsTaken}
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
                id="initial-detail-location"
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
              {/* {error && error.location && <p>{error.location}</p>} */}
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
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-label">
                  Sub-contractor
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
              <FormControl
                component="fieldset"
                required
                error={error && error[`personaffected`]}
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Were any person affected during incident?
                </FormLabel>
                {/* <p>Were any person affected during incident?</p> */}

                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="personaffected"
                  name="personaffected"
                  aria-required
                  defaultValue={incidentsListData.isPersonAffected}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      personaffected: e.target.value,
                    });
                    handleHideAffect(
                      e.target.value,
                      "People affected",
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

                {error && error.personaffected && (
                  <FormHelperText>{error.personaffected}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl
                component="fieldset"
                className={classes.formControl}
                required
                error={error && error[`propertyaffected`]}
              >
                <FormLabel component="legend">
                  Was any propery damaged during incident?
                </FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="propertyaffected"
                  name="propertyaffected"
                  aria-required
                  defaultValue={incidentsListData.isPropertyDamaged}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      propertyaffected: e.target.value,
                    });
                    handleHideAffect(
                      e.target.value,
                      "Property affected",
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
                {error && error.propertyaffected && (
                  <FormHelperText>{error.propertyaffected}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl
                component="fieldset"
                required
                error={error && error[`equiptmenteffected`]}
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Was there any equiptment damaged?
                </FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="equiptmenteffected"
                  name="equiptmenteffected"
                  aria-required
                  defaultValue={incidentsListData.isEquipmentDamaged}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      equiptmenteffected: e.target.value,
                    });
                    handleHideAffect(
                      e.target.value,
                      "Equipment affected",
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
                {error && error.equiptmenteffected && (
                  <FormHelperText>{error.equiptmenteffected}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl
                component="fieldset"
                required
                error={error && error[`environmentaffected`]}
                className={classes.formControl}
              >
                <FormLabel component="legend">
                  Was there any environment impact?
                </FormLabel>
                <RadioGroup
                  aria-label="environmentaffected"
                  aria-required
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
                      "Environment affected",
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
                {error && error.environmentaffected && (
                  <FormHelperText>{error.environmentaffected}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                type="button"
                size="medium"
                variant="contained"
                color="primary"
                onClick={(e) => handelNext(e)}
              >
                Next
              </Button>
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
        <div> Loading...</div>
      )}
    </PapperBlock>
  );
};
export default IncidentDetails;
