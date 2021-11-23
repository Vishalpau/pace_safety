import React, { useState, useEffect } from "react";
import { PapperBlock } from "dan-components";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AccessTime from "@material-ui/icons/AccessTime";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ControlPointIcon from "@material-ui/icons/ControlPoint";

// List
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { useHistory, useParams } from "react-router";

// Icons
import Print from "@material-ui/icons/Print";
import Share from "@material-ui/icons/Share";
import Close from "@material-ui/icons/Close";
import Comment from "@material-ui/icons/Comment";
import History from "@material-ui/icons/History";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Styles from "dan-styles/Summary.scss";
import Fonts from "dan-styles/Fonts.scss";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ImageIcon from "@material-ui/icons/Image";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";

import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";

import api from "../../../utils/axios";
import moment from "moment";

import Attachment from "../../Attachment/Attachment";
import axios from "axios";
import { Comments } from "../../pageListAsync";
import ActionShow from '../../Forms/ActionShow';
import { handelActionData , handelActionWithEntity } from "../../../utils/CheckerValue"
import { checkValue, handelFileName, handelJhaId } from "../Jha/Utils/checkValue";
import Loader from "../../Forms/Loader";

// import AhaSummary from "../../../containers/Activity/Activity" ;

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";
import { map } from "draft-js/lib/DefaultDraftBlockRenderMap";

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 12,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    float: 'left',
    width: '100%',
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
    padding: "7px!important",
    height: "50px",
    marginTop: "0px",
    borderRadius: "5px",
    color: "#ffffff",
    width: "100%",
  },
  labelValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
    listStyleType: "disc",
    listStylePosition: "inside",
  },
}));

function AhaSummary() {
  const [assessments, setAssessments] = useState(true);
  const [approvals, setApprovals] = useState(false);
  const [lessonsLearned, setLessonsLearned] = useState(false);
  const [closeOut, setCloseOut] = useState(false);
  const [comments, setComments] = useState(false);
  const [activity, setActivity] = useState(false);
  //const [summary, setSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [expandedTableDetail, setExpandedTableDetail] = React.useState(
    "panel5"
  );

  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const { id } = useParams();
  //const [summary, setSummary] = useState(false);
  const [ahaData, setAHAData] = useState({});
  const [Teamform, setTeamForm] = useState([]);
  const [projectSturcturedData, setProjectSturcturedData] = useState([]);
  const [actionTakenData, setActionTakenData] = useState([]);
  const [selectDepthAndId, setSelectDepthAndId] = useState([])
  const [isNext, setIsNext] = useState(false)
  const [approvalActionData, setApprovalactionData] = useState([])
  const [lessionAction, setLessionAction] = useState([])
  const [notificationSentValue, setNotificationSentValue] = useState([])
  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName
      : null;

  const handleNewAhaPush = async () => {
    history.push(
      `/app/pages/aha/assessments/project-details/${localStorage.getItem(
        "fkAHAId"
      )}`
    );
  };
  const handleAhaApprovalsPush = async () => {
    history.push("/app/pages/aha/approvals/approvals");
  };
  const handleAhaLessonLearnPush = async () => {
    history.push("/app/pages/aha/lessons-learned/lessons-learned");
  };

  const handleCloseOutPush = async () => {

    history.push("/app/pages/aha/close-out");
  };



  const viewSwitch = (viewName) => {
    if (viewName == "assessment") {
      if (ahaData.notifyTo !== "") {
        setAssessments(true);
      } else {
        history.push(`/app/pages/aha/assessments/project-details/`)
      }
      setApprovals(false);
      setCloseOut(false);
      setLessonsLearned(false);
      setComments(false);
      setActivity(false);
    } else if (viewName == "approval") {
      setAssessments(false);
      if (ahaData.wrpApprovalUser !== "") {
        setApprovals(true);
      } else {
        history.push(`/app/pages/aha/approvals/approvals`)
      }
      setCloseOut(false);
      setLessonsLearned(false);
      setComments(false);
      setActivity(false);
    } else if (viewName == "lession") {
      setAssessments(false);
      setApprovals(false);
      setCloseOut(false);
      if (ahaData.anyLessonsLearnt !== "") {
        setLessonsLearned(true);
      } else {
        history.push(`/app/pages/aha/lessons-learned/lessons-learned`)
      }
      setComments(false);
      setActivity(false);
    } else if (viewName = "closeOut") {
      setAssessments(false);
      setApprovals(false);
      if (ahaData.closedByName !== null) {
        setCloseOut(true);
      } else {
        history.push(`/app/pages/aha/close-out`)
      }
      setLessonsLearned(false);
      setComments(false);
      setActivity(false);
    }
  }


  const handleCommentsPush = async () => {
    await setAssessments(false);
    await setApprovals(false);
    await setLessonsLearned(false);
    await setCloseOut(false);
    await setComments(true);
    await setActivity(false);

    // history.push("/app/comments/comments");
  };
  const handleActivityPush = async () => {
    await setAssessments(false);
    await setApprovals(false);
    await setLessonsLearned(false);
    await setCloseOut(false);
    await setComments(false);
    await setActivity(true);
    // history.push("/app/activity/activity");
  };

  const user = JSON.parse(localStorage.getItem("userDetails"));

  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1].split("-");
    const lastNameArray = fileName[fileName.length - 1];
    // const lastName = fileName.split("-");
    return lastNameArray;
  };
  const [projectStructName, setProjectStructName] = useState([])
  const fetchAHASummary = async () => {
    const res = await api.get(`/api/v1/ahas/${id}/`);
    const result = res.data.data.results;
    await setAHAData(result);
    await handelWorkArea(result)
    await fetchBreakDownData(result.fkProjectStructureIds);
    await fetchNotificationSent(result.notifyTo)

  };
  const handelWorkArea = async (assessment) => {
    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;
    let structName = []
    let projectStructId = assessment.fkProjectStructureIds.split(":")
    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0]["structureName"])
    }
    setProjectStructName(structName)
  }


  const fetchTeamData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`
    );
    const result = res.data.data.results;
    await setTeamForm(result);
  };
  const projectData = JSON.parse(localStorage.getItem('projectName'));
  const fetchBreakDownData = async (projectBreakdown) => {
    let breakdownLength = projectData.projectName.breakdown.length
    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    setSelectDepthAndId(breakDown)
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === '1L') {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;
            await setIsLoading(true);
            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown, {
                    breakDownLabel: projectData.projectName.breakdown[0].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }

                ];

              }
            });
            setProjectSturcturedData(selectBreakDown)
          })
          .catch((error) => {

            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key - 1].substring(2)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {

            const result = response.data.data.results;

            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown,
                  {
                    breakDownLabel: projectData.projectName.breakdown[key].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }
                ];

              }
            });

            setProjectSturcturedData(selectBreakDown)

          })
          .catch((error) => {
            setIsNext(true);
          });
      }
    }
  };



  // console.log(projectSturcturedData,"lkklklklkl")
  const [form, setForm] = useState([]);
  const fetchHzardsData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`
    );
    const result = res.data.data.results;

    let zzz = [...result]
    for (var i = 0; i < result.length; i++) {
      if (result[i].riskRating !== "") {
        if (result[i].riskRating === "2 Trivial" || result[i].riskRating === "4 Trivial") {
          zzz[i].riskRatingColour = '#009933'
        } else if (result[i].riskRating === "6 Tolerable" || result[i].riskRating === "8 Tolerable") {
          zzz[i].riskRatingColour = '#8da225'

        } else if (result[i].riskRating === "12 Moderate" || result[i].riskRating === "16 Moderate") {
          zzz[i].riskRatingColour = '#fff82e'

        }  else if (result[i].riskRating === "18 Substantial" || result[i].riskRating === "24 Substantial") {
          zzz[i].riskRatingColour = '#990000'
        }
        else {
          zzz[i].riskRatingColour = '#ff0000'
        }
      }
    }

    await setForm(zzz);
    await handelActionTracker(result)
  };

  const handelActionTracker = async (resultHazard) => {
    let ahaId = localStorage.getItem("fkAHAId")

    let actionData = await handelActionData(ahaId, resultHazard)
    await setForm(actionData);

    let allAction = await handelActionData(ahaId, [], "title")
    let temp = []
    allAction.map((value) => {
      if (value.enitityReferenceId.split(":")[1] == "00") {
        temp.push(value)
      }
    })
    setApprovalactionData(temp !== null ? temp : [])
  };
  const handelShowData = () => {

  }

  const handelLessionActionTracker = async () => {
    let ahaId = localStorage.getItem("fkAHAId")
    let allAction = await handelActionWithEntity(ahaId, "aha:lessionLearned")
    setLessionAction(allAction)
  };


  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const fetchactionTrackerData = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {};
    const allActionTrackerData = await api_action.get("/api/v1/actions/");
    const allActionTracker = allActionTrackerData.data.data.results.results;
    const newData = allActionTracker.filter(
      (item) => item.enitityReferenceId === localStorage.getItem("fkAHAId")
    );
    let sorting = newData.sort((a, b) => a.id - b.id);

    await setActionTakenData(sorting);
    // await setIsLoading(true);
  };

  const [checkListAssessment, setCheckListAssessment] = useState({})

  const assessmentDataValues = async () => {
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const baseUrl = localStorage.getItem("apiBaseUrl")
    var tempPerformance = {}
    

    const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/aha-document-conditions/${projectId}/`);
    const apiCondition = documentCondition.data.data.results[0].checklistValues;

   
    apiCondition.map((value) => {
      tempPerformance[value.inputValue] = value.inputLabel
    })    
    setCheckListAssessment(tempPerformance)
  }

  const fetchNotificationSent = async (notifyTo) => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/aha/?subentity=aha&roleType=custom`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        let user = result.filter(name => name.id = notifyTo)
        await setNotificationSentValue(user);
      }
    } catch (error) { }
  };


  useEffect(() => {
    if (id) {
      fetchAHASummary();
      fetchTeamData();
      fetchHzardsData();
      handelLessionActionTracker();
      assessmentDataValues();
      // fetchactionTrackerData();
    }
  }, []);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const classes = useStyles();
  return (
    <PapperBlock
      title={`Assesment : ${ahaData.ahaNumber ? ahaData.ahaNumber : ""}`}
      icon="ion-md-list-box"
    >{isLoading ? <>
      <Box paddingBottom={1}>
        <div className={Styles.incidents}>
          <div className={Styles.item}>
            <Button
              color={assessments == true ? "secondary" : "primary"}
              variant="contained"
              size="small"
              endIcon={ahaData.notifyTo !== "" ? <CheckCircle /> : <AccessTime />}
              className={classes.statusButton}
              onClick={(e) =>
                viewSwitch("assessment")
              }
            >
              Assessments
            </Button>
            <Typography variant="caption" display="block">
              {ahaData.notifyTo !== "" ? "Done" : "Pending"}
            </Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color={approvals == true ? "secondary" : "primary"}
              variant={ahaData.wrpApprovalUser !== "" ? "contained" : "outlined"}
              size="small"
              endIcon={ahaData.wrpApprovalUser !== "" ? <CheckCircle /> : <AccessTime />}
              className={classes.statusButton}
              onClick={(e) => viewSwitch("approval")}

            >
              Approvals
            </Button>
            <Typography variant="caption" display="block">
              {ahaData.wrpApprovalUser !== "" ? "Done" : "Pending"}
            </Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color={closeOut == true ? "secondary" : "primary"}

              size="small"
              variant={ahaData.closedByName !== null ? "contained" : "outlined"}
              endIcon={ahaData.closedByName !== null ? <CheckCircle /> : <AccessTime />}
              className={classes.statusButton}
              onClick={(e) => viewSwitch("closeOut")}

            >
              Close Out
            </Button>
            <Typography variant="caption" display="block">
              {ahaData.closedByName !== null ? "Done" : "Pending"}

            </Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color={lessonsLearned == true ? "secondary" : "primary"}
              variant={ahaData.anyLessonsLearnt !== "" ? "contained" : "outlined"}
              size="small"
              endIcon={ahaData.anyLessonsLearnt !== "" ? <CheckCircle /> : <AccessTime />}
              className={classes.statusButton}
              onClick={(e) => viewSwitch("lession")}

            >
              Lessons Learned
            </Button>
            <Typography variant="caption" display="block">
              {ahaData.anyLessonsLearnt !== "" ? "Done" : "Pending"}

            </Typography>
          </div>

        </div>
        <Divider />
      </Box>

      <Box marginTop={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>


              {/* summary and part */}
              <>
                {(() => {
                  if (
                    assessments == true ||
                    (approvals === false && lessonsLearned === false && closeOut === false && comments === false)
                  ) {
                    return (
                      <>
                        <Grid item xs={12}>
                          <Accordion
                            expanded={expanded === "panel1"}
                            onChange={handleExpand("panel1")}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>
                                Project Details
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container item xs={12} spacing={3}>
                                <>
                                  <Grid item md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Project structure
                                    </Typography>
                                    <Typography className={Fonts.labelValue}>
                                      {project.projectName}  {projectStructName.map((value) => ` - ${value}`)}

                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Work Area
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.workArea ? ahaData.workArea : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Location
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.location ? ahaData.location : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Assessment performed by
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.username ? ahaData.username : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Assessment started on
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {moment(ahaData["assessmentDate"]).format(
                                        "Do MMMM YYYY"
                                      )}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Permit to perform
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.permitToPerform ? ahaData.permitToPerform : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Permit reference
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.permitNumber ? ahaData.permitNumber : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Description
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.description ? ahaData.description : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Risk Assessment team
                                    </Typography>
                                    {Teamform.length > 0 ? 
                                    Teamform.map((value, index) => (
                                      <ul
                                        className={Fonts.labelValue}
                                        key={index}
                                      >
                                        
                                          <li>{value.teamName}</li>
                                      </ul>
                                    )) : "-" }
                                   </Grid>
                                </>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion
                            expanded={expanded === "panel2"}
                            onChange={handleExpand("panel2")}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>
                                Area Hazards
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container item xs={12} spacing={3}>
                                <>
                                  <Grid item xs={12} md={6}>
                                    {form.length > 0 ? form.map((item, index) => (
                                      <>
                                        <ul
                                          className={Fonts.labelValue}
                                          key={index}
                                        >
                                          {<li>{item.hazard ? item.hazard : "-"}</li>}
                                        </ul>
                                      </>
                                    )) : "-"}
                                    {/* <Typography variant="body" className={Fonts.labelValue}>
                                        {item.risk}
                                      </Typography> */}
                                  </Grid>
                                </>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion
                            expanded={expanded === "panel3"}
                            onChange={handleExpand("panel3")}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>
                                Assessment
                              </Typography>
                            </AccordionSummary>

                            <AccordionDetails>
                              <Grid container item xs={12} spacing={3}>
                                <>
                                  <Grid item md={12} xs={12}>
                                    <Grid item md={12}>
                                      <div>
                                        {form.map((item, index) => (
                                          <>
                                            <Accordion
                                              expanded={
                                                expandedTableDetail ===
                                                `panel5${index}`
                                              }
                                              onChange={handleTDChange(
                                                `panel5${index}`
                                              )}
                                              defaultExpanded
                                              className={classes.backPaper}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={classes.headingColor}
                                              >
                                                <Typography
                                                  className={classes.heading}
                                                >
                                                  <MenuOpenOutlinedIcon
                                                    className={
                                                      Fonts.headingIcon
                                                    }
                                                  />
                                                  {item.hazard ? item.hazard : "-"}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Grid container spacing={2}>
                                                  <Grid
                                                    item
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Identify Risk
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.risk
                                                        ? item.risk
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>

                                                  <Grid
                                                    item
                                                    md={5}
                                                    sm={5}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Risk Severity
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.severity
                                                        ? item.severity
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    md={5}
                                                    sm={5}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Risk Probability
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.probability
                                                        ? item.probability
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    md={2}
                                                    sm={2}
                                                    xs={12}
                                                  >
                                                    <div
                                                      className={
                                                        classes.ratioColororange
                                                      }
                                                      style={{ backgroundColor: item.riskRatingColour }}
                                                    >
                                                      {item.riskRating
                                                        ? item.riskRating
                                                        : "-"}
                                                    </div>
                                                  </Grid>

                                                  <Grid
                                                    item
                                                    md={12}
                                                    sm={12}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Identify Controls
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.control
                                                        ? item.control
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    md={4}
                                                    sm={4}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Evaluate Residual Risk
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.residualRisk
                                                        ? item.residualRisk
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    md={4}
                                                    sm={4}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Approve to Implement
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.approveToImplement
                                                        ? item.approveToImplement
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>

                                                  <Grid
                                                    item
                                                    md={4}
                                                    sm={4}
                                                    xs={12}
                                                  >
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={
                                                        Fonts.labelName
                                                      }
                                                    >
                                                      Monitor
                                                    </Typography>
                                                    <Typography
                                                      variant="body"
                                                      className={
                                                        Fonts.labelValue
                                                      }
                                                    >
                                                      {item.monitor
                                                        ? item.monitor
                                                        : "-"}
                                                    </Typography>
                                                  </Grid>
                                                  <Grid
                                                    item
                                                    md={12}
                                                    xs={12}
                                                    className={
                                                      classes.createHazardbox
                                                    }
                                                  >
                                                    <Divider light />
                                                  </Grid>
                                                </Grid>
                                                <Grid>
                                                  {item.action !== undefined && item.action.map((valueAction) => (
                                                    <ActionShow
                                                      action={valueAction}
                                                      companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                                                      projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                                                      handelShowData={handelShowData}
                                                    />
                                                  ))}

                                                </Grid>

                                              </AccordionDetails>
                                            </Accordion>
                                          </>
                                        ))}
                                      </div>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Conditions when the work must be stopped
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                    {ahaData.workStopCondition !== "" ? checkValue(ahaData.workStopCondition).split(",").map((value) => (
                                            <p>
                                               {checkListAssessment[value]}
                                            </p>
                                          )) : "-"}
                                      {/* {ahaData.workStopCondition ? ahaData.workStopCondition : "-"} */}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Additional remarks
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.additionalRemarks ? ahaData.additionalRemarks : "-"}
                                    </Typography>
                                  </Grid>
                                </>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion
                            expanded={expanded === "panel4"}
                            onChange={handleExpand("panel4")}
                          >
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                              <Typography className={classes.heading}>
                                Documents & Notifications
                              </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Grid container item xs={12} spacing={3}>
                                <>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Risk assessment supporting documents
                                    </Typography>
                                    {ahaData.ahaAssessmentAttachment ? (
                                      <Typography
                                        className={classes.labelValue}
                                      // title={handelFileName(
                                      //   ahaData.ahaAssessmentAttachment
                                      // )}
                                      >
                                        {/* <Attachment value={initialData.attachment}/> */}
                                        {ahaData.ahaAssessmentAttachment ===
                                          null ? null : typeof ahaData.ahaAssessmentAttachment ===
                                            "string" ? (
                                          <Attachment
                                            value={
                                              ahaData.ahaAssessmentAttachment
                                            }
                                          />
                                        ) : null}
                                      </Typography>
                                    ) : (
                                      "-"
                                    )}
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Links
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      className={Fonts.labelValue}
                                    >
                                      {ahaData.link !== "null" ? ahaData.link : "-"}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Notifications sent to
                                    </Typography>
                                    <Typography
                                      variant="body"
                                      display="block"
                                      className={Fonts.labelValue}
                                    >
                                      {notificationSentValue.length > 0 ? notificationSentValue.map((value) => value.roleName) : "-"}
                                    </Typography>
                                  </Grid>
                                </>
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </>
                    );
                  }
                  if (approvals == true) {
                    return (
                      <>
                        <Grid item xs={12} style={{ padding: "0px 12px" }}>
                          <Typography className={classes.heading}>
                          Competent person
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Approved by
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {ahaData.wrpApprovalUser ? ahaData.wrpApprovalUser : "-"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Approved on
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {ahaData.wrpApprovalDateTime ? moment(ahaData["wrpApprovalDateTime"]).format(
                                  "Do MMMM YYYY"
                                ) : "-"}
                              </Typography>
                            </Grid>

                          </Grid>
                        </Grid><Grid item xs={12} style={{ padding: "0px 12px" }}>
                          <Typography className={classes.heading}>
                            Senior Authorized Person
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Approved by
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {ahaData.sapApprovalUser ? ahaData.sapApprovalUser : "-"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Approved on
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {ahaData.sapApprovalDateTime ? moment(ahaData["sapApprovalDateTime"]).format(
                                  "Do MMMM YYYY"
                                ) : "-"}
                              </Typography>
                            </Grid>

                          </Grid>
                        </Grid>
                        <Grid item md={12}>{approvalActionData.length > 0 &&
                          <Grid item md={6}>
                            <Typography className={Fonts.heading}>
                              Actions
                            </Typography>
                            <Typography>
                              {approvalActionData.map((value) => (
                                <>
                                  <ActionShow
                                    action={{ id: value.actionId, number: value.actionNumber }}
                                    title={value.actionTitle}
                                    companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                                    projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                                    handelShowData={handelShowData}
                                  />

                                </>
                              ))}
                            </Typography>
                          </Grid>}
                        </Grid>
                      </>
                    );
                  }
                  if (closeOut == true) {
                    return (<>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Closed by
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ahaData.closedByName ? ahaData.closedByName : "-"}
                        </Typography>
                      </Grid><Grid item xs={12} md={6}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          className={Fonts.labelName}
                        >
                          Closed on
                        </Typography>
                        <Typography
                          variant="body"
                          className={Fonts.labelValue}
                        >
                          {ahaData.closedDate ? moment(ahaData["closedDate"]).format(
                            "Do MMMM YYYY"
                          ) : "-"}

                        </Typography>
                      </Grid>
                    </>)
                  }
                  if (lessonsLearned == true) {
                    return (
                      <>
                        <Grid item xs={12}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={12}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                              Competent person
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {user.name}, {user.badgeNo ? user.badgeNo : "-"}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={12}>
                              <Typography
                                variant="h6"
                                gutterBottom
                                className={Fonts.labelName}
                              >
                                Lessons learned
                              </Typography>
                              <Typography
                                variant="body"
                                className={Fonts.labelValue}
                              >
                                {ahaData.lessonLearntDetails ? ahaData.lessonLearntDetails : "-"}
                              </Typography>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                  <Typography className={classes.aLabelValue}>
                                    {lessionAction.map((value) => (
                                      <>
                                        <ActionShow
                                          action={{ id: value.actionId, number: value.actionNumber }}
                                          title={value.actionTitle}
                                          companyId={projectData.companyId}
                                          projectId={projectData.projectId}
                                          handelShowData={handelShowData}
                                        />

                                      </>
                                    ))}
                                  </Typography>
                            </Grid>
                            
                          </Grid>
                        </Grid>
                      </>
                    );
                  }
                  if (comments == true) {
                    return (<div>
                      <Comments
                        commentContext="Aha"
                        id={localStorage.getItem("fkAHAId")}
                      />
                    </div>)
                  }
                  // if (summary == true) {
                  //   return (
                  //       <div>Summary Section</div>
                  //       );
                  // }
                })()}
              </>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper>
              <List
                dense
                subheader={
                  <ListSubheader component="div">Actions</ListSubheader>
                }
              >{ahaData.notifyTo !== "" ? (
                <ListItemLink disabled={ahaData.closedByName !== null}
                  onClick={(e) => handleNewAhaPush(e)}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Update Assessments" />
                </ListItemLink>) : (
                <ListItemLink disabled={ahaData.closedByName !== null}
                  onClick={(e) => handleNewAhaPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Add Assessments" />
                </ListItemLink>)}
                {ahaData.wrpApprovalUser !== "" ? (<ListItemLink
                  disabled={ahaData.closedByName !== null}
                  onClick={(e) => handleAhaApprovalsPush(e)}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Update Approvals" />
                </ListItemLink>) : (<ListItemLink
                  disabled={ahaData.closedByName !== null}

                  onClick={(e) =>
                    handleAhaApprovalsPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Add Approvals" />
                </ListItemLink>)}

                {ahaData.anyLessonsLearnt !== "" ? (<ListItemLink
                  // disabled={ahaData.closedByName !== null}
                  onClick={(e) => handleAhaLessonLearnPush(e)}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Update Lessons Learned" />
                </ListItemLink>) :
                  (<ListItemLink
                    // disabled={ahaData.closedByName !== null}
                    onClick={(e) => handleAhaLessonLearnPush(e)}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add Lessons Learned" />
                  </ListItemLink>)}
                <ListItemLink onClick={(e) => handleCloseOutPush(e)}>
                  <ListItemIcon>
                    <Close />
                  </ListItemIcon>
                  <ListItemText primary=" Close Out" />
                </ListItemLink>


                {false &&
                  <>
                    <ListItem button onClick={(e) => handleCommentsPush(e)}>
                      <ListItemIcon>
                        <Comment />
                      </ListItemIcon>
                      <ListItemText primary="Comments" />
                    </ListItem>

                    <ListItem button onClick={(e) => handleActivityPush(e)}>
                      <ListItemIcon>
                        <History />
                      </ListItemIcon>
                      <ListItemText primary="Activity History" />
                    </ListItem>
                  </>
                }

              </List>
              <Divider />
              <List dense>
                {false && <>
                  <ListItem button>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <ListItemText primary="Print" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <Share />
                    </ListItemIcon>
                    <ListItemText primary="Share" />
                  </ListItem>
                </>
                }
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </> :
      <>
        <Loader/>
      </>
      }
    </PapperBlock>
  );
}

export default AhaSummary;