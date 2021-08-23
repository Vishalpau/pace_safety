import React, { useEffect, useState, Component ,useRef } from 'react';
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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams , useHistory } from 'react-router';
import api from "../../../../utils/axios";

import { AHA } from "../constants";

import CheckListData from "../CheckList"

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
}));

const ProjectAreaHazards = () => {
  const history = useHistory();
  const {id} = useParams()
  const [form , setForm] = useState([]);


  const areaName = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'areaName',
      label: 'Area Name',
    },
    {
      value: 'areaName1',
      label: 'Area Name 1',
    },
    {
      value: 'areaName2',
      label: 'Area Name 2',
    },
    {
      value: 'areaName3',
      label: 'Area Name 3',
    },
    {
      value: 'areaName4',
      label: 'Area Name 4',
    },
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
  const [isLoading , setIsLoading] = useState(false);
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

  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;

  const handlePhysicalHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": physicalHazardsList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };

  const handleChemicalHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": chemicalHazardsList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };

  const handleEnergyHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": energyHazardList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };
  const handleErgonomicHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": ergonomicHazardsList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };
  const handleBiologicalHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": biologicalHazardsList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };
  const handleEnviromentHazards = (e , index , value) => {
    let temp = form
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['risk'] === value){
         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {"hazard": environmentalHazardsList.current.groupName[0].groupName,
      "risk": value,
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    console.log(form)
  };
 
  // const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  // render() {
  // const {classes } = this.props;

  // const handleTeamName = (e, key) => {
  //   const temp = [...Teamform];
  //   const value = e.target.value;
  //   temp[key]["teamName"] = value;
  //   setTeamForm(temp);
  // };

  const handleOthers = async (e , key) => {
    const temp = [...form];
    const value = e.target.value;
    temp[key]["teamName"] = value;
    setForm(temp);

  }
  const handelRemove = async (e, index) => {

    if (form.length > 1) {
      if (form[index].id !== undefined) {
        console.log("here");
        // const res = await api.delete(
        //   `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[index].id}/`
        // );
      }

      let temp = form;
      let newData = form.filter((item, key) => key !== index);
      
      await setForm(newData);
    
  };

  }

  const handleAdd = (e) => {
    if (Object.keys(form).length < 100) {
      setForm([...form, {"hazard": "others",
      "risk": "",
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId"),}]);
    }
  };

  

 

  const handleSubmit = async (e) => {
    for(let i = 0; i < form.length; i++){
      const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`,form[i])
      
    }
    history.push("/app/pages/aha/assessments/assessment")

  }
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const classes = useStyles();
  const [chemicalList , setChemicalList] = useState([])
  const chemicalHazardsList = useRef([{}])
  const physicalHazardsList = useRef([{}])
  const energyHazardList = useRef([{}])
  const ergonomicHazardsList = useRef([{}])
  const biologicalHazardsList = useRef([{}])
  const environmentalHazardsList = useRef([{}])

  const fetchCheckList = async () => {
    // let list = []
    //   const res = await api.get(`/api/v1/core/checklists/1/`)
    //   const result = res.data.data.results.checklistGroups
    //   const checkListValues = result[0].checkListValues
    //   checkListValues.map((value) => {
    //     list.push({label : value.inputLabel ,  value : value.inputValue})
    //   })
    //   await setChemicalList(list)
    physicalHazardsList.current = await CheckListData(0)
    chemicalHazardsList.current = await CheckListData(1);
    energyHazardList.current = await CheckListData(2);
    ergonomicHazardsList.current = await CheckListData(3);
    biologicalHazardsList.current = await CheckListData(4);
    environmentalHazardsList.current = await CheckListData(5);
    await setIsLoading(true)

  }
  console.log(chemicalHazardsList.current)
  const [riskVales , setRiskvalue] = useState([]) 

  const fetchHzardsData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    const result = res.data.data.results.results
    const temp = {physicalHazards : [], chemicalHazards : [],energyHazard : [] , ergonomicHazards: [] , biologicalHazards : [] ,environmentalHazards : []}
    for (let i = 0; i < result.length; i++){
      if(result[i].hazard === "Physical Hazards"){
        temp.physicalHazards.push(result[i].risk)
      }else if(result[i].hazard === "Chemical Hazards"){
        temp.chemicalHazards.push(result[i].risk)
      }else if(result[i].hazard === "Energy Hazards"){
        temp.energyHazard.push(result[i].risk)
      }else if(result[i].hazard === "Ergonomic Hazards"){
        temp.ergonomicHazards.push(result[i].risk)
      }else if(result[i].hazard === "Biological Hazards"){
        temp.biologicalHazards.push(result[i].risk)
      }else if(result[i].hazard === "Environmental Hazards"){
        temp.environmentalHazards.push(result[i].risk)
      }
    }
    await setRiskvalue(temp)
    await setForm(result)
  }

  console.log(riskVales)

  const handleCheckbox =  (value) => {
    console.log("sagar",value)
    console.log("sagar 000",riskVales.physicalHazards )
    const risk = false
    if(riskVales.physicalHazards.length > 0){
      if(riskVales.physicalHazards == value)
      risk = true
    }
console.log("222222222222",risk)
    return risk
  }

  useEffect(() => {
    // fetchBreakdown()
    // fetchCallBack()
    fetchCheckList()
    if(id){
      fetchHzardsData()
    }
    
  }, []);
  return (
    <>
            <PapperBlock title="Project Area Hazards" icon="ion-md-list-box">
            {isLoading ? (

    <Grid container spacing={3} className={classes.observationNewSection}>
    <Grid container spacing={3} item xs={12} md={9}>

        <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{physicalHazardsList.current.groupName[0].groupName}</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
            {physicalHazardsList.current.required_fields.map((phyValue , index) => (
              <>
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                  //  defaultChecked={handleCheckbox(phyValue.value)}  
                  //  defaultChecked={true}  
                    onChange={(e) => handlePhysicalHazards(e, index, phyValue.value)}
                    value={phyValue.value}
                    />
                )}
                label={phyValue.label}
                />
                {console.log( phyValue.value ,"0000", riskVales[index])}
                </>
            )
            )}

                
            </FormGroup>
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{chemicalHazardsList.current.groupName[0].groupName}</FormLabel>
            
            <FormGroup className={classes.customCheckBoxList}>
            {chemicalHazardsList.current.required_fields.map((chemicalValue,index) => (
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                    // defaultChecked={riskVales.length > 0 ?  riskVales.chemicalHazards.includes(chemicalValue.value) : ""} 
                    onChange={(e) => handleChemicalHazards(e, index, chemicalValue.value)}
                    value={chemicalValue.value}
                    />
                )}
                label={chemicalValue.label}
                />
              ))}
                
             
            </FormGroup>
            </Grid>
            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{energyHazardList.current.groupName[0].groupName}</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
            {energyHazardList.current.required_fields.map((energyValue , index) => 
            (
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                    // defaultChecked={riskVales.length > 0 ?  riskVales.energyHazard.includes(energyValue.value) : ""} 
                    onChange={(e) => handleEnergyHazards(e, index, energyValue.value)}
                    value={energyValue.value}
                    />
                )}
                label={energyValue.label}
                />
            ))}
                
               
            </FormGroup>
            </Grid>

            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{ergonomicHazardsList.current.groupName[0].groupName}</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
            {ergonomicHazardsList.current.required_fields.map((ergonomicValue , index) => 
            (
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                    // defaultChecked={ riskVales.length > 0 ? riskVales.ergonomicHazards.includes(ergonomicValue.value) : ""} 
                    onChange={(e) => handleErgonomicHazards(e, index, ergonomicValue.value)}
                    value={ergonomicValue.value}
                    />
                )}
                label={ergonomicValue.label}
                />
            ))}
                
               
            </FormGroup>
            </Grid>

            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{biologicalHazardsList.current.groupName[0].groupName}</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
            {biologicalHazardsList.current.required_fields.map((biologicalValue , index) => 
            (
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                    // defaultChecked={riskVales.length > 0 ? riskVales.biologicalHazards.includes(biologicalValue.value) : ""} 
                    onChange={(e) => handleBiologicalHazards(e, index, biologicalValue.value)}
                    value={biologicalValue.value}
                    />
                )}
                label={biologicalValue.label}
                />
            ))}
                
               
            </FormGroup>
            </Grid>

            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">{environmentalHazardsList.current.groupName[0].groupName}</FormLabel>
            <FormGroup className={classes.customCheckBoxList}>
            {environmentalHazardsList.current.required_fields.map((environmentValue , index) => 
            (
              <FormControlLabel
                className={classes.labelValue}
                control={(
                    <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="checkedI"
                    // defaultChecked={ riskVales.length > 0 ? riskVales.environmentalHazards.includes(environmentValue.value) : ""} 
                    onChange={(e) => handleEnviromentHazards(e, index, environmentValue.value)}
                    value={environmentValue.value}
                    />
                )}
                label={environmentValue.label}
                />
            ))}
                
               
            </FormGroup>
            </Grid>
            {/* <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">Hazard Type</FormLabel>
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
                label="Option 5"
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
                label="Option 6"
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
                label="Option 7"
                />
            </FormGroup>
            </Grid> */}
            {/* <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
            >
            <FormLabel className={classes.labelName} component="legend">Hazard Type</FormLabel>
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
                label="Option 5"
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
                label="Option 6"
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
                label="Option 7"
                />
            </FormGroup>
        </Grid> */}
        {/* <Grid
        item
        md={12}
        xs={12}
        className={classes.createHazardbox}
        style={{marginTop: '12px'}}
        >
        <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
        </Grid> */}
        {/* {form.map((value,index ) => (<>

        <Grid
        item
        md={6}
        xs={11}
        className={classes.createHazardbox}
        >
        <TextField
            label="Other Hazards"
            margin="dense"
            name="otherhazards"
            id="otherhazards"
            defaultValue=""
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => {handleOthers(e, index)}
            }
        />
        </Grid>
        {form.length > 1 ?
        (<Grid item md={1} className={classes.createHazardbox}>
            <IconButton
                variant="contained"
                color="primary"
                onClick={(e) => {handelRemove(e, index)}}
            >
                <DeleteForeverIcon />
            </IconButton>
        </Grid>):null }

        </> ))} */}

        {/* <Grid item md={1} className={classes.createHazardbox}>
            <IconButton
                variant="contained"
                color="primary"
            >
                <DeleteForeverIcon />
            </IconButton>
        </Grid> */}
        
        {/* <Grid item md={12} className={classes.createHazardbox}>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                className={classes.button}
                onClick={() => {handleAdd()}}
            >
                Add
            </Button>
        </Grid> */}
        <Grid
        item
        md={12}
        xs={12}
        style={{marginTop: '5px'}}
        >
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
        onClick={() =>handleSubmit()}>Next</Button>
        </Grid>
  
    </Grid>
        <Grid item xs={12} md={3}>
        <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Area Hazards"
              />
</Grid>
    </Grid> ): (<h1>Loading...</h1>)}
    </PapperBlock>

    </>
  );
};

export default ProjectAreaHazards;