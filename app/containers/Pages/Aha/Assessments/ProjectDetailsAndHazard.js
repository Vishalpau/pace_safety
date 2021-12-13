import React, { useEffect, useState, Component , useRef} from 'react';
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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormSideBar from "../../../Forms/FormSideBar";
import { useParams, useHistory } from 'react-router';
import { CircularProgress } from '@material-ui/core';
import PickListData from "../../../../utils/Picklist/InvestigationPicklist";
import axios from "axios";
import api from "../../../../utils/axios";
import Paper from '@material-ui/core/Paper';
import { handelCommonObject } from "../../../../utils/CheckerValue"
import ProjectDetailsValidator from "../Validator/ProjectDetailsValidation";
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import { AHA } from "../constants";
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import ahaLogoSymbol from 'dan-images/ahaLogoSymbol.png';
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../../utils/constants";
import Loader from "../../Loader"

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
    width: "100%",
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
    paddingTop: '20px !important',
    paddingBottom: '0px !important',
    '& button': {
      marginTop: '8px',
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
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  // });
}));

const ProjectDetailsAndHazard = () => {
  // class ObservationInitialNotification extends Component {
  const { id } = useParams();
  const history = useHistory();

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

  const areaName = [
    'Area1',
  ];

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);
  const [levelLenght, setLevelLenght] = useState(0)
  const [isNext, setIsNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [workArea, setWorkArea] = useState("")
  const [projectBreakout, setProjectBreakout] = useState('')
  const [isDateShow, setIsDateShow] = useState(false)
  const [Teamform, setTeamForm] = useState([{
    "teamName": "",
    "status": "Active",
    "createdBy": parseInt(userId),
    "fkAhaId": 0
  }]);
  const [hazardForm , setHazardForm] = useState([])
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectBreakDown, setSelectBreakDown] = useState([]);
  const [checkGroups, setCheckListGroups] = useState([])
  const radioDecide = ['Yes', 'No']
  const [error, setError] = useState({});
  const permitType = useRef([])

  const handleTeamName = (e, key) => {
    const temp = [...Teamform];
    const value = e.target.value;
    temp[key]["teamName"] = value;
    setTeamForm(temp);
  };

  const handleAdd = (e) => {
    if (Object.keys(Teamform).length < 100) {
      setTeamForm([...Teamform, {
        "teamName": "",
        "status": "Active",
        "createdBy": parseInt(userId),
        "fkAhaId": 0
      }]);
    }
  };
  const handelRemove = async (e, index) => {

    if (Teamform.length > 1) {
      if (Teamform[index].id !== undefined) {
        const res = await api.delete(
          `/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[index].id}/`
        );
      }
      let temp = Teamform;
      let newData = Teamform.filter((item, key) => key !== index);
      await setTeamForm(newData);
    };
  }

  const checkList = async () => {
    const temp = {}
    const res = await api.get("/api/v1/core/checklists/aha-hazards/1/")
    const checklistGroups = res.data.data.results[0].checklistGroups
    checklistGroups.map((value) => {
      temp[value["checkListGroupName"]] = []
      value.checkListValues.map((checkListOptions) => {
        let checkObj = {}
        if (checkListOptions !== undefined) {
          checkObj["inputLabel"] = checkListOptions.inputLabel
          checkObj["inputValue"] = checkListOptions.inputValue
          checkObj["id"] = checkListOptions.id
          temp[value["checkListGroupName"]].push(checkObj)
        }
      })
    })
    await setCheckListGroups(temp)
    await setIsLoading(true)
  }


  const [form, setForm] = useState(
    {
      "fkCompanyId": parseInt(fkCompanyId),
      "fkProjectId": parseInt(project.projectId),
      "fkProjectStructureIds": fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
      "workArea": "",
      "location": "",
      "assessmentDate": new Date().toISOString().split('T')[0],
      "permitToPerform": "",
      "permitNumber": "",
      "ahaNumber": "",
      "description": "",
      "workStopCondition": "",
      "department": "",
      "notifyTo": "null",
      "additionalRemarks": "",
      "classification": "string",
      "picApprovalUser": "",
      "picApprovalDateTime": null,
      "signedUser": "",
      "signedDateTime": "2021-08-17T09:55:30.900000Z",
      "anyLessonsLearnt": "",
      "lessonLearntDetails": "",
      "lessonLearntUserName": "",
      "ahaStatus": "",
      "ahaStage": "",
      "typeOfPermit" : "",
      "badgeNumber": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "source": "Web",
      "vendor": "string",
      "vendorReferenceId": "string"
    }
  )

  const handleSubmit = async (e) => {
    const { error, isValid } = ProjectDetailsValidator(form, selectDepthAndId);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
    let fkProjectStructureId = uniqueProjectStructure.map(depth => {
      return depth;
    }).join(':')
    form["fkProjectStructureIds"] = fkProjectStructureId

    let structName = []
    let projectStructId = fkProjectStructureId.split(":")

    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${project.projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0]["structureName"])
    }
    form["workArea"] = structName[structName.length - 1]
    
    await setLoading(true);
    if (form.id) {
      delete form["ahaAssessmentAttachment"]
      form['updatedBy'] = userId
      const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `, form)
      for (let i = 0; i < Teamform.length; i++) {
        if (Teamform[i].id) {
          const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[i].id}/`, Teamform[i]);
        } else {
          Teamform[i]["fkAhaId"] = localStorage.getItem("fkAHAId");
          if (Teamform[i].teamName !== "") {
            const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`, Teamform[i]);
          }   
        }
      }
    } else {
      if(form['permitToPerform'] === "No"){
        form['typeOfPermit']  = ""
        form['permitNumber'] = ""
      }
      form['ahaStage'] = "Assessment"
      form['ahaStatus'] = "Pending"
      const res = await api.post("/api/v1/ahas/", form)
      if (res.status === 201) {
        let fkAHAId = res.data.data.results.id
        let fkProjectStructureIds = res.data.data.results.fkProjectStructureIds
        localStorage.setItem("fkAHAId", fkAHAId)
        handelCommonObject("commonObject", "aha", "projectStruct", fkProjectStructureIds)

        for (let i = 0; i < Teamform.length; i++) {
          Teamform[i]["fkAhaId"] = localStorage.getItem("fkAHAId");
          if (Teamform[i].teamName !== "") {
            const res = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`, Teamform[i]);
          }
        }
      }
    }
    for (let i = 0; i < hazardForm.length; i++){
      hazardForm[i]["fkAhaId"] = localStorage.getItem("fkAHAId")

    }
    for (let i = 0; i < otherHazards.length; i++){
      otherHazards[i]["fkAhaId"] = localStorage.getItem("fkAHAId")
    }
    let hazardNew = []
    let hazardUpdate = []
    let allHazard = [hazardForm, otherHazards]
    
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

    const resHazardUpdate = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`, hazardUpdate)
    
    const resHazardNew = await api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/bulkhazards/`, hazardNew)
    
    history.push("/app/pages/aha/assessments/assessment")
  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handelClose = () => {
    setIsDateShow(false)
    return true
  }

  const handelSelectOption = (hazard, checklistId) => {
    for (let i = 0; i <= hazardForm.length; i++) {
      if (hazardForm[i] != undefined && hazardForm[i]["hazard"] == hazard && hazardForm[i]["fkChecklistId"] == checklistId) {
        return true
      }
    }
  }
  const handlePhysicalHazards = (e, index, value, checkListID) => {
    let temp = [...hazardForm]
    let tempRemove = []
    if (e.target.checked == false) {
      temp.map((ahaValue, index) => {
        if (ahaValue['fkChecklistId'] === checkListID) {
          temp.splice(index, 1);
          fetchOption.splice(index, 1);
        }
      })
    }
    else if (e.target.checked) {
      temp.push({
        "fkChecklistId": checkListID,
        "hazard": value,
        "risk": "",
        "severity": "",
        "probability": "",
        "riskRating": "",
        "control": "",
        "residualRisk": "",
        "approveToImplement": "",
        "monitor": "",
        "status": "Active",
        "createdBy": parseInt(userId),
        "fkAhaId": localStorage.getItem("fkAHAId"),
      })
    }
    setHazardForm(temp)

  };

  const [otherHazards, setOtherHazards] = useState([
    {
      "hazard": "",
      "risk": "",
      "severity": "",
      "probability": "",
      "riskRating": "",
      "control": "",
      "residualRisk": "",
      "approveToImplement": "",
      "monitor": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "fkAhaId": localStorage.getItem("fkAHAId")
    }
  ])

  const handleOtherHazards = async (e, key) => {
    const temp = [...otherHazards];
    const value = e.target.value;
    temp[key]["hazard"] = value;
    setOtherHazards(temp);

  }

  const handleOtherAdd = (e) => {
    if (Object.keys(otherHazards).length < 100) {
      setOtherHazards([...otherHazards, {
        "hazard": "",
        "risk": "",
        "severity": "",
        "probability": "",
        "riskRating": "",
        "control": "",
        "residualRisk": "",
        "approveToImplement": "",
        "monitor": "",
        "status": "Active",
        "createdBy": parseInt(userId),
        "fkAhaId": localStorage.getItem("fkAHAId")
      }]);
    }
  };

  const handelOtherRemove = async (e, index) => {
    if (otherHazards.length > 1) {
      if (otherHazards[index].id !== undefined) {
      }
      let temp = otherHazards;
      let newData = otherHazards.filter((item, key) => key !== index);
      await setOtherHazards(newData);
    };
  }

  const projectData = JSON.parse(localStorage.getItem("projectName"));

  const fetchCallBack = async () => {
    setSelectBreakDown([])
    for (var key in projectData.projectName.breakdown) {

      if (key == 0) {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[0].structure[0].url
            }`,
          headers: HEADER_AUTH,
        };
        await axios(config)
          .then(async (response) => {
            await setBreakdown1ListData([
              {
                breakdownLabel:
                  projectData.projectName.breakdown[0].structure[0].name,
                breakdownValue: response.data.data.results,
                selectValue: ""
              },
            ]);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const fetchAhaData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/`)
    const result = res.data.data.results;
    await setForm(result)
    await fetchBreakDownData(result.fkProjectStructureIds)
  }

  const handleBreakdown = async (e, index, label, selectvalue) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));

    const value = e.target.value;

    const temp = [...fetchSelectBreakDownList]
    temp[index]["selectValue"].id = value
    for (var i in temp) {
      if (i > index) {
        temp[i].breakDownData = []
        temp[i].selectValue.id = ""
      }

    }
    let tempDepthAndId = selectDepthAndId;
    let dataDepthAndId = tempDepthAndId.filter(filterItem => filterItem.slice(0, 2) !== `${index + 1}L`)
    let sliceData = dataDepthAndId.slice(0, index)
    let newdataDepthAndId = [...sliceData, `${index + 1}L${value}`]
    setSelectDepthAndId(newdataDepthAndId)
    // await setFetchSelectBreakDownList(removeTemp)
    if (projectData.projectName.breakdown.length !== index + 1) {
      for (var key in projectData.projectName.breakdown) {
        if (key == index + 1) {
          await api.get(`${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${value}`)
            .then(function (response) {
              if (response.status === 200) {
                temp[key].breakDownData = response.data.data.results
                setBreakdown1ListData(temp)
              }
            })
            .catch(function (error) {
            });
        }
      }
    }
  };

  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    let breakdownLength = projectData.projectName.breakdown.length
    setLevelLenght(breakdownLength)
    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(':');
    setSelectDepthAndId(breakDown)
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
                  ...selectBreakDown, {
                    breakDownLabel: projectData.projectName.breakdown[0].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }
                ];
              }
            });
            setFetchSelectBreakDownList(selectBreakDown)
          })
          .catch((error) => {

            setIsNext(true);
          });
      } else {
        var config = {
          method: "get",
          url: `${SSO_URL}/${projectData.projectName.breakdown[key].structure[0].url
            }${breakDown[key - 1].substring(2)}`,
          headers: HEADER_AUTH,
        };

        await api(config)
          .then(async (response) => {

            const result = response.data.data.results;

            const res = result.map((item, index) => {
              if (parseInt(breakDown[key].slice(2)) == item.id) {
                selectBreakDown = [
                  ...selectBreakDown,
                  {
                    breakDownLabel: projectData.projectName.breakdown[key].structure[0].name,
                    selectValue: { depth: item.depth, id: item.id, name: item.name, label: projectData.projectName.breakdown[key].structure[0].name },
                    breakDownData: result
                  }
                ];
              }
            });
            setFetchSelectBreakDownList(selectBreakDown)
          })
          .catch((error) => {
            console.log(error)
            setIsNext(true);
          });
      }
    }
  };

  const fetchTeamData = async () => {
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`)
    const result = res.data.data.results
    await setTeamForm(result)
  }

  const handelUpdate = async () => {
    const temp = {}
    // const jhaId = handelJhaId()
    const otherNoId = []
    const tempForm = []
    const res = await api.get(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/areahazards/`)
    const apiData = res.data.data.results
    apiData.map((value) => {
      if (value.fkChecklistId !== 0) {
        tempForm.push(value)
      } else {
        otherNoId.push(value)
      }
    })
    setHazardForm(tempForm)

    // setForm(apiData)
    setFetchedOptions(apiData)
    if (otherNoId.length > 0) {
      setOtherHazards(otherNoId)
    }
    apiData.map((value) => {
      if (value.hazard in temp) {
        temp[value.hazard].push(value.risk)
      } else {
        temp[value.hazard] = [value.risk]
      }
    })
    await setIsLoading(true);
  }
  let pickListValues = JSON.parse(localStorage.getItem("pickList"))

  const pickListValue = async () => {
    permitType.current = await pickListValues["81"]
  }


  const classes = useStyles();
  useEffect(() => {
  
    if(id){
    fetchCallBack()
    pickListValue()
    fetchAhaData()
    fetchTeamData()
    handelUpdate()
    checkList()
      }else{
        fetchCallBack()
    pickListValue()
    checkList()
      }
    
  }, []);
  return (
    <>
        <CustomPapperBlock title="Assessments" icon={ahaLogoSymbol} whiteBg>
        {isLoading ?
          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                    <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c"/>
                  </svg> Project information
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <Typography variant="h6" gutterBottom className={classes.labelName}>
                        Project
                      </Typography>
                      <Typography className={classes.labelValue}>
                        {project.projectName}

                      </Typography>
                    </Grid>
                      {id ?
                        fetchSelectBreakDownList.map((data, key) =>
                          <Grid item xs={3} md={3} key={key}>
                            <FormControl
                              error={error && error[`projectStructure${[key]}`]}
                              variant="outlined"
                              required
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                {data.breakDownLabel}
                              </InputLabel>
                              <Select
                                labelId="incident-type-label"
                                id="incident-type"
                                label={data.breakDownLabel}
                                value={data.selectValue.id || ""}
                                disabled={data.breakDownData.length === 0}

                                onChange={(e) => {
                                  handleBreakdown(e, key, data.breakDownLabel, data.selectValue);
                                }}
                              >
                                {data.breakDownData.length !== 0
                                  ? data.breakDownData.map((selectvalues, index) => (
                                    <MenuItem key={index}
                                      value={selectvalues.id}>
                                      {selectvalues.structureName}
                                    </MenuItem>
                                  ))
                                  : null}
                              </Select>
                              {error && error[`projectStructure${[key]}`] && (
                                <FormHelperText>
                                  {error[`projectStructure${[key]}`]}
                                </FormHelperText>
                              )}
                            </FormControl>
                          </Grid>
                        ) : <ProjectStructureInit
                          selectDepthAndId={selectDepthAndId}
                          setLevelLenght={setLevelLenght}
                          error={error}
                          setWorkArea={setWorkArea}
                          setSelectDepthAndId={setSelectDepthAndId} />
                      }
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35.2" height="30.626" viewBox="0 0 40.2 30.626">
                      <g id="project-work" transform="translate(0.005)">
                        <path id="Path_5191" data-name="Path 5191" d="M37.827,11.584l.981.981a.665.665,0,0,1,0,.939l-.792.792a5.287,5.287,0,0,1,.491,1.309h1.024a.665.665,0,0,1,.664.664v1.387a.665.665,0,0,1-.664.664H38.412a5.255,5.255,0,0,1-.579,1.269l.726.723a.665.665,0,0,1,0,.939l-.981.981a.665.665,0,0,1-.939,0l-.792-.792a5.114,5.114,0,0,1-1.309.491v1.024a.665.665,0,0,1-.664.664H32.488a.665.665,0,0,1-.664-.664V21.836a5.255,5.255,0,0,1-1.269-.579l-.723.726a.665.665,0,0,1-.939,0L27.911,21a.665.665,0,0,1,0-.939l.792-.792a5.161,5.161,0,0,1-.491-1.309H27.188a.665.665,0,0,1-.664-.664V15.912a.665.665,0,0,1,.664-.664h1.119a5.255,5.255,0,0,1,.579-1.269l-.723-.723a.665.665,0,0,1,0-.939l.981-.981a.665.665,0,0,1,.939,0l.792.792a5.16,5.16,0,0,1,1.309-.491V10.612a.665.665,0,0,1,.664-.664h1.387a.665.665,0,0,1,.664.664v1.116a5.255,5.255,0,0,1,1.269.579l.723-.723a.661.661,0,0,1,.936,0ZM1.142,23a3.671,3.671,0,0,1,2.637-1.371V.991c-3.01.294-2.66,3.078-2.643,5.666,0,.347.007.53.007.615V23Zm8.4-14.3h5.78V26.3h-6.2V8.708h.415Zm1.083,14.908h1.116V24.2H10.622v-.582Zm0-1.623h1.116v.582H10.622v-.582Zm0-1.642h1.116v.582H10.622v-.582Zm0-1.639h1.852v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.642h1.116v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.639h1.116v.582H10.622v-.582Zm0-1.626h1.852v.582H10.622v-.582Zm3.863-.991H9.955V25.461h4.531V9.536ZM23.057,12.5V26.177H19.229V12.5h-.016l.131-.265,1.58-3.248.16-.33.167.327,1.685,3.248.141.272h-.02v0ZM19.8,12.13h2.666l-1.06-2.041H20.8L19.8,12.13ZM4.91,3.955H33.119a.773.773,0,0,1,.556.232.784.784,0,0,1,.232.556V7.03H32.445V5.247H4.91V22.2h0a.478.478,0,0,1-.409.474c-4.3.664-4.488,5.758-.128,6.487H32.445V27.021h1.462v2.813a.784.784,0,0,1-.232.556l0,0h0a.784.784,0,0,1-.556.232H4.338a5.021,5.021,0,0,1-3.494-1.9A5.631,5.631,0,0,1,.007,25.14V6.66C-.013,3.5-.036.079,4.371,0a.317.317,0,0,1,.056,0A.483.483,0,0,1,4.91.484V3.955Zm28.448,10.1a2.728,2.728,0,1,1-2.728,2.728,2.729,2.729,0,0,1,2.728-2.728Z" fill="#06425c"/>
                      </g>
                    </svg> Project details
                  </Typography>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                      >
                        <TextField
                          label="Work Location*"
                          // margin="dense"
                          name="worklocation"
                          id="worklocation"
                          value={form.location ? form.location : ""}
                          error={error.location}
                          helperText={error.location ? error.location : ""}
                          fullWidth
                          onChange={(e) => setForm({ ...form, location: e.target.value })}
                          variant="outlined"
                          className={classes.formControl}
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                        className={classes.formBox}
                      >
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDateTimePicker
                            className={classes.formControl}
                            // margin="dense"
                            fullWidth
                            label="Date & Time*"
                            value={selectedDate}
                            // onChange={handleDateChange}
                            value={form.assessmentDate ? form.assessmentDate :null}
                            error={error.assessmentDate}
                            helperText={error.assessmentDate ? error.assessmentDate : null}
                            inputVariant="outlined"
                            disableFuture="true"
                            format="MM/dd/yyyy"
                            onClick={(e) => setIsDateShow(true)}
                            open={isDateShow}
                            onClose={(e) => handelClose()}
                            onChange={(e) => {
                              setForm({
                                ...form,
                                assessmentDate: moment(e).format("YYYY-MM-DD"),
                              });
                              // console.log(e.target.value)
                            }}
                            InputProps={{ readOnly: true }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                        className={classes.formBox}
                      >
                        <FormControl component="fieldset" error={
                          error && error["permitToPerform"]
                        }>
                          <FormLabel component="legend" className={classes.labelName} >Confirm if AHA required for permit?*</FormLabel>
                          <RadioGroup row aria-label="gender" name="gender1"
                            onChange={(e) => {
                              { setForm({ ...form, permitToPerform: e.target.value }) };
                            }}
                            value={form.permitToPerform ? form.permitToPerform : ""}>
                            {radioDecide.map((value) => (
                              <FormControlLabel value={value} className={classes.labelValue} control={<Radio />} label={value} />
                            ))}
                          </RadioGroup>
                          {error && error["permitToPerform"] && (
                            <FormHelperText>
                              {error["permitToPerform"]}
                            </FormHelperText>
                          )}
                        </FormControl>
                      </Grid>
                      {form.permitToPerform === "Yes" || form.permitToPerform === "" ? <>
                      <Grid item md={6} sm={12} xs={12}>
                        <FormControl
                          variant="outlined"
                          requirement
                          className={classes.formControl}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Type of permit
                          </InputLabel>
                          <Select
                            label="Type of permit"
                            value={form.typeOfPermit ? form.typeOfPermit : ""}
                          >
                            {permitType.current.map(
                              (value) => (
                                <MenuItem
                                  value={value.label}
                                  onClick={(e) => {setForm({...form,typeOfPermit:value.label})}}
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
                        md={6}
                        xs={12}
                        className={classes.formBox}
                      >
                        <TextField
                          label="Permit Reference"
                          // margin="dense"
                          name="reference"
                          id="reference"
                          multiline
                          value={form.permitNumber ? form.permitNumber : ""}
                          fullWidth
                          onChange={(e) => {
                            { setForm({ ...form, permitNumber: e.target.value }) };
                          }}
                          variant="outlined"
                          className={classes.formControl}
                        />
                      </Grid>
                      </>:null}
                      <Grid
                        item
                        md={12}
                        xs={12}
                        className={classes.formBox}
                      >
                        <TextField
                          label="Description of area*"
                          // margin="dense"
                          name="description"
                          id="description"
                          multiline
                          error={error.description}
                          helperText={error.description ? error.description : ""}
                          rows={4}
                          value={form.description ? form.description : ""}
                          fullWidth
                          onChange={(e) => {
                            { setForm({ ...form, description: e.target.value }) };
                          }}
                          variant="outlined"
                          className={classes.formControl}
                        />
                      </Grid>
                      <Grid
                        item
                        md={12}
                        xs={12}
                        className={classes.createHazardbox}
                        style={{ marginTop: '12px' }}
                      >
                        <Typography variant="h6" gutterBottom className={classes.labelName}>Risk Assessment Team</Typography>
                      </Grid>
                      {Teamform.map((value, index) => (<>
                        <Grid
                          item
                          md={6}
                          xs={11}
                          className={classes.createHazardbox}
                        >

                          <TextField
                            label={`Name ${index + 1}`}
                            // margin="dense"
                            name="arename"
                            id="arename"
                            multiline
                            value={Teamform[index].teamName || ""}
                            fullWidth
                            variant="outlined"
                            className={classes.formControl}
                            onChange={(e) => { handleTeamName(e, index) }
                            }
                          />


                        </Grid>
                        {Teamform.length > 1 ?
                          (<Grid item md={1} className={classes.createHazardbox}>
                            <IconButton
                              variant="contained"
                              color="primary"
                              onClick={(e) => { handelRemove(e, index) }}
                            >
                              <DeleteForeverIcon />
                            </IconButton>
                          </Grid>) : null}

                      </>))}
                      <Grid item md={12} className={classes.createHazardbox}>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleIcon />}
                          className="marginT0"
                          onClick={() => { handleAdd() }}
                        >
                          Add new
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Typography variant="h6" className="sectionHeading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32.665" height="25.557" viewBox="0 0 32.665 25.557">
                      <g id="placeholder-on-map-paper-in-perspective-svgrepo-com" transform="translate(0.001 -66.585)">
                        <path id="Path_5201" data-name="Path 5201" d="M27.557,81.046l5.03,10.332a.49.49,0,0,1-.478.764H.555a.49.49,0,0,1-.478-.764l5.03-10.332a.583.583,0,0,1,.478-.3H9.9a.6.6,0,0,1,.4.184c.293.338.591.668.888,1,.282.31.566.625.847.947H6.914a.582.582,0,0,0-.478.3L3.1,90.017H29.56l-3.332-6.845a.582.582,0,0,0-.478-.3h-5.13c.281-.322.565-.636.848-.947.3-.328.6-.658.891-1a.6.6,0,0,1,.4-.183H27.08A.582.582,0,0,1,27.557,81.046Zm-3.831-7.061c0,5.646-4.7,6.7-6.91,12.13a.528.528,0,0,1-.98,0c-1.994-4.892-6.012-6.233-6.781-10.591a7.561,7.561,0,0,1,6.551-8.9A7.4,7.4,0,0,1,23.726,73.985Zm-3.492,0a3.908,3.908,0,1,0-3.908,3.908A3.908,3.908,0,0,0,20.234,73.985Z" transform="translate(0)" fill="#06425c"/>
                      </g>
                    </svg> Area hazard
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                  <Paper elevation={1} className="paperSection">
                    <Grid container spacing={3}>
                    {Object.entries(checkGroups).map(([key, value]) => (
                        <Grid item md={6}
                          xs={12}
                          className={classes.formBox}>
                          <FormControl component="fieldset">
                          <FormLabel className="checkRadioLabel" component="legend">{key}</FormLabel>
                            <FormGroup>
                              {value.map((option) => (
                                <FormControlLabel
                                  control={<Checkbox name={option.inputLabel} />}
                                  label={option.inputLabel}
                                  checked={handelSelectOption(option.inputLabel, option.id)}
                                  onChange={async (e) => handlePhysicalHazards(e, key, option.inputLabel, option.id)}
                                />
                              ))}
                            </FormGroup>
                          </FormControl>
                        </Grid>
                      ))}

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
                                onClick={(e) => handelOtherRemove(e, index)}
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
                          onClick={() => { handleOtherAdd() }}
                        >
                          Add new
                        </Button>
                      </Grid>
                      </Grid>
                      </Paper>
                </Grid>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Details"
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
              style={{ marginTop: '15px' }}
            >
              <div className={classes.loadingWrapper}>
                <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle"
                  onClick={(e) => handleSubmit()}
                  className="spacerRight buttonStyle"
                  color="primary"
                  style={{ marginLeft: "10px" }}
                  disabled={loading}
                >
                  Next
                </Button>
                {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              </div>
              <Button 
                size="medium"  
                variant="contained"
                color="secondary" 
                className="buttonStyle custmCancelBtn" 
                onClick={(e) => history.goBack()}
                >
                Cancel
              </Button> 
            </Grid>

          </Grid>
           : <Loader/>}
          </CustomPapperBlock>
    </>
    
  );
};

export default ProjectDetailsAndHazard;