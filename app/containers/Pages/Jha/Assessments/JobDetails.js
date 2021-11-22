import DateFnsUtils from '@date-io/date-fns';
import { Button, FormHelperText, Grid, Select, TextField, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {
  KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import axios from 'axios';
import { PapperBlock } from 'dan-components';
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { Col, Row } from "react-grid-system";
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import api from "../../../../utils/axios";
import { handelCommonObject } from '../../../../utils/CheckerValue';
import { access_token, ACCOUNT_API_URL, HEADER_AUTH, SSO_URL } from "../../../../utils/constants";
import FormSideBar from '../../../Forms/FormSideBar';
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import { handelJhaId } from "../Utils/checkValue";
import { JHA_FORM } from "../Utils/constants";
import JobDetailsValidate from '../Validation/JobDetailsValidate';
import PickListData from "../../../../utils/Picklist/InvestigationPicklist";
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
    marginLeft: -12,
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
  const [isDateShow, setIsDateShow] = useState(false)
  const [pertmiType, setPermitType] = useState([])

  // fecth jha data
  const fetchJhaData = async () => {
    const jhaId = handelJhaId()
    if (jhaId !== null) {
      let fetchPermit = await PickListData(80)
      setPermitType(fetchPermit)
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
    const fkCompanyId = JSON.parse(localStorage.getItem("company")).fkCompanyId
    let filterDepartmentName = []
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
    history.push(`${JHA_FORM["Project Area Hazards"]}`)
  }

  const handelApiError = (res) => {
    if (res.status == 200) {
      handelTeam()
      handelNavigate()
    } else if (res.status == 201) {
      let fkJHAId = res.data.data.results.id
      localStorage.setItem("fkJHAId", fkJHAId)
      handelTeam()
      handelNavigate()
    } else {
      setSubmitLoader(false)
      history.push("/app/pages/error")
    }
  }

  const handelProjectData = () => {
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
    let fkProjectStructureId = uniqueProjectStructure.map(depth => {
      return depth;
    }).join(':')

    form["fkProjectStructureIds"] = fkProjectStructureId
    form["workArea"] = Array.isArray(workArea) ? workArea[0] : workArea
  }

  const handelTeam = async () => {
    for (let i = 0; i < Teamform.length; i++) {
      let apiEndPoint = `/api/v1/jhas/${localStorage.getItem("fkJHAId")}/teams`
      if (Teamform[i].id) {
        const res = await api.put(`${apiEndPoint}/${Teamform[i].id}/`, Teamform[i]).catch(() => handelApiError(""))
      } else {
        Teamform[i]["fkJhaId"] = localStorage.getItem("fkJHAId");
        const res = await api.post(`${apiEndPoint}/`, Teamform[i]).then().catch(() => handelApiError(""))
        if (res.status === 200) {
          handelNavigate()
        }
      }
    }
  }

  const handleSubmit = async (e) => {
    const { error, isValid } = await JobDetailsValidate(form, selectDepthAndId);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    await setSubmitLoader(true)
    await handelProjectData()
    delete form["jhaAssessmentAttachment"]
    if (form.id != null && form.id != undefined) {
      const res = await api.put(`/api/v1/jhas/${localStorage.getItem("fkJHAId")}/ `, form)
        .then(res => handelApiError(res))
        .catch(() => handelApiError(res))
    } else {
      const res = await api.post("/api/v1/jhas/", form)
        .then(res => handelApiError(res))
        .catch(() => handelApiError(res))
      await handelApiError(res)
    }
    await handelCommonObject("commonObject", "jha", "projectStruct", form.fkProjectStructureIds)
    await setSubmitLoader(false)
  }
  const typeOfPremit = ["Type1", "Type2", "Type3", "Type4", "Type5"]

  const classes = useStyles();

  const handelCallBack = async () => {
    await setLoading(true)
    await fetchJhaData()
    await fetchTeamData()
    await fetchDepartment()
    await setLoading(false)
  }

  useEffect(() => {
    handelCallBack()
  }, []);
  return (
    <PapperBlock title="Job Details" icon="ion-md-list-box">
      {/* {console.log(departmentName)} */}
      {loading == false ?
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
                  required
                  variant="outlined"
                  className={classes.formControl}
                />
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
                  required
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
                  required
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
                    onClick={(e) => setIsDateShow(true)}
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
                    error={error.jhaAssessmentDate}
                    helperText={error.jhaAssessmentDate ? error.jhaAssessmentDate : ""}
                    inputVariant="outlined"
                    disableFuture="true"
                    open={isDateShow}
                    onClose={(e) => handelClose()}
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
                    component="legend"
                    required
                  >
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

              {/* permit type */}
              {form.permitToPerform == "Yes" ?
                <>
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

                      {pertmiType.map((selectValues) => (
                        <MenuItem
                          value={selectValues.value}
                        >
                          {selectValues.label}
                        </MenuItem>
                      ))}

                    </TextField>
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
                md={6}
                xs={11}
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


              <Grid
                item
                md={12}
                xs={12}
                style={{ marginTop: '15px' }}
              >
                <div className={classes.loadingWrapper}>
                  <Button
                    variant="outlined"
                    onClick={(e) => handleSubmit()}
                    className={classes.custmSubmitBtn}
                    style={{ marginLeft: "10px" }}
                    disabled={submitLoader}
                  >
                    Next
                  </Button>
                  {submitLoader && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div>
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
        :
        "Loading..."
      }
    </PapperBlock >
  );
};

const JhaDetailsInit = connect((state) => ({
  initialValues: state.getIn(["InitialDetailsReducer"]),
}))(JobDetails);

export default JhaDetailsInit;