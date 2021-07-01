import React, { useEffect, useState, useRef } from "react";
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
import Type from "../../../styles/components/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [activtyList, setActvityList] = useState([
    {
      questionCode: "AD-01",
      question: "Did the job require work permit?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-02",
      question: "If yes ,was a permit complted prior of the job?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-03",
      question: "Was per-job safety discussed head?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-04",
      question: "Was JHA executed for the task?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-05",
      question: "Was FLA executed for the task?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-06",
      question: " Did pre-planning identified the hazard?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "AD-07",
      question: "was per-jon planning enhanced the post-event?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);
  const activityPutID = useRef();

  const fetchActivityList = async () => {
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    if (lastItem != "") {
      activityPutID.current == lastItem;
      const res = await api.get(
        `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
      );
      const result = res.data.data.results;
      if (result.length) {
        await setActvityList(result);
      }
      await setIsLoading(true);
    }
  };

  const handleNext = async () => {
    if (activityPutID.current != "") {
      console.log("in post");
      // const res = await api.put(
      //   `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
      //   activtyList
      // );
      if (res.status === 200) {
        history.push(
          "/app/incident-management/registration/evidence/personal-and-ppedetails/"
        );
      }
    } else {
      console.log("in Post");
      const { activityState, isValid } = ActivityDetailValidate(activtyList);
      setActvityList(activityState);
      if (!isValid) {
        return;
      }
      // const res = await api.post(
      //   `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
      //   activtyList
      // );

      history.push(
        "/app/incident-management/registration/evidence/personal-and-ppedetails/"
      );
    }
  };

  const handleRadioData = (e, questionCode) => {
    let TempActivity = [];

    for (let key in activtyList) {
      let activityObj = activtyList[key];

      if (questionCode == activityObj.questionCode) {
        activityObj.answer = e.target.value;
      }
      TempActivity.push(activityObj);
    }
    setActvityList(TempActivity);
  };
  console.log(activtyList[0].answer);

  useEffect(() => {
    fetchActivityList();
  }, []);

  return (
    <PapperBlock title="Activity Details" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={4}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Incident number: {localStorage.getItem("fkincidentId")}
                </Typography>
              </Box>
            </Grid>
            {activtyList.length > 0 ? (
              <>
                {Object.entries(activtyList).map(([key, value]) => (
                  <Grid item md={12}>
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormLabel component="legend">{value.question}</FormLabel>
                      <RadioGroup
                        className={classes.inlineRadioGroup}
                        // defaultValue = {activtyList[0].answer === Yes ? "Yes" : "No"}
                        onChange={(e) => {
                          handleRadioData(e, value.questionCode);
                          console.log(value.answer);
                        }}
                        defaultValue={value.answer}
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
                    {value.error ? <p>{value.error}</p> : null}
                  </Grid>
                ))}
              </>
            ) : null}
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
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default ActivityDetails;
