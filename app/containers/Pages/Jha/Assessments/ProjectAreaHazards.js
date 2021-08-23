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
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Col, Row } from "react-grid-system";
import Box from "@material-ui/core/Box";

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants"
import api from "../../../../utils/axios";
import { handelJhaId } from "../Utils/checkValue"

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

  const [form, setForm] = useState([])
  const [checkGroups, setCheckListGroups] = useState([])
  const [selectedOptions, setSelectedOption] = useState({})

  const handelUpdate = async () => {
    const temp = {}
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const apiData = res.data.data.results.results
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
    const res = await api.get("/api/v1/core/checklists/jha-safety-hazards-ppe-checklist/1/")
    const checklistGroups = res.data.data.results[0].checklistGroups
    checklistGroups.map((value) => {
      temp[value["checkListGroupName"]] = []
      value.checkListValues.map((checkListOptions) => {
        let checkObj = {}
        if (checkListOptions !== undefined) {
          checkObj["inputLabel"] = checkListOptions.inputLabel
          checkObj["inputValue"] = checkListOptions.inputValue
          temp[value["checkListGroupName"]].push(checkObj)
        }
      })
    })
    setCheckListGroups(temp)
  }

  const handlePhysicalHazards = (e, hazard_value, risk_value) => {
    let temp = form
    let tempRemove = []
    if (e.target.checked == false) {
      temp.map((jhaValue, index) => {
        if (jhaValue['risk'] === risk_value) {
          temp.splice(index, 1);
        }
      })
    }
    else if (e.target.checked) {
      temp.push({
        "hazard": hazard_value,
        "risk": risk_value,
        "control": "string",
        "humanPerformanceAspects": "string",
        "status": "Active",
        "createdBy": 0,
        "fkJhaId": localStorage.getItem("fkJHAId")
      })
    }
    setForm(temp)
  };

  const handelSelectOption = (hazard, risk) => {
    if (hazard in selectedOptions) {
      return selectedOptions[hazard].includes(risk)
    }
  }

  const handleSubmit = async (e) => {
    for (let i = 0; i < form.length; i++) {
      const res = await api.post(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/jobhazards/`, form[i])
    }
    history.push("/app/pages/aha/assessments/assessment")
  }

  useEffect(() => {
    handelUpdate()
    checkList()
  }, [])

  const classes = useStyles();
  return (
    <PapperBlock title="Project Area Hazard" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>

            {Object.entries(checkGroups).map(([key, value]) => (
              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">{key}</FormLabel>
                  <FormGroup>
                    {value.map((option) => (
                      <FormControlLabel
                        control={<Checkbox name={option.inputLabel} />}
                        label={option.inputLabel}
                        // checked={handelSelectOption(key, option.inputLabel)}
                        onChange={async (e) => await handlePhysicalHazards(e, key, option.inputLabel)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>
            ))}

            <Grid item md={12} xs={12} className={classes.createHazardbox} style={{ marginTop: '12px' }}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>Other Hazards</Typography>
            </Grid>

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
              />

            </Grid>
            <Grid item md={1} className={classes.createHazardbox}>
              <IconButton
                variant="contained"
                color="primary"
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>

            <Grid item md={12} className={classes.createHazardbox}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                className={classes.button}
              >
                Add
              </Button>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              style={{ marginTop: '5px' }}
            >
              <Button variant="outlined" size="medium" onClick={(e) => handleSubmit()} className={classes.custmSubmitBtn}>Next</Button>
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
    </PapperBlock>
  );
};

export default ProjectAreaHazards;