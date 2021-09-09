import React, { useEffect, useState, Component , useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import { PapperBlock } from 'dan-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import MUIDataTable from 'mui-datatables';

import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@material-ui/icons/Delete';

import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams , useHistory } from 'react-router';
import api from "../../../../utils/axios";
import { CircularProgress } from '@material-ui/core';


import { AHA } from "../constants";



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
    marginTop: '12px',
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
  // customCheckBoxList: {
  //   display: 'block',
  //   '& .MuiFormControlLabel-root': {
  //     width: '30%',
  //     [theme.breakpoints.down("xs")]: {
  //       width: '48%',
  //     },
  //   },
  // },
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
        marginTop: '8px',
    },
  },
  fileUploadFileDetails: {
    '& h4': {
      fontSize: '14px',
      fontWeight: '500',
      color: 'rgba(0, 0, 0, 0.54) !important',
      display: 'inline-block',
      paddingRight: '10px',
      paddingTop: '10px',
    },
    '& ul': {
      display: 'inline-block',
      '& li': {
        display: 'inline-block',
        paddingRight: '8px',
        color: 'rgba(0, 0, 0, 0.87) !important',
        fontSize: '0.9rem !important',
      },
      '& button': {
        display: 'inline-block',
      },
    },
  },
}));

const DocumentNotification = () => {
  const history = useHistory();
  const attachmentName = useRef("")
  const [isLoading , setIsLoading] = useState(false);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  
  };

  const notification = ["Manager" , "Supervisor" ]
  const [submitLoader , setSubmitLoader] = useState(false);

  const [ahaform , setAHAForm] = useState({})
  const handleSubmit = async () => {

    let data = new FormData()
    
      data.append("fkCompanyId" ,  ahaform.fkCompanyId)
      data.append("fkProjectId" , ahaform.fkProjectId),
      data.append("fkProjectStructureIds" , ahaform.fkProjectStructureIds) ,
      data.append("workArea" , ahaform.workArea),
      data.append("location" , ahaform.location),
      data.append("assessmentDate" , ahaform.assessmentDate),
      data.append("permitToPerahaform" ,  ahaform.permitToPerahaform),
      data.append("permitNumber" , ahaform.permitNumber),
      data.append("ahaNumber" , ahaform.ahaNumber)
      if (
        ahaform.ahaAssessmentAttachment !== null &&
        typeof ahaform.ahaAssessmentAttachment !== "string"
      ) {
        data.append("ahaAssessmentAttachment", ahaform.ahaAssessmentAttachment);
      }
      // data.append("ahaAssessmentAttachment" , ahaform.ahaAssessmentAttachment)
      data.append("description" ,  ahaform.description),
      data.append("workStopCondition" , ahaform.workStopCondition),
      data.append("department" , ahaform.department),
      data.append("additionalRemarks" ,  ahaform.additionalRemarks),
      data.append("classification",ahaform.classification),
      data.append("link",ahaform.link),
      data.append("notifyTo",ahaform.notifyTo),
      data.append("permitToPerform",ahaform.permitToPerform),
      data.append("wrpApprovalUser", ahaform.wrpApprovalUser),
      data.append("picApprovalUser" , ahaform.picApprovalUser),
      data.append("signedUser" , ahaform.signedUser),
      data.append("signedDateTime" , ahaform.signedDateTime),
      data.append("anyLessonsLearnt" ,ahaform.anyLessonsLearnt),
      data.append("lessonLearntDetails", ahaform.lessonLearntDetails),
      data.append("lessonLearntUserName" , ahaform.lessonLearntUserName),
      data.append("ahaStatus" , ahaform.ahaStatus),
      data.append("ahaStage" , ahaform.ahaStage),
      data.append("badgeNumber" , ahaform.badgeNumber),
      data.append("status" , ahaform.status),
      data.append("createdBy" , ahaform.createdBy),
      data.append("source", ahaform.source),
      data.append("vendor" , ahaform.vendor)
      data.append("vendorReferenceId", ahaform.vendorReferenceId)
      await setSubmitLoader(true)
      const res = await api.put(
        `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`,
        data
      );      
      if(res.status === 200) {
        history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`);
      }
    }

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <>
        <li key={file.path}>
        {file.path}
        {' '}
  -
        {file.size}
        {' '}
        bytes
      </li>
      <IconButton
        variant="contained"
        color="primary"
      >
        <DeleteForeverIcon />
      </IconButton>
    </>
  ));
  // const handleNotification = (e ,value) => {
  //   temp = {...form}
  //   tempdata  = []
  //   if(e.target.checked=== true) {
  //     temp
  //   }
  // }
const [notifyToList,setNotifyToList] = useState([]);
  const handleNotification = async (e, value) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];
     
      temp.push(value)
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq)
     
      setAHAForm({...ahaform , notifyTo : temp.toString()});
    } else {
      let temp = [...notifyToList];
      
        let newData = temp.filter((item) => item !== value);
      
      setNotifyToList(newData);
      setForm({...form , notifyTo : newData.toString()});

    }
    
  };

  const handleFile = (e) => {
    let temp = {...ahaform}
    temp.ahaAssessmentAttachment = e.target.files[0]
    attachmentName.current = e.target.files[0].name
    setAHAForm(temp)
  }
  const fetchAhaData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const result = res.data.data.results;
    if(result.ahaAssessmentAttachment !== null ) {
      const fileName = result.ahaAssessmentAttachment.split('/')
      const fn = fileName[fileName.length - 1]
      attachmentName.current = fn
    }
    
    await setAHAForm(result);
    await setIsLoading(true)
  };


  const classes = useStyles();

  useEffect(() => {
 
    fetchAhaData();
  }, []);
  return (
    <>
                <PapperBlock title="Documents & Notifications" icon="ion-md-list-box">
                {isLoading ? (

    <Grid container spacing={3} className={classes.observationNewSection}>
    <Grid container spacing={3} item xs={12} md={9}>

      <Grid
        item
        md={8}
        xs={12}
        className={classes.formBox}
      >
        <Typography variant="h6" gutterBottom className={classes.labelName}>
          Risk assessment supporting documents
        </Typography>
        <Grid
          item
          md={12}
          xs={12} 
          className={classes.fileUploadFileDetails}
        >
          <h4>Files</h4>
          <ul>{attachmentName.current}</ul>
          
          {/* <DeleteIcon /> */}
        </Grid>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} onChange={(e) => handleFile(e)}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        >
        <TextField
            label="Link"
            margin="dense"
            name="link"
            id="link"
            value = {ahaform.link !== "null" ? ahaform.link : ""}
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => setAHAForm({...ahaform , link: e.target.value})}
        />
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <FormLabel className={classes.labelName} component="legend">Notifications to be sent to</FormLabel>
        <FormGroup row>{notification.map((value) => (
          <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                // onChange={handleChange}
                // onChange={}
                checked ={ahaform.notifyTo !== null ? ahaform.notifyTo.includes(value) : ""}
                onChange={(e) => handleNotification(e , value)}
                />
            )}
            label={value}
            />

        ))}
            
            {/* <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Supervisor"
            /> */}
        </FormGroup>
        </Grid>
        
        <Grid
        item
        md={12}
        xs={12}
        >
        <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => history.goBack()}
                >
                  Previous
                </Button>
        {submitLoader == false ?
                <Button
                  variant="contained"
                  onClick={(e) => handleSubmit()}
                  className={classes.button}
                  style={{ marginLeft: "10px" }}
                >

                  Next
                </Button>
                :
                <IconButton className={classes.loader} disabled>
                  <CircularProgress color="secondary" />
                </IconButton>
              }
        {/* <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
        onClick={() =>handleSubmit()}>
        Submit</Button> */}
        </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Documents & Notifications"
              />
</Grid>
    </Grid> ): (<h1>Loading...</h1>)}
    </PapperBlock>
    </>
  );
};

export default DocumentNotification;