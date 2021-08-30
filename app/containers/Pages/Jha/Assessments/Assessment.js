import React, { useEffect, useState, Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, TextField, Button
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useParams, useHistory } from 'react-router';
import { PapperBlock } from 'dan-components';
import PropTypes, { string } from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '@material-ui/core/Chip';
import { Col, Row } from "react-grid-system";
import MUIDataTable from 'mui-datatables';
import Box from "@material-ui/core/Box";

import MenuItem from '@material-ui/core/MenuItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import api from "../../../../utils/axios";
import { handelJhaId } from "../Utils/checkValue"
import { JHA_FORM } from "../Utils/constants"
import FormSideBar from '../../../Forms/FormSideBar';
import ActionTracker from "../../../Forms/ActionTracker";


const useStyles = makeStyles((theme) => ({
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
    margin: '.5rem 0',
    width: '100%',
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
  tableSection: {
    '& .MuiToolbar-root': {
      paddingLeft: '15px',
      paddingRight: '15px',
    },
    '& .MuiToolbar-root.MuiToolbar-regular': {
      minHeight: '40px',
      paddingTop: '20px',
    },
    '& h6': {
      fontSize: '18px',
      fontWeight: '400',
      color: '#06425c',
    },
    '& div table': {
      marginTop: '10px',
    },
    '& table thead th': {
      padding: '5px 16px',
    },
  },
  fullWidth: {
    width: '100%',
    margin: '.5rem 0',
    //boxShadow: 'inset 0px 0px 9px #dedede',
    '& td textHeight': {
      padding: '2.5px 5px',
      borderRadius: '8px',
    },
  },
  ratioColorgreen: {
    backgroundColor: 'green',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColorred: {
    backgroundColor: 'red',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  ratioColororange: {
    backgroundColor: 'orange',
    padding: '16px!important',
    height: '56px',
    marginTop: '7px',
    borderRadius: '5px',
    color: '#ffffff',
  },
  increaseRowBox: {
    marginTop: '10px',
    color: '#06425c',
  },
}));

const Assessment = () => {

  const [form, setForm] = useState([])
  const history = useHistory()
  const [expanded, setExpanded] = useState(false);
  const [preformace, setPerformance] = useState({})
  const [document, setDocument] = useState([])
  const [jobDetails, setJobDetails] = useState({})
  const [loading, setLoading] = useState(false)
  const [additinalJobDetails, setAdditionalJobDetails] = useState({
    additionalRemarks: "",
    humanPerformanceAspects: [],
    workStopCondition: [],
  })

  const handelCheckList = async () => {
    const tempPerformance = {}
    const tempDocument = []
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
    const apiData = res.data.data.results.results
    setForm(apiData)
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const specificPerformance = await api.get(`https://dev-safety-api.paceos.io/api/v1/core/checklists/jha-human-performance-aspects/1/`)
    const apiDataPerformance = specificPerformance.data.data.results[0].checklistGroups

    const documentCondition = await api.get(`https://dev-safety-api.paceos.io/api/v1/core/checklists/jha-document-conditions/1/`)
    const apiCondition = documentCondition.data.data.results[0].checklistValues

    apiDataPerformance.map((value) => {
      let checkList = []
      value.checkListValues.map((checkValue) => {
        let checkObj = {}
        checkObj["inputLabel"] = checkValue.inputLabel
        checkObj["inputValue"] = checkValue.inputValue
        checkObj["checkListId"] = checkValue.id
        checkList.push(checkObj)
      })
      tempPerformance[value.checkListGroupName] = checkList
    })

    setPerformance(tempPerformance)
    setDocument(apiCondition)
  }

  const handelJobDetails = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const apiData = res.data.data.results
    setJobDetails(apiData)

    setAdditionalJobDetails({
      ...additinalJobDetails,
      humanPerformanceAspects: apiData.humanPerformanceAspects !== null ? apiData.humanPerformanceAspects.split(",") : [],
      workStopCondition: apiData.workStopCondition !== null ? apiData.workStopCondition.split(",") : [],
      additionalRemarks: apiData.additionalRemarks
    });
  }

  const selectValues = [1, 2, 3, 4]

  const handelPreformance = (e, value) => {
    if (e.target.checked == false) {
      let newData = additinalJobDetails.humanPerformanceAspects.filter((item) => item !== value);
      setAdditionalJobDetails({
        ...additinalJobDetails,
        humanPerformanceAspects: newData
      });
    } else {
      setAdditionalJobDetails({
        ...additinalJobDetails,
        humanPerformanceAspects: [...additinalJobDetails.humanPerformanceAspects, value]
      });
    }
  };

  const handelWorkDocument = (e, value) => {
    if (e.target.checked == false) {
      let newData = additinalJobDetails.workStopCondition.filter((item) => item !== value);
      setAdditionalJobDetails({
        ...additinalJobDetails,
        workStopCondition: newData
      });
    } else {
      setAdditionalJobDetails({
        ...additinalJobDetails,
        workStopCondition: [...additinalJobDetails.workStopCondition, value]
      });
    }
  };

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handelNavigate = (navigateType) => {
    if (navigateType == "next") {
      history.push("/app/pages/Jha/assessments/DocumentsNotifications/")
    } else if (navigateType == "previous") {
      history.push("/app/pages/Jha/assessments/project-area-hazards/")
    }
  }

  const handelRiskAndControl = (changeType, index, value) => {
    const temp = [...form]
    if (changeType == "risk") {
      temp[index]["risk"] = value
    } else if (changeType == "control") {
      temp[index]["control"] = value
    }
    setForm(temp)
  }

  const handelNext = async () => {
    for (let obj in form) {
      const res = await api.put(`/api/v1/jhas/${form[obj]["fkJhaId"]}/jobhazards/${form[obj]["id"]}/`, form[obj])
    }
    jobDetails["humanPerformanceAspects"] = additinalJobDetails.humanPerformanceAspects.toString()
    jobDetails["workStopCondition"] = additinalJobDetails.workStopCondition.toString()
    jobDetails["additionalRemarks"] = additinalJobDetails.additionalRemarks
    const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, jobDetails)

    handelNavigate("next")
  }

  const handelChecked = (value) => {
    if (additinalJobDetails.humanPerformanceAspects !== undefined) {
      return additinalJobDetails.humanPerformanceAspects.includes(value)
    }
  }

  const classes = useStyles();

  useEffect(() => {
    setLoading(true)
    handelCheckList()
    handelJobDetails()
    setLoading(false)
  }, [])

  return (
    <PapperBlock title="Assessments" icon="ion-md-list-box">
      {console.log(additinalJobDetails)}
      {loading == false ?
        <Row>
          <Col md={9}>
            <Grid container spacing={3} className={classes.observationNewSection}>
              <Grid
                item
                md={12}
                xs={12}
              >
                <div>
                  {form.map((value, index) => (
                    <Accordion
                      expanded={expanded === `panel${index}`}
                      onChange={handleExpand(`panel${index}`)}
                      defaultExpanded
                      className={classes.backPaper}
                      key={index}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        className={classes.headingColor}
                      >
                        <Typography className={classes.heading}><MenuOpenOutlinedIcon className={classes.headingIcon} />
                          {value["hazard"]}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>

                          <Grid item md={6} sm={6} xs={6}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Risk
                              </InputLabel>
                              <Select
                                labelId="jobstep_label"
                                id="jobstep_label"
                                label="Risk"
                                value={form[index]["risk"]}
                              >
                                {selectValues.map((value) => (
                                  <MenuItem
                                    value={value}
                                    onClick={(e) => handelRiskAndControl("risk", index, value)}
                                  >
                                    {value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item md={6} sm={6} xs={6}>
                            <TextField
                              variant="outlined"
                              id="controls"
                              multiline
                              rows="1"
                              label="Controls"
                              className={classes.fullWidth}
                              value={form[index]["control"]}
                              onChange={(e) => handelRiskAndControl("control", index, e.target.value)}
                            />
                          </Grid>
                          <Grid item md={12} xs={12} className={classes.createHazardbox}>
                            <Divider light />
                          </Grid>

                          <Grid item xs={6} className={classes.createHazardbox}>
                            <ActionTracker
                              actionContext="jha:hazard"
                              enitityReferenceId={`${localStorage.getItem("fkJHAId")}:${value.id}`}
                            />
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>

              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.createHazardbox}
                style={{ marginTop: '35px', marginBottom: '10px' }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.labelName}
                >
                  Specific human performance aspects that have been discussed  before commencing the work
                </Typography>
              </Grid>
              {Object.entries(preformace).map(([key, value]) => (
                <Grid item md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{key}</FormLabel>
                    <FormGroup>
                      {value.map((option) => (
                        <FormControlLabel
                          control={<Checkbox name={option.inputLabel} />}
                          label={option.inputLabel}
                          checked={additinalJobDetails.humanPerformanceAspects.includes(option.inputValue)}
                          onChange={async (e) => handelPreformance(e, option.inputValue)}
                        />
                      ))}
                    </FormGroup>
                  </FormControl>
                  <Box borderTop={1} marginTop={2} borderColor="grey.300" />
                </Grid>
              ))}

              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Discuss and document conditions when the work must be stopped</FormLabel>
                  <FormGroup>
                    {document.map((option) => (
                      <FormControlLabel
                        control={<Checkbox name={option.inputLabel} />}
                        label={option.inputLabel}
                        checked={additinalJobDetails.workStopCondition.includes(option.inputValue)}
                        onChange={async (e) => handelWorkDocument(e, option.inputValue)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
                <Box borderTop={1} marginTop={2} borderColor="grey.300" />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
                className={classes.formBox}
              >
                <TextField
                  label="Additional Remarks"
                  margin="dense"
                  name="additionalremarks"
                  id="additionalremarks"
                  multiline
                  rows={4}
                  value={additinalJobDetails.additionalRemarks}
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  onChange={(e) => setAdditionalJobDetails({
                    ...additinalJobDetails,
                    additionalRemarks: e.target.value
                  })}
                />
              </Grid>
              <Grid
                item
                md={12}
                xs={12}
              >
                <Button
                  variant="outlined"
                  size="medium"
                  className={classes.custmSubmitBtn}
                  onClick={(e) => handelNavigate("previous")}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                  onClick={(e) => handelNext()}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Col>
          <Col md={3}>
            <FormSideBar
              deleteForm={"hideArray"}
              listOfItems={JHA_FORM}
              selectedItem={"Assessment"}
            />
          </Col>
        </Row>
        :
        <p>Loading....</p>
      }
    </PapperBlock>
  );
};

export default Assessment;