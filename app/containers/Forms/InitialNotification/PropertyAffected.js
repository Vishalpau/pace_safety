import React,{useState} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
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
import PropertyValidate from "../../Validator/PropertyValidation"


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
}));

const PropertyAffected = () => {

  const [form, setForm] = useState({
    detailpropertyaffected:"",
    affectedproperty:{
                      propertytype:"",
                      describe:"",
                      damage:""
                    },
    describeactiontaken:""
  })

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

  const [error,setError] = useState({})

  function handelNext(e){
    console.log(form)
    const { error, isValid } = PropertyValidate(form)
    setError(error)
    console.log(error,isValid)
  }

  const classes = useStyles();
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            <Box marginBottom={5}>
              <FormHeader selectedHeader={"Initial notification"} />
            </Box>
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
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          detailpropertyaffected: e.target.value,
                        });
                      }}
                    />
                  ))}
                  {error && error.detailpropertyaffected && <p>{error.detailpropertyaffected}</p> }
                </Grid>

                <Grid item md={12}>
                  <Box marginTop={2} marginBottom={2}>
                    {/* <h4>Details of people affected</h4> */}
                    <Typography variant="h6">
                      Details of properties affected
                    </Typography>
                  </Box>
                </Grid>

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
                      onChange={(e) => {
                        setForm({
                          ...form,
                          affectedproperty: {...form.affectedproperty,
                                                propertytype:e.target.value.toString()},
                        });
                      }}
                    >
                      {selectValues.map((selectValues) => (
                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {error && error.propertytype && <p>{error.propertytype}</p> }
                </Grid>

                <Grid item md={6}>
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
                  {error && error.describe && <p>{error.describe}</p> }
                </Grid>

                <Grid item md={12}>
                  {/* <p>Name of people affected</p> */}
                  <TextField
                    id="name-affected"
                    variant="outlined"
                    label="Describe the damage"
                    className={classes.formControl}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        affectedproperty: {...form.affectedproperty,
                                              damage:e.target.value.toString()},
                      });
                    }}
                  />
                  {error && error.damage && <p>{error.damage}</p> }
                </Grid>

                <Grid item md={12}>
                  <button className={classes.textButton}>
                    <PersonAddIcon /> Add details of another person affected
                  </button>
                </Grid>

                <Grid item md={12}>
                  {/* <p>Comments</p> */}
                  <TextField
                    id="comments"
                    multiline
                    rows="3"
                    variant="outlined"
                    label="Describe any actions taken"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        describeactiontaken: e.target.value,
                      });
                    }}
                  />
                  {error && error.describeactiontaken && <p>{error.describeactiontaken}</p> }
                </Grid>
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/peoples-afftected/"
                  >
                    Previouse
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e)=>handelNext(e)}
                    href={Object.keys(error).length === 0? 
                      "http://localhost:3000/app/incident-management/registration/initial-notification/eqiptment-affected/" 
                      : "#"}
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
