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
import { PapperBlock } from "dan-components";

import { useHistory, useParams } from "react-router-dom";
import api from "../../../utils/axios";
import ActivityDetailValidate from "../../Validator/ActivityDetailValidation";
import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";

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
  const [ad01, setAd01] = useState({
    answer: "",
  });
  const [ad02, setAd02] = useState({
    answer: "",
  });
  const [ad03, setAd03] = useState({
    answer: "",
  });
  const [ad04, setAd04] = useState({
    answer: "",
  });
  const [ad05, setAd05] = useState({
    answer: "",
  });
  const [ad06, setAd06] = useState({
    answer: "",
  });
  const [ad07, setAd07] = useState({
    answer: "",
  });

  const handleNext = async () => {
    console.log("sagar");
    if (activtyList.length > 0) {
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
      if (res.status === 200) {
        history.push(
          "/app/incident-management/registration/evidence/personal-and-ppedetails/"
        );
      }
    } else {
      const selectedQuestion = [ad01, ad02, ad03, ad04, ad05, ad06, ad07];
      const { isValid, error } = ActivityDetailValidate(selectedQuestion);
      setError(error);
      console.log(error)
      console.log(selectedQuestion);
      // for (let i = 0; i < selectedQuestion.length; i++) {
        // const valdation = selectedQuestion[i];
        // console.log(valdation);
        // const { isValid, error } = ActivityDetailValidate(valdation);
        // setError(error);
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/activities/`,
          selectedQuestion
        );
        console.log(res);
      
      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }
  };

  const handleRadioData = (e, index) => {
    console.log("sagar", activtyList);
    const TempActivity = activtyList;
    const TempIndexData = activtyList[index];
    TempIndexData.answer = e.target.value;
    TempActivity[index] = TempIndexData;
    console.log("ac", TempActivity);
    setActvityList(TempActivity);
  };

  console.log(activtyList);

  const fetchActivityList = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
    );

    const result = res.data.data.results;
    await setActvityList(result);
  };

  useEffect(() => {
    fetchActivityList();
  }, []);
  // useEffect(() => {
  //   if (activtyList.length > 0) {
  //     console.log(activtyList[0].answer);
  //   }
  // }, [activtyList]);

  // console.log(selectedQuestion)
  return (
    <PapperBlock title="Activity Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          <Grid item md={4}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Incident number: nnnnnnnnnn
              </Typography>
            </Box>
          </Grid>
          {activtyList.length == !0 ? (
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
                    // defaultValue = {activtyList[0].answer === Yes ? "Yes" : "No"}
                    onChange={(e) => {
                      handleRadioData(e, 0);
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
                      handleRadioData(e, 1);
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
                      handleRadioData(e, 2);
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
                      handleRadioData(e, 3);
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
                >
                  <FormLabel component="legend">
                    Was FLA executed for the task?
                  </FormLabel>

                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    onChange={(e) => {
                      handleRadioData(e, 4);
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
                      handleRadioData(e, 5);
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
                      handleRadioData(e, 6);
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
          ) : (
            <>
              <Grid item md={12}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                  error={error.answer}
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                  {/* {error && error[`answer${[key]}`] && (
                          <p>{error[`answer${[key]}`]}</p>
                        )} */}
                </FormControl>
              </Grid>

              <Grid item md={12}>
                {/* <p>If yes ,was a permit complted prior of the job?</p> */}

                <FormControl
                  component="fieldset"
                  className={classes.formControl}
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                        question: " Did pre-planning identified the hazard?",
                        answer: e.target.value,
                        activityGroup: "Evidence",
                        status: "Active",
                        updatedBy: 0,
                        createdBy: 0,
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
                        fkIncidentId: localStorage.getItem("fkincidentId"),
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
              onClick={() => history.goBack()}
              // href="/app/incident-management/registration/evidence/evidence/"
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
            selectedItem="Activity detail"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default ActivityDetails;
