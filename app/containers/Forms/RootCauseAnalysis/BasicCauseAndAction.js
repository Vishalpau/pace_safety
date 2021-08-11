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
import useMediaQuery from "@material-ui/core/useMediaQuery";

import api from "../../../utils/axios";
import FormSideBar from "../FormSideBar";
import { ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import { BASIC_CAUSE_SUB_TYPES, PACE_MANAGEMENT_CONTROL_SUB_TYPES } from "../../../utils/constants";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import { checkValue, handelConvert } from "../../../utils/CheckerValue"
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

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}
const BasicCauseAndAction = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  let putId = useRef("");
  let id = useRef("");
  const [incidentDetail, setIncidentDetail] = useState({});
  const [optionBasicCause, setOptionBasicCause] = useState([])

  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = PACE_MANAGEMENT_CONTROL_SUB_TYPES;
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `/api/v1/incidents/${putId.current}/pacecauses/`
    );
    let tempid = [];
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (
        subTypes.includes(value.rcaSubType) &&
        value.rcaRemark !== "No option selected"
      ) {
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
  };

  const handelOptionDispay = (type, subType, option) => {
    let temp = []
    if (option !== "-") {
      option.map((value) => {
        temp.push(`${type} - ${subType} - ${value}`)
      })
    }
    return temp
  }

  const handelBasicCauseData = async () => {
    let tempApiData = {};
    let subTypes = BASIC_CAUSE_SUB_TYPES;
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(`/api/v1/incidents/${putId.current}/pacecauses/`);
    let tempid = [];
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType) && value.rcaRemark !== "No option selected"
      ) {
        let valueQuestion = value.rcaSubType;
        let valueAnser = value.rcaRemark;
        if (Object.keys(tempApiData).includes(valueQuestion)) {
          tempApiData[valueQuestion].push(valueAnser)
        } else {
          tempApiData[valueQuestion] = [valueAnser]
        }
      }
    });

    let OptionWithSubType =
      handelOptionDispay("Human factors", "personal", checkValue(tempApiData["personal"])).concat
        (handelOptionDispay("Human factors", "wellnessFactors", checkValue(tempApiData["wellnessFactors"]))).concat
        (handelOptionDispay("Jobfactors", "leadership", checkValue(tempApiData["leadership"]))).concat
        (handelOptionDispay("Jobfactors", "processes", checkValue(tempApiData["processes"])))
    setOptionBasicCause(OptionWithSubType)
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }
  const handelNext = () => {
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

  const handelPrevious = () => {
    if (!isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/pace-management/${putId.current
        }`
      );
    } else if (isNaN(putId.current)) {
      history.push(
        `/app/incident-management/registration/root-cause-analysis/pace-management/`
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



  useEffect(() => {
    fetchIncidentDetails();
    handelShowData();
    handelBasicCauseData();
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  const classes = useStyles();
  return (
    <PapperBlock title="Preventive Actions" icon="ion-md-list-box">
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
            <Box borderTop={1} paddingTop={2} borderColor="grey.300">
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
            </Box>
          </Grid>


          <Grid item md={12} >
            <Typography variant="h6">
              Basic cause selected
            </Typography>
            {optionBasicCause.map((value) => (
              <p><small>{value}</small></p>
            ))}
            <Box borderTop={1} marginTop={2} borderColor="grey.300" />
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6">
              Option selected from basic cause
            </Typography>

            <div className={classes.rootTable}>
              <Table className={classes.table}>
                <TableBody>
                  {Object.entries(data)
                    .map(([key, value], index) => (
                      <>
                        {value.map((value, valueIndex) => (
                          <TableRow>
                            <TableCell align="left" style={{ width: 160 }}>
                              {handelConvert(key)}
                            </TableCell>
                            <TableCell align="left">
                              <li key={value}>
                                <span>{value}</span>
                              </li>
                            </TableCell>
                            <TableCell align="right">
                              <ActionTracker
                                actionContext="incidents:Pacacuase"
                                enitityReferenceId={`${putId.current}:${id.current[index]
                                  }:${valueIndex}`}
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
        {
          isDesktop && (
            <Grid item md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Preventive actions"}
              />
            </Grid>
          )}
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
