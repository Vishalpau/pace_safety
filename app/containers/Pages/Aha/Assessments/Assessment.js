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
import ActionTracker from "../ActionTracker";
import { CircularProgress } from '@material-ui/core';
import apiAction from '../../../../utils/axiosActionTracker';

import PickListData from "../../../../utils/Picklist/InvestigationPicklist";


import axios from "axios";
import api from "../../../../utils/axios";

import { AHA } from "../constants";

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
}));

const Assessment = () => {
  const [form, setForm] = useState([]);
  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [severityValue, setSeverityValue] = useState("");
  const [probabilityValue, setProbabilityValue] = useState("");
  const [colorId, setColorId] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [idPerColor, setIdPerColor] = useState({ 243: "yellow" });
  const [submitLoader, setSubmitLoader] = useState(false);
  const risk = useRef([])
  const [ahaform, setAHAForm] = useState({});
  const riskResidual = useRef([])
  const [updatePage, setUpdatePage] = useState(false)

  const monitor = useRef([])
  const [additinalJobDetails, setAdditionalJobDetails] = useState({
    workStopCondition: [],
  })
  const severity = {
    1: "Negligible",
    2: "Minor",
    3: "Moderate",
    4: "Major/ Critical",
    5: "Catastrophic",
  };

  const probability = {
    1: "Improbable",
    2: "Remote",
    3: "Occasional",
    4: "Probable",
    5: "Frequent",
  };
  const approver = ['Yes', 'No']
  const riskColor = ["1EBD10", "FFEB13", "F3C539", "FF0000"];
  const [actionTakenData, setActionTakenData] = useState([])

  // console.log(Object.keys(obj[2])[0])
  const [expanded, setExpanded] = useState(false);

  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const fetchHzardsData = async () => {
    let temp = {}
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`
    );
    const result = res.data.data.results;
    await setForm(result);
    await handelActionTracker(result)

    result.map((value) => {
      temp[value.id] = { "severity": "", "probability": "" }
    })
    await setColorId(temp)
  };

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;




  const handelRiskAndControl = (changeType, index, value) => {
    const temp = [...form]
    // temp[index]["severity"] = value

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

  const handleSeverity = (e, index) => {
    const temp = [...form]

    temp[index]["severity"] = e.target.value
    setForm(temp)

  }
  const handleProbability = (e, index) => {
    const temp = [...form]

    temp[index]["probability"] = e.target.value
    setForm(temp)

  }


  const handleControlChange = async (e, index) => {
    let temp = [...form];
    // await setColorId(...colorId,{...temp[index].id , {severity}})

    temp[index].control = e.target.value;
    await setForm(temp)

  };
  const control = async (e, index) => {
    let temp = [...form];
    // await setColorId(...colorId,{...temp[index].id , {severity}})

    temp[index].control = e.target.value;
    await setForm(temp)

  };

  const colorid = (id) => {
    let idcolor = idPerColor[id]
    if (idcolor !== undefined) {
      return red
    } else {
      return "white"
    }
  }

  const handleProbabilityValue = async (e, index) => {
    let temp = [...form];
    temp[index].probability = e.target.value;
    await setForm(temp);
  };

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


  const handelActionTracker = async (apiData) => {
    let jhaId = localStorage.getItem("fkAHAId")

    for (let key in apiData) {
      const allActionTrackerData = await apiAction.get(
        `api/v1/actions/?enitityReferenceId=${jhaId}%3A${apiData[key]["id"]
        }`
      );
      if (allActionTrackerData.data.data.results.results.length > 0) {
        let actionTracker = allActionTrackerData.data.data.results.results;
        const temp = [];
        actionTracker.map((value) => {
          const tempAction = {}
          let actionTrackerId = value.actionNumber;
          let actionTrackerTitle = value.actionTitle
          let actionId = value.id
          tempAction["trackerID"] = actionTrackerId
          tempAction["tarckerTitle"] = actionTrackerTitle
          tempAction["actionId"] = actionId
          temp.push(tempAction);
        });
        apiData[key]["action"] = temp;
      } else {
        apiData[key]["action"] = [];
      }
    }
    setActionTakenData(apiData)
    setIsLoading(true)

  };


  const handleRiskValue = async (e, index) => {
    let tempData = [...form]
    tempData[index]['risk'] = e.target.value;
    await setForm(tempData);
  }
  // console.log(form)


  const checkList = async () => {
    const temp = {};
    const res = await api.get(
      "/api/v1/core/checklists/aha-document-conditions/1/"
    );
    // const checklistGroups = res.data.data.results[0];
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
  useEffect(() => {
    fetchHzardsData();
    checkList();
    fetchAhaData();
    pickListValue()
    // fetchactionTrackerData()
  }, [updatePage]);

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
                      expanded={expanded === `panel${index}`}
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
                              // onChange={(e) => {handleRiskValue(e, index)}}
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
                                value={form[index].severity ? form[index].severity : ''}

                                onChange={(e) => { handleSeverity(e, index) }}

                              >
                                {Object.entries(severity).map(
                                  ([key, value], index) => (
                                    <MenuItem
                                      // onClick={(e) => handleSeverity( index, value)}
                                      value={value}

                                    >
                                      {value}
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
                                Risk Probability
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Incident Type"
                                value={form[index].probability ? form[index].probability : ''}

                                onChange={(e) => {
                                  handleProbability(e, index);
                                }}
                              >
                                {Object.entries(probability).map(
                                  ([key, value], index) => (
                                    <MenuItem
                                      value={value}
                                    //  onChange={async(e) => {await setProbabilityValue(key) ;await handleRisk()} }>

                                    // onClick={(e) => handelRiskAndControl("probability", index, value)}
                                    >
                                      {value}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item md={4} sm={4} xs={12}>
                            <div style={{ backgroundColor: colorid(index) }}>
                              50% Risk
                            </div>
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
                                Approve to implement
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label="Eveluate residual risk"
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
                                label="Eveluate residual risk"
                                value={form[index].monitor ? form[index].monitor : ""}
                              >
                                {monitor.current.map(
                                  (value) => (
                                    <MenuItem
                                      value={value.label}
                                      // onClick={async (e) => await handleSeverity(key)}
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
                            <Divider light />
                          </Grid>

                          <Grid item xs={6} className={classes.createHazardbox}>
                            <Typography className={classes.increaseRowBox}>
                              <ActionTracker
                                actionContext="aha:hazard"
                                enitityReferenceId={`${localStorage.getItem("fkAHAId")}:${value.id}`}
                                setUpdatePage={setUpdatePage}
                                updatePage={updatePage}
                              />
                            </Typography>
                            {/* <Typography className={classes.increaseRowBox}>
                            <ControlPointIcon />
                            <span className={classes.addLink}>
                              <Link to="">New action</Link>
                            </span>
                          </Typography> */}
                          </Grid>
                          <Grid item xs={6} className={classes.createHazardbox}>
                            {actionTakenData[index]["action"].length > 0
                              &&
                              actionTakenData[index]["action"].map((value) => (
                                <Link display="block"
                                  href={`https://dev-accounts-api.paceos.io/api/v1/user/auth/authorize/?client_id=OM6yGoy2rZX5q6dEvVSUczRHloWnJ5MeusAQmPfq&response_type=code&companyId=${fkCompanyId}&projectId=${projectId}&targetPage=/app/pages/Action-Summary/&targetId=${value.actionId}`}
                                >
                                  {value.trackerID}
                                </Link>
                              ))}
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
                {/* <Box borderTop={1} marginTop={2} borderColor="grey.300" /> */}
              </Grid>

              <Grid item md={12} xs={12} className={classes.formBox}>
                <TextField
                  label="Additional Remarks"
                  margin="dense"
                  name="additionalremarks"
                  id="additionalremarks"
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
                {/* <Button
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={() => handleSubmit()}
              >
                Next
              </Button> */}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Assessment"
              />
            </Grid>
          </Grid>) : (<h1>Loading...</h1>)}
      </PapperBlock>
    </>
  );
};

export default Assessment;
