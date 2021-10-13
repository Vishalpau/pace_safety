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
import apiAction from "../../../utils/axiosActionTracker"

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

  //       const client_id = JSON.parse(localStorage.getItem('userDetails')) !== null
  // ? JSON.parse(localStorage.getItem('userDetails')).companies[0].subscriptions[1].hostings[0].clientId
  // : null;

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
    let ActionToCause = {}
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
            {comment ? comment.comment : "-"}
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
            ) : "-"}
          </Typography>
        </Grid>

        <Grid item md={12}>{actionTakenData.length > 0 ? 
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


      </Grid>) : (<h1>Loading...</h1>)}
    </>
  );
};

export default ObservationCorrectiveActionView;
