import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { PapperBlock } from 'dan-components';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Grid, Typography, TextField, Button, Select,
} from '@material-ui/core';
import PropTypes from 'prop-types';
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
  DateTimePicker, KeyboardDateTimePicker, MuiPickersUtilsProvider, KeyboardTimePicker
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

import FormSideBar from '../../../Forms/FormSideBar';
import { JHA_FORM } from "../Utils/constants"
import JobDetailsValidate from '../Validation/JobDetailsValidate';
import api from "../../../../utils/axios";
import { handelJhaId } from "../Utils/checkValue"


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
    '& .MuiFormControlLabel-root': {
      width: '30%',
      [theme.breakpoints.down("xs")]: {
        width: '48%',
      },
    },
  },
  createHazardbox: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
    '& button': {
      marginTop: '8px',
    },
  },
  // });
}));

const JobDetails = () => {

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
      "workArea": "string",
      "location": "",
      "jhaAssessmentDate": "2021-08-20",
      "permitToPerform": "",
      "permitNumber": "",
      "jhaNumber": "string",
      "jobTitle": "",
      "description": "",
      "workStopCondition": "string",
      "department": "",
      "additionalRemarks": "string",
      "classification": "string",
      "jobOrderNumber": "",
      "supervisorName": "",
      "emergencyNumber": "",
      "evacuationAssemblyPoint": "",
      "wrpApprovalUser": "string",
      "wrpApprovalDateTime": null,
      "picApprovalUser": "string",
      "picApprovalDateTime": "2021-08-20T09:01:02.938Z",
      "signedUser": "string",
      "signedDateTime": "2021-08-20T09:01:02.938Z",
      "anyLessonsLearnt": "Yes",
      "lessonLearntDetails": "string",
      "lessonLearntUserName": "string",
      "jhaStatus": "string",
      "jhaStage": "string",
      "badgeNumber": "string",
      "status": "Active",
      "createdBy": parseInt(userId),
      "source": "Web",
      "vendor": "string",
      "vendorReferenceId": "string"
    }
  )
  const { id } = useParams();
  const history = useHistory();
  const [error, setError] = useState({})

  // fecth jha data
  const fetchJhaData = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/`)
    const result = res.data.data.results;
    console.log(result)
    await setForm(result)
  }

  // fetching jha team data
  const fetchTeamData = async () => {
    const jhaId = handelJhaId()
    const res = await api.get(`/api/v1/jhas/${jhaId}/teams/`)
    const result = res.data.data.results.results
    console.log(result)
    await setTeamForm(result)
    console.log(result)
  }

  // fetching company deatils

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

  const handleSubmit = async (e) => {
    // const { error, isValid } = JobDetailsValidate(form);
    // await setError(error);
    // if (!isValid) {
    //   return "Data is not valid";
    // }
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
  }

  const [Teamform, setTeamForm] = useState([{
    "teamName": "",
    "status": "Active",
    "createdBy": parseInt(userId),
    "fkJHAId": 0
  }]);

  const [selectedDate, setSelectedDate] = useState(null);

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

  const classes = useStyles();

  const handelCallBack = async () => {
    await fetchJhaData()
    await fetchTeamData()
  }

  useEffect(() => {
    handelCallBack()
  }, []);
  return (
    <PapperBlock title="Job Details" icon="ion-md-list-box">
      <Row>
        <Col md={9}>
          <Grid container spacing={3}>

            <Grid item md={12}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Project
              </Typography>
              <Typography className={classes.labelValue}>
                A23-ERT1236 - NTPC
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" gutterBottom className={classes.labelName}>
                Unit
              </Typography>
              <Typography className={classes.labelValue}>
                A23-ERT1236 - NTPC
              </Typography>
            </Grid>

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
                // error={error.location}
                // helperText={error.location ? error.location : ""}
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
                <KeyboardDateTimePicker
                  className={classes.formControl}
                  fullWidth
                  label="Date & Time*"
                  value={form.wrpApprovalDateTime}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      wrpApprovalDateTime: moment(e).toISOString(),
                    });
                  }}
                  format="yyyy/MM/dd HH:mm"
                  inputVariant="outlined"

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
              <TextField
                label="Permit to Work"
                name="permitwork"
                id="permitwork"
                multiline
                value={form.permitToPerform ? form.permitToPerform : ""}
                fullWidth
                variant="outlined"
                onChange={(e) => setForm({ ...form, permitToPerform: e.target.value })}
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
                {department.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
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
              <Button variant="outlined" size="medium" className={classes.custmSubmitBtn} onClick={(e) => handleSubmit()}>Next</Button>
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
    </PapperBlock>
  );
};

export default JobDetails;