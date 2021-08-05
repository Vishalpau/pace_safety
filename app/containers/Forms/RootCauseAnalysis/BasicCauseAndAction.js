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
import { BASIC_CAUSE_SUB_TYPES } from "../../../utils/constants";
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

function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}
const BasicCauseAndAction = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  let putId = useRef("");
  let id = useRef("");
  const [incidentDetail, setIncidentDetail] = useState({});

  const handelShowData = async () => {
    let tempApiData = {};
    let subTypes = BASIC_CAUSE_SUB_TYPES;
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );

    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
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

  const handleConvert = (value) => {
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
  const isDesktop = useMediaQuery("(min-width:992px)");
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

          <Grid item md={12}>
            <Typography variant="h6">
              Option selected from basic cause
            </Typography>

            <div className={classes.rootTable}>
              <Table className={classes.table} aria-label="simple table">
                <TableBody>
                  {Object.entries(data)
                    .map(([key, value], index) => (
                      <TableRow key={key}>
                        <TableCell
                          align="left"
                          scope="row"
                          className={classes.tableCell}
                        >
                          {handleConvert(key)}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                          <ul className={classes.tableUlList}>
                            {value.map((value, key) => (
                              <li key={key}>{value}</li>
                            ))}
                          </ul>
                        </TableCell>
                        <TableCell align="right" className={classes.tableCell}>
                          <ActionTracker
                            actionContext="incidents:Pacacuase"
                            enitityReferenceId={`${putId.current}:${id.current[index]
                              }`}
                          />
                        </TableCell>
                      </TableRow>
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
                selectedItem={"Basic cause and action"}
              />
            </Grid>
          )}
      </Grid>
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
