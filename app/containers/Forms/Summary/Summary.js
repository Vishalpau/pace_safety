import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { PapperBlock } from "dan-components";
import CheckCircle from "@material-ui/icons/CheckCircle";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import api from "../../../utils/axios";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";

// Styles
import Styles from "dan-styles/Summary.scss";
import Type from "dan-styles/Typography.scss";
import Fonts from "dan-styles/Fonts.scss";
import moment from "moment";

import IncidentDetails from "../../Forms/InitialNotification/IncidentDetails";

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
  statusButton: {
    borderRadius: 4,
    fontSize: 12,
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Summary = () => {
  const [initialNotification, setInitialNotification] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [peopleData, setPeopleData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [enviornmentData, setEnviornmentData] = useState([]);
  const [equipmentData, setEquipmentData] = useState([]);
  const [reportsData, setReportsData] = useState([]);

  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handelInitialNotification = (e) => {
    setInitialNotification(!initialNotification);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchIncidentData = async () => {
    const allIncidents = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    await setIncidents(allIncidents.data.data.results);
  };
  const fetchPeopleAffectData = async () => {
    const response = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/people/`
    );
    await setPeopleData(response.data.data.results);
  };
  const fetchPropertyAffectData = async () => {
    const response = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/properties/`
    );
    await setPropertyData(response.data.data.results);
  };
  const fetchEquipmentAffectData = async () => {
    const response = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/equipments/`
    );
    await setEquipmentData(response.data.data.results);
  };
  const fetchEnviornmentAffectData = async () => {
    const response = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/environment/`
    );
    await setEnviornmentData(response.data.data.results);
  };
  const fetchReportsData = async () => {
    const response = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/reports/`
    );
    await setReportsData(response.data.data.results);
  };

  useEffect(() => {
    fetchIncidentData();
    fetchPeopleAffectData();
    fetchPropertyAffectData();
    fetchEquipmentAffectData();
    fetchEnviornmentAffectData();
    fetchReportsData();
  }, []);

  console.log(incidents);
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();

  return (
    <div>
      {/* header */}

      <Box paddingBottom={1}>
        <div className={Styles.incidents}>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              endIcon={<CheckCircle />}
              className={classes.statusButton}
              onClick={(e) => handelInitialNotification(e)}
            >
              Initial Notification
            </Button>
            <Typography variant="caption">Done</Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              endIcon={<CheckCircle />}
              className={classes.statusButton}
            >
              Investigation
            </Button>
            <Typography variant="caption">Done</Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={classes.statusButton}
              endIcon={<AccessTime />}
            >
              Evidence
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              className={classes.statusButton}
            >
              Root Cause & Analysis
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<AccessTime />}
              className={classes.statusButton}
            >
              Lessions Learnt
            </Button>
            <Typography variant="caption">Pending</Typography>
          </div>
        </div>
      </Box>
      <Divider />

      {/* summary and part */}
      {initialNotification == false ? (
        // Object.entries(incidents).map((item) =>(
        <PapperBlock
          title={`Incident Number:${incidents["incidentNumber"]}`}
          icon="ion-md-list-box"
        >
          <Grid container spacing={5}>
            <Grid container item md={9} spacing={3}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Overview
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">
                  {/* {item[1]["incidentTitle"]} */}
                  {incidents.incidentTitle}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident on
                </Typography>
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {moment(incidents["incidentOccuredOn"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  )}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported on
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {moment(incidents["incidentReportedOn"]).format(
                    "Do MMMM YYYY, h:mm:ss a"
                  )}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Reported by
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentReportedByName"]}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Type
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentReportedByName"]}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incidnet Description
                </Typography>

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentDetails"]}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Immediate Action Taken
                </Typography>

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["immediateActionsTaken"]}
                </Typography>
              </Grid>

              <Grid item md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Incident Location
                </Typography>

                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["incidentLocation"]}
                </Typography>
              </Grid>

              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Contractor
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["contractor"]}
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  Sub-contractor
                </Typography>

                <Typography
                  variant="body"
                  color="textSecondary"
                  className={Fonts.labelValue}
                >
                  {incidents["subContractor"]}
                </Typography>
              </Grid>
              {peopleData.length !== 0
                ? 
              <Grid item md={12}>
                <Typography variant={12}>Peoples Affected</Typography>
              </Grid>:null}
              {peopleData.length !== 0
                ? peopleData.map((peopledata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of People{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Department{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personDepartment}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Name{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personName}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Identification Number{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personIdentification}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Person Department{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.personDepartment}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Location{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.locationAssessmentCenter}{" "}
                        </Typography>
                      </Grid>

                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Worker offsite Assesments{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {peopledata.workerOffsiteAssessment}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                {propertyData.length !== 0
                ?
              <Grid item md={12}>
                <Typography variant={12}>Property Affect</Typography>
              </Grid>:null}
              {propertyData.length !== 0
                ? propertyData.map((propertydata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of property{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Property Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.propertyType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Property other type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.propertyOtherType}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Damage Details{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {propertydata.damageDetails}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                {equipmentData.length !== 0
                ?
              <Grid md={12}>
                <Typography>Equipment Affected</Typography>
              </Grid>:null}
              {equipmentData.length !== 0
                ? equipmentData.map((equipmentdata, key) => (
                    <Grid container item md={9} spacing={3} key={key}>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentType}{" "}
                        </Typography>
                      </Grid>
                      <Grid item md={12}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {key + 1}: Details of Equipment{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Details{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentDeatils}{" "}
                        </Typography>
                      </Grid>
                      <Grid lg={6} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          Equipment Other type{" "}
                        </Typography>
                        <Typography
                          variant="p"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          {" "}
                          {equipmentdata.equipmentOtherType}{" "}
                        </Typography>
                      </Grid>
                    </Grid>
                  ))
                : null}
                 {enviornmentData.length !== 0
                ?
              <Grid md={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  className={Fonts.labelName}
                >
                  {" "}
                  Enviroment Affected{" "}
                </Typography>
              </Grid>:null}
              {enviornmentData.length !== 0
                ? enviornmentData.map((envData) => (
                    <>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any release?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envQuestion}
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any impact on wildlife?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envQuestionOption}
                        </Typography>
                      </Grid>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Where there any waterbody affected?
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {envData.envAnswerDetails}
                        </Typography>
                      </Grid>
                    </>
                  ))
                : null}
              {reportsData.length !== 0 ? (
                <Grid md={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    className={Fonts.labelName}
                  >
                    {" "}
                    Report & Noticefication{" "}
                  </Typography>
                </Grid>
              ) : null}
              {reportsData.length !== 0
                ? reportsData.map((report) => (
                    <>
                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Reported To
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {report.reportTo}
                        </Typography>
                      </Grid>

                      <Grid item md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Report Description
                        </Typography>

                        <Typography
                          variant="body"
                          color="textSecondary"
                          className={Fonts.labelValue}
                        >
                          {report.reportingNote}
                        </Typography>
                      </Grid>
                    </>
                  ))
                : null}
              <Grid item md={6}>
                {/* <Typography varint="p">Incident report for review</Typography> */}
                {/* <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Reviewed by</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Reviewed by"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>

              <Grid item md={6}>
                {/* <Typography varint="p">Reviewed On</Typography> */}

                {/* <FormControl variant="outlined" className={classes.formControl}>
                  {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      inputVariant="outlined"
                      label="Reviewed On"
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl> */}
              </Grid>

              <Grid item md={6}>
                {/* <Typography varint="p">Action item</Typography> */}
                {/* <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Closed By</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Closed By"
                  >
                    {selectValues.map((selectValues) => (
                      <MenuItem value={selectValues}>{selectValues}</MenuItem>
                    ))}
                  </Select>
                </FormControl> */}
              </Grid>

              <Grid item md={6}>
                {/* <Typography varint="p">Closed on</Typography> */}

                {/* <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={selectedDate}
                      onChange={handleDateChange}
                      label="Closed On"
                      inputVariant="outlined"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </FormControl> */}
              </Grid>

              <Grid item md={12}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="http://localhost:3000/app/incident-management/registration/lession-learned/lession-learned/"
                >
                  Submit
                </Button> */}
              </Grid>
            </Grid>

            {/* sidebar */}
            <Grid item xs={12} md={3}>
              <Paper>
                <List
                  dense
                  subheader={
                    <ListSubheader component="div">Actions</ListSubheader>
                  }
                >
                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <a
                      href={`/app/incident-management/registration/initial-notification/incident-details/${localStorage.getItem(
                        "fkincidentId"
                      )}`}
                    >
                      <ListItemText primary="Modify Notification" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/investigation/initial-details/">
                      <ListItemText primary="Modify Investigation" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/evidence/evidence/">
                      <ListItemText primary="Add Evidence" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/root-cause-analysis/details/">
                      <ListItemText primary="Perform RCA" />
                    </a>
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <a href="/app/incident-management/registration/lession-learned/lession-learned/">
                      <ListItemText primary="Lessions Learnt" />
                    </a>
                  </ListItem>

                  <ListItem button divider>
                    <ListItemIcon>
                      <Close />
                    </ListItemIcon>
                    <ListItemText primary="Close Out" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem>

                  <ListItem button>
                    <ListItemIcon>
                      <History />
                    </ListItemIcon>
                    <ListItemText primary="Activity History" />
                  </ListItem>
                </List>
                <Divider />
                <List dense>
                  <ListItem button>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <ListItemText primary="Print" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Share />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </PapperBlock>
      ) : (
        // ))

        <IncidentDetails />
      )}
    </div>
  );
};

export default Summary;
