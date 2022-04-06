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
import Paper from "@material-ui/core/Paper";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import {
  HEADER_AUTH,
  SSO_URL,
} from "../../../utils/constants";
import CustomPapperBlock from 'dan-components/CustomPapperBlock/CustomPapperBlock';

import Loader from "../../Pages/Loader";

import QuestionEditValidation from "../Validation/QuestionEditValidation";
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
      borderBottom: "0.063rem solid #ccc",
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
      padding: "35px",
      borderWidth: "2px",
      borderRadius: "2px",
      borderColor: "#06425c",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      marginTop: "0.625rem",
      cursor: "pointer",
    },
  },
  createHazardbox: {
    paddingTop: "0rem !important",
    paddingBottom: "0rem !important",
    "& button": {
      marginTop: "8px",
    },
  },
  inputFieldWithLabel: {
    paddingTop: "0rem !important",
    paddingBottom: "0rem !important",
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
  marginR8: {
    marginRight: "0.5rem",
  },

  formBox: {
    "& .dropzone": {
      flex: "1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2.188rem",
      borderWidth: "2px",
      borderRadius: "2px",
      borderColor: "#06425c",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      outline: "none",
      transition: "border .24s ease-in-out",
      marginTop: "0.625rem",
      cursor: "pointer",
    },
  },
  uploadProgressBox: {
    padding: "0.313rem",
    marginTop: "20px",
  },
  uploadFileDetail: {
    paddingTop: "0.625rem",
    display: "block",
    fontSize: "16px",
    color: "#06425c",
  },
  msgUploadSection: {
    flexGrow: "initial",
    minWidth: "288px",
    width: "500px",
    backgroundColor: "#ff8533",
    color: "#ffffff",
    position: "absolute",
    bottom: "0rem",
    left: "0%",
    "& .MuiCardContent-root": {
      paddingBottom: "16px",
    },
  },
}));

const QuestionEdit = (props) => {
  const classes = useStyles();
  const { id } = useParams("");
  const history = useHistory();
  const [auditData, setAuditData] = useState({});
  const [checkGroups, setCheckListGroups] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [fetchSelectBreakDownList, setFetchSelectBreakDownList] = useState([]);
  const [selectDepthAndId, setSelectDepthAndId] = useState([]);
  const [breakdown1ListData, setBreakdown1ListData] = useState([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const responseType = ["Yes-No-NA", "Criticality Matrix"];
  const scoreType = ["Stars", "1-10", "%"];
  const geoLocation = ["Yes", "No"];
  const evidenceType = ["Yes", "No"];
  const attachment = ["Yes", "No"];

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };


  const fetchAuditData = async (id) => {
    const res = await api.get(
      `/api/v1/configaudits/auditquestions/${id}/?company=${fkCompanyId}&project=${project.projectId
      }&projectStructure=${fkProjectStructureIds}`
    );
    await setAuditData(res.data.data.results[0]);
    await fetchChecklist(res.data.data.results[0].groupName);
    await fetchBreakDownData(res.data.data.results[0].fkProjectStructureIds);
    await setIsLoading(true);
  };

  const fetchChecklist = async (groupName) => {
    let temp = {};
    const res = await api.get(
      `/api/v1/core/checklists/companies/${fkCompanyId}/projects/${project.projectId
      }/compliance/`
    );
    const result = res.data.data.results;
    // await fetchComplianceData(result);
    result.map((option, index) => {
      if (option.checkListLabel === groupName) {
        setCheckData(option.checklistValues);
      }
    });
    await setCheckListGroups(result);
  };

  const handleGroup = async (value, gName) => {
    let temp = { ...auditData };
    temp.groupName = gName;
    temp.subGroupName = "";
    setCheckData(value);
    setAuditData(temp);
  };

  const handleSubGroup = async (sgName) => {
    let temp = { ...auditData };
    temp.subGroupName = sgName;
    setAuditData(temp);
  };

  const handleAllFieldsData = (value, fields) => {
    let temp = { ...auditData };
    temp[fields] = value;
    setAuditData(temp);
  };

  const handleUpdate = async () => {
    const { error, isValid } = QuestionEditValidation(
      auditData,
      selectDepthAndId
    );
    setError(error);
    if (!isValid) {
      return "data not valid";
    }
    auditData["fkProjectStructureIds"] = selectDepthAndId.join(":");
    const res = await api
      .put(
        `/api/v1/configaudits/auditquestions/${id}/?company=${auditData.fkCompanyId
        }&project=${auditData.fkProjectId}&projectStructure=${auditData.fkProjectStructureIds
        }`,
        auditData
      )
      .then((response) => {
        history.push("/app/compliance-config/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchBreakDownData = async (projectBreakdown) => {
    if (projectBreakdown) {
      const projectData = JSON.parse(localStorage.getItem("projectName"));
      let breakdownLength = projectData.projectName.breakdown.length;
      let selectBreakDown = [];
      const breakDown = projectBreakdown.split(":");
      setSelectDepthAndId(breakDown);
      for (var key in breakDown) {
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
              setFetchSelectBreakDownList(selectBreakDown);
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
              setFetchSelectBreakDownList(selectBreakDown);
            })
            .catch((error) => {
              console.log(error);
              setIsNext(true);
            });
        }
      }
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
                setBreakdown1ListData(temp);
              }
            })
            .catch(function (error) { });
        }
      }
    }
  };
  useEffect(() => {
    fetchAuditData(id);
    fetchChecklist();
  }, []);

  return (
    <>
      <CustomPapperBlock title="Edit question" icon='customDropdownPageIcon complianceQuestionPageIcon' whiteBg>

        {isLoading ? (
          <>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Grid container spacing={3}>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32.001"
                        height="25.557"
                        viewBox="0 0 32.001 25.557"
                      >
                        <g id="work-area-32" transform="translate(-220 -1887)">
                          <path
                            id="Subtraction_26"
                            data-name="Subtraction 26"
                            d="M-3076.544,25.557h-30.912a.536.536,0,0,1-.478-.22.555.555,0,0,1,.01-.544L-3103,14.461a.567.567,0,0,1,.468-.3h4.225a.585.585,0,0,1,.391.184c.309.365.614.708.87,1s.547.615.83.947h-5.014a.568.568,0,0,0-.468.3l-3.264,6.844h25.917l-3.263-6.844a.568.568,0,0,0-.468-.3h-5.026c.288-.337.581-.667.83-.947l.011-.012c.27-.3.575-.646.862-.984a.586.586,0,0,1,.39-.183h4.234a.568.568,0,0,1,.468.3l4.927,10.332a.556.556,0,0,1,.01.544A.536.536,0,0,1-3076.544,25.557Zm-15.46-5.7a.513.513,0,0,1-.482-.331,16.937,16.937,0,0,0-3.508-5.2c-1.406-1.579-2.733-3.069-3.135-5.391a7.887,7.887,0,0,1,1.488-6.112,7.01,7.01,0,0,1,4.929-2.791c.234-.023.472-.034.706-.034a7.334,7.334,0,0,1,7.25,7.4c0,3.267-1.511,4.963-3.26,6.928a16.946,16.946,0,0,0-3.51,5.2A.509.509,0,0,1-3092,19.86ZM-3092,2a5.006,5.006,0,0,0-5,5,5.006,5.006,0,0,0,5,5,5.006,5.006,0,0,0,5-5A5.005,5.005,0,0,0-3092,2Z"
                            transform="translate(3328 1887)"
                            fill="#06425c"
                          />
                          <path
                            id="noun-information-4514363_1_"
                            data-name="noun-information-4514363 (1)"
                            d="M39.177,34.509a.949.949,0,0,1,.944.944.921.921,0,0,1-.944.944.949.949,0,0,1-.944-.944A.922.922,0,0,1,39.177,34.509ZM38.683,43a1.2,1.2,0,0,1-1.168-1.528l.809-2.7a.449.449,0,0,0-.449-.584h-.4a1.646,1.646,0,0,1,1.573-1.123A1.2,1.2,0,0,1,40.211,38.6l-.809,2.7a.449.449,0,0,0,.449.584h.4A1.646,1.646,0,0,1,38.683,43Z"
                            transform="translate(197.137 1855.245)"
                            fill="#06425c"
                          />
                        </g>
                      </svg>{" "}
                      Work area information
                    </Typography>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">

                    <Paper elevation={1} className="paperSection">
                      <FormLabel component="legend" className="checkRadioLabel">(If selected all  compliance questions will be available across the projects)</FormLabel>

                      <Grid container spacing={3}>
                        {fetchSelectBreakDownList.map((data, key) => (
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
                        ))}
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item md={9} sm={8} xs={8} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <g id="group-32" transform="translate(-611.999 -210.999)">
                          <g
                            id="Rectangle_1911"
                            data-name="Rectangle 1911"
                            transform="translate(611.999 210.999)"
                            fill="none"
                            stroke="#707070"
                            stroke-width="1"
                            opacity="0"
                          >
                            <rect width="32" height="32" stroke="none" />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="31"
                              height="31"
                              fill="none"
                            />
                          </g>
                          <g
                            id="noun-group-3455272-FF9C34"
                            transform="translate(611.999 216.333)"
                          >
                            <path
                              id="Path_6440"
                              data-name="Path 6440"
                              d="M418.276,226.952a5.476,5.476,0,1,1,5.476-5.476A5.483,5.483,0,0,1,418.276,226.952Zm0-8.846a3.37,3.37,0,1,0,3.37,3.37A3.371,3.371,0,0,0,418.276,218.106Z"
                              transform="translate(-402.294 -216)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6441"
                              data-name="Path 6441"
                              d="M816.4,339.2a4,4,0,1,1,4-4A4,4,0,0,1,816.4,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,816.4,333.306Z"
                              transform="translate(-790.406 -327.83)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6442"
                              data-name="Path 6442"
                              d="M118,339.2a4,4,0,1,1,4-4A4,4,0,0,1,118,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,118,333.306Z"
                              transform="translate(-112.034 -327.83)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6443"
                              data-name="Path 6443"
                              d="M765.182,543.828a21.412,21.412,0,0,1-3.089-.176l-.878-.14v-1.018a6.989,6.989,0,0,0-1.264-3.967L759.6,538l.281-.562a6.053,6.053,0,0,1,5.265-3.44,6.3,6.3,0,0,1,6,6.318c0,3.51-3.3,3.51-5.968,3.51Zm-1.9-2.176c.6.035,1.264.07,1.9.07,3.545,0,3.861-.351,3.861-1.4a4.223,4.223,0,0,0-3.9-4.212,3.808,3.808,0,0,0-3.089,1.755,8.933,8.933,0,0,1,1.229,3.791Z"
                              transform="translate(-739.152 -524.697)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6444"
                              data-name="Path 6444"
                              d="M52.768,543.829c-2.668,0-5.968,0-5.968-3.51A6.227,6.227,0,0,1,52.768,534a6.03,6.03,0,0,1,5.265,3.44l.281.562-.351.527a6.99,6.99,0,0,0-1.229,3.967v1.053l-.878.105a21.4,21.4,0,0,1-3.089.176Zm0-7.723a4.143,4.143,0,0,0-3.861,4.212c0,1.053.316,1.4,3.861,1.4a17.447,17.447,0,0,0,1.9-.07,9.387,9.387,0,0,1,1.194-3.791,3.809,3.809,0,0,0-3.089-1.755Z"
                              transform="translate(-46.8 -524.698)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6445"
                              data-name="Path 6445"
                              d="M321.389,532.02c-3.837,0-8.189,0-8.189-4.7,0-4.844,3.735-8.916,8.189-8.916s8.189,4.072,8.189,8.916C329.577,532.02,325.226,532.02,321.389,532.02Zm0-11.514c-3.255,0-6.133,3.194-6.133,6.81,0,2.141,1.1,2.6,6.133,2.6s6.133-.456,6.133-2.6C327.521,523.7,324.643,520.506,321.389,520.506Z"
                              transform="translate(-305.407 -509.554)"
                              fill="#06425c"
                            />
                          </g>
                        </g>
                      </svg>
                      Groups
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              className="checkRadioLabel"
                              component="legend"
                            >
                              Group name
                            </FormLabel>
                            <RadioGroup aria-label="select-typeof-compliance" name="select-typeof-compliance">
                              {checkGroups.map((option) => (
                                <FormControlLabel
                                  value={option.checkListLabel}
                                  checked={
                                    option.checkListLabel === auditData.groupName
                                  }
                                  className="selectLabel"
                                  control={<Radio />}
                                  onChange={(e) =>
                                    handleGroup(
                                      option.checklistValues,
                                      option.checkListLabel
                                    )
                                  }
                                  label={option.checkListLabel}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              className="checkRadioLabel"
                              component="legend"
                            >
                              SubGroup name
                            </FormLabel>
                            <RadioGroup row aria-label="gender" name="gender1">
                              {checkData.map((option) => (
                                <FormControlLabel
                                  value={option.inputLabel}
                                  checked={
                                    option.inputLabel === auditData.subGroupName
                                  }
                                  className="selectLabel"
                                  onChange={(e) =>
                                    handleSubGroup(option.inputLabel)
                                  }
                                  control={<Radio />}
                                  label={option.inputLabel}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <g id="group-32" transform="translate(-611.999 -210.999)">
                          <g
                            id="Rectangle_1911"
                            data-name="Rectangle 1911"
                            transform="translate(611.999 210.999)"
                            fill="none"
                            stroke="#707070"
                            stroke-width="1"
                            opacity="0"
                          >
                            <rect width="32" height="32" stroke="none" />
                            <rect
                              x="0.5"
                              y="0.5"
                              width="31"
                              height="31"
                              fill="none"
                            />
                          </g>
                          <g
                            id="noun-group-3455272-FF9C34"
                            transform="translate(611.999 216.333)"
                          >
                            <path
                              id="Path_6440"
                              data-name="Path 6440"
                              d="M418.276,226.952a5.476,5.476,0,1,1,5.476-5.476A5.483,5.483,0,0,1,418.276,226.952Zm0-8.846a3.37,3.37,0,1,0,3.37,3.37A3.371,3.371,0,0,0,418.276,218.106Z"
                              transform="translate(-402.294 -216)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6441"
                              data-name="Path 6441"
                              d="M816.4,339.2a4,4,0,1,1,4-4A4,4,0,0,1,816.4,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,816.4,333.306Z"
                              transform="translate(-790.406 -327.83)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6442"
                              data-name="Path 6442"
                              d="M118,339.2a4,4,0,1,1,4-4A4,4,0,0,1,118,339.2Zm0-5.9a1.9,1.9,0,1,0,1.9,1.9A1.888,1.888,0,0,0,118,333.306Z"
                              transform="translate(-112.034 -327.83)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6443"
                              data-name="Path 6443"
                              d="M765.182,543.828a21.412,21.412,0,0,1-3.089-.176l-.878-.14v-1.018a6.989,6.989,0,0,0-1.264-3.967L759.6,538l.281-.562a6.053,6.053,0,0,1,5.265-3.44,6.3,6.3,0,0,1,6,6.318c0,3.51-3.3,3.51-5.968,3.51Zm-1.9-2.176c.6.035,1.264.07,1.9.07,3.545,0,3.861-.351,3.861-1.4a4.223,4.223,0,0,0-3.9-4.212,3.808,3.808,0,0,0-3.089,1.755,8.933,8.933,0,0,1,1.229,3.791Z"
                              transform="translate(-739.152 -524.697)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6444"
                              data-name="Path 6444"
                              d="M52.768,543.829c-2.668,0-5.968,0-5.968-3.51A6.227,6.227,0,0,1,52.768,534a6.03,6.03,0,0,1,5.265,3.44l.281.562-.351.527a6.99,6.99,0,0,0-1.229,3.967v1.053l-.878.105a21.4,21.4,0,0,1-3.089.176Zm0-7.723a4.143,4.143,0,0,0-3.861,4.212c0,1.053.316,1.4,3.861,1.4a17.447,17.447,0,0,0,1.9-.07,9.387,9.387,0,0,1,1.194-3.791,3.809,3.809,0,0,0-3.089-1.755Z"
                              transform="translate(-46.8 -524.698)"
                              fill="#06425c"
                            />
                            <path
                              id="Path_6445"
                              data-name="Path 6445"
                              d="M321.389,532.02c-3.837,0-8.189,0-8.189-4.7,0-4.844,3.735-8.916,8.189-8.916s8.189,4.072,8.189,8.916C329.577,532.02,325.226,532.02,321.389,532.02Zm0-11.514c-3.255,0-6.133,3.194-6.133,6.81,0,2.141,1.1,2.6,6.133,2.6s6.133-.456,6.133-2.6C327.521,523.7,324.643,520.506,321.389,520.506Z"
                              transform="translate(-305.407 -509.554)"
                              fill="#06425c"
                            />
                          </g>
                        </g>
                      </svg>{" "}
                      Question
                    </Typography>
                  </Grid>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        <Grid item md={12} sm={12} xs={12}>
                          <TextField
                            label="Question *"
                            name="question"
                            id="question"
                            error={error.question}
                            helperText={error.question ? error.question : ""}
                            value={auditData.question ? auditData.question : ""}
                            fullWidth
                            variant="outlined"
                            className="formControl"
                            onChange={(e) =>
                              handleAllFieldsData(e.target.value, "question")
                            }
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              component="legend"
                              className="checkRadioLabel"
                            >
                              Response type*
                            </FormLabel>
                            <RadioGroup
                              aria-label="gender"
                              name="gender1"
                              onChange={(e) =>
                                handleAllFieldsData(
                                  e.target.value,
                                  "responseType"
                                )
                              }
                            >
                              {responseType.map((option) => (
                                <FormControlLabel
                                  value={option}
                                  checked={auditData.responseType === option}
                                  className="selectLabel"
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              component="legend"
                              className="checkRadioLabel"
                            >
                              Record geo location
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="gender"
                              name="gender1"
                              onChange={(e) =>
                                handleAllFieldsData(e.target.value, "geoLocation")
                              }
                            >
                              {geoLocation.map((option) => (
                                <FormControlLabel
                                  value={option}
                                  checked={auditData.geoLocation === option}
                                  className="selectLabel"
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <Grid container spacing={2}>
                            <Grid item md={4} xs={12}>
                              <FormControl
                                variant="outlined"
                                className="formControl"
                              >
                                <InputLabel id="scores">Scores</InputLabel>
                                <Select
                                  id="scores"
                                  labelId="scores"
                                  label="Scores"
                                  value={
                                    auditData.scoreType ? auditData.scoreType : ""
                                  }
                                  onChange={(e) =>
                                    handleAllFieldsData(
                                      e.target.value,
                                      "scoreType"
                                    )
                                  }
                                >
                                  {scoreType.map((option) => (
                                    <MenuItem value={option}>{option}</MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              component="legend"
                              className="checkRadioLabel"
                            >
                              Media attachment (Image / audio / video)
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="gender"
                              name="gender1"
                              onChange={(e) =>
                                handleAllFieldsData(
                                  e.target.value,
                                  "evidenceType"
                                )
                              }
                            >
                              {evidenceType.map((option) => (
                                <FormControlLabel
                                  value={option}
                                  checked={auditData.evidenceType === option}
                                  className="selectLabel"
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl component="fieldset">
                            <FormLabel
                              component="legend"
                              className="checkRadioLabel"
                            >
                              Document attachment (document / pdf)
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="gender"
                              name="gender1"
                              onChange={(e) =>
                                handleAllFieldsData(e.target.value, "attachment")
                              }
                            >
                              {attachment.map((option) => (
                                <FormControlLabel
                                  value={option}
                                  checked={auditData.attachment === option}
                                  className="selectLabel"
                                  control={<Radio />}
                                  label={option}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12} sm={12} xs={12} className="buttonActionArea">
                <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  className="spacerRight buttonStyle"
                  onClick={() => handleUpdate()}
                >
                  Update
                </Button>
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
            </Grid>
          </>
        ) : (
          <Loader />
        )}
      </CustomPapperBlock>
    </>
  );
};

export default QuestionEdit;
