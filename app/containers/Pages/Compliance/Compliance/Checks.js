import React, { useEffect, useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import DateFnsUtils from "@date-io/date-fns";
import { useDropzone } from "react-dropzone";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Link from "@material-ui/core/Link";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import classNames from "classnames";

import Styles from "dan-styles/Summary.scss";
import Fonts from "dan-styles/Fonts.scss";
import Paper from "@material-ui/core/Paper";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

import Rating from "@material-ui/lab/Rating";
import DeleteIcon from "@material-ui/icons/Delete";
import icoExcel from "dan-images/icoExcel.svg";
import icoAudio from "dan-images/icoAudio.svg";
import icoPDF from "dan-images/icoPDF.svg";
import icoPng from "dan-images/icoPng.svg";
import icoVideo from "dan-images/icoVideo.svg";
import FormSideBar from "../../../Forms/FormSideBar";
import { COMPLIANCE } from "../Constants/Constants";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../../utils/axios";
import ActionTracker from "../../../Forms/ActionTracker";
import {
  handelIncidentId,
  checkValue,
  handelCommonObject,
  handelActionData,
} from "../../../../utils/CheckerValue";
import ActionShow from "../../../Forms/ActionShow";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../../utils/constants";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";

const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    width: "100%",
  },
  coponentTitleBox: {
    "& h5": {
      paddingBottom: "20px",
      borderBottom: "1px solid #ccc",
    },
  },
  formControl: {
    "& .MuiInputBase-root": {
      borderRadius: "4px",
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
    fontWeight: "500",
    color: "#063d55",
  },
  custmSubmitBtn: {
    color: "#ffffff",
    backgroundColor: "#06425c",
    lineHeight: "30px",
    border: "none",
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
      padding: "12px",
      borderWidth: "2px",
      borderRadius: "5px",
      borderColor: "#CBCBCB",
      borderStyle: "dashed",
      backgroundColor: "#ffffff",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      marginTop: "10px",
      marginBottom: "10px",
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
  inputFieldWithLabel: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    "& button": {
      marginTop: "8px",
    },
  },

  accordingHeaderContentLeft: {
    display: "inline-block",
    width: "auto",
    padding: "0px",
  },
  accordingHeaderContentRight: {
    display: "inline-block",
    float: "right",
    "& li": {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      "& span": {
        display: "inline-block",
      },
      "& p": {
        display: "inline-block",
        fontSize: "1rem !important",
        fontWeight: "500 !important",
        color: "#063d55",
        paddingLeft: "5px",
      },
    },
  },
  accordingHeaderContentleft: {
    display: "inline-block",
    float: "left",
    "& li": {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingLeft: "0px",
      "& span": {
        display: "inline-block",
      },
      "& p": {
        display: "inline-block",
        fontSize: "1rem !important",
        fontWeight: "500 !important",
        color: "#063d55",
        paddingLeft: "5px",
      },
    },
  },
  accordingHeaderContent: {
    display: "inline-block",
    color: "#000",
    width: "auto",
    float: "left",
  },
  aLabelValue: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#063d55",
    float: "left",
    width: "100%",
  },
  updateLink: {
    float: "left",
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  actionTitleLable: {
    float: "right",
    width: "calc(100% - 100px)",
    textAlign: "right",
  },
  catSetionSeparatorBox: {
    marginTop: "15px",
    marginBottom: "30px",
  },
  // backPaperAccordian: {
  //     marginBottom: '10px',
  //     border: '1px solid #06425c',
  // },
  custmCancelBtn: {
    color: "#ffffff",
    backgroundColor: "#ff8533",
    lineHeight: "30px",
    marginLeft: "5px",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "none",
    },
  },
  custmSaveBtn: {
    color: "#ffffff",
    backgroundColor: "#06425c",
    lineHeight: "30px",
    marginLeft: "5px",
    border: "none",
    "&:hover": {
      backgroundColor: "#ff8533",
      border: "none",
    },
  },
  ratioColororange: {
    //backgroundColor: 'orange',
    padding: "16px!important",
    height: "70%",
    marginTop: "7px",
    borderRadius: "5px",
    //color: '#ffffff'
  },
  actionLinkAudit: {
    inlineSize: "max-content",
  },
}));

const styles = (theme) => ({
  rootPop: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const Checks = () => {
  const history = useHistory();
  const [form, setForm] = useState({});
  const [checkData, setCheckData] = useState([]);
  const [updatePage, setUpdatePage] = useState(false);
  const [actionData, setActionData] = useState([]);
  const [showCheckData, setShowCheckData] = useState({});

  //const [expanded, setExpanded] = React.useState('panel1');
  const [complianceData, setComplianceData] = useState({});

  const [expandedTableDetail, setExpandedTableDetail] = React.useState(
    "panel4"
  );
  const radioDecide = ["Yes", "No", "NA"];
  // const handleExpand = (panel) => (event, isExpanded) => {
  //     setExpanded(isExpanded ? panel : false);
  // };
  const handleTDChange = (panel) => (event, isExpanded) => {
    setExpandedTableDetail(isExpanded ? panel : false);
  };

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const project =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      <img src={icoExcel} alt="excel-icon" /> {file.path} -{file.size} bytes{" "}
      <DeleteIcon />
    </li>
  ));

  const Criticality = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "criticality",
      label: "Criticality",
    },
    {
      value: "criticality1",
      label: "Criticality 1",
    },
  ];
  const Status = [
    {
      value: "none",
      label: "None",
    },
    {
      value: "status",
      label: "Status",
    },
    {
      value: "status1",
      label: "Status 1",
    },
  ];

  const [selectedActionDate, setSelectedActionDate] = useState(new Date());
  const [myUserPOpen, setMyUserPOpen] = React.useState(false);
  const handleActionDateChange = (date) => {
    setSelectedActionDate(date);
  };
  const handleMyUserPClickOpen = () => {
    setMyUserPOpen(true);
  };
  const handleMyUserPClose = () => {
    setMyUserPOpen(false);
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.rootPop} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const [value, setValue] = React.useState(1);
  const [categories, setCategories] = useState([]);

  const fetchCheklistData = async () => {
    let temp = {};
    const res = await api.get(
      `/api/v1/core/checklists/companies/${fkCompanyId}/projects/${project}/compliance/`
    );
    const result = res.data.data.results;
    await fetchComplianceData(result);
  };

  const fetchComplianceData = async (data) => {
    let complianceId = localStorage.getItem("fkComplianceId");
    const res = await api
      .get(`/api/v1/audits/${complianceId}/`)
      .then((response) => {
        let result = response.data.data.results;
        setComplianceData(result)
        let groupIds = result.groupIds.split(",");
        let subGroupIds = result.subGroupIds.split(",");
        let tempGroup = [];
        let tempSubGroup = [];
        for (let i = 0; i < groupIds.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j]["checklistId"] == groupIds[i]) {
              tempGroup.push(data[j]);
            }
          }
        }
        for (let i = 0; i < subGroupIds.length; i++) {
          for (let j = 0; j < tempGroup.length; j++) {
            tempGroup[j]["checklistValues"].map((value) => {
              if (value.id == subGroupIds[i]) {
                tempSubGroup.push({
                  groupName: tempGroup[j]["checkListLabel"],
                  subGroupName: value["inputLabel"],
                });
              }
            });
          }
        }
        setForm(result);
        fetchCheklist(tempSubGroup, result.groups, result.subGroups);
      })
      .catch((error) => console.log(error));
  };

  const fetchCheklist = async (data, groups, subGroups) => {
    const userId =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    let temp = [];
    let tempCheckData = [];
    let categoriesData = {};

    for (let i = 0; i < data.length; i++) {
      let groupName = data[i].groupName;
      let subGroupName = data[i].subGroupName;
      categoriesData[groupName] = [];

      const res = await api.get(
        `/api/v1/configaudits/auditquestions/detail/?groupName=${groupName}&subGroupName=${subGroupName}&company=${fkCompanyId}&project=${project}`
      );
      console.log(res, 'res')
      const result2 = res.data.data.results;
      temp.push(result2);
    }
    let tempQuestionId = [];
    let fd = await fetchData()
    temp.map((tempvalue, i) => {
      if (tempvalue['message'] === undefined) {
        tempvalue.map((value, index) => {
          tempQuestionId.push({ id: value.id });

          tempCheckData.push({
            id: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].id : 0,
            questionId: value.id,
            question: value.question,
            criticality: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].criticality : '',
            auditStatus: "",
            performance: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].performance : '',
            groupId: null,
            groupName: value.groupName,
            subGroupId: null,
            subGroupName: value.subGroupName,
            defaultResponse: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].defaultResponse : '',
            score: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].score : '',
            findings: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].findings : '',
            attachment: fd.filter(f => f.question == value.question).length ? fd.filter(f => f.question == value.question)[0].attachment : null,
            status: "Active",
            createdBy: parseInt(userId),
            fkAuditId: localStorage.getItem("fkComplianceId"),
          });
          categoriesData[value["groupName"]].push(value);
        });
      }
    });
    for (let i = 0; i < tempCheckData.length; i++) {
      for (let j = 0; j < groups.length; j++) {
        if (groups[j]['checkListLabel'] == tempCheckData[i]['groupName']) {
          tempCheckData[i]['groupId'] = groups[j]['id']
        }
      }
    }
    for (let i = 0; i < tempCheckData.length; i++) {
      for (let j = 0; j < subGroups.length; j++) {
        if (subGroups[j]['inputLabel'] == tempCheckData[i]['subGroupName']) {
          tempCheckData[i]['subGroupId'] = subGroups[j]['id']
        }
      }
    }
    // handelCommonObject("commonObject", "audit", "assessmentIds", temp);
    handelCommonObject("commonObject", "audit", "qustionsIds", tempQuestionId);
    await setCheckData(tempCheckData);
    await setCategories(categoriesData);
    await handelActionTracker();
  };
  const handelSubmit = async () => {
    const userId =
      JSON.parse(localStorage.getItem("userDetails")) !== null
        ? JSON.parse(localStorage.getItem("userDetails")).id
        : null;
    let tempUpdatedQuestion = []
    let tempNewQuestion = []

    checkData.map((data) => {
      if (data.id) {
        tempUpdatedQuestion.push(data)
      } else {
        tempNewQuestion.push(data)
      }
    })
    if (tempNewQuestion.length > 0) {
      let dataCheck = [];
      // let data = {};
      for (var i = 0; i < tempNewQuestion.length; i++) {
        let data = {};
        data["questionId"] = tempNewQuestion[i].questionId
        data["question"] = tempNewQuestion[i].question
        data["criticality"] = tempNewQuestion[i].criticality
        data["performance"] = tempNewQuestion[i].performance
        data["groupId"] = tempNewQuestion[i].groupId
        data["groupName"] = tempNewQuestion[i].groupName
        data["subGroupId"] = tempNewQuestion[i].subGroupId
        data["subGroupName"] = tempNewQuestion[i].subGroupName
        data["defaultResponse"] = tempNewQuestion[i].defaultResponse
        data["score"] = tempNewQuestion[i].score
        data["findings"] = tempNewQuestion[i].findings
        data["score"] = tempNewQuestion[i].score
        data["auditStatus"] = tempNewQuestion[i].auditStatus

        if (typeof tempNewQuestion[i].attachment !== "string") {
          if (tempNewQuestion[i].attachment !== null) {
            data["attachment"] = tempNewQuestion[i].attachment
          }
        }
        data["status", "Active"]
        data["fkAuditId"] = tempNewQuestion[i].fkAuditId
        data["createdAt"] = new Date().toISOString()
        data["createdBy"] = tempNewQuestion[i].createdBy
        dataCheck[i] = data
      }
      console.log(dataCheck, 'dataCheck1')
      const resNew = await api.post(`/api/v1/audits/${localStorage.getItem("fkComplianceId")}/auditresponse/`, dataCheck);
    }
    if (tempUpdatedQuestion.length > 0) {

      let dataCheck = [];
      for (var i = 0; i < tempUpdatedQuestion.length; i++) {
        let data = {};
        data["id"] = tempUpdatedQuestion[i].id
        data["questionId"] = tempUpdatedQuestion[i].questionId
        data["question"] = tempUpdatedQuestion[i].question
        data["criticality"] = tempUpdatedQuestion[i].criticality
        data["performance"] = tempUpdatedQuestion[i].performance
        data["groupId"] = tempUpdatedQuestion[i].groupId
        data["groupName"] = tempUpdatedQuestion[i].groupName
        data["subGroupId"] = tempUpdatedQuestion[i].subGroupId
        data["subGroupName"] = tempUpdatedQuestion[i].subGroupName
        data["defaultResponse"] = tempUpdatedQuestion[i].defaultResponse
        data["score"] = tempUpdatedQuestion[i].score
        data["findings"] = tempUpdatedQuestion[i].findings
        data["score"] = tempUpdatedQuestion[i].score
        data["auditStatus"] = tempUpdatedQuestion[i].auditStatus
        if (typeof tempUpdatedQuestion[i].attachment !== "string") {
          if (tempUpdatedQuestion[i].attachment !== null) {
            data["attachment"] = tempUpdatedQuestion[i].attachment
          }
        }
        data["status", "Active"]
        data["fkAuditId"] = tempUpdatedQuestion[i].fkAuditId * 1
        data["createdAt"] = new Date().toISOString()
        data["createdBy"] = tempUpdatedQuestion[i].createdBy
        dataCheck[i] = data
      }
      console.log(dataCheck, 'dataCheck2')
      const resUpdate = await api.put(
        `/api/v1/audits/${localStorage.getItem(
          "fkComplianceId"
        )}/auditresponse/`,
        dataCheck
      );
    }

    history.push("/app/pages/compliance/performance-summary");
  };
  const classes = useStyles();

  const handleChangeData = (value, field, index, id) => {
    let temp = [...checkData];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]["questionId"] == id) {
        temp[i][field] = value;
      }
    }
    setCheckData(temp);
  };

  const fetchData = async () => {
    const res = await api.get(
      `/api/v1/audits/${localStorage.getItem("fkComplianceId")}/auditresponse/`
    );
    const result = res.data.data.results;
    await setShowCheckData(result)
    await setCheckData(result);
    return result
  };

  const handleFile = (value, field, index, id) => {
    console.log(id, 'value')
    let temp = [...checkData];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i]["question"] == id) {
        temp[i][field] = value;
      }
    }
    console.log(temp, 'temp')

    setCheckData(temp);
  };
  const handelActionTracker = async () => {
    let jhaId = localStorage.getItem("fkComplianceId");
    let apiData = JSON.parse(localStorage.getItem("commonObject"))["audit"][
      "qustionsIds"
    ];
    let allAction = await handelActionData(jhaId, apiData);
    setActionData(allAction);
  };

  useEffect(() => {
    // fetchCheklist();
    fetchData();
    fetchCheklistData();

  }, []);
  return (
    <CustomPapperBlock
      title={`Compliance number: ${complianceData.auditNumber ? complianceData.auditNumber : ""
        }`}
      icon="customDropdownPageIcon compliancePageIcon"
      whiteBg
    >
      <>
        <Grid container spacing={3}>
          <Grid container spacing={3} item xs={12} md={9}>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Typography variant="h6" className="sectionHeading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="28"
                  viewBox="0 0 49.737 39"
                >
                  <g id="check-30" transform="translate(-100.352 -178.176)">
                    <path
                      id="Path_6414"
                      data-name="Path 6414"
                      d="M100.352,178.176v33.94h39.493v-33.94Zm37.025,31.348H102.82v-28.88h34.557Z"
                      transform="translate(0)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6415"
                      data-name="Path 6415"
                      d="M192.512,333.824h4.32v3.456h-4.32Z"
                      transform="translate(-86.606 -146.268)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6416"
                      data-name="Path 6416"
                      d="M286.72,352.256h21.968v1.234H286.72Z"
                      transform="translate(-175.137 -163.59)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6417"
                      data-name="Path 6417"
                      d="M286.72,466.944h21.968v1.234H286.72Z"
                      transform="translate(-175.137 -271.366)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6418"
                      data-name="Path 6418"
                      d="M286.72,585.728h21.968v1.234H286.72Z"
                      transform="translate(-175.137 -382.992)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6419"
                      data-name="Path 6419"
                      d="M192.512,448.512h4.32v3.456h-4.32Z"
                      transform="translate(-86.606 -254.045)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6420"
                      data-name="Path 6420"
                      d="M192.512,567.3h4.32v3.456h-4.32Z"
                      transform="translate(-86.606 -365.671)"
                      fill="#06425c"
                    />
                    <path
                      id="Path_6421"
                      data-name="Path 6421"
                      d="M308.978,300.173l-3.826,2.962s9.75,8.269,15.3,16.044c0,0,3.456-13.452,22.092-30.361l-.864-2.1s-10.861,5.06-23.7,21.1A79.707,79.707,0,0,0,308.978,300.173Z"
                      transform="translate(-192.458 -102.003)"
                      fill="#06425c"
                    />
                  </g>
                </svg>{" "}
                Checks
              </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Paper elevation={1} className="paperSection">
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <FormLabel component="legend" className="viewLabel">
                      Compliance type
                    </FormLabel>
                    <Typography className="viewLabelValue">
                      {form.auditType}
                    </Typography>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormLabel component="legend" className="viewLabel">
                      Work area information
                    </FormLabel>
                    <Typography className="viewLabelValue">
                      {form.area ? form.area : '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {Object.entries(categories).map(([key, value]) => (
                      <>
                        <FormLabel className="checkRadioLabel" component="legend">
                          {key}
                        </FormLabel>
                        {/* <span className={classes.accordingHeaderContentleft}>
                          <ListItem className={classes.accordingHeaderContent}>
                            <ListItemText
                              className="viewLabelValueListTag"
                              primary="Total score: "
                              secondary="25"
                            />
                          </ListItem>
                          <ListItem className={classes.accordingHeaderContent}>
                            <ListItemText
                              className="viewLabelValueListTag"
                              primary="Acceptable score: "
                              secondary="<as per admin config>"
                            />
                          </ListItem>
                        </span> */}
                        {value.map((value, index) => (
                          <>
                            <Grid container item xs={12}>
                              <Grid item md={12}>
                                <div>
                                  {value.responseType === "Yes-No-NA" ? (
                                    <Accordion
                                      expanded={
                                        expandedTableDetail === `panel6 ${index}`
                                      }
                                      onChange={handleTDChange(`panel6 ${index}`)}
                                      className="backPaperAccordian"
                                    >
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="accordionHeaderSection"
                                      >
                                        <List className={classes.heading}>
                                          <ListItem
                                            className={
                                              classes.accordingHeaderContentLeft
                                            }
                                          >
                                            <ListItemText
                                              primary={value.question}
                                            />
                                          </ListItem>
                                        </List>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Grid container spacing={2}>
                                          <Grid item md={12} xs={12}>
                                            <FormControl component="fieldset">
                                              <RadioGroup
                                                row
                                                aria-label="select-typeof-compliance"
                                                name="select-typeof-compliance"
                                                defaultValue={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].defaultResponse : ""}
                                              >
                                                {radioDecide.map((option) => (
                                                  <FormControlLabel
                                                    value={option}
                                                    className="selectLabel"
                                                    control={<Radio />}
                                                    onChange={(e) =>
                                                      handleChangeData(
                                                        e.target.value,
                                                        "defaultResponse",
                                                        index,
                                                        value.id
                                                      )
                                                    }
                                                    label={option}
                                                  />
                                                ))}

                                                {/* <FormControlLabel
                                                value="workarea-compliance"
                                                className="selectLabel"
                                                control={<Radio />}
                                                label="No"
                                              />
                                              <FormControlLabel
                                                value="general-compliance"
                                                className="selectLabel"
                                                control={<Radio />}
                                                label="NA"
                                              /> */}
                                              </RadioGroup>
                                            </FormControl>
                                          </Grid>
                                          <Grid item md={12} xs={12}>
                                            <TextField
                                              label="Findings"
                                              name="findings"
                                              id="findings"
                                              onChange={(e) =>
                                                handleChangeData(
                                                  e.target.value,
                                                  "findings",
                                                  index,
                                                  value.id
                                                )
                                              }
                                              multiline
                                              rows={4}
                                              defaultValue={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].findings : ""}
                                              fullWidth
                                              variant="outlined"
                                              className="formControl"
                                            />
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel
                                              className="checkRadioLabel marginB5"
                                              component="legend"
                                            >
                                              Score
                                            </FormLabel>
                                          </Grid>
                                          {value.scoreType === "Star" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <Rating
                                                name="simple-controlled"
                                                value={value}
                                                onChange={(e, newValue) =>
                                                  handleChangeData(
                                                    newValue,
                                                    "score",
                                                    index,
                                                    value.id
                                                  )
                                                }
                                              />
                                            </Grid>}
                                          {value.scoreType === "1-10" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormControl
                                                variant="outlined"
                                                className="formControl"
                                              >
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                  Counts
                                                </InputLabel>
                                                <Select
                                                  labelId="scoreCount"
                                                  id="scoreCount"
                                                  // onChange={handleChangeOne}
                                                  label="Counts"
                                                  className="formControl"
                                                  fullWidth
                                                  onChange={(e) =>
                                                    handleChangeData(
                                                      e.target.value,
                                                      "score",
                                                      index,
                                                      value.id
                                                    )
                                                  }
                                                >
                                                  <MenuItem value={1}>1</MenuItem>
                                                  <MenuItem value={2}>2</MenuItem>
                                                  <MenuItem value={3}>3</MenuItem>
                                                  <MenuItem value={4}>4</MenuItem>
                                                  <MenuItem value={5}>5</MenuItem>
                                                  <MenuItem value={6}>6</MenuItem>
                                                  <MenuItem value={7}>7</MenuItem>
                                                  <MenuItem value={8}>8</MenuItem>
                                                  <MenuItem value={9}>9</MenuItem>
                                                  <MenuItem value={10}>10</MenuItem>
                                                </Select>
                                              </FormControl>
                                            </Grid>}
                                          {value.scoreType === "%" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <TextField
                                                label="Percentage"
                                                name="performancerating"
                                                id="performancerating"
                                                // defaultValue="20%"
                                                fullWidth
                                                variant="outlined"
                                                className="formControl"
                                                onChange={(e) =>
                                                  handleChangeData(
                                                    e.target.value,
                                                    "score",
                                                    index,
                                                    value.id
                                                  )
                                                }
                                              />
                                            </Grid>}
                                          <Grid item md={12} xs={12}>
                                            <FormLabel
                                              className="checkRadioLabel"
                                              component="legend"
                                            >
                                              Create Action{" "}
                                            </FormLabel>
                                            <Grid
                                              item
                                              xs={6}
                                              className={classes.createHazardbox}
                                            >
                                              <ActionTracker
                                                actionContext="audit:question"
                                                enitityReferenceId={`${localStorage.getItem(
                                                  "fkComplianceId"
                                                )}:${value.id}`}
                                                setUpdatePage={setUpdatePage}
                                                fkCompanyId={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "company"
                                                    )
                                                  ).fkCompanyId
                                                }
                                                fkProjectId={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "projectName"
                                                    )
                                                  ).projectName.projectId
                                                }
                                                fkProjectStructureIds={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "commonObject"
                                                    )
                                                  )["audit"]["projectStruct"]
                                                }
                                                createdBy={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "userDetails"
                                                    )
                                                  ).id
                                                }
                                                updatePage={updatePage}
                                                handelShowData={
                                                  handelActionTracker
                                                }
                                              />
                                            </Grid>
                                          </Grid>
                                          {actionData.map((val) => (
                                            <>
                                              {val.id == value.id ? (
                                                <>
                                                  {val.action.length > 0 &&
                                                    <Grid item md={12} xs={12}>
                                                      <Table
                                                        component={Paper}
                                                        className="simpleTableSection"
                                                      >
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell className="tableHeadCellFirst">
                                                              Action number
                                                            </TableCell>
                                                            <TableCell className="tableHeadCellSecond">
                                                              Action title
                                                            </TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          {actionData.map((val) => (
                                                            <>
                                                              {val.id == value.id ? (
                                                                <>
                                                                  {val.action.length > 0 &&
                                                                    val.action.map(
                                                                      (valueAction) => (
                                                                        <TableRow>
                                                                          <TableCell align="left">
                                                                            <Link
                                                                              className={
                                                                                classes.actionLinkAudit
                                                                              }
                                                                              display="block"
                                                                              href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(
                                                                                localStorage.getItem(
                                                                                  "BaseUrl"
                                                                                )
                                                                              )[
                                                                                "actionClientID"
                                                                              ]
                                                                                }&response_type=code&companyId=${JSON.parse(
                                                                                  localStorage.getItem(
                                                                                    "company"
                                                                                  )
                                                                                )
                                                                                  .fkCompanyId
                                                                                }&projectId=${JSON.parse(
                                                                                  localStorage.getItem(
                                                                                    "projectName"
                                                                                  )
                                                                                )
                                                                                  .projectName
                                                                                  .projectId
                                                                                }&targetPage=/action/details/&targetId=${valueAction.id
                                                                                }`}
                                                                              target="_blank"
                                                                            >
                                                                              {
                                                                                valueAction.number
                                                                              }
                                                                            </Link>
                                                                          </TableCell>
                                                                          <TableCell>
                                                                            {
                                                                              valueAction.title
                                                                            }
                                                                          </TableCell>
                                                                        </TableRow>
                                                                      )
                                                                    )}
                                                                </>
                                                              ) : null}
                                                            </>
                                                          ))}
                                                        </TableBody>
                                                      </Table>
                                                    </Grid>


                                                  }</>) : null}
                                            </>
                                          ))}

                                          <Grid
                                            item
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            className={classes.formBox}
                                          >
                                            <FormLabel
                                              className="checkRadioLabel"
                                              component="legend"
                                            >
                                              Attachment{" "}
                                            </FormLabel>
                                            <Typography className="viewLabelValue">
                                              <input
                                                type="file"
                                                onChange={(e) =>
                                                  handleFile(
                                                    e.target.files[0],
                                                    "attachment",
                                                    index,
                                                    value.question
                                                  )
                                                }
                                              />

                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </AccordionDetails>
                                    </Accordion>
                                  ) : (
                                    <Accordion
                                      key={index}
                                      expanded={expandedTableDetail === "panel4"}
                                      onChange={handleTDChange("panel4")}
                                      defaultExpanded
                                      className="backPaperAccordian"
                                    >
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                        className="accordionHeaderSection"
                                      >
                                        <List className={classes.heading}>
                                          <ListItem
                                            className={
                                              classes.accordingHeaderContentLeft
                                            }
                                          >
                                            <ListItemText primary="Welding machines used are tested and properly connected" />
                                          </ListItem>
                                        </List>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <Grid container spacing={2}>
                                          <Grid item md={4} xs={12}>
                                            <TextField
                                              label="Criticality*"
                                              name="criticality"
                                              id="criticality"
                                              select
                                              fullWidth
                                              variant="outlined"
                                              value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].criticality : ""}
                                              className="formControl"
                                              onChange={(e) =>
                                                handleChangeData(
                                                  e.target.value,
                                                  "criticality",
                                                  index,
                                                  value.id
                                                )
                                              }

                                            >
                                              {Criticality.map((option) => (
                                                <MenuItem
                                                  key={option.value}
                                                  value={option.value}
                                                >
                                                  {option.label}
                                                </MenuItem>
                                              ))}
                                            </TextField>
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                            <TextField
                                              label="Status*"
                                              name="status"
                                              id="status"
                                              value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].auditStatus : ""}
                                              select
                                              fullWidth
                                              variant="outlined"
                                              className="formControl"
                                              onChange={(e) =>
                                                handleChangeData(
                                                  e.target.value,
                                                  "auditStatus",
                                                  index,
                                                  value.id
                                                )
                                              }
                                            >
                                              {Status.map((option) => (
                                                <MenuItem
                                                  key={option.value}
                                                  value={option.value}
                                                >
                                                  {option.label}
                                                </MenuItem>
                                              ))}
                                            </TextField>
                                          </Grid>
                                          <Grid item md={4} xs={12}>
                                            <TextField
                                              label="Performance rating"
                                              //margin="dense"
                                              name="performancerating"
                                              id="performancerating"
                                              value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].performance : ""}

                                              fullWidth
                                              variant="outlined"
                                              className="formControl"
                                              onChange={(e) =>
                                                handleChangeData(
                                                  e.target.value,
                                                  "score",
                                                  index,
                                                  value.id
                                                )
                                              }
                                            />
                                          </Grid>

                                          <Grid item md={12} sm={12} xs={12}>
                                            <TextField
                                              label="Findings"
                                              name="findings"
                                              id="findings"
                                              multiline
                                              rows={4}
                                              defaultValue={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].findings : ""}
                                              fullWidth
                                              variant="outlined"
                                              className="formControl"
                                              onChange={(e) =>
                                                handleChangeData(
                                                  e.target.value,
                                                  "findings",
                                                  index,
                                                  value.id
                                                )
                                              }
                                            />
                                          </Grid>
                                          <Grid item md={12} sm={12} xs={12}>
                                            <FormLabel
                                              className="checkRadioLabel marginB5"
                                              component="legend"
                                            >
                                              Score
                                            </FormLabel>
                                          </Grid>
                                          {value.scoreType === "Star" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <Rating
                                                name="simple-controlled"
                                                value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].score : ""}
                                                onChange={(e, newValue) =>
                                                  handleChangeData(
                                                    newValue,
                                                    "score",
                                                    index,
                                                    value.id
                                                  )
                                                }
                                              />
                                            </Grid>}
                                          {value.scoreType === "1-10" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <FormControl
                                                variant="outlined"
                                                className="formControl"
                                              >
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                  Counts
                                                </InputLabel>
                                                <Select
                                                  labelId="scoreCount"
                                                  id="scoreCount"
                                                  value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].score : ""}
                                                  label="Counts"
                                                  className="formControl"
                                                  fullWidth
                                                  onChange={(e) =>
                                                    handleChangeData(
                                                      e.target.value,
                                                      "score",
                                                      index,
                                                      value.id
                                                    )
                                                  }
                                                >
                                                  <MenuItem value={1}>1</MenuItem>
                                                  <MenuItem value={2}>2</MenuItem>
                                                  <MenuItem value={3}>3</MenuItem>
                                                  <MenuItem value={4}>4</MenuItem>
                                                  <MenuItem value={5}>5</MenuItem>
                                                  <MenuItem value={6}>6</MenuItem>
                                                  <MenuItem value={7}>7</MenuItem>
                                                  <MenuItem value={8}>8</MenuItem>
                                                  <MenuItem value={9}>9</MenuItem>
                                                  <MenuItem value={10}>10</MenuItem>
                                                </Select>
                                              </FormControl>
                                            </Grid>}
                                          {value.scoreType === "%" &&
                                            <Grid item md={4} sm={4} xs={12}>
                                              <TextField
                                                label="Percentage"
                                                name="performancerating"
                                                id="performancerating"
                                                value={showCheckData.filter(cd => cd.question == value.question).length ? showCheckData.filter(cd => cd.question == value.question)[0].score : ""}
                                                fullWidth
                                                variant="outlined"
                                                className="formControl"
                                                onChange={(e) =>
                                                  handleChangeData(
                                                    e.target.value,
                                                    "score",
                                                    index,
                                                    value.id
                                                  )
                                                }
                                              />
                                            </Grid>}

                                          <Grid item md={12} xs={12}>
                                            <FormLabel
                                              className="checkRadioLabel"
                                              component="legend"
                                            >
                                              Create Action{" "}
                                            </FormLabel>
                                            <Grid
                                              item
                                              xs={6}
                                              className={classes.createHazardbox}
                                            >
                                              <ActionTracker
                                                actionContext="audit:question"
                                                enitityReferenceId={`${localStorage.getItem(
                                                  "fkComplianceId"
                                                )}:${value.id}`}
                                                setUpdatePage={setUpdatePage}
                                                fkCompanyId={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "company"
                                                    )
                                                  ).fkCompanyId
                                                }
                                                fkProjectId={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "projectName"
                                                    )
                                                  ).projectName.projectId
                                                }
                                                fkProjectStructureIds={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "commonObject"
                                                    )
                                                  )["audit"]["projectStruct"]
                                                }
                                                createdBy={
                                                  JSON.parse(
                                                    localStorage.getItem(
                                                      "userDetails"
                                                    )
                                                  ).id
                                                }
                                                updatePage={updatePage}
                                                handelShowData={
                                                  handelActionTracker
                                                }
                                              />
                                            </Grid>
                                          </Grid>

                                          <Grid item md={12} xs={12}>
                                            <Table
                                              component={Paper}
                                              className="simpleTableSection"
                                            >
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell className="tableHeadCellFirst">
                                                    Action number
                                                  </TableCell>
                                                  <TableCell className="tableHeadCellSecond">
                                                    Action title
                                                  </TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                {actionData.map((val) => (
                                                  <>
                                                    {console.log(
                                                      val.action.number,
                                                      value.id
                                                    )}
                                                    {val.id == value.id ? (
                                                      <>
                                                        {val.action.length > 0 &&
                                                          val.action.map(
                                                            (valueAction) => (
                                                              <TableRow>
                                                                <TableCell align="left">
                                                                  <Link
                                                                    className={
                                                                      classes.actionLinkAudit
                                                                    }
                                                                    display="block"
                                                                    href={`${SSO_URL}/api/v1/user/auth/authorize/?client_id=${JSON.parse(
                                                                      localStorage.getItem(
                                                                        "BaseUrl"
                                                                      )
                                                                    )[
                                                                      "actionClientID"
                                                                    ]
                                                                      }&response_type=code&companyId=${JSON.parse(
                                                                        localStorage.getItem(
                                                                          "company"
                                                                        )
                                                                      )
                                                                        .fkCompanyId
                                                                      }&projectId=${JSON.parse(
                                                                        localStorage.getItem(
                                                                          "projectName"
                                                                        )
                                                                      )
                                                                        .projectName
                                                                        .projectId
                                                                      }&targetPage=/action/details/&targetId=${valueAction.id
                                                                      }`}
                                                                    target="_blank"
                                                                  >
                                                                    {
                                                                      valueAction.number
                                                                    }
                                                                  </Link>
                                                                </TableCell>
                                                                <TableCell>
                                                                  {
                                                                    valueAction.title
                                                                  }
                                                                </TableCell>
                                                              </TableRow>
                                                            )
                                                          )}
                                                      </>
                                                    ) : null}
                                                  </>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </Grid>
                                          <Grid
                                            item
                                            md={12}
                                            sm={12}
                                            xs={12}
                                            className={classes.formBox}
                                          >
                                            <FormLabel
                                              className="checkRadioLabel"
                                              component="legend"
                                            >
                                              Attachment{" "}
                                            </FormLabel>
                                            <Typography className="viewLabelValue">
                                              <input
                                                type="file"
                                                onChange={(e) =>
                                                  handleFile(
                                                    e.target.files[0],
                                                    "attachment",
                                                    index,
                                                    value.id
                                                  )
                                                }
                                              />

                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </AccordionDetails>
                                    </Accordion>
                                  )}
                                </div>
                              </Grid>
                            </Grid>
                          </>
                        ))}
                      </>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
              <Button
                size="medium"
                variant="contained"
                color="primary"
                className="spacerRight buttonStyle"
                onClick={(e) => handelSubmit()}
              >
                Next
              </Button>
              {/* <Button
                size="medium"
                variant="contained"
                color="primary"
                className="spacerRight buttonStyle"
              >
                Save
              </Button> */}
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                className="buttonStyle custmCancelBtn"
                onClick={() =>
                  history.push(
                    '/app/pages/compliance/categories'
                  )
                }
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={COMPLIANCE}
              selectedItem="Checks"
            />
          </Grid>
        </Grid>

        {/* <Grid container spacing={3} className={classes.observationNewSection}>
                
                
                <Grid
                item
                md={12}
                xs={12}
                style={{marginTop: '15px'}}
                >
                    <Button variant="outlined" size="medium" className={classes.custmSubmitBtn}>Next</Button>
                    <Button variant="outlined" size="medium" className={classes.custmSaveBtn}>Save</Button>
                    <Button variant="outlined" size="medium" className={classes.custmCancelBtn}>Cancel</Button>
                </Grid>
            </Grid> */}
      </>
    </CustomPapperBlock>

  );
};

export default Checks;
