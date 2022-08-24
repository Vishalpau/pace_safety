import React, { useState, useEffect, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { PapperBlock } from "dan-components";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import { Row, Col } from "react-grid-system";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";

import { useDispatch } from "react-redux";
import FormSideBar from "../FormSideBar";
import {
  access_token,
  ACCOUNT_API_URL,
  HEADER_AUTH,
  INITIAL_NOTIFICATION_FORM,
  SUMMERY_FORM,
  LOGIN_URL,
  SSO_URL,
} from "../../../utils/constants";

import ReportingValidation from "../../Validator/ReportingValidation";
import InitialEvidenceValidate from "../../Validator/InitialEvidance";
import api from "../../../utils/axios";
import Attachment from "../../Attachment/Attachment";
import { handelCommonObject } from "../../../utils/CheckerValue";

// Redux
import { tabViewMode } from "../../../redux/actions/initialDetails";
import Loader from "../Loader";
import MultiAttachment from "../../MultiAttachment/MultiAttachment";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  customLabel: {
    marginBottom: 0,
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
  button: {
    margin: theme.spacing(1),
  },
  labelOverflow: {
    "& .MuiInputLabel-outlined": {
      right: "20px",
      lineHeight: "1.2",
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ReportingAndNotification = (props) => {
  const [error, setError] = useState({});
  const [evidenceError, setEvidenceError] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lateReport, SetLateReport] = useState(false);
  const [reportedTo, setReportableTo] = useState([]);
  const [reportOtherData, setReportOtherData] = useState("");
  const [reportedToObj, setReportedToObj] = useState([]);
  const [superVisorNameList, setSuperVisorNameList] = useState([]);
  const [reportedByNameList, setReportedByNameList] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const [notificationSentValue, setNotificationSentValue] = useState([]);
  const [supervisorName, setSupervisorName] = useState("");
  const [reportedByName, setReportedByName] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isNext, setIsnext] = useState(true);
  const [evidanceId, setEvidanceId] = useState([]);
  const [notifyToList, setNotifyToList] = useState([]);
  const [isDateShow, setIsDateShow] = useState(false);
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const [evidanceForm, setEvidanceForm] = useState([
    {
      evidenceCheck: "Yes",
      evidenceNumber: "string",
      evidenceCategory: "Initial Evidence",
      evidenceRemark: "",
      evidenceDocument: null,
      status: "Active",
      createdBy: parseInt(userId),
      updatedBy: parseInt(userId),
      fkIncidentId: localStorage.getItem(""),
    },
  ]);

  const { id } = useParams();
  const history = useHistory();
  const ref = useRef();
  const dispatch = useDispatch();
  let reportedToFilterData = [];
  const filterReportedByName = [];

  const [form, setForm] = useState({
    reportedto: [],
    others: "",
    latereporting: "",
    additionaldetails: "",
    supervisorOtherName: "",
    reportedByOtherName: "",
  });

  // handle update incident
  const handleUpdateIncidentDetails = async () => {
    const fkid = localStorage.getItem("fkincidentId");
    const temp = incidentsListData;
    if (supervisorName === "other") {
      temp.supervisorByName =
        form.supervisorOtherName || incidentsListData.supervisorByName;
    } else {
      temp.supervisorByName =
        supervisorName || incidentsListData.supervisorByName;
    }

    temp.supervisorById = 1;
    temp.incidentReportedOn =
      moment(form.reportingdate).toISOString() ||
      incidentsListData.incidentReportedOn;
    if (reportedByName === "other") {
      temp.incidentReportedByName =
        form.reportedByOtherName || incidentsListData.incidentReportedByName;
    } else {
      temp.incidentReportedByName =
        reportedByName || incidentsListData.incidentReportedByName;
    }

    temp.incidentReportedById = 1;
    temp.reasonLateReporting =
      form.latereporting || incidentsListData.reasonLateReporting;
    temp.notificationComments =
      form.additionaldetails || incidentsListData.notificationComments;
    temp.updatedAt = new Date().toISOString();
    temp.updatedBy = parseInt(userId);

    if (incidentsListData.incidentStage === "Initial notification") {
      temp.incidentStatus = "Done";
    }

    // put call for update incident Details
    // try {
    api
      .put(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`, temp)
      .catch((err) => {
        setIsnext(true);
        history.push("/app/pages/error");
      });

    // }
    // .catch (error) {
    //   setIsnext(true);
    //   history.push('/app/pages/error');
    // }
  };

  const handleRemoveExitingReport = async () => {
    // Delete existing report to and create new ones.
    if (reportedToObj.length > 0) {
      for (const key in reportedToObj) {
        const reportId = reportedToObj[key].id;
        setIsnext(false);
        // try {
        api
          .delete(`/api/v1/incidents/${id}/reports/${reportId}/`)
          .catch((err) => {
            setIsnext(true);
            history.push("/app/pages/error");
          });
        // }
        // catch (err) {
        //   setIsnext(true);
        //   history.push('/app/pages/error');
        // }
      }
    }
  };

  // send request other data in report to
  const setOtherDataReportTo = async (notifyto) => {
    if (reportOtherData !== "") {
      if (form.reportedto.includes("Others")) {
        // try {
        setIsnext(false);
        api
          .post(`/api/v1/incidents/${id}/reports/`, {
            reportTo: reportOtherData,
            createdBy: parseInt(userId),
            notifyTo: notifyto,
            fkIncidentId: localStorage.getItem("fkincidentId") || id,
          })
          .then((res) => {
            return res;
          })
          .catch((err) => {
            setIsnext(true);
            history.push("/app/pages/error");
          });
        // }
        // .catch (err) {
        //   setIsnext(true);
        //   history.push("/app/pages/error");
        // }
      }
    }
  };

  // handleSubmit incident details
  const handelNext = async (e) => {
    if (isNext) {
      setIsnext(false);

      // await handleInitialEvidance();
      const { error, isValid } = InitialEvidenceValidate(evidanceForm);
      setEvidenceError(error);
      const evidanceChecked = isValid;

      if (evidanceChecked === true) {
        for (var key in evidanceForm) {
          if (evidanceForm[key].evidenceDocument !== null) {
            if (typeof evidanceForm[key].evidenceDocument === "string") {
              if (evidanceId.length > 0) {
                for (let i = 0; i < evidanceId.length; i++) {
                  const res = await api
                    .delete(
                      `api/v1/incidents/${localStorage.getItem(
                        "fkincidentId"
                      )}/evidences/${evidanceId[i]}/`
                    )
                    .then();
                }
              }
              // try {
              api
                .put(
                  `api/v1/incidents/${localStorage.getItem(
                    "fkincidentId"
                  )}/evidences/${evidanceForm[key].id}/`,
                  {
                    evidenceCategory: "Initial Evidence",
                    evidenceCheck: "Yes",
                    evidenceNumber: "string",
                    evidenceRemark: evidanceForm[key].evidenceRemark,
                    status: "Active",
                    createdBy: parseInt(userId),
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                    id: evidanceForm[key].id,
                  }
                )
                .catch((err) => {
                  setIsnext(true);
                  history.push("/app/pages/error");
                });
              // } catch (error) {
              // }
            } else {
              if (evidanceId.length > 0) {
                for (let i = 0; i < evidanceId.length; i++) {
                  await api.delete(
                    `api/v1/incidents/${localStorage.getItem(
                      "fkincidentId"
                    )}/evidences/${evidanceId[i]}/`
                  );
                }
              }
              // try {
              const formData = new FormData();

              evidanceForm[key].evidenceDocument.map((file) => {
                formData.append("files", file);
              });
              // formData.append(
              //   "evidenceDocument",
              //   evidanceForm[key].evidenceDocument
              // );
              formData.append(
                "evidenceRemark",
                evidanceForm[key].evidenceRemark
              );
              formData.append("evidenceCheck", "Yes");
              formData.append("evidenceCategory", "Initial Evidence");
              formData.append("createdBy", parseInt(userId));
              formData.append("status", "Active");
              formData.append(
                "fkIncidentId",
                localStorage.getItem("fkincidentId")
              );

              api
                .post(
                  `api/v1/incidents/${localStorage.getItem(
                    "fkincidentId"
                  )}/evidences/`,
                  formData
                )
                .catch((err) => {
                  setIsnext(true);
                  history.push("/app/pages/error");
                });
              // }
              // catch (error) {
              // setIsnext(true);
              // history.push('/app/pages/error');
              // }
            }
          }
        }
      } else {
        console.log("trueeee");
        setIsnext(true);
      }
      // check initial evidance
      if (evidanceChecked === true) {
        let status = 0;

        // Create new entries.
        const stringNotifyList = notifyToList.toString();
        const { error, isValid } = ReportingValidation(
          form,
          reportOtherData,
          stringNotifyList,
          notifyToList.length
        );
        setError(error);

        if (isValid === true && evidanceChecked === true) {
          // handle remove existing report
          await handleRemoveExitingReport();

          // update incident details
          await handleUpdateIncidentDetails();
          // https://us-safety-api.paceos.io/api/v1/incidents/?companyId=2&projectId=9&projectStructureIds=
          // https://us-safety-api.paceos.io/api/v1/incidents/?companyId=2&projectId=9&projectStructureIds=
          const newData = [];
          reportedToFilterData = [];
          for (var key in reportedTo) {
            reportedToFilterData.push(reportedTo[key].inputValue);
          }
          for (let i = 0; i < 8; i++) {
            if (reportedToFilterData.includes(form.reportedto[i])) {
              if (form.reportedto[i] !== undefined) {
                newData.push(form.reportedto[i]);
              }
            }
          }
          const unique = [...new Set(newData)];
          for (const key in unique) {
            const name = unique[key];

            // try {
            api
              .post(
                `/api/v1/incidents/${localStorage.getItem(
                  "fkincidentId"
                )}/reports/`,
                {
                  reportTo: name,
                  createdBy: parseInt(userId),
                  notifyTo: stringNotifyList,
                  fkIncidentId: localStorage.getItem("fkincidentId") || id,
                }
              )
              .then((res) => {
                const viewMode = {
                  initialNotification: true,
                  investigation: false,
                  evidence: false,
                  rootcauseanalysis: false,
                  lessionlearn: false,
                };
                dispatch(tabViewMode(viewMode));
                const resFromData = setOtherDataReportTo(stringNotifyList);
                if (resFromData) {
                  history.push(`${SUMMERY_FORM.Summary}${id}/`);
                }
              })
              // }
              .catch((err) => {
                setIsnext(true);
                history.push("/app/pages/error");
              });
            // .catch (err) {
            // }
          }

          // set in reportTo otherData
          await console.log(status, "status");

          // if (status === 201) {
          //   const viewMode = {
          //     initialNotification: true,
          //     investigation: false,
          //     evidence: false,
          //     rootcauseanalysis: false,
          //     lessionlearn: false,
          //   };
          //   dispatch(tabViewMode(viewMode));
          //   history.push(`${SUMMERY_FORM.Summary}${id}/`);
          // }
        } else {
          setIsnext(true);
        }
      }
    }
  };

  // handle notify to
  const handelNotifyTo = async (e, value) => {
    if (e.target.checked === true) {
      const temp = [...notifyToList];

      temp.push(e.target.value);
      const uniq = [...new Set(temp)];

      setNotifyToList(uniq);
    } else {
      const temp = [...notifyToList];

      const newData = temp.filter((item) => item !== e.target.value);

      setNotifyToList(newData);
    }
  };

  // handle checkbox reported to
  const handelReportedTo = async (e, value, type) => {
    if ((type = "option")) {
      if (e.target.checked == false) {
        const newData = form.reportedto.filter((item) => item !== value);

        setForm({
          ...form,
          reportedto: newData,
        });

        // let newReportedTo = [];
      } else {
        setForm({
          ...form,
          reportedto: [...form.reportedto, value],
        });
      }
    }
  };

  // handle New Evidance

  const handleNewEvidance = () => {
    setEvidanceForm([
      ...evidanceForm,
      {
        evidenceCheck: "Yes",
        evidenceNumber: "string",
        evidenceCategory: "Initial Evidence",
        evidenceRemark: "",
        evidenceDocument: null,
        status: "Active",
        createdBy: parseInt(userId),
        updatedBy: parseInt(userId),
        fkIncidentId: localStorage.getItem(""),
      },
    ]);
  };

  // handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  // handle form initial evidance
  const handleEvidanceForm = async (e, files, key, fieldname) => {
    const temp = [...evidanceForm];
    let value;
    if (e !== undefined) {
      value = e.target.value;
    }

    if (fieldname === "evidenceDocument") {
      const file = files;

      temp[key][fieldname] = file;
      const evdId = temp[key].id;

      if (evdId) {
        setEvidanceId([...evidanceId, evdId]);
      }
    } else {
      temp[key][fieldname] = value;
    }

    setEvidanceForm(temp);
  };

  // handle remove evidance
  const handleRemoveEvidance = async (key, id) => {
    if (id) {
      const res = await api.delete(
        `api/v1/incidents/${localStorage.getItem(
          "fkincidentId"
        )}/evidences/${id}/`
      );
      if (res.status === 200) {
        const temp = [...evidanceForm];
        const newData = temp.filter((item, index) => index !== key);
        setEvidanceForm(newData);
      }
    } else {
      const temp = [...evidanceForm];
      const newData = temp.filter((item, index) => index !== key);
      setEvidanceForm(newData);
    }
  };

  //  Fetch checkbox value
  const fetchReportableTo = async () => {
    const res = await api
      .get("/api/v1/lists/20/value")
      .then((res) => {
        const result = res.data.data.results;

        for (const key in result) {
          reportedToFilterData.push(result[key].inputValue);
        }

        setReportableTo(result);
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  // fetch reportList
  const fetchReportsDataList = async () => {
    await fetchReportableTo();
    await api
      .get(`/api/v1/incidents/${id}/reports/`)
      .then((res) => {
        const result = res.data.data.results;

        if (result.length > 0) {
          if (result[0].notifyTo) {
            const getNotifyTo = result[0].notifyTo.split(",");
            setNotifyToList(getNotifyTo);
          }

          const reportToData = [];
          for (const key in result) {
            reportToData.push(result[key].reportTo);
          }
          for (let i = 0; i < 8; i++) {
            if (!reportedToFilterData.includes(reportToData[i])) {
              if (reportToData[i] !== undefined) {
                setReportOtherData(reportToData[i]);
              }
            }
          }

          setReportedToObj(result);

          setForm({ ...form, reportedto: reportToData });
        }

        setIsLoading(true);
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api
      .get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`)
      .then((res) => {
        if (res.status === 200) {
          const result = res.data.data.results;
          localStorage.setItem(
            "commonObject",
            JSON.stringify({
              incident: { projectStruct: result.fkProjectStructureIds },
            })
          );
          const { incidentOccuredOn } = result;
          const start_time = new Date(incidentOccuredOn);
          const { incidentReportedOn } = result;
          const end_time = new Date(incidentReportedOn);
          const diff = end_time - start_time;
          const hours = Math.floor(diff / 1000 / 60 / 60);

          if (hours >= 4) {
            SetLateReport(true);
          } else {
            SetLateReport(false);
          }
          setSupervisorName(result.supervisorByName);
          setReportedByName(result.incidentReportedByName);
          setIncidentsListdata(result);

          if (!id) {
            setIsLoading(true);
          }
        }
      })

      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  // fetch supervisor name

  const fetchSuperVisorName = () => {
    const companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${companyId}/roles/4/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results[0].roles[0].users;

          setSuperVisorNameList([...result, { name: "other" }]);
        }
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  const fetchReportedBy = () => {
    const companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${companyId}/company-users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
        // 'Cookie': 'csrftoken=IDCzPfvqWktgdVTZcQK58AQMeHXO9QGNDEJJgpMBSqMvh1OjsHrO7n4Y2WuXEROY; sessionid=da5zu0yqn2qt14h0pbsay7eslow9l68k'
      },
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results.users;
          let user = [];
          user = result;
          for (const i in result) {
            filterReportedByName.push(result[i].name);
          }
          setReportedByNameList([...result, { name: "other" }]);
        }
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  // Fetch Evidance data
  const fetchEvidanceData = async () => {
    await api
      .get(`/api/v1/incidents/${id}/evidences/`)
      .then((allEvidence) => {
        if (allEvidence.status === 200) {
          const data = allEvidence.data.data.results.filter(
            (item) => item.evidenceCategory === "Initial Evidence"
          );
          if (data.length > 0) {
            let temp = [...evidanceForm];
            temp = data;
            setEvidanceForm(temp);
          }
          setEvidence(data);
        }
      })
      .catch((error) => {
        history.push("/app/pages/error");
      });
  };

  // fetch value noticefication sent
  const fetchNotificationSent = async () => {
    try {
      const companyId = JSON.parse(localStorage.getItem("company")).fkCompanyId;
      const { projectId } = JSON.parse(
        localStorage.getItem("projectName")
      ).projectName;
      const selectBreakdown =
        props.projectName.breakDown.length > 0
          ? props.projectName.breakDown
          : JSON.parse(localStorage.getItem("selectBreakDown")) !== null
          ? JSON.parse(localStorage.getItem("selectBreakDown"))
          : null;
      let struct = "";
      for (const i in selectBreakdown) {
        struct += `${selectBreakdown[i].depth}${selectBreakdown[i].id}:`;
      }
      const fkProjectStructureIds = struct.slice(0, -1);
      const config = {
        method: "get",
        url: `${SSO_URL}/api/v1/companies/${companyId}/projects/${projectId}/notificationroles/incident/?subentity=incident&roleType=custom&projectStructure=${fkProjectStructureIds}`,
        headers: HEADER_AUTH,
      };
      const res = await api(config)
        .then((res) => {
          if (res.status === 200) {
            const result = res.data.data.results;
            setNotificationSentValue(result);
          }
        })
        .catch((error) => {
          history.push("/app/pages/error");
        });
    } catch (error) {
      history.push("/app/pages/error");
    }
  };

  // handle go back
  const handleGoBack = () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));
    if (nextPath.environmentAffect === "Yes") {
      history.push(`/incident/${id}/modify/environment-affected/`);
    } else if (nextPath.equipmentAffect === "Yes") {
      history.push(`/incident/${id}/modify/equipment-affected/`);
    } else if (nextPath.propertyAffect === "Yes") {
      history.push(`/incident/${id}/modify/property-affected/`);
    } else if (nextPath.personAffect === "Yes") {
      history.push(`/incident/${id}/modify/peoples-afftected/`);
    } else {
      history.push(`/incident/${id}/modify/`);
    }
  };

  useEffect(() => {
    fetchSuperVisorName();
    fetchReportedBy();
    fetchIncidentsData();
    fetchNotificationSent();
    if (id) {
      fetchReportsDataList();
      fetchEvidanceData();
    } else {
      fetchReportableTo();
    }
  }, []);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Reporting and Notification" icon="ion-md-list-box">
      {isLoading ? (
        <Row>
          <Col md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl
                  component="fieldset"
                  required
                  error={error && error.reportedto}
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Reportable to</FormLabel>
                  <FormGroup>
                    {reportedTo.map((value, key) => (
                      <FormControlLabel
                        id={key}
                        key={key}
                        value={value.inputValue}
                        control={<Checkbox />}
                        label={value.inputLabel}
                        checked={!!form.reportedto.includes(value.inputValue)}
                        onChange={(e) => {
                          handelReportedTo(e, value.inputValue, "option");
                        }}
                      />
                    ))}
                  </FormGroup>
                  {error && error.reportedto && (
                    <FormHelperText>{error.reportedto}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              {form.reportedto.includes("Others") ? (
                <Grid item xs={12}>
                  <TextField
                    id="Other"
                    variant="outlined"
                    label="Other"
                    error={error && error.otherData}
                    helperText={
                      error && error.otherData ? error.otherData : null
                    }
                    defaultValue={reportOtherData}
                    className={classes.formControl}
                    onChange={(e) => {
                      setReportOtherData(e.target.value);
                    }}
                  />
                </Grid>
              ) : null}
              {notificationSentValue.length > 0 && (
                <Grid item xs={12}>
                  <FormControl
                    error={error && error.notifyTo}
                    required
                    component="fieldset"
                  >
                    <FormLabel component="legend">
                      Notification to be sent?
                    </FormLabel>
                    <FormGroup>
                      {console.log(
                        notificationSentValue,
                        "notificationSentValue"
                      )}
                      {notificationSentValue.length != 0
                        ? notificationSentValue.map((value) => (
                            <FormControlLabel
                              // id={index}
                              // key={index}
                              value={value.id}
                              control={<Checkbox name={value.roleName} />}
                              checked={notifyToList.includes(
                                value.id.toString()
                              )}
                              label={value.roleName}
                              onChange={(e) => {
                                handelNotifyTo(e, value.id.toString());
                              }}
                            />
                            //     <FormControlLabel
                            //     className="selectLabel"
                            //     control={<Checkbox name={value.roleName} />}
                            //     label={value.roleName}
                            //     checked={notifyToList.notifyTo && notifyToList.notifyTo !== null && notifyToList.notifyTo.includes(value.id.toString())}
                            //     onChange={async (e) => handelNotifyTo(e, value.id.toString())}
                            // />
                          ))
                        : null}
                    </FormGroup>
                    {error && error.notifyTo && (
                      <FormHelperText>{error.notifyTo}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12}>
                <Box marginTop={3} marginBottom={4}>
                  <Typography variant="h6" gutterBottom>
                    Initial evidences
                  </Typography>
                  <Typography variant="caption">
                    Only PDF,PNG,JPEG,JPG,Excel,Xls,Doc,Word & PPT files are
                    supported
                  </Typography>
                </Box>
                <Grid item xs={12}>
                  {evidanceForm.map((item, index) => (
                    <Grid container spacing={3} alignItems="flex-end">
                      <Grid
                        item
                        md={
                          typeof item.files === "array" ||
                          typeof item.files === "object"
                            ? 4
                            : 6
                        }
                      >
                        {/* <input
                          ref={ref}
                          id="file"
                          type="file"
                          accept=".pdf, .png, .jpeg, .jpg,.xls,.xlsx, .doc, .word, .ppt"
                          style={{
                            color:
                              typeof item.evidenceDocument === "string" &&
                              "transparent",
                          }}
                          onChange={(e) =>
                            handleEvidanceForm(e, index, "evidenceDocument")
                          }
                        /> */}
                        <MultiAttachment
                          attachmentHandler={(files) => {
                            handleEvidanceForm(
                              undefined,
                              files,
                              index,
                              "evidenceDocument"
                            );
                          }}
                        />
                      </Grid>
                      {typeof item.files === "array" ||
                      typeof item.files === "object" ? (
                        <>
                          <Grid item md={2}>
                            {item.files.map((file) => {
                              return (
                                <Attachment
                                  type={file.fileName}
                                  value={file.fileName}
                                />
                              );
                            })}
                          </Grid>
                        </>
                      ) : null}
                      <Grid item xs={8} md={4}>
                        <TextField
                          id="evidanceRemark"
                          size="small"
                          variant="outlined"
                          label="Evidences remark"
                          // error={
                          //   evidenceError
                          //   && evidenceError[`evidenceRemark${[index]}`]
                          // }
                          // helperText={
                          //   evidenceError
                          //     && evidenceError[`evidenceRemark${[index]}`]
                          //     ? evidenceError[`evidenceRemark${[index]}`]
                          //     : null
                          // }
                          disabled={!item.evidenceDocument}
                          className={classes.formControl}
                          value={item.evidenceRemark}
                          onChange={(e) =>
                            handleEvidanceForm(
                              e,
                              undefined,
                              index,
                              "evidenceRemark"
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={2} md={1}>
                        <IconButton
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          onClick={(e) => handleNewEvidance(e)}
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Grid>

                      {evidanceForm.length > 1 ? (
                        <Grid item xs={2} md={1}>
                          <IconButton
                            variant="contained"
                            color="primary"
                            onClick={() =>
                              handleRemoveEvidance(index, item.id && item.id)
                            }
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </Grid>
                      ) : null}
                    </Grid>
                  ))}
                </Grid>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity={messageType}>
                    {message}
                  </Alert>
                </Snackbar>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="supervisorname-label">
                    Supervisor name
                  </InputLabel>
                  <Select
                    labelId="supervisorname-label"
                    id="supervisorname"
                    label="Supervisor name"
                    defaultValue={
                      incidentsListData.supervisorByName === ""
                        ? ""
                        : superVisorNameList.filter(
                            (item) =>
                              item.name === incidentsListData.supervisorByName
                          ).length > 0
                        ? incidentsListData.supervisorByName
                        : "other"
                    }
                    onChange={async (e) => {
                      await setSupervisorName(e.target.value);
                    }}
                  >
                    {superVisorNameList.map((value, index) => (
                      <MenuItem key={index} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  defaultValue={
                    superVisorNameList.length > 0
                      ? superVisorNameList
                          .slice(0, -1)
                          .filter(
                            (item) =>
                              item.name === incidentsListData.supervisorByName
                          ).length > 0
                        ? ""
                        : incidentsListData.supervisorByName
                      : ""
                  }
                  disabled={
                    supervisorName === ""
                      ? true
                      : superVisorNameList
                          .slice(0, -1)
                          .filter((item) => item.name === supervisorName)
                          .length > 0
                  }
                  className={classes.formControl}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      supervisorOtherName: e.target.value.toString(),
                    });
                  }}
                />
                {error && error.othername ? <p>{error.othername}</p> : null}
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="reportedBy-label">Reported by</InputLabel>
                  <Select
                    labelId="reportedBy-label"
                    id="reportedBy"
                    label="Reported by"
                    defaultValue={
                      reportedByNameList.filter(
                        (item) =>
                          item.name === incidentsListData.incidentReportedByName
                      ).length > 0
                        ? incidentsListData.incidentReportedByName
                        : "other"
                    }
                    onChange={(e) => {
                      setReportedByName(e.target.value);
                    }}
                  >
                    {reportedByNameList.map((value, index) => (
                      <MenuItem key={index} value={value.name}>
                        {value.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="others"
                  variant="outlined"
                  label="Others"
                  defaultValue={
                    reportedByNameList.filter(
                      (item) =>
                        item.name === incidentsListData.incidentReportedByName
                    ).length > 0
                      ? ""
                      : incidentsListData.incidentReportedByName
                  }
                  className={classes.formControl}
                  disabled={
                    reportedByNameList.length > 0
                      ? reportedByNameList
                          .slice(0, -1)
                          .filter((item) => item.name === reportedByName)
                          .length > 0
                      : true
                  }
                  onChange={(e) => {
                    setForm({
                      ...form,
                      reportedByOtherName: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    className={classes.formControl}
                    id="date-picker-dialog"
                    format="dd-MMM-yyyy HH:mm a"
                    inputVariant="outlined"
                    label="Reporting date"
                    value={incidentsListData.incidentReportedOn}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    disableFuture
                    disabled
                    InputProps={{ readOnly: true }}
                    // onClick={(e) => setIsDateShow(true)}
                    open={isDateShow}
                    onClose={(e) => setIsDateShow(false)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="reason"
                  variant="outlined"
                  label="Reason for reporting later than 4 hours"
                  multiline
                  error={error && error.latereporting}
                  disabled={!lateReport}
                  rows="4"
                  defaultValue={incidentsListData.reasonLateReporting}
                  fullWidth
                  className={classes.labelOverflow}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      latereporting: e.target.value.toString(),
                    });
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="additionalDetails"
                  variant="outlined"
                  label="Additional details if any"
                  multiline
                  rows="4"
                  defaultValue={incidentsListData.notificationComments}
                  fullWidth
                  onChange={(e) => {
                    setForm({
                      ...form,
                      additionaldetails: e.target.value.toString(),
                    });
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => handleGoBack(e)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={(e) => handelNext(e)}
                  disabled={!isNext}
                >
                  Submit
                  {isNext ? null : <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
          </Col>
          {isDesktop && (
            <Col md={3}>
              <FormSideBar
                deleteForm={localStorage.getItem("deleteForm")}
                listOfItems={INITIAL_NOTIFICATION_FORM}
                selectedItem="Reporting and notification"
                id={id}
              />
            </Col>
          )}
        </Row>
      ) : (
        <Loader />
      )}
    </PapperBlock>
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
)(ReportingAndNotification);
