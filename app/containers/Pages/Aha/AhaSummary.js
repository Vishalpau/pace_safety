import React, { useState , useEffect } from 'react';
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

import api from "../../../utils/axios";
import moment from 'moment';

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

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
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  labelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    listStyleType: "disc",
    listStylePosition:"inside",
  },
}));

function AhaSummary() {
    const [assessments, setAssessments] = useState(false);
    const [approvals, setApprovals] = useState(false);
    const [lessonsLearned, setLessonsLearned] = useState(false);
    //const [summary, setSummary] = useState(false);
    const history = useHistory();
    const [expanded, setExpanded] = React.useState('panel1');

    const {id} = useParams();
    //const [summary, setSummary] = useState(false);
    const [ahaData , setAHAData] = useState({})
    const [Teamform, setTeamForm] = useState([]);
    const [projectSturcturedData , setProjectSturcturedData] = useState([])

    const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;

  
    const handleNewAhaPush = async () => {
      history.push(
        `/app/pages/aha/assessments/project-details/${localStorage.getItem("fkAHAId")}`
      );
    };
    const handleAhaApprovalsPush = async () => {
      history.push(
        "/app/pages/aha/approvals/approvals"
      );
    };
    const handleAhaLessonLearnPush = async () => {
      history.push(
        "/app/pages/aha/lessons-learned/lessons-learned"
      );
    };

    const handleCommentsPush = async () => {
      history.push(
        "/app/comments/comments"
      );
    };
    const handleActivityPush = async () => {
      history.push(
        "/app/activity/activity"
      );
    };

    const fetchAHASummary = async () => {
      const res = await api.get(`/api/v1/ahas/${id}/`);
      console.log(res)
      const result = res.data.data.results
      await fetchBreakDownData(result.fkProjectStructureIds)
      await setAHAData(result)
    }

    const fetchTeamData = async () => {
      const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`)
      const result =  res.data.data.results.results
      console.log(result)
      await setTeamForm(result)
      console.log(result)
    }
    console.log(ahaData)

    const fetchBreakDownData = async (projectBreakdown) => {
      const projectData = JSON.parse(localStorage.getItem('projectName'));
     
      let selectBreakDown = [];
      const breakDown = projectBreakdown.split(':');
      for (var key in breakDown) {
        if (breakDown[key].slice(0, 2) === '1L') {
          var config = {
            method: "get",
            url: `${SSO_URL}/${
              projectData.projectName.breakdown[0].structure[0].url
            }`,
            headers: HEADER_AUTH,
          };
         
          await api(config)
            .then(async (response) => {
              const result = response.data.data.results;
              
              result.map((item) => {
                if (breakDown[key].slice(2) == item.id) {
                  selectBreakDown = [
                    ...selectBreakDown,
                    { depth: item.depth, id: item.id, name: item.name },
                  ];
                }
              });
            })
            .catch((error) => {
              
              setIsNext(true);
            });
        } else {
          var config = {
            method: "get",
            url: `${SSO_URL}/${
              projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key-1].slice(-1)}`,
            headers: HEADER_AUTH,
          };
         
          await api(config)
            .then(async (response) => {
            
              const result = response.data.data.results;
             
              const res=result.map((item, index) => {
                if (parseInt(breakDown[key].slice(2)) == item.id) {
                 
                  selectBreakDown = [
                    ...selectBreakDown,
                    { depth: item.depth, id: item.id, name: item.name },
                  ];
                }
              });
  
            
            })
            .catch((error) => {
              console.log(error)
              // setIsNext(true);
            });
        }
      }
      // dispatch(breakDownDetails(selectBreakDown));
      await setProjectSturcturedData(selectBreakDown)    
      // localStorage.setItem('selectBreakDown', JSON.stringify(selectBreakDown));
    };
const [form , setForm] = useState([])
    const fetchHzardsData = async () => {
      const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
      const result = res.data.data.results.results
      await setForm(result)
    }
console.log(form)
    useEffect(() => {
      if(id){
        fetchAHASummary();
        fetchTeamData()
        fetchHzardsData()
      }
    },[])

    
    const handleExpand = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

  const classes = useStyles();
  return (
    <PapperBlock title={`Assesment : ${ahaData.ahaNumber}`} icon="ion-md-list-box">
      <Box paddingBottom={1}>
        <div className={Styles.incidents}>
          <div className={Styles.item}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              endIcon={<CheckCircle />}
              className={classes.statusButton}
              onClick={(e) => {
                setAssessments(true);
                setApprovals(false);
                setLessonsLearned(false);
                //setSummary(false);
              }}
            >
              Assessments
            </Button>
            <Typography variant="caption" display="block">
              Done
            </Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<AccessTime />}
              className={classes.statusButton}
              onClick={(e) => {
                setAssessments(false);
                setApprovals(true);
                setLessonsLearned(false);
                //setSummary(false);
              }}
            >
              Approvals
            </Button>
            <Typography variant="caption" display="block">
              Pending
            </Typography>
          </div>

          <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<AccessTime />}
              className={classes.statusButton}
              onClick={(e) => {
                setAssessments(false);
                setApprovals(false);
                setLessonsLearned(true);
                setSummary(false);
              }}
            >
              Lessons Learned
            </Button>
            <Typography variant="caption" display="block">
              Pending
            </Typography>
          </div>
          {/* <div className={Styles.item}>
            <Button
              color="primary"
              variant="outlined"
              size="small"
              endIcon={<AccessTime />}
              className={classes.statusButton}
              onClick={(e) => {
                setAssessments(false);
                setApprovals(false);
                setLessonsLearned(false);
                setSummary(true);
              }}
            >
              Summary
            </Button>
            <Typography variant="caption" display="block">
              Pending
            </Typography>
          </div> */}
        </div>
        <Divider />
      </Box>

      <Box marginTop={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              {/* <Grid item xs={12}>
                <Typography
                  variant="h6"
                  className={classNames(
                    Fonts.labelName,
                    'demo__class',
                    classes.customClass
                  )}
                  gutterBottom
                >
                  Incident Title
                </Typography>
                <Typography className={Fonts.labelValue}>
                  The cherry and plum flavors have good intensity and appealing
                  traction from dense tannins and notes of black licorice and
                  tobacco.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Incident on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  12th August 2021, 03:35 PM
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Reported on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  14th August 2021, 09:22 PM
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Incident on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  12th August 2021, 03:35 PM
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Incident on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  12th August 2021, 03:35 PM
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Incident on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  12th August 2021, 03:35 PM
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h6"
                  className={Fonts.labelName}
                  gutterBottom
                >
                  Incident on
                </Typography>
                <Typography className={Fonts.labelValue}>
                  12th August 2021, 03:35 PM
                </Typography>
              </Grid> */}
            
              {/* summary and part */}
              <>
                {(() => {
                  if (
                    assessments == true
                      || (approvals === false
                        && lessonsLearned === false)
                  ) {

                    const [expandedTableDetail, setExpandedTableDetail] = React.useState('panel5');
  
                    const handleTDChange = (panel) => (event, isExpanded ) => {
                      setExpandedTableDetail(isExpanded ? panel : false);
                    };

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
                                        <Typography variant="h6" gutterBottom className={Fonts.labelName}>
                                            Project structure
                                        </Typography>
                                        <Typography className={classes.labelValue}>
                                        {project.projectName} - {projectSturcturedData[0] ? projectSturcturedData[0].name : null} - {projectSturcturedData[1] ? projectSturcturedData[1].name : null} - {projectSturcturedData[2] ? projectSturcturedData[2].name : null} 
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
                                        <Typography variant="body" className={classes.labelValue}>
                                        {ahaData.workArea}
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
                                        <Typography variant="body" className={classes.labelValue}>
                                        {ahaData.location}
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
                                        <Typography variant="body" className={classes.labelValue}>
                                          NA
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
                                        <Typography variant="body" className={classes.labelValue}>
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
                                        <Typography variant="body" className={classes.labelValue}>
                                        {ahaData.permitToPerform}
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
                                        <Typography variant="body" className={classes.labelValue}>
                                        {ahaData.permitNumber}
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
                                        <Typography variant="body" className={classes.labelValue}>
                                        {ahaData.description}
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
                                        {Teamform.map((value , index) => (
            
            
            <ul className={classes.labelValue} key={index}>
           {value.teamName !== "" ? <li>{value.teamName}</li> : null} 
             
          
          
            </ul>
          ))}
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
                                      {
                                        form.map((item) => (<>
                                          <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                      >
                                        {item.hazard}
                                      </Typography>
                                          <Typography variant="body" className={Fonts.labelValue}>
                                        {item.risk}
                                      </Typography>
                                       </> ))
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

                                    <Grid item md={12}>
                                      <div>
                                        <Accordion expanded={expandedTableDetail === 'panel5'} onChange={handleTDChange('panel5')} defaultExpanded className={classes.backPaper}>
                                          <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            className={classes.headingColor}
                                          >
                                            <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#1 - Hazard Name</Typography>  
                                          </AccordionSummary>
                                            <AccordionDetails>
                                            <Grid container spacing={2}>
                                              <Grid item md={12} sm={12} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Identify Risk
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              
                                              <Grid item md={5} sm={5} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Risk Severity
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              <Grid item md={5} sm={5} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Risk Probability
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              <Grid item md={2} sm={2} xs={12}>
                                                <div className={classes.ratioColororange}>50% Risk</div>
                                              </Grid>

                                              <Grid item md={12} sm={12} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Identify Controls
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              <Grid item md={4} sm={4} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Evaluate Residual Risk
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              <Grid item md={4} sm={4} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Approve to Implement
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              
                                              <Grid item md={4} sm={4} xs={12}>
                                                <Typography
                                                  variant="h6"
                                                  gutterBottom
                                                  className={Fonts.labelName}
                                                >
                                                  Monitor
                                                </Typography>
                                                <Typography variant="body" className={Fonts.labelValue}>
                                                  NA
                                                </Typography>
                                              </Grid>
                                              <Grid item md={12} xs={12} className={classes.createHazardbox}>
                                                <Divider light />
                                              </Grid>   
                                            </Grid>  
                                            </AccordionDetails>
                                          </Accordion>
                                          <Accordion expanded={expandedTableDetail === 'panel6'} onChange={handleTDChange('panel6')} className={classes.backPaper}>
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-controls="panel2bh-content"
                                              id="panel2bh-header"
                                              className={classes.headingColor}
                                            >
                                              <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#3 - Hazard Name</Typography>
                                              
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <Typography>
                                                Dummy content
                                              </Typography>
                                            </AccordionDetails>
                                          </Accordion>
                                          <Accordion expanded={expandedTableDetail === 'panel7'} onChange={handleTDChange('panel7')} className={classes.backPaper}>
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-controls="panel3bh-content"
                                              id="panel3bh-header"
                                              className={classes.headingColor}
                                            >
                                              <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} />Hazard#2 - Hazard Name </Typography>
                                              
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <Typography>
                                                Dummy content
                                              </Typography>
                                            </AccordionDetails>
                                          </Accordion>
                                          <Accordion expanded={expandedTableDetail === 'panel8'} onChange={handleTDChange('panel8')} className={classes.backPaper}>
                                            <AccordionSummary
                                              expandIcon={<ExpandMoreIcon />}
                                              aria-controls="panel4bh-content"
                                              id="panel4bh-header"
                                              className={classes.headingColor}
                                            >
                                              <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} /> Hazard#4 - Hazard Name </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                              <Typography>
                                                Dummy content
                                              </Typography>
                                            </AccordionDetails>
                                          </Accordion>
                                        </div>  
                                      </Grid>                                     

                                    </Grid>
                                    {/* <Grid item xs={12} md={6}>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                      >
                                        Energy Hazard
                                      </Typography>
                                      <Typography variant="body" className={Fonts.labelValue}>
                                        NA
                                      </Typography>
                                    </Grid> */}
                                    <Grid item xs={12} md={12}>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        className={Fonts.labelName}
                                      >
                                        Conditions when the work must be stopped
                                      </Typography>
                                      <Typography variant="body" className={Fonts.labelValue}>
                                        NA
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
                                      <Typography variant="body" className={Fonts.labelValue}>
                                        None
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
                                      <Typography variant="body" className={Fonts.labelValue}>
                                        <Avatar variant="rounded" className={classes.rounded}>
                                          <ImageIcon />
                                        </Avatar>
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
                                        NA
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
                                      <Typography variant="body" display="block" className={Fonts.labelValue}>Role one</Typography>
                                      <Typography variant="body" display="block" className={Fonts.labelValue}>Role Two</Typography>
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
                          
                          <Grid item xs={12} style={{padding: '0px 12px'}}>
                            <Typography className={classes.heading}>
                              Work Responsible Person
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
                                  NA
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
                                  NA
                                </Typography>
                              </Grid>
                              <Grid item xs={12} style={{padding: '0px 12px', marginTop: '15px'}}>
                                <Typography className={classes.heading}>
                                  Person in-charge
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  className={Fonts.labelName}
                                >
                                  Approved by
                                </Typography>
                                <Typography variant="body" className={Fonts.labelValue}>
                                  NA
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
                                  NA
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
                                  <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                                  <div className={classes.actionTitleLable}>Action title</div>
                                </Typography>
                                <Typography className={classes.aLabelValue}>
                                  <span className={classes.updateLink}><Link to="">AL-nnnnn</Link></span>
                                  <div className={classes.actionTitleLable}>Action title</div>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>


                          <Grid item xs={12}>
                            <Typography className={classes.heading}>
                              Sign-offs  
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
                                  Signed-off by
                                </Typography>
                                <Typography variant="body" className={Fonts.labelValue}>
                                  NA
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  className={Fonts.labelName}
                                >
                                  Signed-off on
                                </Typography>
                                <Typography variant="body" className={Fonts.labelValue}>
                                  NA
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                        </>
                        );
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
                                  Work Responsible Person
                                </Typography>
                                <Typography variant="body" className={Fonts.labelValue}>
                                  Mayank, #23452
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  className={Fonts.labelName}
                                >
                                  Lessons learnt
                                </Typography>
                                <Typography variant="body" className={Fonts.labelValue}>
                                  NA
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                        );
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
              >
                <ListItemLink onClick={(e) => handleNewAhaPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Assessments" />
                </ListItemLink>
                <ListItemLink onClick={(e) => handleAhaApprovalsPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Approvals" />
                </ListItemLink>
                <ListItemLink onClick={(e) => handleAhaLessonLearnPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Lessons Learned" />
                </ListItemLink>
                <ListItem button divider>
                  <ListItemIcon>
                    <Close />
                  </ListItemIcon>
                  <ListItemText primary="Close Out" />
                </ListItem>

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
              </List>
              <Divider />
              <List dense>
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
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </PapperBlock>
  );
}

export default AhaSummary;