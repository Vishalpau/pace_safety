import DateFnsUtils from '@date-io/date-fns';
import { Button, CircularProgress, FormHelperText, Grid, TextField, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from "@material-ui/core/Select";
import { makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import axios from "axios";
import { PapperBlock } from 'dan-components';
import moment from "moment";
import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import FormSideBar from "../../../../containers/Forms/FormSideBar";
import api from "../../../../utils/axios";
import { handelCommonObject } from "../../../../utils/CheckerValue";
import {
  HEADER_AUTH, SSO_URL
} from "../../../../utils/constants";
import PickListData from "../../../../utils/Picklist/InvestigationPicklist";
import Loader from "../../../Forms/Loader";
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import { AHA } from "../constants";
import ProjectDetailsValidator from "../Validator/ProjectDetailsValidation";




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

const ProjectDetails = () => {
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

  const [positiveObservation, setPositiveObservation] = useState(true);
  const [riskObservation, setRiskObservation] = useState(true);
  const [addressSituation, setAddressSituation] = useState(true);
  const [submitLoader, setSubmitLoader] = useState(false);
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
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [selectBreakDown, setSelectBreakDown] = useState([]);
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
      "additionalRemarks": "",
      "classification": "string",
      "wrpApprovalUser": null,
      "wrpApprovalDateTime": null,
      "picApprovalUser": "",
      "picApprovalDateTime": null,
      "signedUser": "",
      "signedDateTime": "2021-08-17T09:55:30.900000Z",
      "anyLessonsLearnt": "",
      "lessonLearntDetails": "",
      "lessonLearntUserName": "",
      "ahaStatus": "",
      "ahaStage": "",
      "typeOfPermit": "",
      "badgeNumber": "",
      "status": "Active",
      "createdBy": parseInt(userId),
      "source": "Web",
      "vendor": "string",
      "vendorReferenceId": "string"
    }
  )
  const handleSubmit = async (e) => {
    const uniqueProjectStructure = [... new Set(selectDepthAndId)]
    let fkProjectStructureId = uniqueProjectStructure.map(depth => {
      return depth;
    }).join(':')
    form["fkProjectStructureIds"] = fkProjectStructureId
    const { error, isValid } = ProjectDetailsValidator(form, selectDepthAndId);
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }
    await setLoading(true);
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
    // form["assessmentDate"] = new Date().toISOString().split('T')[0]
    if (form.id) {
      form["assessmentDate"] = form['assessmentDate'].split('T')[0]
      delete form["ahaAssessmentAttachment"]
      if (form['notifyTo'] === null) {
        form['notifyTo'] = "null"
      }
      // form['updatedBy'] = form['createdBy']
      const res = await api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/ `, form).then(res => {
        for (let i = 0; i < Teamform.length; i++) {
          if (Teamform[i].id) {
            const res = api.put(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/${Teamform[i].id}/`, Teamform[i]);
          } else {
            Teamform[i]["fkAhaId"] = localStorage.getItem("fkAHAId");
            if (Teamform[i].teamName !== "") {
              const res = api.post(`/api/v1/ahas/${localStorage.getItem("fkAHAId")}/teams/`, Teamform[i]);
            }
            if (res.status === 200) {
              history.push("/app/pages/aha/assessments/project-area-hazards")
            }
          }

        }
        if (res.status === 200) {
          history.push(`/app/pages/aha/assessments/project-area-hazards/`)
        }
      }).catch(err => {
        setLoading(false);
      })



    } else {
      if (form['permitToPerform'] === "No") {
        form['typeOfPermit'] = ""
        form['permitNumber'] = ""
      }
      form["ahaStage"] = "Assessments"
      form["ahaStatus"] = "Pending"
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
        history.push("/app/pages/aha/assessments/project-area-hazards")
      } else {
        await setLoading(false);
      }
    }

  }

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handelClose = () => {
    setIsDateShow(false)
    return true
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
            setIsLoading(true);
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
            await setIsLoading(true);
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

  let pickListValues = JSON.parse(localStorage.getItem("pickList"))

  const pickListValue = async () => {
    permitType.current = await pickListValues["81"]
  }
  console.log(permitType.current, "AASAS")
  const classes = useStyles();

  useEffect(() => {
    fetchCallBack()
    pickListValue()
    if (id) {
      fetchAhaData()
      fetchTeamData()
    }
  }, []);
  return (
    <>
      <PapperBlock title="Project Details" icon="ion-md-list-box">
        {isLoading ?

          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>
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
                        label="Incident type"
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
                    label="Date*"
                    value={form.assessmentDate || null}
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
                            onClick={(e) => { setForm({ ...form, typeOfPermit: value.label }) }}
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
                </Grid> </> : null}
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
                  className={classes.button}
                  onClick={() => { handleAdd() }}
                >
                  Add
                </Button>
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

              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={AHA}
                selectedItem="Project Details"
              />
            </Grid>
          </Grid> :
          <>
            <Loader />
          </>
        }
      </PapperBlock>
    </>
  );
};

export default ProjectDetails;