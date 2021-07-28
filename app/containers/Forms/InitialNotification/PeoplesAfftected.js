import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
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
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
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
import AlertMessage from "./Alert";

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

  const [open, setOpen] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('')
  const userId = JSON.parse(localStorage.getItem('userDetails'))!==null?JSON.parse(localStorage.getItem('userDetails')).id:null;

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
      createdBy: parseInt(userId),
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
        createdBy: parseInt(userId),
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
    try{
    const temp = [...form];
    const { value } = e.target;
    if (e.target.value === "Don't Know") {
      temp[key][fieldname] = "N/A";
    } else {
      temp[key][fieldname] = value;
    }
    setForm(temp);
  }
  catch(error){
    setMessage("Something went worng!");
    setMessageType("error");
    setOpen(true);
    }
  };

  // Next button click event handling.
  const handleNext = async () => {
    // Next path handlings.
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));


    // This is the condition when Yes is clicked on the form.
    if (personAffect === "Yes") {
      try{
      if (peopleData.length > 0) {
        const temp = peopleData
        for (var i = 0; i < peopleData.length; i++) {
          const res = await api.delete(
            `api/v1/incidents/${id}/people/${temp[i].id}/`,
          );
        }
      }
      }
      catch(error){
        setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
      }
      // Validate the form.
      const { error, isValid } = PeopleValidate(form);

      // End the function exeution if isvalid is false.
      setError(error);

      // Loop over all the people added and hit them with the help of the Post API.
      // We don't have single API.

      if (isValid) {
        try{
        for (var i = 0; i < form.length; i++) {
          const res = await api.post(
            `api/v1/incidents/${localStorage.getItem("fkincidentId")}/people/`,
            {
              personType: form[i].personType,
              personDepartment: form[i].personDepartment,
              personName: form[i].personName,
              personIdentification: form[i].personIdentification,
              personMedicalCare: form[i].personMedicalCare,
              workerOffsiteAssessment: form[i].workerOffsiteAssessment,
              locationAssessmentCenter: form[i].locationAssessmentCenter,
              createdBy: parseInt(userId),
              fkIncidentId: localStorage.getItem("fkincidentId"),
            }
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
        }
        catch(error){
          setMessage("Something went worng!");
          setMessageType("error");
          setOpen(true);
        }
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
        } 
       
      }

      // Case when form has No option selected.
    } else {
      // When no is selected we just have to send the comment and yes/no flag to API via put request.
      const temp = incidentsListData;
      temp.isPersonDetailsAvailable =
        personAffect || incidentsListData.isPersonDetailsAvailable;
      temp.updatedAt = moment(new Date()).toISOString();
      temp.personAffectedComments =
        personAffectedComments || incidentsListData.personAffectedComments;
      try{
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
        temp
      );
      }catch(error){
        setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
      }

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
      } else if (nextPath.propertyAffect === "Yes") {
        history.push(
          "/app/incident-management/registration/initial-notification/property-affected/"
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
    try{
    const res = await api.get("api/v1/lists/8/value");
    const result = res.data.data.results;
    setIndividualAffecctValue(result);
    }
    catch(error){
      setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
    }
  };

  // Fetch the dropdown values for the Person-Type.
  const fetchPersonTypeValue = async () => {
    try{
    const res = await api.get("api/v1/lists/71/value");
    const result = res.data.data.results;
    setPersonTypeValue(result);
    }
    catch(error){
      setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
    }
  };

  // fetch the values for the Departments.
  const fetchDepartmentValue = async () => {
    try{
    const res = await api.get("api/v1/lists/10/value");
    const result = res.data.data.results;
    setDepartmentValue(result);
    }
    catch(error){
      setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
    }
  };

  // Fetch the radio buttons for the "Was that person taken to medical care?".
  const fetchPersonTakenMedicalCare = async () => {
    try{
    const res = await api.get("api/v1/lists/11/value");
    const result = res.data.data.results;
    setMedicalCareValue(result);
    }catch(error){
      setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
    }
  };

  // Fetch the incident details. We are fetching it to pre-populate the data in case of the going
  // previous page.
  const fetchIncidentsData = async () => {
    try{
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );

    if (res.status === 200) {
      const result = res.data.data.results;
      const isavailable = result.isPersonDetailsAvailable;
      setPersonAffect(isavailable);

      setIncidentsListdata(result);
      if (!id) {
        await setIsLoading(true);
      }
    }
  }catch(error){
    setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
  }
  };

  // Fetch the individual page data in case of the update.
  const fetchPersonListData = async () => {
    try{
    const res = await api.get(`api/v1/incidents/${id}/people/`);
    const result = res.data.data.results;
    await setPeopleData(result);
    if (result.length > 0) {
      let temp = [...form]
      temp = result
      await setForm(temp)
    }

    await setIsLoading(true);
  }catch(error){
    setMessage("Something went worng!");
        setMessageType("error");
        setOpen(true);
  }
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
                  Do you have details of individual affected?
                </FormLabel>
                <RadioGroup
                  className={classes.inlineRadioGroup}
                  aria-label="personAffect"
                  name="personAffect"
                  value={personAffect || ""}
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
                    <Box borderTop={1} paddingTop={2} borderColor="grey.300">
                      <Typography variant="h6">
                        Details of people affected
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {form.map((value, key) => (
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
                        required
                        error={error && error[`personType${[key]}`]}
                        className={classes.formControl}
                      >
                        <InputLabel id="person-type-label">
                          Person type
                        </InputLabel>
                        <Select
                          labelId="person-type-label"
                          id={`person-type${key}`}
                          label="Person type"
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
                        required
                        className={classes.formControl}
                        error={error && error[`personDepartment${[key]}`]}
                      >
                        <InputLabel id="dep-label">Department</InputLabel>
                        <Select
                          labelId="dep-label"
                          id={`person-department${id}`}
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
                      <TextField
                        id={`name-Affected${key}`}
                        variant="outlined"
                        error={error && error[`personName${[key]}`]}
                        helperText={
                          error && error[`personName${[key]}`]
                            ? error[`personName${[key]}`]
                            : null
                        }
                        required
                        label="Name of person affected"
                        className={classes.formControl}
                        value={value.personName || ""}
                        onChange={(e) => handleForm(e, key, "personName")}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        id={`id-num${key}`}
                        variant="outlined"
                        error={
                          error && error[`personIdentification${[key]}`]
                        }
                        helperText={
                          error && error[`personIdentification${[key]}`]
                            ? error[`personIdentification${[key]}`]
                            : null
                        }
                        label="Identification number of person"
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
                        error={
                          error && error[`personMedicalCare${[key]}`]
                            ? error[`personMedicalCare${[key]}`]
                            : null
                        }
                      >
                        <FormLabel component="legend">
                          Was that person taken to medical care?
                        </FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          aria-label="personAffect"
                          name="personAffect"
                          aria-required
                          defaultValue={
                            value.personMedicalCare === "N/A"
                              ? "Don't Know"
                              : value.personMedicalCare
                          }
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
                        {error && error[`personMedicalCare${[key]}`] && (
                          <FormHelperText>
                            {error[`personMedicalCare${[key]}`]}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item md={6}>
                      <TextField
                        id={`worker-taken${key}`}
                        error={
                          error && error[`workerOffsiteAssessment${[key]}`]
                        }
                        helperText={
                          error && error[`workerOffsiteAssessment${[key]}`]
                            ? error[`workerOffsiteAssessment${[key]}`]
                            : null
                        }
                        variant="outlined"
                        label="Worker taken offsite for further assessment?"
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
                        id={`location-details${key}`}
                        error={
                          error && error[`locationAssessmentCenter${[key]}`]
                        }
                        helperText={
                          error && error[`locationAssessmentCenter${[key]}`]
                            ? error[`locationAssessmentCenter${[key]}`]
                            : null
                        }
                        label="Location details of assessment center?"
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
                          startIcon={<DeleteForeverIcon />}
                          color="primary"
                          className={classes.button}
                        >
                          Remove
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                ))}

                <Grid item md={12}>
                  <button
                    className={classes.textButton}
                    onClick={() => addNewPeopleDetails()}
                  >
                    <PersonAddIcon /> Add details of another person affected
                  </button>
                </Grid>
              </>
            ) : null}
            <Grid item md={12}>
              {personAffect === "Yes" ? null : (
                <TextField
                  id="details-of-people-affected"
                  multiline
                  rows="3"
                  variant="outlined"
                  label="Details of people affected"
                  className={classes.fullWidth}
                  onChange={(e) => setPersonAffectedComments(e.target.value)}
                  defaultValue={incidentsListData.personAffectedComments}
                />
              )}
            </Grid>
            <AlertMessage
                message={message}
                type={messageType}
                open={open}
                setOpen={setOpen}
              />
            <Grid item md={6}>
              <Button
                onClick={() =>
                  history.push(
                    `/app/incident-management/registration/initial-notification/incident-details/${localStorage.getItem(
                      "fkincidentId"
                    )}`
                  )
                }
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
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="People affected"
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