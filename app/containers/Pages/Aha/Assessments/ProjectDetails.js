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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams , useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import Axios from "axios";
import api from "../../../../utils/axios";


import ProjectDetailsValidator from "../Validator/ProjectDetailsValidation";

import { AHA } from "../constants";
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../../utils/constants";

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
    width: "100%",
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
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
        marginTop: '8px',
    },
  },
// });
}));

const ProjectDetails = () => {
// class ObservationInitialNotification extends Component {
  const {id} = useParams();
  const history = useHistory();

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;
  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
    var struct = "";
  for (var i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  const areaName = [
    'Area1',
  ];

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);
  const [levelLenght, setLevelLenght] = useState(0)

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


  const [positiveObservation, setPositiveObservation] = useState(true);
  const [riskObservation, setRiskObservation] = useState(true);
  const [addressSituation, setAddressSituation] = useState(true);
  const [submitLoader , setSubmitLoader] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const [isLoading , setIsLoading] = useState(false);
  const [workArea, setWorkArea] = useState("")
  const [projectBreakout, setProjectBreakout] = useState('')

   const [Teamform, setTeamForm] = useState([{
    "teamName": "",
    "status": "Active",
    "createdBy": parseInt(userId),
    "fkAhaId": 0
  }]);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const radioDecide = ['Yes' , 'No' ]
  const [error, setError] = useState({});

  
  const handleTeamName = (e, key) => {
    const temp = [...Teamform];
    const value = e.target.value;
    temp[key]["teamName"] = value;
    setTeamForm(temp);
  };

  const handleAdd = (e) => {
    if (Object.keys(Teamform).length < 100) {
      setTeamForm([...Teamform, { "teamName": "" ,
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": 0 }]);
    }
  };
  const handelRemove = async (e, index) => {

    if (Teamform.length > 1) {
      if (Teamform[index].id !== undefined) {
        const res = await api.delete(
          `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[index].id}/`
        );
      }

      let temp = Teamform;
      let newData = Teamform.filter((item, key) => key !== index);
      
      await setTeamForm(newData);
    
  };

  }


  const [form , setForm] = useState(
    {
      "fkCompanyId": parseInt(fkCompanyId),
      "fkProjectId": parseInt(project.projectId),
      "fkProjectStructureIds": fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
      "workArea": "",
      "location": "",
      "assessmentDate": null,
      "permitToPerform": "",
      "permitNumber": "",
      "ahaNumber": "",
      "description": "",
      "workStopCondition": "",
      "department": "",
      "additionalRemarks": "",
      "classification": "string",
      "wrpApprovalUser": "",
      "wrpApprovalDateTime": null,
      "picApprovalUser": "",
      "picApprovalDateTime": null,
      "signedUser": "",
      "signedDateTime": "2021-08-17T09:55:30.900000Z",
      "anyLessonsLearnt": "",
      "lessonLearntDetails": "",
      "lessonLearntUserName": "",
      "ahaStatus": "",
      "ahaStage": "",
      "badgeNumber": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "source": "Web",
      "vendor": "string",
      "vendorReferenceId": "string"
    }
  )

  const handleSubmit = async (e) => {
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
    let fkProjectStructureId = uniqueProjectStructure.map(depth => {
      return depth;
    }).join(':')
    // await getProjectStr(fkProjectStructureId)
    console.log(fkProjectStructureId,"KKKKK")
    form["fkProjectStructureIds"] = fkProjectStructureId
    // form["workArea"] = projectBreakout.toString()
    console.log(form,"KKKKKKKK")
    const { error, isValid } = ProjectDetailsValidator(form,selectDepthAndId);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    await setSubmitLoader(true);
    if(form.id){
      delete form["ahaAssessmentAttachment"]
      // form['updatedBy'] = form['createdBy']
      console.log(form,"GGGGGGGg")
      const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `,form)
      for (let i = 0; i < Teamform.length; i++) {
        if(Teamform[i].id){
          const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[i].id}/`,Teamform[i]);
        }else{
          Teamform[i]["fkAhaId"] = localStorage.getItem("fkAHAId");
          if(Teamform[i].teamName !== ""){
            const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`,Teamform[i]);
          }
          if(res.status === 200){
            history.push("/app/pages/aha/assessments/project-area-hazards")
          }
        }
        
      }
      if(res.status === 200){
        history.push(`/app/pages/aha/assessments/project-area-hazards/`)
      }
     

    }else{
      const res = await api.post("/api/v1/ahas/",form)
      if(res.status === 201){
        let fkAHAId = res.data.data.results.id
        localStorage.setItem("fkAHAId",fkAHAId)

        for (let i = 0; i < Teamform.length; i++) {
          Teamform[i]["fkAhaId"] = localStorage.getItem("fkAHAId");
          const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`,Teamform[i]);
        }

        history.push("/app/pages/aha/assessments/project-area-hazards")
    }
    }
    
   
  }


  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const fetchBreakdown = async (e, index) => {
    const value = e.target.value;
    let temp = [...breakdown1ListData]
    temp[index - 1][`selectValue`] = value;
    setBreakdown1ListData(temp)
    if (selectBreakDown.filter(filterItem => filterItem.depth === `${index}L`).length > 0) {
      const removeSelectBreakDown = selectBreakDown.slice(0, index - 1)
      const removeBreakDownList = breakdown1ListData.slice(0, index + 1)
      removeBreakDownList[index][`selectValue`] = "";

      await setBreakdown1ListData(removeBreakDownList)

      let name = breakdown1ListData[index - 1].breakdownValue.map(
        async (item) => {
          if (item.id === value) {
            setSelectBreakDown([
              ...removeSelectBreakDown,
              { depth: item.depth, id: item.id, name: item.name },
            ]);
            dispatch(breakDownDetails([
              ...removeSelectBreakDown,
              { depth: item.depth, id: item.id, name: item.name },
            ]))
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...removeSelectBreakDown,
                { depth: item.depth, id: item.id, name: item.name },
              ])
            );
            return;
          }

        }
      );
    } else {
      let name = breakdown1ListData[index - 1].breakdownValue.map(
        async (item) => {
          if (item.id === value) {
            await setSelectBreakDown([
              ...selectBreakDown,
              { depth: item.depth, id: item.id, name: item.name },
            ]);
            dispatch(breakDownDetails([
              ...selectBreakDown,
              { depth: item.depth, id: item.id, name: item.name },
            ]))
            localStorage.setItem(
              "selectBreakDown",
              JSON.stringify([
                ...selectBreakDown,
                { depth: item.depth, id: item.id, name: item.name },
              ])
            );
            return;
          }

        }
      );
    }


    for (var key in projectData.projectName.breakdown) {
      if (key == index) {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${value}`,
          headers: HEADER_AUTH,
        };
        await Axios(config)
          .then(function (response) {
            if (response.status === 200) {

              if (
                breakdown1ListData.filter(
                  (item) =>
                    item.breakdownLabel ===
                    projectData.projectName.breakdown[index].structure[0].name
                ).length > 0
              ) {
                return;
              } else {
                setBreakdown1ListData([
                  ...breakdown1ListData,
                  {
                    breakdownLabel:
                      projectData.projectName.breakdown[index].structure[0]
                        .name,
                    breakdownValue: response.data.data.results,
                    selectValue: ""
                  },
                ]);
              }
            }
          })
          .catch(function (error) {

          });
      }
    }
  };
  const projectData = JSON.parse(localStorage.getItem("projectName"));

  const fetchCallBack = async () => {
    setSelectBreakDown([])
    for (var key in projectData.projectName.breakdown) {

      if (key == 0) {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };
        await Axios(config)
          .then(async(response)=> {
              
            await setBreakdown1ListData([
              {
                breakdownLabel:
                  projectData.projectName.breakdown[0].structure[0].name,
                breakdownValue: response.data.data.results,
                selectValue: ""
              },
            ]);

            setIsLoading(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const fetchAhaData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`)
    const result = res.data.data.results;
    await setForm(result)
    await fetchBreakDownData(result.fkProjectStructureIds)

   }

   const handleBreakdown = async (e, index, label, selectvalue) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    
    const value = e.target.value;
    
    const temp = [...fetchSelectBreakDownList]
    temp[index]["selectValue"].id = value
    // let removeTemp = temp.slice(0, index)
    for(var i in temp){
      if(i>index){
        temp[i].breakDownData=[]
        temp[i].selectValue.id=""
      }
      
    }
    let tempDepthAndId = selectDepthAndId;
    let dataDepthAndId = tempDepthAndId.filter(filterItem => filterItem.slice(0, 2) !== `${index+1}L`)
    let sliceData = dataDepthAndId.slice(0,index)
    let newdataDepthAndId = [...sliceData,`${index+1}L${value}`]
    setSelectDepthAndId(newdataDepthAndId)
    // await setFetchSelectBreakDownList(removeTemp)
    if (projectData.projectName.breakdown.length !== index+1) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index+1) {
         
          
          await api.get(`${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
          }${value}`,)
            .then(function (response) {
              if (response.status === 200) {

               temp[key].breakDownData =response.data.data.results
              //  temp[key].select=e.
              setBreakdown1ListData(temp)
              }
            })
            .catch(function (error) {

            });
        }
      }
    } 
  };

  const fetchBreakDownData = async (projectBreakdown) => {

    const projectData = JSON.parse(localStorage.getItem('projectName'));
    let breakdownLength = projectData.projectName.breakdown.length
    setLevelLenght(breakdownLength)
    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    setSelectDepthAndId(breakDown)
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === '1L') {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;
            await setIsLoading(true);
            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown, {
                    breakDownLabel: projectData.projectName.breakdown[0].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }

                ];

              }
            });
            setFetchSelectBreakDownList(selectBreakDown)
          })
          .catch((error) => {

            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key - 1].substring(2)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {

            const result = response.data.data.results;

            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown,
                  {
                    breakDownLabel: projectData.projectName.breakdown[key].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }
                ];

              }
            });
            setFetchSelectBreakDownList(selectBreakDown)

          })
          .catch((error) => {
            console.log(error)
            setIsNext(true);
          });
      }
    }
  };



  const getProjectStr = async(id) => {
    console.log(id)
    if(id != '') {
      let c_id   = JSON.parse(localStorage.getItem("company")).fkCompanyId
      let p_id   = JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      let data = []
      let breakDown = await id.split(':')
      console.log(breakDown,"FFFFFF")
      if (breakDown.length > 1){
        for(var i=0;i<breakDown.length;i++){
          let level_id = breakDown[i].split('L')
          let level    = level_id[0] + 'L'
          let _id      = level_id[1]
          let apiurl = `${ACCOUNT_API_URL}api/v1/companies/${c_id}/projects/${p_id}/projectstructure/${level}/${_id}/`
          let res = await api.get(apiurl);
         data= [...data,res.data.data.results[0].name]
        }
        console.log(data,"22222")
        setProjectBreakout(data)
      }else{
        // for(var i=0;i<breakDown.length;i++){
          let level_id = breakDown[0].split('L')
          let level    = level_id[0] + 'L'
          let _id      = level_id[1]
          let apiurl = `${ACCOUNT_API_URL}api/v1/companies/${c_id}/projects/${p_id}/projectstructure/${level}/${_id}/`
          let res = await api.get(apiurl);
         data= [...data,res.data.data.results[0].name]
         let name = data.toString()
         console.log(name,"52525252")

        await setForm({...form,workArea:name})
        // setProjectBreakout(data.toString())
      }
      
    }
  }

  const handleDepthAndId = (depth, id) => {
    let newData = [...selectDepthAndId, `${depth}${id}`]
    setSelectDepthAndId([... new Set(newData)])
  }
  const fetchTeamData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`)
    const result =  res.data.data.results
    await setTeamForm(result)
  }
  const classes = useStyles();

  useEffect(() => {
    // fetchBreakdown()
    // getProjectStr()
    

    fetchCallBack()
    
      fetchAhaData()
      fetchTeamData()
    // if(selectDepthAndId){
    //   getProjectStr()
    // }
    
  }, []);
  return (
    <>
        <PapperBlock title="Project Details" icon="ion-md-list-box">
        {isLoading ? 

    <Grid container spacing={3} className={classes.observationNewSection}>
    <Grid container spacing={3} item xs={12} md={9}>
        {/* <Grid item xs={12} className={classes.coponentTitleBox}>
            <Typography variant="h5">Initial Notification</Typography>
        </Grid> */}

        <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={classes.labelName}>
                Project
        </Typography>
        <Typography className={classes.labelValue}>
        {project.projectName}

        </Typography>
        </Grid>
        {id ? 
              fetchSelectBreakDownList.map((data, key) => 
              <Grid item xs={3} md={3} key={key}>
                <FormControl
                  error={error && error[`projectStructure${[key]}`]}
                  variant="outlined"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-label">
                    {data.breakDownLabel}
                  </InputLabel>
                  <Select
                    labelId="incident-type-label"
                    id="incident-type"
                    label="Incident type"
                    value={data.selectValue.id || ""}
                    disabled={data.breakDownData.length===0}
                    
                    onChange={(e) => {
                      handleBreakdown(e, key , data.breakDownLabel, data.selectValue);
                    }}
                  >
                    {data.breakDownData.length !== 0
                      ? data.breakDownData.map((selectvalues, index) => (
                        <MenuItem key={index} 
                        // onClick={(e) => handleDepthAndId(selectvalues.depth, selectvalues.id)}
                        value={selectvalues.id}>
                          {selectvalues.structureName}
                        </MenuItem>
                      ))
                      : null}
                  </Select>
                  {error && error[`projectStructure${[key]}`] && (
                              <FormHelperText>
                                {error[`projectStructure${[key]}`]}
                              </FormHelperText>
                            )}
                </FormControl>
              </Grid>

              ) : <ProjectStructureInit 
              selectDepthAndId={selectDepthAndId} 
              setLevelLenght={setLevelLenght}
              error= {error}
              setWorkArea={setWorkArea}
              setSelectDepthAndId={setSelectDepthAndId} />
              }
        {/* <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Work Area"
            margin="dense"
            name="workarea"
            id="workarea"
            value={form.workArea ? form.workArea : ""}
            select
            fullWidth
            onChange={(e) => setForm({...form,workArea:e.target.value})}
            variant="outlined"
        >
            {areaName.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
            ))}
        </TextField>
        </Grid> */}
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Work Location*"
            // margin="dense"
            name="worklocation"
            id="worklocation"
            value={form.location ? form.location : ""}
            error={error.location}
            helperText={error.location ? error.location : ""}
            fullWidth
            onChange={(e) => setForm({...form,location:e.target.value})}
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                className={classes.formControl}
                // margin="dense"
                fullWidth
                label="Date & Time*"
                value={selectedDate}
                onChange={handleDateChange}
                value={form.assessmentDate || null}
                error={error.assessmentDate}
                  helperText={error.assessmentDate ? error.assessmentDate : null}
                inputVariant="outlined"
                disableFuture="true"
                onChange={(e) => {
                    setForm({
                      ...form,
                      assessmentDate: moment(e).format("YYYY-MM-DD"),
                    });
                    // console.log(e.target.value)
                  }}
              />
            </MuiPickersUtilsProvider>
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <FormControl component="fieldset" error={
                                  error && error["permitToPerform"]
                                }>
            <FormLabel component="legend" className={classes.labelName} >Do you have a permit to perform the AHA?*</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1"
            onChange={(e) => {
                                    {setForm({...form,permitToPerform:e.target.value})};
                                  }}
                                  value={form.permitToPerform ? form.permitToPerform : ""}>
            {radioDecide.map((value) => (
              <FormControlLabel value={value} className={classes.labelValue} control={<Radio />} label={value} />
             ) )}
            {/* <FormControlLabel value="yes" className={classes.labelValue} control={<Radio />} label="Yes" />
            <FormControlLabel value="no" className={classes.labelValue} control={<Radio />} label="No" /> */}
            </RadioGroup>
            {error && error["permitToPerform"] && (
                                  <FormHelperText>
                                    {error["permitToPerform"]}
                                  </FormHelperText>
                                )}
        </FormControl>
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Permit Reference"
            // margin="dense"
            name="reference"
            id="reference"
            multiline
            value={form.permitNumber ? form.permitNumber : ""}         
            fullWidth
            onChange={(e) => {
                                    {setForm({...form,permitNumber:e.target.value})};
                                  }}
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Description*"
            // margin="dense"
            name="description"
            id="description"
            multiline
            error={error.description}
            helperText={error.description ? error.description : ""}
            rows={4}
            value={form.description ? form.description : ""}         
            fullWidth
            onChange={(e) => {
                                    {setForm({...form,description:e.target.value})};
                                  }}
            variant="outlined"
            className={classes.formControl}
        />
        </Grid>
        <Grid
        item
        md={12}
        xs={12}
        className={classes.createHazardbox}
        style={{marginTop: '12px'}}
        >
        <Typography variant="h6" gutterBottom className={classes.labelName}>Risk Assessment Team</Typography>
        </Grid>
        {Teamform.map((value,index) => (<>
        <Grid
        item
        md={6}
        xs={11}
        className={classes.createHazardbox}
        >
       
          <TextField
            label="Team Name"
            // margin="dense"
            name="arename"
            id="arename"
            multiline
            value={Teamform[index].teamName || ""}
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => {handleTeamName(e, index)}
            }
        />
        
        
        </Grid>
        {Teamform.length > 1 ?
        (<Grid item md={1} className={classes.createHazardbox}>
            <IconButton
                variant="contained"
                color="primary"
                onClick={(e) => {handelRemove(e, index)}}
            >
                <DeleteForeverIcon />
            </IconButton>
        </Grid>):null }
        
       </> ))}

        {/* {Teamform.map((item, index) => (<>
              
                  <Grid item xs={11} md={6}>
                    <TextField
                      label="Team Name"
            margin="dense"
            name="arename"
            id="arename"
            multiline
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onClick={() => {handleTeamName(e, index)}}
                    />
                  </Grid>
                  {Teamform.length > 1 ? (
                    <Grid item  md={1} justify="center">
                      <IconButton variant="contained"
                color="primary" onClick={(e) => handelRemove(e, index)}>
                      <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                    
                  ) : null}
                  </>
            ))} */}
        
        <Grid item md={12} className={classes.createHazardbox}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                className={classes.button}
                onClick={() => {handleAdd()}}
            >
                Add
            </Button>
        </Grid>
        {/* <Grid
        item
        md={12}
        xs={12}
        className={classes.formBox}
        >
        <FormLabel className={classes.labelName} component="legend">Discuss and document conditions when the work must be Stopped</FormLabel>
        <FormGroup className={classes.customCheckBoxList}>
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 1"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 2"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 3"
            />
            <FormControlLabel
            className={classes.labelValue}
            control={(
                <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                name="checkedI"
                onChange={handleChange}
                />
            )}
            label="Option 4"
            />
        </FormGroup>
        </Grid> */}
        
        <Grid
        item
        md={12}
        xs={12}
        style={{marginTop: '15px'}}
        >
        {submitLoader == false ?
                <Button
                  variant="outlined"
                  onClick={(e) => handleSubmit()}
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                >

                  Next
                </Button>
                :
                <IconButton className={classes.loader} disabled>
                  <CircularProgress color="secondary" />
                </IconButton>
              }
        </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Details"
              />
</Grid>
    </Grid> :<> loading...</>}
    </PapperBlock>
    </>
  );
};

export default ProjectDetails;