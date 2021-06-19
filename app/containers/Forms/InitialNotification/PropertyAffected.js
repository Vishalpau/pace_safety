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
import api from "../../../utils/axios";
import { useHistory } from "react-router";
import PropertyValidate from "../../Validator/PropertyValidation";

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

const PropertyAffected = () => {

  // const [form, setForm] = useState({
  //   detailpropertyaffected:"",
  //   affectedproperty:{
  //                     propertytype:"",
  //                     describe:"",
  //                     damage:""
  //                   },
  //   describeactiontaken:""
  // })
  const classes = useStyles();
  const history = useHistory();

  const [propertyAffectedValue, setPropertyAffectedValue] = useState([]);
  const [propertyTypeValue, setPropertyTypeValue] = useState([]);
  const [detailsOfPropertyAffect, setDetailsOfPropertyAffect] = useState("No");
  
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
  const handleChange = (event) => {
    setDetailsOfPropertyAffect(event.target.value);
  };
  const radioDecide = ["Yes", "No"];
  const radioDecideNew = ["Yes", "No", "N/A"];

  const [error, setError] = useState({});

  
  const [form, setForm] = useState([
    {
      propertyType: "",
      propertyOtherType: "",
      damageDetails: "",
      fkIncidentId: localStorage.getItem("fkincidentId"),
      createdBy:2
    },
  ]);
  const addNewPropertyDetails = () => {
    // alert('ram')
    setForm([
      ...form,
      {
        propertyType: "",
        propertyOtherType: "",
        damageDetails: "",
        fkIncidentId: localStorage.getItem("fkincidentId"),
        createdBy:2
      },
    ]);
  };
  const handlePropertyType = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
    console.log(temp);
    setForm(temp);
  };
  const handlePropertyOtherType = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
    console.log(temp);
    setForm(temp);
  };
  const handleDamageDetails = (e, key, fieldname) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key][fieldname] = value;
    console.log(temp);
    setForm(temp);
  };
  const handleNext = async () => {
    console.log(form);
    const { error, isValid } = PropertyValidate(form);
    setError(error);
    console.log(error, isValid);

    // window.location.href = '/app/incident-management/registration/initial-notification/eqiptment-affected/'
    if (detailsOfPropertyAffect === "Yes") {
      console.log(form);
      let status=0
      for(var i = 0; i < form.length;i++){
        const res = await api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/properties/`,form[i]);
        console.log(res)
        status= res.status
        
      }
      if(status === 201){
        history.push("/app/incident-management/registration/initial-notification/eqiptment-affected/");
      }
      
    } else {
      history.push(
        "/app/incident-management/registration/initial-notification/eqiptment-affected/"
      );
    }
  };

  const fetchPropertyAffectedValue = async () => {
    const res = await api.get("api/v1/lists/12/value");
    const result = res.data.data.results;
    setPropertyAffectedValue(result);
  };
  const fetchPropertyTypeValue = async () => {
    const res = await api.get("api/v1/lists/13/value");
    const result = res.data.data.results;
    setPropertyTypeValue(result);
  };

  useEffect(() => {
    fetchPropertyAffectedValue();
    fetchPropertyTypeValue();
  }, []);

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
                Details of proprties Affected?
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={12}>
                  <Typography variant="body2">
                    Do you have details to share about the properties affected?
                  </Typography>
                  {/* <p>Do you have details of individual effected?</p>   */}
                  <RadioGroup
                    aria-label="detailsOfPropertyAffect"
                    name="detailsOfPropertyAffect"
                    value={detailsOfPropertyAffect}
                    onChange={handleChange}
                  >
                    {propertyAffectedValue !== 0
                      ? propertyAffectedValue.map((value, index) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                          />
                        ))
                      : null}
                  </RadioGroup>
                </Grid>
                {detailsOfPropertyAffect === "Yes" ? (
                  <>
                    <Grid item md={12}>
                      <Box marginTop={2} marginBottom={2}>
                        {/* <h4>Details of people affected</h4> */}
                        <Typography variant="h6">
                          Details of properties affected
                        </Typography>
                      </Box>
                    </Grid>
                    {form.map((value, index) => (
                      <>
                        <Grid item md={6}>
                          {/* <p>person type</p> */}
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel id="person-type-label">
                              Property type
                            </InputLabel>
                            <Select
                              labelId="person-type-label"
                              id="person-type"
                              label="Person type"
                              onChange={(e) =>
                                handlePropertyType(e, index, "propertyType")
                              }
                            >
                              {propertyTypeValue.length !== 0
                                ? propertyTypeValue.map(
                                    (selectValues, index) => (
                                      <MenuItem
                                        key={index}
                                        value={selectValues.inputValue}
                                      >
                                        {selectValues.inputLabel}
                                      </MenuItem>
                                    )
                                  )
                                : null}
                            </Select>
                          </FormControl>
                          {error && error[`propertyType${[index]}`] && (
                            <p>{error[`propertyType${[index]}`]}</p>
                          )}
                        </Grid>

                        <Grid item md={6}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="if others, describe"
                            className={classes.formControl}
                            onChange={(e) =>
                              handlePropertyOtherType(
                                e,
                                index,
                                "propertyOtherType"
                              )
                            }
                          />
                          {error && error[`propertyOtherType${[index]}`] && (
                            <p>{error[`propertyOtherType${[index]}`]}</p>
                          )}
                        </Grid>

                        {/* <Grid item md={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="dep-label">if others, describe</InputLabel>
                    <Select
                    labelId="dep-label"
                    id="dep"
                    label="Department"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        affectedproperty: {...form.affectedproperty,
                                              describe:e.target.value.toString()},
                      });
                    }}
                    >
                      {selectValues.map((selectValues) => (
                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}

                        <Grid item md={12}>
                          {/* <p>Name of people affected</p> */}
                          <TextField
                            id="name-affected"
                            variant="outlined"
                            label="Describe the damage"
                            className={classes.formControl}
                            onChange={(e) =>
                              handleDamageDetails(e, index, "damageDetails")
                            }
                          />
                          {error && error[`damageDetails${[index]}`] && (
                            <p>{error[`damageDetails${[index]}`]}</p>
                          )}
                        </Grid>
                      </>
                    ))}
                    <Grid item md={12}>
                      <button
                        className={classes.textButton}
                        onClick={() => addNewPropertyDetails()}
                      >
                        <PersonAddIcon /> Add details of another person affected
                      </button>
                    </Grid>
                  </>
                ) : null}
                <Grid item md={12}>
                  {/* <p>Comments</p> */}
                  <TextField
                    id="comments"
                    multiline
                    rows="3"
                    variant="outlined"
                    label="Describe any actions taken"
                    className={classes.fullWidth}
                    // onChange={(e) => {
                    //   setForm({
                    //     ...form,
                    //     describeactiontaken: e.target.value,
                    //   });
                    // }}
                  />
                  {/* {error && error.describeactiontaken && <p>{error.describeactiontaken}</p> } */}
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => {
                      window.history.back();
                    }}
                    // href="http://localhost:3000/app/incident-management/registration/initial-notification/peoples-afftected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    // href="http://localhost:3000/app/incident-management/registration/initial-notification/eqiptment-affected/"
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  listOfItems={INITIAL_NOTIFICATION_FORM}
                  selectedItem={"Property affected"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default PropertyAffected;
