import React, { useState } from 'react';
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

import MUIDataTable from 'mui-datatables';

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
}));

function JhaSummary() {
    const [assessments, setAssessments] = useState(false);
    const [approvals, setApprovals] = useState(false);
    const [lessonsLearned, setLessonsLearned] = useState(false);
    //const [summary, setSummary] = useState(false);
    const history = useHistory();
    const [expanded, setExpanded] = React.useState(false);

  
    const handleNewAhaPush = async () => {
      history.push(
        "/app/pages/jha/assessments"
      );
    };
    const handleAhaApprovalsPush = async () => {
      history.push(
        "/app/pages/jha/approvals/approvals"
      );
    };
    const handleAhaLessonLearnPush = async () => {
      history.push(
        "/app/pages/jha/lessons-learned/lessons-learned"
      );
    };

    const handleExpand = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

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



                    

                      const columns = [
                        {
                          name: 'Identify Hazard',
                          options: {
                            filter: true
                          }
                        },
                        {
                          name: 'Identify Risk',
                          options: {
                            filter: true,
                          }
                        },
                        {
                          name: 'Severity',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Probability',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Evaluate Risk Rating',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Identify Controls',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Evaluate Residual Risk',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Approve to Implement',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Monitor',
                          options: {
                            filter: false,
                          }
                        },
                        {
                          name: 'Action Item',
                          options: {
                            filter: false,
                          }
                        },
                    
                      ];
                    
                      const data = [
                        ['Hazard Option Selected from previous page', 'Business Analyst', 30, 'active', 100000, 30, 'active', 100000 , 'Business Analyst', 100000],
                      ];
                    
                      const options = {
                        filterType: 'dropdown',
                        responsive: 'vertical',
                        print: false,
                        search: false,
                        filter: false,
                        download: false,
                        viewColumns: false,
                        selectableRowsHideCheckboxes: false,
                        selectableRowsHeader: false,
                        selectableRowsOnClick: false,
                        viewColumns: false,
                        selectableRows: false,
                        pagination: false,
                        rowsPerPage: 10,
                        page: 0,
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
                                    //className={classes.formBox}
                                  >

                                      {/* <Typography variant="h6" gutterBottom className={classes.labelName}>Detailed Project Area Hazard Assessment</Typography> */}
                                      <MUIDataTable
                                        //title="Detailed Project Area Hazard Assessment"
                                        data={data}
                                        columns={columns}
                                        options={options}
                                        className={classes.tableSection}
                                      />

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
