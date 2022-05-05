import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { Button, FormHelperText, Grid, Select, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AccessTime from '@material-ui/icons/AccessTime';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
    KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker
} from '@material-ui/pickers';
import axios from 'axios';
import { PapperBlock } from 'dan-components';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import { Col, Row } from "react-grid-system";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import api from "../../../../utils/axios";
import { handelCommonObject } from '../../../../utils/CheckerValue';
import { access_token, ACCOUNT_API_URL, HEADER_AUTH, SSO_URL } from "../../../../utils/constants";
import FormSideBar from '../../../Forms/FormSideBar';
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import { handelJhaId } from "../Utils/checkValue";
import { JHA_FORM, JHA_FORM_COMBINE } from "../Utils/constants";
import JobDetailsValidate from '../Validation/JobDetailsValidate';
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';
import jhaLogoSymbol from 'dan-images/jhaLogoSymbol.png';
import Loader from "../../Loader"
import Acl from '../../../../components/Error/acl';





const useStyles = makeStyles((theme) => ({
    // const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
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
    },
    createHazardbox: {
        paddingTop: '0px !important',
        paddingBottom: '0px !important',
        '& button': {
            marginTop: '8px',
        },
    },
    loader: {
        marginLeft: "20px"

    },
    buttonProgress: {
        // color: "green",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -75,
    },
    loadingWrapper: {
        margin: theme.spacing(1),
        position: "relative",
        display: "inline-flex",
    },
    // });
}));

const JobDetails = (props) => {

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

    const [form, setForm] = useState(
        {
            "fkCompanyId": parseInt(fkCompanyId),
            "fkProjectId": parseInt(project.projectId),
            "fkProjectStructureIds": fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
            "workArea": "",
            "location": "",
            "jhaAssessmentDate": new Date().toISOString().split('T')[0],
            "permitToPerform": "",
            "typeOfPermit": "",
            "permitNumber": "",
            "jobTitle": "",
            "description": "",
            "department": "",
            "additionalRemarks": "",
            "classification": "0",
            "jobOrderNumber": "",
            "supervisorName": "",
            "emergencyNumber": "",
            "evacuationAssemblyPoint": "",
            "jhaStatus": "Open",
            "jhaStage": "Open",
            "badgeNumber": "",
            "status": "Active",
            "createdBy": parseInt(userId),
            "source": "Web",
            "vendor": "",
            "vendorReferenceId": ""
        }
    )

    const { id } = useParams();
    const history = useHistory();
    const history_state = history.location.state; 
    console.log(history.location.state);
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [submitLoader, setSubmitLoader] = useState(false)

    // getting breakdown values form header
    // getting breakdown value form page
    const [levelLenght, setLevelLenght] = useState("")

    const [isNext, setIsNext] = useState([])

    const [breakdown1ListData, setBreakdown1ListData] = useState([]);
    const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([])
    const [selectDepthAndId, setSelectDepthAndId] = useState([]);
    const radioDecide = ["Yes", "No"]
    const [checkUpdate, setUpdate] = useState(false)
    const [workArea, setWorkArea] = useState("")
    const [departmentName, setDepartmentName] = useState([])
    const [isDateShow, setIsDateShow] = useState(false)
    const [formHazard, setFormHazard] = useState([])
    const [formPpe, setFormPpe] = useState([])

    const [checkGroups, setCheckListGroups] = useState([])

    const [checkGroupsControl, setCheckListGroupsControl] = useState([])

    const [selectedOptions, setSelectedOption] = useState({})
    const [fetchOptionHazard, setFetchedOptionsHazard] = useState([])
    const [submitLoaderHazard, setSubmitLoaderHazard] = useState(false)
    const [otherHazards, setOtherHazards] = useState([
        {
            "hazard": "",
            "risk": "",
            "control": "",
            "humanPerformanceAspects": "string",
            "status": "Active",
            "createdBy": 0,
            "fkJhaId": localStorage.getItem("fkJHAId")
        }
    ])
    const [loadingHazard, setLoadingHazard] = useState(false)
    // const history = useHistory()

    // fecth jha data
    const fetchJhaData = async () => {
        const jhaId = handelJhaId()
        if (jhaId !== null) {
            const res = await api.get(`/api/v1/jhas/${jhaId}/`)
            const result = res.data.data.results;
            result.id !== undefined ? setUpdate(true) : checkUpdate(false)
            await setForm(result)
            await fetchBreakDownData(result.fkProjectStructureIds)
        }
    }

    // fetching jha team data
    const fetchTeamData = async () => {
        const jhaId = handelJhaId()
        if (jhaId !== null) {
            const res = await api.get(`/api/v1/jhas/${jhaId}/teams/`)
            const result = res.data.data.results
            await setTeamForm(result)
        }
    }

    const handleBreakdown = async (e, index, label, selectvalue) => {
        const projectData = JSON.parse(localStorage.getItem('projectName'));

        const value = e.target.value;

        const temp = [...fetchSelectBreakDownList]
        temp[index]["selectValue"].id = value
        // let removeTemp = temp.slice(0, index)
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
                        await setIsLoading(true);
                        // console.log(result)
                        result.map((item) => {
                            if (breakDown[key].slice(2) == item.id) {
                                // console.log("here")
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
                        setIsNext(true);
                    });
            }
        }
    };

    const [Teamform, setTeamForm] = useState([{
        "teamName": "",
        "status": "Active",
        "createdBy": parseInt(userId),
        "fkJHAId": 0
    }]);

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
                "fkJHAId": 0
            }]);
        }
    };

    const handelRemove = async (e, index) => {

        if (Teamform.length > 1) {
            if (Teamform[index].id !== undefined) {
                const res = await api.delete(
                    `/api/v1/jhas/${localStorage.getItem("fkJHAId")}/teams/${Teamform[index].id}/`
                );
            }
            let temp = Teamform;
            let newData = Teamform.filter((item, key) => key !== index);
            await setTeamForm(newData);
        };
    }

    const fetchDepartment = () => {
        let filterDepartmentName = []
        const config = {
            method: "get",
            url: `${ACCOUNT_API_URL}api/v1/companies/1/departments/`,
            headers: {
                Authorization: `Bearer ${access_token}`,
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
                    }
                    setDepartmentName([...filterDepartmentName, "Others"])
                }
            })
            .catch((error) => {
            });
    };

    const handelClose = () => {
        setIsDateShow(false)
        return true
    }

    const handelNavigate = () => {
        history.push(`${JHA_FORM["Assessment"]}`)
    }

    const handelApiError = () => {
        setSubmitLoader(false)
        history.push("/app/pages/error")
    }

    const handelProjectData = () => {
        const uniqueProjectStructure = [... new Set(selectDepthAndId)]
        let fkProjectStructureId = uniqueProjectStructure.map(depth => {
            return depth;
        }).join(':')

        form["fkProjectStructureIds"] = fkProjectStructureId
        form["workArea"] = Array.isArray(workArea) ? workArea[0] : workArea
    }

    const handelTeam = async (CreatedJhaId) => {
        for (let i = 0; i < Teamform.length; i++) {
            let apiEndPoint = `/api/v1/jhas/${CreatedJhaId}/teams`
            if (Teamform[i].id) {
                const res = await api.put(`${apiEndPoint}/${Teamform[i].id}/`, Teamform[i]).then().catch(() => handelApiError())
            } else {
                Teamform[i]["fkJhaId"] = CreatedJhaId;
                if (Teamform[i].teamName !== "") {
                    const res = await api.post(`${apiEndPoint}/`, Teamform[i]).then().catch(() => handelApiError())
                    if (res.status === 200) {
                        // handelNavigate()
                    }
                } else {
                    // handelNavigate()
                }
            }
        }
    }

    const handleSubmit = async (e) => {
        let newJhaId = ""
        const { error, isValid } = await JobDetailsValidate(form, selectDepthAndId);
        await setError(error);
        if (!isValid) {
            return "Data is not valid";
        }
        await setSubmitLoader(true)
        setSubmitLoaderHazard(true)
        await handelProjectData()
        delete form["jhaAssessmentAttachment"]
        form["qrCodeUrl"] = undefined
        if (form.id != null && form.id != undefined) {
            const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/`, form)
            console.log(res,'res1')
            let CreateJhaId = res.data.data.results.id
            newJhaId = CreateJhaId
            handelTeam(CreateJhaId)
        } 
        else {
            const res = await api.post("/api/v1/jhas/", form)
            let CreateJhaId = res.data.data.results.id
            localStorage.setItem("fkJHAId", CreateJhaId)
            newJhaId = CreateJhaId
            handelTeam(CreateJhaId)
        }
        await handelCommonObject("commonObject", "jha", "projectStruct", form.fkProjectStructureIds)
        await setSubmitLoader(false)
        await setSubmitLoaderHazard(false)
        await handleSubmitHazard(newJhaId)
    }

    const classes = useStyles();

    const handelUpdateHazard = async () => {
        const temp = {}
        const otherNoId = []
        const tempForm = []
        const jhaId = handelJhaId()
        if (jhaId !== null) {
            const res = await api.get(`/api/v1/jhas/${jhaId}/jobhazards/`)
            const apiData = res.data.data.results
            apiData.map((value) => {
                if (value.fkChecklistId !== 0) {
                    tempForm.push(value)
                } else {
                    otherNoId.push(value)
                }
            })
            setFormHazard(tempForm)
            if (otherNoId.length > 0) {
                setOtherHazards(otherNoId)
            }
            setFetchedOptionsHazard(apiData)
            apiData.map((value) => {
                if (value.hazard in temp) {
                    temp[value.hazard].push(value.risk)
                } else {
                    temp[value.hazard] = [value.risk]
                }
            })
            setSelectedOption(temp)
        }
    }

    const checkList = async () => {
        const temp = {}
        const project = JSON.parse(localStorage.getItem("projectName"))
        const projectId = project.projectName.projectId
        // const res = await api.get(`/api/v1/core/checklists/jha-safety-hazards-ppe-checklist/${projectId}/`)
        const res = await api.get(`/api/v1/core/checklists/jha-safety-hazards/${projectId}/`)
        
        const checklistGroups = res.data.data.results[0].checklistGroups
        checklistGroups.map((value) => {
            temp[value["checkListGroupName"]] = []
            value.checkListValues.map((checkListOptions) => {
                let checkObj = {}
                if (checkListOptions !== undefined) {
                    checkObj["inputLabel"] = checkListOptions.inputLabel
                    checkObj["inputValue"] = checkListOptions.inputValue
                    checkObj["checkListId"] = checkListOptions.id
                    temp[value["checkListGroupName"]].push(checkObj)
                }
            })
        })
        setCheckListGroups(temp)
    }

    const checkListControl = async () => {
        const temp = {}
        const project = JSON.parse(localStorage.getItem("projectName"))
        const projectId = project.projectName.projectId
        const res = await api.get(`/api/v1/core/checklists/jha-safety-ppe-checklist/${projectId}/`)
        // https://dev-safety-api.paceos.io/api/v1/core/checklists/jha-safety-ppe-checklist/<projectId>/
        const checklistGroupsControls = res.data.data.results[0].checklistGroups
        checklistGroupsControls.map((value) => {
            temp[value["checkListGroupName"]] = []
            value.checkListValues.map((checkListOptions) => {
                let checkObj = {}
                if (checkListOptions !== undefined) {
                    checkObj["inputLabel"] = checkListOptions.inputLabel
                    checkObj["inputValue"] = checkListOptions.inputValue
                    checkObj["checkListId"] = checkListOptions.id
                    temp[value["checkListGroupName"]].push(checkObj)
                }
            })
        })
        setCheckListGroupsControl(temp)
    }

    const handleAddHazard = (e) => {
        if (Object.keys(otherHazards).length < 100) {
            setOtherHazards([...otherHazards, {
                "hazard": "",
                "risk": "",
                "control": "",
                "humanPerformanceAspects": "string",
                "status": "Active",
                "createdBy": 0,
                "fkJhaId": localStorage.getItem("fkJHAId")
            }]);
        }
    };

    const handelRemoveHazard = async (e, index) => {
        if (otherHazards.length > 1) {
            let temp = otherHazards;
            let newData = otherHazards.filter((item, key) => key !== index);
            await setOtherHazards(newData);
        };
    }

    const handleOtherHazards = (e, key) => {
        const temp = [...otherHazards];
        const value = e.target.value;
        temp[key]["hazard"] = value;
        setOtherHazards(temp);
    };

    const handlePhysicalHazards = async (e, checkListId, hazard_value) => {
        let temp = [...formHazard]
        if (e.target.checked == false) {
            temp.map((jhaValue, index) => {
                if (jhaValue['fkChecklistId'] === checkListId) {
                    temp.splice(index, 1);
                    fetchOptionHazard.splice(index, 1);

                }
            })
        }
        else if (e.target.checked) {
            temp.push({
                "fkChecklistId": checkListId,
                "hazard": hazard_value,
                "risk": "",
                "control": "",
                "humanPerformanceAspects": "string",
                "status": "Active",
                "createdBy": 0,
                "fkJhaId": localStorage.getItem("fkJHAId"),
            })
        }
        await setFormHazard(temp)
    };

    const handlePhysicalPpe = async (e, checkListId, hazard_value) => {
        let temp = [...formPpe]
        if (e.target.checked == false) {
            temp.map((jhaValue, index) => {
                if (jhaValue['fkChecklistId'] === checkListId) {
                    temp.splice(index, 1);
                    fetchOptionHazard.splice(index, 1);

                }
            })
        }
        else if (e.target.checked) {
            temp.push({
                "fkChecklistId": checkListId,
                "hazard": "N/A",
                "risk": "",
                "control": "",
                "safetyChecks": hazard_value,
                "humanPerformanceAspects": "string",
                "status": "Active",
                "createdBy": 0,
                "fkJhaId": localStorage.getItem("fkJHAId"),
            })
        }
        await setFormPpe(temp)
    };

    const handelSelectOption = (checklistId, hazard) => {
        for (let i = 0; i <= formHazard.length; i++) {
            if (formHazard[i] != undefined && formHazard[i]["hazard"] == hazard && formHazard[i]["fkChecklistId"] == checklistId) {
                return true
            }
        }
    }

    const handelSelectOptionPpe = (checklistId, safetyChecks) => {
        for (let i = 0; i <= formHazard.length; i++) {
            if (formHazard[i] != undefined && formHazard[i]["safetyChecks"] == safetyChecks && formHazard[i]["fkChecklistId"] == checklistId) {
                return true
            }
        }
    }

    const handelNavigateHazard = (navigateType) => {
        if (navigateType == "next") {
            history.push("/app/pages/jha/assessments/assessment")
        } else if (navigateType == "previous") {
            history.push("/app/pages/Jha/assessments/project-details/")
        }
    }

    const handelApiErrorHazard = () => {
        setSubmitLoaderHazard(false)
        history.push("/app/pages/error")
    }

    const handleSubmitHazard = async (newJhaId) => {
        let hazardNew = []
        let hazardUpdate = []
        let allHazard = [formHazard, otherHazards, formPpe]

        allHazard.map((values, index) => {
            allHazard[index].map((value) => {
                if (value["id"] == undefined) {
                    if (value["hazard"] !== "") {
                        value["fkJhaId"] = newJhaId
                        hazardNew.push(value)
                    }
                } else {
                    if (value["hazard"] !== "") {
                        hazardUpdate.push(value)
                    }
                }
            })
        })
        const resUpdate = await api.put(`/api/v1/jhas/${newJhaId}/bulkhazards/`, hazardUpdate).catch(() => handelApiErrorHazard())
        const resNew = await api.post(`/api/v1/jhas/${newJhaId}/bulkhazards/`, hazardNew).catch(() => handelApiErrorHazard())
        await handelNavigateHazard("next")
    }

    const [typeOfPremit, setTypeOfPremit] = useState([])
    let pickListValues = JSON.parse(localStorage.getItem("pickList"))

    const pickListValue = async () => {
        setTypeOfPremit(await pickListValues["80"])
    }


    const handelCallBack = async () => {
        await setLoading(true)
        await fetchJhaData()
        await fetchTeamData()
        await fetchDepartment()
        await handelUpdateHazard()
        await checkList()
        await checkListControl()
        await pickListValue()
        await setLoading(false)
    }

    useEffect(() => {
        handelCallBack()
    }, []);

    return (
        <Acl
            module="safety-jha"
            action={history_state ? 'add_jha' : 'change_jha'}
            html={( 
                <CustomPapperBlock title="Assessments" icon='customDropdownPageIcon jsaPageIcon' whiteBg>
            {/* {console.log(departmentName)} */}
            {loading == false ?
                <Row>
                    <Col md={9}>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24.961" height="30.053" viewBox="0 0 30.961 36.053">
                                    <path id="generate-report" d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z" transform="translate(0 0)" fill="#06425c" />
                                </svg> Project information
                            </Typography>
                        </Grid>

                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>

                                    <Grid item md={12} sm={12} xs={12}>
                                        <Typography gutterBottom className="labelName">
                                            Project name
                                        </Typography>
                                        <Typography className="labelValue">
                                            {project.projectName}
                                        </Typography>
                                    </Grid>

                                    {checkUpdate ?
                                        fetchSelectBreakDownList.map((data, key) =>
                                            <Grid item xs={3} md={3} key={key}>
                                                <FormControl
                                                    error={error && error[`projectStructure${[key]}`]}
                                                    variant="outlined"
                                                    required
                                                    fullWidth
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
                                                        fullWidth
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
                                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31">
                                    <g id="Group_5483" data-name="Group 5483" transform="translate(-1177 -226)">
                                        <g id="Group_5477" data-name="Group 5477" transform="translate(626 89)">
                                            <g id="outline-assignment-24px" transform="translate(551 137)">
                                                <g id="Bounding_Boxes">
                                                    <path id="Path_2274" data-name="Path 2274" d="M0,0H31V31H0Z" fill="none" />
                                                </g>
                                                <path id="personal-information" d="M13.971,2.694,18.572,7h-4.6V2.694Zm-9.105,13.6a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519h5.773V16.294Zm0,3.718a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519h5.773V20.012Zm0-11.155a.5.5,0,0,0-.47.519.491.491,0,0,0,.47.519H10.2a.52.52,0,0,0,0-1.038Zm0-3.718a.5.5,0,0,0-.47.519.488.488,0,0,0,.47.519H7.8a.5.5,0,0,0,.47-.519.491.491,0,0,0-.47-.519Zm0,7.438a.52.52,0,0,0,0,1.038h9.028a.5.5,0,0,0,.47-.519.491.491,0,0,0-.47-.519Zm16.27-4.955a.766.766,0,0,0-.557-.737L13.8.282A.754.754,0,0,0,13.206,0H1.379A1.376,1.376,0,0,0,0,1.376V24.953a1.372,1.372,0,0,0,.4.975,1.388,1.388,0,0,0,.975.4H10.66V24.791H1.538V1.541H12.433V7.769a.773.773,0,0,0,.773.773h6.388v5.038h1.543Z" transform="translate(2.325 1.144)" fill="#06425c" />
                                            </g>
                                            <path id="personal-information-2" data-name="personal-information" d="M22.832,27.629c-.136-.211-.388-.5-.388-.756a.4.4,0,0,1,.272-.359c0-.211-.021-.43-.021-.643v-.38a1.294,1.294,0,0,1,.042-.235,1.348,1.348,0,0,1,.606-.77,1.839,1.839,0,0,1,.329-.157c.209-.075.106-.425.333-.43a2.987,2.987,0,0,1,1.75.843,1.36,1.36,0,0,1,.348.876l-.021.939a.3.3,0,0,1,.235.19c.073.3-.235.66-.373.895s-.632.916-.632.921a.186.186,0,0,0,.045.108c.777,1.069,3.053.395,3.053,2.518H20.343c0-2.114,2.283-1.449,3.053-2.518.038-.056.056-.087.054-.11s-.575-.829-.625-.909h0Z" transform="translate(548.748 132.768)" fill="#fff" />
                                        </g>
                                        <g id="construction-engineer" transform="translate(1191 241.5)">
                                            <path id="Path_5202" data-name="Path 5202" d="M0,12.081H3.4V7.893a.35.35,0,0,1,.01-.082C.577,8.215.721,9.52,0,12.081ZM4.306,3.614v.527l.18.247a.226.226,0,0,1,.044.124h0a2.728,2.728,0,0,0,.676,1.844,2.494,2.494,0,0,0,1.4.6,2.254,2.254,0,0,0,1.4-.743,2.991,2.991,0,0,0,.626-1.7.231.231,0,0,1,.033-.1h0l.16-.265,0-.549.472,0,0,.6a.235.235,0,0,1-.034.139L9.1,4.609A3.418,3.418,0,0,1,8.37,6.517a2.728,2.728,0,0,1-1.722.911.236.236,0,0,1-.077,0A2.957,2.957,0,0,1,4.877,6.7a3.119,3.119,0,0,1-.813-2.083l-.173-.237a.239.239,0,0,1-.059-.158v-.6h.474ZM6.477,0a3.22,3.22,0,0,1,.66.068l-.04,1.9L7.789.277A3.235,3.235,0,0,1,9.664,2.694h.374v.444h-.33v.006H3.246V3.138h-.27V2.694H3.29A3.235,3.235,0,0,1,5.262.237l.6,1.7L5.93.047A3.22,3.22,0,0,1,6.477,0ZM6.146,10.562h.721v.721H6.146v-.721Zm0-1.784h.721V9.5H6.146V8.779Zm-2.084,3.3H8.952V7.893a.318.318,0,0,1,.034-.145l-2.479.015L4.028,7.748a.332.332,0,0,1,.034.145v4.188Zm5.557,0h3.4c-.721-2.561-.577-3.866-3.406-4.268a.344.344,0,0,1,.01.082v4.187Z" fill="#06425c" />
                                        </g>
                                    </g>
                                </svg> Job details
                            </Typography>
                        </Grid>

                        {/* job title */}
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.formBox}
                                    >
                                        <TextField
                                            label="Job Title *"
                                            name="jobtitle"
                                            id="jobtitle"
                                            value={form.jobTitle ? form.jobTitle : ""}
                                            error={error.jobTitle}
                                            helperText={error.jobTitle ? error.jobTitle : ""}
                                            fullWidth
                                            onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>

                                    {/* order number */}
                                    <Grid
                                        item
                                        md={6}
                                        xs={11}
                                    >
                                        <TextField
                                            label="Order number"
                                            name="ordernumber"
                                            id="ordernumber"
                                            value={form.jobOrderNumber ? form.jobOrderNumber : ""}
                                            onChange={(e) => setForm({ ...form, jobOrderNumber: e.target.value })}
                                            fullWidth
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>

                                    {/* Department */}
                                    <Grid item md={6} xs={11}>
                                        <TextField
                                            label="Department"
                                            name="department"
                                            id="department"
                                            select
                                            fullWidth
                                            value={form.department ? form.department : ""}
                                            onChange={(e) => setForm({ ...form, department: e.target.value })}
                                            variant="outlined"
                                        >
                                            {departmentName.map((option) => (
                                                <MenuItem key={option}
                                                    value={option}
                                                >
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    {/* location  */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.formBox}
                                    >
                                        <TextField
                                            label="Location *"
                                            name="worklocation"
                                            id="worklocation"
                                            defaultValue=""
                                            value={form.location ? form.location : ""}
                                            error={error.location}
                                            helperText={error.location ? error.location : ""}
                                            fullWidth
                                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>



                                    {/* perform to permit */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.formBox}
                                    >
                                        <FormControl
                                            component="fieldset"
                                        >
                                            <FormLabel
                                                error={error.permitToPerform}
                                                component="legend"
                                                className="checkRadioLabel"
                                            >
                                                Do you have a permit to perform the JSA? *
                                            </FormLabel>
                                            <RadioGroup
                                                style={{ display: 'block' }}
                                                className={classes.customCheckBoxList}
                                                aria-label="permitwork"
                                                id="permitwork"
                                            >
                                                {radioDecide.map((value) => (
                                                    <FormControlLabel
                                                        value={value}
                                                        control={<Radio />}
                                                        label={value}
                                                        checked={form.permitToPerform == value}
                                                        onChange={(e) => setForm({ ...form, permitToPerform: e.target.value })}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        {error && error.permitToPerform && (
                                            <FormHelperText style={{ color: "red" }}>{error.permitToPerform}</FormHelperText>
                                        )}
                                    </Grid>

                                    {/* permit type */}
                                    {form.permitToPerform == "Yes" ? <>
                                        <Grid item md={6} xs={11}>
                                            <TextField
                                                label="Type of permit"
                                                name="typeOfPermit"
                                                id="typeOfPermit"
                                                select
                                                fullWidth
                                                value={form.typeOfPermit ? form.typeOfPermit : ""}
                                                onChange={(e) => setForm({ ...form, typeOfPermit: e.target.value })}
                                                variant="outlined"
                                            >
                                                {typeOfPremit.map((selectValues) => (
                                                    <MenuItem key={selectValues}
                                                        value={selectValues.value}
                                                    >
                                                        {selectValues.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid
                                            item
                                            md={6}
                                            xs={11}
                                        >
                                            <TextField
                                                label="Permit reference number"
                                                name="permintreferencenumber"
                                                id="permintreferencenumber"
                                                value={form.permitNumber ? form.permitNumber : ""}
                                                onChange={(e) => setForm({ ...form, permitNumber: e.target.value })}
                                                fullWidth
                                                variant="outlined"
                                                className={classes.formControl}
                                            />
                                        </Grid>
                                    </>
                                        :
                                        null
                                    }

                                    {/* approval time */}
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                        className={classes.formBox}
                                    >
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                onClick={(e) => setIsDateShow(true)}
                                                className={classes.formControl}
                                                fullWidth
                                                id="jha_assessment_date"
                                                label="Date*"
                                                format="MM/dd/yyyy"
                                                value={form.jhaAssessmentDate}
                                                onChange={(e) => {
                                                    setForm({
                                                        ...form,
                                                        jhaAssessmentDate: moment(e).format("YYYY-MM-DD"),
                                                    });
                                                }}
                                                error={error.jhaAssessmentDate}
                                                helperText={error.jhaAssessmentDate ? error.jhaAssessmentDate : ""}
                                                inputVariant="outlined"
                                                disableFuture="true"
                                                open={isDateShow}
                                                onClose={(e) => handelClose()}
                                            />

                                        </MuiPickersUtilsProvider>
                                    </Grid>

                                    {/* scope work */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.formBox}
                                    >
                                        <TextField
                                            label="Scope of work (Describe all tasks) *"
                                            name="scopeofwork"
                                            id="scopeofwork"
                                            multiline
                                            rows={4}
                                            value={form.description ? form.description : ""}
                                            error={error.description}
                                            helperText={error.description ? error.description : ""}
                                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                                            fullWidth
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>

                                    {/* team */}
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
                                                margin="dense"
                                                name="arename"
                                                id="arename"
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
                                            className={classes.button}
                                            onClick={() => { handleAdd() }}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32.576" height="31.799" viewBox="0 0 32.576 31.799">
                                    <path id="Path_5209" data-name="Path 5209" d="M13.679,14.917a.252.252,0,1,1,.119-.49,5.485,5.485,0,0,0,1.318.164,5.334,5.334,0,0,0,1.315-.164.251.251,0,1,1,.122.488,5.658,5.658,0,0,1-1.437.178,6.036,6.036,0,0,1-1.437-.175ZM23.5,23.451a5.939,5.939,0,0,0,.867,1.217,4.974,4.974,0,0,0,1.376,1.015.136.136,0,0,0,.119.005.481.481,0,0,0,.164-.122,1.927,1.927,0,0,0,.151-.186c.22-.292.493-.652.88-.472l.024.013,1.288.74.013.008a.582.582,0,0,1,.241.5,1.375,1.375,0,0,1-.188.639,1.3,1.3,0,0,1-.62.546,2.741,2.741,0,0,1-.763.207,2.6,2.6,0,0,1-1.166-.1,5.2,5.2,0,0,1-1.174-.567l-.029-.019c-.191-.119-.4-.247-.6-.4A7.491,7.491,0,0,1,22.1,24.23a3.666,3.666,0,0,1-.514-2.314,1.683,1.683,0,0,1,.562-1.055,1.511,1.511,0,0,1,1.121-.3.169.169,0,0,1,.13.082l.824,1.4a.433.433,0,0,1,.069.467.928.928,0,0,1-.315.355c-.045.037-.1.077-.154.117-.186.133-.4.289-.323.472Zm-4.295-4.462a9.628,9.628,0,0,1-1.055-1.352L18,17.409a4.563,4.563,0,0,1-5.941-.247c-.048-.042-.1-.087-.141-.133-.114.318-.26.7-.416,1.052a6.169,6.169,0,0,1-.461.885,4.536,4.536,0,0,0,8.17.021ZM14.782,1.9h.665a.225.225,0,0,1,.225.225v.991h.991a.225.225,0,0,1,.225.225v.665a.225.225,0,0,1-.225.225h-.991v.991a.225.225,0,0,1-.225.225h-.665a.225.225,0,0,1-.225-.225V4.234h-.991a.225.225,0,0,1-.225-.225V3.343a.225.225,0,0,1,.225-.225h.991V2.126a.225.225,0,0,1,.225-.225ZM25,16.651a7.566,7.566,0,1,1-6.845,10.806H1.654A1.581,1.581,0,0,1,0,25.911a5.732,5.732,0,0,1,1.429-3.685,4.515,4.515,0,0,1,1.434-1.214c1.67-.931,6.066-1.225,7.762-2.521a6.463,6.463,0,0,0,.321-.649c.2-.461.387-.965.5-1.31a15.909,15.909,0,0,1-1.318-1.877L8.8,12.534A3.844,3.844,0,0,1,8.043,10.6a1.549,1.549,0,0,1,.13-.695,1.287,1.287,0,0,1,.459-.533A1.481,1.481,0,0,1,8.955,9.2a33.636,33.636,0,0,1-.064-3.812,5.222,5.222,0,0,1,.164-.864C11.145-2.932,21.16-.278,21.6,5.88l-.082,3.46h0a.962.962,0,0,1,.7.726,3,3,0,0,1-.366,1.821h0a.134.134,0,0,1-.024.042l-1.519,2.5A12.982,12.982,0,0,1,18.448,17l.2.289a10.9,10.9,0,0,0,.8,1.066h0a3.223,3.223,0,0,0,.414.308A7.584,7.584,0,0,1,25,16.651Zm4.4,3.173a6.221,6.221,0,1,0,1.821,4.4,6.2,6.2,0,0,0-1.821-4.4Zm-12.7-9.292a.241.241,0,1,1,.268-.4,1.111,1.111,0,0,0,.6.13,1.2,1.2,0,0,0,.62-.159.24.24,0,0,1,.257.406,1.712,1.712,0,0,1-.87.233,1.564,1.564,0,0,1-.875-.209ZM20.27,9.138A1.361,1.361,0,0,0,20,8.39l-.008-.019,0,.005C18.406,6.134,10.517,5.122,10.177,9.8l.013.032-.583-.048.042.135-.04-.09a1.185,1.185,0,0,0-.562.17.539.539,0,0,0-.194.223.823.823,0,0,0-.064.358,3.184,3.184,0,0,0,.636,1.548l.005.008,1.333,2.121c3.375,5.352,6.439,3.849,8.9-.212l1.5-2.473a2.4,2.4,0,0,0,.318-1.318c-.037-.148-.2-.223-.482-.236-.058,0-.122,0-.183,0s-.138.005-.209.013a.073.073,0,0,0-.024,0l-.323-.9Zm-8.43,1.394a.241.241,0,0,1,.268-.4,1.165,1.165,0,0,0,.61.141,1.34,1.34,0,0,0,.652-.156.241.241,0,0,1,.241.416,1.833,1.833,0,0,1-.891.22,1.616,1.616,0,0,1-.88-.22Zm-.1-1.071a.239.239,0,0,1-.278-.39,1.9,1.9,0,0,1,1.1-.384,1.943,1.943,0,0,1,1.121.382.24.24,0,0,1-.273.395,1.465,1.465,0,0,0-.848-.3,1.4,1.4,0,0,0-.822.294Zm5.193,0a.239.239,0,0,1-.278-.39,1.9,1.9,0,0,1,1.1-.384,1.943,1.943,0,0,1,1.121.382.24.24,0,1,1-.273.395,1.465,1.465,0,0,0-.848-.3,1.4,1.4,0,0,0-.822.294Z" transform="translate(0 0.011)" fill="#06425c" />
                                </svg> Emergency Contact Details
                            </Typography>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>

                                    {/* emergency contact details */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.createHazardbox}
                                        style={{ marginTop: '30px' }}
                                    >
                                        <Typography variant="h6" gutterBottom className={classes.labelName}>Emergency Contact Details</Typography>
                                    </Grid>

                                    {/* supervisor */}
                                    <Grid
                                        item
                                        md={6}
                                        xs={11}
                                    >
                                        <TextField
                                            label="Supervisor"
                                            name="supervisor"
                                            id="supervisor"
                                            value={form.supervisorName ? form.supervisorName : ""}
                                            fullWidth
                                            variant="outlined"
                                            onChange={(e) => setForm({ ...form, supervisorName: e.target.value })}
                                            className={classes.formControl}
                                        />
                                    </Grid>




                                    {/* emergency number */}
                                    <Grid
                                        item
                                        md={6}
                                        xs={11}
                                    >
                                        <TextField
                                            label="Emergency Phone Number"
                                            name="emergencyphonenumber"
                                            id="emergencyphonenumber"
                                            value={form.emergencyNumber ? form.emergencyNumber : ""}
                                            onChange={(e) => setForm({ ...form, emergencyNumber: e.target.value })}
                                            fullWidth
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>

                                    {/* evacuation assembly point       */}
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <TextField
                                            label="Evacuation assembly point"
                                            name="evacuationassemblypoint"
                                            id="evacuationassemblypoint"
                                            value={form.evacuationAssemblyPoint ? form.evacuationAssemblyPoint : ""}
                                            onChange={(e) => setForm({ ...form, evacuationAssemblyPoint: e.target.value })}
                                            fullWidth
                                            variant="outlined"
                                            className={classes.formControl}
                                        />
                                    </Grid>



                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Typography variant="h6" className="sectionHeading">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26.156" height="27.004" viewBox="0 0 26.156 27.004">
                                    <g id="attention-signal-and-construction-worker-svgrepo-com" transform="translate(-8.551)">
                                        <path id="iconos_43_" d="M17.453,26.549,22.912,17.1l-.788-.758a5.11,5.11,0,0,1-3.26,1.2,5.04,5.04,0,0,1-3.093-1.077l-1.122,1.077h-2.2A3.033,3.033,0,0,0,10.024,18.6c-1.8,2.077-1.5,6.565-1.365,7.945ZM14.3,12.008a5.581,5.581,0,0,0,1.44,3.184,4.983,4.983,0,0,0,.516.47,4.587,4.587,0,0,0,.728.47,4.056,4.056,0,0,0,3.791,0,4.585,4.585,0,0,0,.728-.47c.182-.152.349-.3.515-.47a5.565,5.565,0,0,0,1.425-3.169h.045a1.554,1.554,0,0,0,1.44-1.653,1.747,1.747,0,0,0-.606-1.349H13.648a1.747,1.747,0,0,0-.606,1.349A1.622,1.622,0,0,0,14.3,12.008ZM16.635,1.88a6.887,6.887,0,0,0-3.29,3.973l-.106.334h-.864v1.9H25.141v-1.9h-.849l-.106-.334A6.858,6.858,0,0,0,20.9,1.9V6.019a1.268,1.268,0,0,1-.121.47,1.192,1.192,0,0,1-1.046.652h-1.91A1.189,1.189,0,0,1,16.65,6.126a.622.622,0,0,1-.015-.167V1.88Zm1.183,4.761h1.9a.7.7,0,0,0,.622-.379.649.649,0,0,0,.091-.334V.94a1.183,1.183,0,0,0-.061-.334A.959.959,0,0,0,19.485,0H17.817a.694.694,0,0,0-.7.622c0,.03-.015.061-.015.091V5.928a.763.763,0,0,0,.121.409A.739.739,0,0,0,17.817,6.641Zm8.006,16.117h1.91l.364-2.972.106-.849.061-.455H25.292Zm-.2.485h2.365v2.365H25.626Zm1.061-10.2a.5.5,0,0,0-.424.243L24.352,16.6l-.273.47-.273.47-5.049,8.749a.48.48,0,0,0-.061.243.4.4,0,0,0,.061.227.484.484,0,0,0,.425.243H34.223a.479.479,0,0,0,.485-.485.524.524,0,0,0-.106-.3l-7.49-12.933A.484.484,0,0,0,26.687,13.04Zm3.154,13.04H20.016l4.928-8.521.273-.47.273-.47,1.228-2.108L33.4,26.079Z" fill="#06425c" />
                                    </g>
                                </svg> Job hazard
                            </Typography>
                        </Grid>

                        <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                            <Paper elevation={1} className="paperSection">
                                <Grid container spacing={3}>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                    </Grid>

                                    {Object.entries(checkGroups).map(([key, value]) => (
                                        <Grid item md={6}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">{key}</FormLabel>
                                                <FormGroup>
                                                    {value.map((option) => (
                                                        <FormControlLabel
                                                            control={<Checkbox name={option.inputLabel} />}
                                                            label={option.inputLabel}
                                                            checked={handelSelectOption(option.checkListId, option.inputLabel)}
                                                            onChange={async (e) => handlePhysicalHazards(e, option.checkListId, option.inputLabel)}
                                                        />
                                                    ))}
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    ))}

                                    {Object.entries(checkGroupsControl).map(([key, value]) => (
                                        <Grid item md={6}>
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">{key}</FormLabel>
                                                <FormGroup>
                                                    {value.map((option) => (
                                                        <FormControlLabel
                                                            control={<Checkbox name={option.inputLabel} />}
                                                            label={option.inputLabel}
                                                            checked={handelSelectOptionPpe(option.checkListId, option.inputLabel)}
                                                            onChange={async (e) => handlePhysicalPpe(e, option.checkListId, option.inputLabel)}
                                                        />
                                                    ))}
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    ))}

                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                        className={classes.createHazardbox}
                                        style={{ marginTop: '12px' }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            className={classes.labelName}
                                        >
                                            Other Hazards
                                        </Typography>
                                    </Grid>

                                    {otherHazards.map((value, index) => (
                                        <>
                                            <Grid
                                                item
                                                md={6}
                                                xs={11}
                                                className={classes.createHazardbox}
                                            >
                                                <TextField
                                                    label="Other hazards"
                                                    margin="dense"
                                                    name="otherhazards"
                                                    id="otherhazards"
                                                    defaultValue=""
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
                                                        onClick={(e) => handelRemoveHazard(e, index)}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </Grid>
                                                : null}
                                        </>
                                    ))}

                                    <Grid item md={12} xs={12} className="formFieldBTNSection paddTRemove" align="left">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<AddCircleIcon />}
                                            className="marginT0"
                                            onClick={(e) => handleAddHazard()}
                                        >
                                            Add new
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>



                        <Grid
                            item
                            md={12}
                            xs={12}
                            style={{ marginTop: '15px' }}
                        >
                            <div className={classes.loadingWrapper}>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    className="spacerRight buttonStyle"
                                    onClick={(e) => handleSubmit()}
                                    disabled={submitLoaderHazard}
                                >

                                    Next
                                </Button>
                                {submitLoaderHazard && (
                                    <CircularProgress
                                        size={24}
                                        className={classes.buttonProgress}
                                    />
                                )}
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="secondary"
                                    className="buttonStyle custmCancelBtn"
                                    onClick={(e) => history.goBack()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Grid>


                    </Col>

                    <Col md={3}>
                        <FormSideBar
                            deleteForm={"hideArray"}
                            listOfItems={JHA_FORM_COMBINE}
                            selectedItem={"Job details"}
                        />
                    </Col>

                </Row>
                : <Loader />}
        </CustomPapperBlock >
            )}/>
    );
};

const JhaDetailsInit = connect((state) => ({
    initialValues: state.getIn(["InitialDetailsReducer"]),
}))(JobDetails);

export default JhaDetailsInit;