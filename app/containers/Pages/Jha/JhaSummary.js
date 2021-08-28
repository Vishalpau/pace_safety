import React, { useState, useEffect } from 'react';
import { PapperBlock } from 'dan-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import AccessTime from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';

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
import { handelJhaId } from "../Jha/Utils/checkValue"


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
}));

function JhaSummary() {
  const [assessmentsView, setAssessmentsView] = useState(false);
  const [approvalsView, setApprovalsView] = useState(false);
  const [lessonsLearnedView, setLessonsLearnedView] = useState(false);
  const history = useHistory();
  const [assessment, setAssessment] = useState({})
  const [expanded, setExpanded] = useState('panel1');

  const handelAsessment = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const result = res.data.data.results;
    console.log(result)
    setAssessment(result)
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

  const [expandedTableDetail, setExpandedTableDetail] = useState('panel5');

  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    handelAsessment()
  }, [])

  const classes = useStyles();
  return (
    <PapperBlock title="Assessment Number: IR-15415415" icon="ion-md-list-box">
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
                setAssessmentsView(true);
                setApprovalsView(false);
                setLessonsLearnedView(false);
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
                setAssessmentsView(false);
                setApprovalsView(true);
                setLessonsLearnedView(false);
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
                setAssessmentsView(false);
                setApprovalsView(false);
                setLessonsLearnedView(true);
              }}
            >
              Lessons Learned
            </Button>
            <Typography variant="caption" display="block">
              Pending
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
                      && lessonsLearnedView === false)
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
                                      Project Name - Phase Name - Unit Name
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
                                      Location
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      Delhi
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Job Title
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      None
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Job Description
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      None
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
                                      Assessment started on
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      Yes
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
                                      Permit reference
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      Yes
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
                                    <Typography variant="body" display="block" className={Fonts.labelValue}>Team one</Typography>
                                    <Typography variant="body" display="block" className={Fonts.labelValue}>Team Two</Typography>
                                  </Grid>
                                  <Grid item xs={12} md={12}>
                                    <Typography className={classes.heading}>
                                      Emergency Contact Details
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Supervisor
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
                                      Department
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
                                      Emergency Phone Number
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
                                      Evacuation assembly point
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
                                      Permit number
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
                                      Order number
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      NA
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
                                  <Grid item xs={12} md={6}>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      className={Fonts.labelName}
                                    >
                                      Hazards Group
                                    </Typography>
                                    <Typography variant="body" className={Fonts.labelValue}>
                                      NA
                                    </Typography>
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
                                            <Grid item md={5} sm={5} xs={12}>
                                              <Typography
                                                variant="h6"
                                                gutterBottom
                                                className={Fonts.labelName}
                                              >
                                                Job Steps
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
                                                Potential Hazards
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
                                                Controls
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
                  if (approvalsView == true) {
                    return (
                      <>

                        <Grid item xs={12} style={{ padding: '0px 12px' }}>
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
                            <Grid item xs={12} style={{ padding: '0px 12px', marginTop: '15px' }}>
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
                <ListItemLink onClick={(e) => handleNewJhaPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Assessments" />
                </ListItemLink>
                <ListItemLink onClick={(e) => handleJhaApprovalsPush(e)}>
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Approvals" />
                </ListItemLink>
                <ListItemLink onClick={(e) => handleJhaLessonLearnPush(e)}>
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

                <ListItem button>
                  <ListItemIcon>
                    <Comment />
                  </ListItemIcon>
                  <ListItemText primary="Comments" />
                </ListItem>

                <ListItem button>
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

export default JhaSummary;