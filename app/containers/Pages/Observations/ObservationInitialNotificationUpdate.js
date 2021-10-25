import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";
import axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router";
import "../../../styles/custom/customheader.css";
import api from "../../../utils/axios";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH, SSO_URL
} from "../../../utils/constants";
import InitialNotificationValidator from "../../Validator/Observation/InitialNotificationValidation";


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
    '& .MuiFormControlLabel-root': {
      width: '30%',
      [theme.breakpoints.down("xs")]: {
        width: '48%',
      },
    },
  },
  custmCancelBtn: {
    color: '#ffffff',
    backgroundColor: '#ff8533',
    lineHeight: '30px',
    marginLeft: '5px',
    border: 'none',
    '&:hover': {
      backgroundColor: '#ff8533',
      border: 'none',
    },
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
    marginLeft: -60,
  },
  boldHelperText: {
    "& .MuiFormHelperText-root": {
      // fontWeight : "bold",
      color: "red",
      fontSize: "16px",
      fontFamily: "Montserrat-Medium"
    }
  },
  // });
}));
const filter = createFilterOptions();

const ObservationInitialNotificationUpdate = () => {

  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [positiveObservation, setPositiveObservation] = useState(true);
  const [riskObservation, setRiskObservation] = useState(true);
  const [addressSituation, setAddressSituation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [tagData, setTagData] = useState([])
  const [reportedByName, setReportedByName] = useState([]);
  const [reportedBy, setReportedBy] = useState([]);
  const [departmentName, setDepartmentName] = useState([])
  const [submitLoader, setSubmitLoader] = useState(false);
  const [levelLenght, setLevelLenght] = useState(0)
  const [catagory, setCatagory] = useState();
  const [selectDepthAndId, setSelectDepthAndId] = useState([])
  const [projectSturcturedData, setProjectSturcturedData] = useState([])
  const [isNext, setIsNext] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState();

  let filterDepartmentName = [];
  const project = JSON.parse(localStorage.getItem("projectName")) !== null
    ? JSON.parse(localStorage.getItem("projectName")).projectName
    : null;

  const fkCompanyId = JSON.parse(localStorage.getItem("company")) !== null
    ? JSON.parse(localStorage.getItem("company")).fkCompanyId
    : null;

  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;

  const handelSelectOption = (cate) => {
    if (catagory !== undefined) {
      for (let i = 0; i <= catagory.length; i++) {
        if (catagory[i] != undefined) {
          if (catagory[i]["observationTag"] == cate.replace(/\s*$/, '')) {
            return true
          }
        }
      }
    }
  }

  const handleChange = async (e, index, value) => {

    let temp = [...catagory]
    if (e.target.checked == false) {
      temp.map((catagoryValue, index) => {
        if (catagoryValue['observationTag'] === value.tagName) {
          if (catagoryValue['id']) {
            const res = api.delete(`/api/v1/observations/${id}/observationtags/${catagoryValue.id}/`)
          }
          temp.splice(index, 1);
        }
      })
    }
    else if (e.target.checked) {
      temp.push({
        "fkObservationId": id,
        "fkTagId": value.id,
        "observationTag": value.tagName,
        "status": "Active",
        "createdBy": parseInt(userId),
        "updatedBy": 0,
      })
    }
    await setCatagory(temp)
  };

  const handleSubmit = async () => {
    console.log(initialData['assigneeName'], "LLLL")
    const { error, isValid } = InitialNotificationValidator(initialData, selectDepthAndId);
    await setError(error);

    if (!isValid) {
      return "Data is not valid";
    }
    await setLoading(true)
    let newCategory = []
    let updateCategory = []

    if (id) {
      if (initialData['assigneeName'] !== "") {
        initialData['observationStage'] = "Planned"
        initialData['observationStatus'] = "Assigned"
      }
      initialData['updatedBy'] = userId
      delete initialData['attachment']
      for (let i = 0; i < catagory.length; i++) {
        if (catagory[i].id) {
          catagory[i].updatedBy = userId
          updateCategory.push(catagory[i])

        } else {
          newCategory.push(catagory[i])
        }
      }
      if (updateCategory.length > 0) {
        const res = await api.put(`/api/v1/observations/${id}/observationtags/`, updateCategory).then(res => { }).catch(err => setLoading(false))
      }
      if (newCategory.length > 0) {
        const resCategory = await api.post(`/api/v1/observations/${id}/observationtags/`, newCategory).then(res => { }).catch(err => setLoading(false))
      }
      const res1 = await api.put(`/api/v1/observations/${id}/`, initialData).then(res => {
        if (res.status === 200) {
          localStorage.setItem("update", "Done");
          history.push(
            `/app/observation/details/${id}`
          );
        }
      }
      ).catch(err => setLoading(false))

    }
  };

  const handleCancle = async () => {
    history.push(`/app/observation/details/${id}`)
    await localStorage.setItem("update", "Pending");
  }
  const fetchCheckBoxData = async () => {
    const response = await api.get(`/api/v1/observations/${id}/observationtags/`)
    const tags = response.data.data.results.results
    let sorting = tags.sort((a, b) => a.id - b.id)
    await setCatagory(sorting);

    await setIsLoading(true);

  }

  const fetchInitialiObservation = async () => {
    const res = await api.get(`/api/v1/observations/${id}/`);
    const result = res.data.data.results
    await setInitialData(result)
    await fetchAssignee(result.departmentName)
    await fetchBreakDownData(result.fkProjectStructureIds)
    await handelWorkArea(result)
    // await setIsLoading(true);

  }
  const [projectStructName, setProjectStructName] = useState([])

  const handelWorkArea = async (assessment) => {
    const fkCompanyId =
      JSON.parse(localStorage.getItem("company")) !== null
        ? JSON.parse(localStorage.getItem("company")).fkCompanyId
        : null;

    const projectId =
      JSON.parse(localStorage.getItem("projectName")) !== null
        ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
        : null;
    let structName = []
    let projectStructId = assessment.fkProjectStructureIds.split(":")

    for (let key in projectStructId) {
      let workAreaId = [projectStructId[key].substring(0, 2), projectStructId[key].substring(2)]
      const api_work_area = axios.create({
        baseURL: SSO_URL,
        headers: HEADER_AUTH
      });
      const workArea = await api_work_area.get(`/api/v1/companies/${fkCompanyId}/projects/${projectId}/projectstructure/${workAreaId[0]}/${workAreaId[1]}/`);
      structName.push(workArea.data.data.results[0]["structureName"])
    }
    setProjectStructName(structName)
  }

  const fetchTags = async () => {
    let companyId = JSON.parse(localStorage.getItem('company')).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem('projectName')).projectName.projectId
    const res = await api.get(`/api/v1/tags/?companyId=${companyId}&projectId=${projectId}`);
    const result = res.data.data.results.results;
    let temp = []
    result.map((value) => {
      if (value.status === "Active") {
        temp.push(value)
      }
    })

    let sorting = temp.sort((a, b) => a.id - b.id);
    await setTagData(sorting);
    // const res = await api.get(`/api/v1/tags/`)
    // const result = res.data.data.results.results
    // let sorting = result.sort((a, b) => a.id - b.id)
    // await setTagData(sorting)
  }

  const fetchAssignee = (departments) => {
    let appId = JSON.parse(localStorage.getItem("BaseUrl"))["appId"]
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/application/${appId}/users/`,
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

          for (var i in result[0].users) {
            let temp = {};

            temp["inputValue"] = result[0].users[i].name;
            temp["reportedById"] = result[0].users[i].id;
            temp["department"] = result[0].users[i].department;

            user.push(temp);

          }
          setReportedByName(user);
          setReportedBy(user);
          if (departments !== "") {
            let userDepartment = []
            let fetchingAssignee = [];
            for (let i = 0; i < user.length; i++) {
              userDepartment.push(user[i].department)
            }
            let fetchingDepartments = []
            userDepartment.map((value) => value.map((d) => {
              if (d.departmentName === departments) {
                fetchingDepartments.push(d)
              }
            }))

            for (var i in fetchingDepartments) {
              let assigneeData = {};

              assigneeData["inputValue"] = fetchingDepartments[i].userName;
              assigneeData["reportedById"] = fetchingDepartments[i].id;

              fetchingAssignee.push(assigneeData);
            }
            if (fetchingAssignee.length > 0) {
              setReportedBy(fetchingAssignee);

            } else {
              setReportedBy([]);

            }
          }
        }

      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };


  const fetchDepartment = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/departments/`,
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
            filterDepartmentName.push(result[i]);
            // filterReportedById.push(result[i].id);
          }
          // setReportedByName(filterReportedByName);
          setDepartmentName(filterDepartmentName);
        }
        // else{
        //   window.location.href = {LOGIN_URL}
        // }
      })
      .catch((error) => {
        // window.location.href = {LOGIN_URL}
      });
  };

  const handleProjectName = (projectId) => {
    let pname = ""
    const userName = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).companies
    : null;
    
   const abc =  userName.filter((user) => user.companyId === initialData.fkCompanyId)
   if (abc.length > 0) {
    const dd = abc[0].projects.filter((user) => user.projectId === projectId)
   pname = dd[0].projectName
   }
   return pname
  }

  const handleDepartment = (option) => {
    let temp = { ...initialData }
    temp.departmentName = option.departmentName;
    temp.departmentId = option.id;
    if (temp.departmentName !== initialData.departmentName) {
      temp.assigneeName = ""
      temp.assigneeId = ""
    }

    setInitialData(temp)

    let tempAssigneeData = reportedByName
    let userDepartment = []
    let user = [];
    for (let i = 0; i < tempAssigneeData.length; i++) {
      userDepartment.push(tempAssigneeData[i].department)
    }
    let LL = []
    userDepartment.map((value) => value.map((department) => {
      if (department.departmentName === temp.departmentName) {
        LL.push(department)
      }
    }))

    for (var i in LL) {
      let tempss = {};

      tempss["inputValue"] = LL[i].userName;
      tempss["reportedById"] = LL[i].id;

      user.push(tempss);
      // filterReportedById.push(result[i].id);
      // filterReportedByBedgeID.push(result[i].badgeNo);
    }
    if (user.length > 0) {
      setReportedBy(user);

    } else {
      setReportedBy([]);

    }
  }
  const handleAssignee = async (value) => {
    let tempData = { ...initialData }

    tempData.assigneeName = value.inputValue
    tempData.assigneeId = value.reportedById


    await setInitialData(tempData)
  }
  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem('projectName'));
    let breakdownLength = projectData.projectName.breakdown.length
    // setLevelLenght(breakdownLength)
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
            // await setIsLoading(true);
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
            setProjectSturcturedData(selectBreakDown)
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

            setProjectSturcturedData(selectBreakDown)

          })
          .catch((error) => {
            console.log(error)
            setIsNext(true);
          });
      }
    }
  };
  // if(initialData.departmentName !== ""){
  //   console.log(initialData.departmentName)

  // }


  useEffect(() => {

    fetchInitialiObservation();
    fetchCheckBoxData();
    fetchTags()
    // fetchReportedBy()
    fetchDepartment()

  }, [])

  const classes = useStyles();
  return (
    <>
      {/* <PapperBlock
        className={classes.customPapperBlockSection}
        title="Update Observation"
        icon="ion-md-list-box"
      > */}
      {isLoading ?
        <Grid container spacing={3} className={classes.observationNewSection}>

          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Title
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.observationTitle ? initialData.observationTitle : "-"}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Type
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.observationType ? initialData.observationType : "-"}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Observation Description
            </Typography>
            <Typography className={classes.labelValue}>
              {initialData.observationDetails ? initialData.observationDetails : "-"}
            </Typography>
          </Grid>
          <Grid item md={12}>
            <Typography variant="h6" gutterBottom className={classes.labelName}>
              Project Information
            </Typography>
            <Typography className={classes.labelValue}>
              {handleProjectName(initialData.fkProjectId)}  {projectStructName.map((value) => ` - ${value}`)}
            </Typography>
          </Grid>
          <Grid
            item
            md={12}
            xs={12}
            className={classes.formBox}
          >

            <TextField
              label="Location"
              //margin="dense"
              name="location"
              id="location"
              shrink={initialData.location !== null ? true : false}
              value={initialData.location ? initialData.location : ""}
              fullWidth
              variant="outlined"
              className={classes.formControl}
              onChange={(e) => {
                setInitialData({
                  ...initialData,
                  location: e.target.value,
                });
              }}
            />
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
                        // checked={catagoryName.includes(value.tagName)}
                        checked={handelSelectOption(value.tagName)}
                        // checked={catagory[index] !== undefined ? catagory[index]['observationTag'] == value.tagName ? true : false : false }
                        onChange={(e) => handleChange(e, index, value)}
                      />
                    }
                    label={value.tagName}
                  />
                ))}
              </FormGroup>

            </Grid>) : null}

          <Grid item md={6} xs={12} className={classes.formBox}>

            <TextField
              label="Assignee Department"
              // margin="dense"
              name="assigneedepartment"
              id="assigneedepartment"
              select
              fullWidth
              value={initialData.departmentName ? initialData.departmentName : ""}
              variant="outlined"
            // onChange={(e) => {
            //   setInitialData({ ...initialData, departmentName: e.target.value });
            // }}
            >
              {departmentName.map((option) => (
                <MenuItem key={option} value={option.departmentName} onClick={(e) =>
                  handleDepartment(option)
                }>
                  {option.departmentName}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item md={6} xs={12} className={classes.formBox}>


            <TextField
              label="Assignee"
              // margin="dense"
              name="assignee"
              id="assignee"
              select
              fullWidth
              value={initialData.assigneeName ? initialData.assigneeName : ""}
              variant="outlined"
              // onChange={(e) => {
              //   setInitialData({ ...initialData, departmentName: e.target.value });
              // }}
              error={error ? error.assigneeName : ""}
              helperText={
                error ? error.assigneeName : ""
              }
              className={classNames(classes.formControl, classes.boldHelperText)}
            >
              {reportedBy.map((option) => (
                <MenuItem key={option} value={option.inputValue} onClick={(e) =>
                  handleAssignee(option)
                }>
                  {option.inputValue}
                </MenuItem>
              ))}
            </TextField>

          </Grid>

          <Grid
            item
            md={12}
            xs={12}
          >

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
              <Button
                variant="outlined"
                onClick={(e) => handleCancle()}
                className={classes.custmSubmitBtn}
                style={{ marginLeft: "10px" }}
              // disabled={loading}
              >
                Cancel
              </Button>
            </div>

          </Grid>
        </Grid> : <h1>Loading...</h1>}
      {/* </PapperBlock> */}
    </>
  );
};

export default ObservationInitialNotificationUpdate;
