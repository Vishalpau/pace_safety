import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { PapperBlock } from 'dan-components';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AccessTime from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import CssBaseline from '@material-ui/core/CssBaseline';

// List
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

// Icons
import Print from '@material-ui/icons/Print';
import Share from '@material-ui/icons/Share';
import Close from '@material-ui/icons/Close';
import Comment from '@material-ui/icons/Comment';
import History from '@material-ui/icons/History';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';

// Styles
import Styles from 'dan-styles/Summary.scss';
import Type from 'dan-styles/Typography.scss';
import Fonts from 'dan-styles/Fonts.scss';
import moment from 'moment';
import api from '../../../utils/axios';

import IncidentDetails from '../InitialNotification/IncidentDetails';
import IncidentDetailsSummary from '../../SummaryDetails/InitialNotification';
import InvestigationSummary from '../../SummaryDetails/Investigation';
import EvidenceSummary from '../../SummaryDetails/Evidence';
import RootCauseAnalysisSummary from '../../SummaryDetails/RootCauseAndAnalysis';
import LessionLearnSummary from '../../SummaryDetails/LessionLearn';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: '100%',
  },
  spacer: {
    padding: '.75rem 0',
  },
  statusButton: {
    borderRadius: 4,
    fontSize: 12,
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Summary = () => {
  const [incidents, setIncidents] = useState([]);
  const [initialNotification, setInitialNotification] = useState(false);
  const [investigation, setInvestigation] = useState(false);
  const [evidence, setEvidence] = useState(false);
  const [rootcauseanalysis, setRootCauseAnalysis] = useState(false);
  const [lessionlearn, setLessionlearn] = useState(false);
  console.log(initialNotification);
  const fetchIncidentData = async () => {
    const allIncidents = await api.get(`api/v1/incidents/${fkid}/`);
    await setIncidents(allIncidents.data.data.results);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ['Yes', 'No'];
  const classes = useStyles();

  useEffect(() => {
    fetchIncidentData();
  }, []);

  return (
    <PapperBlock
      title={`Incident Number: ${incidents.incidentNumber}`}
      icon="ion-md-list-box"
    >
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
                setInitialNotification(true);
                setInvestigation(false);
                setEvidence(false);
                setRootCauseAnalysis(false);
                setLessionlearn(false);
              }}
            >
              Initial Notification
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
                setInitialNotification(false);
                setInvestigation(true);
                setEvidence(false);
                setRootCauseAnalysis(false);
                setLessionlearn(false);
              }}
            >
              Investigation
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
              className={classes.statusButton}
              endIcon={<AccessTime />}
              onClick={(e) => {
                setInitialNotification(false);
                setInvestigation(false);
                setEvidence(true);
                setRootCauseAnalysis(false);
                setLessionlearn(false);
              }}
            >
              Evidence
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
              className={classes.statusButton}
              onClick={(e) => {
                setInitialNotification(false);
                setInvestigation(false);
                setEvidence(false);
                setRootCauseAnalysis(true);
                setLessionlearn(false);
              }}
            >
              Root Cause & Analysis
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
                setInitialNotification(false);
                setInvestigation(false);
                setEvidence(false);
                setRootCauseAnalysis(false);
                setLessionlearn(true);
              }}
            >
              Lessions Learnt
            </Button>
            <Typography variant="caption" display="block">
              Pending
            </Typography>
          </div>
        </div>
      </Box>
      <Divider />

      <Box marginTop={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={9}>
            {/* summary and part */}
            <>
              {(() => {
                if (
                  initialNotification == true ||
                  (investigation === false &&
                    evidence === false &&
                    rootcauseanalysis === false &&
                    lessionlearn === false)
                ) {
                  return <IncidentDetailsSummary />;
                } if (investigation == true) {
                  return <InvestigationSummary />;
                } if (evidence == true) {
                  return <EvidenceSummary />;
                } if (rootcauseanalysis == true) {
                  return <RootCauseAnalysisSummary />;
                } if (lessionlearn == true) {
                  return <LessionLearnSummary />;
                }
              })()}
            </>
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
                  href={`/app/incident-management/registration/initial-notification/incident-details/${localStorage.getItem(
                    'fkincidentId'
                  )}`}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Modify Notification" />
                </ListItemLink>

                <ListItemLink href="/app/incident-management/registration/investigation/initial-details/">
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText primary="Modify Investigation" />
                </ListItemLink>

                <ListItemLink href="/app/incident-management/registration/evidence/evidence/">
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>

                  <ListItemText primary="Add Evidence" />
                </ListItemLink>

                <ListItemLink href="/app/incident-management/registration/root-cause-analysis/details/">
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Perform RCA" />
                </ListItemLink>

                <ListItemLink href="/app/incident-management/registration/lession-learned/lession-learned/">
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText primary="Lessions Learnt" />
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
};

export default Summary;
