import {
  Grid, Typography
} from '@material-ui/core';
import Paper from "@material-ui/core/Paper";
import { makeStyles } from '@material-ui/core/styles';
// Table
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from "react-router";
import api from "../../../utils/axios";
import apiAction from "../../../utils/axiosActionTracker";
import {
  SSO_URL
} from "../../../utils/constants";
import Loader from "../Loader"
import {checkACL} from '../../../utils/helper'





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

  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [comment, setComment] = useState({})
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [observationNumber, setObservationNumber] = useState()


  const [actionTakenData, setActionTakenData] = useState([]);
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const companies = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).companies
    : null;
  let client = []
  let client_id = []
  companies.map((value, i) => {

    if (value.companyId === initialData.fkCompanyId) {
      client.push(companies[i])
      client[0].subscriptions.map((value, i) => {
        if (value.appCode == "actions") {
          client_id.push(client[0].subscriptions[i].hostings[0].clientId)
        }
      })
    }
  })

  const fetchInitialiObservation = async () => {
    // const response = await api.get('/api/v1/observations/${id}/')
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setObservationNumber(result.observationNumber)
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
    const result = res.data.data.results.results[0]
    const result1 = res.data.data.results


    // await setComments(result[3])
    await setComment(result)
    // await setIsLoading(true)
  }

  const fetchactionTrackerData = async () => {
    let API_URL_ACTION_TRACKER = "https://dev-actions-api.paceos.io/";
    const api_action = axios.create({
      baseURL: API_URL_ACTION_TRACKER,
    });
    const allActionTrackerData = await apiAction.get(`/api/v1/actions/?enitityReferenceId=${id}`)
    const allActionTracker = allActionTrackerData.data.data.results.results
    const newData = []
    allActionTracker.map((item, i) => {
      if (item.enitityReferenceId == localStorage.getItem("fkobservationId")) {
        newData.push(allActionTracker[i])
      }
    }
    )
    let sorting = newData.sort((a, b) => a.id - b.id)
    await setActionTakenData(sorting)
    await setIsLoading(true);

  }

  useEffect(() => {
    if (id) {
      fetchInitialiObservation();
      fetchComments()
      fetchactionTrackerData()
    }
  }, [])
  return (
    <>{isLoading ?
      (
    
    <>
    
      <>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Typography variant="h6" className="sectionHeading">
          <svg xmlns="http://www.w3.org/2000/svg" width="24.096" height="27.08" viewBox="0 0 33.096 36.08">
            <path id="online-survey" d="M2.458,0H30.635A2.418,2.418,0,0,1,33.1,2.367V25.175a2.421,2.421,0,0,1-2.461,2.364H19.105v-.047c0-.4,0-.784-.018-1.433H30.952a.692.692,0,0,0,.48-.192.639.639,0,0,0,.2-.463V5.714H1.563V25.4a.594.594,0,0,0,.021.164,2.077,2.077,0,0,0-.058.467,2.741,2.741,0,0,0,.263,1.224,1.492,1.492,0,0,0,.11.206h0A2.4,2.4,0,0,1,0,25.175V2.367A2.418,2.418,0,0,1,2.458,0Zm5.75,20.28a1.051,1.051,0,0,1,.769.262.969.969,0,0,1,.327.719V27.55h.663V24.464c0-1.248,2.046-1.21,2.046.07v3.083h.748V25.157c0-1.248,2.046-1.21,2.046.068V27.5h.721V25.768c0-1.248,2.046-1.21,2.046.068,0,1.439.085,3.136.031,4.572-.058,1.577-.4,3.353-1.585,4.346a5.706,5.706,0,0,1-4.58,1.254c-2.815-.429-3.527-2.088-4.867-4.131l-3.4-5.185c-.211-.473-.183-.793.027-1,.916-.564,2.376.634,4.006,2.328h.058V21.194a.935.935,0,0,1,.95-.913ZM5.276,11.833A1.013,1.013,0,0,1,5.6,10.441a1.106,1.106,0,0,1,1.462.241l.583.617L9.362,9.243A1.106,1.106,0,0,1,10.876,9.1a1.008,1.008,0,0,1,.147,1.456L8.434,13.551a1.133,1.133,0,0,1-.256.235,1.113,1.113,0,0,1-.811.152,1.08,1.08,0,0,1-.685-.446l-1.4-1.668Zm21.633,8.3a1.085,1.085,0,0,0,0-2.17H15.117a1.142,1.142,0,0,0-1.027.526,1.051,1.051,0,0,0,0,1.119,1.142,1.142,0,0,0,1.027.526Zm0-7.634a1.085,1.085,0,0,0,0-2.17H15.117a1.142,1.142,0,0,0-1.027.526,1.051,1.051,0,0,0,0,1.119,1.142,1.142,0,0,0,1.027.526ZM5.386,16.04h5.606a.752.752,0,0,1,.766.737V21.32a.755.755,0,0,1-.766.737H10.83v-.8a2.3,2.3,0,0,0-.611-1.577v-2.17H6.153v2.378a2.285,2.285,0,0,0-.409,1.3v.863H5.386a.755.755,0,0,1-.766-.737V16.777a.752.752,0,0,1,.766-.737ZM28.293,2.055A1.2,1.2,0,0,1,29.514,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,28.293,2.055Zm-8.229,0A1.2,1.2,0,0,1,21.285,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,20.064,2.055Zm4.116,0A1.2,1.2,0,0,1,25.4,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,24.18,2.055Z" fill="#06425c" />
          </svg> Action
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Paper elevation={1} className="paperSection">

        {checkACL('action_tracker-actions', 'view_actions') ? 
          <Grid container spacing={3} >
            <Grid item md={6}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Are there any corrective actions to be taken?
              </Typography>
              <Typography className={classes.labelValue}>
                {initialData.isCorrectiveActionTaken ? initialData.isCorrectiveActionTaken : "-"}
              </Typography>
            </Grid>

            <Grid item md={12} sm={12} xs={12}>{actionTakenData.length > 0 ?
              <TableContainer component={Paper}>
                <Table style={{ minWidth: 450 }} size="small">
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
                    {actionTakenData.map((action, index) => (<>
                      <TableRow>
                        <TableCell style={{ width: 50 }}>

                          <a
                            href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(localStorage.getItem("BaseUrl"))["actionClientID"]}&response_type=code&companyId=${fkCompanyId}&projectId=${projectId}&targetPage=/action/details/&targetId=${action.id}`}
                            target="_blank"
                          >{action.actionNumber}</a>

                        </TableCell>
                        <TableCell style={{ width: 50 }}>
                          {action.actionTitle}
                        </TableCell>
                        <TableCell style={{ width: 50 }}>
                          {action.actionStatus ? action.actionStatus : "-"}
                        </TableCell>
                      </TableRow></>))
                    }
                  </TableBody>
                </Table>
              </TableContainer> : null}
            </Grid>
            
          </Grid>
          : 'You do not have permissions to access actions.'}
        </Paper>
      </Grid>
      </>
      
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Typography variant="h6" className="sectionHeading">
          <svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="30.2" height="30.2" viewBox="0 0 40.2 40.2">
            <g id="Bounding_Boxes">
              <path id="Path_2274" data-name="Path 2274" d="M0,0H40.2V40.2H0Z" fill="none" />
            </g>
            <path id="growing-market-analysis" d="M8.9,15.458v5.02a.233.233,0,0,1-.23.23H6.694a.233.233,0,0,1-.23-.23v-5.02ZM14.364,0A14.37,14.37,0,0,1,26.389,22.244l6.22,6.778-4.288,3.921-6-6.609A14.37,14.37,0,1,1,14.364,0ZM23.39,5.341a12.767,12.767,0,1,0,3.752,9.029A12.767,12.767,0,0,0,23.39,5.341ZM6.458,13.818,11.7,9.23c1.155,1.136,2.286,2.511,3.433,3.647L19.325,8.67l-1.34-1.34,3.972-.035v4.02L20.654,10c-.93.941-3.125,3.015-4.044,3.94-1.174,1.174-1.734,1.2-2.91.021l-1.983-2.211L9.374,13.818ZM20.876,12.6v7.882a.233.233,0,0,1-.23.23H18.66a.23.23,0,0,1-.228-.23V14.5L19.7,13.279l.93-.906a1.608,1.608,0,0,0,.239.209Zm-4,3.3v4.58a.23.23,0,0,1-.228.23h-1.98a.23.23,0,0,1-.228-.23v-4.09A3.01,3.01,0,0,0,16.878,15.9Zm-3.985-.373v4.953a.23.23,0,0,1-.23.23H10.679a.233.233,0,0,1-.23-.23v-5.36a1.324,1.324,0,0,0,.118-.1l.992-.879.8.89.062.064q.241.241.474.442Z" transform="translate(3.908 4.558)" fill="#06425c" />
          </svg> Reviewed
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Paper elevation={1} className="paperSection">
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Reviewed By
              </Typography>
              <Typography className={classes.labelValue}>
                {initialData["reviewedByName"] ? initialData["reviewedByName"] : "-"}

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
                ) : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Typography variant="h6" className="sectionHeading">
          <svg id="comment" xmlns="http://www.w3.org/2000/svg" width="24.15" height="21.856" viewBox="0 0 24.15 21.856">
            <path id="Path_5096" data-name="Path 5096" d="M5.216,0H18.863A5.26,5.26,0,0,1,24.15,5.216v7a5.274,5.274,0,0,1-3.787,5l-.071,4a.571.571,0,0,1-1,.429l-3.93-4.216H5.216A5.245,5.245,0,0,1,0,12.218v-7A5.245,5.245,0,0,1,5.216,0ZM18.863,1.215H5.216a4,4,0,0,0-4,4v7a4,4,0,0,0,4,4H15.5a1.868,1.868,0,0,1,.572.214l3.072,3.287V16.791a.686.686,0,0,1,.5-.643,4.051,4.051,0,0,0,3.287-3.93v-7A4.011,4.011,0,0,0,18.863,1.215Z" fill="#06425c" />
            <path id="Path_5097" data-name="Path 5097" d="M80.643,74.215A.64.64,0,0,1,80,73.572.63.63,0,0,1,80.643,73H92.075a.564.564,0,0,1,.572.572.584.584,0,0,1-.572.643Z" transform="translate(-74.284 -67.784)" fill="#06425c" />
            <path id="Path_5098" data-name="Path 5098" d="M80.643,116.215a.63.63,0,0,1-.643-.572.64.64,0,0,1,.643-.643H92.075a.584.584,0,0,1,.572.643.564.564,0,0,1-.572.572Z" transform="translate(-74.284 -106.783)" fill="#06425c" />
            <path id="Path_5099" data-name="Path 5099" d="M80.643,159.215a.64.64,0,0,1-.643-.643.584.584,0,0,1,.643-.572H92.075a.526.526,0,0,1,.572.572.584.584,0,0,1-.572.643Z" transform="translate(-74.284 -146.711)" fill="#06425c" />
          </svg> Comments
        </Typography>
      </Grid>
      <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
        <Paper elevation={1} className="paperSection">
          <Grid container spacing={3}>
            <Grid item md={6}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Comments
              </Typography>
              <Typography className={classes.labelValue}>
                {comment ? comment.comment : "-"}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>)
      :
      <Loader />
    }
    </>
  );
};

export default ObservationCorrectiveActionView;
