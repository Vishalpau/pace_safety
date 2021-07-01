import React, { useEffect, useState, useRef } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { AccessAlarm, ThreeDRotation } from "@material-ui/icons";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { HAZARDIOUS_ACTS_SUB_TYPES, HAZARDIOUS_CONDITION_SUB_TYPES } from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  list: {
    maxWidth: "300px",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}

const BasicCauseAndAction = () => {
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
  const [data, setData] = useState([])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handelShowData = async () => {
    let tempApiData = {}
    let subTypes = HAZARDIOUS_ACTS_SUB_TYPES.concat(HAZARDIOUS_CONDITION_SUB_TYPES)
    let acts = ["Supervision", "Workpackage", "Equipment and Machinery", "Behaviour Issue", "Safety Issues", "Ergonimics", "Procedures", "Other in acts",
      "Warning system", "Energy types", "Tools", "Safety items", "Others in conditions"]

    let previousData = await api.get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`)

    let allApiData = previousData.data.data.results
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        let valueQuestion = value.rcaSubType
        let valueAnser = value.rcaRemark
        tempApiData[valueQuestion] = valueAnser.includes(",") ? valueAnser.split(",") : [valueAnser]
      }
    })
    // Object.entries(tempApiData).forEach(([key, value], index) => {
    //   tempApiData[acts[index]] = tempApiData[key]
    // });
    await setData(tempApiData)
  }

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const radioDecide = ["Yes", "No"];

  let form_link = window.location.href;
  const classes = useStyles();

  useEffect(() => {
    handelShowData()
  }, []);

  return (
    <Container>
      {console.log(data)}
      <Paper>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Actions against Immediate Causes
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item md={9} spacing={3}>
              <Grid item md={4}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Incident number: {localStorage.getItem("fkincidentId")}
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={8}>
                <Box>
                  <Typography variant="body2" gutterBottom>
                    Method: 5 Why Analysis
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    Actions
                  </Typography>
                </Box>
              </Grid>

              <Grid item md={12}>
                <Box marginBottom={2}>
                  <Typography variant="body">
                    Option selected from hazardious acts and condition
                  </Typography>
                </Box>

                <Box>
                  <List className={classes.list} dense disablePadding>
                    {/* console.log(`${key}: ${value}`) */}

                    {Object.entries(data).map(([key, value]) => (
                      < div>
                        <ListItem>
                          <ListItemText primary={key} />
                        </ListItem>
                        {value.map((value) => (
                          <ListItemLink href="#">
                            <ListItemText primary={<small>{value}</small>} />
                          </ListItemLink>
                        ))}
                        <button className={classes.textButton}>
                          <AddCircleOutlineIcon /> Add a new action
                        </button>
                      </div>
                    ))}

                  </List>


                </Box>
              </Grid>


              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/hazardious-condtions/"
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  href="http://localhost:3000/app/incident-management/registration/root-cause-analysis/basic-cause/"
                >
                  Next
                </Button>
              </Grid>
            </Grid>
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Cause and action"}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container >
  );
};

export default BasicCauseAndAction;
