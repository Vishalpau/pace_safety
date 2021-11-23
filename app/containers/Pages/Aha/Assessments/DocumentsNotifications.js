import React, { useEffect, useState, Component, useRef } from 'react';
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
import { handelFileName } from "../../../../utils/CheckerValue";
import Attachment from "../../../../containers/Attachment/Attachment";

import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams, useHistory } from 'react-router';
import api from "../../../../utils/axios";
import { CircularProgress } from '@material-ui/core';

import Loader from "../../../Forms/Loader";

import { AHA } from "../constants";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH, SSO_URL
} from "../../../../utils/constants";
import { split } from 'lodash';


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
      display: 'block',
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
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
}));

const DocumentNotification = () => {
  const history = useHistory();
  const attachmentName = useRef("")
  const [isLoading, setIsLoading] = useState(false);
  const fkCompanyId =
  JSON.parse(localStorage.getItem("company")) !== null
    ? JSON.parse(localStorage.getItem("company")).fkCompanyId
    : null;

const projectId =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
    : null;
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });

  };

  const notification = ["Manager", "Supervisor"]
  const [submitLoader, setSubmitLoader] = useState(false);

  const [ahaform, setAHAForm] = useState({})
  const handleSubmit = async () => {
    await setSubmitLoader(true)

    // if(ahaform['notifyTo'] === null){
    //   ahaform['notifyTo'] = "null"
    // }
    
    let data = new FormData()
  
    data.append("fkCompanyId", ahaform.fkCompanyId)
    data.append("fkProjectId", ahaform.fkProjectId),
      data.append("fkProjectStructureIds", ahaform.fkProjectStructureIds),
      data.append("workArea", ahaform.workArea),
      data.append("location", ahaform.location),
      data.append("assessmentDate", ahaform.assessmentDate),
      data.append("permitToPerahaform", ahaform.permitToPerahaform),
      data.append("permitNumber", ahaform.permitNumber),
      data.append("ahaNumber", ahaform.ahaNumber)
    if (
      ahaform.ahaAssessmentAttachment !== null &&
      typeof ahaform.ahaAssessmentAttachment !== "string"
    ) {
      data.append("ahaAssessmentAttachment", ahaform.ahaAssessmentAttachment);
    }
    data.append("description", ahaform.description),
      data.append("workStopCondition", ahaform.workStopCondition),
      data.append("department", ahaform.department),
      data.append("additionalRemarks", ahaform.additionalRemarks),
      data.append("classification", ahaform.classification),
      data.append("link", ahaform.link)  
      data.append("notifyTo" , ahaform.notifyTo)
      data.append("permitToPerform", ahaform.permitToPerform),
      data.append("wrpApprovalUser", ahaform.wrpApprovalUser),
      data.append("picApprovalUser", ahaform.picApprovalUser),
      data.append("signedUser", ahaform.signedUser),
      data.append("signedDateTime", ahaform.signedDateTime),
      data.append("anyLessonsLearnt", ahaform.anyLessonsLearnt),
      data.append("lessonLearntDetails", ahaform.lessonLearntDetails),
      data.append("lessonLearntUserName", ahaform.lessonLearntUserName),
      data.append("ahaStatus", ahaform.ahaStatus),
      data.append("ahaStage", ahaform.ahaStage),
      data.append("badgeNumber", ahaform.badgeNumber),
      data.append("status", ahaform.status),
      data.append("createdBy", ahaform.createdBy),
      data.append("source", ahaform.source),
      data.append("vendor", ahaform.vendor)
    data.append("vendorReferenceId", ahaform.vendorReferenceId)
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`,
      data
    );
    if (res.status === 200) {
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
  const [notifyToList, setNotifyToList] = useState([]);
  const handleNotification = async (e, value) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];

      temp.push(value)
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq)

      setAHAForm({ ...ahaform, notifyTo: temp.toString() });
    } else {
      let temp = [...notifyToList];

      let newData = temp.filter((item) => item !== value);

      setNotifyToList(newData);
      setAHAForm({ ...ahaform, notifyTo: newData.toString() });

    }

  };

  const handleFile = (e) => {
    let temp = { ...ahaform }
    temp.ahaAssessmentAttachment = e.target.files[0]
    attachmentName.current = e.target.files[0].name
    setAHAForm(temp)
  }
  const fetchAhaData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const result = res.data.data.results;
    if (result.ahaAssessmentAttachment !== null) {
      const fileName = result.ahaAssessmentAttachment.split('/')
      const fn = fileName[fileName.length - 1]
      attachmentName.current = fn
    }

    await setAHAForm(result);
    await setIsLoading(true)
  };
  const [notificationSentValue, setNotificationSentValue] = useState([]);


  const fetchNotificationSent = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/aha/?subentity=aha&roleType=custom`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        setNotificationSentValue(result);
      }
    } catch (error) { }
  };


  const classes = useStyles();

  useEffect(() => {

    fetchAhaData();
    fetchNotificationSent()
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
                  {/* <DeleteIcon /> */}
                  <Typography title={handelFileName(ahaform.jhaAssessmentAttachment)}>
                    {ahaform.ahaAssessmentAttachment != "" &&
                      typeof ahaform.ahaAssessmentAttachment == "string" ? (
                      <Attachment value={ahaform.ahaAssessmentAttachment} />
                    ) : (
                      <p />
                    )}
                  </Typography>
                  <input type="file" onChange={(e) => handleFile(e)} />

                </Grid>

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
                  value={ahaform.link !== "null" ? ahaform.link : ""}
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  onChange={(e) => setAHAForm({ ...ahaform, link: e.target.value })}
                />
              </Grid>
              {notificationSentValue.length > 0 ? 
              
              <Grid
                item
                md={12}
                xs={12}
                className={classes.formBox}
                >
                <FormLabel className={classes.labelName} component="legend">Notifications to be sent to</FormLabel>
                <FormGroup>{notificationSentValue.map((value) => (
                  <FormControlLabel
                    className={classes.labelValue}
                    control={(
                        <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="checkedI"
                        checked ={ahaform.notifyTo !== null ? ahaform.notifyTo.includes(value.id) : ""}
                        onChange={(e) => handleNotification(e , value.id)}
                        />
                    )}
                    label={value.roleName}
                    />

                ))}   
                </FormGroup>
              </Grid> : null}

      

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
                <div className={classes.loadingWrapper}>
                  <Button
                    variant="contained"
                    onClick={(e) => handleSubmit()}
                    className={classes.button}
                    style={{ marginLeft: "10px" }}
                    disabled={submitLoader}
                  >

                    Submit
                  </Button>
                  {submitLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>

                <Button variant="outlined" className={classes.custmSubmitBtn}
                  onClick={() => history.push(`/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`)}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Documents & Notifications"
              />
            </Grid>
          </Grid>) :
          (
            <>
        <Loader/>
            </>
          )
        }
      </PapperBlock>
    </>
  );
};

export default DocumentNotification;