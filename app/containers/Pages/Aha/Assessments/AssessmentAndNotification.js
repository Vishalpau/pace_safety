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
import Paper from "@material-ui/core/Paper";
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
import FormSideBar from "../../../Forms/FormSideBar";
import { useParams, useHistory } from "react-router";
import ActionTracker from "../../../Forms/ActionTracker";
import { CircularProgress } from "@material-ui/core";

import PickListData from "../../../../utils/Picklist/InvestigationPicklist";
import ActionShow from "../../../Forms/ActionShow";
import {
  handelIncidentId,
  checkValue,
  handelCommonObject,
  handelActionData,
} from "../../../../utils/CheckerValue";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import ahaLogoSymbol from "dan-images/ahaLogoSymbol.png";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { handelFileName } from "../../../../utils/CheckerValue";
import axios from "axios";
import api from "../../../../utils/axios";
import Attachment from "../../../Attachment/Attachment";
import { AHA } from "../constants";
import { keySeq } from "draft-js/lib/DefaultDraftBlockRenderMap";
import Loader from "../../Loader";
import {
  HEADER_AUTH, SSO_URL
} from "../../../../utils/constants";
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

const AssessmentAndNotification = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState([]);
  const history = useHistory();
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const notification = ["Manager", "Supervisor"];
  const [colorId, setColorId] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [idPerColor, setIdPerColor] = useState({ 243: "yellow" });
  const [submitLoader, setSubmitLoader] = useState(false);
  const risk = useRef([]);
  const [ahaform, setAHAForm] = useState({});
  const riskResidual = useRef([]);
  const [updatePage, setUpdatePage] = useState(false);
  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
    createdBy: "",
    projectStructId: "",
  });

  const monitor = useRef([]);
  const [additinalJobDetails, setAdditionalJobDetails] = useState({
    workStopCondition: [],
  });

  const approver = ["Yes", "No"];
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [allForms, setAllForms] = useState({});
  const [actionData, setActionData] = useState([]);

  const handleTwoChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const fetchHzardsData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`
    );
    const result = res.data.data.results;
    const temp = [];
    result.map((value) => {
      temp.push({ id: value.id });
    });
    handelCommonObject("commonObject", "aha", "assessmentIds", temp);
    await handelActionTracker(result);

    let getSeverity = [...result];
    for (var i = 0; i < result.length; i++) {
      if (result[i].severity !== "") {
        if (result[i].severity === "Sightly harmful") {
          getSeverity[i].riskSeverityValue = 2;
        } else if (result[i].severity === "Harmful") {
          getSeverity[i].riskSeverityValue = 4;
        } else if (result[i].severity === "Very harmful") {
          getSeverity[i].riskSeverityValue = 6;
        } else if (result[i].severity === "Extremely harmful") {
          getSeverity[i].riskSeverityValue = 8;
        } else {
        }
      }
    }

    let abc = [...getSeverity];
    for (var i = 0; i < getSeverity.length; i++) {
      if (getSeverity[i].probability !== "") {
        if (getSeverity[i].probability === "Highly unlikely") {
          abc[i].riskProbabilityValue = 1;
        } else if (getSeverity[i].probability === "Unlikely") {
          abc[i].riskProbabilityValue = 2;
        } else if (getSeverity[i].probability === "Likely") {
          abc[i].riskProbabilityValue = 3;
        } else if (getSeverity[i].probability === "Very likely") {
          abc[i].riskProbabilityValue = 4;
        } else {
        }
      }
    }

    let zzz = [...abc];
    for (var i = 0; i < abc.length; i++) {
      if (abc[i].riskRating !== "") {
        if (
          abc[i].riskRating === "2 Trivial" ||
          abc[i].riskRating === "4 Trivial"
        ) {
          zzz[i].riskRatingColour = "#009933";
        } else if (
          abc[i].riskRating === "6 Tolerable" ||
          abc[i].riskRating === "8 Tolerable"
        ) {
          zzz[i].riskRatingColour = "#8da225";
        } else if (
          abc[i].riskRating === "12 Moderate" ||
          abc[i].riskRating === "16 Moderate"
        ) {
          zzz[i].riskRatingColour = "#fff82e";
        } else if (
          abc[i].riskRating === "18 Substantial" ||
          abc[i].riskRating === "24 Substantial"
        ) {
          zzz[i].riskRatingColour = "#990000";
        } else {
          zzz[i].riskRatingColour = "#ff0000";
        }
      }
    }

    await setForm(zzz);
  };

  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkAHAId");
    let apiData = JSON.parse(localStorage.getItem("commonObject"))["aha"][
      "assessmentIds"
    ];
    let allAction = await handelActionData(jhaId, apiData);
    setActionData(allAction);
  };
  const handelActionShow = (id) => {
    return (
      <Grid>
        {actionData.map((val) => (
          <>
            {val.id == id ? (
              <>
                {val.action.length > 0 &&
                  val.action.map((valueAction) => (
                    <>
                      <ActionShow
                        action={valueAction}
                        companyId={
                          JSON.parse(localStorage.getItem("company"))
                            .fkCompanyId
                        }
                        projectId={
                          JSON.parse(localStorage.getItem("projectName"))
                            .projectName.projectId
                        }
                        updatePage={updatePage}
                      />
                    </>
                  ))}
              </>
            ) : null}
          </>
        ))}
      </Grid>
    );
  };

  const handelActionLink = () => {
    const userId =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;

    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;

    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    setProjectData({
      projectId: projectId,
      companyId: fkCompanyId,
      createdBy: userId,
      projectStructId: JSON.parse(localStorage.getItem("commonObject"))["aha"][
        "projectStruct"
      ],
    });
  };

  const handelRiskAndControl = (changeType, index, value) => {
    const temp = [...form];

    if (changeType == "risk") {
      temp[index]["risk"] = value;
    } else if (changeType == "control") {
      temp[index]["control"] = value.target.value;
    } else if (changeType == "residual") {
      temp[index]["residualRisk"] = value;
    } else if (changeType == "approver") {
      temp[index]["approveToImplement"] = value;
    } else if (changeType == "monitor") {
      temp[index]["monitor"] = value;
    }
    setForm(temp);
  };

  const [checkGroups, setCheckListGroups] = useState([]);

  const handleSubmit = async (e) => {
    let userId = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;
    
    ahaform[
      "workStopCondition"
    ] = additinalJobDetails.workStopCondition.toString();
    ahaform["ahaStage"] = "Assessment";
    ahaform["ahaStatus"] = "Done";
    
    
    ahaform["updatedBy"] = userId
    let data = new FormData();
    data.append("fkCompanyId", ahaform.fkCompanyId),
    data.append("fkProjectId", ahaform.fkProjectId),
    data.append("fkProjectStructureIds", ahaform.fkProjectStructureIds),
    data.append("workArea", ahaform.workArea),
    data.append("location", ahaform.location),
    data.append("assessmentDate", ahaform.assessmentDate),
    data.append("permitToPerahaform", ahaform.permitToPerahaform),
    data.append("permitNumber", ahaform.permitNumber),
    data.append("ahaNumber", ahaform.ahaNumber);
    if (
      ahaform.ahaAssessmentAttachment !== null &&
      typeof ahaform.ahaAssessmentAttachment !== "string"
      ) {
        data.append("ahaAssessmentAttachment", ahaform.ahaAssessmentAttachment);
      }
      data.append("description", ahaform.description),
      data.append("workStopCondition", ahaform.workStopCondition),
      data.append("department", ahaform.department),
      data.append("additionalRemarks", ahaform.additionalRemarks),
      data.append("classification", ahaform.classification),
      data.append("link", ahaform.link),
      data.append("notifyTo", ahaform.notifyTo),
      data.append("permitToPerform", ahaform.permitToPerform),
      data.append("picApprovalUser", ahaform.picApprovalUser),
      data.append("signedUser", ahaform.signedUser),
      data.append("signedDateTime", ahaform.signedDateTime),
      data.append("anyLessonsLearnt", ahaform.anyLessonsLearnt),
      data.append("lessonLearntDetails", ahaform.lessonLearntDetails),
      data.append("lessonLearntUserName", ahaform.lessonLearntUserName),
      data.append("ahaStatus", ahaform.ahaStatus),
      data.append("ahaStage", ahaform.ahaStage),
      data.append("badgeNumber", ahaform.badgeNumber),
      data.append("status", ahaform.status),
      data.append("createdBy", ahaform.createdBy),
      data.append("updatedBy", ahaform.updatedBy),
      data.append("source", ahaform.source),
      data.append("vendor", ahaform.vendor);
      data.append("vendorReferenceId", ahaform.vendorReferenceId);
      
      await setSubmitLoader(true);
    const res = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`,
      form
    );

    const res1 = await api.put(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`,
      data
    );
    if (res1.status === 200) {
      history.push(
        `/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`
      );
    }
  };

  const handleCancle = () => {
    history.push(
      `/app/pages/aha/aha-summary/${localStorage.getItem("fkAHAId")}`
    );

  }

  const [notifyToList, setNotifyToList] = useState([]);

  const handleWorkStopCondition = (value, e) => {
    if (e.target.checked == false) {
      let newData = additinalJobDetails.workStopCondition.filter(
        (item) => item !== value
      );
      setAdditionalJobDetails({
        ...additinalJobDetails,
        workStopCondition: newData,
      });
    } else {
      setAdditionalJobDetails({
        ...additinalJobDetails,
        workStopCondition: [...additinalJobDetails.workStopCondition, value],
      });
    }
  };

  const handleNotification = async (e, value) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];

      temp.push(value);
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq);

      setAHAForm({ ...ahaform, notifyTo: temp.toString() });
    } else {
      let temp = [...notifyToList];

      let newData = temp.filter((item) => item !== value);

      setNotifyToList(newData);
      setForm({ ...form, notifyTo: newData.toString() });
    }
  };

  const checkList = async () => {
    const temp = {};
    const res = await api.get(
      "/api/v1/core/checklists/aha-document-conditions/1/"
    );
    const checklistGroups = res.data.data.results[0].checklistValues;

    setCheckListGroups(checklistGroups);
  };

  const handleFile = (e) => {
    let temp = { ...ahaform };
    temp.ahaAssessmentAttachment = e.target.files[0];
    setAHAForm(temp);
  };

  const fetchAhaData = async () => {
    const res = await api.get(
      `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`
    );
    const result = res.data.data.results;
    await setAHAForm(result);
    setAdditionalJobDetails({
      ...additinalJobDetails,
      workStopCondition:
        result.workStopCondition != null
          ? result.workStopCondition.split(",")
          : [],
    });
  };
  let pickListValues = JSON.parse(localStorage.getItem("pickList"))

  const pickListValue = async () => {
    risk.current = await pickListValues["78"]
    riskResidual.current = await pickListValues["76"]
    monitor.current = await pickListValues["77"]
  }

  const handleRiskChange = (e, key, fieldname) => {
    const temp = [...form];
    const txt = e.nativeEvent.target.innerText;
    temp[key][fieldname] = e.target.value;
    const riskSeverity =
      temp[key].riskSeverityValue == undefined ||
      temp[key].riskSeverityValue == "" ||
      isNaN(temp[key].riskSeverityValue)
        ? 1
        : temp[key].riskSeverityValue;
    const riskProbability =
      temp[key].riskProbabilityValue == undefined ||
      temp[key].riskProbabilityValue == "" ||
      isNaN(temp[key].riskProbabilityValue)
        ? 1
        : temp[key].riskProbabilityValue;

    const riskRating = riskSeverity * riskProbability;

    if (fieldname == "riskSeverityValue") {
      temp[key].severity = txt;
    } else {
      temp[key].probability = txt;
    }

    if (riskRating >= 1 && riskRating <= 4) {
      temp[key].riskRating = `${riskRating} Trivial`;
      temp[key].riskRatingColour = "#009933";
    } else if (riskRating > 5 && riskRating <= 8) {
      temp[key].riskRating = `${riskRating} Tolerable`;
      temp[key].riskRatingColour = "#8da225";
    } else if (riskRating > 9 && riskRating <= 16) {
      temp[key].riskRating = `${riskRating} Moderate`;
      temp[key].riskRatingColour = "#fff82e";
    } else if (riskRating > 17 && riskRating <= 24) {
      temp[key].riskRating = `${riskRating} Substantial`;
      temp[key].riskRatingColour = "#990000";
    } else {
      temp[key].riskRating = `${riskRating} Intolerable`;
      temp[key].riskRatingColour = "#ff0000";
    }
    setForm(temp);
  };
  const fetchNotificationSent = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/aha/?subentity=aha&roleType=custom`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        console.log(result,"LLLLLL");
        setNotificationSentValue(result);
      }
    } catch (error) {}
  };

  const handelCallBack = async () => {
    await fetchHzardsData();
    await checkList();
    await fetchAhaData();
    await handelActionLink();
    await pickListValue();
    await fetchNotificationSent();
    await setIsLoading(true);
  };

  useEffect(() => {
    handelCallBack();
  }, []);

  const classes = useStyles();
  return (
    <>
      {" "}
      <CustomPapperBlock title="Assessments" icon={ahaLogoSymbol} whiteBg>
        {isLoading ? (
          <>
            <Grid
              container
              spacing={3}
              className={classes.observationNewSection}
            >
              <Grid container spacing={3} item xs={12} md={9}>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40.954"
                      height="35.361"
                      viewBox="0 0 40.954 41.361"
                    >
                      <g
                        id="Group_5482"
                        data-name="Group 5482"
                        transform="translate(-1702.685 -224.131)"
                      >
                        <g
                          id="Group_5481"
                          data-name="Group 5481"
                          transform="translate(1702.684 224.131)"
                        >
                          <path
                            id="market-research-analysis"
                            d="M18.037,0a18.046,18.046,0,0,1,15.1,27.929l7.807,8.51-5.384,4.923-7.531-8.3A18.043,18.043,0,1,1,18.037,0ZM29.37,6.706a16.03,16.03,0,1,0,4.711,11.336A16.031,16.031,0,0,0,29.37,6.706Z"
                            transform="translate(0.009 0)"
                            fill="#06425c"
                          />
                        </g>
                        <g
                          id="construction-engineer"
                          transform="translate(1711.867 232.24)"
                        >
                          <path
                            id="Path_5202"
                            data-name="Path 5202"
                            d="M0,17.564H4.936V11.476a.509.509,0,0,1,.014-.119c-4.111.587-3.9,2.484-4.95,6.207ZM6.261,5.254V6.02l.262.359a.329.329,0,0,1,.065.18h0A3.966,3.966,0,0,0,7.571,9.24a3.625,3.625,0,0,0,2.034.868,3.277,3.277,0,0,0,2.042-1.081,4.348,4.348,0,0,0,.91-2.473.335.335,0,0,1,.048-.146h0l.233-.385,0-.8.687,0,0,.87a.342.342,0,0,1-.049.2l-.242.4a4.968,4.968,0,0,1-1.064,2.773,3.966,3.966,0,0,1-2.5,1.324.344.344,0,0,1-.112,0A4.3,4.3,0,0,1,7.09,9.734,4.535,4.535,0,0,1,5.908,6.705l-.251-.345a.347.347,0,0,1-.086-.229V5.255h.69ZM9.417,0a4.682,4.682,0,0,1,.959.1l-.059,2.761L11.323.4A4.7,4.7,0,0,1,14.05,3.917h.544v.645h-.48v.009H4.719V4.562H4.327V3.917h.456A4.7,4.7,0,0,1,7.649.345l.879,2.473L8.621.068A4.681,4.681,0,0,1,9.417,0ZM8.935,15.356H9.984V16.4H8.935V15.356Zm0-2.593H9.984v1.049H8.935V12.763Zm-3.03,4.8h7.111V11.476a.462.462,0,0,1,.049-.211l-3.6.022-3.6-.022a.483.483,0,0,1,.049.211v6.088Zm8.079,0H18.92c-1.049-3.723-.839-5.62-4.952-6.205a.5.5,0,0,1,.014.119v6.087Z"
                            transform="translate(0 0.001)"
                            fill="#06425c"
                          />
                        </g>
                      </g>
                    </svg>{" "}
                    Area hazard analysis
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        sm={12}
                        xs={12}
                        className={classes.mttopBottomThirty}
                      >
                        <div>
                          {form.map((value, index) => (
                            <Accordion
                              onChange={handleTwoChange(`panel${index}`)}
                              defaultExpanded
                              className="backPaperSubAccordianWithMargin"
                              key={index}
                            >
                              <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                className="accordionSubHeaderSection"
                              >
                                <Typography className={classes.heading}>
                                  <MenuOpenOutlinedIcon
                                    className={classes.headingIcon}
                                  />{" "}
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
                                        value={
                                          form[index].risk
                                            ? form[index].risk
                                            : ""
                                        }
                                      >
                                        {risk.current.map((value) => (
                                          <MenuItem
                                            value={value.label}
                                            onClick={(e) =>
                                              handelRiskAndControl(
                                                "risk",
                                                index,
                                                value.label
                                              )
                                            }
                                          >
                                            {value.label}
                                          </MenuItem>
                                        ))}
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
                                        onChange={(e) =>
                                          handleRiskChange(
                                            e,
                                            index,
                                            "riskSeverityValue"
                                          )
                                        }
                                      >
                                        <MenuItem value={2}>
                                          Sightly harmful
                                        </MenuItem>
                                        <MenuItem value={4}>Harmful</MenuItem>
                                        <MenuItem value={6}>
                                          Very harmful
                                        </MenuItem>
                                        <MenuItem value={8}>
                                          Extremely harmful
                                        </MenuItem>
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
                                        onChange={(e) =>
                                          handleRiskChange(
                                            e,
                                            index,
                                            "riskProbabilityValue"
                                          )
                                        }
                                      >
                                        <MenuItem
                                          value={1}
                                          selected={value.riskProbability == 1}
                                        >
                                          Highly unlikely
                                        </MenuItem>
                                        <MenuItem
                                          value={2}
                                          selected={value.riskProbability == 2}
                                        >
                                          Unlikely
                                        </MenuItem>
                                        <MenuItem
                                          value={3}
                                          selected={value.riskProbability == 3}
                                        >
                                          Likely
                                        </MenuItem>
                                        <MenuItem
                                          value={4}
                                          selected={value.riskProbability == 4}
                                        >
                                          Very likely
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>

                                  <Grid
                                    item
                                    md={4}
                                    sm={4}
                                    xs={12}
                                    className={classes.ratioColororange}
                                    style={{
                                      backgroundColor: value.riskRatingColour,
                                      marginTop: "16px",
                                    }}
                                  >
                                    {value.riskRating ? value.riskRating : ""}
                                  </Grid>

                                  <Grid item md={12} sm={12} xs={12}>
                                    <TextField
                                      variant="outlined"
                                      id="immediate-actions"
                                      multiline
                                      rows="1"
                                      label="Identify controls"
                                      className={classes.fullWidth}
                                      value={
                                        form[index].control
                                          ? form[index].control
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handelRiskAndControl(
                                          "control",
                                          index,
                                          e
                                        )
                                      }
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
                                        value={
                                          form[index].residualRisk
                                            ? form[index].residualRisk
                                            : ""
                                        }
                                      >
                                        {riskResidual.current.map((value) => (
                                          <MenuItem
                                            value={value.label}
                                            onClick={(e) =>
                                              handelRiskAndControl(
                                                "residual",
                                                index,
                                                value.label
                                              )
                                            }
                                          >
                                            {value.label}
                                          </MenuItem>
                                        ))}
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
                                        value={
                                          form[index].approveToImplement
                                            ? form[index].approveToImplement
                                            : ""
                                        }
                                      >
                                        {approver.map((value) => (
                                          <MenuItem
                                            value={value}
                                            onClick={(e) =>
                                              handelRiskAndControl(
                                                "approver",
                                                index,
                                                value
                                              )
                                            }
                                          >
                                            {value}
                                          </MenuItem>
                                        ))}
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
                                        value={
                                          form[index].monitor
                                            ? form[index].monitor
                                            : ""
                                        }
                                      >
                                        {monitor.current.map((value) => (
                                          <MenuItem
                                            value={value.label}
                                            onClick={(e) =>
                                              handelRiskAndControl(
                                                "monitor",
                                                index,
                                                value.label
                                              )
                                            }
                                          >
                                            {value.label}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    className={classes.createHazardbox}
                                  >
                                    If risk label is red the action must be
                                    created by supervisor to ensure control are
                                    in place.
                                    <Divider light />
                                  </Grid>

                                  <Grid
                                    item
                                    xs={6}
                                    className={classes.createHazardbox}
                                  >
                                    <ActionTracker
                                      actionContext="aha:hazard"
                                      enitityReferenceId={`${localStorage.getItem(
                                        "fkAHAId"
                                      )}:${value.id}`}
                                      setUpdatePage={setUpdatePage}
                                      fkCompanyId={
                                        JSON.parse(
                                          localStorage.getItem("company")
                                        ).fkCompanyId
                                      }
                                      fkProjectId={
                                        JSON.parse(
                                          localStorage.getItem("projectName")
                                        ).projectName.projectId
                                      }
                                      fkProjectStructureIds={
                                        JSON.parse(
                                          localStorage.getItem("commonObject")
                                        )["aha"]["projectStruct"]
                                      }
                                      createdBy={
                                        JSON.parse(
                                          localStorage.getItem("userDetails")
                                        ).id
                                      }
                                      updatePage={updatePage}
                                      handelShowData={handelActionTracker}
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={6}
                                    className={classes.createHazardbox}
                                  >
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
                          <FormLabel component="legend">
                            Discuss and document conditions when the work must
                            be stopped
                          </FormLabel>
                          <FormGroup>
                            {checkGroups.map((option) => (
                              <FormControlLabel
                                control={<Checkbox name={option.inputLabel} />}
                                label={option.inputLabel}
                                checked={additinalJobDetails.workStopCondition.includes(
                                  option.inputValue
                                )}
                                onChange={async (e) => {
                                  handleWorkStopCondition(option.inputValue, e);
                                }}
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
                            ahaform.additionalRemarks
                              ? ahaform.additionalRemarks
                              : ""
                          }
                          fullWidth
                          variant="outlined"
                          className={classes.formControl}
                          onChange={(e) => {
                            setAHAForm({
                              ...ahaform,
                              additionalRemarks: e.target.value,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg
                      id="twotone-closed_caption-24px"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        id="Path_5090"
                        data-name="Path 5090"
                        d="M0,0H24V24H0Z"
                        fill="none"
                      />
                      <path
                        id="Path_5091"
                        data-name="Path 5091"
                        d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z"
                        fill="#06425c"
                      />
                    </svg>{" "}
                    Attachment
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid item md={8} xs={12} className={classes.formBox}>
                        <Grid
                          item
                          md={12}
                          xs={12}
                          className={classes.fileUploadFileDetails}
                        >
                          {/* <DeleteIcon /> */}
                          <Typography
                            title={handelFileName(
                              ahaform.jhaAssessmentAttachment
                            )}
                          >
                            {ahaform.ahaAssessmentAttachment != "" &&
                            typeof ahaform.ahaAssessmentAttachment ==
                              "string" ? (
                              <Attachment
                                value={ahaform.ahaAssessmentAttachment}
                              />
                            ) : (
                              <p />
                            )}
                          </Typography>
                          <input type="file" onChange={(e) => handleFile(e)} />
                        </Grid>
                      </Grid>
                      <Grid item md={12} xs={12}>
                        <TextField
                          label="Link"
                          margin="dense"
                          name="link"
                          id="link"
                          value={ahaform.link !== "null" ? ahaform.link : ""}
                          fullWidth
                          variant="outlined"
                          className={classes.formControl}
                          onChange={(e) =>
                            setAHAForm({ ...ahaform, link: e.target.value })
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {notificationSentValue.length > 0 ? (
                  <>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22.84"
                          height="27.004"
                          viewBox="0 0 22.84 27.004"
                        >
                          <g
                            id="Group_5468"
                            data-name="Group 5468"
                            transform="translate(-818 -215)"
                          >
                            <path
                              id="lookup"
                              d="M4.459,9.383a.634.634,0,0,1-.6-.653.623.623,0,0,1,.6-.653H14.68a.63.63,0,0,1,.6.653.62.62,0,0,1-.6.653Zm.007,3.493a.632.632,0,0,1-.6-.653.62.62,0,0,1,.6-.648H9.578a.634.634,0,0,1,.609.657.62.62,0,0,1-.6.653ZM19.16,3.968H21.3a1.537,1.537,0,0,1,1.53,1.53v7.276c-.046.479-1.22.486-1.32,0V5.5a.213.213,0,0,0-.218-.218H19.153v7.494c-.113.435-1.093.5-1.313,0V1.53a.213.213,0,0,0-.218-.218H1.523a.21.21,0,0,0-.218.218V19.72a.21.21,0,0,0,.218.218h8.515a.678.678,0,0,1,0,1.313H4.977v2.438a.213.213,0,0,0,.218.218h4.843c.479.053.634,1.144,0,1.313H5.2a1.533,1.533,0,0,1-1.53-1.53V21.25H1.53a1.5,1.5,0,0,1-1.079-.463A1.519,1.519,0,0,1,0,19.72V1.53A1.5,1.5,0,0,1,.463.463,1.516,1.516,0,0,1,1.53,0h16.1a1.507,1.507,0,0,1,1.079.463,1.514,1.514,0,0,1,.449,1.079V3.968ZM4.459,5.88a.634.634,0,0,1-.6-.653.623.623,0,0,1,.6-.653H14.68a.632.632,0,0,1,.6.653.623.623,0,0,1-.6.653Z"
                              transform="translate(818 215)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_5192"
                              data-name="Path 5192"
                              d="M13.485,11.646V8.259a4.128,4.128,0,0,0-3.049-4.282V3.516a1.016,1.016,0,0,0-2.032,0v.461A4.116,4.116,0,0,0,5.355,8.259v3.387L4,13v.677H14.84V13Zm-3.387,0H8.742V10.291H10.1Zm0-2.71H8.742V6.226H10.1ZM9.42,15.711a1.359,1.359,0,0,0,1.355-1.355H8.065A1.355,1.355,0,0,0,9.42,15.711Z"
                              transform="translate(826 226.293)"
                              fill="#06425c"
                            />
                          </g>
                        </svg>{" "}
                        Notification
                      </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          <Grid
                            item
                            md={12}
                            xs={12}
                            className={classes.formBox}
                          >
                            <FormLabel
                              className={classes.labelName}
                              component="legend"
                            >
                              Notifications to be sent to
                            </FormLabel>
                            <FormGroup row>
                              {notificationSentValue.map((value) => (
                                <FormControlLabel
                                  className={classes.labelValue}
                                  control={
                                    <Checkbox
                                      icon={
                                        <CheckBoxOutlineBlankIcon fontSize="small" />
                                      }
                                      checkedIcon={
                                        <CheckBoxIcon fontSize="small" />
                                      }
                                      name="checkedI"
                                      checked={
                                        ahaform.notifyTo !== null
                                          ? ahaform.notifyTo.includes(value.id)
                                          : ""
                                      }
                                      onChange={(e) =>
                                        handleNotification(e, value.id)
                                      }
                                    />
                                  }
                                  label={value.roleName}
                                />
                              ))}
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </>
                ) : null}

                <Grid item md={12} xs={12}>
               
                  <div className={classes.loadingWrapper}>
                    <Button
                      size="medium" variant="contained" color="primary" className="spacerRight buttonStyle"
                      onClick={(e) => handleSubmit()}   
                      disabled={submitLoader}
                    >
                      Submit
                    </Button>
                    {submitLoader && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                  <Button size="medium" variant="contained" color="secondary" className="buttonStyle custmCancelBtn"
                  onClick={() => handleCancle()}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>

              <Grid item xs={12} md={3}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={AHA}
                  selectedItem="Area hazard analysis"
                />
              </Grid>
            </Grid>
          </>
        ) : (
          <Loader />
        )}
      </CustomPapperBlock>
    </>
  );
};

export default AssessmentAndNotification;