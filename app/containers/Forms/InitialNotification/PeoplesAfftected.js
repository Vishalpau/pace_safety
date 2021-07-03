import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import moment from "moment";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import FormSideBar from "../FormSideBar";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import PeopleValidate from "../../Validator/PeopleValidation";
import api from "../../../utils/axios";
import "../../../styles/custom.css";
import { FormHelperText, FormLabel } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));
const PeoplesAffected = () => {
  // Props defination
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    moment,
  ];
  const classes = useStyles();
  const history = useHistory();

  // Id will be passed in the url incidement-management/:id/. Value for the id will be found in the id variable.
  const { id } = useParams();

  // States defination.
  const [personAffect, setPersonAffect] = useState("");
  const [individualAffectValue, setIndividualAffecctValue] = useState([]);
  const [personTypeValue, setPersonTypeValue] = useState([]);
  const [departmentValue, setDepartmentValue] = useState([]);
  const [medicalCareValue, setMedicalCareValue] = useState([]);
  const [personAffectedComments, setPersonAffectedComments] = useState("");
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [peopleData, setPeopleData] = useState([]);

  // Forms definations.
  const [form, setForm] = useState([
    {
      personType: "",
      personDepartment: "",
      personName: "",
      personIdentification: "",
      personMedicalCare: "",
      workerOffsiteAssessment: "",
      locationAssessmentCenter: "",
      createdBy: 1,
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
  ]);

  // New people details forms props. Mostly it will be for the yes case.
  const addNewPeopleDetails = () => {
    setForm([
      ...form,
      {
        personType: "",
        personDepartment: "",
        personName: "",
        personIdentification: "",
        personMedicalCare: "",
        workerOffsiteAssessment: "",
        locationAssessmentCenter: "",
        createdBy: 1,
        fkIncidentId: localStorage.getItem("fkincidentId"),
      },
    ]);
  };

  /*
    This is the generic function which will be used to update the states.
    Like above object we have multiple fields and based on the key 
    and field name we will modify the values.
  */
  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const { value } = e.target;
    temp[key][fieldname] = value;
    setForm(temp);
  };

  // set the state in update time
  const handleUpdatePeople = async (e, key, fieldname, peopleId) => {
    const temp = peopleData;
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    await setPeopleData(temp);
  };

  // Next button click event handling.
  const handleNext = async () => {
    // Next path handlings.
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));

    /* 
      This condition is there, because it has been assumed that peopleData length 
      will be 0 and on the people change in the yes section we have hit the put
      API. However it is wrong implementation. Therefore, it is checked that if 
      people data is there then just redirect user to next page.

      This is wrong implementation.
    */
    if (peopleData.length !== 0) {
      for (var i = 0; i < peopleData.length; i++) {
        const res = await api.put(
          `api/v1/incidents/${id}/people/${peopleData[i].id}/`,
          peopleData[i]
        );
      }

      if (nextPath.propertyAffect === "Yes") {
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
    } else {
      // This is the condition when Yes is clicked on the form.
      if (personAffect === "Yes") {
        // Validate the form.
        const { error, isValid } = PeopleValidate(form);

        // End the function exeution if isvalid is false.
        setError(error);
        if (!isValid) {
          return;
        }

        // Loop over all the people added and hit them with the help of the Post API.
        // We don't have single API.
        for (var i = 0; i < form.length; i++) {
          const res = await api.post(
            `api/v1/incidents/${localStorage.getItem("fkincidentId")}/people/`,
            form[i]
          );
        }

        // We have hit the API to create person Affected.
        // Now we are hitting the put api to send is person available is true in other API.
        const temp = incidentsListData;
        temp.isPersonDetailsAvailable =
          personAffect || incidentsListData.isPersonDetailsAvailable;
        temp.updatedAt = moment(new Date()).toISOString();

        const res = await api.put(
          `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );
        // check condition id
        if (id) {
          if (nextPath.propertyAffect === "Yes") {
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
          // Here it is the new entry create case. We will redirect to next pages without ids.
        } else {
          if (nextPath.propertyAffect === "Yes") {
            history.push(
              `/app/incident-management/registration/initial-notification/property-affected/`
            );
          } else if (nextPath.equipmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/equipment-affected/"
            );
          } else if (nextPath.environmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/environment-affected/"
            );
          } else {
            history.push(
              "/app/incident-management/registration/initial-notification/reporting-and-notification/"
            );
          }
        }

        // Case when form has No option selected.
      } else {
        // When no is selected we just have to send the comment and yes/no flag to API via put request.
        const temp = incidentsListData;
        temp["isPersonDetailsAvailable"] =
          personAffect || incidentsListData.isPersonDetailsAvailable;
        temp["updatedAt"] = moment(new Date()).toISOString();
        temp["personAffectedComments"] =
          personAffectedComments || incidentsListData.personAffectedComments;

        const res = await api.put(
          `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
          temp
        );

        // Case when id is available. Update case. Redirect user to specific page.
        // Here if we see, we are redirecting user to urls with /id/ in the end.
        // Therefore, next page will get the input from the id and pre-fill the details.
        if (id) {
          if (nextPath.propertyAffect === "Yes") {
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
          // Here it is the new entry create case. We will redirect to next pages without ids.
        } else {
          if (nextPath.propertyAffect === "Yes") {
            history.push(
              `/app/incident-management/registration/initial-notification/property-affected/`
            );
          } else if (nextPath.equipmentAffect === "Yes") {
            history.push(
              "/app/incident-management/registration/initial-notification/equipment-affected/"
            );
          } else if (nextPath.environmentAffect === "Yes") {
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
  };

  // hablde Remove

  const handleRemove = async (key) => {
    // this condition using when create new
    const temp = form;
    const newData = temp.filter((item, index) => index !== key);
    await setForm(newData);
  };

  // State for the error defination.
  const [error, setError] = useState({});

  // Fetch the radio button values for Do-you-have-details-to-share-about-the-individuals-Affected.
  const fetchIndividualAffectValue = async () => {
    const res = await api.get("api/v1/lists/8/value");
    const result = res.data.data.results;
    setIndividualAffecctValue(result);
  };

  // Fetch the dropdown values for the Person-Type.
  const fetchPersonTypeValue = async () => {
    const res = await api.get("api/v1/lists/9/value");
    const result = res.data.data.results;
    setPersonTypeValue(result);
  };

  // fetch the values for the Departments.
  const fetchDepartmentValue = async () => {
    const res = await api.get("api/v1/lists/10/value");
    const result = res.data.data.results;
    setDepartmentValue(result);
  };

  // Fetch the radio buttons for the "Was that person taken to medical care?".
  const fetchPersonTakenMedicalCare = async () => {
    const res = await api.get("api/v1/lists/11/value");
    const result = res.data.data.results;
    setMedicalCareValue(result);
  };

  // Fetch the incident details. We are fetching it to pre-populate the data in case of the going
  // previous page.
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    const isavailable = result.isPersonDetailsAvailable;
    setPersonAffect(isavailable);
    setIncidentsListdata(result);
    if (!id) {
      await setIsLoading(true);
    }
  };

  // Fetch the individual page data in case of the update.
  const fetchPersonListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/people/`);
    const result = res.data.data.results;
    await setPeopleData(result);
    await setIsLoading(true);
  };

  useEffect(() => {
    fetchIncidentsData();
    fetchIndividualAffectValue();
    fetchPersonTypeValue();
    fetchDepartmentValue();
    fetchPersonTakenMedicalCare();
    if (id) {
      fetchPersonListData();
    }
  }, []);
  return (
    <PapperBlock title="Details of People Affected" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item lg={12} md={6} sm={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  Do You Have Details of Individual Affected?
                </FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="personAffect"
                  name="personAffect"
                  defaultValue={personAffect}
                  onChange={(e) => {
                    setPersonAffect(e.target.value);
                  }}
                >
                  {individualAffectValue.map((value, key) => (
                    <FormControlLabel
                      key={key}
                      value={value.inputValue}
                      control={<Radio />}
                      label={value.inputLabel}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {personAffect === "Yes" ? (
              <>
                <Grid item md={12}>
                  <Box marginTop={2} marginBottom={2}>
                    <Typography variant="h6">
                      Details of People Affected
                    </Typography>
                  </Box>
                </Grid>
                {peopleData.length > 0
                  ? peopleData.map((people, key) => (
                      <Grid
                        container
                        item
                        md={12}
                        key={key}
                        spacing={3}
                        className="repeatedGrid"
                      >
                        <Grid item md={6}>
                          <FormControl
                            variant="outlined"
                            error={error && error[`personType${[key]}`]}
                            className={classes.formControl}
                          >
                            <InputLabel id="person-type-label">
                              Person Type
                            </InputLabel>
                            <Select
                              labelId="person-type-label"
                              id="person-type"
                              label=" Person Type"
                              defaultValue={people.personType}
                              onChange={(e) =>
                                handleUpdatePeople(
                                  e,
                                  key,
                                  "personType",
                                  people.id
                                )
                              }
                            >
                              {personTypeValue.length !== 0
                                ? personTypeValue.map((selectValues, key) => (
                                    <MenuItem
                                      key={key}
                                      value={selectValues.inputValue}
                                    >
                                      {selectValues.inputLabel}
                                    </MenuItem>
                                  ))
                                : null}
                              <MenuItem>Other</MenuItem>
                            </Select>
                            {error && error[`personType${[key]}`] && (
                              <FormHelperText>
                                {error[`personType${[key]}`]}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6}>
                          <FormControl
                            variant="outlined"
                            error={error && error[`personDepartment${[key]}`]}
                            className={classes.formControl}
                          >
                            <InputLabel id="dep-label">Department</InputLabel>
                            <Select
                              labelId="dep-label"
                              id="dep"
                              label="Department"
                              defaultValue={people.personDepartment}
                              onChange={(e) =>
                                handleUpdatePeople(
                                  e,
                                  key,
                                  "personDepartment",
                                  people.id
                                )
                              }
                            >
                              {departmentValue.length !== 0
                                ? departmentValue.map((selectValues, index) => (
                                    <MenuItem
                                      key={index}
                                      value={selectValues.inputValue}
                                    >
                                      {selectValues.inputLabel}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                            {error && error[`personDepartment${[key]}`] && (
                              <FormHelperText>
                                {error[`personDepartment${[key]}`]}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6}>
                          {/* <p>Name of people Affected</p> */}
                          <TextField
                            id="name-Affected"
                            variant="outlined"
                            error={error && error[`personName${[key]}`]}
                            helperText={
                              error && error[`personName${[key]}`]
                                ? error[`personName${[key]}`]
                                : null
                            }
                            label="Name of Person Affected"
                            className={classes.formControl}
                            defaultValue={people.personName}
                            onChange={(e) =>
                              handleUpdatePeople(
                                e,
                                key,
                                "personName",
                                people.id
                              )
                            }
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            id="id-num"
                            error={
                              error && error[`personIdentification${[key]}`]
                            }
                            helperText={
                              error && error[`personIdentification${[key]}`]
                                ? error[`personIdentification${[key]}`]
                                : null
                            }
                            variant="outlined"
                            label="Identify Number of Person"
                            className={classes.formControl}
                            defaultValue={people.personIdentification}
                            onChange={(e) =>
                              handleUpdatePeople(
                                e,
                                key,
                                "personIdentification",
                                people.id
                              )
                            }
                          />
                        </Grid>
                        <Grid item md={12}>
                          <div className={classes.spacer}>
                            <FormControl
                              component="fieldset"
                              error={
                                error && error[`personMedicalCare${[key]}`]
                              }
                            >
                              <FormLabel>
                                Was that Person Taken to Medical Care?
                              </FormLabel>
                              <RadioGroup
                                className={classes.inlineRadioGroup}
                                aria-label="personAffect"
                                name="personAffect"
                                defaultValue={people.personMedicalCare}
                                // value={value.personMedicalCare}
                                onChange={(e) =>
                                  handleUpdatePeople(
                                    e,
                                    key,
                                    "personMedicalCare",
                                    people.id
                                  )
                                }
                              >
                                {medicalCareValue.length !== 0
                                  ? medicalCareValue.map((value, index) => (
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
                        <Grid item md={6}>
                          <TextField
                            id="worker-taken"
                            error={
                              error && error[`workerOffsiteAssessment${[key]}`]
                            }
                            helperText={
                              error && error[`workerOffsiteAssessment${[key]}`]
                                ? error[`workerOffsiteAssessment${[key]}`]
                                : null
                            }
                            variant="outlined"
                            label="Worker Taken Offisite for Further Assesment?"
                            className={classes.formControl}
                            defaultValue={people.workerOffsiteAssessment}
                            onChange={(e) =>
                              handleUpdatePeople(
                                e,
                                key,
                                "workerOffsiteAssessment",
                                people.id
                              )
                            }
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            variant="outlined"
                            id="location-details"
                            error={
                              error && error[`locationAssessmentCenter${[key]}`]
                            }
                            helperText={
                              error && error[`locationAssessmentCenter${[key]}`]
                                ? error[`locationAssessmentCenter${[key]}`]
                                : null
                            }
                            label="Location Details of Assesment Center?"
                            className={classes.formControl}
                            defaultValue={people.locationAssessmentCenter}
                            onChange={(e) =>
                              handleUpdatePeople(
                                e,
                                key,
                                "locationAssessmentCenter",
                                people.id
                              )
                            }
                          />
                        </Grid>
                        {/* {peopleData.length > 1 ? (
                          <Grid item md={3}>
                            <Button
                              onClick={() => handleRemove(people.id)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Remove
                            </Button>
                          </Grid>
                        ) : null} */}
                      </Grid>
                    ))
                  : form.map((value, key) => (
                      <Grid
                        container
                        item
                        md={12}
                        key={key}
                        spacing={3}
                        className="repeatedGrid"
                      >
                        <Grid item md={6}>
                          <FormControl
                            variant="outlined"
                            error={error && error[`personType${[key]}`]}
                            className={classes.formControl}
                          >
                            <InputLabel id="person-type-label">
                              Person Type
                            </InputLabel>
                            <Select
                              labelId="person-type-label"
                              id="person-type"
                              label=" Person Type"
                              value={value.personType || ""}
                              onChange={(e) => handleForm(e, key, "personType")}
                            >
                              {personTypeValue.length !== 0
                                ? personTypeValue.map((selectValues, key) => (
                                    <MenuItem
                                      key={key}
                                      value={selectValues.inputValue}
                                    >
                                      {selectValues.inputLabel}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                            {error && error[`personType${[key]}`] && (
                              <FormHelperText>
                                {error[`personType${[key]}`]}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6}>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            error={error && error[`personDepartment${[key]}`]}
                          >
                            <InputLabel id="dep-label">Department</InputLabel>
                            <Select
                              labelId="dep-label"
                              id="dep"
                              label="Department"
                              value={value.personDepartment || ""}
                              onChange={(e) =>
                                handleForm(e, key, "personDepartment")
                              }
                            >
                              {departmentValue.length !== 0
                                ? departmentValue.map((selectValues, index) => (
                                    <MenuItem
                                      key={index}
                                      value={selectValues.inputValue}
                                    >
                                      {selectValues.inputLabel}
                                    </MenuItem>
                                  ))
                                : null}
                            </Select>
                            {error && error[`personDepartment${[key]}`] && (
                              <FormHelperText>
                                {error[`personDepartment${[key]}`]}
                              </FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                        <Grid item md={6}>
                          {/* <p>Name of people Affected</p> */}
                          <TextField
                            id="name-Affected"
                            variant="outlined"
                            error={error && error[`personName${[key]}`]}
                            helperText={
                              error && error[`personName${[key]}`]
                                ? error[`personName${[key]}`]
                                : null
                            }
                            label="Name of Person Affected"
                            className={classes.formControl}
                            value={value.personName || ""}
                            onChange={(e) => handleForm(e, key, "personName")}
                          />
                          {/* {error && error[`personName${[key]}`] && (
                            <p>{error[`personName${[key]}`]}</p>
                          )} */}
                        </Grid>
                        <Grid item md={6}>
                          {/* <p>Identification number of person</p> */}
                          <TextField
                            id="id-num"
                            variant="outlined"
                            error={
                              error && error[`personIdentification${[key]}`]
                            }
                            helperText={
                              error && error[`personIdentification${[key]}`]
                                ? error[`personIdentification${[key]}`]
                                : null
                            }
                            label="Identify Number of Person"
                            className={classes.formControl}
                            value={value.personIdentification}
                            onChange={(e) =>
                              handleForm(e, key, "personIdentification")
                            }
                          />
                        </Grid>
                        <Grid item md={12}>
                          <FormControl
                            component="fieldset"
                            required
                            error={error && error[`personMedicalCare${[key]}`]}
                          >
                            <FormLabel component="legend">
                              Was That Person Taken to Medical Care ?
                            </FormLabel>
                            <RadioGroup
                              className={classes.inlineRadioGroup}
                              aria-label="personAffect"
                              name="personAffect"
                              value={value.personMedicalCare}
                              onChange={(e) =>
                                handleForm(e, key, "personMedicalCare")
                              }
                            >
                              {medicalCareValue.length !== 0
                                ? medicalCareValue.map((value, index) => (
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
                        <Grid item md={6}>
                          <TextField
                            id="worker-taken"
                            error={
                              error && error[`workerOffsiteAssessment${[key]}`]
                            }
                            helperText={
                              error && error[`workerOffsiteAssessment${[key]}`]
                                ? error[`workerOffsiteAssessment${[key]}`]
                                : null
                            }
                            variant="outlined"
                            label="Worker Taken Offsite for Further Assesment ?"
                            className={classes.formControl}
                            value={value.workerOffsiteAssessment}
                            onChange={(e) =>
                              handleForm(e, key, "workerOffsiteAssessment")
                            }
                          />
                        </Grid>
                        <Grid item md={6}>
                          <TextField
                            variant="outlined"
                            id="location-details"
                            error={
                              error && error[`locationAssessmentCenter${[key]}`]
                            }
                            helperText={
                              error && error[`locationAssessmentCenter${[key]}`]
                                ? error[`locationAssessmentCenter${[key]}`]
                                : null
                            }
                            label="Location Details of Assesment Center ?"
                            className={classes.formControl}
                            value={value.locationAssessmentCenter}
                            onChange={(e) =>
                              handleForm(e, key, "locationAssessmentCenter")
                            }
                          />
                        </Grid>
                        {form.length > 1 ? (
                          <Grid item md={3}>
                            <Button
                              onClick={() => handleRemove(key)}
                              variant="contained"
                              color="primary"
                              className={classes.button}
                            >
                              Remove
                            </Button>
                          </Grid>
                        ) : null}
                      </Grid>
                    ))}

                {peopleData.length !== 0 ? null : (
                  <Grid item md={12}>
                    <button
                      className={classes.textButton}
                      onClick={() => addNewPeopleDetails()}
                    >
                      <PersonAddIcon /> Add Details of Another Person Affected
                    </button>
                  </Grid>
                )}
              </>
            ) : null}
            <Grid item md={12}>
              {personAffect === "Yes" ? null : (
                <TextField
                  id="comments"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Details of People Affected"
                  className={classes.fullWidth}
                  onChange={(e) => setPersonAffectedComments(e.target.value)}
                  defaultValue={incidentsListData.personAffectedComments}
                />
              )}
            </Grid>
            <Grid item md={6}>
              <Button
                onClick={() => history.goBack()}
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Previous
              </Button>
              <Button
                onClick={() => handleNext()}
                variant="contained"
                color="primary"
                className={classes.button}
                // onClick={(e) => handelNext(e)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="People Affected"
            />
          </Grid>
        </Grid>
      ) : (
        <div>Loading...</div>
      )}
    </PapperBlock>
  );
};
export default PeoplesAffected;
