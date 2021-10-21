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
import Edit from '@material-ui/icons/Edit';
import { PapperBlock } from 'dan-components';
import React, { useEffect, useState } from 'react';
// Router
import { useHistory, useParams } from 'react-router';
import AhaSummary from "../../../containers/Activity/Activity";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import { Comments } from "../../pageListAsync";
import ObservationCorrectiveAction from './ObservationCorrectiveAction';
import ObservationCorrectiveActionView from './ObservationCorrectiveActionView';
import ObservationInitialNotificationUpdate from './ObservationInitialNotificationUpdate';
import ObservationInitialNotificationView from './ObservationInitialNotificationView';







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
      history.push(`/app/observation/details/${id}`)
    }else{
      setObservationCorrectiveActionView(false)
      history.push(`/app/observation/details/${id}#action-taking`)
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
  if(localStorage.getItem("update") === "Pending"){
    setObservationInitialNotification(true)
    setObservationInitialNotificationUpdate(true)
    setObservationCorrectiveAction(false)
   localStorage.removeItem("update")
 }
 
 if(localStorage.getItem("update") === "Done"){
    setObservationInitialNotification(true)
    setObservationInitialNotificationUpdate(true)
    setObservationCorrectiveAction(false)
   localStorage.removeItem("update")
 }

 if(localStorage.getItem("updateAction") === "Done" || localStorage.getItem("ActionUpdate") === "Pending"){
  setObservationCorrectiveActionView(true)
 localStorage.removeItem("updateAction")
 localStorage.removeItem("ActionUpdate")
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
        variant="h5"
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
                  history.push(`/app/observation/details/${id}`)
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
                  {localStorage.getItem("action") === "Done" ? "Done" : ""}
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
                    return (<Comments
                              commentContext="observations"
                              id={localStorage.getItem("fkobservationId")}
                            />)
                  }
                  else if(activity === true) {
                    return (<AhaSummary/>)
                  }
                  else if (
                    observationInitialNotification === true
                      && (observationCorrectiveAction === false
                        )
                  ) {
                    return (
                      observationInitialNotificationUpdate === true ? <ObservationInitialNotificationView /> : <ObservationInitialNotificationUpdate />
                    );
                  }
                  else if (observationCorrectiveAction === true || (observationInitialNotification === false )) {
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

                  {/* <ListItem button onClick={(e) => handleComments(e)}>
                    <ListItemIcon>
                      <Comment />
                    </ListItemIcon>
                    <ListItemText primary="Comments" />
                  </ListItem> */}

                  {/* <ListItem button onClick={(e) => handleActivity(e)}>
                    <ListItemIcon>
                      <History />
                    </ListItemIcon>
                    <ListItemText primary="Activity History" />
                  </ListItem> */}
                </List>
                <Divider />
                {/* <List dense>
                  <ListItem button onClick={(e) => handlePrintPush(e)}>
                    <ListItemIcon>
                      <Print />
                    </ListItemIcon>
                    <ListItemText primary="Print" />
                  </ListItem>
                </List> */}
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
