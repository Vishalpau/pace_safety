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
import { FormHelperText } from "@material-ui/core";
import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import Type from "../../../styles/components/Fonts.scss";
const useStyles = makeStyles((theme) => ({
  formControl: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    margin: theme.spacing(1),
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
    flexBasis: "100%",
  },
}));
const ActivityDetails = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = useState();
  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false);
  const [incidentDetail, setIncidentDetail] = useState({});
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
      question: "If yes, was a permit completed prior of the job?",
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
      question: "Was per-job safety discussion held?",
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
      question: "Did pre-planning identify the hazard?",
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
      question: "Was per-zone planning enhanced the post-event?",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);
  console.log(activtyList);
  const fetchActivityList = async () => {
    const res = await api.get(`/api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    console.log(result);
    console.log(result.length);
    if (result.length) {
      await setActvityList(result);
    }
    await setIsLoading(true);
  };

  const fetchActivityData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
    );
    const result = res.data.data.results;
    console.log(result);
    console.log(result.length);
    if (result.length) {
      await setActvityList(result);
    }
    await setIsLoading(true);
  };

  const handleNext = async () => {
    const { error, isValid } = ActivityDetailValidate(activtyList);
    await setError(error);
    if (!isValid) {
      return;
    }

    if (id && activtyList.length > 0) {
      console.log("in put");
      const res = await api.put(
        `api/v1/incidents/${id}/activities/`,
        activtyList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/personal-and-ppedetails/${id}`
        );
      }
    } else if (
      localStorage.getItem("fkincidentId") &&
      activtyList.length > 6 &&
      activtyList[0].id
    ) {
      console.log("dd put");
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/evidence/personal-and-ppedetails/`
        );
      }
    } else {
      console.log("in Post");

      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
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

  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };

  useEffect(() => {
    fetchActivityData();
    fetchIncidentDetails();
    if (id) {
      fetchActivityList();
    } else {
      setIsLoading(true);
    }
  }, [id]);

  return (
    <PapperBlock title="Activity Details" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident number
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentNumber}
              </Typography>
            </Grid>
            {activtyList.length ? (
              <>
                {Object.entries(activtyList)
                  .slice(0, 7)
                  .map(([key, value]) => (
                    <Grid item md={6}>
                      <FormControl
                        component="fieldset"
                        required
                        className={classes.formControl}
                        error={value.error}
                      >
                        <FormLabel component="legend">
                          {value.question}
                        </FormLabel>
                        <RadioGroup
                          className={classes.inlineRadioGroup}
                          defaultValue={value.answer || false}
                          onChange={(e) => {
                            handleRadioData(e, value.questionCode);
                            console.log(value.answer);
                          }}
                          // defaultValue={value.answer}
                        >
                          {radioDecide.map((value) => (
                            <FormControlLabel
                              value={value}
                              control={<Radio />}
                              label={value}
                            />
                          ))}
                        </RadioGroup>

                        {value.error ? (
                          <FormHelperText>{value.error}</FormHelperText>
                        ) : null}
                      </FormControl>
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
              selectedItem="Activity details"
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
