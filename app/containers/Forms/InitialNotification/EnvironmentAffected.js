import React, { useState, useEffect, useRef } from "react";
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
import { FormHelperText, FormLabel } from "@material-ui/core";

import { useHistory, useParams } from "react-router";
import moment from "moment";
import {
  INITIAL_NOTIFICATION_FORM,
} from "../../../utils/constants";
import EnvironmentValidate from "../../Validator/EnvironmetValidation";

import FormSideBar from "../FormSideBar";

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

  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const [error, setError] = useState({});

  const [environmentAffectedValue, setEnvironmentAffectedValue] = useState([]);
  const [anyReleaseValue, setAnyReleaseValue] = useState([]);
  const [impactOnWildLife, setImpactOnWildLife] = useState([]);
  const [waterbodyAffectedValue, setWaterbodyAffectedValue] = useState([]);
  const [isspills, setIsSpills] = useState(false);
  const [isrelase, setIsRelase] = useState(false);
  const [isWildlife, setIsWildlife] = useState(false);
  const [iswaterbody, setIswaterBody] = useState(false);
  const [environmentListData, setEnvironmentListData] = useState([]);
  const [envComments, setEnvComments] = useState("");
  const [incidentsListData, setIncidentsListdata] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNext, setIsNext] = useState(true)
  const userId = JSON.parse(localStorage.getItem('userDetails'))!==null?JSON.parse(localStorage.getItem('userDetails')).id:null;

  const nextPath = localStorage.getItem("nextPath");
  
  const [form, setForm] = useState([
    {
      envQuestion: "Were there any spills?",
      envQuestionOption: "",
      envAnswerDetails: "",
      createdBy: parseInt(userId),
      status: "Active",
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
    {
      envQuestion: "Were there any release?",
      envQuestionOption: "",
      envAnswerDetails: "",
      createdBy: parseInt(userId),
      status: "Active",
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
    {
      envQuestion: "Were there any impact on wildlife?",
      envQuestionOption: "",
      envAnswerDetails: "",
      createdBy: parseInt(userId),
      status: "Active",
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
    {
      envQuestion: "Were there any waterbody affected?",
      envQuestionOption: "",
      envAnswerDetails: "",
      status: "Active",
      createdBy: parseInt(userId),
      fkIncidentId: localStorage.getItem("fkincidentId"),
    },
  ]);

  const handleForm = async (e, key, fieldname) => {
    const temp = form;
    const { value } = e.target;
    temp[key][fieldname] = value;
    if (temp[key]["envQuestionOption"] !== "Yes") {
      temp[key]["envAnswerDetails"] = temp[key]["envQuestionOption"];
    }
    setForm(temp);
  };

  // set State when u want to update
  const handleUpdateEnvironement = async (e, key, fieldname) => {
    const temp = [...environmentListData];
    const { value } = e.target;
    temp[key][fieldname] = value;
    if (temp[key]["envQuestionOption"] !== "Yes") {
      temp[key]["envAnswerDetails"] = temp[key]["envQuestionOption"];
    }
    temp[key].updatedBy = parseInt(userId);
    temp[key].updatedAt = moment(new Date()).toISOString();
    await setEnvironmentListData(temp);
  };

  const handleNext = async () => {
    // check condition id is defined or env data not less than 0 other wise post data
    if (environmentListData.length > 0) {
      const { error, isValid } = EnvironmentValidate(form);
      setError(error);
      if (isValid) {
        try {
          for (var i = 0; i < environmentListData.length; i++) {
            const res = await api.put(
              `api/v1/incidents/${id}/environment/${
                environmentListData[i].id
              }/`,
              environmentListData[i]
            );
          }
        } catch (error) {}
        const temp = incidentsListData;
        temp["updatedAt"] = moment(new Date()).toISOString();
        temp["enviromentalImpactComments"] =
          envComments || incidentsListData.enviromentalImpactComments;
        try {
          await api.put(
            `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
            temp
          );
          history.push(
            `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
          );
        } catch (error) {}
      }
    } else {
      const { error, isValid } = EnvironmentValidate(form);
      setError(error);
      if (isValid === true) {
        try {
          for (let i = 0; i < form.length; i++) {
            const res = await api.post(
              `api/v1/incidents/${localStorage.getItem(
                "fkincidentId"
              )}/environment/`,
              form[i]
            );
          }
          const temp = incidentsListData;
          temp["updatedAt"] = moment(new Date()).toISOString();
          temp["enviromentalImpactComments"] =
            envComments || incidentsListData.enviromentalImpactComments;

          const res = await api.put(
            `api/v1/incidents/${localStorage.getItem("fkincidentId")}/`,
            temp
          );
          if (id) {
            history.push(
              `/app/incident-management/registration/initial-notification/reporting-and-notification/${id}`
            );
          }
        } catch (error) {}
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
    if (res.status === 200) {
      const result = res.data.data.results;
      if (result.length > 0) {
        let temp = [...form];
        temp = result;
        setForm(temp);
      }
      await setEnvironmentListData(result);
      await setIsLoading(true);
    }
  };

  const fetchIncidentsData = async () => {
    const res = await api.get(
      `/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`
    );
    const result = res.data.data.results;
    await setIncidentsListdata(result);
    if (!id) {
      setIsLoading(true);
    }
  };

  // handle go back
  const handleBack = () => {
    const nextPath = JSON.parse(localStorage.getItem("nextPath"));
    if (nextPath.equipmentAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/equipment-affected/${id}`
      );
    } else if (nextPath.propertyAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/property-affected/${id}`
      );
    } else if (nextPath.personAffect === "Yes") {
      history.push(
        `/app/incident-management/registration/initial-notification/peoples-afftected/${id}`
      );
    } else {
      history.push(
        `/app/incident-management/registration/initial-notification/incident-details/${id}`
      );
    }
  };

  useEffect(() => {
    fetchEnviornmentAffectedValue();
    fetchAnyReleaseValue();
    fetchImpactOnWildLifeValue();
    fetchWaterBodyAffectedValue();
    fetchIncidentsData();
    if (id) {
      fetchEnviornmentListData();
    }
  }, []);

  return (
    <PapperBlock title="Environment Impact" icon="ion-md-list-box">
      {isLoading ? (
        <Grid container spacing={3}>
          <Grid container item md={9} spacing={3}>
            {environmentListData.length !== 0 ? (
              environmentListData.map((env, key) => (
                <Grid container item spacing={3} md={12} key={key}>
                  <Grid item md={6}>
                    <FormControl
                      component="fieldset"
                      required
                      error={error && error[`envAnswerDetails${[key]}`]}
                      helperText={
                        error && error[`envAnswerDetails${[key]}`]
                          ? error[`envAnswerDetails${[key]}`]
                          : null
                      }
                    >
                      <FormLabel component="legend">
                        {env.envQuestion}
                      </FormLabel>
                      <RadioGroup
                        className={classes.inlineRadioGroup}
                        name="detailsOfPropertyAffect"
                        defaultValue={env.envQuestionOption}
                        onChange={(e) => {
                          handleUpdateEnvironement(
                            e,
                            key,
                            "envQuestionOption",
                            env.id
                          );
                        }}
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
                    {env.envQuestionOption === "Yes" ? (
                      <TextField
                        id={`waterbody-details-update-${key + 1}`}
                        multiline
                        rows="3"
                        variant="outlined"
                        label={`Details of ${env.envQuestion.slice(14, -1)}`}
                        required
                        error={error && error[`envAnswerDetails${[key]}`]}
                        helperText={
                          error && error[`envAnswerDetails${[key]}`]
                            ? error[`envAnswerDetails${[key]}`]
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
                  </Grid>
                </Grid>
              ))
            ) : (
              <>
                <Grid item md={12}>
                  <FormControl
                    component="fieldset"
                    required
                    error={error && error[`envQuestionOption${[0]}`]}
                  >
                   
                    <FormLabel component="legend">
                      Were there any spills?
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      aria-label="isspills"
                      name="isspills"
                      value={isspills}
                      onChange={(e) => {
                        setIsSpills(e.target.value);
                        handleForm(e, 0, "envQuestionOption");
                      }}
                    >
                      {environmentAffectedValue.length !== 0
                        ? environmentAffectedValue.map((value, index) => (
                            <FormControlLabel
                              key={index}
                              value={value.inputValue}
                              control={<Radio />}
                              label={value.inputLabel}
                            />
                          ))
                        : null}
                    </RadioGroup>
                    {error && error[`envQuestionOption${[0]}`] ? (
                      <FormHelperText>
                        {error[`envQuestionOption${[0]}`]}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {isspills == "Yes" ? (
                  <Grid item md={12}>
                    <TextField
                      id="spills-details"
                      variant="outlined"
                      label="Details of spills"
                      required
                      error={error && error[`envAnswerDetails${[0]}`]}
                      helperText={
                        error && error[`envAnswerDetails${[0]}`]
                          ? error[`envAnswerDetails${[0]}`]
                          : null
                      }
                      multiline
                      rows="3"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        handleForm(e, 0, "envAnswerDetails");
                      }}
                    />
                  </Grid>
                ) : null}

                <Grid item md={12}>
                  <FormControl
                    component="fieldset"
                    required
                    error={error && error[`envQuestionOption${[1]}`]}
                  >
                    <FormLabel component="legend">
                      Were there any release?
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      aria-label="envQuestion"
                      name="envQuestion"
                      value={isrelase}
                      onChange={(e) => {
                        handleForm(e, 1, "envQuestionOption");
                        setIsRelase(e.target.value);
                      }}
                    >
                      {anyReleaseValue.length !== 0
                        ? anyReleaseValue.map((value, index) => (
                            <FormControlLabel
                              key={index}
                              value={value.inputValue}
                              control={<Radio />}
                              label={value.inputLabel}
                            />
                          ))
                        : null}
                    </RadioGroup>
                    {error && error[`envQuestionOption${[1]}`] ? (
                      <FormHelperText>
                        {error[`envQuestionOption${[1]}`]}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {isrelase == "Yes" ? (
                  <Grid item md={12}>
                    <TextField
                      id="release-details"
                      multiline
                      variant="outlined"
                      error={error && error[`envAnswerDetails${[1]}`]}
                      required
                      helperText={
                        error && error[`envAnswerDetails${[1]}`]
                          ? error[`envAnswerDetails${[1]}`]
                          : null
                      }
                      rows="3"
                      label="Details of release"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        handleForm(e, 1, "envAnswerDetails");
                      }}
                    />
                  </Grid>
                ) : null}

                <Grid item md={12}>
                  <FormControl
                    component="fieldset"
                    required
                    error={error && error[`envQuestionOption${[2]}`]}
                  >
                    <FormLabel component="legend">
                      Were there any impact on wildlife?
                    </FormLabel>

                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      aria-label="envAnswerDetails"
                      name="envAnswerDetails"
                      value={isWildlife}
                      onChange={(e) => {
                        handleForm(e, 2, "envQuestionOption");
                        setIsWildlife(e.target.value);
                      }}
                    >
                      {impactOnWildLife.length !== 0
                        ? impactOnWildLife.map((value, index) => (
                            <FormControlLabel
                              key={index}
                              value={value.inputValue}
                              control={<Radio />}
                              label={value.inputLabel}
                            />
                          ))
                        : null}
                    </RadioGroup>
                    {error && error[`envQuestionOption${[2]}`] ? (
                      <FormHelperText>
                        {error[`envQuestionOption${[2]}`]}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {isWildlife == "Yes" ? (
                  <Grid item md={12}>
                    <TextField
                      id="details-of-Wildlife-Affected"
                      multiline
                      rows="3"
                      variant="outlined"
                      required
                      error={error && error[`envAnswerDetails${[2]}`]}
                      helperText={
                        error && error[`envAnswerDetails${[2]}`]
                          ? error[`envAnswerDetails${[2]}`]
                          : null
                      }
                      label="Details of impact on wildlife"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        handleForm(e, 2, "envAnswerDetails");
                      }}
                    />
                  </Grid>
                ) : null}

                <Grid item md={12}>
                  <FormControl
                    component="fieldset"
                    required
                    error={error && error[`envQuestionOption${[3]}`]}
                  >
                    <FormLabel component="legend">
                      Were there any waterbody affected?
                    </FormLabel>
                    <RadioGroup
                      className={classes.inlineRadioGroup}
                      aria-label="envQuestionOption"
                      name="envQuestionOption"
                      value={iswaterbody}
                      onChange={(e) => {
                        handleForm(e, 3, "envQuestionOption");
                        setIswaterBody(e.target.value);
                      }}
                    >
                      {waterbodyAffectedValue !== 0
                        ? waterbodyAffectedValue.map((value, index) => (
                            <FormControlLabel
                              key={index}
                              value={value.inputValue}
                              control={<Radio />}
                              label={value.inputLabel}
                            />
                          ))
                        : null}
                    </RadioGroup>

                    {error && error[`envQuestionOption${[3]}`] ? (
                      <FormHelperText>
                        {error[`envQuestionOption${[3]}`]}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>

                {iswaterbody == "Yes" ? (
                  <Grid item md={12}>
                    <TextField
                      id="waterbody-details"
                      multiline
                      rows="3"
                      variant="outlined"
                      error={error && error[`envAnswerDetails${[3]}`]}
                      required
                      helperText={
                        error && error[`envAnswerDetails${[3]}`]
                          ? error[`envAnswerDetails${[3]}`]
                          : null
                      }
                      label="Details of waterbody affected"
                      className={classes.fullWidth}
                      onChange={(e) => {
                        handleForm(e, 3, "envAnswerDetails");
                      }}
                    />
                  </Grid>
                ) : null}
              </>
            )}

            <Grid item md={12}>
              <TextField
                id="comment-if-any-environment"
                multiline
                variant="outlined"
                rows="3"
                label="Comment if any"
                className={classes.fullWidth}
                defaultValue={incidentsListData.enviromentalImpactComments}
                onChange={(e) => setEnvComments(e.target.value)}
              />
            </Grid>

            <Grid item md={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => handleBack()}
                // onClick={() => history.goBack()}
                // href="/app/incident-management/registration/initial-notification/peoples-afftected/"
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleNext()}
                className={classes.button}
              >
                Next
              </Button>
            </Grid>
          </Grid>
          <Grid item md={3}>
            <FormSideBar
              listOfItems={INITIAL_NOTIFICATION_FORM}
              selectedItem="Environment affected"
            />
          </Grid>
        </Grid>
      ) : (
        <h1>Loading...</h1>
      )}
    </PapperBlock>
  );
};

export default EnvironmentAffected;
