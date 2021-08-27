import React, { useEffect, useState, useRef, lazy } from "react";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import {
  HAZARDIOUS_ACTS_SUB_TYPES,
  HAZARDIOUS_CONDITION_SUB_TYPES,
} from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import { handelConvert } from "../../../utils/CheckerValue"
import ActionTracker from "../ActionTracker";
import { checkValue } from "../../../utils/CheckerValue"

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
  const [actionData, setActionData] = useState({});
  const [updatePage, setUpdatePage] = useState(false)

  const handelShowData = async () => {
    console.log("here")
    let tempApiData = [];
    let subTypes = HAZARDIOUS_ACTS_SUB_TYPES.concat(HAZARDIOUS_CONDITION_SUB_TYPES);
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        tempApiData.push(allApiData[index])
      }
    });
    await handelActionTracker(tempApiData);
  };

  const handelActionTracker = async (apiData) => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    for (let key in apiData) {
      const allActionTrackerData = await api_action.get(`api/v1/actions/?enitityReferenceId__startswith=${putId.current}%3A${apiData[key]["id"]}`);
      if (allActionTrackerData.data.data.results.results.length > 0) {
        let actionTracker = allActionTrackerData.data.data.results.results
        const temp = []
        actionTracker.map((value) => {
          let actionTrackerId = value.id
          temp.push(actionTrackerId)
        })
        apiData[key]["action"] = temp
      }
    }
    await setData(apiData);
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const classes = useStyles();


  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Basic cause"]}${putId.current}`)
    } else if (navigateType == "previous") {
      history.push(`${ROOT_CAUSE_ANALYSIS_FORM["Hazardous conditions"]}${putId.current}`)
    }
  }

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  const handelCallback = async () => {
    await handelShowData();
    await fetchIncidentDetails();
  }

  useEffect(() => {
    handelCallback()
  }, [updatePage]);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock
      title="Corrective Actions"
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
              Corrective actions
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Divider />
            <Box paddingTop={3}>
              <Typography variant="h6">
                Option(s) Selected from Hazardous Acts and Condition
              </Typography>
            </Box>

            <Table className={classes.table}>
              <TableBody>
                {data.map((value) => (
                  <TableRow>
                    <TableCell align="left" style={{ width: 160 }}>
                      {handelConvert(value.rcaSubType)}
                    </TableCell>
                    <TableCell align="left">
                      <span>{value.rcaRemark}</span>
                    </TableCell>
                    <TableCell align="right">

                      <ActionTracker
                        actionContext="incidents:Pacacuase"
                        enitityReferenceId={`${putId.current}:${value.id}`}
                        setUpdatePage={setUpdatePage}
                        updatePage={updatePage}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        {value.action != undefined && value.action.map((actionId) => (
                          <p>{actionId}</p>
                        ))}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
            {data.length == 0 ?
              <Grid container item md={9}>
                <Typography variant="h8">
                  No option(s) selected
                </Typography>
              </Grid>
              : null}
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNavigate("previous")}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handelNavigate("next")}
            >
              Next
            </Button>
          </Grid>
        </Grid>

        {
          isDesktop && (
            <Grid item md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Corrective actions"}
              />
            </Grid>
          )}

      </Grid>
    </PapperBlock >
  );
};

export default BasicCauseAndAction;