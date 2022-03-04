import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccessTime from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useHistory, useParams } from 'react-router';
import projectpj from 'dan-images/projectpj.png';
import FormLabel from '@material-ui/core/FormLabel';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Styles from 'dan-styles/Summary.scss';
import Fonts from 'dan-styles/Fonts.scss';

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';

import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
// import ahaLogoSymbol from 'dan-images/ahaLogoSymbol.png';

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import api from "../../../utils/axios";
import axios from 'axios';
import moment from 'moment';
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";
import { handelActionData ,handelActionWithEntity,handelActionDataAssessment  } from "../../../utils/CheckerValue";
import Attachment from "../../Attachment/Attachment";
import ActionShow from '../../Forms/ActionShow';
import Loader from "../Loader"
import { checkValue } from "../Jha/Utils/checkValue";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

// Sidebar Links Helper Function
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
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
    paddingRight: '40px',
    '& div': {
      display: 'inline-block',
      float: 'right',
    },
  },
  updateLink: {
    float: 'left',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    actionTitleLable: {
      float: 'right',
      width: 'calc(100% - 100px)',
      textAlign: 'right',
    },
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '56px',
    marginTop: '0px',
    marginTop: 'px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  statusLabel: {
    fontSize: '14px',
    fontFamily: 'Montserrat-Regular',
    '& svg': {
      color: '#06425C',
    },
  },
}));

function AhaSummary() {
  const [assessments, setAssessments] = useState(false);
  const [approvals, setApprovals] = useState(false);
  const [lessonsLearned, setLessonsLearned] = useState(false);
  //const [summary, setSummary] = useState(false);
  const history = useHistory();
  const [expanded, setExpanded] = React.useState('panel1');



  const handleNewAhaPush = async () => {
    history.push(
      `/app/pages/aha/assessments/project-details/${localStorage.getItem(
        "fkAHAId"
      )}`
    );
  };

  const handleAhaApprovalsPush = async () => {
    handelApprovalViewChange("sidebar")
  };

  const handleAhaLessonLearnPush = async () => {
    handelLessionLearnedChanges("sidebar")
  };

  const handleCommentsPush = async () => {
    history.push(
      "/app/pages/aha/aha-comment"
    );
  };
  const handleActivityPush = async () => {
    history.push(
      "/app/pages/aha/aha-activity"
    );
  };


  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel5');


  const [closeOut, setCloseOut] = useState(false);
  const [comments, setComments] = useState(false);
  const [activity, setActivity] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  // const [expandedTableDetail, setExpandedTableDetail] = React.useState(
  //   "panel5"
  // );

  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const { id } = useParams();
  const [ahaData, setAHAData] = useState({});
  const [Teamform, setTeamForm] = useState([]);
  const [projectSturcturedData, setProjectSturcturedData] = useState([]);
  const [selectDepthAndId, setSelectDepthAndId] = useState([])
  const [isNext, setIsNext] = useState(false)
  const [notificationSentValue, setNotificationSentValue] = useState([])
  const [approvalActionData, setApprovalactionData] = useState([])
  const [lessionAction, setLessionAction] = useState([])
  const [messageSnackBar, setMessageSnackbar] = useState("")
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName
      : null;
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const projectData = JSON.parse(localStorage.getItem('projectName'));

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

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };

  let errorMessage = "Please fill"
  let errorAssessment = "assessments"
  let errorApproval = "approvals"
  let errorLession = "lession learned"

  const handleAssessmentViewChanges = () => {
    if (ahaData.notifyTo !== null) {
      setAssessments(true);
      localStorage.removeItem('Approval')
        localStorage.removeItem('lessonsLearned')
        localStorage.setItem("Assessment" , "Done")
    } else {
      history.push(`/app/pages/aha/assessments/project-details/`)
    }
    setApprovals(false);
    setCloseOut(false);
    setLessonsLearned(false);
    setComments(false);
    setActivity(false);
  }

  const handelApprovalViewChange = (side) => {
    if (ahaData.notifyTo !== null) {
      setAssessments(false);
      if (ahaData.wrpApprovalUser !== null && ahaData.sapApprovalUser !== null && side === undefined) {
        setApprovals(true);
        localStorage.removeItem('Assessment')
        localStorage.removeItem('lessonsLearned')
        localStorage.setItem("Approval" , "Done")
      } else {
        history.push(`/app/pages/aha/approvals/approvals`)
      }
      setCloseOut(false);
      setLessonsLearned(false);
      setComments(false);
      setActivity(false);
    } else {
      setMessageSnackbar(`${errorMessage} ${errorAssessment}`)
      handleClickSnackBar()
    }
  }

  const handelLessionLearnedChanges = (side) => {
    if (ahaData.notifyTo !== null && ahaData.wrpApprovalUser !== null && ahaData.sapApprovalUser !== null ) {
      setAssessments(false);
      setApprovals(false);
      setCloseOut(false);
      if (ahaData.anyLessonsLearnt !== null  && side === undefined) {
        localStorage.removeItem('Approval')
        localStorage.removeItem('Assessment')
        localStorage.setItem("lessonsLearned" , "Done")
        setLessonsLearned(true);
      } else {
        history.push(`/app/pages/aha/lessons-learned/lessons-learned`)
      }
      setComments(false);
      setActivity(false);
    } else {
      if (ahaData.notifyTo == null && ahaData.wrpApprovalUser == null && ahaData.sapApprovalUser == null ) {
        setMessageSnackbar(`${errorMessage} ${errorAssessment} , ${errorApproval}`)
        handleClickSnackBar()
      } else if (ahaData.notifyTo !== null && ahaData.wrpApprovalUser == null || ahaData.sapApprovalUser == null ) {
        setMessageSnackbar(`${errorMessage}  ${errorApproval} `)
        handleClickSnackBar()
      } 
    }

  }

  const viewSwitch = (viewName) => {
    if (viewName == "assessment") {
      handleAssessmentViewChanges()
    } else if (viewName == "approval") {
      handelApprovalViewChange()
    } else if (viewName == "lession") {
      handelLessionLearnedChanges()
    }
  }


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
    if(localStorage.getItem("lessonsLearned") === "Done"){
      await setLessonsLearned(true)
    }else if(localStorage.getItem("Approval") === "Done"){
      await setApprovals(true)
    }
    else{
      await setAssessments(true)
    }
    await setIsLoading(true);

    
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
  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
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

  const handelLessionActionTracker = async () => {
    let ahaId = localStorage.getItem("fkAHAId")
    let allAction = await handelActionWithEntity(ahaId, "aha:lessionLearned")
    setLessionAction(allAction)
  };

  const [form, setForm] = useState([]);
  const fetchHzardsData = async () => {
    let ahaID = localStorage.getItem("fkAHAId")
    const res = await api.get(
      `/api/v1/ahas/${ahaID}/areahazards/`
    );
    const result = res.data.data.results;

    let colorAssessmment = [...result]

    for (var i = 0; i < result.length; i++) {
      if (result[i].riskRating !== "") {
        if (result[i].riskRating === "2 Trivial" || result[i].riskRating === "4 Trivial") {
          colorAssessmment[i].riskRatingColour = '#009933'
        } else if (result[i].riskRating === "6 Tolerable" || result[i].riskRating === "8 Tolerable") {
          colorAssessmment[i].riskRatingColour = '#8da225'

        } else if (result[i].riskRating === "12 Moderate" || result[i].riskRating === "16 Moderate") {
          colorAssessmment[i].riskRatingColour = '#FFBF00'

        } else if (result[i].riskRating === "18 Substantial" || result[i].riskRating === "24 Substantial") {
          colorAssessmment[i].riskRatingColour = '#990000'
        }
        else {
          colorAssessmment[i].riskRatingColour = '#ff0000'
        }
      }
    }
    let resAction = await handelActionDataAssessment(ahaID, colorAssessmment, "all", "aha:hazard")
    await setForm(resAction);
    await handelActionTracker(result)

  };

  const handelActionTracker = async (resultHazard) => {
    let ahaId = localStorage.getItem("fkAHAId")
    const allAction = await handelActionWithEntity(ahaId, "aha:approval");
    setApprovalactionData(allAction)
  };

  const handelShowData = () => { }
  const handleProjectName = (projectId) => {
    const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).companies
      : null;
    const fetchCompany = userName.filter((user) => user.companyId === ahaData.fkCompanyId)
    const fetchProject = fetchCompany[0].projects.filter((user) => user.projectId === projectId)
    return fetchProject[0].projectName
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
        let data = []
        let user = notifyTo.split(",");
        const result = res.data.data.results;
        for (let i = 0; i < result.length; i++) {
          for (let j = 0; j < user.length; j++) {
            if (user[j] == result[i].id) {
              data.push(result[i]);
            }
          }
        }
        await setNotificationSentValue(data);
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (id) {
      fetchAHASummary();
      fetchTeamData();
      fetchHzardsData();
      assessmentDataValues();
      handelLessionActionTracker()
    }
  }, []);

  // const handleExpand = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };


  const classes = useStyles();
  return (
    <>
      <CustomPapperBlock title={`Assessment : ${ahaData.ahaNumber ? ahaData.ahaNumber : ""}`} icon='customDropdownPageIcon ahaPageIcon'
        whiteBg >{isLoading ? 
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30.6" height="30.168" viewBox="0 0 39.6 30.168">
                    <path id="workflow" d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z" transform="translate(0.026)" fill="#06425c" />
                  </svg> Status & stage
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                  <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12} className={classes.item}>
                      <ul className="SummaryTabList">
                        <li>
                          <Button
                            color={assessments === true ? "secondary" : "primary"}
                            variant="contained"
                            size="small"
                            className={classes.statusButton}
                            onClick={(e) =>
                              viewSwitch("assessment")
                            }
                          >
                            Assessments
                          </Button>
                          <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                            {ahaData.notifyTo !== null ? "Done" : "Pending"}{ahaData.notifyTo !== null ? <CheckCircle /> : <AccessTime />}
                          </Typography>
                        </li>
                        <li>
                          <Button
                            color={approvals == true ? "secondary" : "primary"}
                            variant={(ahaData.wrpApprovalUser !== null  && ahaData.sapApprovalUser !== null) ? "contained" : "outlined"}
                            size="small"
                            className={classes.statusButton}
                            onClick={(e) => viewSwitch("approval")}
                          >
                            Approvals
                          </Button>
                          <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                            {(ahaData.wrpApprovalUser !== null  && ahaData.sapApprovalUser !== null) ? "Done" : "Pending"}{(ahaData.wrpApprovalUser !== null  && ahaData.sapApprovalUser !== null) ? <CheckCircle /> : <AccessTime />}
                          </Typography>
                        </li>
                        <li>
                          <Button
                            color={lessonsLearned == true ? "secondary" : "primary"}
                            variant={ahaData.anyLessonsLearnt !== null ? "contained" : "outlined"}
                            size="small"
                            className={classes.statusButton}
                            onClick={(e) => viewSwitch("lession")}
                          >
                            Lessons Learned
                          </Button>
                          <Typography className={classes.statusLabel} variant="caption" display="block" align="center">
                            {ahaData.anyLessonsLearnt !== null ? "Done" : "Pending"}
                            {ahaData.anyLessonsLearnt !== null ? <CheckCircle /> : <AccessTime />}
                          </Typography>
                        </li>
                      </ul>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={12}>
                {/* summary and part */}
                <>
                  {(() => {
                    if (
                      assessments == true
                      || (approvals === false
                        && lessonsLearned === false && closeOut === false)
                    ) {
                      return (
                        <>
                          <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="35.2" height="30.626" viewBox="0 0 40.2 30.626">
                                  <g id="project-work" transform="translate(0.005)">
                                    <path id="Path_5191" data-name="Path 5191" d="M37.827,11.584l.981.981a.665.665,0,0,1,0,.939l-.792.792a5.287,5.287,0,0,1,.491,1.309h1.024a.665.665,0,0,1,.664.664v1.387a.665.665,0,0,1-.664.664H38.412a5.255,5.255,0,0,1-.579,1.269l.726.723a.665.665,0,0,1,0,.939l-.981.981a.665.665,0,0,1-.939,0l-.792-.792a5.114,5.114,0,0,1-1.309.491v1.024a.665.665,0,0,1-.664.664H32.488a.665.665,0,0,1-.664-.664V21.836a5.255,5.255,0,0,1-1.269-.579l-.723.726a.665.665,0,0,1-.939,0L27.911,21a.665.665,0,0,1,0-.939l.792-.792a5.161,5.161,0,0,1-.491-1.309H27.188a.665.665,0,0,1-.664-.664V15.912a.665.665,0,0,1,.664-.664h1.119a5.255,5.255,0,0,1,.579-1.269l-.723-.723a.665.665,0,0,1,0-.939l.981-.981a.665.665,0,0,1,.939,0l.792.792a5.16,5.16,0,0,1,1.309-.491V10.612a.665.665,0,0,1,.664-.664h1.387a.665.665,0,0,1,.664.664v1.116a5.255,5.255,0,0,1,1.269.579l.723-.723a.661.661,0,0,1,.936,0ZM1.142,23a3.671,3.671,0,0,1,2.637-1.371V.991c-3.01.294-2.66,3.078-2.643,5.666,0,.347.007.53.007.615V23Zm8.4-14.3h5.78V26.3h-6.2V8.708h.415Zm1.083,14.908h1.116V24.2H10.622v-.582Zm0-1.623h1.116v.582H10.622v-.582Zm0-1.642h1.116v.582H10.622v-.582Zm0-1.639h1.852v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.642h1.116v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.626h1.852v.582H10.622v-.582Zm3.863-.991H9.955V25.461h4.531V9.536ZM23.057,12.5V26.177H19.229V12.5h-.016l.131-.265,1.58-3.248.16-.33.167.327,1.685,3.248.141.272h-.02v0ZM19.8,12.13h2.666l-1.06-2.041H20.8L19.8,12.13ZM4.91,3.955H33.119a.773.773,0,0,1,.556.232.784.784,0,0,1,.232.556V7.03H32.445V5.247H4.91V22.2h0a.478.478,0,0,1-.409.474c-4.3.664-4.488,5.758-.128,6.487H32.445V27.021h1.462v2.813a.784.784,0,0,1-.232.556l0,0h0a.784.784,0,0,1-.556.232H4.338a5.021,5.021,0,0,1-3.494-1.9A5.631,5.631,0,0,1,.007,25.14V6.66C-.013,3.5-.036.079,4.371,0a.317.317,0,0,1,.056,0A.483.483,0,0,1,4.91.484V3.955Zm28.448,10.1a2.728,2.728,0,1,1-2.728,2.728,2.729,2.729,0,0,1,2.728-2.728Z" fill="#06425c" />
                                  </g>
                                </svg> Assessment details
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>

                                  {/* Assessment Location */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Assessment Location</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.location ? ahaData.location : "-"}
                                    </Typography>
                                  </Grid>

                                  {/* Assessment started on */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Assessment started on</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {moment(ahaData["assessmentDate"]).format(
                                        "Do MMM YYYY"
                                      )}
                                    </Typography>
                                  </Grid>

                                  {/* Assessment performed by */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Assessment performed by</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.username ? ahaData.username : "-"}
                                    </Typography>
                                  </Grid>

                                  {/* Type of permit */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Type of permit</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.typeOfPermit ? ahaData.typeOfPermit : "-"}
                                    </Typography>
                                  </Grid>

                                  {/* Permit reference number */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Permit reference number</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.permitNumber ? ahaData.permitNumber : "-"}
                                    </Typography>
                                  </Grid>

                                  {/* Description of area */}
                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Description of area</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.description ? ahaData.description : "-"}
                                    </Typography>
                                  </Grid>

                                  {/* Risk assessment team */}
                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Risk assessment team</FormLabel>
                                    {Teamform.length > 0 ?  Teamform.map((value, index) => (
                                      <ul
                                        className={Fonts.labelValue}
                                        key={index}
                                      >
                                        {value.teamName !== "" ? (
                                          <li>{value.teamName}</li>
                                        ) : "-"}
                                      </ul>
                                    )) : "-"}
                                  </Grid>

                                  {/* Area hazard */}
                                  <Grid item xs={12} md={12} className="paddBRemove">
                                    <FormLabel className="checkRadioLabel" component="legend">Area hazard</FormLabel>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    {form.length > 0 ? form.map((item, index) => (
                                      <>
                                        <ul
                                          className="viewLabelValue"
                                          key={index}
                                        >
                                          {<li>{item.hazard ? item.hazard : "-"}</li>}
                                        </ul>
                                      </>
                                    )) : "-"}
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>

                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.665" height="25.557" viewBox="0 0 32.665 25.557">
                                  <g id="placeholder-on-map-paper-in-perspective-svgrepo-com" transform="translate(0.001 -66.585)">
                                    <path id="Path_5201" data-name="Path 5201" d="M27.557,81.046l5.03,10.332a.49.49,0,0,1-.478.764H.555a.49.49,0,0,1-.478-.764l5.03-10.332a.583.583,0,0,1,.478-.3H9.9a.6.6,0,0,1,.4.184c.293.338.591.668.888,1,.282.31.566.625.847.947H6.914a.582.582,0,0,0-.478.3L3.1,90.017H29.56l-3.332-6.845a.582.582,0,0,0-.478-.3h-5.13c.281-.322.565-.636.848-.947.3-.328.6-.658.891-1a.6.6,0,0,1,.4-.183H27.08A.582.582,0,0,1,27.557,81.046Zm-3.831-7.061c0,5.646-4.7,6.7-6.91,12.13a.528.528,0,0,1-.98,0c-1.994-4.892-6.012-6.233-6.781-10.591a7.561,7.561,0,0,1,6.551-8.9A7.4,7.4,0,0,1,23.726,73.985Zm-3.492,0a3.908,3.908,0,1,0-3.908,3.908A3.908,3.908,0,0,0,20.234,73.985Z" transform="translate(0)" fill="#06425c" />
                                  </g>
                                </svg> Area hazard & notification
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item md={12} xs={12}>
                                    {form.map((item, index) => (<>
                                      <Accordion expanded={
                                        expandedTableDetail ===
                                        `panel5${index}`
                                      }
                                        onChange={handleTDChange(
                                          `panel5${index}`
                                        )} defaultExpanded className="backPaperSubAccordianWithMargin">
                                        <AccordionSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1bh-content"
                                          id="panel1bh-header"
                                          className="accordionSubHeaderSection"
                                        >
                                          <Typography className={classes.heading}> <MenuOpenOutlinedIcon
                                            className={
                                              Fonts.headingIcon
                                            }
                                          />
                                            {item.hazard ? item.hazard : "-"}
                                          </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                          <Grid container spacing={2}>

                                            {/* Identify risk */}
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Identify risk</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.risk
                                                  ? item.risk
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Risk severity */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Risk severity</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.severity
                                                  ? item.severity
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Risk probability */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Risk probability</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.probability
                                                  ? item.probability
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Risk Color */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <Typography className="viewLabelValue">
                                                <div className={classes.ratioColororange} style={{ backgroundColor: item.riskRatingColour }}>
                                                  {item.riskRating
                                                    ? item.riskRating
                                                    : "-"}
                                                </div>
                                              </Typography>
                                            </Grid>

                                            {/* Identify controls */}
                                            <Grid item md={12} sm={12} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Identify controls</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.control
                                                  ? item.control
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Evaluate residual risk */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Evaluate residual risk</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.residualRisk
                                                  ? item.residualRisk
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Approve to implement */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Approve to implement</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.approveToImplement
                                                  ? item.approveToImplement
                                                  : "-"}
                                              </Typography>
                                            </Grid>

                                            {/* Monitor */}
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormLabel component="legend" className="viewLabel">Monitor</FormLabel>
                                              <Typography className="viewLabelValue">
                                                {item.monitor
                                                  ? item.monitor
                                                  : "-"}
                                              </Typography>
                                            </Grid>
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
                                    </>))}
                                  </Grid>

                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Conditions when the work must be stopped</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {ahaData.workStopCondition !== "" ? checkValue(ahaData.workStopCondition).split(",").map((value) => (
                                        <p>
                                          {checkListAssessment[value]}
                                        </p>
                                      )) : "-"}
                                    </Typography>
                                  </Grid>

                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Additional remarks</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.additionalRemarks ? ahaData.additionalRemarks : "-"}
                                    </Typography>
                                  </Grid>

                                  <Grid item md={12} sm={12} xs={12} className={classes.formBox}>
                                    <FormLabel className="checkRadioLabel" component="legend">Attachment</FormLabel>
                                    <Grid item md={12} sm={12} xs={12}>
                                      <div className="attachFileThumb">
                                        {ahaData.ahaAssessmentAttachment ===
                                          null ? "-" : typeof ahaData.ahaAssessmentAttachment ===
                                            "string" ? (
                                          <Attachment
                                            value={
                                              ahaData.ahaAssessmentAttachment
                                            }
                                          />
                                        ) : "-"}
                                      </div>
                                    </Grid>
                                  </Grid>

                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Notifications sent to</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {notificationSentValue.length > 0 ? notificationSentValue.map((value) => value.roleName) : "-"}                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>


                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                                  <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c" />
                                </svg> Project information
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  {/* Project details */}
                                  <Grid item md={12} sm={12} xs={12}>
                                    <Typography gutterBottom className="labelValue">
                                    {handleProjectName(ahaData.fkProjectId)}
                                    </Typography>
                                    <Typography className="labelValue">
                                    {projectStructName.map(value => { return value }).join(" : ")}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                          </Grid>
                        </>
                      );
                    }
                    if (approvals == true) {
                      return (
                        <>
                          <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25.16" height="28.45" viewBox="0 0 25.16 28.45">
                                  <g id="Group_5490" data-name="Group 5490" transform="translate(-1383 -174.131)">
                                    <g id="approval" transform="translate(1383 174.131)">
                                      <path id="Path_5203" data-name="Path 5203" d="M5.821,12.357a.641.641,0,0,0,0,1.283h4.656a.641.641,0,0,0,0-1.283ZM18.006,0a7.156,7.156,0,0,1,3.07,13.618V26.975A1.478,1.478,0,0,1,19.6,28.45H1.475A1.478,1.478,0,0,1,0,26.975V5.186A1.478,1.478,0,0,1,1.475,3.711H11.732A7.153,7.153,0,0,1,18.006,0Zm1.8,14.079a7.159,7.159,0,0,1-8.62-9.1H1.475a.209.209,0,0,0-.146.06.213.213,0,0,0-.06.146V26.973a.206.206,0,0,0,.206.206H19.6a.209.209,0,0,0,.146-.06.213.213,0,0,0,.06-.146V14.079ZM5.821,21.352a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269Zm0-4.494a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269ZM15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#06425c" />
                                    </g>
                                    <g id="approval-2" data-name="approval" transform="translate(1383 174.131)">
                                      <path id="Path_5203-2" data-name="Path 5203" d="M15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#fff" />
                                    </g>
                                  </g>
                                </svg> Approvals
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <Grid container spacing={3}>

                                      {/* Competent person */}
                                      <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                                        <FormLabel className="checkRadioLabel" component="legend">Competent person</FormLabel>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                                        <Typography className="viewLabelValue">
                                        {ahaData.wrpApprovalUser ? ahaData.wrpApprovalUser : "-"}
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <FormLabel component="legend" className="viewLabel">Approved on</FormLabel>
                                        <Typography className="viewLabelValue">
                                          {ahaData.wrpApprovalDateTime ? moment(ahaData["wrpApprovalDateTime"]).format(
                                            "Do MMM YYYY"
                                          ) : "-"}
                                        </Typography>
                                      </Grid>

                                      {/* Senior authorized person */}
                                      <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                                      <FormLabel className="checkRadioLabel" component="legend">
                                          Senior authorized person
                                        </FormLabel>
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                          <Grid item xs={12} md={6}>
                                            <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                                            <Typography className="viewLabelValue">
                                            {ahaData.sapApprovalUser ? ahaData.sapApprovalUser : "-"}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12} md={6}>
                                            <FormLabel component="legend" className="viewLabel">Approved on</FormLabel>
                                            <Typography className="viewLabelValue">
                                              {ahaData.sapApprovalDateTime ? moment(ahaData["sapApprovalDateTime"]).format(
                                                "Do MMM YYYY"
                                              ) : "-"}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                              
                                 {approvalActionData.length > 0 ? 
                                  <Grid item md={12} xs={12}>
                                    <FormLabel component="legend" className="checkRadioLabel">Actions</FormLabel>
                                    <Table component={Paper}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                          <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      {/* Action show */}
                                      <TableBody>
                                      {approvalActionData.map((action, index) => (<>
                                      <TableRow>
                                        <TableCell style={{ width: 50 }}>
                                          <a
                                            href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(localStorage.getItem("BaseUrl"))["actionClientID"]}&response_type=code&companyId=${fkCompanyId}&projectId=${JSON.parse(localStorage.getItem("projectName")).projectName.projectId}&targetPage=/action/details/&targetId=${action.id}`}
                                            target="_blank"
                                          >{action.actionNumber}</a>

                                        </TableCell>
                                        <TableCell style={{ width: 50 }}>
                                          {action.actionTitle}
                                        </TableCell>
                                      </TableRow></>))
                                    }                                       
                                      </TableBody>
                                    </Table>
                                  </Grid> : null}

                                  
                                </Grid>
                              </Paper>
                            </Grid>
                          </Grid>
                        </>
                      );
                    }
                   
                    if (lessonsLearned == true) {
                      return (
                        <>
                          <Grid container spacing={3}>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25.698" height="27.581" viewBox="0 0 25.698 27.581">
                                  <g id="Group_5491" data-name="Group 5491" transform="translate(-1474 -226)">
                                    <g id="project-management-timeline" transform="translate(1474 226)">
                                      <path id="Path_5204" data-name="Path 5204" d="M23.634,17.109l.852.852a.568.568,0,0,1,0,.807l-.7.7a5,5,0,0,1,.426,1.144h.9a.594.594,0,0,1,.583.583V22.4a.594.594,0,0,1-.583.583H24.15a4.845,4.845,0,0,1-.493,1.1l.628.628a.568.568,0,0,1,0,.807l-.852.852a.568.568,0,0,1-.807,0l-.7-.7a5,5,0,0,1-1.144.426V27a.594.594,0,0,1-.583.583H18.993A.594.594,0,0,1,18.41,27v-.987a4.845,4.845,0,0,1-1.1-.493l-.628.628a.568.568,0,0,1-.807,0l-.852-.852a.568.568,0,0,1,0-.807l.7-.7a5,5,0,0,1-.426-1.144h-.9a.594.594,0,0,1-.583-.583V20.854a.594.594,0,0,1,.583-.583h.964a4.845,4.845,0,0,1,.493-1.1l-.605-.605a.568.568,0,0,1,0-.807l.852-.852a.568.568,0,0,1,.807,0l.7.7a5,5,0,0,1,1.144-.426v-.9a.594.594,0,0,1,.583-.583H20.54a.594.594,0,0,1,.583.583v.964a4.845,4.845,0,0,1,1.1.493l.628-.628a.541.541,0,0,1,.785,0ZM9.283,18.432a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h2.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm.83,6.75a.673.673,0,1,1,0,1.345H1.592a1.6,1.6,0,0,1-1.121-.471A1.557,1.557,0,0,1,0,24.935V1.592A1.557,1.557,0,0,1,.471.471,1.557,1.557,0,0,1,1.592,0H21.033a1.6,1.6,0,0,1,1.121.471,1.557,1.557,0,0,1,.471,1.121V12.423a.673.673,0,0,1-1.345,0V1.592a.23.23,0,0,0-.224-.224H1.592a.2.2,0,0,0-.157.067.175.175,0,0,0-.067.157V24.98a.23.23,0,0,0,.224.224h8.521v-.022Zm-5.9-8.566h2.4a.212.212,0,0,1,.224.224V18.9a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V16.84a.212.212,0,0,1,.224-.224Zm0-11.862h2.4a.212.212,0,0,1,.224.224V7.041a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V4.978a.212.212,0,0,1,.224-.224ZM9.283,6.57A.63.63,0,0,1,8.723,5.9a.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm-4.373,6.3A.387.387,0,0,1,4.4,12.8l-.045-.045-.718-.74a.407.407,0,0,1,.067-.583.479.479,0,0,1,.628-.022l.381.4,1.256-1.009a.394.394,0,0,1,.561.135.451.451,0,0,1-.045.628l-1.57,1.3ZM8.9,12.288a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm10.853,6.974a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(0 0)" fill="#06425c" />
                                    </g>
                                    <g id="project-management-timeline-2" data-name="project-management-timeline" transform="translate(1504 226)">
                                      <path id="Path_5204-2" data-name="Path 5204" d="M19.755,19.262a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(-30 0)" fill="#fff" />
                                    </g>
                                  </g>
                                </svg> Lessons Learned
                              </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>

                                {/* Work responsible person */}
                                  <Grid item xs={12} md={12}>
                                    <FormLabel component="legend" className="viewLabel">Work responsible person</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {user.name}, {user.badgeNo}
                                    </Typography>
                                  </Grid>

                                  {/* Are there any lessons learned? */}
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Are there any lessons learned?</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.anyLessonsLearnt ? ahaData.anyLessonsLearnt : "-"}
                                    </Typography>
                                  </Grid>


                                  {ahaData.anyLessonsLearnt === "Yes" ? 
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Lessons learned</FormLabel>
                                    <Typography className="viewLabelValue">
                                      {ahaData.lessonLearntDetails ? ahaData.lessonLearntDetails : "-"}
                                    </Typography>
                                  </Grid> : null}

                                  {/* Lessons learnt action  */}
                                  {lessionAction.length > 0 ? 
                                  <Grid item md={12} xs={12}>
                                    <FormLabel component="legend" className="checkRadioLabel">Actions</FormLabel>
                                    <Table component={Paper}>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell className="tableHeadCellFirst">Action number</TableCell>
                                          <TableCell className="tableHeadCellSecond">Action title</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      {/* Action show */}
                                      <TableBody>
                                        {lessionAction.map((action, index) => (
                                          <>
                                            <TableRow>
                                              <TableCell style={{ width: 50 }}>
                                                <a
                                                  href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(localStorage.getItem("BaseUrl"))["actionClientID"]}&response_type=code&companyId=${fkCompanyId}&projectId=${JSON.parse(localStorage.getItem("projectName")).projectName.projectId}&targetPage=/action/details/&targetId=${action.id}`}
                                                  target="_blank"
                                                >{action.actionNumber}</a>

                                              </TableCell>
                                              <TableCell style={{ width: 50 }}>
                                                {action.actionTitle}
                                              </TableCell>
                                            </TableRow>
                                          </>))
                                        }   
                                      </TableBody>
                                    </Table>
                                  </Grid> : null}
                                </Grid>
                              </Paper>
                            </Grid>
                          </Grid>
                        </>
                      );
                    }
                  })()}
                </>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <div className="quickActionSection">
              <Typography variant="h5" className="rightSectiondetail">
                Quick Actions
              </Typography>
              <List component="nav" aria-label="main mailbox folders">
                {ahaData.notifyTo !== null ?
                  <ListItem button disabled={ahaData.closedByName !== null ? true : false}>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <Link
                      variant="subtitle"
                      onClick={(e) => handleNewAhaPush(e)}
                    >
                      <ListItemText primary="Modify Assessments" />
                    </Link>
                  </ListItem> : <ListItem button disabled={ahaData.closedByName !== null ? true : false}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <Link
                      variant="subtitle"
                      disabled={ahaData.closedByName !== null ? true : false}
                      onClick={(e) => handleNewAhaPush(e)}
                    >
                      <ListItemText primary="Assessments" />
                    </Link>
                  </ListItem>}
                {ahaData.wrpApprovalUser !== null && ahaData.sapApprovalUser !== null ?
                  <ListItem button disabled={ahaData.closedByName !== null ? true : false}>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <Link
                      variant="subtitle"
                      onClick={(e) => handleAhaApprovalsPush(e)}
                    >
                      <ListItemText primary="Modify Approvals" />
                    </Link>
                  </ListItem> : <ListItem button disabled={ahaData.closedByName !== null ? true : false}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <Link
                      variant="subtitle"
                      onClick={(e) => handleAhaApprovalsPush(e)}
                    >
                      <ListItemText primary="Approvals" />
                    </Link>
                  </ListItem>
                }
                {ahaData.anyLessonsLearnt !== null ? (
                  <ListItem button>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <Link
                      variant="subtitle"
                      onClick={(e) => handleAhaLessonLearnPush(e)}>

                      <ListItemText primary="Modify Lessons learned" />
                    </Link>
                  </ListItem>
                ) :
                  (
                    <ListItem button>
                      <ListItemIcon>
                        <Add />
                      </ListItemIcon>
                      <Link
                        variant="subtitle"
                        onClick={(e) => handleAhaLessonLearnPush(e)}>

                        <ListItemText primary="Lessons learned" />
                      </Link>
                    </ListItem>
                  )}
                {/* <ListItem button disabled={ahaData.closedByName !== null ? true : false}>
                  <ListItemIcon>
                    <Close />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    disabled={ahaData.closedByName !== null ? true : false}
                    onClick={(e) => viewSwitch("closeout")}
                  >
                    <ListItemText primary="Close out" />
                  </Link>
                </ListItem> */}
                {/* <ListItem button>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    onClick={(e) => handleCommentsPush(e)}
                  >
                    <ListItemText primary="Comments" />
                  </Link>
                </ListItem>
                
                <ListItem button>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                    onClick={(e) => handleActivityPush(e)}
                  >
                    <ListItemText primary="Activity history" />
                  </Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Print />
                  </ListItemIcon>
                  <Link
                    variant="subtitle"
                  >
                    <ListItemText primary="Print" />
                  </Link>
                </ListItem>
              */}
              </List>
            </div>
          </Grid>
        </Grid>
        :
        <Loader />
        }
        <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert onClose={handleCloseSnackBar} severity="warning">
          {messageSnackBar}
        </Alert>
      </Snackbar>
      </CustomPapperBlock>
    </>
  );
}

export default AhaSummary;