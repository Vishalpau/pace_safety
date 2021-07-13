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
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { BASIC_CAUSE_SUB_TYPES } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";

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
  const [data, setData] = useState([]);
  const history = useHistory();
  const putId = useRef("");
  const [incidentDetail, setIncidentDetail] = useState({});
  let sub_values = [
    "Others job factors",
    "Processes",
    "Leadership",
    "Other human factors",
    "Wellness factors",
    "Personal",
  ];
  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = BASIC_CAUSE_SUB_TYPES;

    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );

    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        tempApiData[valueQuestion] = valueAnser.includes(",")
          ? valueAnser.split(",")
          : [valueAnser];
      }
    });

    await setData(tempApiData);
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }
  const handelNext = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    putId.current = lastItem;
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/management-control/${localStorage.getItem(
          "fkincidentId"
        )}`
      );
    } else {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/management-control/`
      );
    }
  };

  let form_link = window.location.href;

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  useEffect(() => {
    fetchIncidentDetails();
    handelShowData();
  }, []);
  const classes = useStyles();
  return (
    <PapperBlock title="Actions Against Basic Causes" icon="ion-md-list-box">
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
              {localStorage.getItem("rcaMethod")}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
            </Box>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">
              Option selected from basic cause
            </Typography>

            {Object.entries(data).map(([key, value], index) => (
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
                    {sub_values[index]}
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
                  <AddCircleOutlineIcon /> Add a new action
                </button>
              </List>

            ))}
            <button className={classes.textButton}>
              <AddCircleOutlineIcon /> Add a new action
            </button>
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => history.goBack()}
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
            selectedItem={"Basic cause and action"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
