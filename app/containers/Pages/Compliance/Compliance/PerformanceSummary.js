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

import Paper from "@material-ui/core/Paper";
import FormSideBar from "../../../Forms/FormSideBar";
import { COMPLIANCE } from "../Constants/Constants";
import api from "../../../../utils/axios";
import { CircularProgress } from "@material-ui/core";
import Loader from "../../Loader";
import { connect } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../../utils/constants";
import CustomPapperBlock from "dan-components/CustomPapperBlock/CustomPapperBlock";

const useStyles = makeStyles((theme) => ({
  // const styles = theme => ({
  root: {
    width: "100%",
  },
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
  notificationButton: {
    borderRadius: "4px",
    backgroundColor: "#83a6b5",
    marginTop: "5px",
    fontSize: "13px",
    fontWeight: "400",
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
  // });
}));

const PerformanceSummary = (props) => {
  const [form, setForm] = useState({});
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [complianceData, setComplianceData] = useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const fetchComplianceData = async () => {
    let complianceId = localStorage.getItem("fkComplianceId");
    const res = await api
      .get(`/api/v1/audits/${complianceId}/`)
      .then((response) => {
        let result = response.data.data.results;
        setForm(result);
        setComplianceData(result)
        setIsLoading(true);
      })
      .catch((error) => console.log(error));
  };

  const handelSubmit = async () => {
    let complianceId = localStorage.getItem("fkComplianceId");
    setLoading(true);
    const res = await api
      .put(`/api/v1/audits/${complianceId}/`, form)
      .then((response) => {
        history.push(
          `/app/pages/compliance/compliance-summary/${complianceId}`
        );
      })
      .catch((error) => {
        console.log(error), setLoading(false);
      });
  };

  const fetchNotificationSent = async () => {
    let companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    let projectId = JSON.parse(localStorage.getItem("projectName")).projectName.projectId;
    let projectStr = JSON.parse(localStorage.getItem("commonObject")).audit.projectStruct;
    const selectBreakdown = props.projectName.breakDown.length > 0 ? props.projectName.breakDown
      : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
        ? JSON.parse(localStorage.getItem("selectBreakDown"))
        : null;
    let struct = "";
    for (const i in selectBreakdown) {
      struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
    }
    const fkProjectStructureIds = struct.slice(0, -1);
    console.log(fkProjectStructureIds,'fkProjectStructureIds')
    try {
      var config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/compliance/?subentity=compliance&roleType=custom&projectStructure=${projectStr}`,
        headers: HEADER_AUTH,
      };
      const res = await api(config);
      if (res.status === 200) {
        const result = res.data.data.results;
        setNotificationSentValue([result]);
      }
    } catch (error) { }
  };

  const handleNotification = (e, value) => {
    if (e.target.checked === true) {
      let temp = [];

      temp.push(value);
      let uniq = [...new Set(temp)];

      setForm({ ...form, notifyTo: temp.toString() });
    } else {
      let temp = [];

      let newData = temp.filter((item) => item !== value);

      setForm({ ...form, notifyTo: newData.toString() });
    }
  };

  const classes = useStyles();

  useEffect(() => {
    fetchNotificationSent();
    fetchComplianceData();
  }, []);
  return (
    <CustomPapperBlock
      title={`Compliance number: ${complianceData.auditNumber ? complianceData.auditNumber : ""
        }`}
      icon="customDropdownPageIcon compliancePageIcon"
      whiteBg
    >
      <>
        {isLoading ? (
          <Grid container spacing={3} className={classes.observationNewSection}>
            <Grid container spacing={3} item xs={12} md={9}>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Typography variant="h6" className="sectionHeading">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="27"
                    height="32"
                    viewBox="0 0 33.2 39"
                  >
                    <g
                      id="Group_5726"
                      data-name="Group 5726"
                      transform="translate(-1540 -746)"
                    >
                      <g
                        id="Group_5725"
                        data-name="Group 5725"
                        transform="translate(427.999)"
                      >
                        <path
                          id="personal-information-5"
                          d="M184.6,100.531h16.977a1.124,1.124,0,1,0,0-2.248H184.6a1.124,1.124,0,0,0,0,2.248Zm23.964-32.483H177.615a1.124,1.124,0,0,0-1.124,1.124v36.752a1.124,1.124,0,0,0,1.124,1.124h30.951a1.124,1.124,0,0,0,1.124-1.124V69.172A1.124,1.124,0,0,0,208.566,68.048ZM207.442,104.8h-28.7V70.3h28.7ZM184.6,95.386h16.977a1.124,1.124,0,0,0,0-2.248H184.6a1.124,1.124,0,1,0,0,2.248Z"
                          transform="translate(935.51 677.952)"
                          fill="#06425c"
                        />
                      </g>
                      <path
                        id="statement-2"
                        d="M186.341,173.22l-6.774-3.683a1.53,1.53,0,0,0-1.467,0l-6.776,3.685a1.6,1.6,0,0,0-.83,1.413v7.143a1.606,1.606,0,0,0,.83,1.413l6.775,3.682a1.531,1.531,0,0,0,1.467,0l6.775-3.684a1.607,1.607,0,0,0,.83-1.414v-7.143A1.6,1.6,0,0,0,186.341,173.22Zm-5.424,3.434a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v4.159a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127-2.1a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v6.256a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm-3.127,3.657a.521.521,0,0,1,.521-.521h1.042a.521.521,0,0,1,.521.521v2.6a.522.522,0,0,1-.521.521h-1.042a.522.522,0,0,1-.521-.521Zm9.131,4.16h-9.9a.261.261,0,0,1,0-.521h9.9a.261.261,0,1,1,0,.521Z"
                        transform="translate(1377.505 581.403)"
                        fill="#06425c"
                      />
                    </g>
                  </svg>{" "}
                  Performance summary
                </Typography>
              </Grid>
              <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
                <Paper elevation={1} className="paperSection">
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        label="Describe here"
                        name="performancesummary"
                        id="performancesummary"
                        multiline
                        rows={4}
                        value={
                          form.performanceSummary ? form.performanceSummary : ""
                        }
                        onChange={(e) =>
                          setForm({ ...form, performanceSummary: e.target.value })
                        }
                        fullWidth
                        variant="outlined"
                        className="formControl"
                      />
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <FormLabel className="checkRadioLabel" component="legend">
                        Notification
                      </FormLabel>
                      <FormGroup>
                        {console.log(notificationSentValue,'notificationSentValue')}
                        {notificationSentValue.length != 0   ? notificationSentValue[0].map((value) => (
                          <FormControlLabel
                            className="selectLabel"
                            control={
                              <Checkbox
                                icon={
                                  <CheckBoxOutlineBlankIcon fontSize="small" />
                                }
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                checked={
                                  form.notifyTo !== null
                                    ? form.notifyTo.includes(value.id)
                                    : ""
                                }
                                name="checkedI"
                                onChange={(e) => handleNotification(e, value.id)}
                              />
                            }
                            label={value.roleName}
                          />
                        )): null}
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Paper>
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
                    Submit
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
                  onClick={() =>
                    history.push(
                      `/app/pages/compliance/compliance-summary/${localStorage.getItem(
                        "fkComplianceId"
                      )}`
                    )
                  }
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={COMPLIANCE}
                selectedItem="Performance summary"
              />
            </Grid>
          </Grid>
        ) : (
          <Loader />
        )}
      </>
    </CustomPapperBlock>

  );
};
const mapStateToProps = (state) => {
  return {
    projectName: state.getIn(["InitialDetailsReducer"]),
    todoIncomplete: state,
  };
};


export default connect(
  mapStateToProps,
  null
)(PerformanceSummary);
