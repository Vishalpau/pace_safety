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
      question: "Any Part/Equiptment sent for anlysis",
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
    console.log("sagar");

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
    // await setIsLoading(true)
    const { error, isValid } = AdditionalDetailValidate(additionalDetailList);
    await setError(error);
    console.log(error);
    // setAdditionalDetailList(activityState);
    if (!isValid) {
      return "Data is not Valid";
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
    <div>
      <Container>
        <Paper>
          {isLoading ? (
            <Box padding={3} bgcolor="background.paper">
              {/* <Box marginBottom={5}>
              <FormHeader selectedHeader={"Evidence collection"} />
            </Box> */}

              <Box borderBottom={1} marginBottom={2}>
                <Typography variant="h6" gutterBottom>
                  Additional Details
                </Typography>
              </Box>
              <Grid container spacing={3}>
                <Grid container item md={9} spacing={3}>
                  <Grid item md={12}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        Incident number: {incidentDetail.incidentNumber}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={12}>
                    <Typography variant="h6" gutterBottom>
                      Incident Description
                    </Typography>
                    <Typography variant="body">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Nobis debitis saepe corporis quo inventore similique
                      fugiat voluptatem alias et quae temporibus necessitatibus
                      ut, magni ea quisquam vel, officiis cupiditate aperiam.
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
                                multiline
                                rows="4"
                                defaultValue={value.answer}
                                onChange={(e) => {
                                  handleRadioData(e, value.questionCode);

                                  console.log(value.answer);
                                }}
                              />
                            </FormControl>
                            {value.error ? <p>{value.error}</p> : null}
                          </Grid>
                        ))}
                    </>
                  ) : (
                    <>
                      {Object.entries(additionalDetailList).map(
                        ([key, value]) => (
                          <Grid item md={12}>
                            <FormControl className={classes.formControl}>
                              <TextField
                                id="filled-basic"
                                variant="outlined"
                                label={value.question}
                                multiline
                                rows="4"
                                onChange={(e) => {
                                  handleRadioData(e, value.questionCode);

                                  console.log(value.answer);
                                }}
                              />
                            </FormControl>
                            {value.error ? <p>{value.error}</p> : null}
                          </Grid>
                        )
                      )}
                    </>
                  )}

                  <Grid item md={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => history.goBack()}
                      // href="/app/incident-management/registration/evidence/personal-and-ppedetails/"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      onClick={() => handleNext()}
                      // href={Object.keys(error).length == 0 ? 'http://localhost:3000/app/incident-management/registration/root-cause-analysis/details/' : '#'}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>

                <Grid item md={3}>
                  <FormSideBar
                    deleteForm={[1, 2, 3]}
                    listOfItems={EVIDENCE_FORM}
                    selectedItem="Additional detail"
                  />
                </Grid>
              </Grid>
            </Box>
          ) : (
            <h1>Loading...</h1>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default AdditionalDetails;
