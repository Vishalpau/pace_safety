import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import api from "../../../utils/axios";
import ActivityDetailValidate from "../../Validator/ActivityDetailValidation";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { useHistory, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
}));

const ActivityDetails = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = useState({});
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [activtyList, setActvityList] = useState([]);
  const [ad01, setAd01] = useState({});
  const [ad02, setAd02] = useState({});
  const [ad03, setAd03] = useState({});
  const [ad04, setAd04] = useState({});
  const [ad05, setAd05] = useState({});
  const [ad06, setAd06] = useState({});
  const [ad07, setAd07] = useState({});

  const handleNext = async () => {
    if (id !== undefined && activtyList.length > 0) {
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    } else {
      const selectedQuestion = [ad01, ad02, ad03, ad04, ad05, ad06, ad07];
      console.log(selectedQuestion);
      for (var i = 0; i < selectedQuestion.length; i++) {
        const valdation = selectedQuestion[i];
        console.log(valdation);
        const { isValid, error } = ActivityDetailValidate(valdation);
        setError(error);
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/activities/`,
          selectedQuestion[i]
        );
        console.log(res);
      }
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }
  };

  const handleUpdateActivityList = async (e, key, fieldname, activityId) => {
    const temp = activtyList;
    console.log(temp);
    const value = e.target.value;
    temp[key][fieldname] = value;
    temp[key]["updatedBy"] = 0;
    temp[key]["updatedAt"] = moment(new Date()).toISOString();
    console.log(temp[key]);

    const res = await api.put(
      `api/v1/incidents/${id}/activities/${activityId}/`,
      temp[key]
    );
    console.log(res);
  };
  const fetchActivityList = async () => {
    const res = await api.get(`api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    await setActvityList(result);
    console.log(result);
  };
  useEffect(() => {
    fetchActivityList();
  }, []);

  // console.log(selectedQuestion)
  return (
    <div>
      <Container>
        <Paper>
          <Box padding={3} bgcolor="background.paper">
            {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box> */}

            <Box borderBottom={1} marginBottom={2}>
              <Typography variant="h6" gutterBottom>
                Activity Details
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number: nnnnnnnnnn
                    </Typography>
                  </Box>
                </Grid>
                {activtyList.length !== 0 ? (
                  activtyList.map((activity, key) => (
                    <>
                      <Grid item md={12} key={key}>
                        {/* <p>Did pre-planning identified the hazard?</p> */}

                        <FormControl
                          component="fieldset"
                          className={classes.formControl}
                          error={error.ans6}
                        >
                          <FormLabel component="legend">
                            Did pre-planning identified the hazard?
                          </FormLabel>

                          <RadioGroup
                            className={classes.inlineRadioGroup}
                            defaultValue={activity.answer}
                            onChange={(e) => {
                              handleUpdateActivityList(
                                e,
                                key,
                                "answer",
                                activity.id
                              );
                            }}
                          >
                            {radioDecide.map((value) => (
                              <FormControlLabel
                                value={value}
                                control={<Radio />}
                                label={value}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </>
                  ))
                ) : (
                  <>
                    <Grid item md={12}>
                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans1}
                      >
                        <FormLabel component="legend">
                          Did the job require work permit?
                        </FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd01({
                              ...ad01,
                              questionCode: "AD-01",
                              question: "Did the job require work permit?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>If yes ,was a permit complted prior of the job?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans2}
                      >
                        <FormLabel component="legend">
                          If yes ,was a permit complted prior of the job?
                        </FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd02({
                              ...ad02,
                              questionCode: "AD-02",
                              question:
                                "If yes ,was a permit complted prior of the job?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Was per-job safety discussed head?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans3}
                      >
                        <FormLabel component="legend">
                          Was per-job safety discussed head?
                        </FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd03({
                              ...ad03,
                              questionCode: "AD-03",
                              question: "Was per-job safety discussed head?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Was JHA executed for the task?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans4}
                      >
                        <FormLabel component="legend">
                          Was JHA executed for the task?
                        </FormLabel>

                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd04({
                              ...ad04,
                              questionCode: "AD-04",
                              question: "Was JHA executed for the task?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Was FLA executed for the task?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans5}
                      >
                        <FormLabel component="legend">
                          Was FLA executed for the task?
                        </FormLabel>

                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd05({
                              ...ad05,
                              questionCode: "AD-05",
                              question: "Was FLA executed for the task?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Did pre-planning identified the hazard?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans6}
                      >
                        <FormLabel component="legend">
                          Did pre-planning identified the hazard?
                        </FormLabel>

                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd06({
                              ...ad06,
                              questionCode: "AD-06",
                              question:
                                " Did pre-planning identified the hazard?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>was per-jon planning enhanced the post-event?</p> */}

                      <FormControl
                        component="fieldset"
                        className={classes.formControl}
                        error={error.ans7}
                      >
                        <FormLabel component="legend">
                          was per-jon planning enhanced the post-event?
                        </FormLabel>

                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          onChange={(e) => {
                            setAd07({
                              ...ad07,
                              questionCode: "AD-07",
                              question:
                                "was per-jon planning enhanced the post-event?",
                              answer: e.target.value,
                              activityGroup: "Evidence",
                              status: "Active",
                              updatedBy: 0,
                              createdBy: 0,
                              fkIncidentId: localStorage.getItem(
                                "fkincidentId"
                              ),
                            });
                          }}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </>
                )}
                <Grid item md={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    href="/app/incident-management/registration/evidence/evidence/"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleNext()}
                    // href={Object.keys(error).length == 0 ? "http://localhost:3000/app/incident-management/registration/evidence/personal-and-ppedetails/" : "#"}
                  >
                    Next
                  </Button>
                </Grid>
              </Grid>
              <Grid item md={3}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={EVIDENCE_FORM}
                  selectedItem={"Activity detail"}
                />
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ActivityDetails;
