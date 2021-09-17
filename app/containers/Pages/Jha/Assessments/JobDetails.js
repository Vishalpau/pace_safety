import React, { useEffect, useState, useRef } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button, Select, FormHelperText,
} from '@material-ui/core';
import PropTypes, { string } from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from "@material-ui/core/InputLabel";
// import { KeyboardDatePicker } from '@material-ui/pickers';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {
  DateTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import DateFnsUtils from '@date-io/date-fns';
import { useDropzone } from 'react-dropzone';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Col, Row } from "react-grid-system";
import { useParams, useHistory } from 'react-router';
import moment from "moment";
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux'
import axios from 'axios'

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants"
import JobDetailsValidate from '../Validation/JobDetailsValidate';
import api from "../../../../utils/axios";
import { handelJhaId } from "../Utils/checkValue"
import {
  INITIAL_NOTIFICATION_FORM,
  SSO_URL,
  HEADER_AUTH,
} from "../../../../utils/constants";
import Type from "../../../../styles/components/Fonts.scss";
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import { ACCOUNT_API_URL, access_token } from '../../../../utils/constants';



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
      "jhaAssessmentDate": null,
      "permitToPerform": "",
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
      "jhaStatus": "",
      "jhaStage": "",
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
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false)

  // getting breakdown values form header
  const [headerSelectValue, setHeaderSelectValue] = useState([])
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
            console.log(result)
            result.map((item) => {
              if (breakDown[key].slice(2) == item.id) {
                console.log("here")
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
  const areaName = [
    'P1 - WA1',
    'P1 - WA2',
  ];

  const department = [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'department',
      label: 'Department Name',
    },
    {
      value: 'department1',
      label: 'Department 1',
    },
    {
      value: 'department2',
      label: 'Department 2',
    },
    {
      value: 'department3',
      label: 'Department 3',
    },
    {
      value: 'department4',
      label: 'Department 4',
    },
  ];

  const handelProjectData = () => {
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
    let fkProjectStructureId = uniqueProjectStructure.map(depth => {
      return depth;
    }).join(':')

    form["fkProjectStructureIds"] = fkProjectStructureId
    form["workArea"] = Array.isArray(workArea) ? workArea[0] : workArea
  }

  const handleSubmit = async (e) => {
    const { error, isValid } = JobDetailsValidate(form);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    setSubmitLoader(true)
    handelProjectData()
    delete form["jhaAssessmentAttachment"]
    if (form.id != null && form.id != undefined) {
      const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
      for (let i = 0; i < Teamform.length; i++) {
        if (Teamform[i].id) {
          const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/teams/${Teamform[i].id}/`, Teamform[i]);
        } else {
          Teamform[i]["fkJhaId"] = localStorage.getItem("fkJHAId");
          const res = await api.post(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/teams/`, Teamform[i]);
          if (res.status === 200) {
            history.push(`${JHA_FORM["Project Area Hazards"]}`)
          }
        }
      }
      if (res.status === 200) {
        history.push(`${JHA_FORM["Project Area Hazards"]}`)
      }
    } else {
      console.log(form)
      const res = await api.post("/api/v1/jhas/", form)
      if (res.status === 201) {
        let fkJHAId = res.data.data.results.id
        localStorage.setItem("fkJHAId", fkJHAId)
        for (let i = 0; i < Teamform.length; i++) {
          Teamform[i]["fkJhaId"] = localStorage.getItem("fkJHAId");
          const res = await api.post(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/teams/`, Teamform[i]);
        }
        history.push(`${JHA_FORM["Project Area Hazards"]}`)
      }
    }
    setSubmitLoader(false)
  }

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

  const classes = useStyles();

  const handelCallBack = async () => {
    await fetchJhaData()
    await fetchTeamData()
    fetchDepartment()
  }

  useEffect(() => {
    handelCallBack()
  }, []);
  return (
    <PapperBlock title="Job Details" icon="ion-md-list-box">
      {/* {console.log(departmentName)} */}
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>
            {/* {console.log(form)} */}
            <Grid item xs={3} md={3}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Project
              </Typography>
              <Typography style={{ fontSize: "15px" }}>
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

            {/* job title */}
            <Grid
              item
              md={12}
              xs={12}
              className={classes.formBox}
            >
              <TextField
                label="Job Title"
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

            {/* location  */}
            <Grid
              item
              md={12}
              xs={12}
              className={classes.formBox}
            >
              <TextField
                label="Location"
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

            {/* approval time */}
            <Grid
              item
              md={6}
              xs={12}
              className={classes.formBox}
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className={classes.formControl}
                  fullWidth
                  id="jha_assessment_date"
                  label="Date"
                  format="MM/dd/yyyy"
                  value={form.jhaAssessmentDate}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      jhaAssessmentDate: moment(e).format("YYYY-MM-DD"),
                    });
                  }}
                  inputVariant="outlined"
                  disableFuture="true"
                />

              </MuiPickersUtilsProvider>
            </Grid>

            {/* perform to permit */}
            <Grid
              item
              md={6}
              xs={12}
              className={classes.formBox}
            >
              <FormControl
                component="fieldset"
              >
                <FormLabel
                  error={error.permitToPerform}
                  component="legend">
                  Permit to Work
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

            {/* scope work */}
            <Grid
              item
              md={12}
              xs={12}
              className={classes.formBox}
            >
              <TextField
                label="Scope of work (Describe all tasks)"
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
                  label="Team Name"
                  margin="dense"
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
                className={classes.button}
                onClick={() => { handleAdd() }}
              >
                Add
              </Button>
            </Grid>

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
                multiline
                value={form.supervisorName ? form.supervisorName : ""}
                fullWidth
                variant="outlined"
                onChange={(e) => setForm({ ...form, supervisorName: e.target.value })}
                className={classes.formControl}
              />
            </Grid>

            {/* department */}
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
                multiline
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
              md={6}
              xs={11}
            >
              <TextField
                label="Evacuation assembly point"
                name="evacuationassemblypoint"
                id="evacuationassemblypoint"
                multiline
                value={form.evacuationAssemblyPoint ? form.evacuationAssemblyPoint : ""}
                onChange={(e) => setForm({ ...form, evacuationAssemblyPoint: e.target.value })}
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>

            {/* permit number       */}
            <Grid
              item
              md={6}
              xs={11}
            >
              <TextField
                label="Permit number"
                name="permitnumber"
                id="permitnumber"
                multiline
                value={form.permitNumber ? form.permitNumber : ""}
                onChange={(e) => setForm({ ...form, permitNumber: e.target.value })}
                fullWidth
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
                multiline
                value={form.jobOrderNumber ? form.jobOrderNumber : ""}
                onChange={(e) => setForm({ ...form, jobOrderNumber: e.target.value })}
                fullWidth
                variant="outlined"
                className={classes.formControl}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
              style={{ marginTop: '15px' }}
            >
              {submitLoader == false ?
                <Button
                  variant="outlined"
                  onClick={(e) => handleSubmit()}
                  className={classes.custmSubmitBtn}
                  style={{ marginLeft: "10px" }}
                >

                  Next
                </Button>
                :
                <IconButton className={classes.loader} disabled>
                  <CircularProgress color="secondary" />
                </IconButton>
              }
            </Grid>
          </Grid>
        </Col>
        <Col md={3}>
          <FormSideBar
            deleteForm={"hideArray"}
            listOfItems={JHA_FORM}
            selectedItem={"Project Details"}
          />
        </Col>
      </Row>
    </PapperBlock >
  );
};

const JhaDetailsInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(JobDetails);

export default JhaDetailsInit;