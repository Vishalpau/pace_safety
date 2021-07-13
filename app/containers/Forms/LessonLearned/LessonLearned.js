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

import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import {
  access_token,
  ACCOUNT_API_URL,
  LESSION_LEARNED_FORM,
} from "../../../utils/constants";
import api from "../../../utils/axios";
import Type from "../../../styles/components/Fonts.scss";

import axios from "axios";

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
  spacer: {},
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
  const [form, setForm] = useState({ team: "", teamLearning: "" });
  const [learningList, setLearningList] = useState([]);
  const [whyCount, setWhyCount] = useState(["ram", "ram"]);
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [department, setDepartment] = useState([]);

  // set state onChange update
  const handleUpdateLessonLearned = async (e, key, fieldname, lessonId) => {
    const temp = learningList;
    const value = e.target.value.toString();
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;
    await setLearningList(temp);
  };

  const handleNext = async () => {
    // sent put request
    let status =0
    if (learningList.length>0) {
      for (var i = 0; i < learningList.length; i++) {
        const res = await api.put(
          `api/v1/incidents/${id}/learnings/${learningList[i].id}/`,
          {
            teamOrDepartment: learningList[i].teamOrDepartment,
            learnings: learningList[i].learnings,
            status: "Active",
            updatedBy: 0
          }
        );
        status = res.status
      }
      if (status === 200) {
        history.push(
          `/app/incident-management/registration/summary/summary/${localStorage.getItem(
            "fkincidentId"
          )}`
        );
      }
    } else {
      // sent post request
      const { isValid, error } = LessionLearnedValidator(form);
      setError(error);
      console.log(error, isValid);

      if (isValid === true) {
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem("fkincidentId")}/learnings/`,
          {
            teamOrDepartment: form.team,
            learnings: form.teamLearning,
            status: "Active",
            createdBy: 0,
            updatedBy: 0,
            fkIncidentId: localStorage.getItem("fkincidentId"),
          }
        );
        if (res.status === 201) {
          history.push(
            `/app/incident-management/registration/summary/summary/${localStorage.getItem(
              "fkincidentId"
            )}`
          );
          localStorage.setItem("LessionLearnt", "Done");
        }
      }
    }
    
  };

  //  Fetch Lession learn data
  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    const result = res.data.data.results;
    await setLearningList(result);
  };

  // fetch incident data
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    await setIsLoading(true);
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
        console.log(response);
        const result = response.data.data.results;
        console.log(result);
        setDepartment(result);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDepartment();
    if (id) {
      fetchLessonLerned();
    }
    fetchIncidentsData();
  }, []);
  return (
    <PapperBlock title="Lessions Learned" icon="ion-md-list-box">
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
                  "YYYY/DD/MM HH:mm"
                )}
              </Typography>
            </Grid>

            <Grid item md={6}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident reported on
              </Typography>
              <Typography className={Type.labelValue}>
                {moment(incidentsListData.incidentReportedOn).format(
                  "YYYY/DD/MM HH:mm"
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
                {" "}
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

              {learningList.length !== 0 ? (
                learningList.map((item, index) => (
                  <Grid container item spacing={3} md={12}>
                    <Grid item md={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                        error={error.team}
                      >
                        <InputLabel id="demo-simple-select-label">
                          Team/department
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Team/department"
                          defaultValue={item.teamOrDepartment}
                          onChange={(e) =>
                            handleUpdateLessonLearned(
                              e,
                              index,
                              "teamOrDepartment",
                              item.id
                            )
                          }
                        >
                          {department.map((selectValues, index) => (
                            <MenuItem
                              value={selectValues.departmentName}
                              key={index}
                            >
                              {selectValues.departmentDescription}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && error.team && (
                          <FormHelperText>{error.team}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item md={12}>
                      <FormControl
                        variant="outlined"
                        className={classes.formControl}
                      >
                        <TextField
                          id="outlined-search"
                          label="Team/department learnings"
                          variant="outlined"
                          rows="3"
                          multiline
                          defaultValue={item.learnings}
                          error={error.teamLearning}
                          helperText={error ? error.teamLearning : ""}
                          onChange={(e) =>
                            handleUpdateLessonLearned(
                              e,
                              index,
                              "learnings",
                              item.id
                            )
                          }
                        />
                        {/* {error && error.teamLearning && (
                            <p>{error.teamLearning}</p>
                          )} */}
                      </FormControl>
                    </Grid>
                  </Grid>
                ))
              ) : (
                <Grid container spacing={3} item md={12}>
                  <Grid item md={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      error={error.team}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Team/department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Team/department"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            team: e.target.value.toString(),
                          })
                        }
                      >
                        {department.map((selectValues, index) => (
                          <MenuItem
                            value={selectValues.departmentName}
                            key={index}
                          >
                            {selectValues.departmentDescription}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && error.team && (
                        <FormHelperText>{error.team}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    {/*<Typography varint="p">Team/Department Learnings</Typography>*/}
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <TextField
                        id="outlined-search"
                        error={error.teamLearning}
                        label="Team/department learnings"
                        variant="outlined"
                        rows="3"
                        multiline
                        helperText={error ? error.teamLearning : ""}
                        onChange={(e) =>
                          setForm({ ...form, teamLearning: e.target.value })
                        }
                      />
                      {/* {error && error.teamLearning && (
                          <p>{error.teamLearning}</p>
                        )} */}
                    </FormControl>
                  </Grid>
                </Grid>
              )}
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
              selectedItem={"Lession learned"}
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
