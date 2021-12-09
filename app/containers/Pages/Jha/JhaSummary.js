import React, { useEffect, useState } from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccessTime from '@material-ui/icons/AccessTime';
import Add from '@material-ui/icons/Add';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import Edit from '@material-ui/icons/Edit';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import History from '@material-ui/icons/History';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import axios from "axios";
import { PapperBlock } from 'dan-components';
import Fonts from 'dan-styles/Fonts.scss';
import Styles from 'dan-styles/Summary.scss';
import MuiAlert from '@material-ui/lab/Alert';
import moment from "moment";
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Link from '@material-ui/core/Link';
import Attachment from "../../../containers/Attachment/Attachment";
import api from "../../../utils/axios";
import { handelActionData } from "../../../utils/CheckerValue";
import { HEADER_AUTH, SSO_URL } from "../../../utils/constants";
import ActionShow from '../../Forms/ActionShow';
import Snackbar from '@material-ui/core/Snackbar';
import { Comments } from "../../pageListAsync";
import { checkValue, handelFileName, handelJhaId } from "../Jha/Utils/checkValue";
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';
import FormLabel from '@material-ui/core/FormLabel';

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// Sidebar Links Helper Function
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
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
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    float: 'left',
    width: '100%',
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
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  actionTitleLable: {
    float: 'right',
    width: 'calc(100% - 100px)',
    textAlign: 'right',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function JhaSummary() {
  const [assessmentsView, setAssessmentsView] = useState(true);
  const [approvalsView, setApprovalsView] = useState(false);
  const [closeOutView, setCloseOutView] = useState(false);
  const [lessonsLearnedView, setLessonsLearnedView] = useState(false);
  const [commentsView, setCommentsView] = useState(false)
  const history = useHistory();
  const [assessment, setAssessment] = useState({})
  const [expanded, setExpanded] = useState(false);
  const [projectStructure, setProjectStructure] = useState({})
  const [team, setTeam] = useState([])
  const [hazard, setHazard] = useState([])
  const [user, setUser] = useState({ name: "", badgeNumber: "" })
  const [loader, setLoader] = useState(false)
  const [notificationSentValue, setNotificationSentValue] = useState([])
  const [formStatus, setFormStatus] = useState({
    assessmentStatus: false,
    approvalStatus: false,
    closeOutStatus: false,
    lessionLeranedStatus: false
  })
  const [approvalActionData, setApprovalactionData] = useState([])
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
  })
  const [projectStructName, setProjectStructName] = useState([])
  const [allActionType, setAllActionType] = useState({})
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackbar] = useState("")
  const [checkListAssessment, setCheckListAssessment] = useState({})
  const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel5');
  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName
      : null;
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const handelAsessment = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const result = res.data.data.results;
    await setAssessment(result)
    await handelWorkArea(result)
    await fetchNotificationSent(result.notifyTo)
    const resTeam = await api.get(`/api/v1/jhas/${jhaId}/teams/`)
    const resultTeam = resTeam.data.data.results
    await setTeam(resultTeam)

    const resHazards = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const resultHazard = resHazards.data.data.results
    await handelActionTracker(resultHazard)
    let assessmentDecider = result.link !== null
    let approvalDecider = result.wrpApprovalUser !== null && result.wrpApprovalUser !== ""
    let lessionDecider = result.anyLessonsLearnt !== null
    let closeOutDecider = result.closedById !== null
    await setFormStatus({
      ...formStatus,
      assessmentStatus: assessmentDecider,
      approvalStatus: approvalDecider,
      closeOutStatus: closeOutDecider,
      lessionLeranedStatus: lessionDecider
    })
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

  const handelProjectStructre = () => {
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectName = project.projectName.projectName

    const phaseAndUnit = JSON.parse(localStorage.getItem("selectBreakDown")) != null ? JSON.parse(localStorage.getItem("selectBreakDown")) : ""

    const phaseName = phaseAndUnit[0] != undefined ? phaseAndUnit[0].name : ""
    const unitName = phaseAndUnit[1] != undefined ? phaseAndUnit[1].name : ""
    const workArea = phaseAndUnit[2] != undefined ? phaseAndUnit[2].name : ""
    setProjectStructure({
      projectName: projectName,
      phaseName: phaseName,
      unitName: unitName,
      workArea: workArea,
    })

    let user = JSON.parse(localStorage.getItem("userDetails"))
    setUser({ ...user, name: user.name, badgeNumber: user.badgeNo })
  }

  const handleNewJhaPush = async () => {
    history.push(
      "/app/pages/jha/assessments/Job-hazards"
    );
  };

  const handleJhaApprovalsPush = async () => {
    history.push(
      "/app/pages/jha/approvals/approvals"
    );
  };

  const handleJhaLessonLearnPush = async () => {
    history.push(
      "/app/pages/jha/lessons-learned/lessons-learned"
    );
  };

  const handleClosePush = async () => {
    history.push("/app/pages/jha/close-out");
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const handelActionTracker = async (resultHazard) => {
    let actionType = { "jha:hazard": [], "jha:lessonLearned": [], "jha:approval": [] }
    let jhaId = localStorage.getItem("fkJHAId")
    let allAction = await handelActionData(jhaId, [], "title")

    allAction.map((value) => {
      if (Object.keys(actionType).includes(value["actionContext"])) {
        actionType[value["actionContext"]].push(value)
      }
    })
    setAllActionType(actionType)
    let allHazardActions = actionType["jha:hazard"]
    let actionHazard = {}

    allHazardActions.map((value) => {
      let hazardId = value["enitityReferenceId"].split(":")[1]
      let hazarAction = { "number": value["actionNumber"], "id": value["id"], "title": value["actionTitle"] }
      if (Object.keys(actionHazard).includes(hazardId)) {
        actionHazard[hazardId].push(hazarAction)
      } else {
        actionHazard[hazardId] = [hazarAction]
      }
    })

    resultHazard.map((value) => {
      if (Object.keys(actionHazard).includes(value["id"].toString())) {
        value["action"] = actionHazard[value["id"]]
      }
    })
    await setHazard(resultHazard)

    let temp = []
    allAction.map((value) => {
      if (value.enitityReferenceId.split(":")[1] == "00") {
        temp.push(value)
      }
    })
    setApprovalactionData(temp !== null ? temp : [])
  };

  const handelActionLink = async () => {
    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;

    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    await setProjectData({ ...projectData, projectId: projectId, companyId: fkCompanyId })
  }
  const handelShowData = () => { }

  const assessmentDataValues = async () => {
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const baseUrl = localStorage.getItem("apiBaseUrl")
    var tempPerformance = {}
    const specificPerformance = await api.get(`${baseUrl}/api/v1/core/checklists/jha-human-performance-aspects/${projectId}/`);
    const apiDataPerformance = specificPerformance.data.data.results.length > 0 ? specificPerformance.data.data.results[0].checklistGroups : [];

    const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/jha-document-conditions/${projectId}/`);
    const apiCondition = documentCondition.data.data.results.length > 0 ? documentCondition.data.data.results[0].checklistValues : [];

    apiDataPerformance.map((value) => {
      value.checkListValues.map((checkValue) => {
        tempPerformance[checkValue.inputValue] = checkValue.inputLabel
      });
    });
    apiCondition.map((value) => {
      tempPerformance[value.inputValue] = value.inputLabel
    })
    setCheckListAssessment(tempPerformance)
  }

  const handelWorkArea = async (assessment) => {
    let structName = {}
    let projectStructId = assessment.fkProjectStructureIds.split(":")

    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await
        api_work_area.get(`/api/v1/companies/${assessment.fkCompanyId}/projects/${assessment.fkProjectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      let result = workArea.data.data.results[0]
      structName[result["structure_name"]] = result["structureName"]
    }
    setProjectStructName(structName)

  }

  const fetchNotificationSent = async (notifyTo) => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/jha/?subentity=jha&roleType=custom`,
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

  const handelApprovalTabStatus = () => {
    let approvalStatusDecide;
    assessment["wrpApprovalUser"] !== null &&
      assessment["sapApprovalDateTime"] !== null ? approvalStatusDecide = true : approvalStatusDecide = false
    return approvalStatusDecide
  }


  let errorMessage = "Please fill"
  let errorAssessment = "assessments"
  let errorApproval = "approvals"
  let errorLession = "lession learned"
  let errorCloseOut = "close out"

  const handleAssessmentViewChanges = () => {
    if (formStatus.assessmentStatus) {
      setAssessmentsView(true);
    } else {
      history.push(`/app/pages/jha/assessments/Job-hazards`)
    }
    setApprovalsView(false);
    setCloseOutView(false);
    setLessonsLearnedView(false);
    setCommentsView(false)
  }

  const handelApprovalViewChange = () => {
    if (formStatus.assessmentStatus === true) {
      setAssessmentsView(false);
      if (handelApprovalTabStatus()) {
        setApprovalsView(true);
      } else {
        history.push(`/app/pages/jha/approvals/approvals`)
      }
      setCloseOutView(false);
      setLessonsLearnedView(false);
      setCommentsView(false)
    } else {
      setMessageSnackbar(`${errorMessage} ${errorAssessment}`)
      handleClickSnackBar()
    }

  }

  const handelLessionLearnedChanges = () => {
    if (formStatus.assessmentStatus === true && formStatus.approvalStatus === true && formStatus.closeOutStatus === true) {
      setAssessmentsView(false);
      setApprovalsView(false);
      setCloseOutView(false);
      if (formStatus.lessionLeranedStatus) {
        setLessonsLearnedView(true);
      } else {
        history.push(`/app/pages/jha/lessons-learned/lessons-learned`)
      }
      setCommentsView(false)
    } else if (formStatus.assessmentStatus === false && formStatus.approvalStatus === false && formStatus.closeOutStatus === false) {
      setMessageSnackbar(`${errorMessage} ${errorAssessment} and ${errorApproval} and ${errorCloseOut}`)
      handleClickSnackBar()
    } else if (formStatus.assessmentStatus === true && formStatus.approvalStatus === false && formStatus.closeOutStatus === false) {
      setMessageSnackbar(`${errorMessage} ${errorApproval} and ${errorCloseOut}`)
      handleClickSnackBar()
    } else if (formStatus.assessmentStatus === true && formStatus.approvalStatus === true && formStatus.closeOutStatus === false) {
      setMessageSnackbar(`${errorMessage} ${errorCloseOut}`)
      handleClickSnackBar()
    }
  }

  const handelCloseOutViewChanges = () => {
    if (formStatus.assessmentStatus === true && formStatus.approvalStatus === true) {
      setAssessmentsView(false);
      setApprovalsView(false);
      if (formStatus.closeOutStatus) {
        setCloseOutView(true);
      } else {
        history.push(`/app/pages/jha/close-out`)
      }
      setLessonsLearnedView(false);
      setCommentsView(false)
    } else if (formStatus.assessmentStatus === false && formStatus.approvalStatus === false) {
      setMessageSnackbar(`${errorMessage} ${errorAssessment} and ${errorApproval}`)
      handleClickSnackBar()
    } else if (formStatus.assessmentStatus === true && formStatus.approvalStatus === false) {
      setMessageSnackbar(`${errorMessage} ${errorApproval}`)
      handleClickSnackBar()
    }
  }

  const handelCommentsViewChange = () => {
    setAssessmentsView(false);
    setApprovalsView(false);
    setCloseOutView(false);
    setLessonsLearnedView(false);
    setCommentsView(true)
  }

  const viewSwitch = (viewName) => {
    if (viewName == "assessment") {
      handleAssessmentViewChanges()
    } else if (viewName == "approval") {
      handelApprovalViewChange()
    } else if (viewName == "lession") {
      handelLessionLearnedChanges()
    } else if (viewName == "comments") {
      handelCommentsViewChange()
    } else if (viewName = "closeOut") {
      handelCloseOutViewChanges()
    }
  }

  
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handelCallBack = async () => {
    await setLoader(true)
    await handelAsessment()
    await handelProjectStructre()
    await handelActionLink()
    await assessmentDataValues()
    await setLoader(false)
  }

  useEffect(() => {
    handelCallBack()
  }, [])

  const classes = useStyles();
  return (

    <CustomPapperBlock title="Assessment Number: IR-15415415"
      title={`Assessment Number: ${assessment.jhaNumber !== undefined ? assessment.jhaNumber : ""}`}
      icon={jhaLogoSymbol} whiteBg 
      >
      {loader == false ?
        
        <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30.6" height="30.168" viewBox="0 0 39.6 30.168">
                      <path id="workflow" d="M37.251,11.412l.967.967a.645.645,0,0,1,0,.925l-.78.78a5.208,5.208,0,0,1,.483,1.289H38.93a.645.645,0,0,1,.645.645V17.4a.645.645,0,0,1-.645.645h-1.1a5.176,5.176,0,0,1-.57,1.25l.715.712a.645.645,0,0,1,0,.925l-.967.967a.645.645,0,0,1-.928.013l-.78-.78a5.037,5.037,0,0,1-1.289.483v1.009a.645.645,0,0,1-.645.645H31.991a.645.645,0,0,1-.645-.645V21.512a5.3,5.3,0,0,1-1.26-.564l-.712.709a.645.645,0,0,1-.925,0l-.967-.967a.645.645,0,0,1,0-.925l.78-.78a5.082,5.082,0,0,1-.483-1.289H26.77a.645.645,0,0,1-.645-.645V15.676a.645.645,0,0,1,.645-.645h1.1a5.176,5.176,0,0,1,.57-1.25l-.712-.722a.645.645,0,0,1,0-.925l.967-.967a.645.645,0,0,1,.925,0l.78.78a5.082,5.082,0,0,1,1.289-.483V10.455a.645.645,0,0,1,.645-.645H33.7a.645.645,0,0,1,.645.645v1.1a5.176,5.176,0,0,1,1.25.57l.712-.712a.645.645,0,0,1,.922,0ZM14.2,17.081a.709.709,0,0,1-.645-.761.693.693,0,0,1,.645-.761h8.079a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM8.864,14.825h2.72a.242.242,0,0,1,.255.255V17.8a.238.238,0,0,1-.255.245H8.864A.238.238,0,0,1,8.61,17.8V15.07a.242.242,0,0,1,.255-.255Zm0,6.719h2.72a.242.242,0,0,1,.255.255v2.72a.242.242,0,0,1-.255.255H8.864a.242.242,0,0,1-.255-.255v-2.73a.242.242,0,0,1,.255-.255ZM14.2,23.8a.709.709,0,0,1-.645-.757.693.693,0,0,1,.645-.761h5.511a.709.709,0,0,1,.645.761.693.693,0,0,1-.645.757ZM9.651,11.334a.435.435,0,0,1-.583-.074l-.061-.052-.812-.835a.461.461,0,0,1,.077-.645A.541.541,0,0,1,8.98,9.7l.432.458L10.995,8.7a.448.448,0,0,1,.645.151.509.509,0,0,1-.052.709L9.654,11.341Zm4.512-.645c-.355,0-.59-.355-.59-.761s.235-.761.59-.761h9.346a.712.712,0,0,1,.645.761.7.7,0,0,1-.645.761ZM1.11,22.662a3.617,3.617,0,0,1,2.6-1.35V.967C.746,1.257,1.088,4,1.107,6.549V22.662ZM4.817,3.9h27.79a.761.761,0,0,1,.548.229.773.773,0,0,1,.229.548V6.929H31.949V5.156H4.817V21.87h0a.471.471,0,0,1-.4.467c-4.228.654-4.431,5.669-.122,6.388H31.949v-2.1H33.39v2.772a.777.777,0,0,1-.229.548h0a.773.773,0,0,1-.548.229H4.253A4.953,4.953,0,0,1,.811,28.3a5.569,5.569,0,0,1-.828-3.535V6.562C-.017,3.445-.05.077,4.291,0h.058a.474.474,0,0,1,.467.477Zm28.038,9.962a2.688,2.688,0,1,1-2.688,2.688,2.688,2.688,0,0,1,2.688-2.688Z" transform="translate(0.026)" fill="#06425c"/>
                    </svg> Status & stage
                  </Typography>
                </Grid>
          {/* {console.log(commentsView)} */}
          
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                    <Grid item md={12} sm={12} xs={12} className={classes.item}>
                        <ul className="SummaryTabList">
                        <li>
                <Button
                  color={assessmentsView ? "secondary" : "primary"}
                  size="large"
                  variant={formStatus.assessmentStatus ? "contained" : "outlined"}
                  endIcon={
                    formStatus.assessmentStatus ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  onClick={(e) => viewSwitch("assessment")}
                >
                  Assessments
                </Button>
                <Typography variant="caption" display="block">
                  {formStatus.assessmentStatus ? "Done" : "Pending"}
                </Typography>
                </li>
                          <li>
                <Button
                  color={approvalsView ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={handelApprovalTabStatus() ? "contained" : "outlined"}
                  endIcon={
                    handelApprovalTabStatus() ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  onClick={(e) => viewSwitch("approval")}
                >
                  Approvals
                </Button>
                <Typography variant="caption" display="block">
                  {handelApprovalTabStatus() ? "Done" : "Pending"}
                </Typography>
                </li>
                          <li>
                <Button
                  color={closeOutView ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={formStatus.closeOutStatus ? "contained" : "outlined"}
                  endIcon={
                    formStatus.closeOutStatus ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  onClick={(e) => viewSwitch("closeOut")}
                >
                  Close out
                </Button>
                <Typography variant="caption" display="block">
                  {formStatus.closeOutStatus ? "Done" : "Pending"}
                </Typography>
                </li>
                          <li>
                <Button
                  color={lessonsLearnedView ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={formStatus.lessionLeranedStatus ? "contained" : "outlined"}
                  endIcon={
                    formStatus.lessionLeranedStatus ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  onClick={(e) => viewSwitch("lession")}
                >
                  Lessons Learned
                </Button>
                <Typography variant="caption" display="block">
                  {formStatus.lessionLeranedStatus ? "Done" : "Pending"}
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
                        assessmentsView == true
                        || (approvalsView === false
                          && lessonsLearnedView === false
                          && closeOutView === false
                          && commentsView == false)
                      ) {
                        return (
                          <>
                            <Grid container spacing={3}>
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                  <Typography variant="h6" className="sectionHeading">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                                      <g id="Group_5483" data-name="Group 5483" transform="translate(-1177 -226)">
                                        <g id="Group_5477" data-name="Group 5477" transform="translate(626 89)">
                                          <g id="outline-assignment-24px" transform="translate(551 137)">
                                            <g id="Bounding_Boxes">
                                              <path id="Path_2274" data-name="Path 2274" d="M0,0H31V31H0Z" fill="none"/>
                                            </g>
                                            <path id="personal-information" d="M13.971,2.694,18.572,7h-4.6V2.694Zm-9.105,13.6a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519h5.773V16.294Zm0,3.718a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519h5.773V20.012Zm0-11.155a.5.5,0,0,0-.47.519.491.491,0,0,0,.47.519H10.2a.52.52,0,0,0,0-1.038Zm0-3.718a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519H7.8a.5.5,0,0,0,.47-.519.491.491,0,0,0-.47-.519Zm0,7.438a.52.52,0,0,0,0,1.038h9.028a.5.5,0,0,0,.47-.519.491.491,0,0,0-.47-.519Zm16.27-4.955a.766.766,0,0,0-.557-.737L13.8.282A.754.754,0,0,0,13.206,0H1.379A1.376,1.376,0,0,0,0,1.376V24.953a1.372,1.372,0,0,0,.4.975,1.388,1.388,0,0,0,.975.4H10.66V24.791H1.538V1.541H12.433V7.769a.773.773,0,0,0,.773.773h6.388v5.038h1.543Z" transform="translate(2.325 1.144)" fill="#06425c"/>
                                          </g>
                                          <path id="personal-information-2" data-name="personal-information" d="M22.832,27.629c-.136-.211-.388-.5-.388-.756a.4.4,0,0,1,.272-.359c0-.211-.021-.43-.021-.643v-.38a1.294,1.294,0,0,1,.042-.235,1.348,1.348,0,0,1,.606-.77,1.839,1.839,0,0,1,.329-.157c.209-.075.106-.425.333-.43a2.987,2.987,0,0,1,1.75.843,1.36,1.36,0,0,1,.348.876l-.021.939a.3.3,0,0,1,.235.19c.073.3-.235.66-.373.895s-.632.916-.632.921a.186.186,0,0,0,.045.108c.777,1.069,3.053.395,3.053,2.518H20.343c0-2.114,2.283-1.449,3.053-2.518.038-.056.056-.087.054-.11s-.575-.829-.625-.909h0Z" transform="translate(548.748 132.768)" fill="#fff"/>
                                        </g>
                                        <g id="construction-engineer" transform="translate(1191 241.5)">
                                          <path id="Path_5202" data-name="Path 5202" d="M0,12.081H3.4V7.893a.35.35,0,0,1,.01-.082C.577,8.215.721,9.52,0,12.081ZM4.306,3.614v.527l.18.247a.226.226,0,0,1,.044.124h0a2.728,2.728,0,0,0,.676,1.844,2.494,2.494,0,0,0,1.4.6,2.254,2.254,0,0,0,1.4-.743,2.991,2.991,0,0,0,.626-1.7.231.231,0,0,1,.033-.1h0l.16-.265,0-.549.472,0,0,.6a.235.235,0,0,1-.034.139L9.1,4.609A3.418,3.418,0,0,1,8.37,6.517a2.728,2.728,0,0,1-1.722.911.236.236,0,0,1-.077,0A2.957,2.957,0,0,1,4.877,6.7a3.119,3.119,0,0,1-.813-2.083l-.173-.237a.239.239,0,0,1-.059-.158v-.6h.474ZM6.477,0a3.22,3.22,0,0,1,.66.068l-.04,1.9L7.789.277A3.235,3.235,0,0,1,9.664,2.694h.374v.444h-.33v.006H3.246V3.138h-.27V2.694H3.29A3.235,3.235,0,0,1,5.262.237l.6,1.7L5.93.047A3.22,3.22,0,0,1,6.477,0ZM6.146,10.562h.721v.721H6.146v-.721Zm0-1.784h.721V9.5H6.146V8.779Zm-2.084,3.3H8.952V7.893a.318.318,0,0,1,.034-.145l-2.479.015L4.028,7.748a.332.332,0,0,1,.034.145v4.188Zm5.557,0h3.4c-.721-2.561-.577-3.866-3.406-4.268a.344.344,0,0,1,.01.082v4.187Z" fill="#06425c"/>
                                        </g>
                                      </g>
                                    </svg> Job details
                                  </Typography>
                                </Grid>
                                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                      {/* job title */}
                                      <Grid item xs={12} md={12}>
                                      <FormLabel component="legend" className="viewLabel">Job title</FormLabel>

                                      <Typography className="viewLabelValue">
                                          {checkValue(assessment.jobTitle)}
                                        </Typography>
                                      </Grid>
                                      

                                      {/* location */}
                                      <Grid item xs={12} md={12}>
                                      <FormLabel component="legend" className="viewLabel">Location</FormLabel>

                                    <Typography className="viewLabelValue">
                                          {checkValue(assessment.location)}
                                        </Typography>
                                      </Grid>

                                      {/* Order number */}
                                      <Grid item xs={12} md={6}>
                                      <FormLabel component="legend" className="viewLabel">

                                      Order number
                                        </FormLabel>
                                        <Typography className="viewLabelValue">
                                          {checkValue(assessment.jobOrderNumber)}
                                        </Typography>
                                      </Grid>

                                      {/* assessment start date */}
                                      <Grid item xs={12} md={6}>
                                      <FormLabel component="legend" className="viewLabel">
                                          Assessment started on
                                        </FormLabel>
                                        <Typography className="viewLabelValue">
                                          {checkValue(assessment.jhaAssessmentDate)}
                                        </Typography>
                                      </Grid>
                                        
                                        {/* Permit to work# */}

                                        <Grid item xs={12} md={6}>
                                        <FormLabel component="legend" className="viewLabel">

                                        Permit to work
                                          </FormLabel>
                                          <Typography className="viewLabelValue">
                                            {checkValue(assessment.permitToPerform)}
                                          </Typography>
                                        </Grid>
                                      


                                    

                                   

                                      {/* risk assessment team */}
                                      <Grid item xs={12} md={12}>
                                      <FormLabel component="legend" className="viewLabel">

                                          Risk Assessment team
                                        </FormLabel>
                                        {team !== undefined && team.length > 0 ?  team.map((value) => (
                                          <Typography className="viewLabelValue">
                                          {value.teamName}</Typography>
                                        )):"-"}

                                      </Grid>

                                      
                                
                                  <Grid item xs={12} md={12} className="paddBRemove">
                                    <FormLabel className="checkRadioLabel" component="legend">Area hazard</FormLabel>
                                  </Grid>
                              
                                 
                                      <Grid item xs={12} md={12}>
                                        {false &&
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Hazards Group
                                          </Typography>
                                        }
                                        {
                                          hazard !== undefined && hazard.map((value, index) => (
                                            <div>
                                            <Typography className="viewLabelValue">
                                                {checkValue(value.hazard)}
                                              </Typography>
                                            </div>
                                          ))
                                        }
                                      </Grid>
                                      </Grid>
                                    </Paper>
                                  </Grid>
                                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.576" height="31.799" viewBox="0 0 32.576 31.799">
                                  <path id="Path_5209" data-name="Path 5209" d="M13.679,14.917a.252.252,0,1,1,.119-.49,5.485,5.485,0,0,0,1.318.164,5.334,5.334,0,0,0,1.315-.164.251.251,0,1,1,.122.488,5.658,5.658,0,0,1-1.437.178,6.036,6.036,0,0,1-1.437-.175ZM23.5,23.451a5.939,5.939,0,0,0,.867,1.217,4.974,4.974,0,0,0,1.376,1.015.136.136,0,0,0,.119.005.481.481,0,0,0,.164-.122,1.927,1.927,0,0,0,.151-.186c.22-.292.493-.652.88-.472l.024.013,1.288.74.013.008a.582.582,0,0,1,.241.5,1.375,1.375,0,0,1-.188.639,1.3,1.3,0,0,1-.62.546,2.741,2.741,0,0,1-.763.207,2.6,2.6,0,0,1-1.166-.1,5.2,5.2,0,0,1-1.174-.567l-.029-.019c-.191-.119-.4-.247-.6-.4A7.491,7.491,0,0,1,22.1,24.23a3.666,3.666,0,0,1-.514-2.314,1.683,1.683,0,0,1,.562-1.055,1.511,1.511,0,0,1,1.121-.3.169.169,0,0,1,.13.082l.824,1.4a.433.433,0,0,1,.069.467.928.928,0,0,1-.315.355c-.045.037-.1.077-.154.117-.186.133-.4.289-.323.472Zm-4.295-4.462a9.628,9.628,0,0,1-1.055-1.352L18,17.409a4.563,4.563,0,0,1-5.941-.247c-.048-.042-.1-.087-.141-.133-.114.318-.26.7-.416,1.052a6.169,6.169,0,0,1-.461.885,4.536,4.536,0,0,0,8.17.021ZM14.782,1.9h.665a.225.225,0,0,1,.225.225v.991h.991a.225.225,0,0,1,.225.225v.665a.225.225,0,0,1-.225.225h-.991v.991a.225.225,0,0,1-.225.225h-.665a.225.225,0,0,1-.225-.225V4.234h-.991a.225.225,0,0,1-.225-.225V3.343a.225.225,0,0,1,.225-.225h.991V2.126a.225.225,0,0,1,.225-.225ZM25,16.651a7.566,7.566,0,1,1-6.845,10.806H1.654A1.581,1.581,0,0,1,0,25.911a5.732,5.732,0,0,1,1.429-3.685,4.515,4.515,0,0,1,1.434-1.214c1.67-.931,6.066-1.225,7.762-2.521a6.463,6.463,0,0,0,.321-.649c.2-.461.387-.965.5-1.31a15.909,15.909,0,0,1-1.318-1.877L8.8,12.534A3.844,3.844,0,0,1,8.043,10.6a1.549,1.549,0,0,1,.13-.695,1.287,1.287,0,0,1,.459-.533A1.481,1.481,0,0,1,8.955,9.2a33.636,33.636,0,0,1-.064-3.812,5.222,5.222,0,0,1,.164-.864C11.145-2.932,21.16-.278,21.6,5.88l-.082,3.46h0a.962.962,0,0,1,.7.726,3,3,0,0,1-.366,1.821h0a.134.134,0,0,1-.024.042l-1.519,2.5A12.982,12.982,0,0,1,18.448,17l.2.289a10.9,10.9,0,0,0,.8,1.066h0a3.223,3.223,0,0,0,.414.308A7.584,7.584,0,0,1,25,16.651Zm4.4,3.173a6.221,6.221,0,1,0,1.821,4.4,6.2,6.2,0,0,0-1.821-4.4Zm-12.7-9.292a.241.241,0,1,1,.268-.4,1.111,1.111,0,0,0,.6.13,1.2,1.2,0,0,0,.62-.159.24.24,0,0,1,.257.406,1.712,1.712,0,0,1-.87.233,1.564,1.564,0,0,1-.875-.209ZM20.27,9.138A1.361,1.361,0,0,0,20,8.39l-.008-.019,0,.005C18.406,6.134,10.517,5.122,10.177,9.8l.013.032-.583-.048.042.135-.04-.09a1.185,1.185,0,0,0-.562.17.539.539,0,0,0-.194.223.823.823,0,0,0-.064.358,3.184,3.184,0,0,0,.636,1.548l.005.008,1.333,2.121c3.375,5.352,6.439,3.849,8.9-.212l1.5-2.473a2.4,2.4,0,0,0,.318-1.318c-.037-.148-.2-.223-.482-.236-.058,0-.122,0-.183,0s-.138.005-.209.013a.073.073,0,0,0-.024,0l-.323-.9Zm-8.43,1.394a.241.241,0,0,1,.268-.4,1.165,1.165,0,0,0,.61.141,1.34,1.34,0,0,0,.652-.156.241.241,0,0,1,.241.416,1.833,1.833,0,0,1-.891.22,1.616,1.616,0,0,1-.88-.22Zm-.1-1.071a.239.239,0,0,1-.278-.39,1.9,1.9,0,0,1,1.1-.384,1.943,1.943,0,0,1,1.121.382.24.24,0,0,1-.273.395,1.465,1.465,0,0,0-.848-.3,1.4,1.4,0,0,0-.822.294Zm5.193,0a.239.239,0,0,1-.278-.39,1.9,1.9,0,0,1,1.1-.384,1.943,1.943,0,0,1,1.121.382.24.24,0,1,1-.273.395,1.465,1.465,0,0,0-.848-.3,1.4,1.4,0,0,0-.822.294Z" transform="translate(0 0.011)" fill="#06425c"/>
                                </svg> Emergency contact details
                              </Typography>
                            </Grid>
                                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Supervisor</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {checkValue(assessment.supervisorName)}
																		</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Department</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {checkValue(assessment.department)}
																		</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Emergency phone number</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {checkValue(assessment.emergencyNumber)}
																		</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Evacuation assembly point</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {checkValue(assessment.evacuationAssemblyPoint)}
																		</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <FormLabel component="legend" className="viewLabel">Permit number</FormLabel>
                                    <Typography className="viewLabelValue">
                                    {checkValue(assessment.permitNumber)}
																		</Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                                
                            
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26.156" height="27.004" viewBox="0 0 26.156 27.004">
                                  <g id="attention-signal-and-construction-worker-svgrepo-com" transform="translate(-8.551)">
                                    <path id="iconos_43_" d="M17.453,26.549,22.912,17.1l-.788-.758a5.11,5.11,0,0,1-3.26,1.2,5.04,5.04,0,0,1-3.093-1.077l-1.122,1.077h-2.2A3.033,3.033,0,0,0,10.024,18.6c-1.8,2.077-1.5,6.565-1.365,7.945ZM14.3,12.008a5.581,5.581,0,0,0,1.44,3.184,4.983,4.983,0,0,0,.516.47,4.587,4.587,0,0,0,.728.47,4.056,4.056,0,0,0,3.791,0,4.585,4.585,0,0,0,.728-.47c.182-.152.349-.3.515-.47a5.565,5.565,0,0,0,1.425-3.169h.045a1.554,1.554,0,0,0,1.44-1.653,1.747,1.747,0,0,0-.606-1.349H13.648a1.747,1.747,0,0,0-.606,1.349A1.622,1.622,0,0,0,14.3,12.008ZM16.635,1.88a6.887,6.887,0,0,0-3.29,3.973l-.106.334h-.864v1.9H25.141v-1.9h-.849l-.106-.334A6.858,6.858,0,0,0,20.9,1.9V6.019a1.268,1.268,0,0,1-.121.47,1.192,1.192,0,0,1-1.046.652h-1.91A1.189,1.189,0,0,1,16.65,6.126a.622.622,0,0,1-.015-.167V1.88Zm1.183,4.761h1.9a.7.7,0,0,0,.622-.379.649.649,0,0,0,.091-.334V.94a1.183,1.183,0,0,0-.061-.334A.959.959,0,0,0,19.485,0H17.817a.694.694,0,0,0-.7.622c0,.03-.015.061-.015.091V5.928a.763.763,0,0,0,.121.409A.739.739,0,0,0,17.817,6.641Zm8.006,16.117h1.91l.364-2.972.106-.849.061-.455H25.292Zm-.2.485h2.365v2.365H25.626Zm1.061-10.2a.5.5,0,0,0-.424.243L24.352,16.6l-.273.47-.273.47-5.049,8.749a.48.48,0,0,0-.061.243.4.4,0,0,0,.061.227.484.484,0,0,0,.425.243H34.223a.479.479,0,0,0,.485-.485.524.524,0,0,0-.106-.3l-7.49-12.933A.484.484,0,0,0,26.687,13.04Zm3.154,13.04H20.016l4.928-8.521.273-.47.273-.47,1.228-2.108L33.4,26.079Z" fill="#06425c"/>
                                  </g>
                                </svg> Job hazard & notification
                              </Typography>
                            </Grid>
                            
                              
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                      <Grid
                                        item
                                        md={12}
                                        xs={12}
                                      >
                                        
                                          {hazard !== undefined && hazard.map((value, index) => (
                                            <Accordion expanded={expandedTableDetail === 'panel5'} onChange={handleExpand('panel5')} defaultExpanded className="backPaperSubAccordianWithMargin"
                                              
                                              // key={index}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className="accordionSubHeaderSection"
                                              >
                                                <Typography
                                                  className={classes.heading}>
                                                  <MenuOpenOutlinedIcon
                                                    className={classes.headingIcon}
                                                  />
                                                  {`${value.hazard}`}
                                                </Typography>
                                              </AccordionSummary>
                                              <AccordionDetails>
                                                <Grid container spacing={2}>

                                                  <Grid item md={6} sm={6} xs={6}>
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Risk
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      {checkValue(value.risk)}
                                                    </Typography>
                                                  </Grid>

                                                  <Grid item md={6} sm={6} xs={6}>
                                                    <Typography
                                                      variant="h6"
                                                      gutterBottom
                                                      className={Fonts.labelName}
                                                    >
                                                      Controls
                                                    </Typography>
                                                    <Typography variant="body" className={Fonts.labelValue}>
                                                      {checkValue(value.control)}
                                                    </Typography>
                                                  </Grid>
                                                </Grid>
                                                <Grid>
                                                  {value.action !== undefined && value.action.map((valueAction) => (
                                                    <ActionShow
                                                      action={valueAction}
                                                      companyId={projectData.companyId}
                                                      projectId={projectData.projectId}
                                                      handelShowData={handelShowData}
                                                    />
                                                  ))}

                                                </Grid>
                                              </AccordionDetails>
                                            </Accordion>
                                          ))}
                                        

                                      </Grid>

                                      {assessment.workStopCondition !== undefined &&
                                        assessment.workStopCondition !== "" &&
                                        assessment.workStopCondition !== null &&
                                        assessment.workStopCondition.split(",").length > 0 ?
                                        <Grid item xs={12} md={12}>
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Conditions when the work must be stopped
                                          </Typography>

                                          {checkValue(assessment.workStopCondition).split(",").map((value) => (
                                            <p>
                                              {checkListAssessment[value]}
                                            </p>
                                          ))}
                                        </Grid>
                                        : null}

                                      {assessment.humanPerformanceAspects &&
                                        assessment.humanPerformanceAspects !== "" &&
                                        assessment.humanPerformanceAspects.split(",").length > 0 ?

                                        <Grid item xs={12} md={12}>
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Specific human performance aspects that have been discussed before commencing the work
                                          </Typography>
                                          <Typography variant="body" className={Fonts.labelValue}>
                                            {checkValue(assessment.humanPerformanceAspects).split(",").map((value) => (
                                              <p>
                                                {checkListAssessment[value]}
                                              </p>
                                            ))}
                                          </Typography>
                                        </Grid>
                                        :
                                        null}
                                      <Grid item xs={12} md={12}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Additional remarks
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.additionalRemarks)}
                                        </Typography>
                                      </Grid>

                                      <Grid item xs={12} md={12}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Risk assessment supporting documents
                                        </Typography>
                                        <Typography title={handelFileName(assessment.jhaAssessmentAttachment)}>
                                          {assessment.jhaAssessmentAttachment != "" &&
                                            typeof assessment.jhaAssessmentAttachment == "string" ? (
                                            <Attachment value={assessment.jhaAssessmentAttachment} />
                                          ) :
                                            "-"
                                          }
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

                                        <Typography variant="body" display="block" className={Fonts.labelValue}>
                                          {notificationSentValue.length > 0 ? notificationSentValue.map((value) => value.roleName) : "-"}
                                        </Typography>

                                      </Grid>
                                      </Grid>
                              </Paper>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                                  <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c"/>
                                </svg> Project information
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                              <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                  <Grid item md={12} sm={12} xs={12}>
                                    <Typography gutterBottom className="labelValue">
                                    {projectStructure.projectName}
                                    </Typography>
                                    <Typography className="labelValue">
                                    {Object.entries(projectStructName).map(([key, value], index) => (
                                            <>
                                              {Object.keys(projectStructName)[index + 1] !== undefined ? `${value} : ` : `${value}`}
                                            </>
                                          ))}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </Grid>
                          </Grid>
                          </>
                        );
                      }
                      if (approvalsView == true) {
                        return (
                          <>
                          <Grid container spacing={3}>
                          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Typography variant="h6" className="sectionHeading">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25.16" height="28.45" viewBox="0 0 25.16 28.45">
                                    <g id="Group_5490" data-name="Group 5490" transform="translate(-1383 -174.131)">
                                      <g id="approval" transform="translate(1383 174.131)">
                                        <path id="Path_5203" data-name="Path 5203" d="M5.821,12.357a.641.641,0,0,0,0,1.283h4.656a.641.641,0,0,0,0-1.283ZM18.006,0a7.156,7.156,0,0,1,3.07,13.618V26.975A1.478,1.478,0,0,1,19.6,28.45H1.475A1.478,1.478,0,0,1,0,26.975V5.186A1.478,1.478,0,0,1,1.475,3.711H11.732A7.153,7.153,0,0,1,18.006,0Zm1.8,14.079a7.159,7.159,0,0,1-8.62-9.1H1.475a.209.209,0,0,0-.146.06.213.213,0,0,0-.06.146V26.973a.206.206,0,0,0,.206.206H19.6a.209.209,0,0,0,.146-.06.213.213,0,0,0,.06-.146V14.079ZM5.821,21.352a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269Zm0-4.494a.634.634,0,1,0,0,1.269h8.907a.634.634,0,1,0,0-1.269ZM15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#06425c"/>
                                      </g>
                                      <g id="approval-2" data-name="approval" transform="translate(1383 174.131)">
                                        <path id="Path_5203-2" data-name="Path 5203" d="M15.908,5.969l1.313,1.25,2.723-2.76c.225-.227.364-.41.641-.125l.9.917c.294.292.28.461,0,.732L17.733,9.673c-.586.574-.484.609-1.077.021L14.4,7.448a.26.26,0,0,1,.025-.4l1.04-1.079c.155-.162.282-.153.445,0Z" fill="#fff"/>
                                      </g>
                                    </g>
                                  </svg> Approvals
                                </Typography>
                              </Grid>
                              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Paper elevation={1} className="paperSection">
                                  <Grid container spacing={3}>
                                  <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                            <FormLabel className="checkRadioLabel" component="legend">Competent Person</FormLabel>

                            </Grid>
                            
                                <Grid item xs={12} md={6}>
                                <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                                  <Typography className="viewLabelValue">
                                    {checkValue(assessment.wrpApprovalUser)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <FormLabel component="legend" className="viewLabel">Approved on</FormLabel>

                                <Typography className="viewLabelValue">
                                    {assessment.wrpApprovalDateTime !== null ?
                                      <>
                                        {moment(checkValue(assessment.wrpApprovalDateTime)).format("Do MMM YYYY")}
                                      </>
                                      : "-"
                                    }
                                  </Typography>
                                
                            </Grid>

                            <Grid item md={12} sm={12} xs={12} className="paddBRemove">
                            <FormLabel className="checkRadioLabel" component="legend">Senior authorized Person</FormLabel>
                            </Grid>
                            
                                <Grid item xs={12} md={6}>
                                <FormLabel component="legend" className="viewLabel">Approved by</FormLabel>
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {checkValue(assessment.sapApprovalUser)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                <FormLabel component="legend" className="viewLabel">Approved on</FormLabel>

                                <Typography className="viewLabelValue">
                                    {assessment.sapApprovalDateTime !== null ?
                                      <>
                                        {moment(checkValue(assessment.sapApprovalDateTime)).format("Do MMM YYYY")}
                                      </>
                                      : "-"
                                    }
                                  </Typography>
                                
                            </Grid>
                            {allActionType["jha:approval"].length > 0 ? 
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
                                      {allActionType["jha:approval"].map((action, index) => (<>
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
                      if (lessonsLearnedView == true) {
                        return (
                          <>
                              <Grid container spacing={3}>
                              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Typography variant="h6" className="sectionHeading">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25.698" height="27.581" viewBox="0 0 25.698 27.581">
                                    <g id="Group_5491" data-name="Group 5491" transform="translate(-1474 -226)">
                                      <g id="project-management-timeline" transform="translate(1474 226)">
                                        <path id="Path_5204" data-name="Path 5204" d="M23.634,17.109l.852.852a.568.568,0,0,1,0,.807l-.7.7a5,5,0,0,1,.426,1.144h.9a.594.594,0,0,1,.583.583V22.4a.594.594,0,0,1-.583.583H24.15a4.845,4.845,0,0,1-.493,1.1l.628.628a.568.568,0,0,1,0,.807l-.852.852a.568.568,0,0,1-.807,0l-.7-.7a5,5,0,0,1-1.144.426V27a.594.594,0,0,1-.583.583H18.993A.594.594,0,0,1,18.41,27v-.987a4.845,4.845,0,0,1-1.1-.493l-.628.628a.568.568,0,0,1-.807,0l-.852-.852a.568.568,0,0,1,0-.807l.7-.7a5,5,0,0,1-.426-1.144h-.9a.594.594,0,0,1-.583-.583V20.854a.594.594,0,0,1,.583-.583h.964a4.845,4.845,0,0,1,.493-1.1l-.605-.605a.568.568,0,0,1,0-.807l.852-.852a.568.568,0,0,1,.807,0l.7.7a5,5,0,0,1,1.144-.426v-.9a.594.594,0,0,1,.583-.583H20.54a.594.594,0,0,1,.583.583v.964a4.845,4.845,0,0,1,1.1.493l.628-.628a.541.541,0,0,1,.785,0ZM9.283,18.432a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h2.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm.83,6.75a.673.673,0,1,1,0,1.345H1.592a1.6,1.6,0,0,1-1.121-.471A1.557,1.557,0,0,1,0,24.935V1.592A1.557,1.557,0,0,1,.471.471,1.557,1.557,0,0,1,1.592,0H21.033a1.6,1.6,0,0,1,1.121.471,1.557,1.557,0,0,1,.471,1.121V12.423a.673.673,0,0,1-1.345,0V1.592a.23.23,0,0,0-.224-.224H1.592a.2.2,0,0,0-.157.067.175.175,0,0,0-.067.157V24.98a.23.23,0,0,0,.224.224h8.521v-.022Zm-5.9-8.566h2.4a.212.212,0,0,1,.224.224V18.9a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V16.84a.212.212,0,0,1,.224-.224Zm0-11.862h2.4a.212.212,0,0,1,.224.224V7.041a.212.212,0,0,1-.224.224h-2.4a.212.212,0,0,1-.224-.224V4.978a.212.212,0,0,1,.224-.224ZM9.283,6.57A.63.63,0,0,1,8.723,5.9a.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm-4.373,6.3A.387.387,0,0,1,4.4,12.8l-.045-.045-.718-.74a.407.407,0,0,1,.067-.583.479.479,0,0,1,.628-.022l.381.4,1.256-1.009a.394.394,0,0,1,.561.135.451.451,0,0,1-.045.628l-1.57,1.3ZM8.9,12.288a.63.63,0,0,1-.561-.673.615.615,0,0,1,.561-.673h7.781a.63.63,0,0,1,.561.673.615.615,0,0,1-.561.673Zm10.853,6.974a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(0 0)" fill="#06425c"/>
                                      </g>
                                      <g id="project-management-timeline-2" data-name="project-management-timeline" transform="translate(1504 226)">
                                        <path id="Path_5204-2" data-name="Path 5204" d="M19.755,19.262a2.377,2.377,0,1,1-2.377,2.377,2.378,2.378,0,0,1,2.377-2.377Z" transform="translate(-30 0)" fill="#fff"/>
                                      </g>
                                    </g>
                                  </svg> Lessons Learned
                                </Typography>
                              </Grid>
                              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                                <Paper elevation={1} className="paperSection">
                                  <Grid container spacing={3}>
                                <Grid item xs={12} md={12}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                  >
                                    Competent person
                                  </Typography>
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {user.name} {user.badgeNumber !== null && `,${user.badgeNumber}`}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                  >
                                    Lessons learned
                                  </Typography>
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {checkValue(assessment.lessonLearntDetails)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Typography className={classes.aLabelValue}>
                                    {allActionType["jha:lessonLearned"].map((value) => (
                                      <>
                                        <ActionShow
                                          action={{ id: value.id, number: value.actionNumber }}
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
                                </Paper>
                                </Grid>
                              </Grid>
                          </>
                        );
                      }
                      if (closeOutView === true) {
                        return (
                          <>
                            <Grid item xs={12}>
                              <Grid container spacing={3}>

                                <Grid item xs={12} md={6}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                  >
                                    Closed by
                                  </Typography>
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {checkValue(assessment.closedByName)}
                                  </Typography>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                  <Typography
                                    variant="h6"
                                    gutterBottom
                                    className={Fonts.labelName}
                                  >
                                    Closed on
                                  </Typography>
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {moment(checkValue(assessment.closedDate)).format("Do MMM YYYY")}

                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                          </>
                        )
                      }
                      if (commentsView == true) {
                        return (
                          <>
                            <Comments
                              commentContext="Jha"
                              id={localStorage.getItem("fkJHAId")}
                            />
                          </>
                        )
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
                    <ListItem
                      button
                      disabled={formStatus.closeOutStatus}
                    >
                      <ListItemIcon>
                        {formStatus.assessmentStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      <Link
                      variant="subtitle"
                      onClick={(e) => handleNewJhaPush(e)}
                        >
                        <ListItemText primary={formStatus.assessmentStatus ? "Update assessment" : "Add assessment"} />
                        </Link>
                      </ListItem>

                    <ListItem
                      button
                      disabled={formStatus.closeOutStatus}
                    >
                      <ListItemIcon>
                        {formStatus.approvalStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      <Link
                        variant="subtitle"
                        onClick={(e) => handleJhaApprovalsPush(e)}
                      >
                      <ListItemText primary={formStatus.approvalStatus ? "Update approval" : "Add approval"} />
                      </Link>
                    </ListItem>

                    <ListItem button
                    >
                      <ListItemIcon>
                        {formStatus.lessionLeranedStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      {/* Lessons Learned */}
                      <Link
                        variant="subtitle"
                        onClick={(e) => handleJhaLessonLearnPush(e)}
                      >
                      <ListItemText primary={formStatus.lessionLeranedStatus ? "Update lessons learned" : "Add lessons learned"} />
                      </Link>
                    </ListItem>

                    <ListItem
                      button
                      divider
                      disabled={formStatus.closeOutStatus}
                    >
                      <ListItemIcon>
                        <Close />
                      </ListItemIcon>
                      <Link variant="subtitle"
                      onClick={(e) => handleClosePush(e)}
                      >
                      <ListItemText primary="Close Out" />
                      </Link>
                    </ListItem>

                    {false &&
                      <>
                        <ListItemLink onClick={(e) => viewSwitch("comments")}>
                          <ListItemIcon>
                            <Comment />
                          </ListItemIcon>
                          <ListItemText primary="Comments" />
                        </ListItemLink>

                        <ListItem button>
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

                    {false &&
                      <>
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
                </div>
              </Grid>
            
          
          </Grid>
        
        : "Loading..."
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
    </CustomPapperBlock >

  );
}

export default JhaSummary;