import React, { useEffect, useState, Component, useRef } from "react";
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

import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Paper from "@material-ui/core/Paper";
import FormSideBar from "../../../Forms/FormSideBar";
import { COMPLIANCE } from "../Constants/Constants";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import ProjectStructureInit from "../../../ProjectStructureId/ProjectStructureId";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../../utils/constants";
import ComplianceValidation from "../Validations/ComplianceDetailsValidation";
import { FormHelperText } from "@material-ui/core";
import api from "../../../../utils/axios";
import { CircularProgress } from "@material-ui/core";
import Loader from "../../Loader";
import { handelCommonObject } from "../../../../utils/CheckerValue"
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";
import Acl from "../../../../components/Error/acl";

const useStyles = makeStyles((theme) => ({
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
      borderBottom: "1px solid #ccc",
      paddingBottom: "20px",
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
  createHazardbox: {
    //paddingTop: '0px !important',
    paddingBottom: "0px !important",
    "& button": {
      marginTop: "8px",
    },
  },
  createHazardboxBTN: {
    //paddingTop: '0px !important',
    //paddingBottom: '0px !important',
    // '& button': {
    //     marginTop: '8px',
    // },
  },
  inputFieldWithLabel: {
    //paddingTop: '0px !important',
    paddingBottom: "0px !important",
    "& button": {
      marginTop: "8px",
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
  mainLabelName: {
    color: "#737373",
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.2",
  },
  formControl: {
    width: "100%",
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
}));

const ComplianceDetails = () => {
  // class ObservationInitialNotification extends Component {
    // states
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([]);
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);
  const [levelLenght, setLevelLenght] = useState(0);
  const [workArea, setWorkArea] = useState("");
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [error, setError] = useState({});
  const [team, setTeam] = useState([{ name: "" }]);
  const [departments, setDepartments] = useState([]);

  // getting all the ids form local storage
  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
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

  //form data to fill compliance details
  const [form, setForm] = useState({
    fkCompanyId: parseInt(fkCompanyId),
    fkProjectId: parseInt(project.projectId),
    fkProjectStructureIds:
      fkProjectStructureIds !== "" ? fkProjectStructureIds : 0,
    area: "",
    contractor: "",
    contractorRepNumber: "",
    contractorSupervisorName: "",
    subContractor: "",
    auditDateTime: new Date(),
    hseRepresentative: "",
    inspectionTeam: "",
    auditType: "",
    status: "Active",
    createdBy: userId,
    source: "Web",
    hseRepNumber: "",
    complianceStage: "Open",
    complianceStatus: "Open",
  });

  useEffect(() => {
    console.log(form, 'form');
  }, [form])

  // constant value of audit type
  const auditType = [
    "Company/Contractor Inspection",
    "Area/Focussed Inspection",
    "General Inspection",
  ];

  //add a new team member
  const handelTeam = (e) => {
    if (Object.keys(team).length < 100) {
      let newData = team.filter((item, key) => key !== undefined);
      let temp = {};
      temp["name"] = "";
      newData.push(temp);
      setTeam(newData);
    }
  };

  //method to add a new team member
  const handelTeamName = (e, index) => {
    const temp = [...team];
    const value = e.target.value;
    temp[index]["name"] = value;
    setTeam(temp);
  };

  //remove team member
  const handelRemove = async (e, index) => {
    if (team.length > 1) {
      let temp = team;
      let newData = team.filter((item, key) => key !== index);
      setTeam(newData);
    }
  };


  //method to redirect to new page
  const handelNext = async () => {
    const { error, isValid } = ComplianceValidation(form, selectDepthAndId);
    setError(error);
    if (!isValid) {
      return "data not valid";
    }
    setLoading(true);
    setSaveLoading(true);
    // team name adding 
    let teamName = team.map((value) => value.name);
    for (let key in teamName) {
      if (teamName[key]["name"] !== "") {
        form["inspectionTeam"] = teamName.join(",");
      }
    }
    const uniqueProjectStructure = [...new Set(selectDepthAndId)];
    let fkProjectStructureId = uniqueProjectStructure
      .map((depth) => {
        return depth;
      })

    // posting the projectstr 
    form["fkProjectStructureIds"] = fkProjectStructureId.join(":");
    let projectStr = fkProjectStructureId[fkProjectStructureId.length - 1]
    let parentStr = fkProjectStructureId[fkProjectStructureId.length - 2]
    let depth = projectStr.split('L')[0] + 'L'
    // let strId = parentStr.split('L')[1]
    let strId = (parentStr != undefined) ? parentStr.split('L')[1] : projectStr.split('L')[1]
    let strUrl = JSON.parse(localStorage.getItem("projectName")).projectName.breakdown.filter(bd => bd.depth == depth)[0].structure[0].url + strId
    const api_work_area = axios.create({
      baseURL: SSO_URL,
      headers: HEADER_AUTH
    });
    // posting the area as location 
    const workArea = await api_work_area.get(strUrl);
    let areaStr = workArea.data.data.results.filter(st => st.id == projectStr.split('L')[1])
    let area = (typeof areaStr[0] != 'undefined') ? areaStr[0].structureName : null
    form["area"] = area;
    // updating the values[put]
    if (form.id) {
      form["updatedBy"] = userId;
      console.log('formmmmmmmm', form);
      const res = await api
        .put(`/api/v1/audits/${form.id}/`, form)
        .then((response) => {
          history.push("/app/pages/compliance/categories");
        })
        .catch((error) => {
          console.log(error), setLoading(false), setSaveLoading(true);
        });
    }
    // creating the values[post]
    else {
      const res = await api
        .post("/api/v1/audits/", form)
        .then((response) => {
          let result = response.data.data.results;
          let complianceId = result.id;
          localStorage.setItem("fkComplianceId", complianceId);
          handelCommonObject("commonObject", "audit", "projectStruct", response.data.data.results.fkProjectStructureIds)
          history.push("/app/pages/compliance/categories"), setLoading(false);
        })
        .catch((error) => {
          console.log(error), setLoading(false), setSaveLoading(true);
        });
    }
  };

  // useEffect(() => {
  //   console.log(error);
  // },[error])

  const classes = useStyles();

  // fecting the data for updating 
  const fetchComplianceData = async () => {
    let complianceId = localStorage.getItem("fkComplianceId");
    const res = await api
      .get(`/api/v1/audits/${complianceId}/`)
      .then((response) => {
        let result = response.data.data.results;
        setForm(result);
        fetchTeamMembers(result.inspectionTeam);
        fetchBreakDownData(result.fkProjectStructureIds);
      })
      .catch((error) => console.log(error));
  };

  // method to fetch team member
  const fetchTeamMembers = async (names) => {
    let teamName = names.split(",");
    let temp = [];
    for (let i = 0; i < teamName.length; i++) {
      if (teamName[i] === "") {
        delete temp[i];
      } else {
        let tempName = {};
        tempName["name"] = teamName[i];
        temp.push(tempName);
      }
    }
    await setTeam(temp);
  };

  //initially call the api for getting the data
  const fetchBreakDownData = async (projectBreakdown) => {
    const projectData = JSON.parse(localStorage.getItem("projectName"));
    let breakdownLength = projectData.projectName.breakdown.length;
    setLevelLenght(breakdownLength);
    let selectBreakDown = [];
    const breakDown = projectBreakdown.split(":");
    setSelectDepthAndId(breakDown);
    for (var key in breakDown) {
      //if depth value is 1L then call this api
      if (breakDown[key].slice(0, 2) === "1L") {
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
                  {
                    breakDownLabel:
                      projectData.projectName.breakdown[0].structure[0].name,
                    selectValue: {
                      depth: item.depth,
                      id: item.id,
                      name: item.name,
                      label:
                        projectData.projectName.breakdown[key].structure[0]
                          .name,
                    },
                    breakDownData: result,
                  },
                ];
              }
            });
            //setting the data on breakdown list
            setFetchSelectBreakDownList(selectBreakDown);
          })
          .catch((error) => {
            setIsNext(true);
          });
      }
      else {
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
                    breakDownLabel:
                      projectData.projectName.breakdown[key].structure[0].name,
                    selectValue: {
                      depth: item.depth,
                      id: item.id,
                      name: item.name,
                      label:
                        projectData.projectName.breakdown[key].structure[0]
                          .name,
                    },
                    breakDownData: result,
                  },
                ];
              }
            });
            //setting the data on breakdown list
            setFetchSelectBreakDownList(selectBreakDown);
          })
          .catch((error) => {
            console.log(error);
            setIsNext(true);
          });
      }
    }
    setIsLoading(true);
  };

  const contractor = useRef([]);
  const subContractor = useRef([]);
  let pickListValues = JSON.parse(localStorage.getItem("pickList"));

  // calling picklist getting the contractor or subcontractor values
  const pickListValue = async () => {
    let contractorPickList = await pickListValues["2"];
    let subContractorPickList = await pickListValues["3"];
    let temp = [];
    let tempSubContractor = [];
    for (let i = 0; i < contractorPickList.length; i++) {
      let contractorValue = "";
      contractorValue = contractorPickList[i].value;
      temp.push(contractorValue);
    }
    contractor.current = temp;
    for (let i = 0; i < subContractorPickList.length; i++) {
      let subContractorValue = "";
      subContractorValue = subContractorPickList[i].value;
      tempSubContractor.push(subContractorValue);
    }
    subContractor.current = tempSubContractor;
  };

  //method to dynamically call an api when we select a value on dropdown
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

    //when we select any dropdown so it would select on this state
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
              history.push("/app/pages/error")
            });
        }
      }
    }
  };

  // get departments for calling the representative
  const getDepartments = async () => {
    const config = {
      method: 'get',
      url: `${SSO_URL}/api/v1/companies/${fkCompanyId}/departments/`,
      headers: HEADER_AUTH,
    };
    const res = await api(config);
    let rep = res.data.data.results.map((value, index) => value.departmentName)
    setDepartments(rep);
  };

  useEffect(() => {
    pickListValue();
    getDepartments();
    // getting the data as per the exiting ids
    if (id) {
      fetchComplianceData();
    } else {
      setIsLoading(true);
    }
  }, []);

  return (
    <Acl
      module="safety-compliance"
      action={id ? "change_compliance" : 'add_compliance'}
      html={(
        <CustomPapperBlock title="Compliance"
          icon="customDropdownPageIcon compliancePageIcon"
          whiteBg
        >
          <>
            {isLoading ? (
              <Grid container spacing={3}>
                <>
                  <Grid container spacing={3} item xs={12} md={9}>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30.961"
                          height="36.053"
                          viewBox="0 0 30.961 36.053"
                        >
                          <path
                            id="generate-report"
                            d="M28.937,25.517l.833.836a.557.557,0,0,1,0,.795l-.669.672a4.534,4.534,0,0,1,.416,1.112h.88a.563.563,0,0,1,.563.563v1.173a.566.566,0,0,1-.563.566h-.947a4.517,4.517,0,0,1-.49,1.076l.613.613a.566.566,0,0,1,0,.8l-.83.848a.566.566,0,0,1-.8,0l-.669-.669a4.658,4.658,0,0,1-1.126.416v.88a.566.566,0,0,1-.563.563H24.415a.566.566,0,0,1-.566-.563v-.947a4.494,4.494,0,0,1-1.079-.493l-.613.616a.566.566,0,0,1-.8,0l-.827-.848a.56.56,0,0,1,0-.795l.669-.672a4.658,4.658,0,0,1-.416-1.112H19.9a.566.566,0,0,1-.546-.563V29.21a.569.569,0,0,1,.563-.566h.933a4.526,4.526,0,0,1,.493-1.073l-.616-.613a.566.566,0,0,1,0-.8l.836-.833a.56.56,0,0,1,.795,0l.672.669a4.643,4.643,0,0,1,1.112-.416V24.7a.566.566,0,0,1,.563-.563h1.173a.566.566,0,0,1,.563.563v.947a4.4,4.4,0,0,1,1.076.493l.619-.622A.569.569,0,0,1,28.937,25.517Zm-11.263,8.8a.88.88,0,0,1,0,1.736H2.021A2.021,2.021,0,0,1,0,34.023V2.009A2,2,0,0,1,2.018,0H26.843a2.024,2.024,0,0,1,2.021,2.021V20.065a.88.88,0,0,1-1.742,0V2.021h0a.285.285,0,0,0-.282-.285H2.021a.276.276,0,0,0-.293.293V34.023h0a.285.285,0,0,0,.285.282H17.674ZM5.573,30.11V28.157h8.456V30.1H5.576Zm16.22-12.583V19.32H19.247V17.528ZM17.237,15.95v3.37H14.689V15.95Zm-4.555-4.828v8.213H10.134V11.122ZM8.124,7.746V19.32H5.573V7.746ZM20.238,8.6l3.845.015a3.854,3.854,0,0,1-1.147,2.725,3.974,3.974,0,0,1-.56.458Zm-.393-.763-.194-4.109a.15.15,0,0,1,.141-.155h.153a4.271,4.271,0,0,1,4.309,3.96.153.153,0,0,1-.138.158l-4.106.293a.144.144,0,0,1-.155-.135h0Zm.243-3.974.191,3.669,3.449-.311a3.426,3.426,0,0,0-1.173-2.305,3.268,3.268,0,0,0-2.44-1.05Zm-.7,4.558,2.053,3.57a4.121,4.121,0,1,1-2.651-7.646l.587,4.077ZM5.573,24.881V22.922H17.557v1.945Zm19.572,2.751a2.314,2.314,0,1,1-2.314,2.314,2.314,2.314,0,0,1,2.314-2.314Z"
                            transform="translate(0 0)"
                            fill="#06425c"
                          />
                        </svg>{" "}
                        Project information
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
                          {id ? (
                            fetchSelectBreakDownList.map((data, key) => (
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
                                    disabled={data.selectValue.id != ''}
                                    onChange={(e) => {
                                      handleBreakdown(
                                        e,
                                        key,
                                        data.breakDownLabel,
                                        data.selectValue
                                      );
                                    }}
                                  >
                                    {data.breakDownData.length !== 0
                                      ? data.breakDownData.map(
                                        (selectvalues, index) => (
                                          <MenuItem
                                            key={index}
                                            value={selectvalues.id}
                                          >
                                            {selectvalues.structureName}
                                          </MenuItem>
                                        )
                                      )
                                      : null}
                                  </Select>
                                  {error && error[`projectStructure${[key]}`] && (
                                    <FormHelperText>
                                      {error[`projectStructure${[key]}`]}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            ))
                          ) : (
                            <ProjectStructureInit
                              selectDepthAndId={selectDepthAndId}
                              setLevelLenght={setLevelLenght}
                              error={error}
                              setWorkArea={setWorkArea}
                              setSelectDepthAndId={setSelectDepthAndId}
                            />
                          )}
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33.449"
                          height="39"
                          viewBox="0 0 33.449 39"
                        >
                          <g
                            id="transfer-inspection"
                            transform="translate(-168.3 -110.5)"
                          >
                            <path
                              id="Path_6411"
                              data-name="Path 6411"
                              d="M317.172,305.422a6.983,6.983,0,1,0-3.442,6.013l1.636,1.709a1.216,1.216,0,1,0,1.758-1.68l-1.543-1.612A6.955,6.955,0,0,0,317.172,305.422Zm-6.977,4.538a4.543,4.543,0,1,1,4.543-4.543A4.548,4.548,0,0,1,310.195,309.96Zm2.123-17.742a1.469,1.469,0,0,0-1.422-1.509H293.241a1.512,1.512,0,0,0,0,3.019H310.9A1.482,1.482,0,0,0,312.318,292.217Zm-19.1,4.231a1.512,1.512,0,0,0,0,3.019h6.967a1.512,1.512,0,0,0,0-3.019ZM310.9,284.5H293.241a1.512,1.512,0,0,0,0,3.019H310.9a1.512,1.512,0,0,0,0-3.019Z"
                              transform="translate(-117.487 -165.528)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6412"
                              data-name="Path 6412"
                              d="M185.487,146.579H171.226s0,0,0,0V113.426s0,0,0,0h27.6s0,0,0,0v17.358a1.461,1.461,0,1,0,2.921,0V113.421a2.924,2.924,0,0,0-2.921-2.921H171.221a2.924,2.924,0,0,0-2.921,2.921v33.157a2.924,2.924,0,0,0,2.921,2.921h14.266a1.461,1.461,0,1,0,0-2.921Z"
                              fill="#06425c"
                            />
                          </g>
                        </svg>{" "}
                        Inspection type
                      </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          <Grid item md={12} xs={12}>
                            <FormControl component="fieldset" error={error.auditType}>
                              <FormLabel
                                component="legend"
                                className="checkRadioLabel"
                              >
                                Select the type of inspection*
                              </FormLabel>
                              <RadioGroup
                                aria-label="select-typeof-compliance"
                                name="select-typeof-compliance"
                                // value={form.auditType}
                                onChange={(e) =>
                                  setForm({ ...form, auditType: e.target.value })
                                }
                              >
                                {auditType.map((option) => (
                                  <FormControlLabel
                                    className="selectLabel"
                                    checked={form.auditType === option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                  />
                                ))}
                              </RadioGroup>
                              {/* {error && error["auditType"] && (
                                <FormHelperText>{error["auditType"]}</FormHelperText>
                              )} */}
                              <div style={{ color: "red" }}>{form.auditType ? '' : error.auditType}</div>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33.2"
                          height="39"
                          viewBox="0 0 33.2 39"
                        >
                          <g
                            id="Group_5731"
                            data-name="Group 5731"
                            transform="translate(-1230 -746)"
                          >
                            <g
                              id="Group_5727"
                              data-name="Group 5727"
                              transform="translate(117.999)"
                            >
                              <path
                                id="personal-information-5"
                                d="M208.566,68.048H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7Z"
                                transform="translate(935.51 677.952)"
                                fill="#06425c"
                              />
                            </g>
                            <g
                              id="Group_5728"
                              data-name="Group 5728"
                              transform="translate(118 5)"
                            >
                              <path
                                id="personal-information-5-2"
                                data-name="personal-information-5"
                                d="M184.6,97.531h13.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Z"
                                transform="translate(935.51 677.952)"
                                fill="#06425c"
                              />
                            </g>
                            <g
                              id="Group_5730"
                              data-name="Group 5730"
                              transform="translate(117.637 1)"
                            >
                              <path
                                id="personal-information-5-3"
                                data-name="personal-information-5"
                                d="M184.6,97.531h6.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Z"
                                transform="translate(935.51 677.952)"
                                fill="#06425c"
                              />
                            </g>
                            <g id="company-7" transform="translate(1233 747.55)">
                              <path
                                id="Path_6422"
                                data-name="Path 6422"
                                d="M16.165,5.481V21.405H5.481V5.481H16.165M16.708,4H4.939A1.036,1.036,0,0,0,4,5.111V21.776a1.036,1.036,0,0,0,.939,1.111H16.708a1.036,1.036,0,0,0,.939-1.111V5.111A1.036,1.036,0,0,0,16.708,4Z"
                                fill="#06425c"
                              />
                              <path
                                id="Path_6423"
                                data-name="Path 6423"
                                d="M151.666,154.091v3.722h-4.907v-3.722h4.907m1.129-1.481h-7.182c-.311,0-.335.176-.335.393v5.9c0,.217.026.393.335.393H152.8c.311,0,.352-.176.352-.393V153C153.147,152.786,153.106,152.61,152.8,152.61Zm6.962-4.944v10.147h-3.7V147.666h3.7m1.183-1.481H154.86c-.263,0-.283.344-.283.77v11.567c0,.426.02.77.283.77h6.081c.263,0,.3-.344.3-.77V146.955C161.239,146.529,161.2,146.185,160.941,146.185Zm-13.237-1.7h-1.963a.741.741,0,1,1,0-1.481H147.7a.741.741,0,0,1,0,1.481Zm5,0H150.74a.741.741,0,1,1,0-1.481H152.7a.741.741,0,0,1,0,1.481Zm-5,2.907h-1.963a.741.741,0,1,1,0-1.481H147.7a.741.741,0,0,1,0,1.481Zm5,0H150.74a.741.741,0,1,1,0-1.481H152.7a.741.741,0,0,1,0,1.481Zm-5,2.907h-1.963a.741.741,0,1,1,0-1.481H147.7a.741.741,0,0,1,0,1.481Zm5,0H150.74a.741.741,0,1,1,0-1.481H152.7a.741.741,0,0,1,0,1.481Z"
                                transform="translate(-138.389 -136.426)"
                                fill="#06425c"
                              />
                              <path
                                id="Path_6424"
                                data-name="Path 6424"
                                d="M684.537,478.481H683.8a.741.741,0,1,1,0-1.481h.735a.741.741,0,0,1,0,1.481Zm0,3.314h-.8a.741.741,0,1,1,0-1.481h.8a.741.741,0,0,1,0,1.481Zm0,3.314h-.674a.741.741,0,0,1,0-1.481h.674a.741.741,0,0,1,0,1.481Z"
                                transform="translate(-666.427 -464.242)"
                                fill="#06425c"
                              />
                            </g>
                          </g>
                        </svg>{" "}
                        Company representative information
                      </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          <Grid item md={6} xs={12}>
                            {/* <Autocomplete
                              id="clientRep"
                              className="formControl"
                              options={departments}
                              // className={classes.mT30}
                              getOptionLabel={(option) => option}
                              value={
                                form.hseRepresentative ? form.hseRepresentative : ""
                              }
                              onSelect={(e) =>
                                setForm({
                                  ...form,
                                  hseRepresentative: e.target.value,
                                })
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Safety representative name"
                                  variant="outlined"
                                />
                              )}
                            /> */}
                            <TextField
                              label="Safety representative name"
                              name="clientrepnu"
                              id="clientRep"
                              inputProps={{ maxLength: "45" }}
                              fullWidth
                              value={form.hseRepresentative ? form.hseRepresentative : ""}
                              onChange={(e) =>
                                setForm({ ...form, hseRepresentative: e.target.value })
                              }
                              variant="outlined"
                              className="formControl"
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              label="Safety representative number"
                              name="clientrepnu"
                              id="clientrepnu"
                              inputProps={{ maxLength: "20" }}
                              fullWidth
                              value={form.hseRepNumber ? form.hseRepNumber : ""}
                              onChange={(e) =>
                                setForm({ ...form, hseRepNumber: e.target.value })
                              }
                              variant="outlined"
                              className="formControl"
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="33.2"
                          height="39"
                          viewBox="0 0 33.2 39"
                        >
                          <g
                            id="Group_5723"
                            data-name="Group 5723"
                            transform="translate(-1112 -746)"
                          >
                            <path
                              id="personal-information-5"
                              d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Zm0-5.145h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Z"
                              transform="translate(935.51 677.952)"
                              fill="#06425c"
                            />
                            <g
                              id="construction-engineer"
                              transform="translate(1122 751.5)"
                            >
                              <path
                                id="Path_5202"
                                data-name="Path 5202"
                                d="M0,12.081H3.4V7.893a.35.35,0,0,1,.01-.082C.577,8.215.721,9.52,0,12.081ZM4.306,3.614v.527l.18.247a.226.226,0,0,1,.044.124h0a2.728,2.728,0,0,0,.676,1.844,2.494,2.494,0,0,0,1.4.6,2.254,2.254,0,0,0,1.4-.743,2.991,2.991,0,0,0,.626-1.7.231.231,0,0,1,.033-.1h0l.16-.265,0-.549.472,0,0,.6a.235.235,0,0,1-.034.139L9.1,4.609A3.418,3.418,0,0,1,8.37,6.517a2.728,2.728,0,0,1-1.722.911.236.236,0,0,1-.077,0A2.957,2.957,0,0,1,4.877,6.7a3.119,3.119,0,0,1-.813-2.083l-.173-.237a.239.239,0,0,1-.059-.158v-.6h.474ZM6.477,0a3.22,3.22,0,0,1,.66.068l-.04,1.9L7.789.277A3.235,3.235,0,0,1,9.664,2.694h.374v.444h-.33v.006H3.246V3.138h-.27V2.694H3.29A3.235,3.235,0,0,1,5.262.237l.6,1.7L5.93.047A3.22,3.22,0,0,1,6.477,0ZM6.146,10.562h.721v.721H6.146v-.721Zm0-1.784h.721V9.5H6.146V8.779Zm-2.084,3.3H8.952V7.893a.318.318,0,0,1,.034-.145l-2.479.015L4.028,7.748a.332.332,0,0,1,.034.145v4.188Zm5.557,0h3.4c-.721-2.561-.577-3.866-3.406-4.268a.344.344,0,0,1,.01.082v4.187Z"
                                fill="#06425c"
                                fill-rule="evenodd"
                              />
                            </g>
                          </g>
                        </svg>{" "}
                        Contractor information
                      </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          <Grid item md={6} xs={12}>
                            <Autocomplete
                              id="clientRep"
                              className="formControl"
                              options={contractor.current}
                              getOptionLabel={(option) => option}
                              defaultValue={form.contractor || ''}
                              // onSelect={(e) =>
                              //   setForm({ ...form, contractor: e.target.value })
                              // }
                              onChange={(event, newValue) => {
                                if (newValue === null) {
                                  newValue = ""
                                }
                                setForm({
                                  ...form,
                                  contractor: newValue
                                })
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Contractor name*"
                                  variant="outlined"
                                />
                              )}
                            />
                            <div style={{ color: "red" }}>{(form.contractor === null || form.contractor === "") && error.contractor}</div>
                          </Grid>

                          <Grid item md={6} xs={12}>
                            <TextField
                              label="Contractor representative number"
                              inputProps={{ maxLength: "20" }}
                              name="contractorrapnu"
                              id="contractorrapnu"
                              value={
                                form.contractorRepNumber
                                  ? form.contractorRepNumber
                                  : ""
                              }
                              fullWidth
                              variant="outlined"
                              className="formControl"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  contractorRepNumber: e.target.value,
                                })
                              }
                            />
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <Autocomplete
                              id="clientRep"
                              className="formControl"
                              options={subContractor.current}
                              // className={classes.mT30}
                              getOptionLabel={(option) => option}
                              // value={form.subContractor ? form.subContractor : ""}
                              onSelect={(e) =>
                                setForm({ ...form, subContractor: e.target.value })
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Sub-Contractor name "
                                  variant="outlined"
                                // error={error.subContractor}
                                // helperText={
                                //   error.subContractor ? error.subContractor : ""
                                // }
                                />
                              )}
                            />
                            <div style={{ color: "red" }}>{form.subContractor ? '' : error.subContractor}</div>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              label="Contractor supervisor name "
                              name="contractorsupername"
                              id="contractorsupername"
                              value={
                                form.contractorSupervisorName
                                  ? form.contractorSupervisorName
                                  : ""
                              }
                              fullWidth
                              variant="outlined"
                              className="formControl"
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  contractorSupervisorName: e.target.value,
                                })
                              }
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Typography variant="h6" className="sectionHeading">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="34.306"
                          height="39"
                          viewBox="0 0 34.306 39"
                        >
                          <g
                            id="Group_5720"
                            data-name="Group 5720"
                            transform="translate(-764 -746)"
                          >
                            <g
                              id="transfer-inspection"
                              transform="translate(595.7 635.5)"
                            >
                              <path
                                id="Path_6411"
                                data-name="Path 6411"
                                d="M312.318,292.217a1.469,1.469,0,0,0-1.422-1.509H293.241a1.512,1.512,0,0,0,0,3.019H310.9A1.482,1.482,0,0,0,312.318,292.217Zm-19.1,4.231a1.512,1.512,0,0,0,0,3.019h6.967a1.512,1.512,0,0,0,0-3.019ZM310.9,284.5H293.241a1.512,1.512,0,0,0,0,3.019H310.9a1.512,1.512,0,0,0,0-3.019Z"
                                transform="translate(-117.487 -165.528)"
                                fill="#06425c"
                              />
                              <path
                                id="Path_6412"
                                data-name="Path 6412"
                                d="M185.487,146.579H171.226s0,0,0,0V113.426s0,0,0,0h27.6s0,0,0,0v17.358a1.461,1.461,0,1,0,2.921,0V113.421a2.924,2.924,0,0,0-2.921-2.921H171.221a2.924,2.924,0,0,0-2.921,2.921v33.157a2.924,2.924,0,0,0,2.921,2.921h14.266a1.461,1.461,0,1,0,0-2.921Z"
                                fill="#06425c"
                              />
                            </g>
                            <g id="Group_5719" data-name="Group 5719">
                              <g
                                id="groups-svgrepo-com"
                                transform="translate(763.725 744.337)"
                              >
                                <g
                                  id="Group_5616"
                                  data-name="Group 5616"
                                  transform="translate(16 25)"
                                >
                                  <path
                                    id="Path_6342"
                                    data-name="Path 6342"
                                    d="M21.657,32.487a4.79,4.79,0,0,1-.738-2.569,4.661,4.661,0,0,1,1.776-3.8A2.268,2.268,0,0,0,20.646,25a2.487,2.487,0,0,0-2.459,2.733,2.573,2.573,0,0,0,.792,1.94,1.45,1.45,0,0,1,.547,1.011c0,.383-.137.71-1.038,1.093-1.284.574-2.459,1.312-2.487,2.514a1.266,1.266,0,0,0,1.257,1.366h1.175a.529.529,0,0,0,.465-.273,5.583,5.583,0,0,1,2.541-2.131A.509.509,0,0,0,21.657,32.487Z"
                                    transform="translate(-16 -25)"
                                    fill="#06425c"
                                  />
                                </g>
                                <g
                                  id="Group_5617"
                                  data-name="Group 5617"
                                  transform="translate(27.887 25)"
                                >
                                  <path
                                    id="Path_6343"
                                    data-name="Path 6343"
                                    d="M63.708,31.777c-.9-.383-1.038-.738-1.038-1.093a1.45,1.45,0,0,1,.547-1.011,2.573,2.573,0,0,0,.792-1.94A2.487,2.487,0,0,0,61.549,25,2.268,2.268,0,0,0,59.5,26.12a4.623,4.623,0,0,1,1.776,3.8,4.564,4.564,0,0,1-.738,2.569.542.542,0,0,0,.219.792A5.583,5.583,0,0,1,63.3,35.411a.529.529,0,0,0,.465.273h1.175a1.266,1.266,0,0,0,1.257-1.366C66.168,33.116,64.993,32.351,63.708,31.777Z"
                                    transform="translate(-59.5 -25)"
                                    fill="#06425c"
                                  />
                                </g>
                                <g
                                  id="Group_5618"
                                  data-name="Group 5618"
                                  transform="translate(20.099 26.913)"
                                >
                                  <path
                                    id="Path_6344"
                                    data-name="Path 6344"
                                    d="M38.569,39.487c-.984-.41-1.12-.792-1.12-1.2a1.644,1.644,0,0,1,.6-1.12,2.86,2.86,0,0,0,.9-2.159,2.745,2.745,0,1,0-5.465,0,2.9,2.9,0,0,0,.9,2.159,1.644,1.644,0,0,1,.6,1.12c0,.41-.164.792-1.12,1.2-1.476.6-2.842,1.312-2.869,2.623a1.559,1.559,0,0,0,1.448,1.64h7.487a1.559,1.559,0,0,0,1.448-1.64C41.357,40.8,39.99,40.089,38.569,39.487Z"
                                    transform="translate(-31 -32)"
                                    fill="#06425c"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>{" "}
                        Inspection team
                      </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                      <Paper elevation={1} className="paperSection">
                        <Grid container spacing={3}>
                          {team.map((option, index) => (
                            <>
                              <Grid
                                item
                                md={6}
                                xs={11}
                                className={classes.inputFieldWithLabel}
                              >
                                <TextField
                                  label="Member name"
                                  name="inspectionteammem"
                                  id="inspectionteammem"
                                  multiline
                                  value={team[index].name}
                                  onChange={(e) => handelTeamName(e, index)}
                                  fullWidth
                                  variant="outlined"
                                  className="formControl"
                                  inputProps={{ maxLength: 255 }}
                                />
                              </Grid>
                              {team.length > 1 ? (
                                <Grid item md={1} className={classes.createHazardbox}>
                                  <IconButton
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => {
                                      handelRemove(e, index);
                                    }}
                                  >
                                    <DeleteForeverIcon />
                                  </IconButton>
                                </Grid>
                              ) : null}
                            </>
                          ))}
                          {/* <Grid item md={1} className={classes.createHazardbox}>
                      <IconButton
                        variant="contained"
                        color="primary"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Grid> */}
                          <Grid item md={12} className={classes.createHazardboxBTN}>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<AddCircleIcon />}
                              className={classes.button}
                              onClick={() => handelTeam()}
                            >
                              Add
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <FormSideBar
                      deleteForm={[1, 2, 3]}
                      listOfItems={COMPLIANCE}
                      selectedItem="Compliance Details"
                    />
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                    <div className={classes.loadingWrapper}>
                      <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        className="spacerRight buttonStyle"
                        disabled={loading}
                        onClick={() => handelNext()}
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
                    {/* <div className={classes.loadingWrapper}>
                <Button size="medium" variant="contained" color="primary" className="spacerRight buttonStyle" disabled={saveLoading} onClick={() => handelNext()}>
                  Save
                </Button>
                {saveLoading && (
                    <CircularProgress
                      size={24}
                      className={classes.buttonProgress}
                    />
                  )}
                </div> */}
                    <Button
                      size="medium"
                      variant="contained"
                      color="secondary"
                      className="buttonStyle custmCancelBtn"
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </>
              </Grid>
            ) : (
              <Loader />
            )}
          </>
        </CustomPapperBlock>
      )} />

  );
};

export default ComplianceDetails;
