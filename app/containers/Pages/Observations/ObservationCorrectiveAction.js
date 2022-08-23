import DateFnsUtils from "@date-io/moment";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// import ActionTracker from "./ActionTracker";
import axios from "axios";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import apiAction from "../../../utils/axiosActionTracker";
import { handelActionIcare } from "../../../utils/CheckerValue";
import { access_token, ACCOUNT_API_URL } from "../../../utils/constants";
import ActionShow from "../../Forms/ActionShow";
import ActionTracker from "../../Forms/ActionTracker";
import CorrectiveActionValidator from "../../Validator/Observation/CorrectiveActionValidation";
import Loader from "../Loader";
import { checkACL } from "../../../utils/helper";

// import FormLabel from '@material-ui/core/FormLabel';

import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  coponentTitleBox: {
    "& h5": {
      paddingBottom: "20px",
      borderBottom: "1px solid #ccc",
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
  aLabelValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#063d55",
    float: "left",
    width: "100%",
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
  updateLink: {
    float: "left",
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  addLink: {
    fontSize: "0.88rem",
    fontWeight: "400",
    lineHeight: "1.2",
    "& a": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  increaseRowBox: {
    marginTop: "10px",
    color: "#06425c",
  },
  actionTitleLable: {
    float: "right",
    width: "calc(100% - 100px)",
    textAlign: "right",
  },
  loadingWrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-flex",
  },
  buttonProgress: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -20,
  },
  buttonProgressSave: {
    // color: "green",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -130,
  },
  boldHelperText: {
    "& .MuiFormHelperText-root": {
      // fontWeight : "bold",
      color: "red",
      fontSize: "16px",
      fontFamily: "Montserrat-Medium",
    },
  },
}));

function ObservationCorrectiveAction() {
  const [form, setForm] = useState({isCorrectiveActionTaken:"No"});
  const [isLoading, setIsLoading] = useState(false);
  const radioDecide = ["Yes", "No"];
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const [actionTakenData, setActionTakenData] = useState([]);
  const [actionOpen, setActionOpen] = useState(true);
  const [error, setError] = useState({ comment: "", reviewedOn: "" });
  const [reportedByName, setReportedByName] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [updatePage, setUpdatePage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [isDateShow, setIsDateShow] = useState(false);
  const [ATACLStatus, setATACLStatus] = useState(false);
  let filterReportedByName = [];

  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
    createdBy: "",
    projectStructId: "",
  });
  const [actionData, setActionData] = useState([]);
  const [fkProjectStructureIds, setFkProjectStructureId] = useState();
  const [observationNumber, setObservationNumber] = useState();

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;

  const companies =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).companies
      : null;

  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

  const [comment, setComment] = useState({
    fkCompanyId: parseInt(fkCompanyId),
    fkProjectId: parseInt(projectId),
    commentContext: "Observation",
    contextReferenceIds: localStorage.getItem("fkobservationId"),
    commentTags: "Corrective-Action",
    comment: "",
    parent: 0,
    private: "Yes",
    thanksFlag: "string",
    status: "Active",
    createdBy: parseInt(userId),
  });

  const handelActionTracker = async () => {
    let observationId = localStorage.getItem("fkobservationId");
    let allAction = await handelActionIcare(
      observationId,
      [],
      "title",
      "iCare"
    );
    setActionData(allAction);
  };

  const handelActionShow = (id) => {
    return (
      <>
        <Grid>
          <>
            {actionData.map((valueAction) => (
              <>
                <ActionShow
                  action={{
                    id: valueAction.id,
                    number: valueAction.actionNumber,
                  }}
                  title={valueAction.actionTitle}
                  companyId={fkCompanyId}
                  projectId={projectId}
                  updatePage={updatePage}
                  projectStructure={localStorage.getItem("selectBreakDown")}
                />
              </>
            ))}
          </>
        </Grid>
      </>
    );
  };

  const handleSubmit = async () => {
    const { error, isValid } = CorrectiveActionValidator(
      form,
      actionData,
      "submit"
    );
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }

    await setLoading(true);
    if (comment.id) {
      comment["updatedBy"] = parseInt(userId);
      const res1 = await api.put(
        `/api/v1/comments/${comment.commentContext}/${
          comment.contextReferenceIds
        }/${comment.id}/`,
        comment
      );
    } else {
      if (comment.comment !== "") {
        const res1 = await api
          .post(`/api/v1/comments/`, comment)
          .then((res) => {})
          .catch((err) => {
            setLoading(false);
          });
      }
    }
    form["updateBy"] = userId;
    if (form["reviewedByName"] !== "") {
      form["observationStage"] = "Completed";
      form["observationStatus"] = "Reviewed";
    }
    delete form["attachment"];
    const res = await api
      .put(
        `/api/v1/observations/${localStorage.getItem("fkobservationId")}/`,
        form
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("updateAction", "Done");
          localStorage.setItem("action", "Done");
          history.push(
            `/app/icare/details/${localStorage.getItem("fkobservationId")}`
          );
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleSave = async () => {
    if (checkACL("action_tracker", "view_actions")) {
      const { error, isValid } = CorrectiveActionValidator(
        form,
        actionData,
        "save"
      );

      await setError(error);
      if (!isValid) {
        return "Data is not valid";
      }
    }

    await setSaveLoading(true);
    if (comment.id) {
      comment["updatedBy"] = parseInt(userId);
      const res1 = await api.put(
        `/api/v1/comments/${comment.commentContext}/${
          comment.contextReferenceIds
        }/${comment.id}/`,
        comment
      );
    } else {
      if (comment.comment !== "") {
        const res1 = await api
          .post(`/api/v1/comments/`, comment)
          .then((res) => {})
          .catch((err) => {
            setLoading(false);
          });
      }
    }
    form["updateBy"] = userId;
    if (form["reviewedByName"] !== null) {
      form["observationStage"] = "Completed";
      form["observationStatus"] = "Reviewed";
    } else {
      if (form["assigneeName"] !== "") {
        form["observationStatus"] = "In progress";
      } else {
        form["observationStatus"] = "Unassigned";
      }
    }
    delete form["attachment"];
    const res = await api
      .put(
        `/api/v1/observations/${localStorage.getItem("fkobservationId")}/`,
        form
      )
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("updateAction", "Done");
          localStorage.setItem("action", "Done");
          history.push(
            `/app/icare/details/${localStorage.getItem("fkobservationId")}`
          );
        }
      })
      .catch((err) => {
        setSaveLoading(false);
      });
  };

  const handleCancle = async () => {
    history.push(`/app/icare/details/${id}`);
    if (form.isCorrectiveActionTaken == "") {
      await localStorage.setItem("update", "Pending");
    } else {
      await localStorage.setItem("ActionUpdate", "Pending");
    }
  };

  const fetchInitialiObservationData = async () => {
    const res = await api.get(
      `/api/v1/observations/${localStorage.getItem("fkobservationId")}/`
    );

    const result = res.data.data.results;
    console.log(result)
    await setFkProjectStructureId(result.fkProjectStructureIds);
    await setObservationNumber(result.observationNumber);
    if (result.isCorrectiveActionTaken === "Yes") {
      await setActionOpen(true);
    }
    result["reviewedOn"] = new Date();
    await setForm({...result, isCorrectiveActionTaken:"No"});
    await handelActionTracker();
  };

  const handelClose = () => {
    setIsDateShow(false);
    return true;
  };

  const fetchComments = async () => {
    const res = await api.get(
      `/api/v1/comments/Observation/${localStorage.getItem("fkobservationId")}/`
    );
    if (res.data.data.metadata.count > 0) {
      const result = res.data.data.results[0];

      await setComment(result);
    }
    await setIsLoading(true);
  };

  const handleAction = async (e) => {
    let value = e.target.value;

    if (value === "Yes") {
      setActionOpen(true);
    } else {
      setActionOpen(false);
    }
  };

  const handleCloseDate = (e) => {
    if (new Date(e) <= new Date()) {
      setForm({ ...form, reviewedOn: moment(e).toISOString() });
      setError({ ...error, reviewedOn: "" });
    } else {
      let errorMessage = "Reviewed time should not be ahead of current time";
      setError({ ...error, reviewedOn: errorMessage });
    }
  };

  const handleReview = (e, value) => {
    let temp = { ...form };
    temp.reviewedByName = value.name;
    temp.reviewedById = value.id;
    setForm({...form,...temp});
  };

  const fetchReportedBy = () => {
    const config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/${fkCompanyId}/users/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data.data.results.users;
          setReportedByName(result);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (id) {
      fetchInitialiObservationData();
      fetchComments();
      fetchReportedBy();
      setATACLStatus(checkACL("action_tracker", "view_actions"));
    }
  }, []);
  const classes = useStyles();
  return (
    <>
      {isLoading ? (
        <Grid
          container
          spacing={3}
          className={classes.observationCorrectiveActionSection}
        >
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24.913"
                height="24.902"
                viewBox="0 0 24.913 24.902"
              >
                <g
                  id="observation_detail"
                  data-name="observation detail"
                  transform="translate(-4.729 -4.75)"
                >
                  <g
                    id="Group_5258"
                    data-name="Group 5258"
                    transform="translate(16.965 7.883)"
                  >
                    <path
                      id="Path_5137"
                      data-name="Path 5137"
                      d="M74.363,28.152a.188.188,0,0,1-.188-.188V21.353a.618.618,0,0,0-.618-.618H69.017a.188.188,0,1,1,0-.375h4.541a.994.994,0,0,1,.993.993v6.611A.188.188,0,0,1,74.363,28.152Z"
                      transform="translate(-68.83 -20.36)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5259"
                    data-name="Group 5259"
                    transform="translate(4.979 7.883)"
                  >
                    <path
                      id="Path_5138"
                      data-name="Path 5138"
                      d="M21.693,41.879H5.972a.994.994,0,0,1-.993-.993V21.353a.994.994,0,0,1,.993-.993h3.9a.188.188,0,0,1,0,.375h-3.9a.618.618,0,0,0-.618.618V40.886a.618.618,0,0,0,.618.618h15.72a.618.618,0,0,0,.618-.618V36.822a.188.188,0,0,1,.375,0v4.064A.994.994,0,0,1,21.693,41.879Z"
                      transform="translate(-4.979 -20.36)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5260"
                    data-name="Group 5260"
                    transform="translate(6.293 9.197)"
                  >
                    <path
                      id="Path_5139"
                      data-name="Path 5139"
                      d="M26.87,46.251h-14.7a.188.188,0,0,1-.188-.188V27.548a.188.188,0,0,1,.188-.188H15.3a.188.188,0,0,1,0,.375H12.355v18.14H26.683V42.42a.188.188,0,0,1,.375,0v3.643A.188.188,0,0,1,26.87,46.251Z"
                      transform="translate(-11.979 -27.36)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5261"
                    data-name="Group 5261"
                    transform="translate(17.224 9.197)"
                  >
                    <path
                      id="Path_5140"
                      data-name="Path 5140"
                      d="M74.17,33.922a.188.188,0,0,1-.188-.188v-6H70.4a.188.188,0,1,1,0-.375H74.17a.188.188,0,0,1,.188.188v6.187A.188.188,0,0,1,74.17,33.922Z"
                      transform="translate(-70.21 -27.36)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5262"
                    data-name="Group 5262"
                    transform="translate(9.279 5)"
                  >
                    <path
                      id="Path_5141"
                      data-name="Path 5141"
                      d="M36.165,10.323H28.073a.188.188,0,0,1-.184-.224L28.5,6.976a.188.188,0,0,1,.184-.152h2.128V6.3a1.3,1.3,0,0,1,2.61,0v.52h2.128a.188.188,0,0,1,.184.152l.613,3.123a.188.188,0,0,1-.184.224ZM28.3,9.947h7.635L35.4,7.2H33.236a.188.188,0,0,1-.188-.188V6.3a.929.929,0,1,0-1.859,0v.707A.188.188,0,0,1,31,7.2H28.84Z"
                      transform="translate(-27.886 -5)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5263"
                    data-name="Group 5263"
                    transform="translate(7.418 19.974)"
                  >
                    <path
                      id="Path_5142"
                      data-name="Path 5142"
                      d="M19.047,86.93a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,19.047,86.93Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,19.047,85.151Z"
                      transform="translate(-17.97 -84.775)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5264"
                    data-name="Group 5264"
                    transform="translate(10.623 16.915)"
                  >
                    <path
                      id="Path_5143"
                      data-name="Path 5143"
                      d="M36.121,70.634A1.077,1.077,0,1,1,37.2,69.556,1.078,1.078,0,0,1,36.121,70.634Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,36.121,68.855Z"
                      transform="translate(-35.044 -68.479)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5265"
                    data-name="Group 5265"
                    transform="translate(14.525 18.694)"
                  >
                    <path
                      id="Path_5144"
                      data-name="Path 5144"
                      d="M56.909,80.111a1.077,1.077,0,1,1,1.077-1.077A1.078,1.078,0,0,1,56.909,80.111Zm0-1.779a.7.7,0,1,0,.7.7A.7.7,0,0,0,56.909,78.332Z"
                      transform="translate(-55.832 -77.957)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5266"
                    data-name="Group 5266"
                    transform="translate(12.322 18.174)"
                  >
                    <path
                      id="Path_5145"
                      data-name="Path 5145"
                      d="M46.566,76.6a.188.188,0,0,1-.078-.017L44.2,75.541a.188.188,0,0,1,.156-.342l2.284,1.041a.188.188,0,0,1-.078.359Z"
                      transform="translate(-44.094 -75.182)"
                      fill="#06425c"
                    />
                  </g>
                  <g
                    id="Group_5267"
                    data-name="Group 5267"
                    transform="translate(8.949 18.418)"
                  >
                    <path
                      id="Path_5146"
                      data-name="Path 5146"
                      d="M26.317,78.693a.188.188,0,0,1-.13-.324l1.92-1.831a.188.188,0,0,1,.259.272l-1.919,1.831A.187.187,0,0,1,26.317,78.693Z"
                      transform="translate(-26.129 -76.486)"
                      fill="#06425c"
                    />
                  </g>
                  <g
                    id="Group_5268"
                    data-name="Group 5268"
                    transform="translate(8.38 11.253)"
                  >
                    <path
                      id="Path_5147"
                      data-name="Path 5147"
                      d="M23.283,44.7a.188.188,0,0,1-.093-.351l10.53-6.007a.188.188,0,0,1,.186.326l-10.53,6.007A.187.187,0,0,1,23.283,44.7Z"
                      transform="translate(-23.095 -38.315)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5269"
                    data-name="Group 5269"
                    transform="translate(17.359 10.937)"
                  >
                    <path
                      id="Path_5148"
                      data-name="Path 5148"
                      d="M72.354,38.87a.188.188,0,0,1-.184-.225l.279-1.367L71.082,37a.188.188,0,1,1,.075-.368l1.551.317a.188.188,0,0,1,.146.221l-.317,1.551A.188.188,0,0,1,72.354,38.87Z"
                      transform="translate(-70.932 -36.627)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5270"
                    data-name="Group 5270"
                    transform="translate(17.5 15.285)"
                  >
                    <path
                      id="Path_5149"
                      data-name="Path 5149"
                      d="M76.317,69.054a4.63,4.63,0,1,1,2.767-.92A4.629,4.629,0,0,1,76.317,69.054Zm-.011-8.886a4.256,4.256,0,1,0,3.416,1.708A4.235,4.235,0,0,0,76.306,60.168Z"
                      transform="translate(-71.68 -59.793)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5271"
                    data-name="Group 5271"
                    transform="translate(18.47 16.256)"
                  >
                    <path
                      id="Path_5150"
                      data-name="Path 5150"
                      d="M80.515,72.284a3.655,3.655,0,1,1,2.187-.727A3.658,3.658,0,0,1,80.515,72.284Zm-.009-6.945a3.282,3.282,0,1,0,2.637,1.318A3.269,3.269,0,0,0,80.507,65.339Z"
                      transform="translate(-76.851 -64.964)"
                      fill="#06425c"
                    />
                  </g>
                  <g
                    id="Group_5272"
                    data-name="Group 5272"
                    transform="translate(24.603 23.289)"
                  >
                    <path
                      id="Path_5151"
                      data-name="Path 5151"
                      d="M110.415,103.749a.188.188,0,0,1-.151-.075l-.7-.941a.188.188,0,0,1,.3-.225l.7.941a.188.188,0,0,1-.15.3Z"
                      transform="translate(-109.524 -102.433)"
                      fill="#06425c"
                    />
                  </g>
                  <g
                    id="Group_5273"
                    data-name="Group 5273"
                    transform="translate(24.444 23.586)"
                  >
                    <path
                      id="Path_5152"
                      data-name="Path 5152"
                      d="M112.965,109.822a2.286,2.286,0,0,1-1.228-.544,10.347,10.347,0,0,1-2.02-2.094,12.2,12.2,0,0,1-1.022-1.607.188.188,0,0,1,.054-.237l1.725-1.289a.188.188,0,0,1,.243.016,12.19,12.19,0,0,1,1.251,1.435,10.344,10.344,0,0,1,1.436,2.531c.3.84.285,1.417-.052,1.669A.63.63,0,0,1,112.965,109.822Zm-3.862-4.278a12.015,12.015,0,0,0,.915,1.415,9.962,9.962,0,0,0,1.942,2.016c.646.475,1.027.531,1.168.425s.2-.487-.077-1.241a9.961,9.961,0,0,0-1.383-2.434,12.037,12.037,0,0,0-1.1-1.279Z"
                      transform="translate(-108.674 -104.014)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                  <g
                    id="Group_5274"
                    data-name="Group 5274"
                    transform="translate(8.516 23.289)"
                  >
                    <path
                      id="Path_5153"
                      data-name="Path 5153"
                      d="M32.13,102.808H24.007a.188.188,0,1,1,0-.375H32.13a.188.188,0,1,1,0,.375Z"
                      transform="translate(-23.819 -102.433)"
                      fill="#06425c"
                      stroke="#06425c"
                      stroke-width="0.5"
                    />
                  </g>
                </g>
              </svg>{" "}
              iCare details
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Title
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {form.observationTitle ? form.observationTitle : "-"}
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Type
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {form.observationType ? form.observationType : "-"}
                  </Typography>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    iCare Description
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {form.observationDetails ? form.observationDetails : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observation Title
          </Typography>
          <Typography className={classes.labelValue}>
            {form.observationTitle ? form.observationTitle : "-"}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observation Type
          </Typography>
          <Typography className={classes.labelValue}>
            {form.observationType ? form.observationType : "-"}
          </Typography>
        </Grid>

        <Grid item md={12}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Observation Description
          </Typography>
          <Typography className={classes.labelValue}>
            {form.observationDetails ? form.observationDetails : "-"}
          </Typography>
        </Grid> */}

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.217"
                height="24.92"
                viewBox="0 0 37.217 27.92"
              >
                <path
                  id="project-management"
                  d="M27.194,13.612a.624.624,0,0,0-.3.082.285.285,0,0,0-.094.106.424.424,0,0,0-.03.17,1.515,1.515,0,0,0,.3.739h0l.636,1.012a5.453,5.453,0,0,0,.854,1.124,1.745,1.745,0,0,0,1.212.488,1.781,1.781,0,0,0,1.288-.512,5.583,5.583,0,0,0,.882-1.212l.715-1.178a1.148,1.148,0,0,0,.151-.627c-.018-.073-.1-.106-.23-.115h-.245a1.075,1.075,0,0,1-.194,0l.245-1.085c-1.818.3-3.181-1.063-5.1-.27l.133,1.3a1.039,1.039,0,0,1-.218,0Zm-4.847,8.407c.17-2.187-.261-2.218,1.575-2.905a17.629,17.629,0,0,0,2.924-1.3l1.572,4.208Zm14.845,0c-.167-2.187.261-2.218-1.572-2.905a17.772,17.772,0,0,1-2.927-1.3L31.12,22.019Zm-6.968-2.293h.218a.364.364,0,0,0,.361-.361v-.582a.361.361,0,0,0-.361-.361h-1.3a.361.361,0,0,0-.361.361v.585a.364.364,0,0,0,.361.361h.23l-.424,2.293h1.7l-.409-2.293Zm-20.153.13.248.245a.17.17,0,0,1,0,.236l-.2.2a1.351,1.351,0,0,1,.124.33H10.5a.167.167,0,0,1,.167.167v.348a.167.167,0,0,1-.167.167h-.282a1.382,1.382,0,0,1-.145.318l.182.185a.17.17,0,0,1,0,.236l-.248.245a.167.167,0,0,1-.233,0l-.2-.2a1.351,1.351,0,0,1-.33.124v.264a.167.167,0,0,1-.167.167H8.729a.167.167,0,0,1-.167-.167V22.44a1.339,1.339,0,0,1-.321-.145l-.182.182a.164.164,0,0,1-.236,0l-.245-.245a.164.164,0,0,1,0-.236l.2-.2a1.233,1.233,0,0,1-.121-.33H7.4a.164.164,0,0,1-.167-.167v-.354a.167.167,0,0,1,.167-.167h.282a1.212,1.212,0,0,1,.145-.3l-.182-.182a.164.164,0,0,1,0-.236l.245-.248a.17.17,0,0,1,.236,0l.2.2a1.351,1.351,0,0,1,.33-.124v-.258a.167.167,0,0,1,.167-.167h.348a.167.167,0,0,1,.167.167v.282a1.212,1.212,0,0,1,.318.145l.182-.182a.164.164,0,0,1,.236,0Zm-1.124.606a.688.688,0,1,1-.688.688A.688.688,0,0,1,8.947,20.462Zm4.193-4.756a.657.657,0,0,1-.585-.7.642.642,0,0,1,.585-.7h7.48a.66.66,0,0,1,.588.7.645.645,0,0,1-.588.7Zm0,6.147a.66.66,0,0,1-.585-.7.645.645,0,0,1,.585-.706h5.1a.66.66,0,0,1,.585.706.642.642,0,0,1-.585.7ZM8.929,10.491a.4.4,0,0,1-.539-.07l-.045-.048L7.593,9.6a.427.427,0,0,1,.07-.606.5.5,0,0,1,.657-.021l.4.418,1.315-1.054a.409.409,0,0,1,.585.145.47.47,0,0,1-.03.648l-1.642,1.36ZM13.1,9.885c-.327,0-.545-.33-.545-.706s.218-.7.545-.7h8.565a.657.657,0,0,1,.585.7.645.645,0,0,1-.585.706Zm-8.64-6.28H30.181a.724.724,0,0,1,.721.721V6.411H29.566V4.784H4.463V20.234h0a.436.436,0,0,1-.373.433c-3.923.609-4.108,5.253-.118,5.92H29.566V24.636H30.9V27.2a.721.721,0,0,1-.212.509h0a.727.727,0,0,1-.509.212H3.942a4.59,4.59,0,0,1-3.187-1.73,5.155,5.155,0,0,1-.773-3.269V6.059C-.018,3.187-.045.073,3.972,0h.048a.442.442,0,0,1,.442.442ZM1.028,20.974a3.391,3.391,0,0,1,2.405-1.251V.909c-2.745.27-2.424,2.808-2.424,5.165v14.9ZM10.071,13.7l.248.248a.17.17,0,0,1,0,.236l-.2.2a1.4,1.4,0,0,1,.124.33H10.5a.167.167,0,0,1,.167.167v.348a.17.17,0,0,1-.167.17h-.282a1.445,1.445,0,0,1-.145.3l.182.182a.17.17,0,0,1,0,.236l-.248.248a.167.167,0,0,1-.233,0l-.2-.2a1.351,1.351,0,0,1-.33.124v.258a.167.167,0,0,1-.167.167H8.729a.167.167,0,0,1-.167-.167v-.282a1.466,1.466,0,0,1-.321-.145l-.182.182a.17.17,0,0,1-.236,0l-.245-.248a.164.164,0,0,1,0-.236l.2-.2a1.269,1.269,0,0,1-.121-.33H7.4a.167.167,0,0,1-.167-.167V14.8a.164.164,0,0,1,.167-.167h.282a1.188,1.188,0,0,1,.145-.321l-.182-.182a.164.164,0,0,1,0-.236l.245-.245a.164.164,0,0,1,.236,0l.2.2a1.233,1.233,0,0,1,.33-.121v-.258a.167.167,0,0,1,.167-.17h.348a.17.17,0,0,1,.167.17v.279a1.445,1.445,0,0,1,.318.145l.182-.182a.17.17,0,0,1,.236,0Zm-1.124.624a.688.688,0,1,1-.688.685A.688.688,0,0,1,8.947,14.327Zm23.873-.951a.46.46,0,0,1,.333.348,1.412,1.412,0,0,1-.173.869h0a.064.064,0,0,1,0,.018l-.724,1.194a5.959,5.959,0,0,1-.939,1.275,2.139,2.139,0,0,1-1.536.606,2.072,2.072,0,0,1-1.46-.585,5.614,5.614,0,0,1-.909-1.194L26.776,14.9a1.818,1.818,0,0,1-.361-.924.724.724,0,0,1,.061-.33.63.63,0,0,1,.218-.254.821.821,0,0,1,.155-.079,16.419,16.419,0,0,1-.03-1.818,2.527,2.527,0,0,1,.079-.412c.957-3.169,5.8-2.9,5.962.654l-.039,1.648Z"
                  transform="translate(0.025)"
                  fill="#06425c"
                />
              </svg>{" "}
              Assignee
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12} sm={12} xs={12}>
                  <FormLabel component="legend" className="viewLabel">
                    Assign to
                  </FormLabel>
                  <Typography className="viewLabelValue">
                    {form.assigneeName ? form.assigneeName : "-"}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* <Grid item md={8}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Assigned to
            {' '}
          </Typography>
          <Typography className={classes.labelValue}>
            {form.assigneeName ? form.assigneeName : "-"}
          </Typography>
        </Grid> */}

          <>
            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Typography variant="h6" className="sectionHeading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24.096"
                  height="27.08"
                  viewBox="0 0 33.096 36.08"
                >
                  <path
                    id="online-survey"
                    d="M2.458,0H30.635A2.418,2.418,0,0,1,33.1,2.367V25.175a2.421,2.421,0,0,1-2.461,2.364H19.105v-.047c0-.4,0-.784-.018-1.433H30.952a.692.692,0,0,0,.48-.192.639.639,0,0,0,.2-.463V5.714H1.563V25.4a.594.594,0,0,0,.021.164,2.077,2.077,0,0,0-.058.467,2.741,2.741,0,0,0,.263,1.224,1.492,1.492,0,0,0,.11.206h0A2.4,2.4,0,0,1,0,25.175V2.367A2.418,2.418,0,0,1,2.458,0Zm5.75,20.28a1.051,1.051,0,0,1,.769.262.969.969,0,0,1,.327.719V27.55h.663V24.464c0-1.248,2.046-1.21,2.046.07v3.083h.748V25.157c0-1.248,2.046-1.21,2.046.068V27.5h.721V25.768c0-1.248,2.046-1.21,2.046.068,0,1.439.085,3.136.031,4.572-.058,1.577-.4,3.353-1.585,4.346a5.706,5.706,0,0,1-4.58,1.254c-2.815-.429-3.527-2.088-4.867-4.131l-3.4-5.185c-.211-.473-.183-.793.027-1,.916-.564,2.376.634,4.006,2.328h.058V21.194a.935.935,0,0,1,.95-.913ZM5.276,11.833A1.013,1.013,0,0,1,5.6,10.441a1.106,1.106,0,0,1,1.462.241l.583.617L9.362,9.243A1.106,1.106,0,0,1,10.876,9.1a1.008,1.008,0,0,1,.147,1.456L8.434,13.551a1.133,1.133,0,0,1-.256.235,1.113,1.113,0,0,1-.811.152,1.08,1.08,0,0,1-.685-.446l-1.4-1.668Zm21.633,8.3a1.085,1.085,0,0,0,0-2.17H15.117a1.142,1.142,0,0,0-1.027.526,1.051,1.051,0,0,0,0,1.119,1.142,1.142,0,0,0,1.027.526Zm0-7.634a1.085,1.085,0,0,0,0-2.17H15.117a1.142,1.142,0,0,0-1.027.526,1.051,1.051,0,0,0,0,1.119,1.142,1.142,0,0,0,1.027.526ZM5.386,16.04h5.606a.752.752,0,0,1,.766.737V21.32a.755.755,0,0,1-.766.737H10.83v-.8a2.3,2.3,0,0,0-.611-1.577v-2.17H6.153v2.378a2.285,2.285,0,0,0-.409,1.3v.863H5.386a.755.755,0,0,1-.766-.737V16.777a.752.752,0,0,1,.766-.737ZM28.293,2.055A1.2,1.2,0,0,1,29.514,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,28.293,2.055Zm-8.229,0A1.2,1.2,0,0,1,21.285,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,20.064,2.055Zm4.116,0A1.2,1.2,0,0,1,25.4,3.23a1.222,1.222,0,0,1-2.443,0A1.2,1.2,0,0,1,24.18,2.055Z"
                    fill="#06425c"
                  />
                </svg>{" "}
                Action
              </Typography>
            </Grid>

            <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
              <Paper elevation={1} className="paperSection">
                {!ATACLStatus ? (
                  "You do not have permissions to view the actions."
                ) : (
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12} className={classes.formBox}>
                      <FormControl
                        component="fieldset"
                        error={error && error["isCorrectiveActionTaken"]}
                      >
                        <FormLabel
                          className="checkRadioLabel"
                          component="legend"
                        >
                          Are there any corrective actions to be taken?*
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-label="gender"
                          name="gender1"
                          onChange={(e) => {
                            setForm({
                              ...form,
                              isCorrectiveActionTaken: e.target.value,
                            });
                          }}
                        >
                          {radioDecide.map((value) => {
                            console.log(form.isCorrectiveActionTaken,value)
                            return(
                            <FormControlLabel
                              value={value}
                              checked={(form.isCorrectiveActionTaken ? form.isCorrectiveActionTaken : "No") === value }
                              className="selectLabel"
                              onClick={(e) => handleAction(e)}
                              control={<Radio />}
                              label={value}
                            />
                            )
})}
                        </RadioGroup>
                        {form.isCorrectiveActionTaken === "Yes" && <p style={{ color: "red" }}>
                          {error.isCorrectiveActionTaken}
                        </p>}
                      </FormControl>
                    </Grid>
                    {actionData.length == 0 && form.isCorrectiveActionTaken === "Yes"  ? (
                      <Grid item md={8}>
                        <p style={{ color: "red" }}>{error.action}</p>
                      </Grid>
                    ) : null}

                    <Grid item md={8}>
                      {form.isCorrectiveActionTaken === "Yes" ||
                      form.isCorrectiveActionTaken === null ? (
                        <>
                          <Typography
                            variant="h6"
                            gutterBottom
                            className={classes.labelName}
                          >
                            Actions
                          </Typography>
                          {checkACL(
                            "action_tracker-actions",
                            "view_actions"
                          ) ? (
                            <Typography className={classes.labelValue}>
                              {handelActionShow(id)}
                            </Typography>
                          ) :
                          <Typography className={classes.labelValue}>
                              You do not have permissions to view the actions
                            </Typography>
                          }
                          {!checkACL(
                            "action_tracker-actions",
                            "add_actions"
                          ) ? (
                            <Typography className={classes.increaseRowBox}>
                              <ActionTracker
                                actionContext="iCare"
                                enitityReferenceId={id}
                                setUpdatePage={setUpdatePage}
                                fkCompanyId={fkCompanyId}
                                fkProjectId={projectId}
                                fkProjectStructureIds={fkProjectStructureIds}
                                isCorrectiveActionTaken={null}
                                createdBy={userId}
                                updatePage={updatePage}
                                handelShowData={handelActionTracker}
                              />
                            </Typography>
                          ) : (
                            <Typography className={classes.increaseRowBox}>
                              <ActionTracker
                                actionContext="iCare"
                                enitityReferenceId={id}
                                setUpdatePage={setUpdatePage}
                                fkCompanyId={fkCompanyId}
                                fkProjectId={projectId}
                                fkProjectStructureIds={fkProjectStructureIds}
                                isCorrectiveActionTaken={
                                  form.isCorrectiveActionTaken
                                }
                                createdBy={userId}
                                updatePage={updatePage}
                                handelShowData={handelActionTracker}
                              />
                            </Typography>
                          )}
                        </>
                      ) : null}
                    </Grid>
                  </Grid>
                )}
              </Paper>
            </Grid>
          </>

          {/* <Grid item md={4}>
           <TextField
            label="Action taken"
            name="Action taken"
            id="Action taken"
            multiline
            fullWidth
            variant="outlined"
            // value={comment.comment ? comment.comment : ""}
            className={classes.formControl}
            // onChange={(e) => {
            // //   setComment({ ...comment, comment: e.target.value });
            // // }}
          />
            </Grid> */}

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg
                id="outline-assignment-24px"
                xmlns="http://www.w3.org/2000/svg"
                width="30.2"
                height="30.2"
                viewBox="0 0 40.2 40.2"
              >
                <g id="Bounding_Boxes">
                  <path
                    id="Path_2274"
                    data-name="Path 2274"
                    d="M0,0H40.2V40.2H0Z"
                    fill="none"
                  />
                </g>
                <path
                  id="growing-market-analysis"
                  d="M8.9,15.458v5.02a.233.233,0,0,1-.23.23H6.694a.233.233,0,0,1-.23-.23v-5.02ZM14.364,0A14.37,14.37,0,0,1,26.389,22.244l6.22,6.778-4.288,3.921-6-6.609A14.37,14.37,0,1,1,14.364,0ZM23.39,5.341a12.767,12.767,0,1,0,3.752,9.029A12.767,12.767,0,0,0,23.39,5.341ZM6.458,13.818,11.7,9.23c1.155,1.136,2.286,2.511,3.433,3.647L19.325,8.67l-1.34-1.34,3.972-.035v4.02L20.654,10c-.93.941-3.125,3.015-4.044,3.94-1.174,1.174-1.734,1.2-2.91.021l-1.983-2.211L9.374,13.818ZM20.876,12.6v7.882a.233.233,0,0,1-.23.23H18.66a.23.23,0,0,1-.228-.23V14.5L19.7,13.279l.93-.906a1.608,1.608,0,0,0,.239.209Zm-4,3.3v4.58a.23.23,0,0,1-.228.23h-1.98a.23.23,0,0,1-.228-.23v-4.09A3.01,3.01,0,0,0,16.878,15.9Zm-3.985-.373v4.953a.23.23,0,0,1-.23.23H10.679a.233.233,0,0,1-.23-.23v-5.36a1.324,1.324,0,0,0,.118-.1l.992-.879.8.89.062.064q.241.241.474.442Z"
                  transform="translate(3.908 4.558)"
                  fill="#06425c"
                />
              </svg>{" "}
              Reviewed
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={6} xs={12} className={classes.formBox}>
                  <TextField
                    label="Reviewed by*"
                    name="reviewedby"
                    id="reviewedby"
                    select
                    fullWidth
                    error={error.reviewedByName}
                    helperText={
                      error.reviewedByName ? error.reviewedByName : null
                    }
                    className={classNames(
                      classes.formControl,
                      classes.boldHelperText
                    )}
                    value={form.reviewedByName ? form.reviewedByName : ""}
                    variant="outlined"
                  >
                    {reportedByName.map((option) => (
                      <MenuItem
                        key={option}
                        value={option.name}
                        onClick={(e) => handleReview(e, option)}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={6} xs={12} className={classes.formBox}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      className={classNames(
                        classes.formControl,
                        classes.boldHelperText
                      )}
                      fullWidth
                      label="Reviewed on*"
                      minDate={form.observedAt}
                      maxDate={new Date()}
                      value={form.reviewedOn ? form.reviewedOn : null}
                      error={error.reviewedOn}
                      helperText={error.reviewedOn ? error.reviewedOn : null}
                      disableFuture={true}
                      open={isDateShow}
                      format="DD-MMM-YYYY hh:mm:s a"
                      onClose={(e) => handelClose()}
                      onClick={(e) => setIsDateShow(true)}
                      inputVariant="outlined"
                      InputProps={{ readOnly: true }}
                      onChange={(e) => handleCloseDate(e)}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Typography variant="h6" className="sectionHeading">
              <svg
                id="comment"
                xmlns="http://www.w3.org/2000/svg"
                width="24.15"
                height="21.856"
                viewBox="0 0 24.15 21.856"
              >
                <path
                  id="Path_5096"
                  data-name="Path 5096"
                  d="M5.216,0H18.863A5.26,5.26,0,0,1,24.15,5.216v7a5.274,5.274,0,0,1-3.787,5l-.071,4a.571.571,0,0,1-1,.429l-3.93-4.216H5.216A5.245,5.245,0,0,1,0,12.218v-7A5.245,5.245,0,0,1,5.216,0ZM18.863,1.215H5.216a4,4,0,0,0-4,4v7a4,4,0,0,0,4,4H15.5a1.868,1.868,0,0,1,.572.214l3.072,3.287V16.791a.686.686,0,0,1,.5-.643,4.051,4.051,0,0,0,3.287-3.93v-7A4.011,4.011,0,0,0,18.863,1.215Z"
                  fill="#06425c"
                />
                <path
                  id="Path_5097"
                  data-name="Path 5097"
                  d="M80.643,74.215A.64.64,0,0,1,80,73.572.63.63,0,0,1,80.643,73H92.075a.564.564,0,0,1,.572.572.584.584,0,0,1-.572.643Z"
                  transform="translate(-74.284 -67.784)"
                  fill="#06425c"
                />
                <path
                  id="Path_5098"
                  data-name="Path 5098"
                  d="M80.643,116.215a.63.63,0,0,1-.643-.572.64.64,0,0,1,.643-.643H92.075a.584.584,0,0,1,.572.643.564.564,0,0,1-.572.572Z"
                  transform="translate(-74.284 -106.783)"
                  fill="#06425c"
                />
                <path
                  id="Path_5099"
                  data-name="Path 5099"
                  d="M80.643,159.215a.64.64,0,0,1-.643-.643.584.584,0,0,1,.643-.572H92.075a.526.526,0,0,1,.572.572.584.584,0,0,1-.572.643Z"
                  transform="translate(-74.284 -146.711)"
                  fill="#06425c"
                />
              </svg>{" "}
              Comments
            </Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12} className="paddTBRemove">
            <Paper elevation={1} className="paperSection">
              <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Provide any additional comments"
                    name="provideadditionalcomments"
                    id="provideadditionalcomments"
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    value={comment.comment ? comment.comment : ""}
                    className="formControl"
                    onChange={(e) => {
                      setComment({ ...comment, comment: e.target.value });
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item md={12} xs={12}>
            <div className={classes.loadingWrapper}>
              <Button
                variant="contained"
                onClick={(e) => handleSave()}
                size="medium"
                color="primary"
                className="spacerRight buttonStyle"
                style={{ marginLeft: "5px" }}
                disabled={saveLoading}
              >
                Save
              </Button>
              {saveLoading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgressSave}
                />
              )}
              <Button
                variant="contained"
                onClick={(e) => handleSubmit()}
                size="medium"
                color="primary"
                className="spacerRight buttonStyle"
                style={{ marginLeft: "2px" }}
                disabled={loading}
              >
                Submit
              </Button>
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              <Button
                onClick={(e) => handleCancle()}
                size="medium"
                variant="contained"
                color="secondary"
                className="buttonStyle custmCancelBtn"
                style={{ marginLeft: "2px" }}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ObservationCorrectiveAction;
