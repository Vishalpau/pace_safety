import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { PapperBlock } from "dan-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import LessionLearnedValidator from "../../Validator/LessonLearn/LessonLearn";
import moment from "moment";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AddIcon from "@material-ui/icons/Add";
import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import {
  LOGIN_URL,
  access_token,
  ACCOUNT_API_URL,
  LESSION_LEARNED_FORM,
} from "../../../utils/constants";
import api from "../../../utils/axios";
import Type from "../../../styles/components/Fonts.scss";
import "../../../styles/custom.css";

import axios from "axios";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
  },
  textButton: {
    color: "#3498db",
    padding: 0,
    textDecoration: "underline",
    display: "inlineBlock",
    marginBlock: "1.5rem",
    backgroundColor: "transparent",
  },
}));

const LessionLearned = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});
  const [form, setForm] = useState([{ teamOrDepartment: "", learnings: "" }]);
  const [learningList, setLearningList] = useState([]);
  const [attachment, setAttachment] = useState({ evidenceDocument: "" });
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [evidence, setEvidence] = useState([]);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleForm = (e, key, fieldname) => {
    const temp = [...form];
    const { value } = e.target;
    if (e.target.value === "Don't Know") {
      temp[key][fieldname] = "N/A";
    } else {
      temp[key][fieldname] = value;
    }
    setForm(temp);
  };

  const addNewTeamOrDeparment = async () => {
    await setForm([...form, { teamOrDepartment: "", learnings: "" }]);
  };

  // handleAttchment

  const handleAttchment = async (e) => {
    if (e.target.files[0].size <= 1024 * 1024 * 25) {
      setAttachment({ ...attachment, evidenceDocument: e.target.files[0] });
      await setMessage("File uploaded successfully!");
      await setMessageType("success");
      await setOpen(true);
    } else {
      await setMessage("File uploading failed! Select file less than 25MB!");
      await setMessageType("error");
      await setOpen(true);
    }
    await setEvidanceForm(temp);
  };
  // handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      // setOpenError(false)
      return;
    }
    setOpen(false);
  };
  const handleNext = async () => {
    // attachment

    if (attachment.evidenceDocument !== "" || attachment.length !== undefined) {
      const formData = new FormData();
      formData.append("evidenceDocument", attachment.evidenceDocument);
      formData.append("evidenceCheck", "Yes");
      formData.append("evidenceNumber", "string");
      formData.append("evidenceCategory", "Lessons Learned");
      formData.append("createdBy", 0);
      formData.append("status", "Active");
      formData.append("fkIncidentId", id);

      const res = await api.post(`api/v1/incidents/${id}/evidences/`, formData);
    }
    // sent put request
    let status = 0;
    // sent post request
    const { isValid, error } = LessionLearnedValidator(form);
    setError(error);

    if (isValid === true) {
      if (learningList.length > 0) {
        for (var i = 0; i < learningList.length; i++) {
          const res = await api.delete(
            `api/v1/incidents/${id}/learnings/${learningList[i].id}/`
          );
        }
      }
      for (var i = 0; i < form.length; i++) {
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem("fkincidentId")}/learnings/`,
          {
            teamOrDepartment: form[i].teamOrDepartment,
            learnings: form[i].learnings,
            status: "Active",
            createdBy: 0,
            updatedBy: 0,
            fkIncidentId: localStorage.getItem("fkincidentId"),
          }
        );
        status = res.status;
      }
      if (status === 201) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    }
  };

  //  Fetch Lession learn data
  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    const result = res.data.data.results;

    if (result.length > 0) {
      let temp = [...form];
      temp = result;
      await setForm(temp);
    }
    await setLearningList(result);
    setIsLoading(true);
  };

  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
  };

  // fetch team or deparment
  const fetchDepartment = () => {
    var config = {
      method: "get",
      url: `${ACCOUNT_API_URL}api/v1/companies/1/departments/`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    axios(config)
      .then(function(response) {
        if (response.status === 200) {
          const result = response.data.data.results;
          setDepartment(result);
        } else {
          // window.location.href = {LOGIN_URL}
        }
      })
      .catch(function(error) {
        // window.location.href = {LOGIN_URL}
      });
  };

  // Fetch Evidance data
  const fetchEvidanceData = async () => {
    const allEvidence = await api.get(`/api/v1/incidents/${id}/evidences/`);
    if (allEvidence.status === 200) {
      await setEvidence(allEvidence.data.data.results);
    }
  };

  // handle Remove

  const handleRemove = async (key) => {
    // this condition using when create new
    const temp = form;
    const newData = temp.filter((item, index) => index !== key);
    await setForm(newData);
  };

  // handle remove initial evidance from databse

  const removeInitialEvidance = async (evidenceId) => {
    const res = await api.delete(
      `api/v1/incidents/${id}/evidences/${evidenceId}/`
    );

    if (res.status === 200) {
      await fetchEvidanceData();
    }
  };
  useEffect(() => {
    fetchDepartment();
    if (id) {
      fetchLessonLerned();
    }
    fetchIncidentsData();
  }, []);
  return (
    <PapperBlock title="Lessons Learnt" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} justify="flex-start" spacing={3}>
            <Grid item md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>

              <Typography varint="body1" className={Type.labelValue}>
                {incidentsListData.incidentNumber}
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident occured on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentOccuredOn).format(
                  "Do MMMM YYYY, h:mm:ss a"
                )}
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident reported on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentReportedOn).format(
                  "Do MMMM YYYY, h:mm:ss a"
                )}
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Reported by
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentReportedByName}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident type
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentType}{" "}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident title
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentTitle}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentDetails}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident location
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentLocation}
              </Typography>
            </Grid>

            <Grid item md={12}>
              <Typography variant="h6" gutterBottom>
                Key learnings
              </Typography>
            </Grid>

            <Grid item md={12}>
              {form.map((value, key) => (
                <Grid
                  container
                  spacing={3}
                  item
                  md={12}
                  className="repeatedGrid"
                  key={key}
                >
                  <Grid item md={12}>
                    <FormControl
                      variant="outlined"
                      required
                      className={classes.formControl}
                      error={error && error[`teamOrDepartment${[key]}`]}
                      required
                    >
                      <InputLabel id="demo-simple-select-label">
                        Team/department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Team/department"
                        value={value.teamOrDepartment || ""}
                        onChange={(e) => handleForm(e, key, "teamOrDepartment")}
                      >
                        {department.map((selectValues, index) => (
                          <MenuItem
                            value={selectValues.departmentName}
                            key={index}
                          >
                            {selectValues.departmentName}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && error[`teamOrDepartment${[key]}`] && (
                        <FormHelperText>
                          {error[`teamOrDepartment${[key]}`]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      id="outlined-search"
                      required
                      error={error && error[`learnings${[key]}`]}
                      helperText={
                        error && error[`learnings${[key]}`]
                          ? error[`learnings${[key]}`]
                          : null
                      }
                      label="Team/department learnings"
                      className={classes.formControl}
                      variant="outlined"
                      rows="3"
                      multiline
                      value={value.learnings || ""}
                      onChange={(e) => handleForm(e, key, "learnings")}
                    />
                  </Grid>
                  {form.length > 1 ? (
                    <Grid item md={3}>
                      <Button
                        onClick={() => handleRemove(key)}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<DeleteForeverIcon />}
                      >
                        Remove
                      </Button>
                    </Grid>
                  ) : null}
                </Grid>
              ))}
            </Grid>
            <Grid item md={12}>
              <button
                className={classes.textButton}
                onClick={() => addNewTeamOrDeparment()}
              >
                <AddIcon /> Add learnings from another team/department
              </button>
            </Grid>
            <Grid item md={12}>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity={messageType}>
                  {message}
                </Alert>
              </Snackbar>
              <Typography variant="h6"> Add attachment</Typography>

              <input type="file" onChange={(e) => handleAttchment(e)} />
            </Grid>
            <Grid item md={12}>
              <Box marginTop={4}>
                <Button
                  variant="contained"
                  color="primary"
                  // href="#contained-buttons"
                  onClick={() => handleNext()}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={LESSION_LEARNED_FORM}
              selectedItem={"Lessons learnt"}
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default LessionLearned;
