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
import { useDispatch } from "react-redux";

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

import { breakDownDetails } from "../../../redux/actions/initialDetails";


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
  const [projectSturcturedData , setProjectSturcturedData] = useState([])
  const [isLoading , setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
  const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).name
    : null;
  const userBadgeNo = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).badgeNo
    : null;
  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)
    await setIsLoading(true)

    await fetchBreakDownData(result.fkProjectStructureIds)

  }
  const fetchTags = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`)
    const tags = response.data.data.results.results
    await setTagsData(tags);
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
   
    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === '1L') {
        var config = {
          method: "get",
          url: `${SSO_URL}/${
            projectData.projectName.breakdown[0].structure[0].url
          }`,
          headers: HEADER_AUTH,
        };
       
        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;
            
            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {
                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name },
                ];
              }
            });
          })
          .catch((error) => {
            
            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${
            projectData.projectName.breakdown[key].structure[0].url
          }${breakDown[key-1].slice(-1)}`,
          headers: HEADER_AUTH,
        };
       
        await api(config)
          .then(async (response) => {
          
            const result = response.data.data.results;
           
            const res=result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {
               
                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name },
                ];
              }
            });

          
          })
          .catch((error) => {
            console.log(error)
            // setIsNext(true);
          });
      }
    }
    // dispatch(breakDownDetails(selectBreakDown));
    await setProjectSturcturedData(selectBreakDown)    
    // localStorage.setItem('selectBreakDown', JSON.stringify(selectBreakDown));
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

  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1].split('-');
    const lastNameArray = fileName[fileName.length - 1]
    // const lastName = fileName.split("-");
    return lastNameArray;
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
    {isLoading ? (<>
      <Grid container spacing={3} className={classes.observationNewSection}>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Title
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationTitle ? initialData.observationTitle : "-"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observation Type
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationType ? initialData.observationType : "-"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Description
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationDetails ? initialData.observationDetails : "-"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Project Information
          </Typography>
          <Typography className={classes.labelValue}>
            
          {project.projectName} - {projectSturcturedData[0] ? projectSturcturedData[0].name : null}  {projectSturcturedData[1] ? `${projectSturcturedData[1].name}-` : null}  {projectSturcturedData[2] ? `${projectSturcturedData[2].name}` : null} 
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observed By
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.reportedByName ? initialData.reportedByName : "-"},{initialData.reportedByBadgeId !== "null" ? initialData.reportedByBadgeId : ""}
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observer Department
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.reportedByDepartment ? initialData.reportedByDepartment : "-"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observed On
          </Typography>
          <Typography className={classes.labelValue}>
          {moment(initialData["observedAt"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
          </Typography>
        </Grid>
        
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Supervisor details
          </Typography>
          <Typography className={classes.labelValue}>
                   {initialData.supervisorName ? initialData.supervisorName : "-"},{initialData.supervisorByBadgeId == "null" ? "" : initialData.supervisorByBadgeId}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Location
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.location ? initialData.location : "-"}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
          Classification
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.observationClassification ? initialData.observationClassification : "-"}
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
                    {initialData.stopWork ? initialData.stopWork : "-" }
          </Typography>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Near Miss
          </Typography>
          <Typography className={classes.labelValue}>
            {initialData.nearMiss ? initialData.nearMiss : "-"}
          </Typography>
        </Grid>
          {initialData.personRecognition !== "" ?
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Recognition
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.personRecognition ? initialData.personRecognition : "-"}
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
          {initialData.isNotifiedToSupervisor ? initialData.isNotifiedToSupervisor : "-"}
          
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
          Categories
          </Typography>
          {/* {tagsData.} */}
          {tagsData.map((tag , index) => (
            
            
            <ul className={classes.labelValue} key={index}>
           {tag.observationTag !== "" ? <li>{tag.observationTag}</li> : null} 
             
          
          
            </ul>
          ))}
        </Grid>

        {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Assignee
          </Typography>
          <Typography className={classes.labelValue}>
           {initialData.assigneeName ? initialData.assigneeName : "-"}
          </Typography>
        </Grid> */}
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
          {initialData.attachment ? (
          <Typography className={classes.labelValue} 
          // title={handelFileName(
          //   initialData.attachment)
          // }
                                    >
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
          </Typography>):("-")}
        </Grid>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
              Submited by
          </Typography>
          <Typography className={classes.labelValue}>
          {userName} , {userBadgeNo}
            {/* {initialData.observedAt} */}
          </Typography>
        </Grid>

        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Submited on
          </Typography>
          <Typography className={classes.labelValue}>
          {moment(initialData["createdAt"]).format(
            "Do MMMM YYYY, h:mm:ss a"
          )}
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
     </>) : (<h1>Loading...</h1>)}
    </>
  );
};

export default ObservationInitialNotificationView;
