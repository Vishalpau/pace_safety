import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, Select } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import { spacing } from "@material-ui/system";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { PapperBlock } from "dan-components";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import api from "../../../utils/axios";
import EventDetailsValidate from "../../Validator/InvestigationValidation/EventDetailsValdiate";
import EventDetailsWeatherValidate from "../../Validator/InvestigationValidation/EventDetailsWeatherValidate";
import EventDetailsCostValidate from "../../Validator/InvestigationValidation/EventDetailsCostValidate";
import PickListData from "../../../utils/Picklist/InvestigationPicklist";

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
  const CheckPost = useRef();
  const radioYesNo = ["Yes", "No"];
  const [overAllCostShow, setOverAllCostShow] = useState("");

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
        `api/v1/incidents/${putId.current}/investigations/${investigationId.current
        }/events/`
      );
      const eventData = event.data.data.results[0];
      if (typeof eventData !== "undefined") {
        CheckPost.current = false;
        setForm(eventData);
        eventId.current = eventData.id;
      }

      // Weather data
      const weather = await api.get(
        `api/v1/incidents/${putId.current}/investigations/${investigationId.current
        }/events/${eventId.current}/weatherconditions/`
      );
      const weatherData = weather.data.data.results;
      if (typeof weatherData !== "undefined") {
        setWeather(weatherData);
        weatherData.map((value) => {
          weatherId.current.push(value.id);
        });
      }

      // event data
      const cost = await api.get(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/cost/`)
      const costData = cost.data.data.results
      if (costData.length !== 0) {
        setOverAllCost(costData)
        costData.map((value) => {
          overAllCostId.current.push(value.id)
        })
      } else if (costData.length == 0) {
        let tempCostData = [{
          costType: "",
          costAmount: "",
          casualFactor: "",
          currency: "INR",
          status: "Active",
          createdBy: 0,
        }]
        setOverAllCost(tempCostData)
      }

    }
    localStorage.setItem("WorkerPost", "done");
  };

  const handelWeather = async (e, key, value) => {
    const temp = [...weather];
    temp[key]["weatherCondition"] = value;
    await setWeather(temp);
  };

  const handelAdd = async (e) => {
    if (weather.length < 3) {
      await setWeather([
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
        console.log("here");
        const res = await api.delete(
          `api/v1/incidents/${putId.current}/investigations/${investigationId.current
          }/events/${eventId.current}/weatherconditions/${weather[index].id}/`
        );
      }

      let newData = weather.filter((item, key) => key !== index);
      await setWeather(newData);
    }
  };

  const handelOveallCostAdd = async (e) => {
    if (overAllCost.length < 4) {
      await setOverAllCost([
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
          `api/v1/incidents/${putId.current}/investigations/${investigationId.current
          }/events/${eventId.current}/cost/${overAllCost[index].id}/`
        );
      }
      let newData = overAllCost.filter((item, key) => key !== index);
      await setOverAllCost(newData);
    }
  };

  const handelNext = async (e) => {
    const { error, isValid } = EventDetailsValidate(form);
    const { errorWeather } = EventDetailsWeatherValidate(weather)
    await setError(error);
    await setErrorWeather(errorWeather)

    // event api call
    if (
      Object.keys(error).length == 0 &&
      Object.keys(errorWeather).length == 0 &&
      Object.keys(errorCost).length == 0
    ) {
      if (eventId.current === "") {
        const res = await api.post(
          `api/v1/incidents/${putId.current}/investigations/${investigationId.current
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
              `api/v1/incidents/${putId.current}/investigations/${investigationId.current
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
                `api/v1/incidents/${putId.current}/investigations/${investigationId.current
                }/events/${eventID}/cost/`,
                costObject[keys]
              );
              if (resWeather == 201) {
                console.log("request done");
              }
            }
          }
          history.push(
            `/app/incident-management/registration/investigation/action-taken/`
          );
        }
        // put
      } else if (eventId.current !== "") {
        const res = await api.put(
          `api/v1/incidents/${putId.current}/investigations/${investigationId.current
          }/events/${eventId.current}/`,
          form
        );

        // weather api call put
        if (weather.length > 0) {
          let weatherObject = weather;
          for (let key in weatherObject) {
            if (weatherObject[key].id !== undefined) {
              const resWeather = await api.put(
                `api/v1/incidents/${putId.current}/investigations/${investigationId.current
                }/events/${eventId.current}/weatherconditions/${weatherObject[key].id
                }/`,
                weatherObject[key]
              );
              if (resWeather == 200) {
                console.log("request done");
              }
            } else {
              weatherObject[key]["fkEventDetailsId"] = eventId.current;
              const resWeather = await api.post(
                `api/v1/incidents/${putId.current}/investigations/${investigationId.current
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
          if (overAllCost.length > 0 && !isNaN(overAllCostId.current[0])) {
            let costObject = overAllCost;
            for (let keys in costObject) {
              if (costObject[keys].id !== undefined) {
                const resWeather = await api.put(
                  `api/v1/incidents/${putId.current}/investigations/${investigationId.current
                  }/events/${eventId.current}/cost/${overAllCostId.current[keys]
                  }/`,
                  costObject[keys]
                );
                if (resWeather == 200) {
                  console.log("request done");
                }
              } else {
                costObject[keys]["fkEventDetailsId"] = eventId.current;
                const resWeather = await api.post(
                  `api/v1/incidents/${putId.current}/investigations/${investigationId.current
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
        history.push(
          `/app/incident-management/registration/investigation/action-taken/${putId.current
          }`
        );
      }
    }
  };

  const PickListCall = async () => {
    activityListValues.current = await PickListData(63);
    jobTaskValues.current = await PickListData(64);
    weatherValues.current = await PickListData(65);
    lightningValues.current = await PickListData(66);
    fluidTypeValues.current = await PickListData(67);
    costTypeValues.current = await PickListData(68);
    casualFactorTypeValues.current = await PickListData(69);
    await handelUpdateCheck();
  };

  useEffect(() => {
    PickListCall();
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      <Grid container spacing={3}>
        <Grid container item md={9} spacing={3}>
          {/* activity */}
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Activity*</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Activity"
                value={form.activity}
              >
                {activityListValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        activity: selectValues,
                      });
                    }}
                  >
                    {selectValues}
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

          {/* job task */}
          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Job task*</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Job task"
                value={form.jobTask}
              >
                {jobTaskValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        jobTask: selectValues,
                      });
                    }}
                  >
                    {selectValues}
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

          {/* equiment involved */}
          <Grid item md={6}>
            {/* <p>Eqipment Invoked</p> */}
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
              <Grid item md={10}>
                <FormControl
                  error={
                    errorWeather && errorWeather[`weatherCondition${[index]}`]
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
                        value={selectValues}
                        onClick={(e) => handelWeather(e, index, selectValues)}
                      >
                        {selectValues}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errorWeather && errorWeather[`weatherCondition${[index]}`] && (
                  <FormHelperText style={{ color: "red" }}>
                    {errorWeather[`weatherCondition${[index]}`]}
                  </FormHelperText>
                )}
              </Grid>

              {weather.length > 1 ? (
                <Grid item md={1}>
                  <IconButton onClick={(e) => handelRemove(e, index)}>
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Grid>
              ) : null}
            </>
          ))}

          {weather.length < 3 ? (
            <Grid item md={1}>
              <IconButton onClick={(e) => handelAdd(e)}>
                <AddIcon />
              </IconButton>
            </Grid>
          ) : null}

          <Grid item md={6}>
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
          <Grid item md={6}>
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
                    value={selectValues}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        lighting: selectValues,
                      });
                    }}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* wind         */}
          <Grid item md={12}>
            <Typography variant="h6">Wind</Typography>
          </Grid>

          <Grid item md={6}>
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

          <Grid item md={6}>
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
          <Grid item md={12}>
            <Typography variant="h6">Spills</Typography>
          </Grid>

          <Grid item md={6}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="project-name-label">Fluid type*</InputLabel>
              <Select
                id="project-name"
                labelId="project-name-label"
                label="Fluid type"
                value={form.spillsFluidType}
              >
                {fluidTypeValues.current.map((selectValues) => (
                  <MenuItem
                    value={selectValues}
                    onClick={(e) => {
                      setForm({
                        ...form,
                        spillsFluidType: selectValues,
                      });
                    }}
                  >
                    {selectValues}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {error && error.spillsFluidType && (
              <FormHelperText style={{ color: "red" }}>
                {error.spillsFluidType}
              </FormHelperText>
            )}
          </Grid>

          <Grid item md={6}>
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

          <Grid item md={6}>
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

          <Grid item md={6}>
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
          <Grid item md={12}>
            <Typography variant="h6">Property details</Typography>
          </Grid>

          <Grid item md={6}>
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

          <Grid item md={6}>
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

          <Grid item md={12}>
            <Typography variant="h6">Overall cost*</Typography>
            <FormControl component="fieldset" required>
              <RadioGroup className={classes.inlineRadioGroup}>
                {radioYesNo.map((value) => (
                  <FormControlLabel
                    // disabled={CheckPost.current == false}
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
          <Grid container item md={12} spacing={2}>
            {form.isCostIncurred == "Yes" ? (
              <>
                {overAllCost.map((value, index) => (
                  <>
                    {/* cost type */}
                    <Grid item md={4}>
                      <FormControl
                        variant="outlined"
                        error={errorCost && errorCost[`costType${[index]}`]}
                        className={classes.formControl}>
                        <InputLabel id="project-name-label">Cost type</InputLabel>
                        <Select
                          id="project-name"
                          labelId="project-name-label"
                          label="Cost type"
                          value={overAllCost[index].costType}
                        >
                          {costTypeValues.current.map((selectValues) => (
                            <MenuItem
                              value={selectValues}
                              onClick={async (e) => {
                                const temp = [...overAllCost];
                                temp[index]["costType"] = selectValues;
                                await setOverAllCost(temp);
                              }}
                            >
                              {selectValues}
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
                    <Grid item md={2}>
                      <TextField
                        id="title"
                        error={errorCost && errorCost[`costAmount${[index]}`]}
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
                    <Grid item md={4}>
                      <FormControl
                        error={errorCost && errorCost[`casualFactor${[index]}`]}
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
                                value={selectValues}
                                onClick={async (e) => {
                                  const temp = [...overAllCost];
                                  temp[index]["casualFactor"] = selectValues;
                                  await setOverAllCost(temp);
                                }}
                              >
                                {selectValues}
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
                      <Grid item md={1}>
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
                  <Grid item md={1}>
                    <IconButton onClick={(e) => handelOveallCostAdd(e)}>
                      <AddIcon />
                    </IconButton>
                  </Grid>
                ) : null}
              </>
            ) : null}
          </Grid>

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
              onClick={(e) => handelNext(e)}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item md={3}>
          <FormSideBar
            deleteForm={[1, 2, 3]}
            listOfItems={INVESTIGATION_FORM}
            selectedItem="Event details"
          />
        </Grid>
      </Grid>
    </PapperBlock>
  );
};

export default EventDetails;