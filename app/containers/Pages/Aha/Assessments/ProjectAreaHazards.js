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
import { CircularProgress } from '@material-ui/core';

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
  button: {
    margin: theme.spacing(1),
  },
}));

const ProjectAreaHazards = () => {
  const history = useHistory();
  const {id} = useParams()
  const [form , setForm] = useState([]);
  
  const [selectedOptions, setSelectedOption] = useState({})
  
  const [isLoading , setIsLoading] = useState(false);
  const [submitLoader , setSubmitLoader] = useState(false);
 

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

  const [others , setOther] = useState([
    {"hazard": "Others",
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
    "fkAhaId": localStorage.getItem("fkAHAId"),}
  
  ]);

  const [checkGroups , setCheckListGroups] = useState([])
  const checkList = async () => {
    const temp = {}
    const res = await api.get("/api/v1/core/checklists/aha-hazards/1/")
    const checklistGroups = res.data.data.results[0].checklistGroups
    checklistGroups.map((value) => {
      temp[value["checkListGroupName"]] = []
      value.checkListValues.map((checkListOptions) => {
        let checkObj = {}
        if (checkListOptions !== undefined) {
          checkObj["inputLabel"] = checkListOptions.inputLabel
          checkObj["inputValue"] = checkListOptions.inputValue
          checkObj["id"] = checkListOptions.id
          temp[value["checkListGroupName"]].push(checkObj)
        }
      })
    })
    console.log(temp)
    setCheckListGroups(temp)
    setIsLoading(true)
  }

  const handlePhysicalHazards = (e , index , value , checkListID) => {
    let temp = [...form]
    let tempRemove = []
    if(e.target.checked == false){
      temp.map((ahaValue,index) => {
        if(ahaValue['hazard'] === value){
                    const res =  api.delete(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/${temp[index].id}/`)

         temp.splice(index, 1);
         

        }
      })
      console.log(temp)
    }
    else if(e.target.checked){
      temp.push( {
        "fkChecklistId" : checkListID,
        "hazard": value,
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
      "fkAhaId": localStorage.getItem("fkAHAId"),})
    }
    setForm(temp)
    
  };

  
  console.log(form)
 
  const handleOthers = async (e , key) => {
    const temp = [...others];
    const value = e.target.value;
    temp[key]["risk"] = value;
    setOther(temp);

  }
  const handelRemove = async (e, index) => {
    for (let i = 0; i < form.length; i++){
      if(form[i].hazard === "Others"){
        const res =  api.delete(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/${form[index].id}/`)

      }
    }

    if (others.length > 1) {
      if (others[index].id !== undefined) {
        console.log("here");
        // const res = await api.delete(
        //   `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[index].id}/`
        // );

      }

      let temp = others;
      let newData = others.filter((item, key) => key !== index);
      
      await setOther(newData);
    
  };

  }

  const handleAdd = (e) => {
    if (Object.keys(others).length < 100) {
      setOther([...others, {"hazard": "Others",
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
    await setSubmitLoader(true)
    for(let i = 0; i < form.length; i++){
      if(form[i].id){
        // const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/${form[i].id}/`,form[i])
      
      }else{
        const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`,form[i])
        
      }
      
    }
    // for(let j = 0; j < others.length; j++){
    //   if(others[j]['risk'] !== null){
    //     const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`,others[j])
    //   }
    // }
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

  const handelSelectOption = (hazard , checklistId) => {
    for (let i = 0; i <= form.length; i++) {
      if (form[i] != undefined && form[i]["hazard"] == hazard && form[i]["fkChecklistId"] == checklistId) {
        return true
      }
    }
  }


  const handelUpdate = async () => {
    console.log("here")
    const temp = {}
    // const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    console.log("sagar",res)
    const apiData = res.data.data.results.results
    console.log(apiData)
    setForm(apiData)
    apiData.map((value) => {
      if (value.hazard in temp) {
        temp[value.hazard].push(value.risk)
      } else {
        temp[value.hazard] = [value.risk]
      }
    })
    setSelectedOption(temp)
  }


  const fetchHzardsData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    const result = res.data.data.results.results
    const temp = {physicalHazards : [], chemicalHazards : [],energyHazard : [] , ergonomicHazards: [] , biologicalHazards : [] ,environmentalHazards : [] , otherhazards : []}
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
      }else if(result[i].hazard === "Others"){
        temp.otherhazards.push(result[i].risk)
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
    // Checklist()
    checkList()
    // fetchCheckList()
    
      // fetchHzardsData()
      handelUpdate()
 
    
  }, []);
  return (
    <>
            <PapperBlock title="Project Area Hazards" icon="ion-md-list-box">
            {isLoading ? (

    <Grid container spacing={3} className={classes.observationNewSection}>
    <Grid container spacing={3} item xs={12} md={9}>
    
    {Object.entries(checkGroups).map(([key, value]) => (
              <Grid item md={12}
            xs={12}
            className={classes.formBox}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{key}</FormLabel>
                  <FormGroup>
                    {value.map((option) => (
                      <FormControlLabel
                        control={<Checkbox name={option.inputLabel} />}
                        label={option.inputLabel}
                        checked={handelSelectOption(option.inputLabel , option.id)} 
                        onChange={async (e) => handlePhysicalHazards(e, key, option.inputLabel , option.id)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>
            ))}
            
        {/* <Grid
        item
        md={12}
        xs={12}
        className={classes.createHazardbox}
        style={{marginTop: '12px'}}
        >
        <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
        </Grid>
        {others.map((value,index ) => (<>

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
            defaultValue={riskVales.length !== 0 ? riskVales.otherhazards.length > 0 && riskVales.otherhazards[index] : ""}  
            fullWidth
            variant="outlined"
            className={classes.formControl}
            onChange={(e) => {handleOthers(e, index)}
            }
        />
        </Grid>
        {others.length > 1 ?
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
        </Grid> */}
        <Grid item xs={12}>
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
              </Grid>
        {/* <Grid
        item
        md={12}
        xs={12}
        style={{marginTop: '5px'}}
        >
        <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => {
                    history.push(
                      `/app/incident-management/registration/evidence/evidence/${localStorage.getItem(
                        "fkincidentId"
                      )}`
                    );
                  }}
                  // href="/app/incident-management/registration/evidence/evidence/"
                >
                  Previous
                </Button>
        <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}
        onClick={() =>handleSubmit()}>Next</Button>
        </Grid> */}
  
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