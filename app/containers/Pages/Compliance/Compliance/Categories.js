import React, { useEffect, useState, Component } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Paper from "@material-ui/core/Paper";
import FormSideBar from "../../../Forms/FormSideBar";
import { COMPLIANCE } from "../Constants/Constants";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../../utils/axios";
import { subDays } from "date-fns/esm";
import Loader from "../../Loader";
import { CircularProgress } from "@material-ui/core";

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
      marginTop: "10px",
      cursor: "pointer",
    },
  },
  // customCheckBoxList: {
  //   display: 'block',
  //   '& .MuiFormControlLabel-root': {
  //     width: '30%',
  //     [theme.breakpoints.down("xs")]: {
  //       width: '48%',
  //     },
  //   },
  // },
  createHazardbox: {
    paddingTop: "0px !important",
    paddingBottom: "0px !important",
    "& button": {
      marginTop: "8px",
    },
  },
  inputFieldWithLabel: {
    paddingTop: "0px !important",
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

const Categories = () => {
  const history = useHistory();
  const [checkGroups, setCheckListGroups] = useState([]);
  const [checkData, setCheckData] = useState([]);
  const [form, setForm] = useState({});
  const [checkListGroupsData, setCheckListGroupsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupId, setGroupId] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subGroupId, setSubGroupId] = useState([]);
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const workArea = [
    { title: "Operation" },
    { title: "Functional" },
    { title: "Foundation" },
    { title: "Production" },
  ];

  const handelSubmit = async () => {
    form["groupIds"] = groupId.toString();
    form["subGroupIds"] = subGroupId.toString();
    form["updatedBy"] = userId;
    setLoading(true);
    const res = await api
      .put(`/api/v1/audits/${form.id}/`, form)
      .then((response) => {
        history.push("/app/pages/compliance/performance-summary");
        // history.push("/app/pages/compliance/checks");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const classes = useStyles();
  const fetchCheklist = async () => {
    let temp = {};
    const res = await api.get(
      `/api/v1/core/checklists/companies/8/projects/15/compliance/`
    );
    const result = res.data.data.results;
    await fetchComplianceData(result);
    await setCheckListGroups(result);
    await setIsLoading(true);
  };

  const fetchComplianceData = async (data) => {
    let complianceId = localStorage.getItem("fkComplianceId");
    const res = await api
      .get(`/api/v1/audits/${complianceId}/`)
      .then((response) => {
        let result = response.data.data.results;
        let groupIds = result.groupIds.split(",");
        let subGroupIds = result.subGroupIds.split(",");
        setGroupId(groupIds);
        setSubGroupId(subGroupIds);
        let tempGroup = [];
        let tempSubGroup = [];
        for (let i = 0; i < groupIds.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (data[j]["checklistId"] == groupIds[i]) {
              tempGroup.push(data[j]);
            }
          }
        }
        setCheckData(tempGroup);
        setForm(result);
      })
      .catch((error) => console.log(error));
  };

  const handlePhysicalHazards = async (e, value, index) => {
    let tempGroupId = [...groupId];
    let temp = [...checkData];
    if (e.target.checked == false) {
      temp.map((data, key) => {
        if (data["checklistId"] == value["checklistId"]) {
          temp.splice(key, 1);
        }
      });
      tempGroupId.map((data, key) => {
        if (data == value["checklistId"]) {
          tempGroupId.splice(key, 1);
        }
      });
    } else {
      tempGroupId.push(value.checklistId);
      temp.push(value);
    }
    await setGroupId(tempGroupId);
    await setCheckData(temp);
  };

  const handleGroups = async (e, value, index) => {
    let temp = [...subGroupId];
    if (e.target.checked == false) {
      temp.map((data, index) => {
        if (data == value) {
          temp.splice(index, 1);
        }
      });
    } else if (e.target.checked) {
      temp.push(value);
    }
    setSubGroupId(temp);
  };

  const handelSelectOption = (key) => {
    for (let i = 0; i <= groupId.length; i++) {
      if (groupId[i] != undefined && groupId[i] == key["checklistId"]) {
        return true;
      }
    }
  };

  const handelSelectOptionSubGroup = (id) => {
    for (let i = 0; i <= subGroupId.length; i++) {
      if (subGroupId[i] != undefined && subGroupId[i] == id) {
        return true;
      }
    }
  };

  const handleCancel = () => {
    history.push("/app/pages/compliance/performance-summary");
  };
  console.log(checkGroups, "LLLLLLLLLLLLLLLLLLLLLLLLLLL");
  // const fetchCategoryData = async (data) => {
  //   const res = await api.get(
  //     `/api/v1/audits/${localStorage.getItem("fkComplianceId")}/auditresponse/`
  //   );
  //   const result = res.data.data.results;
  //   await setCheckListGroupsData(result)
  //   let temp = {}
  //   for(let i = 0; i < result.length; i++) {
  //     for(var j in data) {
  //       if(result[i]['groupName'] === j){
  //         temp[j] = data[j]
  //       }
  //     }
  //   }
  //   await setCheckData(temp)
  //   await setIsLoading(true)
  // };
  useEffect(() => {
    fetchCheklist();
    fetchComplianceData();
    // fetchCategoryData();
  }, []);
  return (
    <>
      {isLoading ? (
        <>
          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>
              <Grid item md={12} xs={12}>
                <Grid container spacing={3}>
                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Typography variant="h6" className="sectionHeading">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 39 35.181"
                      >
                        <path
                          id="floor-plan"
                          d="M30.051,29.16a.794.794,0,1,1,0-1.587h1.521V21.586H30.1A.794.794,0,0,1,30.1,20h1.473V11.593H25.343v8.422h1.476a.794.794,0,1,1,0,1.587H25.343v1.644a.794.794,0,0,1-1.587,0V11.593H13.119v5.66h5.212a.787.787,0,0,1,.79.787v9.539h4.616V26.106a.794.794,0,1,1,1.587,0v1.473h1.87a.794.794,0,1,1,0,1.587H12.328a.79.79,0,0,1-.79-.79V10.793a.794.794,0,0,1,.79-.79H32.378a.794.794,0,0,1,.775.79V28.369a.79.79,0,0,1-.775.79ZM1.685,26.093l.089-.063a4.6,4.6,0,0,1,.514-.394,5.266,5.266,0,0,1,1.178-.578,7.878,7.878,0,0,1,1.117-.3V1.619c-2.939.451-2.92,3.4-2.9,6.152.076,3.809-.171,13.847,0,18.322Zm4.444-.654a.8.8,0,0,1-.187.46.771.771,0,0,1-.476.26h0a8.889,8.889,0,0,0-1.27.276,3.971,3.971,0,0,0-1.044.476,3.371,3.371,0,0,0-.813.771,5.263,5.263,0,0,0-.667,1.2,6.9,6.9,0,0,0,.13,1.74,3.781,3.781,0,0,0,.581,1.381h0a3.3,3.3,0,0,0,1.121.984,5.552,5.552,0,0,0,1.8.59H37.428V6.031H6.145V25.439Zm0-20.951H37.872A1.13,1.13,0,0,1,39,5.619V34.058a1.146,1.146,0,0,1-.086.429,1.187,1.187,0,0,1-.244.365h0a1.187,1.187,0,0,1-.365.244,1.089,1.089,0,0,1-.429.086H5.262a5.06,5.06,0,0,1-2.27-.673,5.593,5.593,0,0,1-1.879-1.587,5.336,5.336,0,0,1-.825-1.9,8.688,8.688,0,0,1-.165-2.286c0-6.822-.279-14.215,0-20.951A13.553,13.553,0,0,1,.733,2.625C1.364,1.162,2.682.051,5.281,0h.083a.781.781,0,0,1,.781.781v3.7ZM13.113,18.84v8.739h4.428V18.83Z"
                          transform="translate(0.001)"
                          fill="#06425c"
                        />
                      </svg>{" "}
                      Categories
                    </Typography>
                  </Grid>

                  <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                    <Paper elevation={1} className="paperSection">
                      <Grid container spacing={3}>
                        <FormControl component="fieldset">
                          <FormLabel
                            className="checkRadioLabel"
                            component="legend"
                          >
                            Group name
                          </FormLabel>
                          {/* <FormLabel className="checkRadioLabel" component="legend">{key}</FormLabel> */}
                          <FormGroup className={classes.customCheckBoxList}>
                            {checkGroups.map((value, index) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    name={index}
                                    icon={
                                      <CheckBoxOutlineBlankIcon fontSize="small" />
                                    }
                                    checkedIcon={
                                      <CheckBoxIcon fontSize="small" />
                                    }
                                  />
                                }
                                className="selectLabel"
                                label={value.checkListLabel}
                                checked={handelSelectOption(value)}
                                onChange={async (e) =>
                                  handlePhysicalHazards(e, value, index)
                                }
                              />
                            ))}
                          </FormGroup>
                        </FormControl>
                        <Grid item md={6} xs={12}>
                          <Grid container spacing={3}>
                            {checkData.map((value, index) => (
                              <Grid
                                item
                                md={6}
                                xs={12}
                                className={classes.formBox}
                              >
                                <FormControl component="fieldset">
                                  <FormLabel
                                    className="checkRadioLabel"
                                    component="legend"
                                  >
                                    {value["checkListLabel"]}
                                  </FormLabel>
                                  <FormGroup>
                                    {value["checklistValues"].map(
                                      (option, index) => (
                                        <FormControlLabel
                                          control={
                                            <Checkbox
                                              name={option.inputLabel}
                                            />
                                          }
                                          label={option.inputLabel}
                                          checked={handelSelectOptionSubGroup(
                                            option.id
                                          )}
                                          onChange={async (e) =>
                                            handleGroups(e, option.id, index)
                                          }
                                        />
                                      )
                                    )}
                                  </FormGroup>
                                </FormControl>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={COMPLIANCE}
                selectedItem="Categories"
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
                  onClick={() => handelSubmit()}
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
              {/* <Button
            size="medium"
            variant="contained"
            color="primary"
            className="spacerRight buttonStyle"
          >
            Save
          </Button> */}
              <Button
                size="medium"
                variant="contained"
                color="secondary"
                className="buttonStyle custmCancelBtn"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Categories;