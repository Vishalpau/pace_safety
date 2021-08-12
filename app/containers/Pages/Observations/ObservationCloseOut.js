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
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import MenuItem from '@material-ui/core/MenuItem';
import { useDropzone } from 'react-dropzone';
import api from "../../../utils/axios";
import { useHistory, useParams } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ObservationCloseOut() {
  const reviewedBy = [
    'None',
 'Review',
   'Review 1',
  'Review 2',
   'Review 3',
  'Review 4',
    
  ];
  const [form, setForm] = useState({})
  const [isLoading , setIsLoading] = useState(false);

  const reviewDepartment = [
    
     
      'None',
 'Review Department',
'Review Department 1',
'Review Department 2',
     'Review Department 3',
 'Review Department 4',
    
  ];
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


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const [open, setOpen] = useState(false);
  const history = useHistory();


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
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  const handleFile = async (e, ) => {
    let TempPpeData = {...form};
    if (
      (TempPpeData.closedoutAttachment =
        e.target.files[0].size <= 1024 * 1024 * 5)
    ) {
      TempPpeData.closedoutAttachment = e.target.files[0];
      await setForm({...form, closedoutAttachment:TempPpeData.closedoutAttachment});
    } else {
      await setOpen(true);
    }
  };
  const handleSubmit = async () => {
    let data = new FormData();
      data.append("id", form.id)
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
      data.append("reportedById", form.reportedById),
      data.append("reportedByName", form.reportedByName),
      data.append("reportedByDepartment", form.reportedByDepartment),
      data.append("reportedByBadgeId", form.reportedByBadgeId),
      data.append("closedById", form.closedById),
      data.append("closedByName", form.closedByName),
      data.append("closedByDepartment", form.closedByDepartment),
      data.append("closedoutAttachment", form.closedoutAttachment),
      data.append("supervisorId", form.supervisorId),
      data.append("supervisorName", form.supervisorName),
      data.append("supervisorDepartment", form.supervisorDepartment),
      data.append("status", form.status),
      data.append("createdBy", form.createdBy),
      data.append("updatedBy", form.updatedBy),
      data.append("source", form.source),
      data.append("vendor", form.vendor),
      data.append("vendorReferenceId", form.vendorReferenceId);
    const res = await api.put(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/`, data);
    if(comment.comment  != ""){
      const res1 = await api.post(`/api/v1/comments/`,comment);
    if (res1.status === 201) {
      history.push(
        `/app/pages/observation-Summary/${localStorage.getItem(
          "fkobservationId"
        )}`
      );
    }
    }
  }
  const fetchInitialiObservationData = async () => {
    const res = await api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/`);
    const result = res.data.data.results;
    await setForm(result);
    await setIsLoading(true);
   
  };

  const classes = useStyles();
  useEffect(() => {
    fetchInitialiObservationData()
  },[])
  return (
    <>{isLoading ? 
      <Grid container spacing={3} className={classes.observationCorrectiveActionSection}>
        <Grid item xs={12} className={classes.coponentTitleBox}>
          <Typography variant="h5">Close Out</Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Observation Number
          </Typography>
          <Typography className={classes.labelValue}>
          {form.observationNumber}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Observation Title
          </Typography>
          <Typography className={classes.labelValue}>
          {form.observationDetails}
          </Typography>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Reviewed by"
            margin="dense"
            name="reviewedby"
            id="reviewedby"
            select
            fullWidth
            variant="outlined"
            onChange={(e) => {
                  setForm({
                    ...form,
                    reportedByName: e.target.value,
                  });
                }}
          >
            {reviewedBy.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Reviewer Department"
            margin="dense"
            name="reviewerdepartment"
            id="reviewerdepartment"
            select
            fullWidth
            onChange={(e) => {
                  setForm({
                    ...form,
                    reportedByDepartment: e.target.value,
                  });
                }}
            variant="outlined"
          >
            {reviewDepartment.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Provide any additional comments"
            margin="dense"
            name="provideadditionalcomments"
            id="provideadditionalcomments"
            multiline
            rows={3}
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => {
                  setComment({ ...comment, comment: e.target.value });
                }}
          />
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          className={classes.formBox}
        >
          <Typography variant="h6" gutterBottom className={classes.labelName}>
                    Evidences on closeout
          </Typography>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} 
            accept = ".png , .jpg"
            onChange={(e) => {
                                    handleFile(e);
                                  }}/>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <aside>
            {/* <h4>Files</h4> */}
            <ul>{files}</ul>
          </aside>
          <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  The file you are attaching is bigger than the 5mb.
                </Alert>
              </Snackbar>
        </Grid>
        <Grid
          item
          md={12}
          xs={12}
        >
          <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
          onClick={() => handleSubmit()}>Submit</Button>
        </Grid>
      </Grid> : <h1>Loading...</h1>}
    </>
  );
}

export default ObservationCloseOut;
