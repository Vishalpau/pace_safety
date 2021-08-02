import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import { useHistory, useParams } from "react-router";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import axios from "axios";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import {
  HAZARDIOUS_ACTS_SUB_TYPES,
  HAZARDIOUS_CONDITION_SUB_TYPES,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import ActionTracker from "../ActionTracker";

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
  table: {
    width: "100%",
    minWidth: 650,
  },
  rootTable: {
    width: "100%",
    overflowX: "auto",
  },
  tableCell: {
    minWidth: 200,
  },
  tableUlList: {
    listStyleType: "square",
    "& li + li": {
      marginTop: theme.spacing(0.5),
    },
  },
}));

const BasicCauseAndAction = () => {
  const [incidentDetail, setIncidentDetail] = useState({});

  const [data, setData] = useState([]);
  const history = useHistory();

  const putId = useRef("");
  let id = useRef();
  const [action, setAction] = useState({});

  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = HAZARDIOUS_ACTS_SUB_TYPES.concat(
      HAZARDIOUS_CONDITION_SUB_TYPES
    );
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );
    let tempid = [];
    let all_pace_data = [];
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (
        subTypes.includes(value.rcaSubType) &&
        value.rcaRemark !== "No option selected"
      ) {
        all_pace_data.push(value);
        tempid.push(value.id);
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        tempApiData[valueQuestion] = valueAnser.includes(",")
          ? valueAnser.split(",")
          : [valueAnser];
      }
    });
    id.current = tempid.reverse();
    await setData(tempApiData);
    handelActionTracker();
  };

  const handelActionTracker = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {}
    const allActionTrackerData = await api_action.get("/api/v1/actions/")
    const allActionTracker = allActionTrackerData.data.data.results.results
    let allPaceID = id.current
    allPaceID.map((paceId) => {
      let tempActionID = []
      allActionTracker.map((actionTracker) => {
        let causeId = actionTracker.enitityReferenceId.split(":")[1]
        console.log(causeId == paceId)
        if (causeId == paceId) {
          tempActionID.push(actionTracker.id)
        }
      })
      ActionToCause[paceId] = tempActionID
    })

    console.log(ActionToCause)
  }

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const classes = useStyles();

  const handelNext = () => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
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
  };

  const handelConvert = (value) => {
    let wordArray = value.split(/(?=[A-Z])/);
    let wordArrayCombined = wordArray.join(" ");
    var newString = wordArrayCombined
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
        return c.toUpperCase();
      });
    return newString;
  };

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
            <Divider />
            <Box paddingTop={3}>
              <Typography variant="h6">
                Option Selected from Hazardous Acts and Condition
              </Typography>
            </Box>

            <div>
              <Table border={1}>
                <TableBody>
                  {Object.entries(data)
                    .reverse()
                    .map(([key, value], index) => (
                      <>
                        {value.map((value) => (
                          <TableRow>
                            <TableCell
                              align="left"
                            >
                              {handelConvert(key)}
                            </TableCell>
                            <TableCell
                              align="left"
                            >
                              <li key={value}>
                                <span>{value}</span>
                              </li>

                            </TableCell>
                            <TableCell
                              align="right"
                            >
                              <ActionTracker
                                actionContext="incidents:Pacacuase"
                                enitityReferenceId={`${putId.current}:${id.current[index]
                                  }`}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                </TableBody>
              </Table>
            </div>
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
