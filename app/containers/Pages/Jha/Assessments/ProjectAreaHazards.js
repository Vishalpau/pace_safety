import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { PapperBlock } from 'dan-components';

import { Col, Row } from "react-grid-system";
import { useHistory } from 'react-router';
import api from "../../../../utils/axios";
import FormSideBar from '../../../Forms/FormSideBar';
import { handelJhaId } from "../Utils/checkValue";
import { JHA_FORM } from "../Utils/constants";





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
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
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
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  loader: {
    marginLeft: "20px"
  },
}));

const ProjectAreaHazards = () => {

  const [formHazard, setFormHazard] = useState([])
  const [checkGroups, setCheckListGroups] = useState([])
  const [selectedOptions, setSelectedOption] = useState({})
  const [fetchOptionHazard, setFetchedOptionsHazard] = useState([])
  const [submitLoaderHazard, setSubmitLoaderHazard] = useState(false)
  const [otherHazards, setOtherHazards] = useState([
    {
      "hazard": "",
      "risk": "",
      "control": "",
      "humanPerformanceAspects": "string",
      "status": "Active",
      "createdBy": 0,
      "fkJhaId": localStorage.getItem("fkJHAId")
    }
  ])
  const [loadingHazard, setLoadingHazard] = useState(false)
  const history = useHistory()

  const handelUpdateHazard = async () => {
    const temp = {}
    const otherNoId = []
    const tempForm = []
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const apiData = res.data.data.results
    apiData.map((value) => {
      if (value.fkChecklistId !== 0) {
        tempForm.push(value)
      } else {
        otherNoId.push(value)
      }
    })
    setFormHazard(tempForm)
    if (otherNoId.length > 0) {
      setOtherHazards(otherNoId)
    }
    setFetchedOptionsHazard(apiData)
    apiData.map((value) => {
      if (value.hazard in temp) {
        temp[value.hazard].push(value.risk)
      } else {
        temp[value.hazard] = [value.risk]
      }
    })
    setSelectedOption(temp)
  }

  const checkList = async () => {
    const temp = {}
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const res = await api.get(`/api/v1/core/checklists/jha-safety-hazards-ppe-checklist/${projectId}/`)
    const checklistGroups = res.data.data.results[0].checklistGroups
    checklistGroups.map((value) => {
      temp[value["checkListGroupName"]] = []
      value.checkListValues.map((checkListOptions) => {
        let checkObj = {}
        if (checkListOptions !== undefined) {
          checkObj["inputLabel"] = checkListOptions.inputLabel
          checkObj["inputValue"] = checkListOptions.inputValue
          checkObj["checkListId"] = checkListOptions.id
          temp[value["checkListGroupName"]].push(checkObj)
        }
      })
    })
    setCheckListGroups(temp)
  }

  const handleAddHazard = (e) => {
    if (Object.keys(otherHazards).length < 100) {
      setOtherHazards([...otherHazards, {
        "hazard": "",
        "risk": "",
        "control": "",
        "humanPerformanceAspects": "string",
        "status": "Active",
        "createdBy": 0,
        "fkJhaId": localStorage.getItem("fkJHAId")
      }]);
    }
  };

  const handelRemoveHazard = async (e, index) => {
    if (otherHazards.length > 1) {
      let temp = otherHazards;
      let newData = otherHazards.filter((item, key) => key !== index);
      await setOtherHazards(newData);
    };
  }

  const handleOtherHazards = (e, key) => {
    const temp = [...otherHazards];
    const value = e.target.value;
    temp[key]["hazard"] = value;
    setOtherHazards(temp);
  };

  const handlePhysicalHazards = async (e, checkListId, hazard_value) => {
    let temp = [...formHazard]
    if (e.target.checked == false) {
      temp.map((jhaValue, index) => {
        if (jhaValue['fkChecklistId'] === checkListId) {
          temp.splice(index, 1);
          fetchOptionHazard.splice(index, 1);

        }
      })
    }
    else if (e.target.checked) {
      temp.push({
        "fkChecklistId": checkListId,
        "hazard": hazard_value,
        "risk": "",
        "control": "",
        "humanPerformanceAspects": "string",
        "status": "Active",
        "createdBy": 0,
        "fkJhaId": localStorage.getItem("fkJHAId"),
      })
    }
    await setFormHazard(temp)
  };

  const handelSelectOption = (checklistId, hazard) => {
    for (let i = 0; i <= formHazard.length; i++) {
      if (formHazard[i] != undefined && formHazard[i]["hazard"] == hazard && formHazard[i]["fkChecklistId"] == checklistId) {
        return true
      }
    }
  }

  const handelNavigateHazard = (navigateType) => {
    if (navigateType == "next") {
      history.push("/app/pages/Jha/assessments/assessment/")
    } else if (navigateType == "previous") {
      history.push("/app/pages/Jha/assessments/project-details/")
    }
  }

  const handelCheckPost = (checklistId, hazard) => {
    for (let i = 0; i <= fetchOptionHazard.length; i++) {
      if (fetchOptionHazard[i] != undefined && fetchOptionHazard[i]["hazard"] == hazard && fetchOptionHazard[i]["fkChecklistId"] == checklistId) {
        return true
      }
    }
  }

  const handelApiErrorHazard = () => {
    setSubmitLoaderHazard(false)
    history.push("/app/pages/error")
  }

  const handleSubmitHazard = async (e) => {
    setSubmitLoaderHazard(true)

    let hazardNew = []
    let hazardUpdate = []
    let allHazard = [formHazard, otherHazards]

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
    const resUpdate = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/bulkhazards/`, hazardUpdate).catch(() => handelApiErrorHazard())
    const resNew = await api.post(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/bulkhazards/`, hazardNew).catch(() => handelApiErrorHazard())
    handelNavigateHazard("next")
    setSubmitLoaderHazard(false)
  }

  const handelCallbackHazard = async () => {
    await setLoadingHazard(true)
    await handelUpdateHazard()
    await checkList()
    await setLoadingHazard(false)
  }

  useEffect(() => {
    handelCallbackHazard()
  }, [])

  const classes = useStyles();
  return (
    <PapperBlock title="Project Area Hazard" icon="ion-md-list-box">
      {loadingHazard == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              {/* {console.log(form)} */}
              {Object.entries(checkGroups).map(([key, value]) => (
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{key}</FormLabel>
                    <FormGroup>
                      {value.map((option) => (
                        <FormControlLabel
                          control={<Checkbox name={option.inputLabel} />}
                          label={option.inputLabel}
                          checked={handelSelectOption(option.checkListId, option.inputLabel)}
                          onChange={async (e) => handlePhysicalHazards(e, option.checkListId, option.inputLabel)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                </Grid>
              ))}

              <Grid item md={12} xs={12} className={classes.createHazardbox} style={{ marginTop: '12px' }}>
                <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
              </Grid>

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
                      defaultValue=""
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
                        onClick={(e) => handelRemoveHazard(e, index)}
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
                  onClick={(e) => handleAddHazard()}
                >
                  Add
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                alignItems="center"
              >
                <Button
                  variant="outlined"
                  className={classes.custmSubmitBtn}
                  onClick={(e) => handelNavigateHazard("previous")}
                >
                  Previous
                </Button>
                <div className={classes.loadingWrapper}>
                  <Button
                    variant="contained"
                    onClick={(e) => handleSubmitHazard()}
                    className={classes.custmSubmitBtn}
                    style={{ marginLeft: "10px" }}
                    disabled={submitLoaderHazard}
                  >
                    Next
                  </Button>
                  {submitLoaderHazard && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
              </Grid>
            </Grid>
          </Col>
          <Col md={3}>
            <FormSideBar
              deleteForm={"hideArray"}
              listOfItems={JHA_FORM}
              selectedItem={"Project Area Hazards"}
            />
          </Col>

        </Row>
        : "Loading..."}
    </PapperBlock>
  );
};

export default ProjectAreaHazards;