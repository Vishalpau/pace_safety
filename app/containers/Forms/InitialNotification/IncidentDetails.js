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
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

import FormSideBar from "../FormSideBar";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import FormHeader from "../FormHeader";

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
  spacer: {
    padding: ".75rem 0",
  },
}));

const IncidentDetails = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No", "N/A"];

  const [listData, setListData] = useState([]);
  const [incidentData, setIncidentData] = useState([]);
  const [personDuringIncident, setPersonDuringIncident] = useState([]);
  const [propertyDamage, setPropertyDamage] = useState([]);
  const [equipmentDamage, setEquipmentDamage] = useState([]);
  const [environmentDamage, setEnvironmentdamage] = useState([]);
  const [contractor, setContractor] = useState([]);
  const [subContractor, setSubContractor] = useState([]);

  const fetchListData = async () => {
    const res = await api.get("api/v1/lists/");

    const result = res.data.data.results;
    setListData(result);
  };
  const fetchIncidentData = async () => {
    const res = await api.get("api/v1/lists/1/value");

    const result = res.data.data.results;
    setIncidentData(result);
    console.log(result);
  };
  const fetchContractorData = async () => {
    const res = await api.get("api/v1/lists/2/value");

    const result = res.data.data.results;
    setContractor(result);
    console.log(result);
  };
  const fetchSubContractorData = async () => {
    const res = await api.get("api/v1/lists/3/value");

    const result = res.data.data.results;
    setSubContractor(result);
    console.log(result);
  };
  const fetchPersonDuringIncident = async () => {
    const res = await api.get("api/v1/lists/4/value");

    const result = res.data.data.results;
    setPersonDuringIncident(result);
    console.log(result);
  };
  const fetchPropertyDamage = async () => {
    const res = await api.get("api/v1/lists/5/value");

    const result = res.data.data.results;
    setPropertyDamage(result);
    console.log(result);
  };
  const fetchEquipmentDamage = async () => {
    const res = await api.get("api/v1/lists/6/value");

    const result = res.data.data.results;
    setEquipmentDamage(result);
    console.log(result);
  };
  const fetchEnviormentDamage = async () => {
    const res = await api.get("api/v1/lists/7/value");

    const result = res.data.data.results;
    setEnvironmentdamage(result);
    console.log(result);
  };

  useEffect(() => {
    fetchListData();
    fetchIncidentData();
    fetchContractorData();
    fetchSubContractorData();
    fetchPersonDuringIncident();
    fetchPropertyDamage();
    fetchEquipmentDamage();
    fetchEnviormentDamage();
  }, []);

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
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">Unit Name</InputLabel>
                  <Select
                    labelId="unit-name-label"
                    id="unit-name"
                    label="Unit Name"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <FormControl
                  variant="outlined"
                  requirement
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    {listData.length !== 0
                      ? listData[0].listLabel
                      : "Incident Type"}
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Incident Type"
                  >
                    {incidentData.length !== 0
                      ? incidentData.map((incident, index) => (
                          <MenuItem key={index} value={incident.inputValue}>
                            {incident.inputLabel}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider
                  variant="outlined"
                  utils={DateFnsUtils}
                >
                  <KeyboardDatePicker
                    label="Incident Date"
                    className={classes.formControl}
                    inputVariant="outlined"
                    required
                    id="date-picker-dialog"
                    format="dd/mm/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item md={6}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <TimePicker
                    label="Incident Time"
                    className={classes.formControl}
                    mask={[/\d/, /\d/, ":", /\d/, /\d/, " ", /a|p/i, "M"]}
                    clearable
                    required
                    value={selectedDate}
                    onChange={handleDateChange}
                    inputVariant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <Icon>access_time</Icon>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item lg={12} md={6} sm={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Title"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  multiline
                  variant="outlined"
                  rows="5"
                  id="description"
                  label="Description"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item md={12}>
                <TextField
                  variant="outlined"
                  id="immediate-actions"
                  multiline
                  rows="4"
                  label="Any immediate actions taken"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Location"
                  className={classes.fullWidth}
                />
              </Grid>

              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    {listData.length !== 0
                      ? listData[1].listLabel
                      : "Contractor"}
                  </InputLabel>
                  <Select
                    labelId="contractor-name-label"
                    id="contractor"
                    label={
                      listData.length !== 0
                        ? listData[1].listLabel
                        : "Contractor"
                    }
                  >
                    {contractor.length !== 0
                      ? contractor.map((value, index) => (
                          <MenuItem key={index} value={value.inputValue}>
                            {value.inputLabel}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item md={6}>
                <TextField
                  variant="outlined"
                  id="contractor"
                  label="Contractor"
                  required
                  className={classes.formControl}
                />
              </Grid> */}

              <Grid item md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="unit-name-label">
                    {listData.length !== 0
                      ? listData[2].listLabel
                      : "Sub-Contractor"}
                  </InputLabel>
                  <Select
                    labelId="contractor-name-label"
                    id="sub-contractor"
                    label={
                      listData.length !== 0
                        ? listData[2].listLabel
                        : "Sub-Contractor"
                    }
                  >
                    {subContractor.length !== 0
                      ? subContractor.map((value, index) => (
                          <MenuItem key={index} value={value.inputValue}>
                            {value.inputLabel}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>
                    {" "}
                    {listData.length !== 0
                      ? listData[3].listLabel
                      : "Were any person affected during incident?"}
                  </p>
                  {personDuringIncident.length !== 0
                    ? personDuringIncident.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value.inputValue}
                          control={<Radio />}
                          label={value.inputValue}
                        />
                      ))
                    : null}
                </div>
              </Grid>

              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>
                    {listData.length !== 0
                      ? listData[4].listLabel
                      : "Was any propery damaged during incident?"}
                  </p>
                  {propertyDamage.length !== 0
                    ? propertyDamage.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value.inputValue}
                          control={<Radio />}
                          label={value.inputLabel}
                        />
                      ))
                    : null}
                </div>
              </Grid>

              <Grid item md={12}>
                <div className={classes.spacer}>
                  <p>
                    {listData.length !== 0
                      ? listData[5].listLabel
                      : "Was there any equiptment damaged?"}
                  </p>

                  {equipmentDamage.length !== 0
                    ? equipmentDamage.map((value, index) => (
                        <FormControlLabel
                          key={index}
                          value={value.inputValue}
                          control={<Radio />}
                          label={value.inputLabel}
                        />
                      ))
                    : null}
                </div>
              </Grid>

              <Grid item md={12}>
                <p>
                  {listData.length !== 0
                    ? listData[6].listLabel
                    : "Was there any environment impact?"}
                </p>

                {environmentDamage.length !== 0
                  ? environmentDamage.map((value, index) => (
                      <FormControlLabel
                        value={value.inputValue}
                        control={<Radio />}
                        label={value.inputLabel}
                      />
                    ))
                  : null}
              </Grid>

              <Grid item md={12}>
                {/* {listData.map((item,index)=><h1 key={index}>{item.listLabel}</h1>)} */}
                <Box marginTop={4}>
                  <Button
                    href="http://localhost:3000/app/incident-management/registration/initial-notification/peoples-afftected/"
                    size="medium"
                    variant="contained"
                    color="primary"
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
