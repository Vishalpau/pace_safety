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

import { useHistory, useParams } from "react-router";

import FormSideBar from "../FormSideBar";
import { LESSION_LEARNED_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";
import Type from "../../../styles/components/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: ".5rem 0",
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  fullWidth: {
    width: "100%",
    margin: ".5rem 0",
  },
  spacer: {
    padding: ".75rem 0",
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
  const [form, setForm] = useState({ team: "", teamLearning: "" });
  const [learningList, setLearningList] = useState([]);
  const [whyCount, setWhyCount] = useState(["ram", "ram"]);

  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    const result = res.data.data.results;
    await setLearningList(result);
  };

  const handleUpdateLessonLearned = (e, key, fieldname, lessonId) => {
    const temp = learningList;
    const value = e.target.value.toString();
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;
    // temp[key]["updatedAt"] = moment(new Date()).toISOString();
    const res = api.put(
      `api/v1/incidents/${id}/learnings/${lessonId}/`,
      temp[key]
    );
    // if (res.status === 200) {
    //   history.push(
    //     "/app/incident-management/registration/summary/summary/:id"
    //   );
    // }
  };
  useEffect(() => {
    fetchLessonLerned();
  }, []);
  const handleNext = () => {
    const { isValid, error } = LessionLearnedValidator(form);

    setError(error);
    console.log(error, isValid);

    if (isValid === true) {
      const res = api.post(
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
          "/app/incident-management/registration/summary/summary/:id"
        );
      }
    }
  };

  return (
    <PapperBlock title="Lessions Learned" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} justify="flex-start" spacing={3}>
          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Number
            </Typography>

            <Typography varint="body1" className={Type.labelValue}>
              98865686
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident on
            </Typography>
            <Typography className={Type.labelValue}>
              27th June 1985, 11:59 PM
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Reported on
            </Typography>
            <Typography className={Type.labelValue}>
              27th June 1985, 11:59 PM
            </Typography>
          </Grid>

          <Grid item md={6}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Reported By
            </Typography>
            <Typography className={Type.labelValue}>11:59 PM</Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Type
            </Typography>
            <Typography className={Type.labelValue}>Near Miss</Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Title
            </Typography>
            <Typography className={Type.labelValue}>
              This is the Long Incident Title as a Sample
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Description
            </Typography>
            <Typography className={Type.labelValue}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source.
            </Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Incident Location
            </Typography>
            <Typography className={Type.labelValue}>New Delhi</Typography>
          </Grid>

          <Grid item md={12}>
            <Typography variant="h6" className={Type.labelName} gutterBottom>
              Key Learnings
            </Typography>

            {learningList.length !== 0 ? (
              learningList.map((item, index) => (
                <>
                  <Grid item md={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                      error={error.team}
                    >
                      <InputLabel id="demo-simple-select-label">
                        Team/Department
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Team/Department"
                        defaultValue={item.learnings}
                        onChange={(e) =>
                          handleUpdateLessonLearned(
                            e,
                            index,
                            "teamOrDepartment",
                            item.id
                          )
                        }
                      >
                        {selectValues.map((selectValues) => (
                          <MenuItem value={selectValues}>
                            {selectValues}
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
                        label="Team/Department Learnings"
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
                </>
              ))
            ) : (
              <>
                <Grid item md={12}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    error={error.team}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Team/Department
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Team/Department"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          team: e.target.value.toString(),
                        })
                      }
                    >
                      {selectValues.map((selectValues) => (
                        <MenuItem value={selectValues}>{selectValues}</MenuItem>
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
                      label="Team/Department Learnings"
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
              </>
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
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={LESSION_LEARNED_FORM}
            selectedItem={"Lession Learned"}
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default LessionLearned;
