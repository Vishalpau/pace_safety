import React, { useState, useEffect, useRef } from "react";
import { Button, Grid, Container, Input, Select } from "@material-ui/core";
import FormHelperText from "@material-ui/core/FormHelperText";

import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router";

import FormSideBar from "../FormSideBar";
import { INVESTIGATION_FORM } from "../../../utils/constants";
import FormHeader from "../FormHeader";
import { useSelector } from "react-redux";
import { ContactlessOutlined } from "@material-ui/icons";
import api from "../../../utils/axios";
import EventDetailsValidate from "../../Validator/InvestigationValidation/EventDetailsValdiate";
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
    fkInvestigationId: 0
  })

  const investigationId = useRef("")
  const activityListValues = useRef([])
  const jobTaskValues = useRef([])
  const weatherValues = useRef([])
  const lightningValues = useRef([])
  const fluidTypeValues = useRef([])
  const costTypeValues = useRef([])
  const casualFactorTypeValues = useRef([])
  const putId = useRef("")
  const eventId = useRef("")
  const weatherId = useRef([])
  const overAllCostId = useRef([])
  const history = useHistory();

  const [weather, setWeather] = useState([
    {
      weatherCondition: "",
      status: "Active",
      createdBy: 0,
    }
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

  const handelUpdateCheck = async (e) => {
    console.log("here")
    let page_url = window.location.href;
    const lastItem = parseInt(page_url.substring(page_url.lastIndexOf("/") + 1));
    let incidentId = !isNaN(lastItem) ? lastItem : localStorage.getItem("fkincidentId");
    putId.current = incidentId;
    let previousData = await api.get(`api/v1/incidents/${incidentId}/investigations/`);
    let allApiData = previousData.data.data.results[0];
    console.log(allApiData)

    if (typeof allApiData !== "undefined" && !isNaN(allApiData.id)) {
      await setForm(allApiData);
      investigationId.current = allApiData.id
      setForm({ ...form, fkInvestigationId: allApiData.id })
      const event = await api.get(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/`)
      const eventData = event.data.data.results[0]
      if (typeof eventData !== "undefined") {
        setForm(eventData)
        eventId.current = eventData.id
      }

      // Weather data
      const weather = await api.get(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/weatherconditions/`)
      const weatherData = weather.data.data.results
      if (typeof weatherData !== "undefined") {
        setWeather(weatherData)
        weatherData.map((value) => {
          weatherId.current.push(value.id)
        })


      }

      // event data
      const cost = await api.get(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/cost/`)
      const costData = cost.data.data.results
      if (typeof costData !== "undefined") {
        setOverAllCost(costData)
        costData.map((value) => {
          overAllCostId.current.push(value.id)
        })
      }


    }
  };

  const handelWeather = async (e, key, value) => {
    console.log(e.target.value);
    const temp = [...weather];
    temp[key]["weatherCondition"] = value;
    await setWeather(temp);
  };

  const handelAdd = async (e) => {
    if (weather.length < 3) {
      await setWeather([...weather, {
        weatherCondition: "",
        status: "Active",
        createdBy: 0,
      }]);
    }
  };

  const handelRemove = async (e, index) => {
    if (weather.length > 1) {
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
      let newData = overAllCost.filter((item, key) => key !== index);
      await setOverAllCost(newData);
    }
  };

  const handelNext = async (e) => {
    // console.log(form);
    const { error, isValid } = EventDetailsValidate(form);
    setError(error);
    console.log(error, isValid);
    // event api call
    if (Object.keys(error).length == 0) {
      if (eventId.current === "") {
        const res = await api.post(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/`, form);
        if (res.status === 201) {
          let eventID = res.data.data.results.id
          let weatherObject = weather;

          // weather api call
          for (let key in weatherObject) {
            weatherObject[key]["fkEventDetailsId"] = eventID
            const resWeather = await api.post(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventID}/weatherconditions/`, weatherObject[key])
            if (resWeather == 201) {
              console.log("request done")
            }
          }
          // cost api call
          let costObject = overAllCost;
          for (let keys in costObject) {
            costObject[keys]["fkEventDetailsId"] = eventID
            const resWeather = await api.post(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventID}/cost/`, costObject[keys])
            if (resWeather == 201) {
              console.log("request done")
            }

          }
          history.push(`/app/incident-management/registration/investigation/action-taken/`)
        }
        // put
      } else if (eventId.current !== "") {
        const res = await api.put(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/`, form);

        // weather api call put 
        let weatherObject = weather;
        for (let key in weatherObject) {
          const resWeather = await api.put(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/weatherconditions/${weatherId.current[key]}/`, weatherObject[key])
          if (resWeather == 200) {
            console.log("request done")
          }
        }

        // cost api call put
        let costObject = overAllCost;
        for (let keys in costObject) {
          const resWeather = await api.put(`api/v1/incidents/${putId.current}/investigations/${investigationId.current}/events/${eventId.current}/cost/${overAllCostId.current[keys]}/`, costObject[keys])
          if (resWeather == 200) {
            console.log("request done")
          }
        }
        history.push(`/app/incident-management/registration/investigation/action-taken/${putId.current}`)
      }
    }
  };

  const PickListCall = async () => {
    activityListValues.current = await PickListData(63)
    jobTaskValues.current = await PickListData(64)
    weatherValues.current = await PickListData(65)
    lightningValues.current = await PickListData(66)
    fluidTypeValues.current = await PickListData(67)
    costTypeValues.current = await PickListData(68)
    casualFactorTypeValues.current = await PickListData(69)
    await handelUpdateCheck()
  }

  useEffect(() => {
    PickListCall()
  }, []);

  const classes = useStyles();
  return (
    <PapperBlock title="Events Details" icon="ion-md-list-box">
      {console.log(weatherId.current)}
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
              <FormHelperText style={{ color: "red" }}>{error.activity}</FormHelperText>
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
              <FormHelperText style={{ color: "red" }}>{error.jobTask}</FormHelperText>
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
                <FormControl variant="outlined" className={classes.formControl}>
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
                  >{selectValues}
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
              <FormHelperText style={{ color: "red" }}>{error.spillsFluidType}</FormHelperText>
            )}
          </Grid>

          <Grid item md={6}>
            <TextField
              id="title"
              variant="outlined"
              label="Fluid amount"
              value={form.spillsFluidAmount}
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
              label="Impact Information"
              value={form.propertyImpactInformation}
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
            <Typography variant="h6">Overall cost</Typography>
          </Grid>

          {/* cost incurred         */}
          {overAllCost.map((value, index) => (
            <Grid container item md={11} spacing={2} alignItems="center">
              <Grid item md={4}>
                <FormControl variant="outlined" className={classes.formControl}>
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
              </Grid>

              <Grid item md={4}>
                {/* <p>Eqipment Invoked</p> */}
                <TextField
                  id="title"
                  variant="outlined"
                  label="Cost amount"
                  value={overAllCost[index].costAmount}
                  className={classes.formControl}
                  onChange={
                    async (e) => {
                      const temp = [...overAllCost];
                      temp[index]["costAmount"] = e.target.value;
                      await setOverAllCost(temp);
                    }}
                />
              </Grid>

              <Grid item md={2}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="project-name-label">Casual factor</InputLabel>
                  <Select
                    id="project-name"
                    labelId="project-name-label"
                    label="Casual factor"
                    value={overAllCost[index].casualFactor}
                  >
                    {casualFactorTypeValues.current.map((selectValues) => (
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
                    ))}
                  </Select>
                </FormControl>
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
            </Grid>
          ))}

          <Grid item md={1}>
            <IconButton onClick={(e) => handelOveallCostAdd(e)}>
              <AddIcon />
            </IconButton>
          </Grid>

          <Grid item md={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => history.goBack()}
              // href="http://localhost:3000/app/incident-management/registration/investigation/Equipment-impact-details/"
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              // href="http://localhost:3000/app/incident-management/registration/investigation/action-taken/"
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
    </PapperBlock >

  );
};

export default EventDetails;
