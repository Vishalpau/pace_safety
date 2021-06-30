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
  const [activtyList, setActvityList] = useState({});

  const [ad22, setAd22] = useState({});
  const [ad23, setAd23] = useState({});
  const [ad24, setAd24] = useState({});
  const [ad25, setAd25] = useState({});

  const handleNext = async () => {
    console.log("sagar");
    if (activtyList.length > 23) {
      const res = await api.put(
        `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`,
        activtyList
      );
    } else {
      const selectedQuestion = [ad22, ad23, ad24, ad25];
      console.log(selectedQuestion);
      for (let i = 0; i < selectedQuestion.length; i++) {
        // const valdation = selectedQuestion[i];
        // console.log(valdation);
        // const { isValid, error } = ActivityDetailValidate(valdation);
        // setError(error);
        const res = await api.post(
          `api/v1/incidents/${localStorage.getItem(
            "fkincidentId"
          )}/activities/`,
          selectedQuestion[i]
        );
        console.log(res);
      }
    }
  };

  const handleUpdateActivityList = (e, index) => {
    const TempActivity = activtyList;
    const TempIndexData = activtyList[index];
    TempIndexData.answer = e.target.value;
    TempActivity[index] = TempIndexData;
    console.log("ac", TempActivity);
    setActvityList(TempActivity);
  };

  const selectValues = [1, 2, 3, 4];
  const radioDecide = ["Yes", "No"];
  const classes = useStyles();
  const fetchActivityList = async () => {
    const res = await api.get(
      `api/v1/incidents/${localStorage.getItem("fkincidentId")}/activities/`
    );
    const result = res.data.data.results;
    await setActvityList(result);
    console.log(result);
  };
  useEffect(() => {
    fetchActivityList();
  }, []);
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
                Additional Details
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container item md={9} spacing={3}>
                <Grid item md={12}>
                  <Box>
                    <Typography variant="body2" gutterBottom>
                      Incident number: nnnnnnnnnn
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Typography variant="h6" gutterBottom>
                    Incident Description
                  </Typography>
                  <Typography variant="body">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Nobis debitis saepe corporis quo inventore similique fugiat
                    voluptatem alias et quae temporibus necessitatibus ut, magni
                    ea quisquam vel, officiis cupiditate aperiam.
                  </Typography>
                </Grid>
                {activtyList.length < 25 ? (
                  <>
                    <Grid item md={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Any Part/Equiptment sent for anlysis"
                          error={error.ans1}
                          helperText={error.ans1 ? error.ans1 : ""}
                          multiline
                          rows="4"
                          onChange={(e) => {
                            setAd22({
                              ...ad22,
                              questionCode: "ADD-22",
                              question: "Any Part/Equiptment sent for anlysis",
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
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Evidence analysis notes</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Evidence analysis notes"
                          error={error.ans2}
                          helperText={error.ans2 ? error.ans2 : ""}
                          onChange={(e) => {
                            setAd23({
                              ...ad23,
                              questionCode: "ADD-23",
                              question: "Evidence analysis notes",
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
                          multiline
                          rows="4"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Evidence summary</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Evidence summary"
                          error={error.ans3}
                          helperText={error.ans3 ? error.ans3 : ""}
                          onChange={(e) => {
                            setAd24({
                              ...ad24,
                              questionCode: "ADD-24",
                              question: "Evidence summary",
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
                          multiline
                          rows="4"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Additional notes if any</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Additional notes if any"
                          error={error.ans4}
                          helperText={error.ans4 ? error.ans4 : ""}
                          onChange={(e) => {
                            setAd25({
                              ...ad25,
                              questionCode: "ADD-25",
                              question: "Additional notes if any",
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
                          multiline
                          rows="4"
                        />
                      </FormControl>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item md={12}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Any Part/Equiptment sent for anlysis"
                          error={error.ans1}
                          helperText={error.ans1 ? error.ans1 : ""}
                          multiline
                          rows="4"
                          onChange={(e) => {
                            handleUpdateActivityList(e, 21);
                          }}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Evidence analysis notes</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Evidence analysis notes"
                          error={error.ans2}
                          helperText={error.ans2 ? error.ans2 : ""}
                          onChange={(e) => {
                            handleUpdateActivityList(e, 22);
                          }}
                          multiline
                          rows="4"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Evidence summary</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Evidence summary"
                          error={error.ans3}
                          helperText={error.ans3 ? error.ans3 : ""}
                          onChange={(e) => {
                            handleUpdateActivityList(e, 23);
                          }}
                          multiline
                          rows="4"
                        />
                      </FormControl>
                    </Grid>

                    <Grid item md={12}>
                      {/* <p>Additional notes if any</p> */}

                      <FormControl className={classes.formControl}>
                        <TextField
                          id="filled-basic"
                          variant="outlined"
                          label="Additional notes if any"
                          error={error.ans4}
                          helperText={error.ans4 ? error.ans4 : ""}
                          onChange={(e) => {
                            handleUpdateActivityList(e, 24);
                          }}
                          multiline
                          rows="4"
                        />
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
        </Paper>
      </Container>
    </div>
  );
};

export default AdditionalDetails;
