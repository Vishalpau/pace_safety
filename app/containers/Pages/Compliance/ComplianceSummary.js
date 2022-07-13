import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import AccessTime from "@material-ui/icons/AccessTime";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import projectpj from "dan-images/projectpj.png";
import IconButton from "@material-ui/core/IconButton";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useParams } from "react-router";

// Icons
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Link from "@material-ui/core/Link";
import { NavLink } from "react-router-dom";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Comment from "@material-ui/icons/Comment";

import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import { ReactVideo } from "reactjs-media";
import { ReactAudio } from "reactjs-media";

import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import api from "../../../utils/axios";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";
import {
  handelIncidentId,
  checkValue,
  handelCommonObject,
  handelActionData,
} from "../../../utils/CheckerValue";
import axios from "axios";
import moment from "moment";
import Loader from "../Loader";
import { handelActionTracker } from "./Compliance/Checks";
import { connect } from "react-redux";
import Attachment from "../../../containers/Attachment/Attachment";
import { checkACL } from "../../../utils/helper";
import "../../../styles/custom/customheader.css";

// Sidebar Links Helper Function
// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 14,
    width: "100%",
    textTransform: "none",
    fontFamily: "Montserrat-SemiBold !important",
    lineHeight: "18px",
    // border: '1px solid #06425c',
  },
  heading: {
    width: "100%",
    fontSize: theme.typography.pxToRem(15),
    //fontWeight: theme.typography.fontWeightMedium,
    fontWeight: "500",
    "& p": {
      fontSize: theme.typography.pxToRem(15),
      //fontWeight: theme.typography.fontWeightMedium,
      fontWeight: "500",
    },
    "& span": {
      fontSize: theme.typography.pxToRem(15),
      //fontWeight: theme.typography.fontWeightMedium,
      fontWeight: "500",
    },
  },
  viewSectionHeading: {
    paddingBottom: "0px !important",
    marginTop: "5px !important",
    "& p": {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightMedium,
      //fontWeight: '500',
    },
  },
  aLabelValue: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#063d55",
    float: "left",
    width: "100%",
    paddingRight: "40px",
    "& div": {
      display: "inline-block",
      float: "right",
    },
  },
  updateLink: {
    float: "left",
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
    actionTitleLable: {
      float: "right",
      width: "calc(100% - 100px)",
      textAlign: "right",
    },
  },
  ratioColorgreen: {
    backgroundColor: "green",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  ratioColorred: {
    backgroundColor: "red",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  ratioColororange: {
    backgroundColor: "orange",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  accordingHeaderContentLeft: {
    display: "inline-block",
    width: "auto",
    padding: "0px",
  },
  accordingHeaderContentRight: {
    display: "inline-block",
    float: "right",
    "& li": {
      paddingTop: "0px",
      paddingBottom: "0px",
      "& span": {
        display: "inline-block",
      },
      "& p": {
        display: "inline-block",
        fontSize: "1rem !important",
        fontWeight: "500 !important",
        color: "#063d55",
        paddingLeft: "5px",
      },
    },
  },
  accordingHeaderContent: {
    display: "inline-block",
    color: "#000",
    width: "auto",
    float: "left",
  },
  accordingHeaderText: {
    display: "inline-block",
    width: "auto",
    paddingLeft: "0px",
    paddingRight: "30px",
  },
  checkedUnclick: {
    pointerEvents: "none",
  },
  statusLabel: {
    fontSize: "14px",
    fontFamily: "Montserrat-Regular",
    "& svg": {
      color: "#06425C",
      //verticalAlign: 'sub',
    },
  },
}));

function ComplianceSummary(props) {
  //states
  const [compliance, setCompliance] = useState(true);
  const [complianceData, setComplianceData] = useState({});
  const [projectStructName, setProjectStructName] = useState([]);
  const [team, setTeam] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [subGroupData, setSubGroupData] = useState([]);
  const [quesData, setQueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const commentPayload = history.location.state;
  // console.log(commentPayload, 'commentPayloadddd');
  const { id } = useParams();
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const [actionData, setActionData] = useState([]);
  const [colordata, setColorData] = useState([]);
  const [ratingData, setRatingData] = useState({});
  const [result, setResult] = useState({});
  const [expanded, setExpanded] = React.useState("panel1");
  const [expandedTableDetail, setExpandedTableDetail] = React.useState(
    "panel3"
  );

  useEffect(() => {
    console.log(colordata, 'colordata');
  },[colordata])

  useEffect(() => {
    console.log(groupData, 'groupdata');
  },[groupData])

  useEffect(() => {
    console.log(complianceData, 'complainceData');
  },[complianceData])

  // for handle the accordian expand
  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const [expandedTabDetails, setExpandedTabDetails] = React.useState("panel6");

  // push the update compliance (update button)
  const handleNewComplianceUpdatePush = async (e) => {
    localStorage.setItem("compliance-navigation", e.target.name);
  };

  //for checked and unchecked of groups & subgroups
  const [inputState, setInputState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
  });

  const handleChange = (name) => (event) => {
    setInputState({
      ...inputState,
      [name]: event.target.checked,
    });
  };

  const { checkedA, checkedB, checkedC, checkedD } = inputState;
  const classes = useStyles();
  const [myVideoOpen, setMyVideoOpen] = React.useState(false);
  // for company id
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  // for project id
  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const handleMyVideoClose = () => {
    setMyVideoOpen(false);
  };
  const [myAudioOpen, setMyAudioOpen] = React.useState(false);
  const handleMyAudioClose = () => {
    setMyAudioOpen(false);
  };

  //fetch checklist data
  const fetchCheklistData = async (id) => {
    const res = await api.get(
      `/api/v1/core/checklists/compliance-groups/${projectId}/`
    );
    const result = res.data.data.results;
    // calling the fetched data of compliance
    await fetchComplianceData(result, id);
  };

  // method to fetch compliance data
  const fetchComplianceData = async (data, id) => {
    const res = await api
      .get(`/api/v1/audits/${id}/`)
      .then((response) => {
        let result = response.data.data.results;
        setResult(result);
        // fetch the data of groups & subgroups comma seprated
        let groupIds = result.groupIds.split(",").map((i) => i * 1);
        let subGroupIds = result.subGroupIds.split(",").map((i) => i * 1);
        let tempGroup = [];
        let tempSubGroup = [];
        //  doing for each for selected groups & subgroups
        for (let j = 0; j < data.length; j++) {
          for (let i = 0; i < data[j]["checklistGroups"].length; i++) {
            if (
              groupIds.includes(
                data[j]["checklistGroups"][i]["checklistgroupId"]
              )
            ) {
              tempGroup.push(data[j]["checklistGroups"][i]);
            }
          }
        }

        for (let i = 0; i < subGroupIds.length; i++) {
          for (let j = 0; j < tempGroup.length; j++) {
            tempGroup[j]["checkListValues"].map((value) => {
              if (value.id == subGroupIds[i]) {
                tempSubGroup.push({
                  groupName: tempGroup[j]["checkListGroupName"],
                  subGroupName: value["inputLabel"],
                });
              }
            });
          }
        }
        setGroupData(tempGroup);
        setSubGroupData(tempSubGroup);
        setComplianceData(result);
        handelWorkArea(result);
        handleTeamName(result.inspectionTeam);
        fetchNotificationSent(result.notifyTo, result.fkProjectStructureIds);
        setIsLoading(true);
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   console.log(groupData, "GROUPTdATA");
  // }, [groupData]);

  // useEffect(() => {
  //   console.log(quesData, "questionData");
  // }, [quesData]);

  // for fetching the work area
  const handelWorkArea = async (complianceData) => {
    let structName = [];
    let projectStructId = complianceData.fkProjectStructureIds.split(":");
    for (let key in projectStructId) {
      let workAreaId = [
        projectStructId[key].substring(0, 2),
        projectStructId[key].substring(2),
      ];
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH,
      });
      const workArea = await api_work_area.get(
        `/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${
          workAreaId[0]
        }/${workAreaId[1]}/`
      );
      structName.push(workArea.data.data.results[0]["structureName"]);
    }
    setProjectStructName(structName);
  };

  const handleTeamName = (teamName) => {
    let data = teamName.split(",");
    setTeam(data);
  };

  // get selected project name
  const handleProjectName = (projectId) => {
    const userName =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).companies
        : null;
    const fetchCompanyId = userName.filter(
      (user) => user.companyId === complianceData.fkCompanyId
    );
    const fetchProjectId = fetchCompanyId[0].projects.filter(
      (user) => user.projectId === projectId
    );
    return fetchProjectId[0].projectName;
  };

  // here we manage the status (pending/done)
  const handleComplianceStatusChange = () => {
    if (complianceData.performanceSummary !== null) {
      setCompliance(true);
    } else {
      history.push(
        `/app/pages/compliance/compliance-details/${complianceData.id}`
      );
    }
  };

  // fetching the notify name role wise
  const fetchNotificationSent = async (notifyTo, fkProjectStructure) => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    const selectBreakdown =
      props.projectName.breakDown.length > 0
        ? props.projectName.breakDown
        : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/compliance/?subentity=compliance&roleType=custom&projectStructure=${fkProjectStructure}`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        let data = [];
        let user = notifyTo.split(",");
        const result = res.data.data.results;
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < user.length; j++) {
            if (user[j] == result[i].id) {
              data.push(result[i]);
            }
          }
        }
        setNotificationSentValue(data);
      }
    } catch (error) {}
  };

  // get audit question on summary page
  const auditQueData = async (id) => {
    const res = await api.get(`/api/v1/audits/${id}/auditresponse/`);
    // console.log(res, 'resssssssssssss');
    const result = res.data.data.results;
    setQueData(result);
  };

  // get created action on compliance module
  const handelActionTracker = async () => {
    if (
      localStorage.getItem("fkComplianceId") !== undefined &&
      localStorage.getItem("commonObject") !== undefined
    ) {
      let jhaId = localStorage.getItem("fkComplianceId");
      // let apiData = JSON.parse(localStorage.getItem("commonObject"))["audit"][
      //   "qustionsIds"
      // ];
      let apiData = JSON.parse(localStorage.getItem("commonObject"))["audit"][
        "qustionsIds"
      ];
      let allAction = await handelActionData(jhaId, apiData);
      console.log(allAction, "allAction");
      setActionData(allAction);
    }
  };

  // fetching all matrix color and value for matching with the created on compliance
  const fetchMatrixData = async () => {
    const res = await api.get(
      `/api/v1/configaudits/matrix/?company=${fkCompanyId}&project=${projectId}&projectStructure=`
    );
    const result = res.data.data.results;
    setColorData(result);
  };

  // use effect call
  useEffect(() => {
    if (id) {
      auditQueData(id);
      fetchCheklistData(id);
      handelActionTracker();
      fetchMatrixData();
    }
  }, []);

  // created function for handle group name
  function groupNamrHandler(val) {
    if (
      val.checkListValues.findIndex(
        (ele) => quesData.findIndex((qD) => qD.subGroupId === ele.id) !== -1
      ) !== -1
    ) {
      return (
        <FormLabel className="checkRadioLabel" component="legend">
          {val.checkListGroupName}
        </FormLabel>
      );
    }
  }
  return (
    <CustomPapperBlock
      title={`Compliance number: ${
        complianceData.auditNumber ? complianceData.auditNumber : ""
      }`}
      icon="customDropdownPageIcon compliancePageIcon"
      whiteBg
    >
      {isLoading ? (
        <>
          <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30.6"
                      height="30.168"
                      viewBox="0 0 39.6 30.168"
                    >
                      <path
                        id="workflow"
                        d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z"
                        transform="translate(0.026)"
                        fill="#06425c"
                      />
                    </svg>{" "}
                    Status & stage
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}
                        className={classes.item}
                      >
                        <ul className="SummaryTabList">
                          <li>
                            <Button
                              color={
                                complianceData.performanceSummary
                                  ? "secondary"
                                  : "primary"
                              }
                              // variant={"contained"}
                              variant={
                                complianceData.performanceSummary
                                  ? "contained"
                                  : "outlined"
                              }
                              size="small"
                              //endIcon={<CheckCircle />}
                              className={classes.statusButton}
                              onClick={(e) => {
                                handleComplianceStatusChange();
                                //setApprovals(false);
                                //setLessonsLearned(false);
                                //setSummary(false);
                              }}
                            >
                              Compliance
                            </Button>
                            <Typography
                              className={classes.statusLabel}
                              variant="caption"
                              display="block"
                              align="center"
                            >
                              {complianceData.performanceSummary !== null
                                ? "Done"
                                : "Pending"}
                              {complianceData.performanceSummary !== null ? (
                                <CheckCircle />
                              ) : (
                                <AccessTime />
                              )}
                            </Typography>
                          </li>
                        </ul>
                      </Grid>

                      {/* <Grid item md={2} sm={3} xs={6} className={classes.item}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        //endIcon={<CheckCircle />}
                        className={classes.statusButton}
                        onClick={(e) => {
                          setCompliance(true);
                          //setApprovals(false);
                          //setLessonsLearned(false);
                          //setSummary(false);
                        }}
                      >
                        Compliance
                      </Button>
                      <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                        Done <CheckCircle />
                      </Typography>
                    </Grid> */}
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item xs={12} md={12} className="paddTBRemove">
                  {/* summary and part */}
                  <>
                    {(() => {
                      if (compliance == true) {
                        return (
                          <>
                            {/* <Grid item xs={12}> */}
                            {/* <Grid container spacing={3} className={classes.mToptewnty}> */}

                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Typography
                                variant="h6"
                                className="sectionHeading"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24.961"
                                  height="30.053"
                                  viewBox="0 0 30.961 36.053"
                                >
                                  <path
                                    id="generate-report"
                                    d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z"
                                    transform="translate(0 0)"
                                    fill="#06425c"
                                  />
                                </svg>{" "}
                                Project information
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item md={12} sm={12} xs={12}>
                                    <Typography
                                      gutterBottom
                                      className="labelValue"
                                    >
                                      {handleProjectName(
                                        complianceData["fkProjectId"]
                                      )}
                                    </Typography>
                                    <Typography className="labelValue">
                                      {projectStructName
                                        .map((value) => {
                                          return value;
                                        })
                                        .join(" : ")}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>

                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Typography
                                variant="h6"
                                className="sectionHeading"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="26"
                                  height="32"
                                  viewBox="0 0 33.2 39"
                                >
                                  <g
                                    id="Group_5733"
                                    data-name="Group 5733"
                                    transform="translate(-1806 -746)"
                                  >
                                    <g
                                      id="Group_5732"
                                      data-name="Group 5732"
                                      transform="translate(266)"
                                    >
                                      <g
                                        id="Group_5725"
                                        data-name="Group 5725"
                                        transform="translate(427.999)"
                                      >
                                        <path
                                          id="personal-information-5"
                                          d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Z"
                                          transform="translate(935.51 677.952)"
                                          fill="#06425c"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="compliance"
                                      transform="translate(1813.6 751.414)"
                                    >
                                      <g
                                        id="Group_5383"
                                        data-name="Group 5383"
                                        transform="translate(0.4 0.4)"
                                      >
                                        <g
                                          id="Group_5382"
                                          data-name="Group 5382"
                                        >
                                          <path
                                            id="Path_5175"
                                            data-name="Path 5175"
                                            d="M14.675,2.41A6.822,6.822,0,0,0,5,2.41a6.826,6.826,0,0,0-.845,8.652l-3.146,2.8c-.058.029-.087.087-.146.117A1.569,1.569,0,0,0,.4,15.083a1.588,1.588,0,0,0,2.709,1.136.635.635,0,0,0,.117-.146l2.8-3.175A6.828,6.828,0,0,0,14.675,2.41ZM9.868,13.073a5.826,5.826,0,1,1,5.826-5.826A5.825,5.825,0,0,1,9.868,13.073Z"
                                            transform="translate(-0.4 -0.4)"
                                            fill="#06425c"
                                          />
                                          <path
                                            id="Path_5176"
                                            data-name="Path 5176"
                                            d="M23.03,18.392l-1.835-1.835L20,17.78l3.03,3.03,4.457-4.486L26.293,15.1Z"
                                            transform="translate(-14.29 -10.818)"
                                            fill="#06425c"
                                          />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </svg>{" "}
                                Compliance Details
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Type of compliance check
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["auditType"]}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Date of compliance check
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {moment(
                                        complianceData["createdAt"]
                                      ).format("Do MMMM YYYY, h:mm A")}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    className={classes.viewSectionHeading}
                                  >
                                    <FormLabel
                                      component="legend"
                                      className="checkRadioLabel"
                                    >
                                      Company representative information
                                    </FormLabel>
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Safety representative
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["hseRepresentative"] !==
                                      ""
                                        ? complianceData["hseRepresentative"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={6} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Safety representative number
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["hseRepNumber"] !== ""
                                        ? complianceData["hseRepNumber"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    className={classes.viewSectionHeading}
                                  >
                                    <FormLabel
                                      component="legend"
                                      className="checkRadioLabel"
                                    >
                                      Contractor information
                                    </FormLabel>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Contractor name
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["contractor"] !== ""
                                        ? complianceData["contractor"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Contractor representative number
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["contractorRepNumber"] !==
                                      ""
                                        ? complianceData["contractorRepNumber"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Sub-Contractor name
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData["subContractor"] !== ""
                                        ? complianceData["subContractor"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Contractor supervisor name
                                    </Typography>
                                    <Typography className="viewLabelValue">
                                      {complianceData[
                                        "contractorSupervisorName"
                                      ] !== ""
                                        ? complianceData[
                                            "contractorSupervisorName"
                                          ]
                                        : "-"}
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="label"
                                      gutterBottom
                                      className="viewLabel"
                                    >
                                      Inspection team
                                    </Typography>
                                    {team.length > 0
                                      ? team.map((item) => (
                                          <Typography
                                            display="block"
                                            className="viewLabelValue"
                                          >
                                            {item}
                                          </Typography>
                                        ))
                                      : "-"}
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Typography
                                variant="h6"
                                className="sectionHeading"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 39 35.181"
                                >
                                  <path
                                    id="floor-plan"
                                    d="M30.051,29.16a.794.794,0,1,1,0-1.587h1.521V21.586H30.1A.794.794,0,0,1,30.1,20h1.473V11.593H25.343v8.422h1.476a.794.794,0,1,1,0,1.587H25.343v1.644a.794.794,0,0,1-1.587,0V11.593H13.119v5.66h5.212a.787.787,0,0,1,.79.787v9.539h4.616V26.106a.794.794,0,1,1,1.587,0v1.473h1.87a.794.794,0,1,1,0,1.587H12.328a.79.79,0,0,1-.79-.79V10.793a.794.794,0,0,1,.79-.79H32.378a.794.794,0,0,1,.775.79V28.369a.79.79,0,0,1-.775.79ZM1.685,26.093l.089-.063a4.6,4.6,0,0,1,.514-.394,5.266,5.266,0,0,1,1.178-.578,7.878,7.878,0,0,1,1.117-.3V1.619c-2.939.451-2.92,3.4-2.9,6.152.076,3.809-.171,13.847,0,18.322Zm4.444-.654a.8.8,0,0,1-.187.46.771.771,0,0,1-.476.26h0a8.889,8.889,0,0,0-1.27.276,3.971,3.971,0,0,0-1.044.476,3.371,3.371,0,0,0-.813.771,5.263,5.263,0,0,0-.667,1.2,6.9,6.9,0,0,0,.13,1.74,3.781,3.781,0,0,0,.581,1.381h0a3.3,3.3,0,0,0,1.121.984,5.552,5.552,0,0,0,1.8.59H37.428V6.031H6.145V25.439Zm0-20.951H37.872A1.13,1.13,0,0,1,39,5.619V34.058a1.146,1.146,0,0,1-.086.429,1.187,1.187,0,0,1-.244.365h0a1.187,1.187,0,0,1-.365.244,1.089,1.089,0,0,1-.429.086H5.262a5.06,5.06,0,0,1-2.27-.673,5.593,5.593,0,0,1-1.879-1.587,5.336,5.336,0,0,1-.825-1.9,8.688,8.688,0,0,1-.165-2.286c0-6.822-.279-14.215,0-20.951A13.553,13.553,0,0,1,.733,2.625C1.364,1.162,2.682.051,5.281,0h.083a.781.781,0,0,1,.781.781v3.7ZM13.113,18.84v8.739h4.428V18.83Z"
                                    transform="translate(0.001)"
                                    fill="#06425c"
                                  />
                                </svg>{" "}
                                Categories
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item md={12} xs={12}>
                                    <Grid container spacing={3}>
                                      <Grid item md={6} xs={12}>
                                        <FormLabel
                                          className="checkRadioLabel"
                                          component="legend"
                                        >
                                          Group name
                                        </FormLabel>
                                        <FormGroup
                                          className={classes.customCheckBoxList}
                                        >
                                          {groupData.map((value, index) => (
                                            <FormControlLabel
                                              className="checkRadioLabel checkedUnclick"
                                              control={
                                                <Checkbox
                                                  checked={checkedB}
                                                  onChange={handleChange(
                                                    "checkedB"
                                                  )}
                                                  value="checkedB"
                                                  classes={{
                                                    root: classes.root,
                                                    checked: classes.checked,
                                                  }}
                                                />
                                              }
                                              label={value.checkListGroupName}
                                            />
                                          ))}
                                        </FormGroup>
                                      </Grid>

                                      <Grid item md={6} xs={12}>
                                        <Grid container spacing={3}>
                                          {result.groups.map((value) => {
                                            return (
                                              <Grid
                                                item
                                                md={12}
                                                xs={12}
                                                className={classes.formBox}
                                              >
                                                <FormLabel
                                                  className="checkRadioLabel"
                                                  component="legend"
                                                >
                                                  {/* {(result.groups.filter(name=> name.id == value.fkGroupId)[0].checkListGroupName)} */}
                                                  {value.checkListGroupName}
                                                </FormLabel>
                                                <FormGroup>
                                                  {result.subGroups.map(
                                                    (subGrp) => {
                                                      if (
                                                        subGrp.fkGroupId ===
                                                        value.id
                                                      ) {
                                                        return (
                                                          <FormControlLabel
                                                            //className={classes.labelValue}
                                                            className="checkedUnclick"
                                                            control={
                                                              <Checkbox
                                                                icon={
                                                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                                                }
                                                                checkedIcon={
                                                                  <CheckBoxIcon fontSize="small" />
                                                                }
                                                                name="checkedI"
                                                                onChange={
                                                                  handleChange
                                                                }
                                                                checked={
                                                                  checkedC
                                                                }
                                                                value="checkedC"
                                                              />
                                                            }
                                                            label={
                                                              subGrp.inputLabel
                                                            }
                                                          />
                                                        );
                                                      }
                                                    }
                                                  )}
                                                </FormGroup>
                                              </Grid>
                                            );
                                          })}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>

                            <>
                              <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                className="paddTBRemove"
                              >
                                <Typography
                                  variant="h6"
                                  className="sectionHeading"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="28"
                                    viewBox="0 0 49.737 39"
                                  >
                                    <g
                                      id="check-30"
                                      transform="translate(-100.352 -178.176)"
                                    >
                                      <path
                                        id="Path_6414"
                                        data-name="Path 6414"
                                        d="M100.352,178.176v33.94h39.493v-33.94Zm37.025,31.348H102.82v-28.88h34.557Z"
                                        transform="translate(0)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6415"
                                        data-name="Path 6415"
                                        d="M192.512,333.824h4.32v3.456h-4.32Z"
                                        transform="translate(-86.606 -146.268)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6416"
                                        data-name="Path 6416"
                                        d="M286.72,352.256h21.968v1.234H286.72Z"
                                        transform="translate(-175.137 -163.59)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6417"
                                        data-name="Path 6417"
                                        d="M286.72,466.944h21.968v1.234H286.72Z"
                                        transform="translate(-175.137 -271.366)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6418"
                                        data-name="Path 6418"
                                        d="M286.72,585.728h21.968v1.234H286.72Z"
                                        transform="translate(-175.137 -382.992)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6419"
                                        data-name="Path 6419"
                                        d="M192.512,448.512h4.32v3.456h-4.32Z"
                                        transform="translate(-86.606 -254.045)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6420"
                                        data-name="Path 6420"
                                        d="M192.512,567.3h4.32v3.456h-4.32Z"
                                        transform="translate(-86.606 -365.671)"
                                        fill="#06425c"
                                      />
                                      <path
                                        id="Path_6421"
                                        data-name="Path 6421"
                                        d="M308.978,300.173l-3.826,2.962s9.75,8.269,15.3,16.044c0,0,3.456-13.452,22.092-30.361l-.864-2.1s-10.861,5.06-23.7,21.1A79.707,79.707,0,0,0,308.978,300.173Z"
                                        transform="translate(-192.458 -102.003)"
                                        fill="#06425c"
                                      />
                                    </g>
                                  </svg>{" "}
                                  Checks
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                className="paddTBRemove"
                              >
                                <Paper elevation={1} className="paperSection">
                                  <Grid container spacing={3}>
                                    <Grid
                                      item
                                      md={12}
                                      xs={12}
                                      className="paddBRemove"
                                    >
                                      {/* {console.log(groupData, quesData, 'groupData')} */}

                                      {quesData.length <= 0 ? (
                                        <p>No question configured</p>
                                      ) : (
                                        <>
                                          {groupData.map((val) => {
                                            // console.log(val, 'val');
                                            // console.log(quesData, 'quesData');
                                            return (
                                              <>
                                                {groupNamrHandler(val)}

                                                {val.checkListValues.map(
                                                  (subGrpData, index) => {
                                                    // console.log(subGrpData, 'subjiii');
                                                    return quesData.map(
                                                      (value, index) => {
                                                        console.log(value,"value.subGroupId");
                                                        return subGrpData.id ===
                                                          value.subGroupId ? (
                                                          <>
                                                            <Accordion
                                                              expanded={
                                                                expandedTableDetail ===
                                                                `panel6 ${
                                                                  value.id
                                                                }`
                                                              }
                                                              onChange={handleTDChange(
                                                                `panel6 ${
                                                                  value.id
                                                                }`,
                                                                value.id
                                                              )}
                                                              defaultExpanded
                                                              className="backPaperAccordian"
                                                            >
                                                              <AccordionSummary
                                                                expandIcon={
                                                                  <ExpandMoreIcon />
                                                                }
                                                                aria-controls="panel1bh-content"
                                                                id="panel1bh-header"
                                                                className="accordionHeaderSection"
                                                              >
                                                                <List
                                                                  className={
                                                                    classes.heading
                                                                  }
                                                                >
                                                                  <ListItem
                                                                    className={
                                                                      classes.accordingHeaderContentLeft
                                                                    }
                                                                  >
                                                                    <ListItemText
                                                                      primary={
                                                                        value.question
                                                                      }
                                                                    />
                                                                  </ListItem>
                                                                </List>
                                                              </AccordionSummary>
                                                              <AccordionDetails>
                                                                <Grid
                                                                  container
                                                                  spacing={2}
                                                                >
                                                                  {value.criticality ? (
                                                                    <>
                                                                      <Grid
                                                                        item
                                                                        md={4}
                                                                        sm={4}
                                                                        xs={12}
                                                                      >
                                                                        {value.criticality !==
                                                                          "N/A" &&
                                                                        value.criticality !==
                                                                          "No" &&
                                                                        value.criticality !==
                                                                          "Yes" ? (
                                                                          <FormLabel
                                                                            component="legend"
                                                                            className="viewLabel"
                                                                          >
                                                                            Criticality
                                                                          </FormLabel>
                                                                        ) : (
                                                                          <FormLabel
                                                                            component="legend"
                                                                            className="viewLabel"
                                                                          >
                                                                            Is
                                                                            this
                                                                            control
                                                                            applicable?
                                                                          </FormLabel>
                                                                        )}
                                                                        <Typography className="viewLabelValue">
                                                                          {value.criticality
                                                                            ? value.criticality
                                                                            : "-"}
                                                                        </Typography>
                                                                      </Grid>

                                                                      {value.criticality !==
                                                                        "N/A" &&
                                                                        value.criticality !==
                                                                          "No" &&
                                                                        value.criticality !==
                                                                          "Yes" && (
                                                                          <>
                                                                            <Grid
                                                                              item
                                                                              md={4}
                                                                              sm={4}
                                                                              xs={12}
                                                                            >
                                                                              <FormLabel
                                                                                component="legend"
                                                                                className="viewLabel"
                                                                              >
                                                                                Status
                                                                              </FormLabel>
                                                                              <Typography className="viewLabelValue">
                                                                                {value.auditStatus
                                                                                  ? value.auditStatus
                                                                                  : "-"}
                                                                              </Typography>
                                                                            </Grid>

                                                                            <Grid
                                                                              item
                                                                              md={ 4 }
                                                                              sm={ 4 }
                                                                              xs={ 12 }
                                                                            >
                                                                              <FormLabel
                                                                                component="legend"
                                                                                className="viewLabel"
                                                                              >
                                                                                Performance
                                                                                rating
                                                                              </FormLabel>
                                                                              {console.log(value)}
                                                                              <Typography
                                                                                style={{
                                                                                  backgroundColor:
                                                                                    value.performance &&
                                                                                    colordata.filter((i) => i.matrixConstant === (value.performance * 5) / 100).length
                                                                                      // ? colordata.filter((i) => i.matrixConstant === (value.performance * 5) / 100 )
                                                                                        ? colordata.filter((i) => i.matrixConstant === (value.performance * 5) / 100 )[0].matrixConstantColor
                                                                                        // : "#fff"
                                                                                      : "#fff",
                                                                                  border:
                                                                                    "1px",
                                                                                  width:
                                                                                    "50%",
                                                                                  height:
                                                                                    "80%",
                                                                                  textAlign:
                                                                                    "center",
                                                                                }}
                                                                                className="viewLabelValue"
                                                                              >
                                                                                {value.performance
                                                                                  ? value.performance
                                                                                  : "-"}
                                                                              </Typography>
                                                                            </Grid>
                                                                          </>
                                                                        )}
                                                                    </>
                                                                  ) : (
                                                                    <Grid
                                                                      item
                                                                      md={12}
                                                                      sm={12}
                                                                      xs={12}
                                                                    >
                                                                      <FormLabel
                                                                        component="legend"
                                                                        className="viewLabel"
                                                                      >
                                                                        Is this
                                                                        control
                                                                        applicable
                                                                        ?
                                                                      </FormLabel>
                                                                      <Typography className="viewLabelValue">
                                                                        {value.defaultResponse
                                                                          ? value.defaultResponse
                                                                          : "-"}
                                                                      </Typography>
                                                                    </Grid>
                                                                  )}
                                                                  <Grid
                                                                    item
                                                                    md={12}
                                                                    sm={12}
                                                                    xs={12}
                                                                  >
                                                                    <FormLabel
                                                                      component="legend"
                                                                      className="viewLabel"
                                                                    >
                                                                      Findings
                                                                    </FormLabel>
                                                                    <Typography className="viewLabelValue">
                                                                      {value.findings
                                                                        ? value.findings
                                                                        : "-"}
                                                                    </Typography>
                                                                  </Grid>
                                                                  {value.score && (
                                                                    <Grid
                                                                      item
                                                                      md={12}
                                                                      sm={12}
                                                                      xs={12}
                                                                    >
                                                                      <FormLabel
                                                                        component="legend"
                                                                        className="checkRadioLabel"
                                                                      >
                                                                        Score
                                                                      </FormLabel>
                                                                      <Grid
                                                                        item
                                                                        md={12}
                                                                        sm={12}
                                                                        xs={12}
                                                                      >
                                                                        <FormLabel
                                                                          component="legend"
                                                                          className="viewLabel"
                                                                        />
                                                                        <Typography className="viewLabelValue">
                                                                          {value.score
                                                                            ? value.score
                                                                            : "-"}
                                                                        </Typography>
                                                                      </Grid>
                                                                    </Grid>
                                                                  )}

                                                                  {actionData.filter(
                                                                    (val) =>
                                                                      val.id ==
                                                                      value.questionId
                                                                  )[0] &&
                                                                  actionData.filter(
                                                                    (val) =>
                                                                      val.id ==
                                                                      value.questionId
                                                                  )[0].action
                                                                    .length ? (
                                                                    <Grid
                                                                      item
                                                                      md={12}
                                                                      sm={12}
                                                                      xs={12}
                                                                    >
                                                                      <FormLabel
                                                                        component="legend"
                                                                        className="checkRadioLabel"
                                                                      >
                                                                        Corrective
                                                                        Actions
                                                                      </FormLabel>
                                                                      {actionData.map(
                                                                        (
                                                                          val
                                                                        ) => (
                                                                          <>
                                                                            {val.id ==
                                                                            value.questionId ? (
                                                                              <>
                                                                                {val
                                                                                  .action
                                                                                  .length >
                                                                                  0 && (
                                                                                  <Grid
                                                                                    item
                                                                                    md={
                                                                                      12
                                                                                    }
                                                                                    xs={
                                                                                      12
                                                                                    }
                                                                                  >
                                                                                    <Table
                                                                                      component={
                                                                                        Paper
                                                                                      }
                                                                                      className="simpleTableSection"
                                                                                    >
                                                                                      <TableHead>
                                                                                        <TableRow>
                                                                                          <TableCell className="tableHeadCellFirst">
                                                                                            Action
                                                                                            number
                                                                                          </TableCell>
                                                                                          <TableCell className="tableHeadCellSecond">
                                                                                            Action
                                                                                            title
                                                                                          </TableCell>
                                                                                        </TableRow>
                                                                                      </TableHead>
                                                                                      <TableBody>
                                                                                        {actionData.map(
                                                                                          (
                                                                                            val
                                                                                          ) => (
                                                                                            <>
                                                                                              {val.id ==
                                                                                              value.questionId ? (
                                                                                                <>
                                                                                                  {val
                                                                                                    .action
                                                                                                    .length >
                                                                                                    0 &&
                                                                                                    val.action.map(
                                                                                                      (
                                                                                                        valueAction
                                                                                                      ) => (
                                                                                                        <TableRow>
                                                                                                          <TableCell align="left">
                                                                                                            <Link
                                                                                                              className={
                                                                                                                classes.actionLinkAudit
                                                                                                              }
                                                                                                              display="block"
                                                                                                              href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${
                                                                                                                JSON.parse(
                                                                                                                  localStorage.getItem(
                                                                                                                    "BaseUrl"
                                                                                                                  )
                                                                                                                )[
                                                                                                                  "actionClientID"
                                                                                                                ]
                                                                                                              }&response_type=code&companyId=${
                                                                                                                JSON.parse(
                                                                                                                  localStorage.getItem(
                                                                                                                    "company"
                                                                                                                  )
                                                                                                                )
                                                                                                                  .fkCompanyId
                                                                                                              }&projectId=${
                                                                                                                JSON.parse(
                                                                                                                  localStorage.getItem(
                                                                                                                    "projectName"
                                                                                                                  )
                                                                                                                )
                                                                                                                  .projectName
                                                                                                                  .projectId
                                                                                                              }&targetPage=/action/details/&targetId=${
                                                                                                                valueAction.id
                                                                                                              }`}
                                                                                                              target="_blank"
                                                                                                            >
                                                                                                              {
                                                                                                                valueAction.number
                                                                                                              }
                                                                                                            </Link>
                                                                                                          </TableCell>
                                                                                                          <TableCell>
                                                                                                            {
                                                                                                              valueAction.title
                                                                                                            }
                                                                                                          </TableCell>
                                                                                                        </TableRow>
                                                                                                      )
                                                                                                    )}
                                                                                                </>
                                                                                              ) : (
                                                                                                ""
                                                                                              )}
                                                                                            </>
                                                                                          )
                                                                                        )}
                                                                                      </TableBody>
                                                                                    </Table>
                                                                                  </Grid>
                                                                                )}
                                                                              </>
                                                                            ) : (
                                                                              ""
                                                                            )}
                                                                          </>
                                                                        )
                                                                      )}
                                                                    </Grid>
                                                                  ) : (
                                                                    ""
                                                                  )}

                                                                  {value.files && (
                                                                    <Grid
                                                                      item
                                                                      md={12}
                                                                      sm={12}
                                                                      xs={12}
                                                                    >
                                                                      <FormLabel
                                                                        component="legend"
                                                                        className="checkRadioLabel"
                                                                      >
                                                                        Document
                                                                        &
                                                                        Evidence
                                                                      </FormLabel>
                                                                      <div
                                                                        style={{
                                                                          display:
                                                                            "flex",
                                                                          alignItems:
                                                                            "center",
                                                                          margin:
                                                                            "0 -10px",
                                                                        }}
                                                                      >
                                                                        {value.files.map(
                                                                          (
                                                                            file
                                                                          ) => {
                                                                            return (
                                                                              <Attachment
                                                                                key={
                                                                                  file.id
                                                                                }
                                                                                value={
                                                                                  file.fileName
                                                                                }
                                                                                type={
                                                                                  file.fileType
                                                                                }
                                                                              />
                                                                            );
                                                                          }
                                                                        )}
                                                                      </div>
                                                                    </Grid>
                                                                  )}
                                                                </Grid>
                                                              </AccordionDetails>
                                                            </Accordion>
                                                          </>
                                                        ) : (
                                                          ""
                                                        );
                                                      }
                                                    );
                                                  }
                                                )}
                                              </>
                                            );
                                          })}
                                        </>
                                      )}

                                      {/* <span
                                          className={
                                            classes.accordingHeaderContentleft
                                          }
                                        >
                                          <ListItem
                                            className={
                                              classes.accordingHeaderText
                                            }
                                          >
                                            <ListItemText
                                              className="viewLabelValueListTag"
                                              primary="Total score: "
                                              secondary="25"
                                            />
                                          </ListItem>
                                          <ListItem
                                            className={
                                              classes.accordingHeaderText
                                            }
                                          >
                                            <ListItemText
                                              className="viewLabelValueListTag"
                                              primary="Acceptable score: "
                                              secondary="<as per admin config>"
                                            />
                                          </ListItem>
                                        </span> */}
                                    </Grid>

                                    <div>
                                      <Dialog
                                        open={myVideoOpen}
                                        onClose={handleMyVideoClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth={"sm"}
                                      >
                                        {/* <DialogTitle id="alert-dialog-title">{"Admin"}</DialogTitle> */}
                                        <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                            <Grid
                                              item
                                              md={12}
                                              sm={12}
                                              xs={12}
                                              className={
                                                classes.usrProfileListBox
                                              }
                                            >
                                              <ReactVideo
                                                src="https://www.example.com/url_to_video.mp4"
                                                poster="https://www.example.com/poster.png"
                                                primaryColor="red"
                                              />
                                            </Grid>
                                          </DialogContentText>
                                        </DialogContent>
                                      </Dialog>
                                    </div>

                                    <div>
                                      <Dialog
                                        open={myAudioOpen}
                                        onClose={handleMyAudioClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                        fullWidth={true}
                                        maxWidth={"sm"}
                                      >
                                        <DialogContent>
                                          <DialogContentText id="alert-dialog-description">
                                            <Grid
                                              item
                                              md={12}
                                              sm={12}
                                              xs={12}
                                              className={
                                                classes.usrProfileListBox
                                              }
                                            >
                                              <ReactAudio
                                                src="/audio.mp4"
                                                poster="/poster.png"
                                              />
                                            </Grid>
                                          </DialogContentText>
                                        </DialogContent>
                                      </Dialog>
                                    </div>

                                    <Grid
                                      item
                                      md={12}
                                      xs={12}
                                      className="paddTBRemove"
                                    />

                                    <Grid
                                      item
                                      md={12}
                                      xs={12}
                                      className="paddTBRemove"
                                    />

                                    <Grid
                                      item
                                      md={12}
                                      xs={12}
                                      className="paddTBRemove"
                                    />
                                  </Grid>
                                </Paper>
                              </Grid>
                            </>

                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Typography
                                variant="h6"
                                className="sectionHeading"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="27"
                                  height="32"
                                  viewBox="0 0 33.2 39"
                                >
                                  <g
                                    id="Group_5726"
                                    data-name="Group 5726"
                                    transform="translate(-1540 -746)"
                                  >
                                    <g
                                      id="Group_5725"
                                      data-name="Group 5725"
                                      transform="translate(427.999)"
                                    >
                                      <path
                                        id="personal-information-5"
                                        d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Z"
                                        transform="translate(935.51 677.952)"
                                        fill="#06425c"
                                      />
                                    </g>
                                    <path
                                      id="statement-2"
                                      d="M186.341,173.22l-6.774-3.683a1.53,1.53,0,0,0-1.467,0l-6.776,3.685a1.6,1.6,0,0,0-.83,1.413v7.143a1.606,1.606,0,0,0,.83,1.413l6.775,3.682a1.531,1.531,0,0,0,1.467,0l6.775-3.684a1.607,1.607,0,0,0,.83-1.414v-7.143A1.6,1.6,0,0,0,186.341,173.22Zm-5.424,3.434a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v4.159a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127-2.1a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v6.256a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127,3.657a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v2.6a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm9.131,4.16h-9.9a.261.261,0,0,1,0-.521h9.9a.261.261,0,1,1,0,.521Z"
                                      transform="translate(1377.505 581.403)"
                                      fill="#06425c"
                                    />
                                  </g>
                                </svg>{" "}
                                Performance summary
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              md={12}
                              sm={12}
                              xs={12}
                              className="paddTBRemove"
                            >
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel
                                      component="legend"
                                      className="viewLabel"
                                    >
                                      Describe here
                                    </FormLabel>
                                    <Typography className="viewLabelValue">
                                      {complianceData["performanceSummary"] !==
                                      null
                                        ? complianceData["performanceSummary"]
                                        : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <FormLabel
                                      component="legend"
                                      className="viewLabel"
                                    >
                                      Notifications sent to
                                    </FormLabel>
                                    {notificationSentValue.length > 0
                                      ? notificationSentValue.map((value) => (
                                          <Typography
                                            display="block"
                                            className="viewLabelValue"
                                          >
                                            {value.roleName}
                                          </Typography>
                                        ))
                                      : "-"}
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                          </>
                        );
                      }
                    })()}
                  </>
                </Grid>
              </Grid>
            </Grid>

            <Grid item md={3} xs={12}>
              <div className="quickActionSection">
                <Typography variant="h5" className="rightSectiondetail">
                  Quick Actions
                </Typography>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      {complianceData.performanceSummary !== null ? (
                        <Edit />
                      ) : (
                        <Add />
                      )}
                    </ListItemIcon>
                    <NavLink
                      className="quickActionSectionLink"
                      onClick={(e) => handleNewComplianceUpdatePush(e)}
                      to={`/app/pages/compliance/compliance-details/${localStorage.getItem(
                        "fkComplianceId"
                      )}`}
                      variant="subtitle"
                      name={
                        complianceData.performanceSummary !== null
                          ? "Update compliance"
                          : "Add compliance"
                      }
                    >
                      {complianceData.performanceSummary !== null
                        ? "Update compliance"
                        : "Add compliance"}
                    </NavLink>

                    {/* <Link
                      onClick={(e) => handleNewComplianceUpdatePush(e)}
                      to="#"
                      variant="subtitle"
                      children={complianceData.performanceSummary !== null
                        ? "Update compliance"
                        : "Add compliance"}
                    >
                      <ListItemText
                        primary={
                          complianceData.performanceSummary !== null
                            ? "Update compliance"
                            : "Add compliance"
                        }
                      />
                    </Link> */}
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <NavLink
                      className="quickActionSectionLink"
                      variant="subtitle"
                      name="Comments"
                      disabled={"true"}
                      to={{
                        // pathname: `/app/comments/compliance/${id}`,
                        pathname: history.location.pathname,
                        state: commentPayload,
                      }}
                    >
                      Comments
                    </NavLink>
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </CustomPapperBlock>
  );
}

const mapStateToProps = (state) => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state,
  };
};

export default connect(
  mapStateToProps,
  null
)(ComplianceSummary);

// export default ComplianceSummary;
