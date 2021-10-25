import { Button, Grid, Typography } from '@material-ui/core';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from '@material-ui/core/styles';
import Close from "@material-ui/icons/Close";
import GetAppIcon from "@material-ui/icons/GetApp";
import VisibilityIcon from "@material-ui/icons/Visibility";
import axios from "axios";
import { saveAs } from 'file-saver';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import { handelDateTime } from '../../../utils/CheckerValue';
import {
  HEADER_AUTH, SSO_URL
} from "../../../utils/constants";
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
    listStylePosition: "inside",
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

  const { id } = useParams();
  const [initialData, setInitialData] = useState({});
  const [tagsData, setTagsData] = useState([])
  const [actionTakenData, setActionTakenData] = useState([])
  const [projectSturcturedData, setProjectSturcturedData] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [selectDepthAndId, setSelectDepthAndId] = useState([])


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
    localStorage.setItem('fkobservationId', id)
    const result = res.data.data.results
    await setInitialData(result)
    await handelWorkArea(result)
    await setIsLoading(true)


  }
  const fetchTags = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`)
    const tags = response.data.data.results.results
    await setTagsData(tags);
  }
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const [projectStructName, setProjectStructName] = useState([])

  const handelWorkArea = async (assessment) => {
    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;
    let structName = []
    let projectStructId = assessment.fkProjectStructureIds.split(":")

    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0]["structureName"])
    }

    setProjectStructName(structName)
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

  const handleProjectName = (projectId) => {
    const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).companies
    : null;
   const abc =  userName.filter((user) => user.companyId === initialData.fkCompanyId)
   const dd = abc[0].projects.filter((user) => user.projectId === projectId)
    return dd[0].projectName
  }

  const [positiveObservation, setPositiveObservation] = useState(false);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
  };

  const classes = useStyles();
  useEffect(() => {
    if (id) {
      fetchInitialiObservation();
      fetchTags();

    }
  }, [])
  return (
    <>
      {isLoading ? (<>
        <Grid container spacing={3} className={classes.observationNewSection}>
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
              Observation Title
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.observationTitle ? initialData.observationTitle : "-"}
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

              {handleProjectName(initialData.fkProjectId)}  {projectStructName.map((value) => ` - ${value}`)}
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
              {initialData["observedAt"] ? handelDateTime(initialData["observedAt"]) : "-"}
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Foreman details
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.supervisorName ? initialData.supervisorName : "-"},{initialData.supervisorByBadgeId == "null" || initialData.supervisorByBadgeId == "" ? "-" : initialData.supervisorByBadgeId}
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
              {initialData.stopWork ? initialData.stopWork : "-"}
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

            {tagsData.length > 0 && tagsData.map((tag, index) => (


              <ul className={classes.labelValue} key={index}>
                {tag.observationTag !== "" ? <li>{tag.observationTag}</li> : "-"}



              </ul>
            ))}
            {tagsData.length == 0 && "-"}
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
              </Typography>) : ("-")}
          </Grid>
          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Submited by
            </Typography>
            <Typography className={classes.labelValue}>
              {userName} , {userBadgeNo !== null ? userBadgeNo : "-"}
              {/* {initialData.observedAt} */}
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Submited on
            </Typography>
            <Typography className={classes.labelValue}>
              {moment(initialData["createdAt"]).format(
                "Do MMMM YYYY, h:mm A"
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
