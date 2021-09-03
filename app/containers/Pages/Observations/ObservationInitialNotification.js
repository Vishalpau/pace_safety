import React, { useEffect, useState, Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from "@material-ui/core/FormGroup";
import { FormHelperText } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { useDropzone } from "react-dropzone";
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import InitialNotificationValidator from "../../Validator/Observation/InitialNotificationValidation";
import FormObservationbanner from "dan-images/addFormObservationbanner.jpg";
import Avatar from "@material-ui/core/Avatar";

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import axios from "axios";
import Attachment from "../../Attachment/Attachment";
// import PickListData from "../../../utils/Picklist/InitialPicklist";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import { CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { Comments } from "../../pageListAsync";


import Type from "../../../styles/components/Fonts.scss";
import { connect } from 'react-redux'
import Axios from 'axios'

import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

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
    fontWeight: "600",
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
  customCheckBoxList: {
    display: "block",
    "& .MuiFormControlLabel-root": {
      width: "30%",
      [theme.breakpoints.down("xs")]: {
        width: "48%",
      },
    },
  },
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
  observationFormBox: {
    width: "100%",
    height: "100%",
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: 'relative',
    display: 'inline-flex',
  },
  buttonProgress: {
    // color: "green",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const filter = createFilterOptions();
const ObservationInitialNotification = (props) => {
  // class ObservationInitialNotification extends Component {
  // All states are define here. 
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [addressSituation, setAddressSituation] = useState(false);
  const [tagData, setTagData] = useState([]);
  const [fileShow, setFileShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [superVisorName , setSuperVisorName] = useState([]);
  const [superVisorBadgeNo , setSuperVisorBadgeNo] = useState([]); 
  const [reportedByName , setReportedByName] = useState([]);
  const [reportedById , setReportedById] = useState([]);
  const [reportedByBadgeId , setReportedByIdBadgeId] = useState([]); 
  const [attachment,setAttachment] = useState()
  const [departmentName , setDepartmentName] = useState([])
  const [shiftType, setShiftType] = useState([]);
  const [superVisorId , setSuperVisorId] = useState('')
  const [notificationSentValue , setNotificationSentValue] = useState([])
  const [notifyToList, setNotifyToList] = useState([]);
  const [submitLoader , setSubmitLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();

  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [breakdownData, setBreakDownData] = useState([])
  const [selectValue, setSelectValue] = useState([])
  const [value, setValue] = React.useState(null);

  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])
  const [selectDepthAndId, setSelectDepthAndId] = useState([])
  let filterSuperVisorId = []
  let filterSuperVisorBadgeNo = []
  const radioType = ["Risk", "Comments", "Positive behavior"];
  const radioSituation = ["Yes", "No"];
  const radioClassification = ["People", "Property"];
  const reportedBy = ["Mayank Singh", "Prakash Joshi", "Saddam", "Ajay"];
  // form state for post api
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
      ? JSON.parse(localStorage.getItem('userDetails')).id
      : null;
  const project =
  JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;
  const selectBreakdown =
  JSON.parse(localStorage.getItem("selectBreakDown")) !== null
    ? JSON.parse(localStorage.getItem("selectBreakDown"))
    : null;
    var struct = "";
  for (var i in selectBreakdown) {
    struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
  }
  const fkProjectStructureIds = struct.slice(0, -1);

  let filterReportedByName = []
  let filterReportedById = []
  let filterReportedByBedgeID = []
  let filterSuperVisorName = []
  let filterDepartmentName = []

  const fetchSuperVisorName = () => {
    let fkCompanyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/roles/4/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].roles[0].users;
          let user = []
          user = result
          
            for (var i in result) {
              filterSuperVisorName.push(result[i]);
              // filterSuperVisorBadgeNo.push(result[i].badgeNo);
            }
            let id = result[0].id;
            setForm({...form,supervisorId:id})
            setSuperVisorBadgeNo(filterSuperVisorBadgeNo)
          setSuperVisorName(filterSuperVisorName);
        }
      })
      .catch((error) => {});
  };
  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].users;
          let user = [];
          user = result;
          for (var i in result) {
            filterReportedByName.push(result[i]);
            // filterReportedById.push(result[i].id);
            // filterReportedByBedgeID.push(result[i].badgeNo);
          }
          setReportedByName(filterReportedByName);
          setReportedById(filterReportedById);
          setReportedByIdBadgeId(filterReportedByBedgeID)
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };

  const fetchDepartment = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/departments/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results;
          let user = [];
          user = result;
          for (var i in result) {
            filterDepartmentName.push(result[i].departmentName);
            // filterReportedById.push(result[i].id);
          }
          // setReportedByName(filterReportedByName);
          // setDepartmentName([...filterDepartmentName , {name : "other"}]);
          setDepartmentName([...filterDepartmentName , "Others"])
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };
  console.log(departmentName)
  const [form, setForm] = useState({
    fkCompanyId: parseInt(fkCompanyId),
    fkProjectId: parseInt(project.projectId),
    fkProjectStructureIds: fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
    observationType: "",
    observationClassification: "",
    stopWork: "",
    nearMiss: "",
    acceptAndPledge: "",
    personRecognition: "",
    observationTitle: "",
    observationDetails: "",
    isSituationAddressed: "Yes",
    isNotifiedToSupervisor: "",
    actionTaken: "",
    location: "",
    observedAt: null,
    assigneeName: "",
    assigneeId: 0,
    shift: "",
    departmentName: "",
    departmentId: 0,
    reportedById: 0,
    reportedByName: "",
    reportedByDepartment: "",
    reportedDate: new Date().toISOString(),    
    reportedByBadgeId: "",
    closedById: 0,
    closedByName: "",
    closedByDepartment: "",
    closedDate: "",
    closedoutAttachment: "",
    supervisorByBadgeId: "",
    supervisorName: "",
    supervisorDepartment: "",
    supervisorId : "",
    notifyTo : "",
    attachment: "",
    status: "Active",
    createdBy: parseInt(userId),
    updatedBy: userId,
    source: "Web",
    vendor: "string",
    vendorReferenceId: "string",
  });
  console.log(form.fkProjectStructureIds)

  // it is used for catagory for tag post api
  const [catagory, setCatagory] = useState([
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
    {
      fkObservationId: "",
      fkTagId: "",
      observationTag: "",
      status: "Active",
      createdBy: 0,
      updatedBy: 0,
    },
  ]);
  // when click on submit button handleSubmit is called
  const handleSubmit = async () => {

    // if any error then this part is executed
    const { error, isValid } = InitialNotificationValidator(form);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    await handleButtonClick()
     // we are convert form into FormData
    let data = new FormData();
      data.append("fkCompanyId", form.fkCompanyId),
      data.append("fkProjectId", form.fkProjectId),
      data.append("fkProjectStructureIds", form.fkProjectStructureIds),
      data.append("observationType", form.observationType),
      data.append("observationClassification", form.observationClassification),
      data.append("stopWork", form.stopWork),
      data.append("nearMiss", form.nearMiss),
      data.append("acceptAndPledge", form.acceptAndPledge),
      data.append("personRecognition", form.personRecognition),
      data.append("observationTitle", form.observationTitle),
      data.append("observationDetails", form.observationDetails),
      data.append("isSituationAddressed", form.isSituationAddressed),
      data.append("actionTaken", form.actionTaken),
      data.append("location", form.location),
      data.append("observedAt", form.observedAt),
      data.append("isNotifiedToSupervisor", form.isNotifiedToSupervisor),
      data.append("assigneeName", form.assigneeName),
      data.append("assigneeId", form.assigneeId),
      data.append("shift", form.shift),
      data.append("departmentName", form.departmentName),
      data.append("departmentId", form.departmentId),
      data.append("reportedById", form.reportedById),
      data.append("reportedByName", form.reportedByName),
      data.append("reportedByDepartment", form.reportedByDepartment);
    if (form.reportedDate !== null && typeof form.reportedDate !== "string") {
      data.append("reportedDate", null);
    }
    data.append("reportedByBadgeId", form.reportedByBadgeId),
      data.append("closedById", form.closedById),
      data.append("closedByName", form.closedByName),
      data.append("closedByDepartment", form.closedByDepartment);

    if (form.closedDate !== null && typeof form.closedDate !== "string") {
      data.append("closedDate", null);
    }
    if (
      form.closedoutAttachment !== null &&
      typeof form.closedoutAttachment !== "string"
    ) {
      data.append("closedoutAttachment", form.closedoutAttachment);
    }
    data.append("supervisorByBadgeId", form.supervisorByBadgeId),
      data.append("supervisorName", form.supervisorName),
      data.append("supervisorId", form.supervisorId),
      data.append("notifyTo", form.notifyTo),
      data.append("supervisorDepartment", form.supervisorDepartment);
    if (form.attachment !== null && typeof form.attachment !== "string") {
      data.append("attachment", form.attachment);
    }
    data.append("status", form.status),
      data.append("createdBy", form.createdBy),
      data.append("updatedBy", form.updatedBy),
      data.append("source", form.source),
      data.append("vendor", form.vendor),
      data.append("vendorReferenceId", form.vendorReferenceId);

      const res = await api.post("/api/v1/observations/", data);
      if (res.status === 201) {
        const id = res.data.data.results;
        const fkObservatioId = id.id;
        await localStorage.setItem("fkobservationId", fkObservatioId);
      } 

    for (let i = 0; i < catagory.length; i++) {
      catagory[i]["fkObservationId"] = localStorage.getItem("fkobservationId");
      catagory[i]["fkTagId"] = tagData[i].id;
      const resCategory = await api.post(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/observationtags/`,catagory[i]);

    }

    history.push(`/app/observation/details/${localStorage.getItem("fkobservationId")}`);
  };

  // this function called when user clicked and unclick checkBox and set thier value acording to click or unclick check
  const handleChange = async (e, index, value) => {
    if (e.target.checked == true) {
      let TempPpeData = [...catagory];
      TempPpeData[index].observationTag = value;
      await setCatagory(TempPpeData);
    } else {
      let TempPpeData = [...catagory];
      TempPpeData[index].observationTag = "";
      await setCatagory(TempPpeData);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleButtonClick = () => {
    if (!loading) {
      setLoading(true);
      
    }
  };
  
  // this function when user upload the file
  const handleFile = async (e) => {
    let TempPpeData = { ...form };
    // if user file size is grater than 5 MB then that goes to else part
    if ((TempPpeData.attachment = e.target.files[0].size <= 1024 * 1024 * 25)) {
      TempPpeData.attachment = e.target.files[0];
      await setForm(TempPpeData);
    } else {
      document.getElementById("attachment").value = ""
      await setOpen(true);
    }
  };
  
  const handleAssignee = async (e,value) => {
    let tempData = { ...form };
    tempData.assigneeName = value.name;
    
      tempData.assigneeId = value.id;

    setForm(tempData);
  }
  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} 
    </li>
  ));
  
  const handelAddressSituationYes = async (e) => {
    let tempData = { ...form}
    tempData.isSituationAddressed = e.target.value
    if (tempData.isSituationAddressed === "Yes") {
      await setAddressSituation(true);
    } else if(e.target.value === "No") {
      tempData.actionTaken = ""
      
      await setAddressSituation(false);
      await setForm(tempData);
    }
  };
  const handleOther = (e) => {
    let tempData = [...catagory];
    tempData[8].observationTag = e.target.value;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handlePledge = (e) => {
    if (e.target.checked === true) {
      setForm({ ...form, acceptAndPledge: "Yes" });
    } else {
      setForm({ ...form, acceptAndPledge: "No" });
    }
  };

  const handleReportedBy = (e, value) => {
    let tempData = { ...form };
    tempData.reportedByName = value.name;
   
        tempData.reportedByBadgeId = value.badgeNo;
      
    setForm(tempData);
  };
  const handleFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  const handleSuperVisior = (e,value) => {
    let tempData = { ...form };
      tempData.supervisorName = value.name
        tempData.supervisorByBadgeId = value.badgeNo
     
       setForm(tempData)
  
  }

  const handleNotify = async (value, index ,e) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];
     
      temp.push(value)
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq)
     
      setForm({...form , notifyTo : temp.toString()});
    } else {
      let temp = [...notifyToList];
      
        let newData = temp.filter((item) => item !== value);
      
      setNotifyToList(newData);
      setForm({...form , notifyTo : newData.toString()});

    }
    
  };

  const fetchInitialiObservationData = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results;
    if (result.isSituationAddressed === "Yes") {
      await setAddressSituation(true);
    }
    if (result.personRecognition) {
      await setPositiveObservation(false);
    } else {
      await setRiskObservation(false);
    }
    await setForm(result);
    await fetchBreakDownData(result.fkProjectStructureIds);
  };

  const fetchNotificationSent = async () => {
    try {
      let companyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
      let projectId = JSON.parse(localStorage.getItem('projectName')).projectName.projectId
      var config = {
        method: 'get',
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/observations/`,
        headers: HEADER_AUTH
      };
      const res = await api(config)
      if (res.status === 200) {
        const result = res.data.data.results
        setNotificationSentValue(result)
      }
    } catch (error) {
    }
  }

  const fetchTags = async () => {
    const res = await api.get(`/api/v1/tags/`);
    const result = res.data.data.results.results;
    let sorting = result.sort((a, b) => a.id - b.id);
    await setTagData(sorting);
  };

  const fetchCheckBoxData = async () => {
    const response = await api.get(
      `/api/v1/observations/${id}/observationtags/`
    );
    const tags = response.data.data.results.results;
    await setCatagory(tags);
    await setIsLoading(true);
  };

  const fetchAttachment = async () => {
    const attachment = await api.get(
      `/api/v1/corepatterns/?fkCompanyId=1&fkProjectId=0&key=observation_pledge`
    );
    const result = attachment.data.data.results[0];
    let ar = result.attachment;
    // let onlyImage_url = ar.replace("https://", "");
    // let image_url = "http://cors.digiqt.com/" + onlyImage_url;
    // let imageArray = image_url.split("/");
    // let image_name = imageArray[imageArray.length - 1];
    // saveAs(image_url, image_name);
    await setAttachment(ar)
  };

  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));

    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    for (var key in breakDown) {
      if (breakDown[key].slice(0, 2) === '1L') {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {
            const result = response.data.data.results;

            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {
                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                ];
                setFetchSelectBreakDownList(selectBreakDown)
              }
            });
          })
          .catch((error) => {

            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key - 1].slice(-1)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {

            const result = response.data.data.results;
            console.log({ fetchSelectBreakDownList: result })
            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {

                selectBreakDown = [
                  ...selectBreakDown,
                  { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                ];
                setFetchSelectBreakDownList(selectBreakDown)
              }
            });


          })
          .catch((error) => {
            console.log(error)
            setIsNext(true);
          });
      }
    }
  };

  const handleBreakdown = async (e, index, label) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    const value = e.target.value;
    let temp = [...breakdown1ListData]
    setSelectBreakDown(temp)
    setBreakdown1ListData(temp)
    if (selectDepthAndId.filter(filterItem => filterItem.slice(0, 2) === `${index}L`).length > 0) {
      let breakDownValue = JSON.parse(localStorage.getItem('selectBreakDown')) !== null ? JSON.parse(localStorage.getItem('selectBreakDown')) : []
      if (breakDownValue.length > 0) {
        const removeBreakDownList = temp.slice(0, index - 1)
        temp = removeBreakDownList
      } else {
        const removeBreakDownList = temp.slice(0, index)
        temp = removeBreakDownList
      }
    }
    if (projectData.projectName.breakdown.length !== index) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index) {
          var config = {
            method: "get",
            url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
              }${value}`,
            headers: HEADER_AUTH,
          };
          await Axios(config)
            .then(function (response) {
              if (response.status === 200) {

                if (
                  temp.filter(
                    (item) =>
                      item.breakdownLabel ===
                      projectData.projectName.breakdown[key].structure[0].name
                  ).length > 0
                ) {
                  return;
                } else {
                  setBreakdown1ListData([
                    ...temp,
                    {
                      breakdownLabel:
                        projectData.projectName.breakdown[index].structure[0]
                          .name,
                      breakdownValue: response.data.data.results,
                      selectValue: value,
                      index: index
                    },
                  ]);
                }
              }
            })
            .catch(function (error) {

            });
        }
      }
    } else {
    }
  };

  const fetchCallBack = async (select, projectData) => {
    for (var i in select) {
      let selectId = select[i].id;
      let selectDepth = select[i].depth
      setSelectDepthAndId([...selectDepthAndId, `${selectDepth}${selectId}`])

    }
    if (select !== null ? select.length > 0 : false) {
      if (projectData.projectName.breakdown.length === select.length) {
        setBreakdown1ListData([])
      } else {
        for (var key in projectData.projectName.breakdown) {
          if (key == select.length) {
            try {
              var config = {
                method: "get",
                url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
                  }${select[key - 1].id}`,
                headers: HEADER_AUTH,
              };

              await Axios(config)
                .then(async (response) => {

                  await setBreakdown1ListData([
                    {
                      breakdownLabel:
                        projectData.projectName.breakdown[key].structure[0].name,
                      breakdownValue: response.data.data.results,
                      selectValue: "",
                      index: key
                    },
                  ]);
                })
                .catch(function (error) {
                });
            } catch (err) {
              ;
            }
          }
        }
      }
    } else {
      for (var key in projectData.projectName.breakdown) {

        if (key == 0) {
          var config = {
            method: "get",
            url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
              }`,
            headers: HEADER_AUTH,
          };
          await Axios(config)
            .then(async (response) => {

              await setBreakdown1ListData([
                {
                  breakdownLabel:
                    projectData.projectName.breakdown[0].structure[0].name,
                  breakdownValue: response.data.data.results,
                  selectValue: "",
                  index: 0
                },
              ]);
            })
            .catch(function (error) {
            });
        }
      }
    }
  }

  const handleDepthAndId = (depth, id) => {
    let newData = [...selectDepthAndId, `${depth}${id}`]
    console.log(newData)
    setSelectDepthAndId([... new Set(newData)])
  }


  const classes = useStyles();

  const PickList = async () => {
    setShiftType(await PickListData(47));
    await setIsLoading(true);
  };
  useEffect(() => {
    if (id) {
      fetchInitialiObservationData();
      fetchCheckBoxData();
      fetchSuperVisorName()
      setFileShow(true)
    }else{
      fetchTags()
      fetchDepartment()
      fetchAttachment()
      setIsLoading(true);
      fetchNotificationSent()
      fetchSuperVisorName()
      fetchReportedBy()
      PickList()
      const projectData = JSON.parse(localStorage.getItem('projectName'));
    const select = props.initialValues.breakDown.length > 0 ? props.initialValues.breakDown
      : JSON.parse(localStorage.getItem('selectBreakDown'))
      console.log(select)

    if (select === null ? select.length === 0 : false) {
      setBreakdown1ListData([])
      selectDepthAndId([])
    }
    fetchCallBack(select, projectData);
      // clearTimeout(timer.current);
    }
  }, [props.initialValues.breakDown]);
  
  return (
    <>
      <PapperBlock
        className={classes.customPapperBlockSection}
        title="Initial Notification"
        icon="ion-md-list-box"
      >
        {isLoading ? (
          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid item md={12}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.labelName}
              >
                Project
              </Typography>
              <Typography className={classes.labelValue}>
                {project.projectName}
              </Typography>
            </Grid>
            {id ? fetchSelectBreakDownList.map((selectBdown, key) =>
              <Grid item xs={6} key={key}>
                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                  id="project-name-label"
                >
                  {selectBdown.label}
                </Typography>
                <Typography className={Type.labelValue}>
                  {selectBdown.name}
                </Typography>
              </Grid>
            ) : selectBreakdown && selectBreakdown.map((selectBreakdown, key) =>
              <Grid item xs={6} key={key}>
                <Typography
                  variant="h6"
                  className={Type.labelName}
                  gutterBottom
                  id="project-name-label"
                >
                  {selectBreakdown.label}
                </Typography>
                <Typography className={Type.labelValue}>
                  {selectBreakdown.name}
                </Typography>
              </Grid>)}
            {id ? null : breakdown1ListData ? breakdown1ListData.map((item, index) => (
              <Grid item xs={6}>
                <FormControl
                  key={index}
                  variant="outlined"
                  fullWidth
                  required={selectDepthAndId.length === 0 ? true : false}
                  className={classes.formControl}
                  error={error && error[`projectStructure`]}
                >
                  <InputLabel
                    id={index}
                  >
                    {item.breakdownLabel}
                  </InputLabel>
                  <Select
                    labelId={item.breakdownLabel}
                    // value={parseInt(item.selectValue)}
                    onChange={(e) => {
                      handleBreakdown(e, parseInt(item.index) + 1, item.breakdownLabel, item.selectValue)
                    }}
                    label="Phases"
                    style={{ width: "100%" }}
                  >
                    {item.breakdownValue.length
                      ? item.breakdownValue.map(
                        (selectValue, selectKey) => (
                          <MenuItem
                            key={selectKey}
                            value={selectValue.id}
                            onClick={(e) => handleDepthAndId(selectValue.depth, selectValue.id)}
                          >
                            {selectValue.name}
                          </MenuItem>
                        )
                      )
                      : null}
                  </Select>
                  {error && error.projectStructure && (
                    <FormHelperText>{error.projectStructure}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )) : null}


            {/* <Grid item md={12}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.labelName}
              >
                Unit
              </Typography>
              <Typography className={classes.labelValue}>
                {selectBreakdown !== null ? selectBreakdown.length > 1 ? selectBreakdown[1].name : "-" : "-"}
              </Typography>
            </Grid> */}
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Location*"
                name="location"
                id="location"
                error={error.location}
                helperText={error.location ? error.location : ""}
                defaultValue={form.location}
                fullWidth
                variant="outlined"
                autoComplete="off"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    location: e.target.value,
                  });
                }}
              />
            </Grid>
            
            <Grid item md={6} xs={12} className={classes.formBox}>
              <Autocomplete
                id="combo-box-demo"
                options={reportedByName}
                className={classes.mT30}
                getOptionLabel={(option) => option.name}
                defaultValue={form.reportedByName}
                onChange={(e, value) => {
                  handleReportedBy(e, value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Observed by*"
                    variant="outlined"
                    error={error.reportedByName}
                helperText={error.reportedByName ? error.reportedByName : ""}
                  />
                )}
              />
            </Grid>
            <Grid
            item
            md={6}
            xs={12}
            className={classes.formBox}
          >
         
            <Autocomplete
                id="observerdepartment"
                options={departmentName}
                className={classes.mT30}
                
                getOptionLabel={(option) => option}
                onChange={(e , value) => {
                  setForm({...form,reportedByDepartment:value})
                }}
                renderInput={(params) => <TextField {...params} label="Observer Department*" error={error.reportedByDepartment}
                helperText={error.reportedByDepartment ? error.reportedByDepartment : ""} variant="outlined" />}
            />
          </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Observer's Badge Number"
                name="badgenumberreportingperson"
                id="badgenumberreportingperson"
                value={
                  form.reportedByBadgeId
                }
                fullWidth
                variant="outlined"
                autoComplete="off"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    reportedByBadgeId: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Supervisor's Name*"
                name="supervisorname"
                id="supervisorname"
                defaultValue={form.supervisorName}
                error={error.supervisorName}
                helperText={error.supervisorName ? error.supervisorName : ""}
                select
                fullWidth
                variant="outlined"
                // onChange={(e) => {
                //   handleSuperVisior(e)}}
              >
                {superVisorName.map((option) => (
                  <MenuItem key={option} value={option.name}
                  onClick={(e) => handleSuperVisior(e,option)}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Supervisor's Badge Number"
                name="supervisorbadgenumber"
                id="supervisorbadgenumber"
                error={error.supervisorByBadgeId}
                helperText={
                  error.supervisorByBadgeId ? error.supervisorByBadgeId : ""
                }
                value={form.supervisorByBadgeId}
                fullWidth
                variant="outlined"
                autoComplete="off"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({
                    ...form,
                    supervisorByBadgeId: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDateTimePicker
                  label="Date & Time*"
                  defaultValue={form.observedAt}
                  disabled={form.id ? true : false}
                  error={error.observedAt}
                  helperText={error.observedAt ? error.observedAt : null}
                  onChange={handleDateChange}
                  format="YYYY/MM/DD hh:mm A"
                  className={classes.formControl}
                  value={form.observedAt || null}
                  fullWidth
                  disableFuture={true}
                  inputVariant="outlined"
                  InputProps={{ readOnly: true }}
                  KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      observedAt: moment(e).toISOString(),
                    });
                  }}
                 
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Select Shift"
                //margin="dense"
                name="selectshift"
                id="selectshift"
                defaultValue={form.shift}
                select
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setForm({
                    ...form,
                    shift: e.target.value,
                  });
                }}
              >
                {shiftType.map((option) => (
                  <MenuItem key={option} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl component="fieldset" error={
                                  error && error["observationType"]
                                } >
                <FormLabel component="legend" className={classes.labelName} >
                  Type of observation*
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.observationType}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      observationType: e.target.value,
                    });
                  }}
                >
                  {radioType.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
                {error && error["observationType"] && (
                                  <FormHelperText>
                                    {error["observationType"]}
                                  </FormHelperText>
                                )}
              </FormControl>
            </Grid>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <TextField
                label="Short title"
                // margin="dense"
                name="shorttitle"
                id="shorttitle"
                multiline
                defaultValue={form.observationTitle}
                fullWidth
                variant="outlined"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({ ...form, observationTitle: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <TextField
                label="Detailed description*"
                // margin="dense"
                name="detaileddescription"
                id="detaileddescription"
                multiline
                rows={4}
                error={error.observationDetails}
                helperText={
                  error.observationDetails ? error.observationDetails : ""
                }
                defaultValue={form.observationDetails}
                fullWidth
                variant="outlined"
                className={classes.formControl}
                onChange={(e) => {
                  setForm({ ...form, observationDetails: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel className={classes.labelName} component="legend">
                  Did you address the situation?*
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.isSituationAddressed}
                  onChange={(e) => {
                    setForm({ ...form, isSituationAddressed: e.target.value });
                  }}
                >
                  {radioSituation.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      onClick={(e) => handelAddressSituationYes(e)}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {form.isSituationAddressed == "Yes" ? (
              <>
                <Grid item md={12} xs={12} className={classes.formBox}>
                  <TextField
                    label="Describe the actions taken*"
                    // margin="dense"
                    name="actionstaken"
                    id="actionstaken"
                    multiline
                    rows={4}
                    error={error.actionTaken}
                helperText={
                  error.actionTaken ? error.actionTaken : ""
                }
                    defaultValue={form.actionTaken}
                    fullWidth
                    variant="outlined"
                    className={classes.formControl}
                    onChange={(e) => {
                      setForm({ ...form, actionTaken: e.target.value });
                    }}
                  />
                </Grid>
              </>
            ) : (
              ""
            )}

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.labelName}>
                  Classification
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="classification"
                  name="classification"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      observationClassification: e.target.value,
                    });
                  }}
                >
                  {radioClassification.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.labelName}>
                  Stop Work
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.stopWork}
                  onChange={(e) => {
                    setForm({ ...form, stopWork: e.target.value });
                  }}
                >
                  {radioSituation.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.labelName}>
                  Near Miss
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.nearMiss}
                  onChange={(e) => {
                    setForm({ ...form, nearMiss: e.target.value });
                  }}
                >
                  {radioSituation.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.labelName}>
                  Do you need to escalate the issue to Safety Management?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="safetymanagement"
                  name="safetymanagement"
                  onChange={(e) => {
                    setForm({
                      ...form,
                      isNotifiedToSupervisor: e.target.value,
                    });
                  }}
                >
                  {radioSituation.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12} className={classes.formBox}>
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.labelName}>
                  Is this an Employee Recognition?
                </FormLabel>
                <RadioGroup
                  row
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.personRecognition}
                  onChange={(e) => {
                    setForm({ ...form, personRecognition: e.target.value });
                  }}
                >
                  {radioSituation.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            {notificationSentValue.map((value,index) =>(
            <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
          >
            <FormGroup>
              <FormControlLabel
                className={classes.labelValue}
                control={(
                  <Checkbox
                    icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                    checkedIcon={<CheckBoxIcon fontSize="small" />}
                    name="notify"
                    onChange={(e) => {handleNotify(value.id,index , e)}}
                  />
                )}
                label={`Do you want to Notify the ${value.roleName}`}
              />
            </FormGroup>
          </Grid>))}

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormLabel className={classes.labelName} component="legend">
                Categories
              </FormLabel>
              <FormGroup className={classes.customCheckBoxList}>
                {tagData.slice(0, 8).map((value, index) => (
                  <FormControlLabel
                    className={classes.labelValue}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name={value}
                        onChange={(e) => handleChange(e, index, value.tagName)}
                      />
                    }
                    label={value.tagName}
                  />
                ))}
              </FormGroup>
              <Grid item md={3} xs={12} className={classes.formBox}>
                <TextField
                  label="Others, if any"
                  name="others"
                  id="others"
                  fullWidth
                  autoComplete="off"
                  onChange={(e) => handleOther(e)}
                  variant="outlined"
                  className={classes.formControl}
                />
              </Grid>
            </Grid>

            <Grid item md={6} xs={12} className={classes.formBox}>
              <Autocomplete
                id="combo-box-demo"
                options={reportedByName}
                className={classes.mT30}
                getOptionLabel={(option) => option.name}
                onChange={(e, value) => {handleAssignee(e, value)}
                  }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    variant="outlined"
                  />
                )}
              />
            </Grid>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Assignee Department"
                name="assigneedepartment"
                id="assigneedepartment"
                select
                fullWidth
                defaultValue={form.departmentName}
                variant="outlined"
                onChange={(e) => {
                  setForm({ ...form, departmentName: e.target.value });
                }}
              >
                {departmentName.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <Typography
                variant="h6"
                gutterBottom
                className={classes.labelName}
              >
                Attachment
              </Typography>
              <input
                    type="file"
                    id="attachment"
                    accept=".png, .jpg , .xls , .xlsx , .ppt , .pptx, .doc, .docx, .text , .pdf ,  .mp4, .mov, .flv, .avi, .mkv"
                      onChange={(e) => {
                        handleFile(e);
                      }}
                    />
              
            </Grid>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="error">
                  The file you are attaching is bigger than the 25mb.
                </Alert>
              </Snackbar>
            
            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormGroup className={classes.customCheckBoxList}>
                <FormControlLabel
                  className={classes.labelValue}
                // helperText={
                //   error.acceptAndPledge ? error.acceptAndPledge : ""
                // }
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      error={error.acceptAndPledge}
                      name="checkedI"
                      onChange={(e) => {
                        handlePledge(e);
                      }}
                    />
                  }
                  label="I Accept & Pledge*"
                />
              </FormGroup>
              <p style={{color: "red"}}>{error.acceptAndPledge}</p>
            </Grid>

            <Grid item md={12} xs={12} className={classes.formBBanner}>
              <Avatar
                className={classes.observationFormBox}
                variant="rounded"
                alt="Observation form banner"
                src={FormObservationbanner}
              />
            </Grid>
            {/* {attachment ===
                              null ? null : typeof attachment ===
                                "string" ? (
                                <Attachment value={attachment} />
                              ) : null} */}
            <Grid item xs={12}>
            {/* {submitLoader == false ? */}
            <div className={classes.loadingWrapper}>
        <Button
          variant="outlined"
                  onClick={(e) => handleSubmit()}
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                  disabled={loading}
        >
          Submit
        </Button>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
                
              <Button
                variant="outlined"
                size="medium"
                className={classes.custmCancelBtn}
                onClick={() => {
                  history.push("/app/observations");
                }}
              >
                CANCEL
              </Button>
            </Grid>
          </Grid>
        ) : (
          <h1>Loading...</h1>
        )}
      </PapperBlock>
    </>
  );
};

const observationDetailsInit  = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(ObservationInitialNotification);


export default observationDetailsInit;
