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
import {
  LESSION_LEARNED_FORM,
} from "../../../utils/constants";
import api from "../../../utils/axios";

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
  const [form, setForm] = useState({ team: 0, teamLearning: "" });
  const [learningList, setLearningList] = useState([]);
  const [whyCount, setWhyCount] = useState(['ram','ram'])

  const fetchLessonLerned = async () => {
    const res = await api.get(`api/v1/incidents/${id}/learnings/`);
    const result = res.data.data.results;
    await setLearningList(result);
  };

  const handleUpdateLessonLearned = (e,key,fieldname,lessonId)=>{
    const temp = learningList;
    const value = e.target.value.toString();
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;
    // temp[key]["updatedAt"] = moment(new Date()).toISOString();
    const res = api.put(`api/v1/incidents/${id}/learnings/${lessonId}/`,temp[key]);
  // if (res.status === 200) {
  //   history.push(
  //     "/app/incident-management/registration/summary/summary/:id"
  //   );
  // }
  }
  useEffect(() => {
    fetchLessonLerned();
  }, []);
  const handleNext = () => {
    
    const { isValid, error } = LessionLearnedValidator(form);
    
    setError(error);
    console.log(error, isValid);

    if (isValid === true) {
      const res = api.post(`api/v1/incidents/${localStorage.getItem("fkincidentId")}/learnings/`,{
          teamOrDepartment: form.team,
          learnings: form.teamLearning,
          status: "Active",
          createdBy: 0,
          updatedBy: 0,
          fkIncidentId: localStorage.getItem("fkincidentId")
        }
      );
      if (res.status === 201) {
        alert(ok)
        history.push(
          "/app/incident-management/registration/summary/summary/:id"
        );
      }
    }
  };

  return (
    <div>
      <Container>
        <Box padding={3} bgcolor="background.paper">
          <Box borderBottom={1} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              Lessions Learned
            </Typography>
          </Box>

          <Paper>
            <Grid container spacing={3}>
              <Grid container item md={9} justify="flex-start" spacing={3}>

              {whyCount.map((value, index) => {
               
                  {console.log(value)}
                  <Typography varint="p">{value}</Typography>
               
              })}
                <Grid item md={6}>
                  <Typography varint="p">Incident Number</Typography>

                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <p>nnnnnnnnn</p>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Incident on</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <p>Date and time</p>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Repoted on</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <p>Date and tiem</p>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <Typography varint="p">Reported by</Typography>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <p>Time format</p>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incident Type</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">Near miss</Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incidnet Title</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">
                      Lorem Ipsum is simply dummy text
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incident description</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography varint="p">Incident Location</Typography>
                  <FormControl>
                    {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                    <Typography varint="p">
                      Lorem Ipsum is simply dummy text
                    </Typography>
                  </FormControl>
                </Grid>

                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom spacing={2}>
                    Key Learnings
                  </Typography>
                </Grid>
                {/*<Typography varint="p">Team/Department</Typography>*/}
                {learningList.length !== 0 ? (
                  learningList.map((item, index) => (
                    <>
                      <Grid item md={12}>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel id="Team/Department">
                            Team/Department
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Key learnings"
                            defaultValue = {item.learnings}
                            onChange={(e) =>
                              handleUpdateLessonLearned(e,index,'teamOrDepartment',item.id)
                            }
                          >
                            {selectValues.map((selectValues) => (
                              <MenuItem value={selectValues}>
                                {selectValues}
                              </MenuItem>
                            ))}
                          </Select>
                          {error && error.team && <p>{error.team}</p>}
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
                            label="Team/Department Learnings"
                            variant="outlined"
                            rows="3"
                            multiline
                            defaultValue={item.learnings}
                            onChange={(e) =>
                              handleUpdateLessonLearned(e,index,'learnings',item.id)
                            }
                          />
                          {error && error.teamLearning && (
                            <p>{error.teamLearning}</p>
                          )}
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
                      >
                        <InputLabel id="Team/Department">
                          Team/Department
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Key learnings"
                          onChange={(e) =>
                            setForm({ ...form, team: e.target.value.toString() })
                          }
                        >
                          {selectValues.map((selectValues) => (
                            <MenuItem value={selectValues}>
                              {selectValues}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && error.team && <p>{error.team}</p>}
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
                          label="Team/Department Learnings"
                          variant="outlined"
                          rows="3"
                          multiline
                          onChange={(e) =>
                            setForm({ ...form, teamLearning: e.target.value })
                          }
                        />
                        {error && error.teamLearning && (
                          <p>{error.teamLearning}</p>
                        )}
                      </FormControl>
                    </Grid>
                  </>
                )}

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
              deleteForm={[1,2,3]}
                  listOfItems={LESSION_LEARNED_FORM}
                  selectedItem={"Lession learned"}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default LessionLearned;
