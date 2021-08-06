import React, { useEffect, useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import { PapperBlock } from "dan-components";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import IconButton from "@material-ui/core/IconButton";
import LessionLearnedValidator from "../../Validator/LessonLearn/LessonLearn";
import moment from "moment";

import Tooltip from "@material-ui/core/Tooltip";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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


import Attachment from "../../Attachment/Attachment";

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
  const ref = useRef();
  const { id } = useParams();
  const [error, setError] = useState({});
  const [form, setForm] = useState([{ teamOrDepartment: "", learnings: "" }]);
  const [learningList, setLearningList] = useState([]);
  const [attachment, setAttachment] = useState([{evidenceDocument:null}]);
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState([]);
  const [evidence, setEvidence] = useState([]);
  const userId =
    JSON.parse(localStorage.getItem("userDetails")) !== null
      ? JSON.parse(localStorage.getItem("userDetails")).id
      : null;

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
    const inputValue = e.target.files[0].name

    let file = inputValue.split(".");
   
    if (
      file[1].toLowerCase() === "jpg" ||
      file[1].toLowerCase() === "jpeg" ||
      file[1].toLowerCase() === "png"
    ) {
      if (e.target.files[0].size <= 1024 * 1024 * 25) {
        const temp = [... attachment]
        temp[0]['evidenceDocument']=e.target.files[0]
        await setAttachment(temp);
      } else {
        ref.current.value = "";
        await setMessage("File uploading failed! Select file less than 25MB!");
        await setMessageType("error");
        await setOpen(true);
      }
      
    } else {
      ref.current.value = "";
      await setMessage("Only JPG & PNG File is allowed!");
      await setMessageType("error");
      await setOpen(true);
    }
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
   
    // sent put request
    let status = 0;
    // sent post request
    const { isValid, error } = LessionLearnedValidator(form);
    setError(error);

    if (isValid === true) {
      if(attachment[0].evidenceDocument !== null){
        if(typeof(attachment[0].evidenceDocument)!=="string"){
          if (evidence.length > 0) {
            for (let key in evidence) {
              const res = await api.delete(
                `api/v1/incidents/${id}/evidences/${evidence[key].id}/`
              );
            }
          }
          const formData = new FormData();
          formData.append("evidenceDocument", attachment[0].evidenceDocument);
          formData.append("evidenceCheck", "Yes");
          formData.append("evidenceNumber", "string");
          formData.append("evidenceCategory", "Lessons Learned");
          formData.append("createdBy", parseInt(userId));
          formData.append("status", "Active");
          formData.append("fkIncidentId", id);
          try {
            const res = await api.post(
              `api/v1/incidents/${id}/evidences/`,
              formData
            );
          } catch (error) {
          
          }
        }
       

      }
      

      
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
            createdBy: parseInt(userId),
            updatedBy: parseInt(userId),
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
      const newData = allEvidence.data.data.results.filter(
        (item) => item.evidenceCategory === "Lessons Learned"
      );
      await setEvidence(newData);
      if(newData.length>0){
        setAttachment(newData)
      }
    }
  };

  // handle Remove

  const handleRemove = async (key) => {
    // this condition using when create new
    const temp = form;
    const newData = temp.filter((item, index) => index !== key);
    await setForm(newData);
  };

  // handle file name
  const handelFileName = (value) => {
    const fileNameArray = value.split("/");
    const fileName = fileNameArray[fileNameArray.length - 1];
    return fileName;
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
      fetchEvidanceData();
    }
    fetchIncidentsData();
  }, []);
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Lessons Learnt" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item xs={12} md={9} justify="flex-start" spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>

              <Typography varint="body1" className={Type.labelValue}>
                {incidentsListData.incidentNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident occured on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentOccuredOn).format(
                  "Do MMMM YYYY, h:mm:ss a"
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident reported on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentReportedOn).format(
                  "Do MMMM YYYY, h:mm:ss a"
                )}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Reported by
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentReportedByName}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident type
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentType}{" "}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident title
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentTitle}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentDetails}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident location
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentsListData.incidentLocation}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Key learnings
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {form.map((value, key) => (
                <Grid
                  container
                  spacing={3}
                  item
                  xs={12}
                  className="repeatedGrid"
                  key={key}
                >
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                    <Grid item xs={12} md={3}>
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
            <Grid item xs={12}>
              <button
                className={classes.textButton}
                onClick={() => addNewTeamOrDeparment()}
              >
                <AddIcon /> Add learnings from another team/department
              </button>
            </Grid>
            <Grid item xs={12}>
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

            {attachment.length > 0 ?attachment.map((item,index) =>
                <Grid > 
                  
                  <input
                    type="file"
                    ref={ref}
                    accept=".png, jpg, jpeg"
                    onChange={(e) => handleAttchment(e)}
                    style={{
                      color:
                        typeof(item.evidenceDocument) === "string" &&
                        "transparent"
                    }}
                  />

                   {typeof(item.evidenceDocument) === "string" &&<Attachment value={evidence[0].evidenceDocument} />} 
                </Grid>
              ):null} 
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
          {isDesktop && (
            <Grid item md={3}>
              <FormSideBar
                deleteForm={[1, 2, 3]}
                listOfItems={LESSION_LEARNED_FORM}
                selectedItem={"Lessons learnt"}
              />
            </Grid>
          )}
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default LessionLearned;
