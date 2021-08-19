import React, { useState } from 'react';
import { PapperBlock } from 'dan-components';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import JobDetails from './JobDetails';
import ProjectAreaHazards from '../Assessments/ProjectAreaHazards';
import Assessment from '../Assessments/Assessment';
import DocumentsNotifications from '../Assessments/DocumentsNotifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';

// style
const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  inlineControls: {
    flexDirection: 'row',
    gap: '1rem',
  },
  icon: {
    minWidth: 0,
  },
  activeList: {
    color: theme.palette.primary.main,
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
  },
  notActiveList: {
    borderLeft: `5px solid ${theme.palette.primary.main}`,
  },
}));

function AssessmentsForms() {
  const [jobDetails, setJobDetails] = useState(false);
  const [projectAreaHazards, setProjectAreaHazards] = useState(false);
  const [assessment, setAssessment] = useState(false);
  const [documentsNotifications, setDocumentsNotifications] = useState(false);

  //const history = useHistory();

  // Assigning useStyles() to 'classes' variable
  const classes = useStyles();

  return (
    <PapperBlock title="Assessments" icon="ion-md-list-box">
      <Grid container spacing={2}>
        <Grid container item xs={12} md={9}>
        <>
                {(() => {
                  if (
                    jobDetails == true
                      || (projectAreaHazards === false
                        && assessment === false
                        && documentsNotifications === false)
                  ) {
                    return (<JobDetails />);
                  }
                  if (projectAreaHazards == true) {
                    return (<ProjectAreaHazards />);
                  }
                  if (assessment == true) {
                    return (<Assessment />);
                  }
                  if (documentsNotifications == true) {
                    return (<DocumentsNotifications />);
                  }
                })()}
              </>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper elevation={1}>
            <List dense>
              <ListItem 
                className={classes.activeList}
                onClick={(e) => {
                  setJobDetails(true);
                  setProjectAreaHazards(false);
                  setAssessment(false);
                  setDocumentsNotifications(false);
                }}
                >
                <ListItemIcon className={classes.icon}>
                  <DoubleArrowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary={<Link href="#">Job Details </Link>}
                />
              </ListItem>

              <ListItem
               className={classes.notActiveList}
               onClick={(e) => {
                  setJobDetails(false);
                  setProjectAreaHazards(true);
                  setAssessment(false);
                  setDocumentsNotifications(false);
                }}
               >
                <ListItemIcon className={classes.icon}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary="Job Hazards"
                />
              </ListItem>
              <ListItem 
                className={classes.notActiveList}
                onClick={(e) => {
                  setJobDetails(false);
                  setProjectAreaHazards(false);
                  setAssessment(true);
                  setDocumentsNotifications(false);
                }}>
                <ListItemIcon className={classes.icon}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary="Assessment"
                />
              </ListItem>
              <ListItem
                className={classes.notActiveList}
                onClick={(e) => {
                  setJobDetails(false);
                  setProjectAreaHazards(false);
                  setAssessment(false);
                  setDocumentsNotifications(true);
                }}>
                <ListItemIcon className={classes.icon}>
                  <RemoveCircleOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{ variant: 'subtitle2' }}
                  primary="Documents & Notifications"
                />
              </ListItem>
            </List>
          </Paper>
          {/* <FormSidebar /> */}
        </Grid>
      </Grid>
    </PapperBlock>
  );
}

export default AssessmentsForms;
