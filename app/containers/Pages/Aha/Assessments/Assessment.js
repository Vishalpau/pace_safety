import React, { useEffect, useState, Component, useRef } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { PapperBlock } from "dan-components";

import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import MUIDataTable from "mui-datatables";
import MenuItem from "@material-ui/core/MenuItem";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuOpenOutlinedIcon from "@material-ui/icons/MenuOpenOutlined";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import FormSideBar from "../../../../containers/Forms/FormSideBar";
import { useParams, useHistory } from "react-router";
import ActionTracker from "../../../Forms/ActionTracker";
import { CircularProgress } from '@material-ui/core';
import Loader from "../../../Forms/Loader";

import PickListData from "../../../../utils/Picklist/InvestigationPicklist";
import ActionShow from '../../../Forms/ActionShow'
import { handelIncidentId, checkValue, handelCommonObject, handelActionData } from "../../../../utils/CheckerValue";

import { connect } from "react-redux";
import { useDispatch } from "react-redux";

import axios from "axios";
import api from "../../../../utils/axios";

import { AHA } from "../constants";
import { keySeq } from "draft-js/lib/DefaultDraftBlockRenderMap";

const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  observationNewSection: {},
  coponentTitleBox: {
    "& h5": {
      paddingBottom: "20px",
      borderBottom: "1px solid #ccc",
    },
  },
  formControl: {
    // '& .MuiInputBase-root': {
    //   borderRadius: '4px',
    // },
    margin: ".5rem 0",
    width: "100%",
    // '& .MuiOutlinedInput-root': {
    //   boxShadow: 'inset 0px 0px 9px #dedede',
    // },
    // '& .MuiOutlinedInput': {
    //   boxShadow: 'inset 0px 0px 9px #dedede',
    // },
  },
  fullWidth: {
    width: "100%",
    margin: ".2rem 0",
    //boxShadow: 'inset 0px 0px 9px #dedede',
    "& td textHeight": {
      padding: "2.5px 5px",
      borderRadius: "8px",
    },
  },
  labelName: {
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    color: "#737373",
  },
  labelValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
  },
  custmSubmitBtn: {
    color: "#ffffff",
    backgroundColor: "#06425c",
    lineHeight: "30px",
    border: "none",
    marginTop: "12px",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "none",
    },
  },
  formBox: {
    "& .dropzone": {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "35px",
      borderWidth: "2px",
      borderRadius: "2px",
      borderColor: "#06425c",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      marginTop: "10px",
      cursor: "pointer",
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
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    "& button": {
      marginTop: "8px",
    },
  },
  tableSection: {
    "& .MuiToolbar-root": {
      paddingLeft: "15px",
      paddingRight: "15px",
    },
    "& .MuiToolbar-root.MuiToolbar-regular": {
      minHeight: "40px",
      paddingTop: "20px",
    },
    "& h6": {
      fontSize: "18px",
      fontWeight: "400",
      color: "#06425c",
    },
    "& div table": {
      marginTop: "10px",
    },
    "& table thead th": {
      padding: "5px 16px",
    },
  },
  ratioColorgreen: {
    backgroundColor: "green",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  ratioColorred: {
    backgroundColor: "red",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  ratioColororange: {
    backgroundColor: "orange",
    padding: "16px!important",
    height: "56px",
    marginTop: "7px",
    borderRadius: "5px",
    color: "#ffffff",
  },
  increaseRowBox: {
    marginTop: "10px",
    color: "#06425c",
  },
  button: {
    margin: theme.spacing(1),
  },
  // divider: {
  //   margin: '15px 15px',
  //   width: '97.4%',
  //   boxShadow: '1px 2px 10px #d4d4d4',
  // },
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

const Assessment = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState([]);
  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [colorId, setColorId] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [idPerColor, setIdPerColor] = useState({ 243: "yellow" });
  const [submitLoader, setSubmitLoader] = useState(false);
  const risk = useRef([])
  const [ahaform, setAHAForm] = useState({});
  const riskResidual = useRef([])
  const [updatePage, setUpdatePage] = useState(false)
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
    createdBy: "",
    projectStructId: ""
  })

  const monitor = useRef([])
  const [additinalJobDetails, setAdditionalJobDetails] = useState({
    workStopCondition: [],
  })
  const severity = [
    "Negligible",
    "Minor",
    "Moderate",
    "Major/ Critical",
    "Catastrophic",
  ];

  const probability = {
    1: "Improbable",
    2: "Remote",
    3: "Occasional",
    4: "Probable",
    5: "Frequent",
  };
  const approver = ['Yes', 'No']
  // const riskColor = ["1EBD10", "FFEB13", "F3C539", "FF0000"];
  const [actionTakenData, setActionTakenData] = useState([])
  const [expanded, setExpanded] = useState(false);
  const [allForms, setAllForms] = useState({})
  const [actionData, setActionData] = useState([])


  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchHzardsData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`
    );
    const result = res.data.data.results;
    const temp = []
    result.map((value) => {
      temp.push({ "id": value.id })
    })
    handelCommonObject("commonObject", "aha", "assessmentIds", temp)
    await handelActionTracker(result)

    let getSeverity = [...result]
    for (var i = 0; i < result.length; i++) {
      if (result[i].severity !== "") {
        if (result[i].severity === "Sightly harmful") {
          getSeverity[i].riskSeverityValue = 2
        } else if (result[i].severity === "Harmful") {
          getSeverity[i].riskSeverityValue = 4

        } else if (result[i].severity === "Very harmful") {
          getSeverity[i].riskSeverityValue = 6

        } else if (result[i].severity === "Extremely harmful") {
          getSeverity[i].riskSeverityValue = 8

        } else {
          // sagar[i].riskSeverityValue = 10
        }
      }
    }
    
    let abc = [...getSeverity]
    for (var i = 0; i < getSeverity.length; i++) {
      if (getSeverity[i].probability !== "") {
        if (getSeverity[i].probability === "Highly unlikely") {
          abc[i].riskProbabilityValue = 1
        } else if (getSeverity[i].probability === "Unlikely") {
          abc[i].riskProbabilityValue = 2

        } else if (getSeverity[i].probability === "Likely") {
          abc[i].riskProbabilityValue = 3

        } else if (getSeverity[i].probability === "Very likely") {
          abc[i].riskProbabilityValue = 4

        } else {
          // abc[i].riskProbabilityValue = 5
        }
      }
    }
    

    let zzz = [...abc]
    for (var i = 0; i < abc.length; i++) {
      if (abc[i].riskRating !== "") {
        if (abc[i].riskRating === "2 Trivial" || abc[i].riskRating === "4 Trivial") {
          zzz[i].riskRatingColour = '#006400'
        } else if (abc[i].riskRating === "6 Tolerable" || abc[i].riskRating === "8 Tolerable") {
          zzz[i].riskRatingColour = '#6AA121'

        } else if (abc[i].riskRating === "12 Moderate" || abc[i].riskRating === "16 Moderate") {
          zzz[i].riskRatingColour = '#F3C539'

        }  else if (abc[i].riskRating === "18 Substantial" || abc[i].riskRating === "24 Substantial") {
          zzz[i].riskRatingColour = '#800000'
        }
        else {
          zzz[i].riskRatingColour = '#FF0000'
        }
      }
    }
    await setForm(zzz)
  };

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkAHAId")
    let apiData = JSON.parse(localStorage.getItem("commonObject"))["aha"]["assessmentIds"]
    let allAction = await handelActionData(jhaId, apiData)
    setActionData(allAction)
  };
  const handelActionShow = (id) => {
    return (
      <Grid>
        {actionData.map((val) => (
          <>
            {val.id == id ?
              <>
                {
                  val.action.length > 0 && val.action.map((valueAction) => (
                    <>
                      <ActionShow
                        action={valueAction}
                        companyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                        projectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                        updatePage={updatePage}
                      />
                    </>
                  ))
                }
              </>
              : null}
          </>
        ))}
      </Grid>
    )
  }


  const handelRiskAndControl = (changeType, index, value) => {
    const temp = [...form]

    if (changeType == "risk") {
      temp[index]["risk"] = value
    } else if (changeType == "control") {
      temp[index]["control"] = value.target.value
    } else if (changeType == "residual") {
      temp[index]["residualRisk"] = value
    } else if (changeType == "approver") {
      temp[index]["approveToImplement"] = value
    } else if (changeType == "monitor") {
      temp[index]["monitor"] = value
    }
    setForm(temp)
  }


  const [checkGroups, setCheckListGroups] = useState([]);

  const handleSubmit = async (e) => {
    await setSubmitLoader(true);

    const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`, form)

    ahaform["workStopCondition"] = additinalJobDetails.workStopCondition.toString()
    delete ahaform['ahaAssessmentAttachment']
    const res1 = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`,
      ahaform
    );
    if (res1.status === 200) {
      history.push("/app/pages/aha/assessments/DocumentsNotifications/");
    }
  };

  const [notifyToList, setNotifyToList] = useState([]);


  const handleWorkStopCondition = (value, e) => {
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


  const checkList = async () => {
    const temp = {};
    const project = JSON.parse(localStorage.getItem("projectName"))
    const projectId = project.projectName.projectId
    const res = await api.get(
      `/api/v1/core/checklists/aha-document-conditions/${projectId}/`
    );
    const checklistGroups = res.data.data.results[0].checklistValues;

    setCheckListGroups(checklistGroups);
  };

  const fetchAhaData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const result = res.data.data.results;
    await setAHAForm(result);
    setAdditionalJobDetails({
      ...additinalJobDetails,
      workStopCondition: result.workStopCondition != null ? result.workStopCondition.split(",") : [],
    });
  };

  const pickListValue = async () => {
    risk.current = await PickListData(78)
    riskResidual.current = await PickListData(76)
    monitor.current = await PickListData(77)
  }


  const handleRiskChange = (e, key, fieldname) => {

    const temp = [...form];
    const txt = e.nativeEvent.target.innerText;
    temp[key][fieldname] = e.target.value;
    const riskSeverity = ((temp[key].riskSeverityValue == undefined || temp[key].riskSeverityValue == '' || isNaN(temp[key].riskSeverityValue)) ? 1 : temp[key].riskSeverityValue);
    const riskProbability = ((temp[key].riskProbabilityValue == undefined || temp[key].riskProbabilityValue == '' || isNaN(temp[key].riskProbabilityValue)) ? 1 : temp[key].riskProbabilityValue);

    const riskRating = riskSeverity * riskProbability;

    if (fieldname == 'riskSeverityValue') {
      temp[key].severity = txt;
    } else {
      temp[key].probability = txt;
    }
    if (riskRating >= 1 && riskRating <= 4) {
      temp[key].riskRating = `${riskRating} Trivial`;
      temp[key].riskRatingColour = '#1EBD10';
    } else if (riskRating > 5 && riskRating <= 8) {
      temp[key].riskRating =  `${riskRating} Tolerable`;
      temp[key].riskRatingColour = '#008000';
    } else if (riskRating > 9 && riskRating <= 16) {
      temp[key].riskRating = `${riskRating} Moderate`;
      temp[key].riskRatingColour = '#F3C539';
    } else if (riskRating > 17 && riskRating <= 24) {
      temp[key].riskRating = `${riskRating} Substantial`;
      temp[key].riskRatingColour = '#800000';
    }else {
      temp[key].riskRating = `${riskRating} Intoreable`;
      temp[key].riskRatingColour = '#FF0000';
    }
    setForm(temp);
  };

  console.log(risk.current,"LLLLLL")


  const handelCallBack = async () => {

    await fetchHzardsData();
    await checkList();
    await fetchAhaData();
    await pickListValue()
    await setIsLoading(true)
  }

  useEffect(() => {
    handelCallBack()
  }, []);

  const classes = useStyles();
  return (
    <>
      {" "}
      <PapperBlock title="Assessments" icon="ion-md-list-box">
        {isLoading ? (
          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>
              <Grid item sm={12} xs={12} className={classes.mttopBottomThirty}>
                <div>
                  {form.map((value, index) => (
                    <Accordion
                      onChange={handleTwoChange(`panel${index}`)}
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
                        <Typography className={classes.heading}>
                          <MenuOpenOutlinedIcon className={classes.headingIcon} />{" "}
                          {value.hazard}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container spacing={2}>
                          <Grid item md={12} sm={12} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Identify risk
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Identify risk"
                                value={form[index].risk ? form[index].risk : ""}
                              >
                                {risk.current.map(
                                  (value) => (
                                    <MenuItem
                                      value={value.label}
                                      onClick={(e) => handelRiskAndControl("risk", index, value.label)}
                                    >
                                      {value.label}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item md={4} sm={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Risk Severity
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Incident Type"
                                value={value.riskSeverityValue}
                                onChange={(e) => handleRiskChange(e, index, 'riskSeverityValue')}
                              >
                                <MenuItem value={2}>Sightly harmful</MenuItem>
                                <MenuItem value={4}>Harmful</MenuItem>
                                <MenuItem value={6}>Very harmful</MenuItem>
                                <MenuItem value={8}>Extremely harmful</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={4} sm={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Risk Probability
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Incident Type"
                                value={value.riskProbabilityValue}
                                onChange={(e) => handleRiskChange(e, index, 'riskProbabilityValue')}
                              >
                                <MenuItem value={1} selected={value.riskProbability == 1}>Highly unlikely</MenuItem>
                                <MenuItem value={2} selected={value.riskProbability == 2}>Unlikely</MenuItem>
                                <MenuItem value={3} selected={value.riskProbability == 3}>Likely</MenuItem>
                                <MenuItem value={4} selected={value.riskProbability == 4}>Very likely</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={4} sm={4} xs={12} className={classes.ratioColororange} style={{ backgroundColor: value.riskRatingColour, marginTop: "16px" }}>
                            <InputLabel id="demo-simple-select-label">
                            </InputLabel>
                            {value.riskRating ? value.riskRating : ''}
                          </Grid>

                          <Grid item md={12} sm={12} xs={12}>
                            <TextField
                              variant="outlined"
                              id="immediate-actions"
                              multiline
                              rows="1"
                              label="Identify controls"
                              className={classes.fullWidth}
                              value={form[index].control ? form[index].control : ''}
                              onChange={(e) => handelRiskAndControl("control", index, e)}
                            />
                          </Grid>
                          <Grid item md={4} sm={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Evaluate Residual risk
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Eveluate residual risk"
                                value={form[index].residualRisk ? form[index].residualRisk : ''}
                              >
                                {riskResidual.current.map(
                                  (value) => (
                                    <MenuItem
                                      value={value.label}
                                      onClick={(e) => handelRiskAndControl("residual", index, value.label)}
                                    >
                                      {value.label}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={4} sm={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Proceed to work
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="proceed to work"
                                value={form[index].approveToImplement ? form[index].approveToImplement : ''}
                              >
                                {approver.map((value) => (<MenuItem value={value}
                                  onClick={(e) => handelRiskAndControl("approver", index, value)}

                                >{value}</MenuItem>))}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item md={4} sm={4} xs={12}>
                            <FormControl
                              variant="outlined"
                              requirement
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Monitor
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Monitor"
                                value={form[index].monitor ? form[index].monitor : ""}
                              >
                                {monitor.current.map(
                                  (value) => (
                                    <MenuItem
                                      value={value.label}
                                      onClick={(e) => handelRiskAndControl("monitor", index, value.label)}

                                    >
                                      {value.label}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid
                            item
                            md={12}
                            xs={12}
                            className={classes.createHazardbox}
                          >
                            If risk label is red the action must be created by supervisor to ensure control are in place.
                            <Divider light />
                          </Grid>

                          <Grid item xs={6} className={classes.createHazardbox}>
                            <ActionTracker
                              actionContext="aha:hazard"
                              enitityReferenceId={`${localStorage.getItem("fkAHAId")}:${value.id}`}
                              setUpdatePage={setUpdatePage}
                              fkCompanyId={JSON.parse(localStorage.getItem("company")).fkCompanyId}
                              fkProjectId={JSON.parse(localStorage.getItem("projectName")).projectName.projectId}
                              fkProjectStructureIds={JSON.parse(localStorage.getItem("commonObject"))["aha"]["projectStruct"]}
                              createdBy={JSON.parse(localStorage.getItem('userDetails')).id}
                              updatePage={updatePage}
                              handelShowData={handelActionTracker}
                            />
                          </Grid>
                          <Grid item xs={6} className={classes.createHazardbox}>
                            {/* {value.action.length > 0 && value.action.map((valueAction) => (
                              <ActionShow
                                action={valueAction}
                                companyId={projectData.companyId}
                                projectId={projectData.projectId}
                                updatePage={updatePage}
                              />
                            ))} */}
                            {handelActionShow(value.id)}


                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
              </Grid>

              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Discuss and document conditions when the work must be stopped</FormLabel>
                  <FormGroup>
                    {checkGroups.map((option) => (
                      <FormControlLabel
                        control={<Checkbox name={option.inputLabel} />}
                        label={option.inputLabel}
                        checked={additinalJobDetails.workStopCondition.includes(option.inputValue)}
                        onChange={async (e) => { handleWorkStopCondition(option.inputValue, e) }}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item md={12} xs={12} className={classes.formBox}>
                <TextField
                  label="Additional hazards/controls"
                  margin="dense"
                  name="additional hazards/controls"
                  id="additional hazards/controls"
                  multiline
                  rows={4}
                  value={
                    ahaform.additionalRemarks ? ahaform.additionalRemarks : ""
                  }
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                  onChange={(e) => {
                    setAHAForm({ ...ahaform, additionalRemarks: e.target.value });
                  }}
                />
              </Grid>
              <Grid item md={12} xs={12}>
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

                    Next
                  </Button>
                  {submitLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}</div>

              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Assessment"
              />
            </Grid>
          </Grid>) : (
          <>
            <Loader/>
          </>
        )
        }
      </PapperBlock>
    </>
  );
};
// const AhaAssementInit = connect((state) => ({
//   initialValues: state.getIn(["IncidentReducer"]),
// }))(Assessment);

// export default withStyles(styles)(AhaAssementInit);
export default Assessment;