import React, { useEffect, useState, Component } from 'react';
import {
  Grid, Typography, TextField, Button, ListItemText
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormHelperText } from "@material-ui/core";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import api from "../../../utils/axios";
import { useHistory, useParams } from "react-router";
import ActionTracker from "./ActionTracker";
import axios from "axios";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Paper from "@material-ui/core/Paper";

import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';
// import { TableHead } from 'mui-datatables';
// import { useHistory, useParams } from "react-router";

// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import CorrectiveActionValidator from "../../Validator/Observation/CorrectiveActionValidation";
import InitialNotificationValidator from "../../Validator/Observation/InitialNotificationValidation";
import { CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

const useStyles = makeStyles((theme) => ({

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
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    float: 'left',
    width: '100%',
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
  addLink: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  increaseRowBox: {
    marginTop: '10px',
    color: '#06425c',
  },
  actionTitleLable: {
    float: 'right',
    width: 'calc(100% - 100px)',
    textAlign: 'right',
  },
}));

function ObservationCorrectiveAction() {
  const [form , setForm] = useState({})
  const [isLoading , setIsLoading] = useState(false);
  const radioDecide = ["Yes", "No"];
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {id} = useParams();
  const [actionTakenData , setActionTakenData ]= useState([])
  const [actionOpen , setActionOpen] = useState(false)
  const [error, setError] = useState({ comment: "" , reviewedOn : ""});
  const [reportedByName , setReportedByName] = useState([]);
  const [submitLoader , setSubmitLoader] = useState(false);
  let filterReportedByName = []

  const [comment , setComment] = useState({
    "fkCompanyId": 0,
    "fkProjectId": 0,
    "commentContext": "Observation",
    "contextReferenceIds": localStorage.getItem("fkobservationId"),
    "commentTags": "Corrective-Action",
    "comment": "",
    "parent": 0,
    "private": "Yes",
    "thanksFlag": "string",
    "status": "Active",
    "createdBy": 0
  })
  const reviewedBy =[
    "None", 
    "Reviewedby 1",
    "Reviewedby 2",
    "Reviewedby 3",
    "Reviewedby 4",
  ]

  const handleSubmit = async () => {
    const { error, isValid } = CorrectiveActionValidator(form);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    if(comment.comment === ""){
      setError({ comment: "Please enter comment" });
    }else{
      await setSubmitLoader(true)
      const res1 = await api.post(`/api/v1/comments/`,comment);
    if (res1.status === 201) {
      let data = new FormData();
    data.append("fkCompanyId", form.fkCompanyId),
      data.append("fkProjectId", form.fkProjectId),
      data.append("fkProjectStructureIds", form.fkProjectStructureIds),
      data.append("observationTopic", form.observationTopic),
      data.append("observationClassification", form.observationClassification),
      data.append("stopWork", form.stopWork),
      data.append("nearMiss", form.nearMiss),
      data.append("personRecognition", form.personRecognition),
      data.append("observationTitle", form.observationTitle),
      data.append("observationDetails", form.observationDetails),
      data.append("isSituationAddressed", form.isSituationAddressed),
      data.append("actionTaken", form.actionTaken),
      data.append("location", form.location),
      data.append("observedAt", form.observedAt),
      data.append("assigneeName", form.assigneeName),
      data.append("assigneeId", form.assigneeId),
      data.append("shift", form.shift),
      data.append("departmentName", form.departmentName),
      data.append("departmentId", form.departmentId),
      data.append("isCorrectiveActionTaken", form.isCorrectiveActionTaken),
      data.append("reportedById", form.reportedById),
      data.append("reportedByName", form.reportedByName),
      data.append("reportedByDepartment", form.reportedByDepartment)
      data.append("reportedByBadgeId", form.reportedByBadgeId),
      data.append("closedById", form.closedById),
      data.append("closedByName", form.closedByName),
      data.append("closedByDepartment", form.closedByDepartment)
      data.append("reviewedOn", form.reviewedOn)
      data.append("reviewedByName", form.reviewedByName)
      data.append("supervisorByBadgeId", form.supervisorByBadgeId),
      data.append("supervisorName", form.supervisorName),
      data.append("supervisorDepartment", form.supervisorDepartment)
      data.append("status", form.status),
      data.append("createdBy", form.createdBy),
      data.append("updatedBy", form.updatedBy),
      data.append("source", form.source),
      data.append("vendor", form.vendor),
      data.append("vendorReferenceId", form.vendorReferenceId);
      data.append("id", form.id)
    const res = await api.put(`/api/v1/observations/${localStorage.getItem(
      "fkobservationId"
    )}/`, data);
    if(res.status === 200){
      localStorage.setItem('updateAction', "Done")
      localStorage.setItem("action" , "Done")
      history.push(
        `/app/observation/details/${localStorage.getItem(
          "fkobservationId"
        )}`
      );
    }
    }
    }
    
    
    
    
  }
    
  const fetchInitialiObservationData = async () => {
    const res = await api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/`);
    const result = res.data.data.results;
    if(result.isCorrectiveActionTaken === "Yes"){
      await setActionOpen(true);
    }
    await setForm(result);
    // await setIsLoading(true);
    await handelActionTracker();
   
  };

  const fetchComments = async () => {
    const res = await api.get(`/api/v1/comments/Observation/${localStorage.getItem("fkobservationId")}/`)
    const result = res.data.data.results.results[0]
    const result2 = res.data.data.results.results
    if(result2.length > 0) {
      await setComment(result)
    }
    
    await setIsLoading(true);
  }
  const handleAction =  (e) => {
      if(e.target.value === "Yes"){
         setActionOpen(true)
      }else{
        setActionOpen(false)
      }
    
  }  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCloseDate = (e) => {


    if (new Date(e) <= new Date()) {
      
        setForm({ ...form, reviewedOn: moment(e).toISOString() })
        setError({...error , reviewedOn : ""})

    }
    else {
        let errorMessage = "Reviewed time should not be ahead of current time"
        setError({...error , reviewedOn : errorMessage})
    }
}
  const handelActionTracker = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    let ActionToCause = {}
    const allActionTrackerData = await api_action.get("/api/v1/actions/")
    const allActionTracker = allActionTrackerData.data.data.results.results

  }
  const handleReview  = (e ,value) => {
    let temp ={ ...form}
temp.reviewedByName = value.name
temp.reviewedById = value.id
    setForm(temp)
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

  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].users;
          let user = [];
          user = result;
          for (var i in result) {
            filterReportedByName.push(result[i]);
          }
          setReportedByName(filterReportedByName);
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };


  useEffect(() => {
    if(id){
      fetchInitialiObservationData()
      fetchactionTrackerData()
      // fetchComments()
      fetchReportedBy()
    }
    
  },[])
  const classes = useStyles();
  return (
    <>{isLoading ? 
      <Grid container spacing={3} className={classes.observationCorrectiveActionSection}>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Observation Title
          </Typography>
          <Typography className={classes.labelValue}>
                    {form.observationTitle}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Observation Type
          </Typography>
          <Typography className={classes.labelValue}>
                  {form.observationType}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Observation Description
          </Typography>
          <Typography className={classes.labelValue}>
          {form.observationDetails}
          </Typography>
        </Grid>
        <Grid item md={8}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Assigned to
            {' '}
            {/* <span className={classes.updateLink}><Link to="">Update</Link></span> */}
          </Typography>
          <Typography className={classes.labelValue}>
                    {form.assigneeName}
          </Typography>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormControl component="fieldset" error={
                                  error && error["isCorrectiveActionTaken"]
                                }>
            <FormLabel className={classes.labelName} component="legend">Are there any corrective actions to be taken?*</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1" 
            onChange={(e) => {
              setForm({ ...form, isCorrectiveActionTaken: e.target.value });
                    }}>
              {radioDecide.map((value) => (
                    <FormControlLabel
                      value={value}
                      checked={form.isCorrectiveActionTaken === value}
                      className={classes.labelValue}
                      onClick={(e) => handleAction(e)}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
            </RadioGroup>
            {error && error["isCorrectiveActionTaken"] && (
                                  <FormHelperText>
                                    {error["isCorrectiveActionTaken"]}
                                  </FormHelperText>
                                )}
          </FormControl>
        </Grid>
        <Grid item md={8}>
        {actionOpen === true ? (<>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Actions
          </Typography>
          <Typography className={classes.labelValue}>
          
            {' '}
          </Typography>
          
          {actionTakenData.length > 0   ? 
            <TableContainer component={Paper}>
            <Table style={{ minWidth: 100 }} size="small">
            <TableHead><TableRow>
            <TableCell style={{ width: 50 }}>
                          Action number
                        </TableCell>
                        <TableCell style={{ width: 50 }}>
                          Action title
                        </TableCell>
            </TableRow></TableHead>
            <TableBody>
            {actionTakenData.map((action) => (<>
              <TableRow>
                <TableCell style={{ width:50}}>
                <a
                //  href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${fkCompanyId}&projectId=${projectId}&targetPage=0&targetId=${action.id}` }
                //  href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&targetPage=0&targetId=${action.id}` }
                href = {`http://dev-actions.pace-os.com/app/pages/Action-Summary/${action.id}`}
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
              </TableRow></> ))
          }
            </TableBody>
</Table>
</TableContainer>: null}
            {/* <Typography className={classes.labelValue}>
                    {' '}{action.actionTitle}
            
            
          </Typography> */}
          
           
          

          <Typography className={classes.increaseRowBox}>
          <ActionTracker
                                actionContext="Obsevations"
                                enitityReferenceId={id}
                                actionTitle = ""
                              >add</ActionTracker>
          </Typography></>):null}
        </Grid>

        <Grid
          item
          md={5}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Reviewed by*"
            //margin="dense"
            name="reviewedby"
            id="reviewedby"
            select
            fullWidth
            error={error.reviewedByName}
            helperText={error.reviewedByName ? error.reviewedByName : null}
            value={form.reviewedByName ? form.reviewedByName : ""}
            variant="outlined"
            
          >
          {/* {reportedByName.map((option) => (
                  <MenuItem key={option} value={option.name}
                  onClick={(e , option) => handleReview(e,option)}>
                    {option.name}
                  </MenuItem>
                ))} */}
            {reportedByName.map((option) => (
              <MenuItem key={option} value={option.name}
              onClick={(e ) => handleReview(e , option)}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          md={5}
          xs={12}
          className={classes.formBox}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              className={classes.formControl}
              fullWidth
              label="Reviewed on*"
              value={form.reviewedOn ? form.reviewedOn : null}
              // onChange={handleDateChange}
              error={error.reviewedOn}
              helperText={error.reviewedOn ? error.reviewedOn : null}
              disableFuture={true}
              inputVariant="outlined"
              onChange={(e) => handleCloseDate(e)}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid
          item
          md={10}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Provide any additional comments*"
            //margin="dense"
            name="provideadditionalcomments"
            id="provideadditionalcomments"
            multiline
            rows={3}
            error={error.comment}
                helperText={error.comment ? error.comment : ""}
            // disabled={comment.id ? true : false}
            fullWidth
            variant="outlined"
            // defaultValue= {comment.comment}
            className={classes.formControl}
            onChange={(e) => {
                  setComment({ ...comment, comment: e.target.value });
                }}
          />
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
        {submitLoader == false ?
                <Button
                  variant="outlined"
                  onClick={(e) => handleSubmit()}
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                >

               Submit
                </Button>
                :
                <IconButton className={classes.loader} disabled>
                  <CircularProgress color="secondary" />
                </IconButton>
              }
          {/* <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
          onClick={() => handleSubmit()}>Submit</Button> */}
        </Grid> 
      </Grid>: <h1>Loading...</h1>}
    </>
  );
}

export default ObservationCorrectiveAction;
