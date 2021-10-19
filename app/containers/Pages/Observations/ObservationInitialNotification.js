import MomentUtils from "@date-io/moment";
import { Button, CircularProgress, FormHelperText, Grid, TextField, Typography } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import { KeyboardDatePicker } from '@material-ui/pickers';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { makeStyles } from "@material-ui/core/styles";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import MuiAlert from "@material-ui/lab/Alert";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import axios from "axios";
import classNames from "classnames";
import { PapperBlock } from "dan-components";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH, SSO_URL
} from "../../../utils/constants";
// import PickListData from "../../../utils/Picklist/InitialPicklist";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import ProjectStructureInit from "../../ProjectStructureId/ProjectStructureId";
import InitialNotificationValidator from "../../Validator/Observation/InitialNotificationValidation";
import obsIcon from 'dan-images/obsIcon.png';
import Paper from '@material-ui/core/Paper';

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
    position: "relative",
    display: "inline-flex",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  addLabelTitleBox: {
    padding: "0px 12px !important",
    marginTop: "22px",
    "& .MuiTypography-root": {
      //marginBottom: '0px',
      fontSize: "18px",
      fontWeight: "400",
      lineHeight: "1.2",
      color: "#737373",
      fontWeight: "600",
    },
  },
  boldHelperText: {
    "& .MuiFormHelperText-root": {
      // fontWeight : "bold",
      color: "red",
      fontSize: "16px",
      fontFamily: "Montserrat-Medium"
    }
  },
  errorsWrapper: {
    backgroundColor: "#fff8f8",
    border: "1px solid #fab9b9",
    "& .MuiTypography-root": {
      // fontWeight : "bold",
      color: "red",
      fontSize: "16px",
      fontFamily: "Montserrat-Medium"
    }
  }

}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const filter = createFilterOptions();
const ObservationInitialNotification = (props) => {
  // class ObservationInitialNotification extends Component {
  // All states are define here.

  const user =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [addressSituation, setAddressSituation] = useState(true);
  const [tagData, setTagData] = useState([]);
  const [fileShow, setFileShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [superVisorName, setSuperVisorName] = useState([]);
  const [superVisorBadgeNo, setSuperVisorBadgeNo] = useState([]);
  const [reportedByDetails, setReportedByDetails] = useState([]);
  const [reportedById, setReportedById] = useState([]);
  const [reportedByBadgeId, setReportedByIdBadgeId] = useState([]);
  const [attachment, setAttachment] = useState();
  const [departmentName, setDepartmentName] = useState([]);
  const [shiftType, setShiftType] = useState([]);
  const [superVisorId, setSuperVisorId] = useState("");
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const [notifyToList, setNotifyToList] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = React.useRef();
  const [levelLenght, setLevelLenght] = useState(0);
  const [isDateShow, setIsDateShow] = useState(false)
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [breakdownData, setBreakDownData] = useState([]);
  const [selectValue, setSelectValue] = useState([]);
  const [value, setValue] = React.useState(user);
  const [valueReportedBy, setValueReportedBy] = React.useState(null);
  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([]);

  const radioType = ["Risk", "Comments", "Positive behavior"];
  const radioSituation = ["Yes", "No"];
  const radioClassification = ["People", "Property"];

  // form state for post api
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;
  const userDetails =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails"))
      : null;
  const userCompany = userDetails.companies.filter((company) => company.companyId === fkCompanyId)
  const userDepartment = userCompany[0].departments.filter((userDepartment) => userDepartment.fkUserId === userId)
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
  const [workArea, setWorkArea] = useState("");
  const fetchSuperVisorName = () => {
    let fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
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
          let user = [];

          for (var i in result) {
            let temp = {};
            temp["inputValue"] = result[i].name;
            temp["supervisorId"] = result[i].id;
            temp["badgeNo"] = result[i].badgeNo;
            user.push(temp);
          }
          setSuperVisorName(user);
        }
      })
      .catch((error) => { });
  };
  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results;
          const userDetails =
            JSON.parse(localStorage.getItem("userDetails")) !== null
              ? JSON.parse(localStorage.getItem("userDetails"))
              : null;
          let us = {
            inputValue: userDetails.name,
            reportedById: userDetails.id,
            badgeNo: userDetails.badgeNo,
          };
          let user = [];

          let data = result.filter((item) =>
            item['companyId'] == fkCompanyId
          )
          for (var i in data[0].users) {
            let temp = {};
            temp["inputValue"] = data[0].users[i].name;
            temp["reportedById"] = data[0].users[i].id;
            temp["badgeNo"] = data[0].users[i].badgeNo;
            user.push(temp);
          }
          setReportedByDetails(user);
        }
      })
      .catch((error) => {
      });
  };

  const fetchDepartment = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/departments/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results;
          let user = [];
          for (var i in result) {
            let temp = {};
            temp["inputValue"] = result[i].departmentName;
            temp["departmentId"] = result[i].id;
            user.push(temp);
          }
          setDepartmentName(user);
        }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };

  const [form, setForm] = useState({
    fkCompanyId: parseInt(fkCompanyId),
    fkProjectId: parseInt(project.projectId),
    fkProjectStructureIds:
      fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
    observationType: "",
    observationClassification: "",
    stopWork: "",
    nearMiss: "",
    acceptAndPledge: "",
    personRecognition: "",
    observationTitle: "",
    observationDetails: "",
    isSituationAddressed: "",
    isNotifiedToSupervisor: "",
    actionTaken: "",
    location: "",
    observedAt: new Date().toISOString(),
    assigneeName: "",
    assigneeId: 0,
    shift: "",
    departmentName: "",
    departmentId: 0,
    reportedById: user.id,
    reportedByName: user.name,
    reportedByDepartment: userDepartment[0] ? userDepartment[0].departmentName : "",
    reportedDate: new Date().toISOString(),
    reportedByBadgeId: user.badgeNo,
    closedById: 0,
    closedByName: "",
    closedByDepartment: "",
    closedDate: "",
    closedoutAttachment: "",
    supervisorByBadgeId: "",
    supervisorName: "",
    supervisorDepartment: "",
    supervisorId: "",
    notifyTo: "",
    attachment: "",
    status: "Active",
    createdBy: parseInt(userId),
    updatedBy: 0,
    source: "Web",
    vendor: "string",
    vendorReferenceId: "string",
  });

  const handelTime = (value) => {
    let noGmt = value.toString().replace("GMT+0530 (India Standard Time)", "")
    let requireTime = moment(noGmt).format().toString()
    let observedAtTime = requireTime.replace("+05:30", ".000Z")
    return observedAtTime
  }


  // it is used for catagory for tag post api
  const [catagory, setCatagory] = useState([]);
  // when click on submit button handleSubmit is called
  const handleSubmit = async () => {
    const uniqueProjectStructure = [...new Set(selectDepthAndId)];
    let fkProjectStructureId = uniqueProjectStructure
      .map((depth) => {
        return depth;
      })
      .join(":");
    form["fkProjectStructureIds"] = fkProjectStructureId;

    // if any error then this part is executed
    const { error, isValid } = InitialNotificationValidator(
      form,
      selectDepthAndId
    );
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    await setLoading(true);

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
      data.append("observedAt", handelTime(form.observedAt)),
      data.append("isNotifiedToSupervisor", form.isNotifiedToSupervisor),
      data.append("assigneeName", form.assigneeName),
      data.append("assigneeId", form.assigneeId),
      data.append("shift", form.shift),
      data.append("departmentName", form.departmentName),
      data.append("departmentId", form.departmentId),
      data.append("reportedById", form.reportedById),
      data.append("reportedByName", form.reportedByName),
      data.append("reportedByDepartment", form.reportedByDepartment),
      data.append("reportedDate", form.reportedDate),
      data.append("reportedByBadgeId", form.reportedByBadgeId),
      data.append("closedById", form.closedById),
      data.append("closedByName", form.closedByName),
      data.append("closedByDepartment", form.closedByDepartment)

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

    const res = await api.post("/api/v1/observations/", data).then(res => {
      if (res.status === 201) {
        const id = res.data.data.results;
        const fkObservatioId = id.id;
        localStorage.setItem("fkobservationId", fkObservatioId);

        if (catagory.length > 0) {
          for (let i = 0; i < catagory.length; i++) {
            catagory[i]["fkObservationId"] = localStorage.getItem(
              "fkobservationId"
            );
          }
          const resCategory = api.post(
            `/api/v1/observations/${localStorage.getItem(
              "fkobservationId"
            )}/observationtags/`,
            catagory
          ).then(res => {
            if (res.status === 200 || res.status === 201) {
              const notificationSent = api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/sentnotification/`)
              history.push(
                `/app/observation/details/${localStorage.getItem(
                  "fkobservationId"
                )}`
              );
              setLoading(false);
            }
          }).catch(err => {
            setLoading(false);

          })

        } else {
          const notificationSent = api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/sentnotification/`)

          history.push(
            `/app/observation/details/${localStorage.getItem(
              "fkobservationId"
            )}`
          );
        }
      }
    }).catch(err => {
      setLoading(false);

    })

  };

  const handelClose = () => {
    setIsDateShow(false)
    return true
  }


  // this function called when user clicked and unclick checkBox and set thier value acording to click or unclick check
  const handleChange = async (e, index, value) => {
    let temp = [...catagory];
    let tempRemove = [];
    if (e.target.checked == false) {
      temp.map((ahaValue, index) => {
        if (ahaValue["observationTag"] === value.tagName) {
          temp.splice(index, 1);
        }
      });
    } else if (e.target.checked) {
      temp.push({
        fkObservationId: "",
        fkTagId: value.id,
        observationTag: value.tagName,
        status: "Active",
        createdBy: parseInt(userId),
        updatedBy: 0,
      });
    }
    await setCatagory(temp);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  // this function when user upload the file
  const handleFile = async (e) => {
    console.log(e)
    let TempPpeData = { ...form };
    if ((TempPpeData.attachment = e.target.files[0].size <= 1024 * 1024 * 25)) {
      TempPpeData.attachment = e.target.files[0];
      await setForm(TempPpeData);
    } else {
      document.getElementById("attachment").value = "";
      await setOpen(true);
    }

  };

  const handleAssignee = async (e, value) => {
    let tempData = { ...form };
    tempData.assigneeName = value.name;

    tempData.assigneeId = value.id;

    setForm(tempData);
  };

  const handelAddressSituationYes = async (e) => {
    let tempData = { ...form };
    tempData.isSituationAddressed = e.target.value;
    if (tempData.isSituationAddressed === "Yes") {
      await setAddressSituation(true);
    } else if (e.target.value === "No") {
      tempData.actionTaken = "";

      await setAddressSituation(false);
      await setForm(tempData);
    }
  };
 
  const handlePledge = (e) => {
    if (e.target.checked === true) {
      setForm({ ...form, acceptAndPledge: "Yes" });
    } else {
      setForm({ ...form, acceptAndPledge: "No" });
    }
  };

  const handleFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
  };

  const handleNotify = async (value, index, e) => {
    if (e.target.checked === true) {
      let temp = [...notifyToList];
      temp.push(value);
      let uniq = [...new Set(temp)];
      setNotifyToList(uniq);
      setForm({ ...form, notifyTo: temp.toString() });
    } else {
      let temp = [...notifyToList];
      let newData = temp.filter((item) => item !== value);
      setNotifyToList(newData);
      setForm({ ...form, notifyTo: newData.toString() });
    }
  };


  const fetchNotificationSent = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/observations/?subentity=observations&roleType=custom`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        setNotificationSentValue(result);
      }
    } catch (error) { }
  };

  const fetchTags = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    const res = await api.get(
      `/api/v1/tags/?companyId=${companyId}&projectId=${projectId}`
    );
    const result = res.data.data.results.results;
    let temp = [];
    result.map((value) => {
      if (value.status === "Active") {
        temp.push(value);
      }
    });
    let sorting = temp.sort((a, b) => a.id - b.id);
    await setTagData(sorting);
  };



  const fetchAttachment = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName
      .projectId;
    const attachment = await api.get(
      `/api/v1/corepatterns/?companyId=${companyId}&projectId=${projectId}&key=observation_pledge`
    );
    const result = attachment.data.data.results[0];
    if (result !== undefined) {
      let ar = result.attachment;

      await setAttachment(ar);
    }
  };


  const handleBreakdown = async (e, index, label, selectvalue) => {
    const projectData = JSON.parse(localStorage.getItem("projectName"));

    const value = e.target.value;

    const temp = [...fetchSelectBreakDownList];
    temp[index]["selectValue"].id = value;
    for (var i in temp) {
      if (i > index) {
        temp[i].breakDownData = [];
        temp[i].selectValue.id = "";
      }
    }
    let tempDepthAndId = selectDepthAndId;
    let dataDepthAndId = tempDepthAndId.filter(
      (filterItem) => filterItem.slice(0, 2) !== `${index + 1}L`
    );
    let sliceData = dataDepthAndId.slice(0, index);
    let newdataDepthAndId = [...sliceData, `${index + 1}L${value}`];
    setSelectDepthAndId(newdataDepthAndId);
    // await setFetchSelectBreakDownList(removeTemp)
    if (projectData.projectName.breakdown.length !== index + 1) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index + 1) {
          await api
            .get(
              `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
              }${value}`
            )
            .then(function (response) {
              if (response.status === 200) {
                temp[key].breakDownData = response.data.data.results;
                //  temp[key].select=e.
                setBreakdown1ListData(temp);
              }
            })
            .catch(function (error) { });
        }
      }
    }
  };

  const classes = useStyles();

  const PickList = async () => {
    setShiftType(await PickListData(47));
    await setIsLoading(true);
  };
  useEffect(() => {
    fetchTags();
    fetchDepartment();
    fetchNotificationSent();
    fetchSuperVisorName();
    fetchReportedBy();
    PickList();
  }, [props.initialValues.breakDown]);

  return (
    <>
        <CustomPapperBlock title="Observations" icon={obsIcon} whiteBg>

        {isLoading ? (
          <Grid container spacing={3} className={classes.observationNewSection}>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c"/>
              </svg>  Project information
            </Typography>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
          <Paper elevation={1} className="paperSection">
          <Grid container spacing={3}>
          <Grid item md={12} sm={12} xs={12}>
                  <Typography gutterBottom className={classes.labelName}>
                          Project Name
                  </Typography>
                  <Typography className={classes.labelValue}>
                  {project.projectName}
                  </Typography>
                </Grid>
              {/* <Typography
                variant="h6"
                gutterBottom
                className={classes.labelName}
              >
                Project
              </Typography>
              <Typography className={classes.labelValue}>
                {project.projectName}
              </Typography> */}
            <Grid item md={3} sm={6} xs={12}>

    
              <ProjectStructureInit
                selectDepthAndId={selectDepthAndId}
                setLevelLenght={setLevelLenght}
                error={error}
                setWorkArea={setWorkArea}
                setSelectDepthAndId={setSelectDepthAndId}
              />
            </Grid>
            </Grid>
            </Paper>
            </Grid>

            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="20.103" height="25.906" viewBox="0 0 20.103 25.906">
                <g id="Observer_and_reporter_details" data-name="Observer and reporter details" transform="translate(-15.736 -5.629)">
                  <path id="Path_5129" data-name="Path 5129" d="M44.491,25.718a.112.112,0,0,0,.095.041.077.077,0,0,0,.041-.021,2.557,2.557,0,0,0,.806,1.218,1.061,1.061,0,0,0,1.4-.011,2.569,2.569,0,0,0,.792-1.207.08.08,0,0,0,.041.021.1.1,0,0,0,.082-.029.649.649,0,0,0,.162-.357c.038-.214,0-.4-.077-.44l-.018-.006a.1.1,0,0,0-.077.025v0h0s0,0,0,0a1.672,1.672,0,0,0-.345-.726.4.4,0,0,0-.077-.033c0,.054.058.137.065.217a1.428,1.428,0,0,0-.585-.217c-.057,0-.118,0-.182,0a2.048,2.048,0,0,1-1.235-.028c-.737-.069-.854.7-.864.786,0,0,0,0,0,.006h0a.1.1,0,0,0-.079-.026.072.072,0,0,0-.031.013.175.175,0,0,0-.054.087c-.007.1-.012.207-.013.315,0,.01,0,.02,0,.03A.677.677,0,0,0,44.491,25.718Z" transform="translate(-20.37 -13.196)" fill="none"/>
                  <path id="Path_5130" data-name="Path 5130" d="M37.056,9.229H19.647a.311.311,0,0,0-.311.311V32.752a.311.311,0,0,0,.311.311H37.056a.311.311,0,0,0,.311-.311V9.54A.311.311,0,0,0,37.056,9.229ZM26.329,14.041h.007s0,0,0,0h0a1.93,1.93,0,0,1,.058-.461,2.018,2.018,0,0,1,.195-.754,1.949,1.949,0,0,1,1.972-.932,1.765,1.765,0,0,1,1.766,1.918c0,.081,0,.161-.007.24.124.047.178.328.121.65-.053.3-.183.529-.307.565a3.312,3.312,0,0,1-.729,1.172,1.861,1.861,0,0,1-.619.423,1.21,1.21,0,0,1-.922,0,1.846,1.846,0,0,1-.6-.4,3.292,3.292,0,0,1-.747-1.186c-.13-.018-.27-.258-.325-.569C26.129,14.358,26.192,14.065,26.329,14.041Zm-1.88,4.607c.446-1.536,1.271-1.588,1.449-1.63.349-.082.773-.047,1-.117a6.122,6.122,0,0,0,1.093,1.406l.18-.707A.457.457,0,0,1,28,17.192H28.7a.453.453,0,0,1-.168.409l.183.706A6.13,6.13,0,0,0,29.806,16.9c.226.07.649.035,1,.117.178.041,1,.094,1.449,1.63a.838.838,0,0,1-.059.621c-.366.691-2.289.9-3.843.9s-3.477-.212-3.843-.9A.841.841,0,0,1,24.449,18.647ZM34.578,30.409H22.123a.622.622,0,0,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Zm0-3.316H22.123a.622.622,0,1,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Zm0-3.316H22.123a.622.622,0,0,1,0-1.243H34.578a.622.622,0,0,1,0,1.243Z" transform="translate(-2.564 -2.564)" fill="none"/>
                  <path id="Path_5131" data-name="Path 5131" d="M34.492,5.629H17.083a1.348,1.348,0,0,0-1.347,1.347V30.188a1.349,1.349,0,0,0,1.347,1.347H34.492a1.349,1.349,0,0,0,1.347-1.347V6.976A1.349,1.349,0,0,0,34.492,5.629ZM34.8,30.187a.311.311,0,0,1-.311.311H17.083a.311.311,0,0,1-.311-.311V6.976a.311.311,0,0,1,.311-.311H34.492a.311.311,0,0,1,.311.311Z" transform="translate(0 0)" fill="#06425c"/>
                  <path id="Path_5132" data-name="Path 5132" d="M40.917,39.152c1.554,0,3.477-.212,3.843-.9a.838.838,0,0,0,.059-.621c-.446-1.536-1.271-1.589-1.449-1.63-.349-.082-.773-.047-1-.117a6.13,6.13,0,0,1-1.093,1.407l-.183-.706a.453.453,0,0,0,.168-.409h-.693a.458.458,0,0,0,.165.407l-.18.707a6.115,6.115,0,0,1-1.093-1.406c-.226.071-.649.036-1,.117-.178.041-1,.094-1.449,1.63a.839.839,0,0,0,.059.621C37.44,38.939,39.363,39.152,40.917,39.152Z" transform="translate(-15.13 -21.543)" fill="#06425c"/>
                  <path id="Path_5133" data-name="Path 5133" d="M43.412,21.83a3.292,3.292,0,0,0,.747,1.186,1.848,1.848,0,0,0,.6.4,1.21,1.21,0,0,0,.922,0A1.861,1.861,0,0,0,46.3,23a3.311,3.311,0,0,0,.729-1.172c.124-.036.254-.269.307-.565.058-.322,0-.6-.121-.65,0-.079.007-.158.007-.24a1.765,1.765,0,0,0-1.766-1.918,1.95,1.95,0,0,0-1.972.932,2.023,2.023,0,0,0-.195.754,1.944,1.944,0,0,0-.058.461h0s0,0,0,0h-.007c-.138.024-.2.317-.14.656C43.143,21.572,43.283,21.812,43.412,21.83Zm.031-.869a.174.174,0,0,1,.054-.087.073.073,0,0,1,.031-.013.1.1,0,0,1,.079.026h0s0,0,0-.006c.009-.088.126-.854.864-.786a2.048,2.048,0,0,0,1.235.028c.064,0,.125,0,.182,0a1.434,1.434,0,0,1,.585.217c-.007-.08-.069-.163-.065-.217a.387.387,0,0,1,.077.033,1.67,1.67,0,0,1,.345.726s0,0,0,0h0v0a.1.1,0,0,1,.077-.025l.018.006c.08.038.115.226.077.44a.648.648,0,0,1-.162.358.1.1,0,0,1-.082.029.08.08,0,0,1-.041-.021,2.566,2.566,0,0,1-.792,1.207,1.062,1.062,0,0,1-1.4.011,2.56,2.56,0,0,1-.806-1.218.076.076,0,0,1-.041.021.112.112,0,0,1-.095-.041.687.687,0,0,1-.149-.345c0-.01,0-.02,0-.03C43.431,21.168,43.436,21.064,43.443,20.961Z" transform="translate(-19.462 -9.128)" fill="#06425c"/>
                  <path id="Path_5134" data-name="Path 5134" d="M39.937,55.449H27.482a.622.622,0,1,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -35.48)" fill="#06425c"/>
                  <path id="Path_5135" data-name="Path 5135" d="M39.937,66.97H27.482a.622.622,0,1,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -43.684)" fill="#06425c"/>
                  <path id="Path_5136" data-name="Path 5136" d="M39.937,78.489H27.482a.622.622,0,0,0,0,1.243H39.937a.622.622,0,0,0,0-1.243Z" transform="translate(-7.922 -51.888)" fill="#06425c"/>
                </g>
              </svg> Observer and reporter details
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
            <Grid item md={6} xs={12} className={classes.formBox}>
              <Autocomplete
                value={form.reportedByName ? form.reportedByName : ""}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValueReportedBy({
                      inputValue: newValue,
                    });

                    setForm({
                      ...form,
                      reportedByName: newValue,
                      reportedById: "",
                      reportedByBadgeId: "",
                    });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValueReportedBy({
                      inputValue: newValue.inputValue,
                    });
                    setForm({
                      ...form,
                      reportedByName: newValue.inputValue,
                      reportedById: newValue.reportedById,
                      reportedByBadgeId: newValue.badgeNo,
                    });
                  } else {
                    setValueReportedBy(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      inputValue: `${params.inputValue}`,
                    });
                  }

                  return filtered;
                }}
                className={classes.mT30}
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={reportedByDetails}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(option) => option.inputValue}
                // style={{ width: 300 }}
                freeSolo
                selectOnFocus
                clearOnBlur
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Observed by*"
                    error={error.reportedByName}
                    helperText={
                      error.reportedByName ? error.reportedByName : ""
                    }
                    className={classNames(classes.formControl, classes.boldHelperText)}

                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Observer's Badge Number"
                name="badgenumberreportingperson"
                id="badgenumberreportingperson"
                value={
                  form.reportedByBadgeId !== null &&
                    form.reportedByBadgeId !== undefined
                    ? form.reportedByBadgeId
                    : ""
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
              <Autocomplete
                value={
                  form.reportedByDepartment ? form.reportedByDepartment : ""
                }
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setValue({
                      inputValue: newValue,
                    });
                    setForm({ ...form, reportedByDepartment: newValue });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    setValue({
                      inputValue: newValue.inputValue,
                    });

                    setForm({
                      ...form,
                      reportedByDepartment: newValue.inputValue,
                    });
                  } else {
                    setValue(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      inputValue: `${params.inputValue}`,
                    });
                    // setForm({...form,reportedByDepartment:params.inputValue})
                  }

                  return filtered;
                }}
                className={classes.mT30}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={departmentName}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(option) => option.inputValue}
                // style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Observer's Department"
                    // error={error.reportedByDepartment}
                    // helperText={
                    //   error.reportedByDepartment
                    //     ? error.reportedByDepartment
                    //     : ""
                    // }
                    className={classNames(classes.formControl, classes.boldHelperText)}

                    // onChange={(e) => setForm({...form , reportedByDepartment: e.target.value })}
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Location"
                name="location"
                id="location"
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
                value={form.supervisorName ? form.supervisorName : ""}
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    // setValueReportedBy({
                    //   inputValue: newValue,
                    // });
                    setForm({ ...form, supervisorName: newValue });
                  } else if (newValue && newValue.inputValue) {
                    // Create a new value from the user input
                    // setValueReportedBy({
                    //   inputValue: newValue.inputValue,
                    // });
                    if (newValue.supervisorId) {
                      setForm({
                        ...form,
                        supervisorName: newValue.inputValue,
                        supervisorByBadgeId: newValue.badgeNo,
                        supervisorId: newValue.supervisorId,
                      });
                    } else {
                      setForm({
                        ...form,
                        supervisorName: newValue.inputValue,
                        supervisorByBadgeId: "",
                        supervisorId: 0,
                      });
                    }
                  } else {
                    setValueReportedBy(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  // Suggest the creation of a new value
                  if (params.inputValue !== "") {
                    filtered.push({
                      inputValue: params.inputValue,
                      inputValue: `${params.inputValue}`,
                    });
                  }

                  return filtered;
                }}
                className={classes.mT30}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-with-text-demo"
                options={superVisorName}
                getOptionLabel={(option) => {
                  // Value selected with enter, right from the input
                  if (typeof option === "string") {
                    return option;
                  }
                  // Add "xxx" option created dynamically
                  if (option.inputValue) {
                    return option.inputValue;
                  }
                  // Regular option
                  return option.title;
                }}
                renderOption={(option) => option.inputValue}
                // style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Foreman's Name"
                    // error={error.supervisorName}
                    // helperText={
                    //   error.supervisorName ? error.supervisorName : ""
                    // }
                    variant="outlined"
                  />
                )}
              />
            </Grid>

            <Grid item md={6} xs={12} className={classes.formBox}>
              <TextField
                label="Foreman's Number"
                name="supervisorbadgenumber"
                id="supervisorbadgenumber"
                error={error.supervisorByBadgeId}
                helperText={
                  error.supervisorByBadgeId ? error.supervisorByBadgeId : ""
                }
                value={
                  form.supervisorByBadgeId !== null &&
                    form.supervisorByBadgeId !== undefined
                    ? form.supervisorByBadgeId
                    : ""
                }
                fullWidth
                variant="outlined"
                autoComplete="off"
                className={classNames(classes.formControl, classes.boldHelperText)}
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
                  onClick={(e) => setIsDateShow(true)}
                  label="Date & Time*"
                  disabled={form.id ? true : false}
                  error={error.observedAt}
                  helperText={error.observedAt ? error.observedAt : null}
                  format="YYYY/MM/DD hh:mm A"
                  className={classes.formControl}
                  value={form.observedAt ? form.observedAt : null}
                  fullWidth
                  open={isDateShow}
                  onClose={(e) => handelClose()}
                  disableFuture={true}
                  inputVariant="outlined"
                  InputProps={{ readOnly: true }}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      observedAt: e["_d"],
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
            </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg xmlns="http://www.w3.org/2000/svg" width="24.913" height="24.902" viewBox="0 0 24.913 24.902">
                <g id="observation_detail" data-name="observation detail" transform="translate(-4.729 -4.75)">
                  <g id="Group_5258" data-name="Group 5258" transform="translate(16.965 7.883)">
                    <path id="Path_5137" data-name="Path 5137" d="M74.363,28.152a.188.188,0,0,1-.188-.188V21.353a.618.618,0,0,0-.618-.618H69.017a.188.188,0,1,1,0-.375h4.541a.994.994,0,0,1,.993.993v6.611A.188.188,0,0,1,74.363,28.152Z" transform="translate(-68.83 -20.36)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5259" data-name="Group 5259" transform="translate(4.979 7.883)">
                    <path id="Path_5138" data-name="Path 5138" d="M21.693,41.879H5.972a.994.994,0,0,1-.993-.993V21.353a.994.994,0,0,1,.993-.993h3.9a.188.188,0,0,1,0,.375h-3.9a.618.618,0,0,0-.618.618V40.886a.618.618,0,0,0,.618.618h15.72a.618.618,0,0,0,.618-.618V36.822a.188.188,0,0,1,.375,0v4.064A.994.994,0,0,1,21.693,41.879Z" transform="translate(-4.979 -20.36)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5260" data-name="Group 5260" transform="translate(6.293 9.197)">
                    <path id="Path_5139" data-name="Path 5139" d="M26.87,46.251h-14.7a.188.188,0,0,1-.188-.188V27.548a.188.188,0,0,1,.188-.188H15.3a.188.188,0,0,1,0,.375H12.355v18.14H26.683V42.42a.188.188,0,0,1,.375,0v3.643A.188.188,0,0,1,26.87,46.251Z" transform="translate(-11.979 -27.36)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5261" data-name="Group 5261" transform="translate(17.224 9.197)">
                    <path id="Path_5140" data-name="Path 5140" d="M74.17,33.922a.188.188,0,0,1-.188-.188v-6H70.4a.188.188,0,1,1,0-.375H74.17a.188.188,0,0,1,.188.188v6.187A.188.188,0,0,1,74.17,33.922Z" transform="translate(-70.21 -27.36)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5262" data-name="Group 5262" transform="translate(9.279 5)">
                    <path id="Path_5141" data-name="Path 5141" d="M36.165,10.323H28.073a.188.188,0,0,1-.184-.224L28.5,6.976a.188.188,0,0,1,.184-.152h2.128V6.3a1.3,1.3,0,0,1,2.61,0v.52h2.128a.188.188,0,0,1,.184.152l.613,3.123a.188.188,0,0,1-.184.224ZM28.3,9.947h7.635L35.4,7.2H33.236a.188.188,0,0,1-.188-.188V6.3a.929.929,0,1,0-1.859,0v.707A.188.188,0,0,1,31,7.2H28.84Z" transform="translate(-27.886 -5)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5263" data-name="Group 5263" transform="translate(7.418 19.974)">
                    <path id="Path_5142" data-name="Path 5142" d="M19.047,86.93a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,19.047,86.93Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,19.047,85.151Z" transform="translate(-17.97 -84.775)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5264" data-name="Group 5264" transform="translate(10.623 16.915)">
                    <path id="Path_5143" data-name="Path 5143" d="M36.121,70.634A1.077,1.077,0,1,1,37.2,69.556,1.078,1.078,0,0,1,36.121,70.634Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,36.121,68.855Z" transform="translate(-35.044 -68.479)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5265" data-name="Group 5265" transform="translate(14.525 18.694)">
                    <path id="Path_5144" data-name="Path 5144" d="M56.909,80.111a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,56.909,80.111Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,56.909,78.332Z" transform="translate(-55.832 -77.957)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5266" data-name="Group 5266" transform="translate(12.322 18.174)">
                    <path id="Path_5145" data-name="Path 5145" d="M46.566,76.6a.188.188,0,0,1-.078-.017L44.2,75.541a.188.188,0,0,1,.156-.342l2.284,1.041a.188.188,0,0,1-.078.359Z" transform="translate(-44.094 -75.182)" fill="#06425c"/>
                  </g>
                  <g id="Group_5267" data-name="Group 5267" transform="translate(8.949 18.418)">
                    <path id="Path_5146" data-name="Path 5146" d="M26.317,78.693a.188.188,0,0,1-.13-.324l1.92-1.831a.188.188,0,0,1,.259.272l-1.919,1.831A.187.187,0,0,1,26.317,78.693Z" transform="translate(-26.129 -76.486)" fill="#06425c"/>
                  </g>
                  <g id="Group_5268" data-name="Group 5268" transform="translate(8.38 11.253)">
                    <path id="Path_5147" data-name="Path 5147" d="M23.283,44.7a.188.188,0,0,1-.093-.351l10.53-6.007a.188.188,0,0,1,.186.326l-10.53,6.007A.187.187,0,0,1,23.283,44.7Z" transform="translate(-23.095 -38.315)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5269" data-name="Group 5269" transform="translate(17.359 10.937)">
                    <path id="Path_5148" data-name="Path 5148" d="M72.354,38.87a.188.188,0,0,1-.184-.225l.279-1.367L71.082,37a.188.188,0,1,1,.075-.368l1.551.317a.188.188,0,0,1,.146.221l-.317,1.551A.188.188,0,0,1,72.354,38.87Z" transform="translate(-70.932 -36.627)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5270" data-name="Group 5270" transform="translate(17.5 15.285)">
                    <path id="Path_5149" data-name="Path 5149" d="M76.317,69.054a4.63,4.63,0,1,1,2.767-.92A4.629,4.629,0,0,1,76.317,69.054Zm-.011-8.886a4.256,4.256,0,1,0,3.416,1.708A4.235,4.235,0,0,0,76.306,60.168Z" transform="translate(-71.68 -59.793)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5271" data-name="Group 5271" transform="translate(18.47 16.256)">
                    <path id="Path_5150" data-name="Path 5150" d="M80.515,72.284a3.655,3.655,0,1,1,2.187-.727A3.658,3.658,0,0,1,80.515,72.284Zm-.009-6.945a3.282,3.282,0,1,0,2.637,1.318A3.269,3.269,0,0,0,80.507,65.339Z" transform="translate(-76.851 -64.964)" fill="#06425c"/>
                  </g>
                  <g id="Group_5272" data-name="Group 5272" transform="translate(24.603 23.289)">
                    <path id="Path_5151" data-name="Path 5151" d="M110.415,103.749a.188.188,0,0,1-.151-.075l-.7-.941a.188.188,0,0,1,.3-.225l.7.941a.188.188,0,0,1-.15.3Z" transform="translate(-109.524 -102.433)" fill="#06425c"/>
                  </g>
                  <g id="Group_5273" data-name="Group 5273" transform="translate(24.444 23.586)">
                    <path id="Path_5152" data-name="Path 5152" d="M112.965,109.822a2.286,2.286,0,0,1-1.228-.544,10.347,10.347,0,0,1-2.02-2.094,12.2,12.2,0,0,1-1.022-1.607.188.188,0,0,1,.054-.237l1.725-1.289a.188.188,0,0,1,.243.016,12.19,12.19,0,0,1,1.251,1.435,10.344,10.344,0,0,1,1.436,2.531c.3.84.285,1.417-.052,1.669A.63.63,0,0,1,112.965,109.822Zm-3.862-4.278a12.015,12.015,0,0,0,.915,1.415,9.962,9.962,0,0,0,1.942,2.016c.646.475,1.027.531,1.168.425s.2-.487-.077-1.241a9.961,9.961,0,0,0-1.383-2.434,12.037,12.037,0,0,0-1.1-1.279Z" transform="translate(-108.674 -104.014)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5274" data-name="Group 5274" transform="translate(8.516 23.289)">
                    <path id="Path_5153" data-name="Path 5153" d="M32.13,102.808H24.007a.188.188,0,1,1,0-.375H32.13a.188.188,0,1,1,0,.375Z" transform="translate(-23.819 -102.433)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                  <g id="Group_5275" data-name="Group 5275" transform="translate(8.516 25.852)">
                    <path id="Path_5154" data-name="Path 5154" d="M34.265,116.461H24.007a.188.188,0,1,1,0-.375H34.265a.188.188,0,1,1,0,.375Z" transform="translate(-23.819 -116.086)" fill="#06425c" stroke="#06425c" stroke-width="0.5"/>
                  </g>
                </g>
              </svg> Observation details
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <TextField
                label="Short title"
                // margin="dense"
                name="shorttitle"
                id="shorttitle"
                multiline
                defaultValue={form.observationTitle}
                fullWidth
                error={error.observationTitle}
                helperText={
                  error.observationTitle ? error.observationTitle : ""
                }
                variant="outlined"
                className={classNames(classes.formControl, classes.boldHelperText)}
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
                className={classNames(classes.formControl, classes.boldHelperText)}
                onChange={(e) => {
                  setForm({ ...form, observationDetails: e.target.value });
                }}
              />
            </Grid>
            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl
                component="fieldset"
                error={error && error["isSituationAddressed"]}
              >
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
                <p style={{ color: "red" }}>{error.isSituationAddressed}</p>

                {/* {error && error["isSituationAddressed"] && (
                  <FormHelperText>
                    {error["isSituationAddressed"]}
                  </FormHelperText>
                )} */}
              </FormControl>
            </Grid>
            {addressSituation === true ? (
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
                    helperText={error.actionTaken ? error.actionTaken : ""}
                    defaultValue={form.actionTaken}
                    fullWidth
                    variant="outlined"
                    className={classNames(classes.formControl, classes.boldHelperText)}
                    onChange={(e) => {
                      setForm({ ...form, actionTaken: e.target.value });
                    }}
                  />
                </Grid>
              </>
            ) : (
              ""
            )}
            </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg id="outline-assignment-24px" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40">
                <g id="Bounding_Boxes">
                  <path id="Path_2274" data-name="Path 2274" d="M0,0H40V40H0Z" fill="none"/>
                </g>
                <path id="enrollment" d="M14.947,31.057a.874.874,0,0,1,0,1.743H1.981A2.008,2.008,0,0,1,0,30.771V2.029A2.008,2.008,0,0,1,1.981,0H25.64a1.96,1.96,0,0,1,1.407.591,2.056,2.056,0,0,1,.585,1.437V16.443a2.91,2.91,0,0,1-.023.382H25.919V2.029a.288.288,0,0,0-.279-.286H1.981a.286.286,0,0,0-.2.083.305.305,0,0,0-.081.2v28.74a.27.27,0,0,0,.083.2.289.289,0,0,0,.2.085Zm9.137.035-4.272,1.495.034-4.871,4.246,3.377Zm-3.039-5.008,4.609-6.406a.411.411,0,0,1,.5-.149l3.775,2.893a.374.374,0,0,1,.039.55l-4.679,6.492ZM7.593,16.774a1.778,1.778,0,0,1-.052-.9c.12-.948.36-1.124,1.215-1.367a8.85,8.85,0,0,0,2.867-.873,2.936,2.936,0,0,0,.193-.382c.1-.227.185-.472.24-.641a8.154,8.154,0,0,1-.631-.921l-.639-1.041a1.941,1.941,0,0,1-.36-.95.777.777,0,0,1,.065-.342.613.613,0,0,1,.219-.267.5.5,0,0,1,.154-.08,17.114,17.114,0,0,1-.031-1.868,2.694,2.694,0,0,1,.078-.424,2.508,2.508,0,0,1,1.079-1.4,3.35,3.35,0,0,1,.9-.411c.2-.059-.175-.723.036-.745A5.144,5.144,0,0,1,16.295,5.79a2.561,2.561,0,0,1,.623,1.6l-.039,1.7h0a.46.46,0,0,1,.326.355,1.481,1.481,0,0,1-.175.892h0v.024l-.73,1.225a6.339,6.339,0,0,1-.891,1.26l.1.144a4.478,4.478,0,0,0,.464.625.043.043,0,0,1,.016.021,10.373,10.373,0,0,0,2.813.892c.782.211,1.069.267,1.243,1.142a1.937,1.937,0,0,1-.023,1.1Zm-.641,9.356a.885.885,0,0,1,0-1.764H18.508l-.016.024h0V24.4h0v.013h0v.408h0v.035h0v.021h0v.211h0v.032H18.38l-.018.013H18.33l-.016.016h-.029l-.016.013h-.016l-.016.016h-.013l-.016.016h0l-.016.016h0l-.016.016h0v.016h0v.029h0v.016h0l-.016.016v.016h-.013v.016h0v.016h0l-.013.016h0v.016h0v.035h0v.035h0l-.013.016v.016h0v.019h0v.019h0v.019h0v.037h0V25.6Zm.331-4.847a.847.847,0,0,1-.777-.421.891.891,0,0,1,0-.9.847.847,0,0,1,.777-.421H19.754a.847.847,0,0,1,.777.421.891.891,0,0,1,0,.9.847.847,0,0,1-.777.421Z" transform="translate(5.333 4.2)" fill="#06425c"/>
              </svg>Observation classification 
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
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
                  }} className={classNames(classes.formControl, classes.boldHelperText)}

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

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormControl
                component="fieldset"
                error={error && error["observationType"]}
              >
                <FormLabel component="legend" className={classes.labelName}>
                  Type of observation*
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  defaultValue={form.observationType}
                >
                  {radioType.map((value) => (
                    <FormControlLabel
                      value={value}
                      className={classes.labelValue}
                      control={<Radio />}
                      label={value}
                      onClick={(e) => {
                        setForm({
                          ...form,
                          observationType: e.target.value,
                        });
                      }}
                    />
                  ))}
                </RadioGroup>
                <p style={{ color: "red" }}>{error.observationType}</p>

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
            {tagData.length > 0 ? (
            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormLabel className={classes.labelName} component="legend">
                Categories
              </FormLabel>
              <FormGroup className={classes.customCheckBoxList}>
                {tagData.map((value, index) => (
                  <FormControlLabel
                    className={classes.labelValue}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name={value}
                        onChange={(e) => handleChange(e, index, value)}
                      />
                    }
                    label={value.tagName}
                  />
                ))}
              </FormGroup>
            </Grid>): null}

            </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Typography variant="h6" className="sectionHeading">
                <svg xmlns="http://www.w3.org/2000/svg" width="23.43" height="29.439" viewBox="0 0 25.43 31.439">
                  <path id="Path_2530" data-name="Path 2530" d="M16.815,3.254a.668.668,0,0,1-.217-.033.651.651,0,0,1-.65-.65V1.292h-6.3V2.571a.647.647,0,0,1-.583.64.732.732,0,0,1-.228.033H6.46V5.892H18.892V3.242h-2.1l.023.013ZM5.846,19.2a1.279,1.279,0,1,1-1.279,1.279A1.28,1.28,0,0,1,5.846,19.2ZM4.367,16.042a.575.575,0,0,1,.957-.64l.315.466,1.246-1.515a.576.576,0,1,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.113Zm0-4.431a.575.575,0,0,1,.957-.64l.315.466L6.885,9.919a.576.576,0,0,1,.89.732l-1.724,2.1a.673.673,0,0,1-.138.13.574.574,0,0,1-.8-.159l-.747-1.11ZM17.705,31.268a.671.671,0,0,1-.435.171.348.348,0,0,1-.1-.01H1.438a1.438,1.438,0,0,1-1.016-.422A1.422,1.422,0,0,1,0,29.989V5.079A1.441,1.441,0,0,1,1.438,3.641H5.181V2.932a.956.956,0,0,1,.287-.686.968.968,0,0,1,.686-.287H8.369V1.072A1.053,1.053,0,0,1,8.689.32,1.053,1.053,0,0,1,9.441,0h6.747a1.053,1.053,0,0,1,.752.32,1.058,1.058,0,0,1,.32.752v.89h2a1.011,1.011,0,0,1,.686.287.986.986,0,0,1,.287.686v.709h3.743a1.441,1.441,0,0,1,1.438,1.438V23.05a.656.656,0,0,1-.194.65l-7.433,7.522a.223.223,0,0,1-.056.046h-.023ZM16.62,30.137c0-8.6-1.085-7.581,7.476-7.581V5.079a.121.121,0,0,0-.046-.1.143.143,0,0,0-.1-.046H20.2v1.3a.956.956,0,0,1-.287.686.968.968,0,0,1-.686.287H6.141a.986.986,0,0,1-.686-.287c-.023-.023-.033-.046-.056-.069a.994.994,0,0,1-.228-.617V4.93H1.428a.121.121,0,0,0-.1.046.171.171,0,0,0-.046.1v24.91a.107.107,0,0,0,.046.1.143.143,0,0,0,.1.046H16.62Zm-6.071-9.208a.65.65,0,0,1,0-1.3h6.174a.65.65,0,0,1,0,1.3Zm0-9.282a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Zm0,4.641a.65.65,0,1,1,0-1.3h9.508a.65.65,0,1,1,0,1.3Z" fill="#06425c"/>
                </svg> Confirmation and notification 
              </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Paper elevation={1} className="paperSection">
                <Grid container spacing={3}>
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

            {notificationSentValue.map((value, index) => (
              <Grid item md={12} xs={12} className={classes.formBox}>
                <FormGroup>
                  <FormControlLabel
                    className={classes.labelValue}
                    control={
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        checkedIcon={<CheckBoxIcon fontSize="small" />}
                        name="notify"
                        onChange={(e) => {
                          handleNotify(value.id, index, e);
                        }}
                      />
                    }
                    label={`Do you want to Notify the ${value.roleName}`}
                  />
                </FormGroup>
              </Grid>
            ))}
            </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg id="twotone-closed_caption-24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path id="Path_5090" data-name="Path 5090" d="M0,0H24V24H0Z" fill="none"/>
                <path id="Path_5091" data-name="Path 5091" d="M18.5,16H7A4,4,0,0,1,7,8H19.5a2.5,2.5,0,0,1,0,5H9a1,1,0,0,1,0-2h9.5V9.5H9a2.5,2.5,0,0,0,0,5H19.5a4,4,0,0,0,0-8H7a5.5,5.5,0,0,0,0,11H18.5Z" fill="#06425c"/>
              </svg>  Attachment
            </Typography>
          </Grid>

            {/* <Grid item md={12} xs={12} className={classes.formBox}> */}
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
              <input
                type="file"
                multiple name="file"
                id="attachment"
                accept=".png, .jpg , .xls , .xlsx , .ppt , .pptx, .doc, .docx, .text , .pdf ,  .mp4, .mov, .flv, .avi, .mkv"
                onChange={(e) => {
                  handleFile(e);
                }}
              />
              </Grid>
              </Paper>
            </Grid>
            
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                The file you are attaching is bigger than the 25mb.
              </Alert>
            </Snackbar>

            <Grid item md={12} xs={12} className={classes.formBox}>
              <FormGroup className={classes.customCheckBoxList}>
                <FormControlLabel
                  className={classes.labelValue}
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
                  label="I pledge that I will always be responsible for my safety and the safety of people around me *"
                />
              </FormGroup>
              <p style={{ color: "red" }}>{error.acceptAndPledge}</p>
            </Grid>

            {Object.values(error).length > 0 ?
              <Grid item xs={12} md={6} className={classes.errorsWrapper}>

                {Object.values(error).map((value) => (
                  <Typography>{value}</Typography>
                ))}

              </Grid>
              : null}

            <Grid item xs={12}>
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
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
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
      </CustomPapperBlock>
    </>
  );
};

const observationDetailsInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(ObservationInitialNotification);

export default observationDetailsInit;