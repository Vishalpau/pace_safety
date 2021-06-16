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
  KeyboardTimePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import moment from 'moment'


import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { func } from "prop-types";
import validate from "../../Validator/validation"

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

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18")
  );

  const [selectedTime, setSelectedTime] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const [error,setError] = useState({})

  const selectValues = [1, 2, 3, 4];
  const companyName = ["ABC Ltd","XYZ steel","ABA power","XDA works"]
  const radioDecide = ["Yes", "No", "N/A"];

  const [listData, setListData] = useState([]);
  const [form, setForm] = useState({projectname:"",
                                    unitname:"",
                                    incidenttype:"",
                                    incidentdata:"2021/09/06",
                                    incidenttime:"21:11:54",
                                    title:"",
                                    description:"",
                                    immediateactiontaken:"",
                                    location:"",
                                    contractor:"",
                                    subcontractor:"",
                                    personaffected:"",
                                    propertyaffected:"",
                                    equiptmenteffected:"",
                                    environmentaffected:""
})

  function handelNext(e){
    console.log(form)
    const { error, isValid } = validate(form)
    setError(error)
    console.log(error,isValid)
  }

  const handleDateChange = (date) => {
    let onlyDate = moment(date).format('YYYY/DD/MM')
    console.log(onlyDate)
    setForm({
      ...form,
      incidentdata: onlyDate,
    });
  };

  const handelTimeChange = (date) => {
    let onlyTime = moment(date).format('HH:mm')
    setForm({
      ...form,
      incidenttime: onlyTime,
    });
  }

  useEffect(async()=>{
    const res = await API.get('api/v1/lists/');

    const result = res.data.data.results
    setListData(result)

  },[])

  
  return (
    <div>
      <Container>
        <Box padding={3} bgcolor="background.paper">
          <Box marginBottom={5}>
            <FormHeader selectedHeader={"Initial notification"} />
          </Box>
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
                  <InputLabel id="project-name-label">Project Name</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Project Name"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        projectname: e.target.value,
                      });
                    }}
                  >
                    {companyName.map((selectValues) => (
                      <MenuItem 
                        value={selectValues} 
                      >
                        {selectValues}
                        </MenuItem>
                    ))}
                  </Select>
                  {error && error.projectname && <p>{error.projectname}</p> }
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>


              {/* unit name */}
              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">Unit Name</InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Unit Name"
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
                  {error && error.unitname && <p>{error.unitname}</p> }
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
                    onChange={(e) => {
                      setForm({
                        ...form,
                        incidenttype: toString(e.target.value),
                      });
                    }}
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                  {error && error.incidenttype && <p>{error.incidenttype}</p> }
                </FormControl>
              </Grid>
              

              {/* date */}
              <Grid item md={6}>
                <MuiPickersUtilsProvider
                  variant="outlined"
                  utils={DateFnsUtils}
                >

                <KeyboardDatePicker
                  placeholder="2018/10/10"
                  value={new Date(form.incidentdata)}
                  onChange={date => handleDateChange(date)}
                  format="yyyy/MM/dd"
                />

                 
                </MuiPickersUtilsProvider>
              </Grid>
              
              {/* time */}

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                 
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time picker"
                  // defaultValue="05:30 AM"
                  value = {selectedTime}
                  onChange={date => handelTimeChange(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
                  format="HH:mm"
                />
                </MuiPickersUtilsProvider>
              </Grid>


              {/* title */}
              <Grid item lg={12} md={6} sm={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Title"
                  className={classes.fullWidth}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      title: e.target.value,
                    });
                  }}
                />
                {error && error.title && <p>{error.title}</p> }
              </Grid>
              

              {/* description */}
              <Grid item md={12}>
                <TextField
                  multiline
                  variant="outlined"
                  rows="5"
                  id="description"
                  label="Description"
                  className={classes.fullWidth}

                  onChange={(e) => {
                    setForm({
                      ...form,
                      description: e.target.value,
                    });
                  }}
                  
                />
                {error && error.description && <p>{error.description}</p> }
              </Grid>
              

              {/* immediate-actions */}
              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  id="immediate-actions"
                  multiline
                  rows="4"
                  label="Any immediate actions taken"
                  className={classes.fullWidth}

                  onChange={(e) => {
                    setForm({
                      ...form,
                      immediateactiontaken: e.target.value,
                    });
                  }}
                />
                {error && error.immediateactiontaken && <p>{error.immediateactiontaken}</p> }
              </Grid>
              

              {/* location */}
              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Location"
                  className={classes.fullWidth}

                  onChange={(e) => {
                    setForm({
                      ...form,
                      location: e.target.value,
                    });
                  }}
                />
                {error && error.location && <p>{error.location}</p> }
              </Grid>


              {/* contractor */}
              <Grid item md={6}>
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
              </Grid>

              {/* sub contractor */}
              <Grid item md={6}>
                <TextField
                  id="filled-basic"
                  label="Sub-Contractor"
                  variant="outlined"
                  required
                  className={classes.formControl}

                  onChange={(e) => {
                    setForm({
                      ...form,
                      subcontractor: e.target.value,
                    });
                  }}
                />
                {error && error.subcontractor && <p>{error.subcontractor}</p> }
              </Grid>
              
              {/* person affected */}
              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>Were any person affected during incident?</p>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}

                      onChange={(e) => {
                        setForm({
                          ...form,
                          personaffected: e.target.value,
                        });
                      }}
                    />
                  ))}
                </div>
                {error && error.personaffected && <p>{error.personaffected}</p> }
              </Grid>

              {/* propery damaged */}
              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>Was any propery damaged during incident?</p>
                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}

                      onChange={(e) => {
                        setForm({
                          ...form,
                          propertyaffected: e.target.value,
                        });
                      }}
                    />
                  ))}
                </div>
                {error && error.propertyaffected && <p>{error.propertyaffected}</p> }
              </Grid>

              {/* equiptment damaged */}
              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>Was there any equiptment damaged?</p>

                  {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      control={<Radio />}
                      label={value}

                      onChange={(e) => {
                        setForm({
                          ...form,
                          equiptmenteffected: e.target.value,
                        });
                      }}
                    />
                  ))}
                </div>
                {error && error.equiptmenteffected && <p>{error.equiptmenteffected}</p> }
              </Grid>

              {/* environment impact */}
              <Grid item md={12}>
                <p>Was there any environment impact?</p>

                {radioDecide.map((value) => (
                  <FormControlLabel
                    value={value}
                    control={<Radio />}
                    label={value}

                    onChange={(e) => {
                      setForm({
                        ...form,
                        environmentaffected: e.target.value,
                      });
                    }}
                  />
                ))}
                {error && error.environmentaffected && <p>{error.environmentaffected}</p> }
              </Grid>

              <Grid item md={12}>
                <Box marginTop={4}>
                  <Button
                    href= {Object.keys(error).length === 0? 
                          "http://localhost:3000/app/incident-management/registration/initial-notification/peoples-afftected/" 
                          : "#"}
                    type=  "button"
                    size="medium"
                    variant="contained"
                    color="primary"
                    onClick={(e)=>handelNext(e)}
                  >
                    Next
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                listOfItems={INITIAL_NOTIFICATION_FORM}
                selectedItem={"Incident details"}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default IncidentDetails;
