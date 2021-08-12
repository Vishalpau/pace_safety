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
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import VisibilityIcon from "@material-ui/icons/Visibility";
import GetAppIcon from "@material-ui/icons/GetApp";
import Close from "@material-ui/icons/Close";
import { saveAs } from 'file-saver';
import { initial } from 'lodash';
import axios from "axios";
import Attachment from "../../Attachment/Attachment";

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
    listStyleType: "disc",
    listStylePosition:"inside",
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
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
// });
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ObservationInitialNotificationView = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  
  const {id} = useParams();
  const [initialData , setInitialData] = useState({}); 
  const [tagsData , setTagsData] = useState([])
  const [actionTakenData ,setActionTakenData] = useState([])

  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)

  }

  const fetchTags = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`)
    const tags = response.data.data.results.results
    await setTagsData(tags);
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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

  const [documentUrl, setDocumentUrl] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const download = (image_link) => {
    let onlyImage_url = image_link.replace("https://", "")
    let image_url = "http://cors.digiqt.com/" + onlyImage_url
    let imageArray = image_url.split("/")
    let image_name = imageArray[imageArray.length - 1]
    saveAs(image_url, image_name)
    handleClose()
  };

  const [positiveObservation, setPositiveObservation] = useState(false);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
  };

  

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
      
    await setActionTakenData(newData)
    // await setIsLoading(true);

  }
  const classes = useStyles();

  useEffect(() => {
      if(id){
        fetchInitialiObservation();
        fetchTags();
        fetchactionTrackerData()
      }
  },[])
  return (
    <>
      <Grid container spacing={3} className={classes.observationNewSection}>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Title
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationTitle}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observation Type
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationType}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Description
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationDetails}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Project Information
          </Typography>
          <Typography className={classes.labelValue}>
            
            {project.projectName} - {selectBreakdown[0].name} - {selectBreakdown[1].name} - {selectBreakdown[2].name} 
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observed By
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.reportedByName},{initialData.reportedByBadgeId}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observed On
          </Typography>
          <Typography className={classes.labelValue}>
          {moment(initialData["observedAt"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Submited by
          </Typography>
          <Typography className={classes.labelValue}>
          {initialData.reportedByName}
            {/* {initialData.observedAt} */}
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Shift
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.shift ? initialData.shift : "-"}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Supervisor details
          </Typography>
          <Typography className={classes.labelValue}>
                   {initialData.supervisorName},{initialData.supervisorByBadgeId}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Location
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.location}
          </Typography>
        </Grid>
        {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Actions Taken
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.actionTaken}
          </Typography>
        </Grid> */}
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Stop Work
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.stopWork}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Near Miss
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.nearMiss}
          </Typography>
        </Grid>
          {initialData.personRecognition !== "" ?
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Recognition
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.personRecognition}
          </Typography>
        </Grid> : null}
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Details of immediate actions taken
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.actionTaken ? initialData.actionTaken : "-"}
          </Typography>
            
          
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Notification sent to Safety Management
          </Typography>
          <Typography className={classes.labelValue}>
          {initialData.isNotifiedToSupervisor}
          
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Category
          </Typography>
          {/* {tagsData.} */}
          {tagsData.map((tag , index) => (
            
            
            <ul className={classes.labelValue} key={index}>
           {tag.observationTag !== "" ? <li>{tag.observationTag}</li> : null} 
             
          
          
            </ul>
          ))}
        </Grid>

        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Assignee
          </Typography>
          <Typography className={classes.labelValue}>
           {initialData.assigneeName}
          </Typography>
        </Grid>
        {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Actions
          </Typography>
          {actionTakenData.map((actionTaken)=>(
          <Typography className={classes.labelValue}>
            {actionTaken.actionTitle}
          </Typography>
          ))}
        </Grid> */}
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Attachments
          </Typography>
          <Typography className={classes.labelValue}>
          {/* <Attachment value={initialData.attachment}/> */}
          {initialData.attachment ===
                              null ? null : typeof initialData.attachment ===
                                "string" ? (
                                <Attachment value={initialData.attachment} />
                              ) : null}

          {/* <Avatar variant="rounded" className={classes.rounded} value={initialData.attachment} title={initialData.attachment}
            onClick={() =>
                                      handleOpen(initialData.attachment)
                                    }>
            <ImageIcon />
          </Avatar> */}
          </Typography>
        </Grid>
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
          ) :"-"}
          </Typography>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{
          style: {
            width: 700,
          },
        }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {" Please choose what do you want to?"}
        </DialogTitle>
        <IconButton onClick={handleClose} className={classes.closeButton}>
          <Close />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  startIcon={<VisibilityIcon />}
                  variant="contained"
                  color="primary"
                  className={classes.modalButton}
                  disableElevation
                  href={`${documentUrl}`}
                  target="_blank"
                >
                  View Attachment
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
              <Button
                    startIcon={<GetAppIcon />}
                    variant="contained"
                    disableElevation
                    className={classes.modalButton}
                    onClick={(e) => download(documentUrl)}
                  >
                    Download Attachment
                  </Button>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ObservationInitialNotificationView;
