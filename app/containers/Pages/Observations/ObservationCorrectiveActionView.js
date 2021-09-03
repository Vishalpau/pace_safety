import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import moment from 'moment';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from "@material-ui/core/Paper";

// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import Link from '@material-ui/core/Link';
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import axios from "axios";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ActionTracker from "./ActionTracker";
import ActionTrackerUpdate from "./ActionTrackerUpdate";

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
  ACTIONS_CLIENT_ID,
} from "../../../utils/constants";


const useStyles = makeStyles((theme) => ({
// const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  observationNewSection: {

  },
  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
    },
  },
  formControl: {
    '& .MuiInputBase-root': {
      borderRadius: '4px',
    },
  },
  labelName: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    color: '#737373',
  },
  labelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
  },
  custmSubmitBtn: {
    color: '#ffffff',
    backgroundColor: '#06425c',
    lineHeight: '30px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
  },
  formBox: {
    '& .dropzone': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '35px',
      borderWidth: '2px',
      borderRadius: '2px',
      borderColor: '#06425c',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      marginTop: '10px',
      cursor: 'pointer',
    },
  },
// });
}));

const ObservationCorrectiveActionView = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  
  const {id} = useParams();
  const [initialData , setInitialData] = useState({});
  const [comment , setComment] = useState({}) 
  const [comments , setComments] = useState([]);
  const [isLoading , setIsLoading] = useState(false);
  
  
  const [actionTakenData , setActionTakenData] = useState([]);

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

      const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;
console.log(projectId)
console.log(fkCompanyId)
  const fetchInitialiObservation = async () => {
    // const response = await api.get('/api/v1/observations/${id}/')
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)

  }
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path}
      {' '}
-
      {file.size}
      {' '}
bytes
    </li>
  ));


  const [positiveObservation, setPositiveObservation] = useState(false);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
  };

  const classes = useStyles();
  const fetchComments = async () => {
    const res = await api.get(`/api/v1/comments/Observation/${localStorage.getItem("fkobservationId")}/`)
    const result = res.data.data.results.results
    // await setComments(result[3])
    await setComment(result[result.length -1] )
    // await setIsLoading(true)
  }

  const fetchactionTrackerData = async () =>{
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {}
    const allActionTrackerData = await api_action.get("/api/v1/actions/")
    const allActionTracker = allActionTrackerData.data.data.results.results
    const newData = allActionTracker.filter(
      (item) => item.enitityReferenceId === localStorage.getItem("fkobservationId") 
      
      )
      let sorting = newData.sort((a, b) => a.id - b.id)
    
    await setActionTakenData(sorting)
    await setIsLoading(true);

  }
  useEffect(() => {
      if(id){
        fetchInitialiObservation();
        fetchComments()
        fetchactionTrackerData()
      }
  },[])
  return (
    <>{isLoading ? (
      <Grid container spacing={3} className={classes.observationNewSection}>


        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
          Are there any corrective actions to be taken?
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.isCorrectiveActionTaken ? initialData.isCorrectiveActionTaken : ""}
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Comments
          </Typography>
          <Typography className={classes.labelValue}>
           {comment ? comment.comment : ""}
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Reviewed By
          </Typography>
          <Typography className={classes.labelValue}>
          {initialData["reviewedByName"]}
          
          </Typography>
        </Grid>
       
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Reviewed On
          </Typography>
          <Typography className={classes.labelValue}>
            {/* {initialData.reportedDate ? initialData.reportedDate : "-"} */}
            {initialData["reviewedOn"] ? moment(initialData["reviewedOn"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          ) :"-"}
          </Typography>
        </Grid>

        <Grid item md={12}>
        <TableContainer component={Paper}>
            <Table style={{ minWidth: 100 }} size="small">
            <TableHead><TableRow>
            <TableCell style={{ width: 50 }}>
                          Action number
                        </TableCell>
                        <TableCell style={{ width: 50 }}>
                          Action title
                        </TableCell>
                        <TableCell style={{ width: 50 }}>
                          Action Status
                        </TableCell>
            </TableRow></TableHead>
            <TableBody>
            {actionTakenData.map((action , index) => (<>
              <TableRow>
                <TableCell style={{ width:50}}>
                
                <a
                 href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${fkCompanyId}&projectId=${projectId}&targetPage=/app/pages/Action-Summary/&targetId=${action.id}` }
                //  href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&targetPage=0&targetId=${action.id}` }
                // href = {`http://dev-actions.pace-os.com/app/pages/Action-Summary/${action.id}`}
                                // actionContext="Obsevations"
                                // enitityReferenceId={action.enitityReferenceId}
                                // actionId={action.id}
                                // actionData = {action}
                                // onClick = {() => {handleActionTracker(action)}}
                                target="_blank"
                              >{action.actionNumber}</a>
                
                </TableCell>
                <TableCell style={{ width:50}}>
                {action.actionTitle}
                </TableCell>
                <TableCell style={{ width:50}}>
                {action.actionStatus}
                </TableCell>
              </TableRow></> ))
          }
            </TableBody>
</Table>
</TableContainer>
        </Grid>

        
      </Grid>):(<h1>Loading...</h1>)}
    </>
  );
};

export default ObservationCorrectiveActionView;
