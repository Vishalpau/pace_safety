import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import moment from "moment";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Row, Col } from "react-grid-system";

import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION_FORM,
  SSO_URL,
  HEADER_AUTH,
} from "../../../utils/constants";
import validate from "../../Validator/validation";
import api from "../../../utils/axios";
import AlertMessage from "./Alert";
import Type from "../../../styles/components/Fonts.scss";
import Axios from 'axios'


// redux
import { connect } from 'react-redux'
import { breakDownDetails, levelBDownDetails } from "../../../redux/actions/initialDetails";
import ProjectStructureInit from "../../ProjectStructureId/ProjectStructureId";

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

const IncidentDetails = (props) => {
  // Props definations.
  const classes = useStyles();
  const [error, setError] = useState({});
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
  const [isNext, setIsNext] = useState(true);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectValue, setSelectValue] = useState([])

  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [hideAffect, setHideAffect] = useState([]);
  const [selectDepthAndId, setSelectDepthAndId] = useState([])

  const [nextPath, setNextPath] = useState({
    personAffect: "",
    propertyAffect: "",
    equipmentAffect: "",
    environmentAffect: "",
  });

  // Initial forms.
  const [form, setForm] = useState({
    incidentType: "",
    incidentOccuredOn: null,
    incidentTitle: "",
    incidentDetails: "",
    immediateActionsTaken: "",
    incidentLocation: "",
    contractor: "",
    subContractor: "",
    isPersonAffected: "",
    isPropertyDamaged: "",
    isEquipmentDamaged: "",
    isEnviromentalImpacted: "",
  });

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName
      : null;
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;
  const userName =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).name
      : null;
  const selectBreakdown =
    JSON.parse(localStorage.getItem("selectBreakDown")) !== null
      ? JSON.parse(localStorage.getItem("selectBreakDown"))
      : [];
  let struct = "";
  for (const i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  // Function called on next button click.
  const handelNext = async (e) => {
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
            let fkProjectStructureId = uniqueProjectStructure.map(depth => {
              return depth;
            }).join(':')
    // Create case if id is not null and means it is an update case.
    if (isNext) {
      setIsNext(false);
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
          nextPath.environmentAffect ||
          incidentsListData.isEnviromentalImpacted;
        await setNextPath(tempNextPath);

        // Setup initial form.

        const formData = {
          id: parseInt(id),
          fkCompanyId: incidentsListData.fkCompanyId,
          fkProjectId: incidentsListData.fkProjectId,
          fkProjectStructureIds: fkProjectStructureId.toString()||incidentsListData.fkProjectStructureIds,
          incidentNumber: incidentsListData.incidentNumber,
          incidentType: form.incidentType,
          incidentTitle: form.incidentTitle,
          incidentDetails: form.incidentDetails,
          immediateActionsTaken: form.immediateActionsTaken,
          incidentOccuredOn: form.incidentOccuredOn,
          isPersonAffected: form.isPersonAffected,
          isPersonDetailsAvailable: incidentsListData.isPersonDetailsAvailable,
          personAffectedComments: incidentsListData.personAffectedComments,
          isPropertyDamaged: form.isPropertyDamaged,
          isPropertyDamagedAvailable:
            incidentsListData.isPropertyDamagedAvailable,
          propertyDamagedComments: incidentsListData.propertyDamagedComments,
          isEquipmentDamaged: form.isEquipmentDamaged,
          isEquipmentDamagedAvailable:
            incidentsListData.isEquipmentDamagedAvailable,
          equipmentDamagedComments: incidentsListData.equipmentDamagedComments,
          isEnviromentalImpacted: form.isEnviromentalImpacted,
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
          incidentLocation: form.incidentLocation,
          latitude: null,
          longitude: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          assignTo: incidentsListData.assignTo,
          createdBy: incidentsListData.createdBy,
          updatedBy: userId,
          source: "Web",
          vendor: "string",
          vendorReferenceId: "string",
          contractor: form.contractor,
          subContractor: form.subContractor,
        };
        const { error, isValid } = validate(form);
        await setError(error);
        // check condition for error
        if (isValid === true) {
          try {
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
                  `/incident/${id}/modify/peoples-afftected/`
                );
              } else if (nextPath.propertyAffect === "Yes") {
                history.push(
                  `/incident/${id}/modify/property-affected/`
                );
              } else if (nextPath.equipmentAffect === "Yes") {
                history.push(
                  `/incident/${id}/modify/equipment-affected/`
                );
              } else if (nextPath.environmentAffect === "Yes") {
                history.push(
                  `/incident/${id}/modify/peoples-afftected/`
                );
              } else {
                history.push(
                  `/incident/${id}/modify/reporting-and-notification/`
                );
              }
            }
          } catch (error) {
            setIsNext(true);
            setMessage("Something went worng!");
            setMessageType("error");
            setOpen(true);
          }
        } else {
          setIsNext(true);
        }
      } else {
        // Create case if id is not null and means it is an add new registration case.
        const { error, isValid } = validate(form, selectDepthAndId);
        await setError(error);
        if (selectDepthAndId.length === 0) {
          // alert("Please select Level of phase.")
          setIsNext(true);
        } else {
          if (isValid === true) {
            
            const formData = {
              fkCompanyId: parseInt(fkCompanyId),
              fkProjectId: parseInt(project.projectId),

              fkProjectStructureIds: fkProjectStructureId.toString(),

              incidentNumber: "",
              incidentType: form.incidentType,
              incidentTitle: form.incidentTitle,
              incidentDetails: form.incidentDetails,
              immediateActionsTaken: form.immediateActionsTaken,
              incidentOccuredOn: form.incidentOccuredOn,
              isPersonAffected: form.isPersonAffected,
              isPersonDetailsAvailable: "No",
              personAffectedComments: "",
              isPropertyDamaged: form.isPropertyDamaged,
              isPropertyDamagedAvailable: "No",
              propertyDamagedComments: "",
              isEquipmentDamaged: form.isEquipmentDamaged,
              isEquipmentDamagedAvailable: "No",
              equipmentDamagedComments: "",
              isEnviromentalImpacted: form.isEnviromentalImpacted,
              enviromentalImpactComments: "",
              supervisorByName: "",
              supervisorById: 0,
              incidentReportedOn: new Date().toISOString(),
              incidentReportedByName: userName,
              incidentReportedById: 0,
              reasonLateReporting: "",
              notificationComments: "",
              reviewedBy: 0,
              reviewDate: null,
              closedBy: 0,
              closeDate: null,
              status: "Active",
              incidentLocation: form.incidentLocation,
              assignTo: 0,
              createdBy: parseInt(userId),
              updatedBy: userId,
              source: "Web",
              vendor: "string",
              vendorReferenceId: "string",
              contractor: form.contractor,
              subContractor: form.subContractor,
            };
            // sent post api
            try {
              const res = await api.post("/api/v1/incidents/", formData);
              if (res.status === 201) {
                const fkincidentId = res.data.data.results.id;
                localStorage.setItem("fkincidentId", fkincidentId);
                localStorage.setItem("deleteForm", JSON.stringify(hideAffect));
                localStorage.setItem("nextPath", JSON.stringify(nextPath));

                // Decide on which path to go next.
                if (nextPath.personAffect === "Yes") {
                  history.push(
                    `/incident/${res.data.data.results.id}/modify/peoples-afftected/`
                  );
                } else if (nextPath.propertyAffect === "Yes") {
                  history.push(
                    `/incident/${res.data.data.results.id}/modify/property-affected/`
                  );
                } else if (nextPath.equipmentAffect === "Yes") {
                  history.push(
                    `/incident/${res.data.data.results.id}/modify/equipment-affected/`
                  );
                } else if (nextPath.environmentAffect === "Yes") {
                  history.push(
                    `/incident/${res.data.data.results.id}/modify/peoples-afftected/`
                  );
                } else {
                  history.push(
                    `/incident/${res.data.data.results.id}/modify/reporting-and-notification/`
                  );
                }
              }
            } catch (error) {
              setIsNext(true);
              setMessage("Something went worng!");
              setMessageType("error");
              setOpen(true);
            }
          } else {
            setIsNext(true);
          }
        }
      }
    }
  };

  // get data incident type dropdown value
  const fetchIncidentTypeValue = async () => {
    try {
      const res = await api.get("api/v1/lists/1/value");
      const result = res.data.data.results;
      await setIncidentTypeValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // get data contractor value for dropdown
  const fetchContractorValue = async () => {
    try {
      const res = await api.get("api/v1/lists/2/value");
      const result = res.data.data.results;
      await setContractorValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };
  
  // get data sub-contractor value for dropdown
  const fetchSubContractorValue = async () => {
    try {
      const res = await api.get("api/v1/lists/3/value");
      const result = res.data.data.results;
      await setSubContractorValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // get data person affect value for radio-button
  const fetchPersonAffectValue = async () => {
    try {
      const res = await api.get("api/v1/lists/4/value");
      const result = res.data.data.results;
      await setPersonAffectedValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // get data property value for radio-button
  const fetchPropertiesValue = async () => {
    try {
      const res = await api.get("api/v1/lists/5/value");
      const result = res.data.data.results;
      await setPropertiesAffectValue(result);
    } catch (error) {
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // get data equipment value for radio-button
  const fetchEquipmentAffectValue = async () => {
    try {
      const res = await api.get("api/v1/lists/6/value");
      const result = res.data.data.results;
      await setEquipmentAffectValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // get data property enviornment for radio-button
  const fetchEnviornmentAffectValue = async () => {
    try {
      const res = await api.get("api/v1/lists/7/value");
      const result = res.data.data.results;
      await setEnvironmentAffectValue(result);
    } catch (error) {
      setIsNext(true);
      setMessage("Something went worng!");
      setMessageType("error");
      setOpen(true);
    }
  };

  // fetch incident details data
  const fetchIncidentsData = async () => {
    if (!id) {
      await setIsLoading(true);
    } else {
      try {
        const res = await api.get(`/api/v1/incidents/${id}/`);
        const result = res.data.data.results;
        await setIncidentsListdata(result);
        if (Object.keys(result).length > 0) {
          let temp = { ...form };
          temp = result;
          setForm(temp);
          fetchBreakDownData(temp.fkProjectStructureIds)
          await fetchBreakDownData(result.fkProjectStructureIds)

        }

        // const user = localStorage.getItem({})
        // set right sidebar value
        if (result.isEnviromentalImpacted !== "Yes") {
          hideAffect.push("Environment impact");
        }
        if (result.isEquipmentDamaged !== "Yes") {
          hideAffect.push("Equipment affected");
        }
        if (result.isPropertyDamaged !== "Yes") {
          hideAffect.push("Property affected");
        }
        if (result.isPersonAffected !== "Yes") {
          hideAffect.push("People affected");
        }

      } catch (error) {
        setIsNext(true);
        setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
      }
    }
  };

  const handleBreakdown = async (e, index, label, selectvalue) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    
    const value = e.target.value;
    
    const temp = [...fetchSelectBreakDownList]
    temp[index-1]["selectValue"].id = value
    let removeTemp = temp.slice(0, index)
    await setFetchSelectBreakDownList(removeTemp)
    if (projectData.projectName.breakdown.length !== index) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index) {
          var config = {
            method: "get",
            url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
              }${value}`,
            headers: HEADER_AUTH,
          };
          
          await Axios(config)
            .then(function (response) {
              if (response.status === 200) {

                if (
                  removeTemp.filter(
                    (item) =>
                      item.breakdownLabel ===
                      projectData.projectName.breakdown[index].structure[0].name
                  ).length > 0
                ) {
                  return;
                } else {
                  setFetchSelectBreakDownList([
                    ...removeTemp,
                    {
                      breakDownLabel: projectData.projectName.breakdown[index].structure[0].name,
                      selectValue: {id:value},
                      breakDownData: response.data.data.results
                    },
                  ]);
                }
              }
            })
            .catch(function (error) {

            });
        }
      }
    } 
  };

  const fetchBreakDownData = async (projectBreakdown) => {

    const projectData = JSON.parse(localStorage.getItem('projectName'));

    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    setSelectDepthAndId(breakDown)
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === '1L') {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;
            await setIsLoading(true);
            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown, {
                    breakDownLabel: projectData.projectName.breakdown[0].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }

                ];

              }
            });
            setFetchSelectBreakDownList(selectBreakDown)
          })
          .catch((error) => {

            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key - 1].substring(2)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {

            const result = response.data.data.results;

            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown,
                  {
                    breakDownLabel: projectData.projectName.breakdown[key].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }
                ];

              }
            });
            setFetchSelectBreakDownList(selectBreakDown)

          })
          .catch((error) => {
            console.log(error)
            setIsNext(true);
          });
      }
    }
  };

  const handleDepthAndId = (depth, id) => {
    let newData = [...selectDepthAndId, `${depth}${id}`]
    setSelectDepthAndId([... new Set(newData)])
  }
  useEffect(() => {
    fetchContractorValue();
    fetchIncidentTypeValue();
    fetchSubContractorValue();
    fetchPersonAffectValue();
    fetchPropertiesValue();
    fetchEquipmentAffectValue();
    fetchEnviornmentAffectValue();
    fetchIncidentsData();
  }, [])


  //  set state for hide sidebar
  const handleHideAffect = (e, name, key) => {
    if (e !== "Yes") {
      setHideAffect([...hideAffect, name]);
    } else {
      const newHideAffect = hideAffect.filter((item) => item !== name);

      setHideAffect(newHideAffect);
    }
  };

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock icon="ion-md-list-box" title="Initial Notification">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>

              {/* Project Name */}
              <Grid item xs={3}>

                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                  id="project-name-label"
                >
                  Project name
                </Typography>


                <Typography className={Type.labelValue}>
                  {project ? project.projectName : null}
                </Typography>
              </Grid>
              {id ? fetchSelectBreakDownList.map((data, key) => <Grid item xs={3} md={3} key={key}>
                <FormControl
                  error={error.incidentType}
                  variant="outlined"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    {data.breakDownLabel}
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Incident type"
                    value={data.selectValue.id || ""}
                    onChange={(e) => {
                      handleBreakdown(e, key + 1, data.breakDownLabel, data.selectValue);
                    }}
                  >
                    {data.breakDownData.length !== 0
                      ? data.breakDownData.map((selectvalues, index) => (
                        <MenuItem key={index} 
                        onClick={(e) => handleDepthAndId(selectvalues.depth, selectvalues.id)}
                        value={selectvalues.id}>
                          {selectvalues.structureName}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                  {error && error.incidentType && (
                    <FormHelperText>{error.incidentType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              ) : <ProjectStructureInit selectDepthAndId={selectDepthAndId} setSelectDepthAndId={setSelectDepthAndId} />
              }
              {/* Unit Name */}

              {/* Incident Type */}
              <Grid item xs={12} md={6}>
                <FormControl
                  error={error.incidentType}
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
                    value={form.incidentType || ""}
                    onChange={(e) => {
                      setForm({ ...form, incidentType: e.target.value });
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
                  {error && error.incidentType && (
                    <FormHelperText>{error.incidentType}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* Date and Time */}
              <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider
                  variant="outlined"
                  utils={DateFnsUtils}
                >
                  <KeyboardDateTimePicker
                    required
                    error={error.incidentOccuredOn}
                    required
                    className={classes.formControl}
                    label="Incident date & time"
                    helperText={
                      error.incidentOccuredOn ? error.incidentOccuredOn : null
                    }
                    value={form.incidentOccuredOn || null}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        incidentOccuredOn: moment(e).toISOString(),
                      });
                    }}
                    InputProps={{ readOnly: true }}
                    format="yyyy/MM/dd HH:mm"
                    inputVariant="outlined"
                    disableFuture="true"
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              {/* Incident Title */}
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="title"
                  error={error.incidentTitle}
                  variant="outlined"
                  label="Title"
                  className={classes.fullWidth}
                  value={form.incidentTitle || ""}
                  helperText={error.incidentTitle ? error.incidentTitle : ""}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      incidentTitle: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* Incident Description */}
              <Grid item xs={12} md={12}>
                <TextField
                  error={error.incidentDetails}
                  multiline
                  variant="outlined"
                  rows="4"
                  id="description"
                  label="Description"
                  value={form.incidentDetails || ""}
                  className={classes.fullWidth}
                  helperText={error.incidentDetails && error.incidentDetails}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      incidentDetails: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* Incident immediate action taken */}
              <Grid item xs={12} md={12}>
                <TextField
                  variant="outlined"
                  id="immediate-actions"
                  multiline
                  rows="4"
                  label="Any immediate actions taken"
                  value={form.immediateActionsTaken || ""}
                  className={classes.fullWidth}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      immediateActionsTaken: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* incident Location */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="initial-detail-location"
                  variant="outlined"
                  label="Location"
                  error={error.incidentLocation}
                  helperText={
                    error.incidentLocation ? error.incidentLocation : ""
                  }
                  className={classes.fullWidth}
                  value={form.incidentLocation || ""}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      incidentLocation: e.target.value,
                    });
                  }}
                />
              </Grid>

              {/* Contractor */}
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
                    value={form.contractor || ""}
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

              {/* Sub-Contractor */}
              <Grid item xs={12} md={6}>
                <FormControl
                  variant="outlined"
                  error={error.subContractor}
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    Sub-contractor
                  </InputLabel>
                  <Select
                    labelId="sub-contractor-type-label"
                    id="sub-contractor"
                    label="Sub-Contractor"
                    value={form.subContractor || ""}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        subContractor: e.target.value,
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
                  {error && error.subContractor && (
                    <FormHelperText>{error.subContractor}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Person Affected */}
              <Grid item xs={12} md={12}>
                <FormControl
                  component="fieldset"
                  required
                  error={error && error.isPersonAffected}
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Were any person affected during incident?
                  </FormLabel>

                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="personaffected"
                    name="personaffected"
                    aria-required
                    value={form.isPersonAffected || ""}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isPersonAffected: e.target.value,
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

                  {error && error.isPersonAffected && (
                    <FormHelperText>{error.isPersonAffected}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Property Affected */}
              <Grid item xs={12} md={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  required
                  error={error && error.isPropertyDamaged}
                >
                  <FormLabel component="legend">
                    Was any property damaged during incident?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="propertyaffected"
                    name="propertyaffected"
                    aria-required
                    value={form.isPropertyDamaged || ""}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isPropertyDamaged: e.target.value,
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
                  {error && error.isPropertyDamaged && (
                    <FormHelperText>{error.isPropertyDamaged}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Equipment Damaged */}
              <Grid item xs={12} md={12}>
                <FormControl
                  component="fieldset"
                  required
                  error={error && error.isEquipmentDamaged}
                  className={classes.formControl}
                >
                  <FormLabel component="legend">
                    Was there any equipment damaged?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="equiptmenteffected"
                    name="equiptmenteffected"
                    aria-required
                    value={form.isEquipmentDamaged || ""}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isEquipmentDamaged: e.target.value,
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
                        />
                      ))
                      : null}
                  </RadioGroup>
                  {error && error.isEquipmentDamaged && (
                    <FormHelperText>{error.isEquipmentDamaged}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Environmental Impact */}
              <Grid item xs={12} md={12}>
                <FormControl
                  component="fieldset"
                  required
                  error={error && error.isEnviromentalImpacted}
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
                    value={form.isEnviromentalImpacted || ""}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        isEnviromentalImpacted: e.target.value,
                      });
                      handleHideAffect(
                        e.target.value,
                        "Environment impact",
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
                        />
                      ))
                      : null}
                  </RadioGroup>
                  {error && error.isEnviromentalImpacted && (
                    <FormHelperText>
                      {error.isEnviromentalImpacted}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {/* Go to next button */}
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
          </Col>

          {/* Right Sidebar */}
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={hideAffect}
                listOfItems={INITIAL_NOTIFICATION_FORM}
                selectedItem="Incident details"
              />
            </Col>
          )}
        </Row>
      ) : (
        <div> Loading...</div>
      )}
    </PapperBlock>
  );
};

const IncidentDetailsInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(IncidentDetails);

export default IncidentDetailsInit;