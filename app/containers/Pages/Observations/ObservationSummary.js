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
// import Styles from "dan-styles/Summary.scss";
// import Type from "dan-styles/Typography.scss";
// import Fonts from "dan-styles/Fonts.scss";
import moment from 'moment';
import api from "../../../utils/axios";

// Router
import { useHistory, useParams } from 'react-router';

// import IncidentDetails from "../InitialNotification/IncidentDetails";
// import IncidentDetailsSummary from "../../SummaryDetails/InitialNotification";
// import InvestigationSummary from "../../SummaryDetails/Investigation";
// import EvidenceSummary from "../../SummaryDetails/Evidence";
// import RootCauseAnalysisSummary from "../../SummaryDetails/RootCauseAndAnalysis";
// import LessionLearnSummary from "../../SummaryDetails/LessionLearn";

import ObservationInitialNotificationView from './ObservationInitialNotificationView';
import ObservationInitialNotificationUpdate from './ObservationInitialNotificationUpdate';
import ObservationCorrectiveAction from './ObservationCorrectiveAction';
import ObservationCorrectiveActionView from './ObservationCorrectiveActionView';
// import ObservationCloseOut from './ObservationCloseOut';
// import ObservationReview from './ObservationReview';

import { Comments } from "../../pageListAsync";


import AhaSummary from "../../../containers/Activity/Activity";
// import { useHistory } from "react-router";

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
  observationSummaryBox: {
    display: 'flex',
    gap: '1.5rem',
  },
}));

// Sidebar Links Helper Function

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ObservationSummary = () => {
  const [observationInitialNotification, setObservationInitialNotification] = useState(true);
  const [observationCorrectiveAction, setObservationCorrectiveAction] = useState(false);
  const [observationCorrectiveActionView, setObservationCorrectiveActionView] = useState(false);
  const [comment , setComment] = useState(false)
  const [activity , setActivity] = useState(false)
  const { id } = useParams();
  const history = useHistory();
  // const [observationCloseOut, setObservationCloseOut] = useState(false);
  // const [observationReview, setObservationReview] = useState(false);

  const [observationInitialNotificationUpdate, setObservationInitialNotificationUpdate] = useState(true);
  
  const handelObservationInitialNotificationUpdate = (e) => {
    setObservationInitialNotification(true);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveAction(false);
    setComment(false)
    setActivity(false)
    history.push(`/app/observation/details/${id}#modify`)

    
  };
 

  const handleActionUpdate = (e) => {
    setObservationCorrectiveAction(true);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveActionView(false);
    setObservationInitialNotification(false)
    setComment(false)
    setActivity(false)
    history.push(`/app/observation/details/${id}#action-taking`)
  }
 
  const handleComments = (e) => {
    setObservationInitialNotification(false);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveAction(false);
    setComment(true)
    setActivity(false);
    history.push(`/app/observation/details/${id}#comments`)

    
  };

  
   const handleActivity = (e) => {
    setObservationInitialNotification(false);
    setObservationInitialNotificationUpdate(false);
    setObservationCorrectiveAction(false);
    setComment(false)
    setActivity(true)
    history.push(`/app/observation/details/${id}#activity`)

    
  };
  
  const [initialData , setInitialData] = useState({}); 
  if (id) {
    localStorage.setItem('fkobservationId', id);
  }

  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleActionButtonClick = (action) => {
    setObservationInitialNotification(false);
    setObservationCorrectiveAction(true);
    setComment(false);
    setActivity(false);
    setObservationInitialNotificationUpdate(true)
    if(localStorage.getItem("action") === "Done"){
      setObservationCorrectiveActionView(true)
    }else{
      setObservationCorrectiveActionView(false)
    }
    

  }

  const handlePrintPush = async () => {
    //console.log("Ashutosh")
    history.push(
      `/app/prints/${id}`
    );
  };

  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)
  }

  if(localStorage.getItem("update") === "Done"){
    setObservationInitialNotificationUpdate(true)
   localStorage.removeItem("update")
 }

 if(localStorage.getItem("updateAction") === "Done"){
  setObservationCorrectiveActionView(true)
 localStorage.removeItem("updateAction")
}
  

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ['Yes', 'No'];
  const classes = useStyles();

  useEffect(() => {
    if(id){
      fetchInitialiObservation();
    }
  },[])
  return (
    <>
      {/* {isLoading ? ( */}
      <PapperBlock
        title={`Observation Number: ${initialData.observationNumber}`}
        icon="ion-md-list-box"
      >
        <Box paddingBottom={1}>
          <div className={classes.observationSummaryBox}>
            <div className={classes.item}>
              <Button
                color={observationInitialNotification === true ? 'secondary' : "primary"}
                variant="contained"
                size="small"
                endIcon={<CheckCircle />}
                className={classes.statusButton}
                onClick={(e) => {
                  setObservationInitialNotification(true);
                  setObservationCorrectiveAction(false);
                  setObservationInitialNotificationUpdate(true)
                  setComment(false)
                  setActivity(false)
                  // setObservationReview(false);
                  // setObservationCloseOut(false);
                }}
              >
                  Observation
              </Button>
              <Typography display="block">
                  Done
              </Typography>
            </div>

            <div className={classes.item}>
              <Button
                color={observationCorrectiveAction === true ? "secondary":"primary"}
                variant={localStorage.getItem("action") === "Done" ? "contained" :"outlined" }
                size="small"
                endIcon={localStorage.getItem("action") === "Done"  ? <CheckCircle /> : <AccessTime  /> }
                className={classes.statusButton}
                onClick={(e) => {handleActionButtonClick(e)
                  // setObservationInitialNotification(false);
                  // setObservationCorrectiveAction(true);
                  // setObservationCorrectiveActionView(true)
                  // setObservationReview(false);
                  // setObservationCloseOut(false);
                }}
              >
                  Action Tracking
              </Button>
              <Typography display="block">
                  {localStorage.getItem("action") === "Done" ? "Done" : "Pending"}
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
                  if(comment === true) {
                    return (<Comments/>)
                  }
                  if(activity === true) {
                    return (<AhaSummary/>)
                  }
                  if (
                    observationInitialNotification === true
                      && (observationCorrectiveAction === false
                        )
                  ) {
                    return (
                      observationInitialNotificationUpdate === true ? <ObservationInitialNotificationView /> : <ObservationInitialNotificationUpdate />
                    );
                  }
                  if (observationCorrectiveAction === true || (observationInitialNotification === false )) {
                    return (observationCorrectiveActionView === true ?  <ObservationCorrectiveActionView /> : <ObservationCorrectiveAction />);
                  }
                  
                  // if (observationReview == true) {
                  //   return <ObservationReview />;
                  // }
                  // if (observationCloseOut == true) {
                  //   return <ObservationCloseOut />;
                  // }
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
                    // href={`/app/pages/observation-initial-notification`}
                    //onClick={() => handlePushUpdateInitialNotification()}
                    onClick={(e) => handelObservationInitialNotificationUpdate(e)}
                  >
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Update Observation" />
                  </ListItemLink>

                    {localStorage.getItem("action") === "Done" ? (
                  <ListItem button divider onClick={(e) => handleActionUpdate(e)}>
                    <ListItemIcon>
                      <Edit />
                    </ListItemIcon>
                    <ListItemText primary="Update Actions" />
                  </ListItem>):(
                    <ListItem button divider onClick={(e) => handleActionUpdate(e)}>
                    <ListItemIcon>
                      <Add />
                    </ListItemIcon>
                    <ListItemText primary="Add Actions" />
                  </ListItem>
                  )}

                  <ListItem button onClick={(e) => handleComments(e)}>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem>

                  <ListItem button onClick={(e) => handleActivity(e)}>
                    <ListItemIcon>
                      <History />
                    </ListItemIcon>
                    <ListItemText primary="Activity History" />
                  </ListItem>
                </List>
                <Divider />
                <List dense>
                  <ListItem button onClick={(e) => handlePrintPush(e)}>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <ListItemText primary="Print" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </PapperBlock>
      {/* ) : (
        <h1> Loading...</h1>
      )} */}
    </>
  );
};

export default ObservationSummary;
