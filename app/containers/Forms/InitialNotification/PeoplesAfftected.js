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
import FormSideBar from "../FormSideBar";

import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import PeopleValidate from "../../Validator/PeopleValidation";
import { useHistory } from "react-router";
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
}));
const PeoplesAffected = () => {
  // const [form, setForm] = useState({
  //   detailindividualeffected: "",
  //   affectedpersons: {
  //     persontype: "",
  //     department: "",
  //     name: "",
  //     idnumber: "",
  //     ismedicalcare: "",
  //     offsiteassesment: "",
  //     locationdetails: "",
  //   },
  //   describeactiontaken: "",
  // });
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];
  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const radioDecide = ["Yes", "No"];
  const radioDecideNew = ["Yes", "No", "N/A"];
  const classes = useStyles();
  const history = useHistory();

  const [personAffect, setPersonAffect] = useState('No')
  const [individualAffectValue, setIndividualAffecctValue] = useState([]);
  const [personTypeValue, setPersonTypeValue] = useState([]);
  const [departmentValue, setDepartmentValue] = useState([]);
  const [medicalCareValue, setMedicalCareValue] = useState([]);

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
      fkIncidentId: 3,
    },
  ]);
  const addNewPeopleDetails = () => {
    // alert('ram')
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
        fkIncidentId: localStorage.getItem("fkincidentId")
      },
    ]);
  };
  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
    console.log(temp);
    setForm(temp);
  };

  const handleNext = async () => {
    console.log(form);
    const { error, isValid } = PeopleValidate(form);
    setError(error);
    console.log(error, isValid);
    //
    // window.location.href = '/app/incident-management/registration/initial-notification/eqiptment-affected/'
    if (personAffect === "Yes") {
      // alert('ram')
      for(var i = 0; i < form.length;i++){
        
        const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/people/`,form[i]);
       
      }
      history.push(
        "/app/incident-management/registration/initial-notification/property-affected/"
      );
    } else {
      history.push(
        "/app/incident-management/registration/initial-notification/property-affected/"
      );
    }
  };
  const [error, setError] = useState({});

  const fetchIndividualAffectValue = async()=>{
    const res = await api.get("api/v1/lists/8/value");
    const result = res.data.data.results;
    setIndividualAffecctValue(result);
  }

  const fetchPersonTypeValue = async()=>{
    const res = await api.get("api/v1/lists/9/value");
    const result = res.data.data.results;
    setPersonTypeValue(result);
  }

  const fetchDepartmentValue = async()=>{
    const res = await api.get("api/v1/lists/10/value");
    const result = res.data.data.results;
    setDepartmentValue(result);
  }

  const fetchPersonTakenMedicalCare = async()=>{
    const res = await api.get("api/v1/lists/11/value");
    const result = res.data.data.results;
    console.log(result)
    setMedicalCareValue(result);
  }

  useEffect(()=>{
    fetchIndividualAffectValue()
    fetchPersonTypeValue();
    fetchDepartmentValue();
    fetchPersonTakenMedicalCare();
  },[])
 
 
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box> */}
            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Details of Persons Affected
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item lg={12} md={6} sm={6}>
                  <Typography variant="body2">
                    Do you have details of individual effected?
                  </Typography>
                  {/* <p>Do you have details of individual effected?</p>   */}
                  <RadioGroup
                    aria-label="personAffect"
                    name="personAffect"
                    value={personAffect}
                    onChange={(e) => setPersonAffect(e.target.value)}
                  >
                  {individualAffectValue.map((value,key) => (
                    <FormControlLabel
                    key={key}
                      value={value.inputValue}
                      control={<Radio />}
                      label={value.inputLabel}
                     
                    />
                  ))}
                  {/* {error && error.detailindividualeffected && (
                    <p>{error.detailindividualeffected}</p>
                  )} */}
                  </RadioGroup>
                </Grid>
                {personAffect === 'Yes'?<>
                <Grid item md={12}>
                  <Box marginTop={2} marginBottom={2}>
                    {/* <h4>Details of people affected</h4> */}
                    <Typography variant="h6">
                      Details of people affected
                    </Typography>
                  </Box>
                </Grid>
                {form.map((value,key)=><>
                <Grid item md={6}>
                  {/* <p>person type</p> */}
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="person-type-label">Person type</InputLabel>
                    <Select
                      labelId="person-type-label"
                      id="person-type"
                      label="Person type"
                      onChange={(e)=>handleForm(e,key,'personType')}
                    >
                      {personTypeValue.length!==0?personTypeValue.map((selectValues,key) => (
                        <MenuItem key={key} value={selectValues.inputValue}>{selectValues.inputLabel}</MenuItem>
                      )):null}
                    </Select>
                  </FormControl>
                  {error && error[`personType${[key]}`] && (
                    <p>{error[`personType${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="dep-label">Department</InputLabel>
                    <Select
                      labelId="dep-label"
                      id="dep"
                      label="Department"
                      onChange={(e)=>handleForm(e,key,'personDepartment')}
                    >
                      {departmentValue.length!==0?departmentValue.map((selectValues,index) => (
                        <MenuItem key={index} value={selectValues.inputValue}>{selectValues.inputLabel}</MenuItem>
                      )):null}
                    </Select>
                  </FormControl>
                  {error && error[`personDepartment${[key]}`] && (
                    <p>{error[`personDepartment${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  {/* <p>Name of people affected</p> */}
                  <TextField
                    id="name-affected"
                    variant="outlined"
                    label="Name of people affected"
                    className={classes.formControl}
                    onChange={(e)=>handleForm(e,key,'personName')}
                  />
                  {error && error[`personName${[key]}`] && (
                    <p>{error[`personName${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  {/* <p>Identification number of person</p> */}
                  <TextField
                    id="id-num"
                    variant="outlined"
                    label="Identification number of person"
                    className={classes.formControl}
                    onChange={(e)=>handleForm(e,key,'personIdentification')}

                  />
                  {error && error[`personIdentification${[key]}`] && (
                    <p>{error[`personIdentification${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={12}>
                  <div className={classes.spacer}>
                    {/* <p>Was that person taken to medical care?</p> */}
                    <Typography variant="body2">
                      Was that person taken to medical care?
                    </Typography>
                    <RadioGroup
                    aria-label="personAffect"
                    name="personAffect"
                    value={value.personMedicalCare}
                    onChange={(e)=>handleForm(e,key,'personMedicalCare')}
                  >
                    {medicalCareValue.length!==0?medicalCareValue.map((value,index) => (
                      <FormControlLabel
                      key={index}
                        value={value.inputValue}
                        control={<Radio />}
                        label={value.inputLabel}
                        
                      />
                    )):null}
                    </RadioGroup>
                  </div>
                  {error && error[`personMedicalCare${[key]}`] && (
                    <p>{error[`personMedicalCare${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  {/* <p>Worker taken offisite for further assesment?</p> */}
                  <TextField
                    id="worker-taken"
                    variant="outlined"
                    label="Worker taken offisite for further assesment?"
                    className={classes.formControl}
                    onChange={(e)=>handleForm(e,key,'workerOffsiteAssessment')}
                  />
                  {error &&
                  error[`workerOffsiteAssessment${[key]}`] && (
                    <p>{error[`workerOffsiteAssessment${[key]}`]}</p>
                  )}
                </Grid>
                <Grid item md={6}>
                  {/* <p>Location details of assesment center</p> */}
                  <TextField
                    variant="outlined"
                    id="location-details"
                    label="Location details of assesment center?"
                    className={classes.formControl}
                    onChange={(e)=>handleForm(e,key,'locationAssessmentCenter')}
                  />
                   {error &&
                    error[`locationAssessmentCenter${[key]}`] && (
                      <p>{error[`locationAssessmentCenter${[key]}`]}</p>
                    )}
                </Grid>
                </>)}
                <Grid item md={12}>
                  <button className={classes.textButton} onClick={()=>addNewPeopleDetails()}>
                    <PersonAddIcon /> Add details of another person affected
                  </button>
                </Grid>
                </>:null}
                <Grid item md={12}>
                  {/* <p>Comments</p> */}
                  <TextField
                    id="comments"
                    multiline
                    rows="3"
                    variant="outlined"
                    label="Describe any actions taken"
                    className={classes.fullWidth}
                  />
                  {/* {error && error.describeactiontaken && (
                    <p>{error.describeactiontaken}</p>
                  )} */}
                </Grid>
                <Grid item md={6}>
                  <Button
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/incident-details/"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Previouse
                  </Button>
                  <Button
                    // href={
                    //   Object.keys(error).length === 0
                    //     ? "http://localhost:3000/app/incident-management/registration/initial-notification/property-affected/"
                    //     : "#"
                    // }
                    onClick={()=>handleNext()}
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
                  selectedItem={"Peoples affected"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};
export default PeoplesAffected;
