import {
  Button,
  FormHelperText,
  FormLabel,
  Grid,
  Select,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { PapperBlock } from "dan-components";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import api from "../../../utils/axios";
import { INVESTIGATION_FORM, SUMMERY_FORM } from "../../../utils/constants";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";
import EventDetailsCostValidate from "../../Validator/InvestigationValidation/EventDetailsCostValidate";
import EventDetailsValidate from "../../Validator/InvestigationValidation/EventDetailsValdiate";
import EventDetailsWeatherValidate from "../../Validator/InvestigationValidation/EventDetailsWeatherValidate";
import FormSideBar from "../FormSideBar";
import Loader from "../Loader";

// redux
import { useDispatch } from "react-redux";
import { tabViewMode } from "../../../redux/actions/initialDetails";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const EventDetails = () => {
  const [form, setForm] = useState({
    activity: "",
    jobTask: "",
    equipmentInvolved: "",
    temperature: "",
    lighting: "",
    windSpeed: "",
    windDirection: "",
    spillsFluidType: "",
    spillsFluidAmount: "",
    acceptableExplosiveLimit: "",
    permissableExplosiveLimit: "",
    propertyImpactInformation: "",
    propertyCostImpact: "",
    isCostIncurred: "Yes",
    status: "Active",
    createdBy: 0,
    fkInvestigationId: 0,
  });

  const investigationId = useRef("");
  const activityListValues = useRef([]);
  const jobTaskValues = useRef([]);
  const weatherValues = useRef([]);
  const lightningValues = useRef([]);
  const fluidTypeValues = useRef([]);
  const costTypeValues = useRef([]);
  const casualFactorTypeValues = useRef([]);
  const putId = useRef("");
  const eventId = useRef("");
  const weatherId = useRef([]);
  const overAllCostId = useRef([]);
  const history = useHistory();
  const dispatch = useDispatch();
  const CheckPost = useRef();
  const radioYesNo = ["Yes", "No"];
  const [overAllCostShow, setOverAllCostShow] = useState("");
  const [incidentsListData, setIncidentsListdata] = useState([]);

  const [weather, setWeather] = useState([
    {
      weatherCondition: "",
      status: "Active",
      createdBy: 0,
    },
  ]);
  const [overAllCost, setOverAllCost] = useState([
    {
      costType: "",
      costAmount: "",
      casualFactor: "",
      currency: "INR",
      status: "Active",
      createdBy: 0,
    },
  ]);

  const [error, setError] = useState({});
  const [errorWeather, setErrorWeather] = useState({});
  const [errorCost, setErrorCost] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  let pickListValues = JSON.parse(localStorage.getItem("pickList"));

  // check upadte
  const handelUpdateCheck = async (e) => {
    let page_url = window.location.href;
    const lastItem = parseInt(
      page_url.substring(page_url.lastIndexOf("/") + 1)
    );
    let incidentId = !isNaN(lastItem)
      ? lastItem
      : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(
      `api/v1/incidents/${incidentId}/investigations/`
    );
    let allApiData = previousData.data.data.results[0];

    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id;
      setForm({ ...form, fkInvestigationId: allApiData.id });
      const event = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${
          investigationId.current
        }/events/`
      );
      const eventData = event.data.data.results[0];
      if (typeof eventData !== "undefined") {
        CheckPost.current = false;
        setForm(eventData);
        eventId.current = eventData.id;
      }

      // Weather data
      if (eventId.current != "") {
        const weather = await api.get(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/${eventId.current}/weatherconditions/`
        );
        const weatherData = weather.data.data.results;
        if (typeof weatherData !== "undefined") {
          setWeather(weatherData);
          weatherData.map((value) => {
            weatherId.current.push(value.id);
          });
        }
        const cost = await api.get(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/${eventId.current}/cost/`
        );
        const costData = cost.data.data.results;

        if (costData.length !== 0) {
          setOverAllCost(costData);
          costData.map((value) => {
            overAllCostId.current.push(value.id);
          });
        } else if (costData.length == 0) {
          let tempCostData = [
            {
              costType: "",
              costAmount: "",
              casualFactor: "",
              currency: "INR",
              status: "Active",
              createdBy: 0,
            },
          ];
          setOverAllCost(tempCostData);
        }
      }
      // event data
    }
    localStorage.setItem("WorkerPost", "done");
  };

  const handelWeather = async (e, key, value) => {
    const temp = [...weather];
    temp[key]["weatherCondition"] = value;
    setWeather(temp);
  };

  const handelAdd = async (e) => {
    if (weather.length < 3) {
      setWeather([
        ...weather,
        {
          weatherCondition: "",
          status: "Active",
          createdBy: 0,
        },
      ]);
    }
  };

  const handelRemove = async (e, index) => {
    if (weather.length > 1) {
      if (weather[index].id !== undefined) {
        const res = await api.delete(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/${eventId.current}/weatherconditions/${weather[index].id}/`
        );
      }

      let newData = weather.filter((item, key) => key !== index);
      setWeather(newData);
    }
  };

  const handelOveallCostAdd = async (e) => {
    if (overAllCost.length < 4) {
      setOverAllCost([
        ...overAllCost,
        {
          costType: "",
          costAmount: "",
          casualFactor: "",
          currency: "INR",
          status: "Active",
          createdBy: 0,
        },
      ]);
    }
  };

  const handelOverallCostRemove = async (e, index) => {
    if (overAllCost.length > 1) {
      if (overAllCost[index].id !== undefined) {
        const res = await api.delete(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/${eventId.current}/cost/${overAllCost[index].id}/`
        );
      }
      let newData = overAllCost.filter((item, key) => key !== index);
      setOverAllCost(newData);
    }
  };

  const handelNext = async (e) => {
    const { error, isValid } = EventDetailsValidate(form);
    const { errorWeather } = EventDetailsWeatherValidate(weather);
    const { errorCost } = EventDetailsCostValidate(overAllCost);
    setError(error);
    setErrorWeather(errorWeather);
    setErrorCost(errorCost);
    const temp = incidentsListData;
    temp.updatedAt = new Date().toISOString();
    setButtonLoading(true);
    if (incidentsListData.incidentStage === "Investigation") {
      temp.incidentStatus = "Done";
      // try {
      api
        .put(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`, temp)
        .catch((err) => {
          history.push("/app/pages/error");
        });
      // }
      // catch (error) {
      // }
    }
    // event api call
    if (
      Object.keys(error).length == 0 &&
      Object.keys(errorWeather).length == 0 &&
      Object.keys(errorCost).length == 0
    ) {
      if (eventId.current === "") {
        const res = await api.post(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/`,
          form
        );
        if (res.status === 201) {
          let eventID = res.data.data.results.id;
          let weatherObject = weather;

          // weather api call
          for (let key in weatherObject) {
            weatherObject[key]["fkEventDetailsId"] = eventID;
            const resWeather = await api.post(
              `api/v1/incidents/${putId.current}/investigations/${
                investigationId.current
              }/events/${eventID}/weatherconditions/`,
              weatherObject[key]
            );
            if (resWeather == 201) {
              console.log("request done");
            }
          }
          // cost api call
          if (form.isCostIncurred == "Yes" && overAllCost[0].costType !== "") {
            let costObject = overAllCost;
            for (let keys in costObject) {
              costObject[keys]["fkEventDetailsId"] = eventID;
              const resWeather = await api.post(
                `api/v1/incidents/${putId.current}/investigations/${
                  investigationId.current
                }/events/${eventID}/cost/`,
                costObject[keys]
              );
              if (resWeather == 201) {
                console.log("request done");
              }
            }
          }
          let viewMode = {
            initialNotification: false,
            investigation: true,
            evidence: false,
            rootcauseanalysis: false,
            lessionlearn: false,
          };
          localStorage.setItem("viewMode", JSON.stringify(viewMode));
          dispatch(tabViewMode(viewMode));
          history.push(`${SUMMERY_FORM["Summary"]}${putId.current}/`);
        }
        // put
      } else if (eventId.current !== "") {
        const res = await api.put(
          `api/v1/incidents/${putId.current}/investigations/${
            investigationId.current
          }/events/${eventId.current}/`,
          form
        );

        // weather api call put
        if (weather.length > 0) {
          let weatherObject = weather;
          for (let key in weatherObject) {
            if (weatherObject[key].id !== undefined) {
              const resWeather = await api.put(
                `api/v1/incidents/${putId.current}/investigations/${
                  investigationId.current
                }/events/${eventId.current}/weatherconditions/${
                  weatherObject[key].id
                }/`,
                weatherObject[key]
              );
              if (resWeather == 200) {
                console.log("request done");
              }
            } else {
              weatherObject[key]["fkEventDetailsId"] = eventId.current;
              const resWeather = await api.post(
                `api/v1/incidents/${putId.current}/investigations/${
                  investigationId.current
                }/events/${eventId.current}/weatherconditions/`,
                weatherObject[key]
              );
              if (resWeather == 201) {
                console.log("request done");
              }
            }
          }
        }

        // cost api call put
        if (form.isCostIncurred == "Yes") {
          if (overAllCost.length > 0) {
            let costObject = overAllCost;
            for (let keys in costObject) {
              if (
                costObject[keys].costType !== "" &&
                costObject[keys].costAmount !== "" &&
                costObject[keys].casualFactor !== ""
              ) {
                if (costObject[keys].id !== undefined) {
                  const resWeather = await api.put(
                    `api/v1/incidents/${putId.current}/investigations/${
                      investigationId.current
                    }/events/${eventId.current}/cost/${
                      overAllCostId.current[keys]
                    }/`,
                    costObject[keys]
                  );
                  if (resWeather == 200) {
                    console.log("request done");
                  }
                } else {
                  costObject[keys]["fkEventDetailsId"] = eventId.current;
                  const resWeather = await api.post(
                    `api/v1/incidents/${putId.current}/investigations/${
                      investigationId.current
                    }/events/${eventId.current}/cost/`,
                    costObject[keys]
                  );
                  if (resWeather == 201) {
                    console.log("request done");
                  }
                }
              }
            }
          }
        }
        let viewMode = {
          initialNotification: false,
          investigation: true,
          evidence: false,
          rootcauseanalysis: false,
          lessionlearn: false,
        };
        localStorage.setItem("viewMode", JSON.stringify(viewMode));
        dispatch(tabViewMode(viewMode));
        history.push(`${SUMMERY_FORM["Summary"]}${putId.current}/`);
      }
    }
    setButtonLoading(false);
  };

  const PickListCall = async () => {
    activityListValues.current = await pickListValues["63"];
    jobTaskValues.current = await pickListValues["64"];
    weatherValues.current = await pickListValues["65"];
    lightningValues.current = await pickListValues["66"];
    fluidTypeValues.current = await pickListValues["67"];
    costTypeValues.current = await pickListValues["68"];
    casualFactorTypeValues.current = await pickListValues["69"];
    await handelUpdateCheck();
    setLoading(true);
  };
  // fetch incident data
  const fetchIncidentsData = () => {
    api
      .get(`/api/v1/incidents/${localStorage.getItem("fkincidentId")}/`)
      .then((res) => {
        const result = res.data.data.results;
        setIncidentsListdata(result);
      })
      .catch((err) => history.push("/app/pages/error"));
  };

  useEffect(() => {
    PickListCall();
    fetchIncidentsData();
  }, []);

  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:992px)");
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      {loading ? (
        <>
          <Grid container spacing={3}>
            <Grid container item xs={12} md={9} spacing={3}>
              {/* job task */}
              <Grid item xs={12} md={6}>
                <FormControl
                  error={error && error.jobTask}
                  variant="outlined"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="project-name-label">Job task</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Job task"
                    value={form.jobTask}
                  >
                    {jobTaskValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            jobTask: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error && error.jobTask && (
                  <FormHelperText style={{ color: "red" }}>
                    {error.jobTask}
                  </FormHelperText>
                )}
              </Grid>

              {/* activity */}
              <Grid item xs={12} md={6}>
                <FormControl
                  error={error && error.activity}
                  variant="outlined"
                  required
                  className={classes.formControl}
                >
                  <InputLabel id="project-name-label">Activity</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Activity"
                    value={form.activity}
                  >
                    {activityListValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            activity: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {error && error.activity && (
                  <FormHelperText style={{ color: "red" }}>
                    {error.activity}
                  </FormHelperText>
                )}
              </Grid>

              {/* equiment involved */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Equipment involved"
                  value={form.equipmentInvolved}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      equipmentInvolved: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              {/* weather */}
              {weather.map((value, index) => (
                <>
                  <Grid item xs={10}>
                    <FormControl
                      error={
                        errorWeather &&
                        errorWeather[`weatherCondition${[index]}`]
                      }
                      variant="outlined"
                      required
                      className={classes.formControl}
                    >
                      <InputLabel id="project-name-label">Weather</InputLabel>
                      <Select
                        id="project-name"
                        labelId="project-name-label"
                        label="Weather"
                        value={weather[index].weatherCondition || ""}
                      >
                        {weatherValues.current.map((selectValues) => (
                          <MenuItem
                            value={selectValues.value}
                            onClick={(e) =>
                              handelWeather(e, index, selectValues.value)
                            }
                          >
                            {selectValues.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {errorWeather &&
                      errorWeather[`weatherCondition${[index]}`] && (
                        <FormHelperText style={{ color: "red" }}>
                          {errorWeather[`weatherCondition${[index]}`]}
                        </FormHelperText>
                      )}
                  </Grid>

                  {weather.length > 1 ? (
                    <Grid item xs={1}>
                      <IconButton onClick={(e) => handelRemove(e, index)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                  ) : null}
                </>
              ))}

              {weather.length < 3 ? (
                <Grid item xs={1}>
                  <IconButton onClick={(e) => handelAdd(e)}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              ) : null}

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Temperature"
                  error={error && error.temperature}
                  helperText={error && error.temperature}
                  value={form.temperature}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      temperature: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              {/* lightning */}
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Lighting</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Lighting"
                    value={form.lighting}
                  >
                    {lightningValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            lighting: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* wind         */}
              <Grid item xs={12}>
                <Typography variant="h6">Wind</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Speed"
                  value={form.windSpeed}
                  error={error && error.windSpeed}
                  helperText={error && error.windSpeed}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      windSpeed: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Direction"
                  value={form.windDirection}
                  error={error && error.windDirection}
                  helperText={error && error.windDirection}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      windDirection: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              {/* spills */}
              <Grid item xs={12}>
                <Typography variant="h6">Spills</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Fluid type</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Fluid type"
                    value={form.spillsFluidType}
                  >
                    {fluidTypeValues.current.map((selectValues) => (
                      <MenuItem
                        value={selectValues.value}
                        onClick={(e) => {
                          setForm({
                            ...form,
                            spillsFluidType: selectValues.value,
                          });
                        }}
                      >
                        {selectValues.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Fluid amount"
                  value={form.spillsFluidAmount}
                  value={form.spillsFluidAmount}
                  error={error && error.spillsFluidAmount}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      spillsFluidAmount: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="AEL"
                  value={form.acceptableExplosiveLimit}
                  error={error && error.acceptableExplosiveLimit}
                  helperText={error && error.acceptableExplosiveLimit}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      acceptableExplosiveLimit: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="PEL"
                  value={form.permissableExplosiveLimit}
                  error={error && error.permissableExplosiveLimit}
                  helperText={error && error.permissableExplosiveLimit}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      permissableExplosiveLimit: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              {/* property details */}
              <Grid item xs={12}>
                <Typography variant="h6">Property details</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Impact information"
                  value={form.propertyImpactInformation}
                  error={error && error.propertyImpactInformation}
                  helperText={error && error.propertyImpactInformation}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      propertyImpactInformation: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  id="title"
                  variant="outlined"
                  label="Cost impact"
                  value={form.propertyCostImpact}
                  error={error && error.propertyCostImpact}
                  helperText={error && error.propertyCostImpact}
                  onChange={(e) => {
                    setForm({
                      ...form,
                      propertyCostImpact: e.target.value,
                    });
                  }}
                  className={classes.formControl}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset" required>
                  <FormLabel>Overall cost</FormLabel>
                  <RadioGroup className={classes.inlineRadioGroup}>
                    {radioYesNo.map((value) => (
                      <FormControlLabel
                        value={value}
                        checked={form.isCostIncurred == value}
                        onChange={(e) =>
                          setForm({ ...form, isCostIncurred: value })
                        }
                        control={<Radio />}
                        label={value}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* cost incurred  */}
              <Grid container item xs={12} spacing={2}>
                {form.isCostIncurred == "Yes" ? (
                  <>
                    {overAllCost.map((value, index) => (
                      <>
                        {/* cost type */}
                        <Grid item xs={6} md={4}>
                          <FormControl
                            variant="outlined"
                            error={errorCost && errorCost[`costType${[index]}`]}
                            className={classes.formControl}
                          >
                            <InputLabel id="project-name-label">
                              Cost type
                            </InputLabel>
                            <Select
                              id="project-name"
                              labelId="project-name-label"
                              label="Cost type"
                              value={overAllCost[index].costType}
                            >
                              {costTypeValues.current.map((selectValues) => (
                                <MenuItem
                                  value={selectValues.value}
                                  onClick={async (e) => {
                                    const temp = [...overAllCost];
                                    temp[index]["costType"] =
                                      selectValues.value;
                                    await setOverAllCost(temp);
                                  }}
                                >
                                  {selectValues.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          {errorCost && errorCost[`costType${[index]}`] && (
                            <FormHelperText style={{ color: "red" }}>
                              {errorCost[`costType${[index]}`]}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* cost amount */}
                        <Grid item xs={6} md={2}>
                          <TextField
                            id="title"
                            error={
                              errorCost && errorCost[`costAmount${[index]}`]
                            }
                            variant="outlined"
                            label="Cost amount"
                            value={overAllCost[index].costAmount}
                            className={classes.formControl}
                            onChange={async (e) => {
                              const temp = [...overAllCost];
                              temp[index]["costAmount"] = e.target.value;
                              await setOverAllCost(temp);
                            }}
                          />
                          {errorCost && errorCost[`costAmount${[index]}`] && (
                            <FormHelperText style={{ color: "red" }}>
                              {errorCost[`costAmount${[index]}`]}
                            </FormHelperText>
                          )}
                        </Grid>

                        {/* cost factor */}
                        <Grid item xs={10} md={4}>
                          <FormControl
                            error={
                              errorCost && errorCost[`casualFactor${[index]}`]
                            }
                            variant="outlined"
                            className={classes.formControl}
                          >
                            <InputLabel id="project-name-label">
                              Casual factor
                            </InputLabel>
                            <Select
                              id="project-name"
                              labelId="project-name-label"
                              label="Casual factor"
                              value={overAllCost[index].casualFactor}
                            >
                              {casualFactorTypeValues.current.map(
                                (selectValues) => (
                                  <MenuItem
                                    value={selectValues.value}
                                    onClick={async (e) => {
                                      const temp = [...overAllCost];
                                      temp[index]["casualFactor"] =
                                        selectValues.value;
                                      await setOverAllCost(temp);
                                    }}
                                  >
                                    {selectValues.label}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                          {errorCost && errorCost[`casualFactor${[index]}`] && (
                            <FormHelperText style={{ color: "red" }}>
                              {errorCost[`casualFactor${[index]}`]}
                            </FormHelperText>
                          )}
                        </Grid>
                        {overAllCost.length > 1 ? (
                          <Grid item xs={1}>
                            <IconButton
                              onClick={(e) => handelOverallCostRemove(e, index)}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                          </Grid>
                        ) : null}
                      </>
                    ))}

                    {overAllCost.length < 4 ? (
                      <Grid item xs={1}>
                        <IconButton onClick={(e) => handelOveallCostAdd(e)}>
                          <AddIcon />
                        </IconButton>
                      </Grid>
                    ) : null}
                  </>
                ) : null}
              </Grid>

              <Grid item xs={12}>
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
                  onClick={(e) => handelNext(e)}
                  disabled={buttonLoading}
                >
                  Next{buttonLoading && <CircularProgress size={20} />}
                </Button>
              </Grid>
            </Grid>
            {isDesktop && (
              <Grid item md={3}>
                <FormSideBar
                  deleteForm={[1, 2, 3]}
                  listOfItems={INVESTIGATION_FORM}
                  selectedItem="Event details"
                />
              </Grid>
            )}
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </PapperBlock>
  );
};

export default EventDetails;
