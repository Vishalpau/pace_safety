import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import { PapperBlock } from "dan-components";
import FormLabel from "@material-ui/core/FormLabel";

import { useHistory, useParams } from "react-router";
import moment from "moment";
import {
  INITIAL_NOTIFICATION,
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import EnvironmentValidate from "../../Validator/EnvironmetValidation";

import FormSideBar from "../FormSideBar";
import FormHeader from "../FormHeader";

import api from "../../../utils/axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
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
    marginTop: "1rem",
  },
  customLabel: {
    marginBottom: 0,
  },
  inlineRadioGroup: {
    flexDirection: "row",
    gap: "1.5rem",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EnvironmentAffected = () => {
  const reportedTo = [
    "Internal Leadership",
    "Police",
    "Environment Officer",
    "OHS",
    "Mital Aid",
    "Other",
  ];

  const notificationSent = ["Manage", "SuperVisor"];
  const selectValues = [1, 2, 3, 4];
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const radioDecide = ["Yes", "No", "N/A"];

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});

  const [environmentAffectedValue, setEnvironmentAffectedValue] = useState([]);
  const [anyReleaseValue, setAnyReleaseValue] = useState([]);
  const [impactOnWildLife, setImpactOnWildLife] = useState([]);
  const [waterbodyAffectedValue, setWaterbodyAffectedValue] = useState([]);
  const [detailsOfEnvAffect, setDetailsOfEnvAffect] = useState("");
  const [isspills, setIsSpills] = useState(false);
  const [isrelase, setIsRelase] = useState(false);
  const [isWildlife, setIsWildlife] = useState(false);
  const [iswaterbody, setIswaterBody] = useState(false);
  const [environmentListData, setEnvironmentListData] = useState([]);
  const [envComments, setEnvComments] = useState("");

  const [spillsData, setSpillsData] = useState({});
  const [relaseData, setReleaseData] = useState({});
  const [wildLifeData, setWildLifeData] = useState({});
  const [wateBodyData, setWaterBodyData] = useState({});
  const [incidentsListData, setIncidentsListdata] = useState([]);

  const [form, setForm] = useState({
    envQuestion: "",
    envQuestionOption: "",
    envAnswerDetails: "",
    createdBy: 1,
    fkIncidentId: localStorage.getItem("fkincidentId"),
  });

  const addNewEnvironmentDetails = () => {
    // alert('ram')
    setForm([
      ...form,
      {
        envQuestion: "",
        envQuestionOption: "",
        envAnswerDetails: "",
        createdBy: 1,
        fkIncidentId: localStorage.getItem("fkincidentId"),
      },
    ]);
  };

  const handleUpdateEnvironement = async (e, key, fieldname, envId) => {
    const temp = environmentListData;
    console.log(temp);
    const { value } = e.target;
    temp[key][fieldname] = value;
    temp[key].updatedBy = 0;
    temp[key].updatedAt = moment(new Date()).toISOString();
    console.log(temp[key]);
    await setEnvironmentListData(temp);
    const res = await api.put(
      `api/v1/incidents/${id}/environment/${envId}/`,
      temp[key]
    );
    console.log(res);

    console.log(environmentListData);
  };

  const handleNext = async () => {
    if (environmentListData.length > 0) {
      history.push(
        `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
      );
    } else {
      const { error, isValid } = EnvironmentValidate(form);
      setError(error);
      console.log(error, isValid);
      if (detailsOfEnvAffect === "Yes") {
        const envList = [spillsData, relaseData, wildLifeData, wateBodyData];
        for (let i = 0; i < envList.length; i++) {
          if (envList[i].envQuestionOption == "Yes") {
            console.log();
            const res = await api.post(
              `api/v1/incidents/${localStorage.getItem(
                "fkincidentId"
              )}/environment/`,
              envList[i]
            );
          }
        }
        // if(res.status === 201){
        history.push(
          "/app/incident-management/registration/initial-notification/reporting-and-notification/"
        );
        // }
      } else {
        history.push(
          "/app/incident-management/registration/initial-notification/reporting-and-notification/"
        );
      }
    }
  };

  const fetchWaterBodyAffectedValue = async () => {
    const res = await api.get("api/v1/lists/19/value");
    const result = res.data.data.results;
    setWaterbodyAffectedValue(result);
  };

  const fetchImpactOnWildLifeValue = async () => {
    const res = await api.get("api/v1/lists/18/value");
    const result = res.data.data.results;
    setImpactOnWildLife(result);
  };

  const fetchAnyReleaseValue = async () => {
    const res = await api.get("api/v1/lists/17/value");
    const result = res.data.data.results;
    await setAnyReleaseValue(result);
  };

  const fetchEnviornmentAffectedValue = async () => {
    const res = await api.get("api/v1/lists/16/value");
    const result = res.data.data.results;
    setEnvironmentAffectedValue(result);
  };

  const fetchEnviornmentListData = async () => {
    const res = await api.get(`api/v1/incidents/${id}/environment/`);
    const result = res.data.data.results;
    setEnvironmentListData(result);
  };
  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    // const isavailable = result.isPersonDetailsAvailable
    // await setPersonAffect(isavailable)
    // await setIsLoading(true);
  };
  useEffect(() => {
    fetchEnviornmentAffectedValue();
    fetchAnyReleaseValue();
    fetchImpactOnWildLifeValue();
    fetchWaterBodyAffectedValue();
    fetchEnviornmentListData();
    fetchIncidentsData();
  }, []);

  return (
    <PapperBlock title="Environment Affected" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          {environmentListData.length !== 0 ? (
            environmentListData.map((env, key) => (
              <Grid container item md={12} key={key}>
                <Grid item md={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">{env.envQuestion}</FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      aria-label="detailsOfPropertyAffect"
                      name="detailsOfPropertyAffect"
                      defaultValue={env.envQuestionOption}
                      onChange={(e) =>
                        handleUpdateEnvironement(
                          e,
                          key,
                          "envQuestionOption",
                          env.id
                        )
                      }
                    >
                      {environmentAffectedValue.length !== 0
                        ? environmentAffectedValue.map((value, index) => (
                            <FormControlLabel
                              value={value.inputValue}
                              control={<Radio />}
                              label={value.inputLabel}
                            />
                          ))
                        : null}
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item md={12}>
                  {env.envQuestionOption == "Yes" ? (
                    <TextField
                      id="waterbody-details"
                      multiline
                      rows="3"
                      variant="outlined"
                      label="Details of Waterbody Affected"
                      error={error && error.envAnswerDetails}
                      helperText={
                        error && error.envAnswerDetails
                          ? error.envAnswerDetails
                          : null
                      }
                      defaultValue={env.envAnswerDetails}
                      className={classes.fullWidth}
                      onChange={(e) =>
                        handleUpdateEnvironement(
                          e,
                          key,
                          "envAnswerDetails",
                          env.id
                        )
                      }
                    />
                  ) : null}
                  {/* {error && error.envAnswerDetails && (
                    <p>{error.envAnswerDetails}</p>
                  )} */}
                </Grid>
              </Grid>
            ))
          ) : (
            <>
              {/* spills question and option */}
              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were There Any Spills ?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="detailsOfPropertyAffect"
                    name="detailsOfPropertyAffect"
                    value={detailsOfEnvAffect}
                    onChange={(e) => setDetailsOfEnvAffect(e.target.value)}
                  >
                    {environmentAffectedValue.length !== 0
                      ? environmentAffectedValue.map((value, index) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                            onChange={(e) =>
                              setIsSpills(value.inputValue == "Yes")
                            }
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>
              </Grid>

              {isspills == true ? (
                <Grid item md={12}>
                  <TextField
                    id="spills-details"
                    variant="outlined"
                    label="Details of Spills"
                    multiline
                    rows="3"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setSpillsData({
                        envQuestionOption: "Yes",
                        envQuestion: "Where there any spills",
                        envAnswerDetails: e.target.value,
                        status: "Active",
                        createdBy: 0,
                        updatedBy: 0,
                        fkIncidentId: localStorage.getItem("fkincidentId"),
                      });
                    }}
                  />
                </Grid>
              ) : null}

              {/* relase question and answer */}
              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were There Any Release ?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="envQuestion"
                    name="envQuestion"
                    value={form.envQuestion}
                    onChange={(e) =>
                      setForm({ ...form, envQuestion: e.target.value })
                    }
                  >
                    {anyReleaseValue.length !== 0
                      ? anyReleaseValue.map((value) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                            onChange={(e) =>
                              setIsRelase(value.inputValue == "Yes")
                            }
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>

                {isrelase == true ? (
                  <TextField
                    id="release-details"
                    multiline
                    variant="outlined"
                    error={error && error.envQuestion}
                    helperText={
                      error && error.envQuestion ? err.envQuestion : null
                    }
                    rows="3"
                    label="Details of Release"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setReleaseData({
                        envQuestionOption: "Yes",
                        envQuestion: "Where there any relase?",
                        envAnswerDetails: e.target.value,
                        status: "Active",
                        createdBy: 0,
                        updatedBy: 0,
                        fkIncidentId: localStorage.getItem("fkincidentId"),
                      });
                    }}
                  />
                ) : null}
                {/* {error && error.envQuestion && <p>{error.envQuestion}</p>} */}
              </Grid>

              {/* wildlife imapact question and answer */}
              <Grid item md={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were There Any Impact on Wildlife ?
                  </FormLabel>

                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="envAnswerDetails"
                    name="envAnswerDetails"
                    value={form.envAnswerDetails}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        envAnswerDetails: e.target.value,
                      })
                    }
                  >
                    {impactOnWildLife.length !== 0
                      ? impactOnWildLife.map((value, index) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                            onChange={(e) =>
                              setIsWildlife(value.inputValue == "Yes")
                            }
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>

                {isWildlife == true ? (
                  <TextField
                    id="waterbody-details"
                    multiline
                    rows="3"
                    variant="outlined"
                    error={error && error.envAnswerDetails}
                    helperText={
                      error && error.envAnswerDetails
                        ? err.envAnswerDetails
                        : null
                    }
                    label="Details of Wildlife Affected"
                    className={classes.fullWidth}
                    onChange={(e) => {
                      setWildLifeData({
                        envQuestionOption: "Yes",
                        envQuestion: "Were There Any Impact on Wildlife?",
                        envAnswerDetails: e.target.value,
                        status: "Active",
                        createdBy: 0,
                        updatedBy: 0,
                        fkIncidentId: localStorage.getItem("fkincidentId"),
                      });
                    }}
                  />
                ) : null}
                {/* {error && error.envAnswerDetails && (
                  <p>{error.envAnswerDetails}</p>
                )} */}
              </Grid>

              {/* waterbody question and answer */}

              <Grid item md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Were There Any Waterbody Affected ?
                  </FormLabel>
                  <RadioGroup
                    className={classes.inlineRadioGroup}
                    aria-label="envQuestionOption"
                    name="envQuestionOption"
                    value={form.envQuestionOption}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        envQuestionOption: e.target.value,
                      })
                    }
                  >
                    {waterbodyAffectedValue !== 0
                      ? waterbodyAffectedValue.map((value) => (
                          <FormControlLabel
                            value={value.inputValue}
                            control={<Radio />}
                            label={value.inputLabel}
                            onChange={(e) =>
                              setIswaterBody(value.inputValue == "Yes")
                            }
                          />
                        ))
                      : null}
                  </RadioGroup>
                </FormControl>
              </Grid>
            </>
          )}
          <Grid item md={12}>
            {iswaterbody == true ? (
              <TextField
                id="waterbody-details"
                multiline
                rows="3"
                variant="outlined"
                error={error && error.envAnswerDetails}
                helperText={
                  error && error.envAnswerDetails
                    ? error.envAnswerDetails
                    : null
                }
                label="Details of Waterbody Affected"
                className={classes.fullWidth}
                onChange={(e) => {
                  setWaterBodyData({
                    envQuestionOption: "Yes",
                    envQuestion: "Were There Any Waterbody Affected?",
                    envAnswerDetails: e.target.value,
                    status: "Active",
                    createdBy: 0,
                    updatedBy: 0,
                    fkIncidentId: localStorage.getItem("fkincidentId"),
                  });
                }}
              />
            ) : null}

            {/* {error && error.envAnswerDetails && (
              <p>{error.envAnswerDetails}</p>
            )} */}
          </Grid>

          <Grid item md={12}>
            <div>
              {/* <p>Comment if any</p> */}
              <TextField
                id="comments"
                multiline
                variant="outlined"
                rows="3"
                label="Comment If Any"
                className={classes.fullWidth}
                defaultValue={"" || incidentsListData.equipmentDamagedComments}
                onChange={(e) => setEnvComments(e.target.value)}
              />
            </div>
          </Grid>

          <Box marginTop={4}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={() => history.goBack()}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={(e) => handleNext(e)}
            >
              Next
            </Button>
          </Box>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            listOfItems={INITIAL_NOTIFICATION_FORM}
            selectedItem="Environment Affected"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EnvironmentAffected;
