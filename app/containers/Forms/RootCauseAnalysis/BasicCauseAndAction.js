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
import { handelActionData, handelConvert } from "../../../utils/CheckerValue";
import { PACE_MANAGEMENT_CONTROL_SUB_TYPES, ROOT_CAUSE_ANALYSIS_FORM } from "../../../utils/constants";
import ActionShow from "../ActionShow";
import ActionTracker from "../ActionTracker";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";



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
  const [isLoading, setIsLoading] = useState(false)
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
  })

  const handelShowData = async () => {
    let tempApiData = [];
    let subTypes = PACE_MANAGEMENT_CONTROL_SUB_TYPES
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
    let allApiData = previousData.data.data.results;
    allApiData.map((value, index) => {
      if (subTypes.includes(value.rcaSubType)) {
        tempApiData.push(allApiData[index]);
      }
    });
    tempApiData.map((value) => {
      value["action"] = [{}]
    })
    await handelActionTracker(tempApiData);
  };

  const handelActionTracker = async (apiData) => {
    let allAction = await handelActionData(putId.current, apiData)
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

    setProjectData({ projectId: projectId, companyId: fkCompanyId })
  }

  function ListItemLink(props) {
    return (
      <ListItem className={classes.titleLink} button component="a" {...props} />
    );
  }

  const classes = useStyles();

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push(
        `${ROOT_CAUSE_ANALYSIS_FORM["Additional information"]}${putId.current}`
      );
    } else if (navigateType == "previous") {
      history.push(
        `${ROOT_CAUSE_ANALYSIS_FORM["Management control"]}${putId.current}`
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

  const handelCallback = async () => {
    await setIsLoading(true)
    await handelShowData();
    await fetchIncidentDetails();
    await setIsLoading(false)
  };

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;

  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const projectStuctId = JSON.parse(localStorage.getItem("commonObject"))["incident"]["projectStruct"]

  useEffect(() => {
    handelCallback()
    handelActionLink()
  }, []);

  const isDesktop = useMediaQuery("(min-width:992px)");

  return (
    <PapperBlock title="Preventive actions" icon="ion-md-list-box">
      {isLoading == false ?
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
                Preventive actions
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Divider />
              <Box paddingTop={3}>
                <Typography variant="h6">
                  Option(s) Selected from Hazardous Acts and Condition
                </Typography>
              </Box>

              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableBody>
                    {data.map((value, index) => (
                      <TableRow>
                        <TableCell align="left" style={{ width: 160 }}>
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
                        <TableCell align="right">
                          <Typography>
                            {value.action.length > 0 && value.action.map((actionValue) => (
                              <ActionShow
                                action={actionValue}
                                companyId={projectData.companyId}
                                projectId={projectData.projectId}
                                updatePage={updatePage}
                                projectStructure={localStorage.getItem("selectBreakDown")}
                              />
                            ))}
                          </Typography>
                        </TableCell>
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
                // disable={buttonLoading}
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
                selectedItem={"Preventive actions"}
              />
            </Grid>
          )}
        </Grid>
        :
        <Loader />
      }
    </PapperBlock>
  );
};

export default BasicCauseAndAction;
