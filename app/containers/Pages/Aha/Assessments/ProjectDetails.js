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

import Axios from "axios";
import api from "../../../../utils/axios";


import ProjectDetailsValidator from "../../../Validator/AHA/ProjectDetailsValidation";

import { AHA } from "../../../../utils/constants";



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
    'P1 - WA1',
     'P1 - WA2',
  
    
    
  ];

  const reportedBy = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'reportedBy',
      label: 'Reported By',
    },
    {
      value: 'reportedBy1',
      label: 'Reported By 1',
    },
    {
      value: 'reportedBy2',
      label: 'Reported By 2',
    },
    {
      value: 'reportedBy3',
      label: 'Reported By 3',
    },
    {
      value: 'reportedBy4',
      label: 'Reported By 4',
    },
  ];

  const supervisorName = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'supervisorName',
      label: 'Supervisor Name',
    },
    {
      value: 'supervisorName1',
      label: 'Supervisor Name 1',
    },
    {
      value: 'supervisorName2',
      label: 'Supervisor Name 2',
    },
    {
      value: 'supervisorName3',
      label: 'Supervisor Name 3',
    },
    {
      value: 'supervisorName4',
      label: 'Supervisor Name 4',
    },
  ];

  const assignee = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'assignee',
      label: 'Assignee',
    },
    {
      value: 'assignee1',
      label: 'Assignee 1',
    },
    {
      value: 'assignee2',
      label: 'Assignee 2',
    },
    {
      value: 'assignee3',
      label: 'Assignee 3',
    },
    {
      value: 'assignee4',
      label: 'Assignee 4',
    },
  ];

  const assigneeDepartment = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'assigneeDepartment',
      label: 'Assignee Department',
    },
    {
      value: 'assigneeDepartment1',
      label: 'Assignee Department 1',
    },
    {
      value: 'assigneeDepartment2',
      label: 'Assignee Department 2',
    },
    {
      value: 'assigneeDepartment3',
      label: 'Assignee Department 3',
    },
    {
      value: 'assigneeDepartment4',
      label: 'Assignee Department 4',
    },
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

  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // render() {
  // const {classes } = this.props;
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
  const [Teamform, setTeamForm] = useState([{ why: "", whyCount: "" }]);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const radioDecide = ['Yes' , 'No' ]
  const [error, setError] = useState({});

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
  
  const handleTeamName = (e, key) => {
    const temp = [...Teamform];
    const value = e.target.value;
    temp[key]["why"] = value;
    temp[key]["whyCount"] = key;
    setTeamForm(temp);
  };

  const handleAdd = (e) => {
    if (Object.keys(Teamform).length < 100) {
      setTeamForm([...Teamform, { why: "", whyCount: "" }]);
    }
  };

  const handelRemove = async (e, index) => {
    if (Teamform.length > 1) {
      let temp = Teamform;
      let newData = Teamform.filter((item, key) => key !== index);
      
      await setTeamForm(newData);
    }
  };



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
      "wrpApprovalDateTime": "2021-08-17T09:55:30.900000Z",
      "picApprovalUser": "",
      "picApprovalDateTime": "2021-08-17T09:55:30.900000Z",
      "signedUser": "",
      "signedDateTime": "2021-08-17T09:55:30.900000Z",
      "anyLessonsLearnt": "",
      "lessonLearntDetails": "",
      "lessonLearntUserName": "",
      "ahaStatus": "",
      "ahaStage": "",
      "badgeNumber": "",
      "status": "Active",
      "createdBy": 0,
      "source": "Web",
      "vendor": "string",
      "vendorReferenceId": "string"
    }
  )



  const handleSubmit = async (e) => {
    const { error, isValid } = ProjectDetailsValidator(form);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    const res = await api.post("/api/v1/ahas/",form)
    if(res.status === 201){
      let fkAHAId = res.data.data.results.id
      localStorage.setItem("fkAHAId",fkAHAId)
      history.push("/app/pages/aha/assessments/project-area-hazards")
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
  console.log(form)

  const classes = useStyles();

  useEffect(() => {
    // fetchBreakdown()
    fetchCallBack()
    
  }, []);
  return (
    <>
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
        <Grid item md={12}>
        <Typography variant="h6" gutterBottom className={classes.labelName}>
                Unit
        </Typography>
        <Typography className={classes.labelValue}>
        {selectBreakdown.length > 2 ? selectBreakdown[1].name : "-"}
        </Typography>
        </Grid>
        <Grid
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
        </Grid>
        <Grid
        item
        md={6}
        xs={12}
        className={classes.formBox}
        >
        <TextField
            label="Work Location*"
            margin="dense"
            name="worklocation"
            id="worklocation"
            defaultValue=""
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
                margin="dense"
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
                                  }}>
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
            margin="dense"
            name="reference"
            id="reference"
            multiline
            defaultValue=""
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
            margin="dense"
            name="description"
            id="description"
            multiline
            error={error.description}
            helperText={error.description ? error.description : ""}
            rows={4}
            defaultValue=""
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
            margin="dense"
            name="arename"
            id="arename"
            multiline
            value={Teamform[index].why || ""}
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => {handleTeamName(e, index)}
            }
        />
        
        
        </Grid>
        <Grid item md={1} className={classes.createHazardbox}>
            <IconButton
                variant="contained"
                color="primary"
                onClick={(e) => {handelRemove(e, index)}}
            >
                <DeleteForeverIcon />
            </IconButton>
        </Grid>
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
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
        onClick={() =>handleSubmit()}>Next</Button>
        </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Details"
              />
</Grid>
    </Grid>
    </>
  );
};

export default ProjectDetails;