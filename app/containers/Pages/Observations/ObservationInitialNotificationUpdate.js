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
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InitialNotificationValidator from "../../Validator/Observation/InitialNotificationValidation";
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import axios from "axios";
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
  customCheckBoxList: {
    display: 'block',
    '& .MuiFormControlLabel-root': {
      width: '30%',
      [theme.breakpoints.down("xs")]: {
        width: '48%',
      },
    },
  },
  custmCancelBtn: {
    color: '#ffffff',
    backgroundColor: '#ff8533',
    lineHeight: '30px',
    marginLeft: '5px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
  },
// });
}));

const ObservationInitialNotificationUpdate = () => {

  const assignee = [
    'None',
    'Assignee',
    'Assignee 1',
    'Assignee 2',
    'Assignee 3',
    'Assignee 4',
  ];

  const assigneeDepartment = [
    'None',
    'Assignee Department',
    'Assignee Department 1',
    'Assignee Department 2',
    'Assignee Department 3',
    'Assignee Department 4',
    
  ];

  const {id} = useParams();
  const history = useHistory();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  // const handleChange = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  // };

  const [initialData , setInitialData] = useState({});

  const [positiveObservation, setPositiveObservation] = useState(true);
  const [riskObservation, setRiskObservation] = useState(true);
  const [addressSituation, setAddressSituation] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  const [tagData , setTagData] = useState([])
  const [reportedByName , setReportedByName] = useState([]);
  const [departmentName , setDepartmentName] = useState([])
  const [submitLoader , setSubmitLoader] = useState(false);
  const [projectSturcturedData , setProjectSturcturedData] = useState([])
  let filterReportedByName = []
  let filterDepartmentName = []

  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
 
  const handelPositivObservation = (e) => {
    setPositiveObservation(false);
    setRiskObservation(true);
  };

  const handelAtRiskConcern = (e) => {
    setPositiveObservation(true);
    setRiskObservation(false);
  };

  const handelAddressSituationYes = (e) => {
    setAddressSituation(false);
  };

  const handelAddressSituationNo = (e) => {
    setAddressSituation(true);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error , setError] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const [catagory , setCatagory ] = useState();

  const handleChange = async (e, index ,value) => {
    if (e.target.checked == true){
      let TempPpeData = [...catagory];
    TempPpeData[index].observationTag = value;
    await setCatagory(TempPpeData);
      
    }else{
      let TempPpeData = [...catagory];
    TempPpeData[index].observationTag = "";
    await setCatagory(TempPpeData);
    }
    
  };

  const handleOther = (e) => {
    let tempData = [...catagory]
    tempData[8].observationTag = e.target.value
  }

  const handleSubmit = async () => {
    const { error, isValid } = InitialNotificationValidator(initialData);

    await setError(error);

    if (!isValid) {
      return "Data is not valid";
    }
    await setSubmitLoader(true)
    
    let data = new FormData();
      data.append("fkCompanyId", initialData.fkCompanyId),
      data.append("fkProjectId", initialData.fkProjectId),
      data.append("fkProjectStructureIds", initialData.fkProjectStructureIds),
      data.append("observationType", initialData.observationType),
      data.append("observationClassification", initialData.observationClassification),
      data.append("stopWork", initialData.stopWork),
      data.append("nearMiss", initialData.nearMiss),
      data.append("acceptAndPledge", initialData.acceptAndPledge),
      data.append("personRecognition", initialData.personRecognition),
      data.append("observationTitle", initialData.observationTitle),
      data.append("observationDetails", initialData.observationDetails),
      data.append("isSituationAddressed", initialData.isSituationAddressed),
      data.append("actionTaken", initialData.actionTaken),
      data.append("location", initialData.location),
      data.append("observedAt", initialData.observedAt),
      data.append("isNotifiedToSupervisor", initialData.isNotifiedToSupervisor),
      data.append("assigneeName", initialData.assigneeName),
      data.append("assigneeId", initialData.assigneeId),
      data.append("shift", initialData.shift),
      data.append("departmentName", initialData.departmentName),
      data.append("departmentId", initialData.departmentId),
      data.append("reportedById", initialData.reportedById),
      data.append("reportedByName", initialData.reportedByName),
      data.append("reportedByDepartment", initialData.reportedByDepartment)
      if(initialData.reportedDate !== null && typeof initialData.reportedDate !== "string" ){
        data.append("reportedDate", null)
      }
      data.append("reportedByBadgeId", initialData.reportedByBadgeId),
      data.append("closedById", initialData.closedById),
      data.append("closedByName", initialData.closedByName),
      data.append("closedByDepartment", initialData.closedByDepartment)
      if(initialData.closedDate !== null && typeof initialData.closedDate !== "string" ){
        data.append("closedDate", null)
      }
      if(initialData.closedoutAttachment !== null && typeof initialData.closedoutAttachment !== "string" ){
        data.append("closedoutAttachment", initialData.closedoutAttachment)
      }
      data.append("supervisorName", initialData.supervisorName),
      data.append("supervisorDepartment", initialData.supervisorDepartment)
      if(initialData.attachment !== null && typeof initialData.attachment !== "string" ){
        data.append("attachment", initialData.attachment)
      }
      data.append("status", initialData.status),
      data.append("createdBy", initialData.createdBy),
      data.append("updatedBy", initialData.updatedBy),
      data.append("source", initialData.source),
      data.append("vendor", initialData.vendor),
      data.append("vendorReferenceId", initialData.vendorReferenceId);

    if (id) {
      data.append("id", id)
      for(let i = 0; i <catagory.length ; i++) {
      
      const res = await api.put(`/api/v1/observations/${id}/observationtags/${catagory[i].id}/`,catagory[i])
      }
      const res1 = await api.put(`/api/v1/observations/${id}/`, data);
      if (res1.status === 200) {
        await localStorage.setItem("update", "Done");
        history.push(
          `/app/observation/details/${id}`
        );
      }
    } 
  };

  const handleClose = async () => {
    history.push(`/app/observation-Summary/${id}`)
    await localStorage.setItem("update", "Done");
  }

  const fetchCheckBoxData = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`)
    const tags = response.data.data.results.results
    let sorting = tags.sort((a, b) => a.id - b.id)

    await setCatagory(sorting);
    await setIsLoading(true);
    
  }
  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)
    await fetchBreakDownData(result.fkProjectStructureIds)
    // await setIsLoading(true);

  }

  const fetchTags = async () => {
    const res = await api.get(`/api/v1/tags/`)
    const result = res.data.data.results.results
    let sorting = result.sort((a, b) => a.id - b.id)
    await setTagData(sorting)
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
            filterReportedByName.push(result[i].name);
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

  const fetchDepartment = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/departments/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results;
          let user = [];
          user = result;
          for (var i in result) {
            filterDepartmentName.push(result[i].departmentName);
            // filterReportedById.push(result[i].id);
          }
          // setReportedByName(filterReportedByName);
          setDepartmentName(filterDepartmentName);
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
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

  useEffect(() => {
    
      fetchInitialiObservation();
      fetchCheckBoxData();
      fetchTags()
      fetchReportedBy()
      fetchDepartment()
    
},[])

  const classes = useStyles();
  return (
    <>
      {/* <PapperBlock
        className={classes.customPapperBlockSection}
        title="Update Observation"
        icon="ion-md-list-box"
      > */}
      {isLoading ? 
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
                      {initialData.observationTitle}
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
            {project.projectName} - {projectSturcturedData[0] ? projectSturcturedData[0].name : null} - {projectSturcturedData[1] ? projectSturcturedData[1].name : null} - {projectSturcturedData[2] ? projectSturcturedData[2].name : null} 
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
          >
          
            <TextField
              label="Location*"
              //margin="dense"
              name="location"
              id="location"
              shrink={initialData.location !== null ? true : false}
              value={initialData.location  ? initialData.location : ""}
              fullWidth
              error={error ? error.location : null}
              helperText={error ? error.location ? error.location : "" : ""}
              variant="outlined"
              className={classes.formControl}
              onChange={(e) => {
                  setInitialData({
                    ...initialData,
                    location: e.target.value,
                  });
                }}
            />
          </Grid>
          
          <Grid item md={12} xs={12} className={classes.formBox}>
              <FormLabel className={classes.labelName} component="legend">
                Categories
              </FormLabel>
              <FormGroup className={classes.customCheckBoxList}>
                {tagData.slice(0,8).map((value , index) => (
                  <FormControlLabel
                    className={classes.labelValue}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name={value}
                        defaultChecked ={catagory[index].id ? catagory[index].observationTag ? true : false : false }
                        
                        onChange={(e) => handleChange(e, index,value.tagName)}
                      />
                    }
                    label={value.tagName}
                  />
                ))}
              </FormGroup>
              <Grid item md={3} xs={12} className={classes.formBox}>
                <TextField
                  label="Others, if any"
                  // margin="dense"
                  name="others"
                  id="others"
                  defaultValue={catagory[8].observationTag}
                  fullWidth
                  onChange={(e) => handleOther(e)}
                  variant="outlined"
                  className={classes.formControl}
                />
              </Grid>
            </Grid> 
            <Grid item md={6} xs={12} className={classes.formBox}>
              <Autocomplete
                id="combo-box-demo"
                options={reportedByName}
                value={initialData.assigneeName ? initialData.assigneeName :""}
                className={classes.mT30}
                getOptionLabel={(option) => option}
                onChange={(e, value) => {
                  setInitialData({
                    ...initialData,
                    assigneeName: value,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
            
              <TextField
                label="Assignee Department"
                // margin="dense"
                name="assigneedepartment"
                id="assigneedepartment"
                select
                fullWidth
                value={initialData.departmentName ? initialData.departmentName : ""}
                variant="outlined"
                onChange={(e) => {
                  setInitialData({ ...initialData, departmentName: e.target.value });
                }}
              >
                {departmentName.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
            {/* <Button
                variant="outlined"
                size="medium"
                className={classes.custmSubmitBtn}
                onClick={() => handleSubmit()}
              >
                Submit
              </Button> */}
            <Button variant="outlined" size="medium" className={classes.custmCancelBtn} 
                        onClick={() => handleClose()}
>Cancel</Button>
          </Grid>
        </Grid> : <h1>Loading...</h1>}
      {/* </PapperBlock> */}
    </>
  );
};

export default ObservationInitialNotificationUpdate;
