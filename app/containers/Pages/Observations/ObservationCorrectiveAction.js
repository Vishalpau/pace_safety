import DateFnsUtils from '@date-io/moment';
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// import ActionTracker from "./ActionTracker";
import axios from "axios";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router";
import api from "../../../utils/axios";
import apiAction from "../../../utils/axiosActionTracker";
import { handelActionData } from "../../../utils/CheckerValue";
import {
  access_token,
  ACCOUNT_API_URL
} from "../../../utils/constants";
import ActionShow from '../../Forms/ActionShow';
import ActionTracker from "../../Forms/ActionTracker";
import CorrectiveActionValidator from "../../Validator/Observation/CorrectiveActionValidation";





const useStyles = makeStyles((theme) => ({

  coponentTitleBox: {
    '& h5': {
      paddingBottom: '20px',
      borderBottom: '1px solid #ccc',
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
  aLabelValue: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#063d55',
    float: 'left',
    width: '100%',
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
  updateLink: {
    float: 'left',
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  addLink: {
    fontSize: '0.88rem',
    fontWeight: '400',
    lineHeight: '1.2',
    '& a': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  increaseRowBox: {
    marginTop: '10px',
    color: '#06425c',
  },
  actionTitleLable: {
    float: 'right',
    width: 'calc(100% - 100px)',
    textAlign: 'right',
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
    marginLeft: +30,
  },
  buttonProgressSave: {
    // color: "green",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -55,
  },
  boldHelperText: {
    "& .MuiFormHelperText-root": {
      // fontWeight : "bold",
      color: "red",
      fontSize: "16px",
      fontFamily: "Montserrat-Medium"
    }
  },
}));

function ObservationCorrectiveAction() {
  const [form, setForm] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const radioDecide = ["Yes", "No"];
  const history = useHistory();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const [actionTakenData, setActionTakenData] = useState([])
  const [actionOpen, setActionOpen] = useState(true)
  const [error, setError] = useState({ comment: "", reviewedOn: "" });
  const [reportedByName, setReportedByName] = useState([]);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [updatePage, setUpdatePage] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [isDateShow, setIsDateShow] = useState(false)
  let filterReportedByName = []

  const [projectData, setProjectData] = useState({
    projectId: "",
    companyId: "",
    createdBy: "",
    projectStructId: ""
  })
  const [actionData, setActionData] = useState([])
  const [fkProjectStructureIds, setFkProjectStructureId] = useState()
  const [observationNumber, setObservationNumber] = useState()

  const fkCompanyId =
    JSON.parse(localStorage.getItem("company")) !== null
      ? JSON.parse(localStorage.getItem("company")).fkCompanyId
      : null;

  const projectId =
    JSON.parse(localStorage.getItem("projectName")) !== null
      ? JSON.parse(localStorage.getItem("projectName")).projectName.projectId
      : null;


  const companies = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).companies
    : null;

  const userId = JSON.parse(localStorage.getItem('userDetails')) !== null
    ? JSON.parse(localStorage.getItem('userDetails')).id
    : null;


  const [comment, setComment] = useState({
    "fkCompanyId": parseInt(fkCompanyId),
    "fkProjectId": parseInt(projectId),
    "commentContext": "Observation",
    "contextReferenceIds": localStorage.getItem("fkobservationId"),
    "commentTags": "Corrective-Action",
    "comment": "",
    "parent": 0,
    "private": "Yes",
    "thanksFlag": "string",
    "status": "Active",
    "createdBy": parseInt(userId),

  })

  const handelActionTracker = async () => {
    let observationId = localStorage.getItem("fkobservationId")
    let allAction = await handelActionData(observationId, [], "title")
    setActionData(allAction)
  };

  const handelActionShow = (id) => {
    return (<>
      <Grid>
        <>
          {
            actionData.map((valueAction) => (
              <>
                <ActionShow
                  action={{ id: valueAction.id, number: valueAction.actionNumber }}
                  title={valueAction.actionTitle}
                  companyId={fkCompanyId}
                  projectId={projectId}
                  updatePage={updatePage}
                />
              </>
            ))
          }
        </>
      </Grid>
    </>
    )
  }


  const handleSubmit = async () => {
    const { error, isValid } = CorrectiveActionValidator(form , actionData,"submit");
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }

    await setLoading(true)
    if (comment.id) {
      comment['updatedBy'] = parseInt(userId)
      const res1 = await api.put(`/api/v1/comments/${comment.commentContext}/${comment.contextReferenceIds}/${comment.id}/`, comment)
    } else {
      if (comment.comment !== "") {
        const res1 = await api.post(`/api/v1/comments/`, comment).then(res => {}).catch(err => {setLoading(false)})

      }
    }
    form['updateBy'] = userId
    if(form["reviewedByName"] !== ""){
      form["observationStage"] = "Completed"
      form["observationStatus"] = "Reviewed"
    }
    delete form['attachment']
    const res = await api.put(`/api/v1/observations/${localStorage.getItem(
      "fkobservationId"
    )}/`, form).then(res => {
      if (res.status === 200) {
        localStorage.setItem('updateAction', "Done")
        localStorage.setItem("action", "Done")
        history.push(
          `/app/observation/details/${localStorage.getItem(
            "fkobservationId"
          )}`
        );
      }
    }).catch(err => {setLoading(false)})
  }
  const handleSave = async () => {
    const { error, isValid } = CorrectiveActionValidator(form , actionData,"save");
    
    await setError(error);
    if (!isValid) {
      return "Data is not valid";
    }

    await setSaveLoading(true)
    if (comment.id) {
      comment['updatedBy'] = parseInt(userId)
      const res1 = await api.put(`/api/v1/comments/${comment.commentContext}/${comment.contextReferenceIds}/${comment.id}/`, comment)
    } else {
      if (comment.comment !== "") {
        const res1 = await api.post(`/api/v1/comments/`, comment).then(res => {}).catch(err => {setLoading(false)})

      }
    }
    form['updateBy'] = userId
    if(form["reviewedByName"] !== ""){
      form["observationStage"] = "Completed"
      form["observationStatus"] = "Reviewed"
    }
    delete form['attachment']
    const res = await api.put(`/api/v1/observations/${localStorage.getItem(
      "fkobservationId"
    )}/`, form).then(res => {
      if (res.status === 200) {
        localStorage.setItem('updateAction', "Done")
        localStorage.setItem("action", "Done")
        history.push(
          `/app/observation/details/${localStorage.getItem(
            "fkobservationId"
          )}`
        );
      }
    }).catch(err => {setSaveLoading(false)})
  }

  const handleCancle = async () => {
    history.push(`/app/observation/details/${id}`)
    if(form.isCorrectiveActionTaken == ""){
      await localStorage.setItem("update", "Pending");
    }else{
      await localStorage.setItem("ActionUpdate", "Pending");

    }
  }

  const fetchInitialiObservationData = async () => {
    const res = await api.get(`/api/v1/observations/${localStorage.getItem("fkobservationId")}/`);

    const result = res.data.data.results;
    await setFkProjectStructureId(result.fkProjectStructureIds)
    await setObservationNumber(result.observationNumber)
    if (result.isCorrectiveActionTaken === "Yes") {
      await setActionOpen(true);
    }
    await setForm(result);
    await handelActionTracker();

  };

  const handelClose = () => {
    setIsDateShow(false)
    return true
  }

  const fetchComments = async () => {
    const res = await api.get(`/api/v1/comments/Observation/${localStorage.getItem("fkobservationId")}/`)
    const result = res.data.data.results.results[0]
    const result2 = res.data.data.results.results
    if (result2.length > 0) {
      await setComment(result)
    }

    await setIsLoading(true);
  }

  const handleAction = async (e) => {
    let value = e.target.value

    if (value === "Yes") {
      setActionOpen(true)
    } else {
      setActionOpen(false)
    }

  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClose = async () => {
    history.push(`/app/observation/details/${id}`)
    await localStorage.setItem("update", "Done");
  }

  const handleCloseDate = (e) => {


    if (new Date(e) <= new Date()) {

      setForm({ ...form, reviewedOn: moment(e).toISOString() })
      setError({ ...error, reviewedOn: "" })

    }
    else {
      let errorMessage = "Reviewed time should not be ahead of current time"
      setError({ ...error, reviewedOn: errorMessage })
    }
  }

  const handleReview = (e, value) => {
    let temp = { ...form }
    temp.reviewedByName = value.name
    temp.reviewedById = value.id
    setForm(temp)
  }

  const fetchactionTrackerData = async () => {
    const allActionTrackerData = await apiAction.get(`/api/v1/actions/?enitityReferenceId=${id}`)
    const allActionTracker = allActionTrackerData.data.data.results.results
    const newData = []
    allActionTracker.map((item, i) => {

      if (item.enitityReferenceId == localStorage.getItem("fkobservationId")) {
        newData.push(allActionTracker[i])
      }
    }
    )
    let sorting = newData.sort((a, b) => a.id - b.id)
    await setActionTakenData(sorting)
    await setIsLoading(true);

  }

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
          const result = response.data.data.results;
          let user = [];
          // user = result;
          let data = result.filter((item) =>
            item['companyId'] == fkCompanyId
          )
          
          for (var i in data[0].users) {
            filterReportedByName.push(data[0].users[i]);
          }
          setReportedByName(filterReportedByName);
        }
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    if (id) {
      fetchInitialiObservationData()
      fetchactionTrackerData()
      fetchComments()
      fetchReportedBy()
    }

  }, [])
  const classes = useStyles();
  return (
    <>{isLoading ?
      <Grid container spacing={3} className={classes.observationCorrectiveActionSection}>

        <Grid item md={12}>
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
        </Grid>

        <Grid item md={8}>
          <Typography variant="h6" gutterBottom className={classes.labelName}>
            Assigned to
            {' '}
          </Typography>
          <Typography className={classes.labelValue}>
            {form.assigneeName ? form.assigneeName : "-"}
          </Typography>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          className={classes.formBox}
        >
          <FormControl component="fieldset" error={
            error && error["isCorrectiveActionTaken"]
          }>
            <FormLabel className={classes.labelName} component="legend">Are there any corrective actions to be taken?*</FormLabel>
            <RadioGroup row aria-label="gender" name="gender1"
              onChange={(e) => {
                setForm({ ...form, isCorrectiveActionTaken: e.target.value });
              }}>
              {radioDecide.map((value) => (
                <FormControlLabel
                  value={value}
                  checked={form.isCorrectiveActionTaken === value}
                  className={classes.labelValue}
                  onClick={(e) => handleAction(e)}
                  control={<Radio />}
                  label={value}
                />
              ))}
            </RadioGroup>
            <p style={{ color: "red" }}>{error.isCorrectiveActionTaken}</p>

          </FormControl>
        </Grid>
        {actionData.length == 0 ?   <Grid item md={8}>
          <p style={{ color: "red" }}>{error.action}</p></Grid> : null}

        <Grid item md={8}>
          {form.isCorrectiveActionTaken === "Yes" || form.isCorrectiveActionTaken === null ? (
            <>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Actions
              </Typography>
              <Typography className={classes.labelValue}>
                {handelActionShow(id)}
              </Typography>
              

              <Typography className={classes.increaseRowBox}>

                <ActionTracker
                  actionContext="Observation"
                  enitityReferenceId={id}
                  setUpdatePage={setUpdatePage}
                  fkCompanyId={fkCompanyId}
                  fkProjectId={projectId}
                  fkProjectStructureIds={fkProjectStructureIds}
                  isCorrectiveActionTaken={form.isCorrectiveActionTaken}
                  createdBy={userId}
                  updatePage={updatePage}
                  handelShowData={handelActionTracker}
                />

              </Typography>
              
            </>
          )
            :
            null}
         
        </Grid>
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



        <Grid
          item
          md={5}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Reviewed by*"
            name="reviewedby"
            id="reviewedby"
            select
            fullWidth
            error={error.reviewedByName}
            helperText={error.reviewedByName ? error.reviewedByName : null}
            className={classNames(classes.formControl, classes.boldHelperText)}
            value={form.reviewedByName ? form.reviewedByName : ""}
            variant="outlined"

          >
            {reportedByName.map((option) => (
              <MenuItem key={option} value={option.name}
                onClick={(e) => handleReview(e, option)}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid
          item
          md={5}
          xs={12}
          className={classes.formBox}
        >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              className={classNames(classes.formControl, classes.boldHelperText)}
              fullWidth
              label="Reviewed on*"
              minDate={form.observedAt}
              maxDate={new Date()}
              value={form.reviewedOn ? form.reviewedOn : null}
              error={error.reviewedOn}
              helperText={error.reviewedOn ? error.reviewedOn : null}
              disableFuture={true}
              open={isDateShow}
              onClose={(e) => handelClose()}
              onClick={(e) => setIsDateShow(true)}
              inputVariant="outlined"
              InputProps={{ readOnly: true }}
              onChange={(e) => handleCloseDate(e)}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid
          item
          md={10}
          xs={12}
          className={classes.formBox}
        >
          <TextField
            label="Provide any additional comments"
            name="provideadditionalcomments"
            id="provideadditionalcomments"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={comment.comment ? comment.comment : ""}
            className={classes.formControl}
            onChange={(e) => {
              setComment({ ...comment, comment: e.target.value });
            }}
          />
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
        >

          <div className={classes.loadingWrapper}>
          <Button
              variant="outlined"
              onClick={(e) => handleSave()}
              className={classes.custmSubmitBtn}
              style={{ marginLeft: "10px" }}
              disabled={saveLoading}
            >
              Save
            </Button>
            {saveLoading && <CircularProgress size={24} className={classes.buttonProgressSave} />}
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
                Cancle
              </Button>
          </div>
        </Grid>

      </Grid> : <h1>Loading...</h1>}
    </>
  );
}

export default ObservationCorrectiveAction;
