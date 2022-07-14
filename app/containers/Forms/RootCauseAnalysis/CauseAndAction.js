import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";
import api from "../../../utils/axios";
import {
  handelActionData,
  handelConvert,
  handelIncidentId,
} from "../../../utils/CheckerValue";
import {
  HAZARDIOUS_ACTS_SUB_TYPES,
  HAZARDIOUS_CONDITION_SUB_TYPES,
  ROOT_CAUSE_ANALYSIS_FORM,
} from "../../../utils/constants";
import ActionShow from "../ActionShow";
import { SSO_URL } from "../../../utils/constants";
import Link from "@material-ui/core/Link";

import ActionTracker from "../ActionTracker";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";
import CircularProgress from "@material-ui/core/CircularProgress";

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
    minWidth: 950,
    margin: "0 0",
  },
  actionLink: {
    fontSize: "14px",
    lineHeight: "1.7",
  },
}));

const BasicCauseAndAction = () => {
  const [incidentDetail, setIncidentDetail] = useState({});

  const [data, setData] = useState([]);
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
  });
  const history = useHistory();

  const putId = useRef("");
  let id = useRef();
  const [actionData, setActionData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);

  const handelShowData = async () => {
    let tempApiData = [];
    let subTypes = HAZARDIOUS_ACTS_SUB_TYPES.concat(
      HAZARDIOUS_CONDITION_SUB_TYPES
    );

    putId.current = handelIncidentId();
    let previousData = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/pacecauses/`
    );

    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        tempApiData.push(allApiData[index]);
      }
    });

    tempApiData.map((value) => {
      if (value["action"] == undefined) {
        value["action"] = [{}];
      }
    });
    await handelActionTracker(tempApiData);
  };

  const handelActionTracker = async (apiData) => {
    let allAction = await handelActionData(putId.current, apiData);
    await setData(allAction);
  };

  const handelActionLink = () => {
    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;

    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    setProjectData({ projectId: projectId, companyId: fkCompanyId });
  };

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const classes = useStyles();

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(
        `${ROOT_CAUSE_ANALYSIS_FORM["Basic cause"]}${putId.current}`
      );
    } else if (navigateType == "previous") {
      history.push(
        `${ROOT_CAUSE_ANALYSIS_FORM["Hazardous conditions"]}${putId.current}`
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

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const projectStuctId = JSON.parse(localStorage.getItem("commonObject"))[
    "incident"
  ]["projectStruct"];

  const handelCallback = async () => {
    await setIsLoading(true);
    await handelShowData();
    await fetchIncidentDetails();
    await handelActionLink();
    await setIsLoading(false);
  };

  useEffect(() => {
    handelCallback();
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Corrective Actions" icon="ion-md-list-box">
      {isLoading == false ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>

              <Typography className={Type.labelValue}>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Method
              </Typography>
              <Typography className={Type.labelValue}>
                PACE cause analysis
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Corrective actions
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
              <Box paddingTop={3} paddingBottom={1}>
                <Typography variant="h6" gutterBottom>
                  Option(s) Selected from Hazardous Acts and Condition
                </Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableBody>
                    {data.map((value, index) => (
                      <TableRow>
                        <TableCell align="left">
                          {handelConvert(value.rcaSubType)}
                        </TableCell>
                        <TableCell align="left">
                          <span>{value.rcaRemark}</span>
                        </TableCell>
                        <TableCell align="right">
                          <ActionTracker
                            actionContext="incidents:Pacecause"
                            enitityReferenceId={`${putId.current}:${value.id}`}
                            setUpdatePage={setUpdatePage}
                            updatePage={updatePage}
                            fkCompanyId={fkCompanyId}
                            fkProjectId={project}
                            fkProjectStructureIds={projectStuctId}
                            createdBy={userId}
                            handelShowData={handelShowData}
                          />
                        </TableCell>
                        <TableCell align="right" style={{ minWidth: 200 }}>
                          {value.action.map((actionValue) => (
                            <ActionShow
                              action={actionValue}
                              companyId={projectData.companyId}
                              projectId={projectData.projectId}
                              updatePage={updatePage}
                              projectStructure={localStorage.getItem("selectBreakDown")}
                            />
                          ))}
                        </TableCell>
                        {/* <TableCell align="right" style={{ minWidth: 200 }}>
                          <Link
                            className={classes.actionLinkAudit}
                            display="block"
                            href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=yVgvwzSwoYhk0AM2s7XFkr7fbVYK5ZET9JwP5lOo&response_type=code&companyId=1&projectId=13&targetPage=assesments`}
                            target="_blank"
                          >
                            link to redirect assesment
                          </Link>
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {data.length == 0 ? (
                <Grid container item md={9}>
                  <Typography variant="h8">No option(s) selected</Typography>
                </Grid>
              ) : null}
            </Grid>

            <Grid item xs={12}>
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
                {/* {buttonLoading && <CircularProgress size={20} />} */}
              </Button>
            </Grid>
          </Grid>

          {isDesktop && (
            <Grid item md={3}>
              <FormSideBar
                listOfItems={ROOT_CAUSE_ANALYSIS_FORM}
                selectedItem={"Corrective actions"}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <Loader />
      )}
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
