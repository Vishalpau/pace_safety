import React, { useEffect, useState, Component, useRef } from 'react';
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
import { useParams, useHistory } from 'react-router';
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

const ProjectAreaHazards = () => {
  const history = useHistory();
  const { id } = useParams()
  const [form, setForm] = useState([]);

  const [selectedOptions, setSelectedOption] = useState({})

  const [isLoading, setIsLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [fetchOption, setFetchedOptions] = useState([])


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

  const [otherHazards, setOtherHazards] = useState([
    {
      "hazard": "",
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
      "fkAhaId": localStorage.getItem("fkAHAId")
    }
  ])


  const [checkGroups, setCheckListGroups] = useState([])
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
    await setCheckListGroups(temp)
    await setIsLoading(true)
  }

  const handlePhysicalHazards = (e, index, value, checkListID) => {
    console.log(form, "''''''''")
    let temp = [...form]
    console.log(temp, "<<<<<<")
    let tempRemove = []
    if (e.target.checked == false) {
      temp.map((ahaValue, index) => {
        console.log(ahaValue.fkChecklistId)
        console.log(temp[index]['fkChecklistId'])
        console.log(checkListID)
        if (ahaValue['fkChecklistId'] === checkListID) {
          console.log(temp, "LLLLLLLLLL")

          // if(temp[index].id){
          //   console.log(temp[index].id)
          //   const res =  api.delete(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/${temp[index].id}/`)

          // }


          temp.splice(index, 1);
          fetchOption.splice(index, 1);

        }
      })
    }
    else if (e.target.checked) {
      temp.push({
        "fkChecklistId": checkListID,
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
        "fkAhaId": localStorage.getItem("fkAHAId"),
      })
    }
    setForm(temp)

  };

  console.log(form, "??????")

  const handleOtherHazards = async (e, key) => {
    const temp = [...otherHazards];
    const value = e.target.value;
    temp[key]["hazard"] = value;
    setOtherHazards(temp);

  }



  const handleAdd = (e) => {
    if (Object.keys(otherHazards).length < 100) {
      setOtherHazards([...otherHazards, {
        "hazard": "",
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
        "fkAhaId": localStorage.getItem("fkAHAId")
      }]);
    }
  };

  const handelRemove = async (e, index) => {
    if (otherHazards.length > 1) {
      if (otherHazards[index].id !== undefined) {
      }
      let temp = otherHazards;
      let newData = otherHazards.filter((item, key) => key !== index);
      await setOtherHazards(newData);
    };
  }





  const handleSubmit = async (e) => {
    await setSubmitLoader(true)

    let hazardNew = []
    let hazardUpdate = []
    let allHazard = [form, otherHazards]

    allHazard.map((values, index) => {
      allHazard[index].map((value) => {
        if (value["id"] == undefined) {
          if (value["hazard"] !== "") {
            hazardNew.push(value)
          }
        } else {
          if (value["hazard"] !== "") {
            hazardUpdate.push(value)
          }
        }
      })
    })



    const resHazardUpdate = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`, hazardUpdate)

    const resHazardNew = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`, hazardNew)

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
  const [chemicalList, setChemicalList] = useState([])
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
  const [riskVales, setRiskvalue] = useState([])

  const handelSelectOption = (hazard, checklistId) => {
    for (let i = 0; i <= form.length; i++) {
      if (form[i] != undefined && form[i]["hazard"] == hazard && form[i]["fkChecklistId"] == checklistId) {
        return true
      }
    }
  }




  const handelUpdate = async () => {
    const temp = {}
    // const jhaId = handelJhaId()
    const otherNoId = []
    const tempForm = []
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    const apiData = res.data.data.results
    apiData.map((value) => {
      if (value.fkChecklistId !== 0) {
        tempForm.push(value)
      } else {
        otherNoId.push(value)
      }
    })
    setForm(tempForm)

    // setForm(apiData)
    setFetchedOptions(apiData)
    if (otherNoId.length > 0) {
      setOtherHazards(otherNoId)
    }
    apiData.map((value) => {
      if (value.hazard in temp) {
        temp[value.hazard].push(value.risk)
      } else {
        temp[value.hazard] = [value.risk]
      }
    })
    setSelectedOption(temp)
  }


  useEffect(() => {

    checkList()
    handelUpdate()

  }, []);
  return (
    <>
      <PapperBlock title="Project Area Hazards" icon="ion-md-list-box">
        {isLoading ? (

          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>

              {Object.entries(checkGroups).map(([key, value]) => (
                <Grid item md={6}
                  xs={12}
                  className={classes.formBox}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{key}</FormLabel>
                    <FormGroup>
                      {value.map((option) => (
                        <FormControlLabel
                          control={<Checkbox name={option.inputLabel} />}
                          label={option.inputLabel}
                          checked={handelSelectOption(option.inputLabel, option.id)}
                          onChange={async (e) => handlePhysicalHazards(e, key, option.inputLabel, option.id)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              ))}

              <Grid
                item
                md={12}
                xs={12}
                className={classes.createHazardbox}
                style={{ marginTop: '12px' }}
              >
                <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
              </Grid>
              {/* {others.map((value,index ) => (<>

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

        </> ))} */}

              {otherHazards.map((value, index) => (
                <>
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
                      fullWidth
                      variant="outlined"
                      value={otherHazards[index].hazard || ""}
                      className={classes.formControl}
                      onChange={(e) => handleOtherHazards(e, index)}
                    />

                  </Grid>
                  {otherHazards.length > 1 ?
                    <Grid item md={1} className={classes.createHazardbox}>
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={(e) => handelRemove(e, index)}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid>
                    : null}
                </>
              ))}


              <Grid item md={12} className={classes.createHazardbox}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  className={classes.button}
                  onClick={() => { handleAdd() }}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => history.push(`/app/pages/aha/assessments/project-details/${localStorage.getItem("fkAHAId")}`)}
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

                    Next
                  </Button>
                  {submitLoader && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
                  </div>
                  
              </Grid>

            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Area Hazards"
              />
            </Grid>
          </Grid>) : (<h1>Loading...</h1>)}
      </PapperBlock>

    </>
  );
};

export default ProjectAreaHazards;