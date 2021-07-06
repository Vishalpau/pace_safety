import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { PapperBlock } from "dan-components";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useHistory, useParams } from "react-router";
import AdditionalDetailValidate from "../../Validator/AdditionalDetailsValidation";
import api from "../../../utils/axios";

import FormSideBar from "../FormSideBar";
import { EVIDENCE_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import Type from "../../../styles/components/Fonts.scss";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "1rem 0",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AdditionalDetails = () => {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [error, setError] = React.useState({});

  const { id } = useParams();
  const history = useHistory();
  // const [activtyList, setAdditionalDetailList] = useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [incidentDetail, setIncidentDetail] = useState({});
  const [additionalDetailList, setAdditionalDetailList] = useState([
    {
      questionCode: "ADD-22",
      question: "Any part/equipment sent for anlysis",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-23",
      question: "Evidence analysis notes",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-24",
      question: "Evidence summary",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
    {
      questionCode: "ADD-25",
      question: "Additional notes if any",
      answer: "",
      activityGroup: "Evidence",
      status: "Active",
      updatedBy: 0,
      createdBy: 0,
      fkIncidentId: localStorage.getItem("fkincidentId"),
      error: "",
    },
  ]);

  const fetchActivityList = async () => {
    const res = await api.get(`/api/v1/incidents/${id}/activities/`);
    const result = res.data.data.results;
    console.log(result);
    console.log(result.length);
    if (result.length) {
      await setAdditionalDetailList(result);
    }
    await setIsLoading(true);

    console.log(additionalDetailList.length);
  };

  const handleNext = async () => {
    const { error, isValid } = AdditionalDetailValidate(additionalDetailList);
    await setError(error);
    console.log(error);
    if (!isValid) {
      return;
    }

    if (id && additionalDetailList.length > 0) {
      console.log("in put");
      const res = await api.put(
        `api/v1/incidents/${id}/activities/`,
        additionalDetailList
      );
      if (res.status === 200) {
        history.push(
          `/app/incident-management/registration/summary/summary/${id}`
        );
      }
    } else {
      console.log("in Post");

      const res = await api.post(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        additionalDetailList
      );
      history.push(
        `/app/incident-management/registration/summary/summary/${localStorage.getItem(
          "fkincidentId"
        )}`
      );
    }
    localStorage.setItem("Evidence", "Done");
  };

  const handleRadioData = (e, questionCode) => {
    let TempActivity = [];
    for (let key in additionalDetailList) {
      let activityObj = additionalDetailList[key];
      if (questionCode == activityObj.questionCode) {
        activityObj.answer = e.target.value;
      }
      TempActivity.push(activityObj);
    }
    console.log(TempActivity);
    setAdditionalDetailList(TempActivity);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const fetchIncidentDetails = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentDetail(result);
  };
  console.log(additionalDetailList);
  useEffect(() => {
    fetchIncidentDetails();
    if (id) {
      fetchActivityList();
    } else {
      setIsLoading(true);
    }
  }, [id]);
  return (
    <PapperBlock title="Additional Details" icon="ion-md-list-box">
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
            <Grid item md={12}>
              <Typography variant="h6" className={Type.labelName} gutterBottom>
                Incident description
              </Typography>
              <Typography className={Type.labelValue}>
                {incidentDetail.incidentDetails}
              </Typography>
            </Grid>
            {additionalDetailList.length > 24 ? (
              <>
                {Object.entries(additionalDetailList)
                  .slice(21, 25)
                  .map(([key, value]) => (
                    <Grid item md={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label={value.question}
                          required
                          error={value.error}
                          helperText={value.error ? value.error : null}
                          multiline
                          rows="4"
                          defaultValue={value.answer}
                          onChange={(e) => {
                            handleRadioData(e, value.questionCode);

                            console.log(value.answer);
                          }}
                        />
                      </FormControl>
                    </Grid>
                  ))}
              </>
            ) : (
              <>
                {Object.entries(additionalDetailList).map(([key, value]) => (
                  <Grid item md={12}>
                    <FormControl
                      className={classes.formControl}
                      error={value.error}
                    >
                      <TextField
                        id="filled-basic"
                        variant="outlined"
                        label={value.question}
                        error={value.error}
                        required
                        helperText={value.error ? value.error : null}
                        multiline
                        rows="4"
                        onChange={(e) => {
                          handleRadioData(e, value.questionCode);

                          console.log(value.answer);
                        }}
                      />
                    </FormControl>
                  </Grid>
                ))}
              </>
            )}

            <Grid item md={12}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => history.goBack()}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleNext()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>

          <Grid item md={3}>
            <FormSideBar
              deleteForm={[1, 2, 3]}
              listOfItems={EVIDENCE_FORM}
              selectedItem="Additional details"
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default AdditionalDetails;
