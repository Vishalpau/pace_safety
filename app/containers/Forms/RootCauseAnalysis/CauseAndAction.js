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
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import ListSubheader from "@material-ui/core/ListSubheader";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import {
  HAZARDIOUS_ACTS_SUB_TYPES,
  HAZARDIOUS_CONDITION_SUB_TYPES,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import FormDialog from "../ActionTracker"

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

const BasicCauseAndAction = () => {

  const [incidentDetail, setIncidentDetail] = useState({});

  const [data, setData] = useState([]);
  const history = useHistory();
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const putId = useRef("");
  let id = useRef("")
  const subValues = [
    "Supervision",
    "Workpackage",
    "Equipment machinery",
    "Behaviour issue",
    "Safety issues",
    "Ergonimics",
    "Procedures",
    "Other acts",
    "Warning system",
    "Energy types",
    "Tools",
    "Safety items",
    "Others conditions",
  ]


  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = HAZARDIOUS_ACTS_SUB_TYPES.concat(
      HAZARDIOUS_CONDITION_SUB_TYPES
    );
    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );
    let tempid = []
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        tempid.push(value.id)
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        tempApiData[valueQuestion] = valueAnser.includes(",") ? valueAnser.split(",") : [valueAnser];
      }
    });
    id.current = tempid.reverse()
    await setData(tempApiData);
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const radioDecide = ["Yes", "No"];

  let form_link = window.location.href;
  const classes = useStyles();

  const handelNext = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    putId.current = lastItem;
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/basic-cause/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/basic-cause/`
      );
    }
  };
  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/hazardious-condtions/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/hazardious-condtions/`
      );
    }

  }

  useEffect(() => {
    fetchIncidentDetails();
    handelShowData();
  }, []);

  return (
    <PapperBlock
      title="Actions against Immediate Causes"
      icon="ion-md-list-box"
    >
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident number
            </Typography>

            <Typography className={Type.labelValue}>
              {incidentDetail.incidentNumber}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Method
            </Typography>
            <Typography className={Type.labelValue}>
              PACE cause analysis
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom>
              Actions
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">
              Option Selected from Hazardous Acts and Condition
            </Typography>

            {Object.entries(data).reverse().map(([key, value], index) => (

              <List
                className={classes.list}
                component="nav"
                dense
                subheader={
                  <ListSubheader
                    disableGutters
                    disableSticky
                    component="div"
                    id="selected-options"
                  >
                    {subValues[index]}
                  </ListSubheader>
                }
              >
                {value.map((value) => (
                  <ListItem>
                    <ListItemIcon>
                      <FiberManualRecordIcon className="smallIcon" />
                    </ListItemIcon>
                    <ListItemText primary={value} />
                  </ListItem>
                ))}
                <button className={classes.textButton}>
                  <FormDialog actionContext="incidents:Pacacuase" enitityReferenceId={`${putId.current}:${id.current[index]}`} />
                </button>
              </List>
            ))}

          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelPrevious(e)}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNext()}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
            selectedItem={"Cause and action"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
