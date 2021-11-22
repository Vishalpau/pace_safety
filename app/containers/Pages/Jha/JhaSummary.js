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
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Attachment from "../../../containers/Attachment/Attachment";
import api from "../../../utils/axios";
import { handelActionData, handelActionWithEntity, handelActionDataAssessment } from "../../../utils/CheckerValue";
import { HEADER_AUTH, SSO_URL } from "../../../utils/constants";
import ActionShow from '../../Forms/ActionShow';
import { Comments } from "../../pageListAsync";
import { checkValue, handelFileName, handelJhaId } from "../Jha/Utils/checkValue";




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

function JhaSummary() {
  const [assessmentsView, setAssessmentsView] = useState(true);
  const [approvalsView, setApprovalsView] = useState(false);
  const [closeOutView, setCloseOutView] = useState(false);
  const [lessonsLearnedView, setLessonsLearnedView] = useState(false);
  const [commentsView, setCommentsView] = useState(false)
  const history = useHistory();
  const [assessment, setAssessment] = useState({})
  const [expanded, setExpanded] = useState(false);
  const [expandedHazard, setExpandedHazard] = useState(false);
  const [projectStructure, setProjectStructure] = useState({})
  const [team, setTeam] = useState([])
  const [hazard, setHazard] = useState([])
  const [user, setUser] = useState({ name: "", badgeNumber: "" })
  const [loader, setLoader] = useState(false)
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
  const [lessionAction, setLessionAction] = useState([])
  const [approvalAction, setApprovalAction] = useState([])

  const handelAsessment = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const result = res.data.data.results;
    await setAssessment(result)
    await handelWorkArea(result)
    const resTeam = await api.get(`/api/v1/jhas/${jhaId}/teams/`)
    const resultTeam = resTeam.data.data.results
    await setTeam(resultTeam)

    const resHazards = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const resultHazard = resHazards.data.data.results
    await handelActionTracker(resultHazard)
    let assessmentDecider = result.notifyTo !== null
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
      "/app/pages/Jha/assessments/project-details/"
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

  const [expandedTableDetail, setExpandedTableDetail] = useState('panel5');

  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleHazardExpand = (panel) => (event, isExpanded) => {
    setExpandedHazard(isExpanded ? panel : false);
  };

  const handelActionTracker = async (resultHazard) => {
    let jhaId = localStorage.getItem("fkJHAId")

    let actionData = await handelActionData(jhaId, resultHazard)
    await setHazard(actionData)

    let allAction = await handelActionData(jhaId, [], "title")
    let temp = []
    allAction.map((value) => {
      if (value.enitityReferenceId.split(":")[1] == "00") {
        temp.push(value)
      }
    })
    setApprovalactionData(temp !== null ? temp : [])
  };

  const handelLessionActionTracker = async () => {
    let jhaId = localStorage.getItem("fkJHAId")
    let allAction = await handelActionWithEntity(jhaId, "jha:lessionLearned")
    setLessionAction(allAction)
  };

  const handelApprovalActions = async () => {
    let jhaId = localStorage.getItem("fkJHAId")
    let allAction = await handelActionDataAssessment(jhaId, [], "title", "jha:approval")
    setApprovalAction(allAction)
  }

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
  const handelShowData = () => {

  }

  const [checkListAssessment, setCheckListAssessment] = useState({})

  const assessmentDataValues = async () => {
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const baseUrl = localStorage.getItem("apiBaseUrl")
    var tempPerformance = {}
    const specificPerformance = await api.get(`${baseUrl}/api/v1/core/checklists/jha-human-performance-aspects/${projectId}/`);
    const apiDataPerformance = specificPerformance.data.data.results[0].checklistGroups;

    const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/jha-document-conditions/${projectId}/`);
    const apiCondition = documentCondition.data.data.results[0].checklistValues;

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

  const handelInputValue = async () => {
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const baseUrl = localStorage.getItem("apiBaseUrl")
    const specificPerformance = await api.get(`${baseUrl}/api/v1/core/checklists/jha-human-performance-aspects/${projectId}/`)
    const apiDataPerformance = specificPerformance.data.data.results[0].checklistGroups
    const documentCondition = await api.get(`${baseUrl}/api/v1/core/checklists/jha-document-conditions/${projectId}/`)
    const apiCondition = documentCondition.data.data.results[0].checklistValues
  }

  let errorMessage = "Please fill"
  let errorApproval = "approval"
  let errorLession = "lession learned"

  const viewSwitch = (viewName) => {
    if (viewName == "assessment") {
      if (formStatus.assessmentStatus) {
        setAssessmentsView(true);
      } else {
        history.push(`/app/pages/Jha/assessments/project-details/`)
      }
      setApprovalsView(false);
      setCloseOutView(false);
      setLessonsLearnedView(false);
      setCommentsView(false)
    } else if (viewName == "approval") {
      setAssessmentsView(false);
      if (formStatus.approvalStatus) {
        setApprovalsView(true);
      } else {
        history.push(`/app/pages/jha/approvals/approvals`)
      }
      setCloseOutView(false);
      setLessonsLearnedView(false);
      setCommentsView(false)
    } else if (viewName == "lession") {
      setAssessmentsView(false);
      setApprovalsView(false);
      setCloseOutView(false);
      if (formStatus.lessionLeranedStatus) {
        setLessonsLearnedView(true);
      } else {
        history.push(`/app/pages/jha/lessons-learned/lessons-learned`)
      }
      setCommentsView(false)
    } else if (viewName == "comments") {
      setAssessmentsView(false);
      setApprovalsView(false);
      setCloseOutView(false);
      setLessonsLearnedView(false);
      setCommentsView(true)
    } else if (viewName = "closeOut") {
      setAssessmentsView(false);
      setApprovalsView(false);
      if (formStatus.closeOutStatus) {
        setCloseOutView(true);
      } else {
        history.push(`/app/pages/jha/close-out`)
      }
      setLessonsLearnedView(false);
      setCommentsView(false)
    }
  }

  const handelCallBack = async () => {
    await setLoader(true)
    await handelAsessment()
    await handelProjectStructre()
    await handelActionLink()
    await handelInputValue()
    await handelLessionActionTracker()
    await handelApprovalActions()
    await assessmentDataValues()
    await setLoader(false)
  }

  useEffect(() => {
    handelCallBack()
  }, [])

  const classes = useStyles();
  return (

    <PapperBlock
      title={`Assessment Number: ${assessment.jhaNumber !== undefined ? assessment.jhaNumber : ""}`}
      icon="ion-md-list-box"
    >
      {loader == false ?
        <>
          {/* {console.log(commentsView)} */}
          <Box paddingBottom={1}>
            <div className={Styles.incidents}>

              <div className={Styles.item}>
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
                  {formStatus.assessmentStatus ? "Done" : ""}
                </Typography>
              </div>

              <div className={Styles.item}>
                <Button
                  color={approvalsView ? "secondary" : "primary"}
                  variant="outlined"
                  size="large"
                  variant={formStatus.approvalStatus ? "contained" : "outlined"}
                  endIcon={
                    formStatus.approvalStatus ? <CheckCircle /> : <AccessTime />
                  }
                  className={classes.statusButton}
                  onClick={(e) => viewSwitch("approval")}
                >
                  Approvals
                </Button>
                <Typography variant="caption" display="block">
                  {formStatus.approvalStatus ? "Done" : ""}
                </Typography>
              </div>

              <div className={Styles.item}>
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
                  {formStatus.closeOutStatus ? "Done" : ""}
                </Typography>
              </div>

              <div className={Styles.item}>
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
                  {formStatus.lessionLeranedStatus ? "Done" : ""}
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
                        assessmentsView == true
                        || (approvalsView === false
                          && lessonsLearnedView === false
                          && closeOutView === false
                          && commentsView == false)
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
                                    Job Details
                                  </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Grid container item xs={12} spacing={3}>
                                    <>
                                      <Grid item md={12}>
                                        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
                                          Project structure
                                        </Typography>
                                        <Typography className={Fonts.labelValue}>

                                          {projectStructure.projectName} -
                                          {Object.entries(projectStructName).map(([key, value], index) => (
                                            <>
                                              {Object.keys(projectStructName)[index + 1] !== undefined ? `${value} - ` : `${value}`}
                                            </>
                                          ))}
                                        </Typography>
                                      </Grid>
                                      {/* work area */}

                                      {false &&
                                        <Grid item xs={12} md={6}>
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Work Area
                                          </Typography>
                                          <Typography variant="body" className={Fonts.labelValue}>
                                            {checkValue(projectStructName["Work Area"])}
                                          </Typography>
                                        </Grid>
                                      }

                                      {/* location */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Location
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.location)}
                                        </Typography>
                                      </Grid>

                                      {/* job title */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Job Title
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.jobTitle)}
                                        </Typography>
                                      </Grid>

                                      {/* job description */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Job Description
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.description)}
                                        </Typography>
                                      </Grid>

                                      {/* assessment performed by */}

                                      {false &&
                                        <Grid item xs={12} md={6}>
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Assessment performed by
                                          </Typography>
                                          <Typography variant="body" className={Fonts.labelValue}>
                                            NA
                                          </Typography>
                                        </Grid>
                                      }

                                      {/* assessment start date */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Assessment started on
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.jhaAssessmentDate)}
                                        </Typography>
                                      </Grid>

                                      {/* permit to perform */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Permit to work
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.permitToPerform)}
                                        </Typography>
                                      </Grid>

                                      {/* permit refrence */}

                                      {false &&
                                        <Grid item xs={12} md={6}>
                                          <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={Fonts.labelName}
                                          >
                                            Permit reference
                                          </Typography>
                                          <Typography variant="body" className={Fonts.labelValue}>
                                            Yes
                                          </Typography>
                                        </Grid>
                                      }

                                      {/* risk assessment team */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Risk Assessment team
                                        </Typography>
                                        {team !== undefined && team.map((value) => (
                                          <Typography variant="body" display="block" className={Fonts.labelValue}>{value.teamName}</Typography>
                                        ))}

                                      </Grid>

                                      {/* emergench details      */}
                                      <Grid item xs={12} md={12}>
                                        <Typography className={classes.heading}>
                                          Emergency Contact Details
                                        </Typography>
                                      </Grid>

                                      {/* supervisor */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Supervisor
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.supervisorName)}
                                        </Typography>
                                      </Grid>

                                      {/* department */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Department
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.department)}
                                        </Typography>
                                      </Grid>

                                      {/* emergency phone number */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Emergency Phone Number
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.emergencyNumber)}
                                        </Typography>
                                      </Grid>

                                      {/* evacuation assembly point */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Evacuation assembly point
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.evacuationAssemblyPoint)}
                                        </Typography>
                                      </Grid>

                                      {/* permit number */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Permit number
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.permitNumber)}
                                        </Typography>
                                      </Grid>

                                      {/* order number */}
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Order number
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.jobOrderNumber)}
                                        </Typography>
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
                                              <Typography variant="body" style={{ marginLeft: "10px" }}>
                                                {checkValue(value.hazard)}
                                              </Typography>
                                            </div>
                                          ))
                                        }
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
                                      <Grid
                                        item
                                        md={12}
                                        xs={12}
                                      >
                                        <div>
                                          {hazard !== undefined && hazard.map((value, index) => (
                                            <Accordion
                                              defaultExpanded
                                              className={classes.backPaper}
                                              key={index}
                                            >
                                              <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1bh-content"
                                                id="panel1bh-header"
                                                className={classes.headingColor}
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

                                                  <Grid item md={12} xs={12} className={classes.createHazardbox}>
                                                    <Divider light />
                                                  </Grid>

                                                </Grid>
                                                <Grid>
                                                  {value.action.map((valueAction) => (
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
                                        </div>

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
                                        <Typography title={handelFileName(assessment.jhaAssessmentAttachment)}>
                                          {assessment.jhaAssessmentAttachment != "" &&
                                            typeof assessment.jhaAssessmentAttachment == "string" ? (
                                            <Attachment value={assessment.jhaAssessmentAttachment} />
                                          ) :
                                            "-"
                                          }
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={12} md={6}>
                                        <Typography
                                          variant="h6"
                                          gutterBottom
                                          className={Fonts.labelName}
                                        >
                                          Links
                                        </Typography>
                                        <Typography variant="body" className={Fonts.labelValue}>
                                          {checkValue(assessment.link)}
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
                                        {checkValue(assessment.notifyTo).split(",").map((value) => (
                                          <Typography variant="body" display="block" className={Fonts.labelValue}>{value}</Typography>
                                        ))}
                                      </Grid>
                                    </>
                                  </Grid>
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          </>
                        );
                      }
                      if (approvalsView == true) {
                        return (
                          <>
                            <Grid item xs={12} style={{ padding: '0px 12px' }}>
                              <Typography className={classes.heading}>
                                Competent Person
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
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {checkValue(assessment.wrpApprovalUser)}
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
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {assessment.wrpApprovalDateTime !== null ?
                                      <>
                                        {moment(checkValue(assessment.wrpApprovalDateTime)).format("DD-MM-YY")}
                                      </>
                                      : "-"
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={12} style={{ padding: '0px 12px' }}>
                              <Typography className={classes.heading}>
                                Senior authorized Person
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
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {checkValue(assessment.sapApprovalUser)}
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
                                  <Typography variant="body" className={Fonts.labelValue}>
                                    {assessment.sapApprovalDateTime !== null ?
                                      <>
                                        {moment(checkValue(assessment.sapApprovalDateTime)).format("DD-MM-YY")}
                                      </>
                                      : "-"
                                    }
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={12}>
                              <Typography className={classes.heading}>
                                Actions
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                  <Typography className={classes.aLabelValue}>
                                    {approvalAction.map((value) => (
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
                      if (lessonsLearnedView == true) {
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
                                    {moment(checkValue(assessment.closedDate)).format("DD-Mo-YYYY")}

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

              <Grid item xs={12} md={3}>
                <Paper>
                  <List
                    dense
                    subheader={
                      <ListSubheader component="div">Actions</ListSubheader>
                    }
                  >
                    <ListItemLink
                      onClick={(e) => handleNewJhaPush(e)}
                      disabled={formStatus.closeOutStatus}
                    >
                      <ListItemIcon>
                        {formStatus.assessmentStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      <ListItemText primary="Assessments" />
                    </ListItemLink>

                    <ListItemLink
                      onClick={(e) => handleJhaApprovalsPush(e)}
                      disabled={formStatus.closeOutStatus}
                    >
                      <ListItemIcon>
                        {formStatus.approvalStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      <ListItemText primary="Approvals" />
                    </ListItemLink>

                    <ListItemLink
                      onClick={(e) => handleJhaLessonLearnPush(e)}
                    >
                      <ListItemIcon>
                        {formStatus.lessionLeranedStatus ? <Edit /> : <Add />}
                      </ListItemIcon>
                      <ListItemText primary="Lessons Learned" />
                    </ListItemLink>

                    <ListItem
                      button
                      divider
                      onClick={(e) => handleClosePush(e)}
                    >
                      <ListItemIcon>
                        <Close />
                      </ListItemIcon>
                      <ListItemText primary="Close Out" />
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
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </>
        : "Loading..."
      }
    </PapperBlock >

  );
}

export default JhaSummary;