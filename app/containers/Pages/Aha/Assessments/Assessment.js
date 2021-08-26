import React, { useEffect, useState, Component } from "react";
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
import ActionTracker from "./ActionTracker";


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
  const [colorId,setColorId] = useState({})
  const [idPerColor , setIdPerColor] = useState({243 : "yellow"});
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
  const riskColor = ["1EBD10", "FFEB13", "F3C539", "FF0000"];

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
    const result = res.data.data.results.results;
    await setForm(result);
    console.log(result[0].id);

    result.map((value) => {
      temp[value.id] = {"severity":"","probability": ""}
    })
    console.log(temp)
    await setColorId(temp)
  };

  console.log(colorId)

  const handleSeverity = async (key) => {
    console.log(key);
  
    await handleRisk()

  };
  const handleProbability = async (key) => {
    console.log(key);
    await setProbabilityValue(key);
    await handleRisk()
  };

  const handleRisk = () => {
    console.log("sagar");
    // temp = [...form]

    console.log(severityValue );
    console.log(probabilityValue);
    // if(severityValue * probabilityValue > 4){
    //   temp[0]['riskRating'] = "Low"
    // }
    // setForm(temp)
  };

  const handleSeverityValue = async (e, index) => {
    console.log(severityValue);
    console.log(probabilityValue);
    let temp = [...form];
    // await setColorId(...colorId,{...temp[index].id , {severity}})

    temp[index].severity = e.target.value;
    await setForm(temp)

  };

  const colorid = (id) => {
    console.log(id)
    let idcolor = idPerColor[id]
    if(idcolor !== undefined){
      return idcolor
    }else{
      return "white"
    }
  }

  console.log(idPerColor)
  const handleProbabilityValue = async (e, index) => {
    console.log(5 * 5);
    console.log(probabilityValue);
    let temp = [...form];
    temp[index].probability = e.target.value;
    await setForm(temp);
  };

  const [checkGroups, setCheckListGroups] = useState([]);

  const handleSubmit = async (e) => {
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`,
      ahaform
    );
    if (res.status === 200) {
      history.push("/app/pages/aha/assessments/DocumentsNotifications/");
    }
  };

  
  // console.log(form)
  
  console.log("severityValue", severityValue);
  console.log("probabilityValue", probabilityValue);

  const checkList = async () => {
    const temp = {};
    const res = await api.get(
      "/api/v1/core/checklists/aha-document-conditions/1/"
    );
    const checklistGroups = res.data.data.results[0];
    temp[checklistGroups.checkListLabel] = checklistGroups.checklistValues;
    setCheckListGroups(temp);
  };

  const [ahaform, setAHAForm] = useState({});
  const fetchAhaData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const result = res.data.data.results;
    await setAHAForm(result);
  };

  useEffect(() => {
    fetchHzardsData();
    checkList();
    fetchAhaData();
  }, []);

  const classes = useStyles();
  return (
    <>
      {" "}
      <PapperBlock title="Assessments" icon="ion-md-list-box">
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
                          <TextField
                            variant="outlined"
                            id="immediate-actions"
                            multiline
                            rows="1"
                            label="Identify risk"
                            className={classes.fullWidth}
                          />
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
                              onChange={(e) => {handleSeverityValue(e, index)}}
                            >
                              {Object.entries(severity).map(
                                ([key, value], index) => (
                                  <MenuItem
                                    value={value}
                                    onClick={async (e) => await handleSeverity(key)}
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
                              onChange={(e) => {
                                handleProbabilityValue(e, index);
                              }}
                            >
                              {Object.entries(probability).map(
                                ([key, value], index) => (
                                  <MenuItem
                                    value={value}
                                    //  onChange={async(e) => {await setProbabilityValue(key) ;await handleRisk()} }>

                                    onClick={(e) => handleProbability(key)}
                                  >
                                    {value}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item md={4} sm={4} xs={12}>
                          <div style={{backgroundColor:colorid(index) }}>
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
                            >
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
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
                            >
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
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
                            >
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
                              <MenuItem>One</MenuItem>
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

                        <Grid item xs={12} className={classes.createHazardbox}>
                        <Typography className={classes.increaseRowBox}>
          <ActionTracker
                                actionContext="Obsevations"
                                enitityReferenceId={value.id}
                              >add</ActionTracker>
          </Typography>
                          {/* <Typography className={classes.increaseRowBox}>
                            <ControlPointIcon />
                            <span className={classes.addLink}>
                              <Link to="">New action</Link>
                            </span>
                          </Typography> */}
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </Grid>

            {Object.entries(checkGroups).map(([key, value]) => (
              <Grid item md={12} xs={12} className={classes.formBox}>
                <FormLabel className={classes.labelName} component="legend">
                  {key}
                </FormLabel>
                <FormGroup className={classes.customCheckBoxList}>
                  {value.map((option) => (
                    <>
                      <FormControlLabel
                        className={classes.labelValue}
                        control={
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            name="checkedI"
                            value={option.inputLabel}
                          />
                        }
                        label={option.inputLabel}
                      />
                    </>
                  ))}
                </FormGroup>
              </Grid>
            ))}

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
              <Button
                variant="contained"
                size="medium"
                className={classes.button}
                onClick={() => handleSubmit()}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={AHA}
              selectedItem="Assessment"
            />
          </Grid>
        </Grid>
      </PapperBlock>
    </>
  );
};

export default Assessment;
