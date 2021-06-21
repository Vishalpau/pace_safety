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
  TimePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import moment from "moment";
import FormSideBar from "../FormSideBar";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { func } from "prop-types";
import validate from "../../Validator/validation";
import api from "../../../utils/axios";
import { useHistory } from "react-router";
import { useParams } from "react-router";

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
  spacer: {
    padding: ".75rem 0",
  },
}));
const IncidentDetails = () => {
  const classes = useStyles();
  // const [selectedDate, setSelectedDate] = React.useState(
  //   new Date("2014-08-18")
  // );
  const [selectedTime, setSelectedTime] = React.useState(new Date());
  const [error, setError] = useState({});
  const selectValues = [1, 2, 3, 4];
  const companyName = ["ABC Ltd", "XYZ steel", "ABA power", "XDA works"];
  const radioDecide = ["Yes", "No", "N/A"];
  const [listData, setListData] = useState([]);
  const [incidentsListData, setIncidentsListdata] = useState([]);
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

  const [clearedDate, handleClearedDateChange] = useState(null);

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
  const handelNext = async (e) => {
    console.log(clearedDate)
    console.log(form);
      if (id !== undefined) {
        const tempNextPath = nextPath;
        tempNextPath.propertyAffect =
          nextPath.propertyAffect || incidentsListData.isPropertyDamaged;
        tempNextPath.personAffect =
          nextPath.personAffect || incidentsListData.isPersonAffected;
        tempNextPath.equipmentAffect =
          nextPath.equipmentAffect || incidentsListData.isEquipmentDamaged;
        tempNextPath.environmentAffect =
          nextPath.environmentAffect ||
          incidentsListData.isEnviromentalImpacted;
        await setNextPath(tempNextPath);

        const tempForm = form;
        tempForm.projectname =
          form.projectname || incidentsListData.fkProjectId;
        tempForm.unitname = form.unitname || incidentsListData.fkUnitId;
        tempForm.incidenttype =
          form.incidenttype || incidentsListData.incidentNumber;
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
        console.log(form)
        // const { error, isValid } = validate(tempForm);
        // setError(error);
        // if(isValid === true){}
        const formData ={
          id: parseInt(id),
          fkCompanyId: 0,
          fkProjectId: 0,
          fkPhaseId: 0,
          fkUnitId: 0,
          incidentNumber: form.incidenttype ,
          incidentTitle: form.title,
          incidentDetails: form.description,
          immediateActionsTaken: 'jdf',
          incidentOccuredOn: moment(form.incidentdate).toISOString(),
          isPersonAffected: form.personaffected,
          isPersonDetailsAvailable: incidentsListData.isPersonDetailsAvailable,
          personAffectedComments: incidentsListData.personAffectedComments,
          isPropertyDamaged: form.propertyaffected,
          isPropertyDamagedAvailable: incidentsListData.isPropertyDamagedAvailable,
          propertyDamagedComments: incidentsListData.propertyDamagedComments,
          isEquipmentDamaged: form.equiptmenteffected,
          isEquipmentDamagedAvailable: incidentsListData.isEquipmentDamagedAvailable,
          equipmentDamagedComments: incidentsListData.equipmentDamagedComments,
          isEnviromentalImpacted: form.environmentaffected,
          enviromentalImpactComments: incidentsListData.enviromentalImpactComments,
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
          updatedBy: '0',
          source: 'Web',
          vendor: 'string',
          vendorReferenceId: 'string',
          contractor: form.contractor,
          subContractor: form.subcontractor
        }
        const res = await api.put(`/api/v1/incidents/${id}`, formData);
        console.log(res)
        if (res.status === 200) {
          
          const fkincidentId = res.data.data.results.id;
          localStorage.setItem("fkincidentId", fkincidentId);
          localStorage.setItem("deleteForm", JSON.stringify(hideAffect));
          localStorage.setItem("nextPath", JSON.stringify(nextPath));
          if (nextPath.personAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/peoples-afftected/"
            );
          } else {
            if (nextPath.propertyAffect === "Yes") {
              history.push(
                "/app/incident-management/registration/initial-notification/property-affected/"
              );
            } else {
              if (nextPath.equipmentAffect === "Yes") {
                history.push(
                  "/app/incident-management/registration/initial-notification/eqiptment-affected/"
                );
              } else {
                if (nextPath.environmentAffect === "Yes") {
                  history.push(
                    "/app/incident-management/registration/initial-notification/environment-affected/"
                  );
                } else {
                  history.push(
                    "/app/incident-management/registration/initial-notification/reporting-and-notification/"
                  );
                }
              }
            }
          }
        }
      } else {
        const { error, isValid } = validate(form);
        setError(error);
    
        console.log(error);
        if (isValid === true) {
          const formData = {
            fkCompanyId: 1,
            fkProjectId: 1,
            fkPhaseId: 1,
            fkUnitId: 1,
            incidentNumber: form.incidenttype,
            incidentTitle: form.title,
            incidentDetails: form.description,
            immediateActionsTaken: form.immediateActionsTaken,
            incidentOccuredOn: moment(form.incidentdate).toISOString(),
            isPersonAffected: form.personaffected,
            isPersonDetailsAvailable: "Yes",
            personAffectedComments: "string",
            isPropertyDamaged: form.propertyaffected,
            isPropertyDamagedAvailable: "Yes",
            propertyDamagedComments: "string",
            isEquipmentDamaged: form.equiptmenteffected,
            isEquipmentDamagedAvailable: "Yes",
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
          console.log(formData);
        const res = await api.post("/api/v1/incidents/", formData);
        if (res.status === 200) {
          const fkincidentId = res.data.data.results.id;
          localStorage.setItem("fkincidentId", fkincidentId);
          localStorage.setItem("deleteForm", JSON.stringify(hideAffect));
          localStorage.setItem("nextPath", JSON.stringify(nextPath));
          if (nextPath.personAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/peoples-afftected/"
            );
          } else {
            if (nextPath.propertyAffect === "Yes") {
              history.push(
                "/app/incident-management/registration/initial-notification/property-affected/"
              );
            } else {
              if (nextPath.equipmentAffect === "Yes") {
                history.push(
                  "/app/incident-management/registration/initial-notification/eqiptment-affected/"
                );
              } else {
                if (nextPath.environmentAffect === "Yes") {
                  history.push(
                    "/app/incident-management/registration/initial-notification/environment-affected/"
                  );
                } else {
                  history.push(
                    "/app/incident-management/registration/initial-notification/reporting-and-notification/"
                  );
                }
              }
            }
          }
        }
      }

      //
      console.log(res);
    }
  };
  
  const handelTimeChange = (date) => {
    console.log(date);
    let onlyTime = moment(date).format("HH:mm");
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
  }, []);

  return (
    <div>
      {isLoading ? (
        <Container>
          <Box padding={3} bgcolor="background.paper">
            
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Initial Notification
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>

                {/* project name */}
                <Grid item md={6}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.formControl}
                  >
                    {/* <Typography varint="p">Project Name</Typography> */}
                    <InputLabel id="project-name-label">
                      Project Name
                    </InputLabel>
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
                    {error && error.projectname && <p>{error.projectname}</p>}
                    <FormHelperText>Required</FormHelperText>
                  </FormControl>
                </Grid>
                
                {/* unit name */}
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
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
                    {error && error.unitname && <p>{error.unitname}</p>}
                  </FormControl>
                </Grid>


                {/* incident type */}
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    requirement
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
                            <MenuItem
                              key={index}
                              value={selectValues.inputValue}
                            >
                              {selectValues.inputLabel}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    {error && error.incidenttype && <p>{error.incidenttype}</p>}
                  </FormControl>
                </Grid>


                {/* date */}
                <Grid item md={6}>
                  <MuiPickersUtilsProvider
                    variant="outlined"
                    utils={DateFnsUtils}
                  >
                    <KeyboardDatePicker
                      
                      value={form.incidentdate === null? clearedDate : form.incidentdate}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          incidentdate: (moment(e).format("YYYY/MM/DD")),
                        });
                      }}
                      format="yyyy/MM/dd"
                    />
                  </MuiPickersUtilsProvider>
                  {error && error.incidentdate && <p>{error.incidentdate}</p>}
                </Grid>


                {/* time */}
                <Grid item md={6}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardTimePicker
                      margin="normal"
                      id="time-picker"
                      label="Time picker"
                      value={form.incidenttime === null? clearedDate : selectedTime}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          incidenttime:moment(e).format("HH:mm"),
                        });
                        setSelectedTime(e)
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      format="HH:mm"
                    />
                  </MuiPickersUtilsProvider>
                  {error && error.incidentdate && <p>{error.incidentdate}</p>}
                </Grid>


                {/* title */}
                <Grid item lg={12} md={6} sm={6}>
                  <TextField
                    id="title"
                    variant="outlined"
                    label="Title"
                    className={classes.fullWidth}
                    defaultValue={incidentsListData.incidentTitle}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        title: e.target.value,
                      });
                    }}
                  />
                  {error && error.title && <p>{error.title}</p>}
                </Grid>

                {/* description */}
                <Grid item md={12}>
                  <TextField
                    multiline
                    variant="outlined"
                    rows="5"
                    id="description"
                    label="Description"
                    defaultValue={incidentsListData.incidentDetails}
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        description: e.target.value,
                      });
                    }}
                  />
                  {error && error.description && <p>{error.description}</p>}
                </Grid>

                {/* immediate-actions */}
                <Grid item md={12}>
                  <TextField
                    variant="outlined"
                    id="immediate-actions"
                    multiline
                    rows="4"
                    label="Any immediate actions taken"
                    defaultValue={incidentsListData.incidentLocation}
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        immediateactiontaken: e.target.value,
                      });
                    }}
                  />
                  {error && error.immediateactiontaken && (
                    <p>{error.immediateactiontaken}</p>
                  )}
                </Grid>

                {/* location */}
                <Grid item md={6}>
                  <TextField
                    id="title"
                    variant="outlined"
                    label="Location"
                    className={classes.fullWidth}
                    defaultValue={incidentsListData.incidentLocation}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        location: e.target.value,
                      });
                    }}
                  />
                  {error && error.location && <p>{error.location}</p>}
                </Grid>
                {/* contractor */}
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    requirement
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Contractor *
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
                            <MenuItem
                              key={index}
                              value={selectValues.inputValue}
                            >
                              {selectValues.inputLabel}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    {error && error.contractor && <p>{error.contractor}</p>}
                  </FormControl>
                </Grid>
                {/* <Grid item md={6}>
                <TextField
                  variant="outlined"
                  id="contractor"
                  label="Contractor"
                  required
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      contractor: e.target.value,
                    });
                  }}
                />
                {error && error.contractor && <p>{error.contractor}</p> }
              </Grid> */}
                {/* sub contractor */}
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    requirement
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Sub-Contractor *
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
                            <MenuItem
                              key={index}
                              value={selectValues.inputValue}
                            >
                              {selectValues.inputLabel}
                            </MenuItem>
                          ))
                        : null}
                    </Select>
                    <FormHelperText>Required</FormHelperText>
                    {error && error.subcontractor && (
                      <p>{error.subcontractor}</p>
                    )}
                  </FormControl>
                </Grid>

                {/* person affected */}
                <Grid item md={12}>
                  <div className={classes.spacer}>
                    <p>Were any person affected during incident?</p>

                    <RadioGroup
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
                          "Peoples affected",
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
                  </div>
                  {error && error.personaffected && (
                    <p>{error.personaffected}</p>
                  )}
                </Grid>
                {/* propery damaged */}
                <Grid item md={12}>
                  <div className={classes.spacer}>
                    <p>Was any propery damaged during incident?</p>
                    <RadioGroup
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
                  </div>
                  {error && error.propertyaffected && (
                    <p>{error.propertyaffected}</p>
                  )}
                </Grid>
                {/* equiptment damaged */}
                <Grid item md={12}>
                  <div className={classes.spacer}>
                    <p>Was there any equiptment damaged?</p>
                    <RadioGroup
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
                  </div>
                  {error && error.equiptmenteffected && (
                    <p>{error.equiptmenteffected}</p>
                  )}
                </Grid>
                {/* environment impact */}
                <Grid item md={12}>
                  <p>Was there any environment impact?</p>
                  <RadioGroup
                    aria-label="environmentaffected"
                    name="environmentaffected"
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
                    <p>{error.environmentaffected}</p>
                  )}
                </Grid>
                <Grid item md={12}>
                  <Box marginTop={4}>
                    <Button
                      // href={
                      //   Object.keys(error).length === 0
                      //     ? "http://localhost:3000/app/incident-management/registration/initial-notification/peoples-afftected/"
                      //     : "#"
                      // }
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
              <Grid item md={3}>
                <FormSideBar
                  deleteForm={hideAffect}
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Incident details"}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      ) : (
        <div> Loading...</div>
      )}
    </div>
  );
};
export default IncidentDetails;
