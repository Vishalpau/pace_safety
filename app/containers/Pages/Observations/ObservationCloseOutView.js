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
import Link from '@material-ui/core/Link';
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import ImageIcon from "@material-ui/icons/Image";
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

const ObservationCloseOutView = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  
  const {id} = useParams();
  const [initialData , setInitialData] = useState({}); 

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

  const [documentUrl, setDocumentUrl] = useState("");
  const [open, setOpen] = React.useState(false)
  const [comment , setComment] = React.useState({})
    console.log(initialData)
  const handleOpen = (document) => {
    setDocumentUrl(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [positiveObservation, setPositiveObservation] = useState(false);

  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
  };

  const download = (image_link) => {
    let onlyImage_url = image_link.replace("https://", "")
    let image_url = "http://cors.digiqt.com/" + onlyImage_url
    let imageArray = image_url.split("/")
    let image_name = imageArray[imageArray.length - 1]
    saveAs(image_url, image_name)
    handleClose()
  };

  const fetchComments = async () => {
    const res = await api.get(`/api/v1/comments/Observation/${localStorage.getItem("fkobservationId")}/`)
    const result = res.data.data.results.results[1]
    await setComment(result)
  }

  const classes = useStyles();

  useEffect(() => {
      if(id){
        fetchInitialiObservation();
        fetchComments()
      }
  },[])
  return (
    <>
      <Grid container spacing={3} className={classes.observationNewSection}>
        <Grid item xs={12} className={classes.coponentTitleBox}>
          <Typography variant="h5">Close Out</Typography>
        </Grid>
        {initialData.closedoutAttachment !== null ? 
        <>
        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Reviewer 
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.reportedByName}
          </Typography>
        </Grid>


        <Grid item md={6}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
          Review by department
          </Typography>
          <Typography className={classes.labelValue}>
                    {initialData.reportedByDepartment}
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
            Close out attachment </Typography> <IconButton value={initialData.attachment} title={initialData.attachment}
            onClick={() =>
                                      handleOpen(initialData.closedoutAttachment)
                                    }>
                        <ImageIcon/>
                      </IconButton>
        </Grid>
        </>:<h1>No any Data</h1>}

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

export default ObservationCloseOutView;
